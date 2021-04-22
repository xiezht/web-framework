import {
  HLogger,
  ILogger,
  getCredential,
  help,
  commandParse,
  loadComponent,
  spinner,
} from '@serverless-devs/core';
import fse from 'fs-extra';
import os from 'os';
import path from 'path';
import _ from 'lodash';
import { HELP, CONTEXT } from './constant';
import { ICredentials, IInputs, ICommandParse } from './interface/inputs';
import { genStackId, getImageAndReport, delFunctionInConfFile, isFile, requestDomains, promiseRetry } from './lib/utils';
import { cpPulumiCodeFiles, genPulumiInputs } from './lib/pulumi';
import * as shell from 'shelljs';
import NasComponent from './lib/nasComponent';
import Framework from './lib/framework';
import ToMetrics from './lib/tarnsform/toMetrics';
import ToLogs from './lib/tarnsform/toLogs';
import Fc from './lib/framework/fc';
import Build from './lib/tarnsform/toBuild';

const PULUMI_CACHE_DIR: string = path.join(os.homedir(), '.s', 'cache', 'pulumi', 'web-framework');

const ALICLOUD_PLUGIN_VERSION = process.env.ALICLOUD_PLUGIN_VERSION || 'v2.38.0';
const ALICLOUD_PLUGIN_ZIP_FILE_NAME = `pulumi-resource-alicloud-${ALICLOUD_PLUGIN_VERSION}.tgz`;
const ALICLOUD_PLUGIN_DOWNLOAD_URL = `serverless-pulumi.oss-accelerate.aliyuncs.com/alicloud-plugin/${ALICLOUD_PLUGIN_ZIP_FILE_NAME}`;

export default class Component {
  @HLogger(CONTEXT) logger: ILogger;

  async deploy(inputs: IInputs) {
    const apts = {
      boolean: ['help', 'assumeYes'],
      alias: { help: 'h', assumeYes: 'y' },
    };
    const comParse: ICommandParse = commandParse({ args: inputs.args }, apts);
    if (comParse.data?.help) {
      help(HELP);
      return;
    }

    const credentials: ICredentials = await getCredential(inputs.project.access);
    inputs.credentials = credentials;
    const properties = inputs.props;

    await getImageAndReport(inputs, credentials.AccountID, 'deploy');

    const assumeYes = comParse.data?.assumeYes;
    const stackId = genStackId(credentials.AccountID, properties.region, properties.service.name);

    const pulumiStackDir = path.join(PULUMI_CACHE_DIR, stackId);
    this.logger.debug(`Ensuring ${pulumiStackDir}...`);
    await fse.ensureDir(pulumiStackDir, 0o777);
    const fcConfigJsonFile = path.join(pulumiStackDir, 'config.json');
    this.logger.debug(`Fc config json file path is: ${fcConfigJsonFile}`);

    const f = new Framework(properties, fcConfigJsonFile, credentials.AccountID);
    const fcConfig = await f.createConfigFile(_.cloneDeep(inputs), assumeYes);

    await cpPulumiCodeFiles(pulumiStackDir);
    shell.exec(`cd ${pulumiStackDir} && npm i`, { silent: true });

    const pulumiInputs = genPulumiInputs(
      inputs,
      stackId,
      properties.region,
      pulumiStackDir,
    );

    // 部署 fc 资源
    const pulumiComponentIns = await loadComponent('devsapp/pulumi-alibaba');
    await pulumiComponentIns.installPluginFromUrl({
      props: { url: ALICLOUD_PLUGIN_DOWNLOAD_URL, version: ALICLOUD_PLUGIN_VERSION }
    });

    await promiseRetry(async (retry: any, times: number): Promise<any> => {
      try {
        const pulumiRes = await pulumiComponentIns.up(pulumiInputs);
        if (pulumiRes?.stderr && pulumiRes?.stderr !== '') {
          this.logger.error(`deploy error:\n ${pulumiRes?.stderr}`);
          return;
        }
        // 返回结果
        return pulumiRes?.stdout;
      } catch (e) {
        this.logger.debug(`error when deploy, error is: \n${e}`);

        this.logger.log(`\tretry ${times} times`, 'red');
        retry(e);
      }
    });

    await NasComponent.init(properties, _.cloneDeep(inputs));

    const vm = spinner('Try container acceleration');
    const flag = await Fc.tryContainerAcceleration(credentials, properties.region, fcConfig.service.name, fcConfig.function.name, fcConfig.function.customContainerConfig);

    if (fcConfig.customDomains && fcConfig.customDomains[0].domainName) {
      await requestDomains(fcConfig.customDomains[0].domainName);
    }

    if (flag) {
      vm.succeed();
    } else {
      vm.fail();
    }

    await NasComponent.remove(properties, _.cloneDeep(inputs));

    // 返回结果
    return {
      region: properties.region,
      serviceName: fcConfig.service.name,
      functionName: fcConfig.function.name,
      customDomains: fcConfig.customDomains?.map(({ domainName }) => domainName)
    };
  }

  async remove(inputs: IInputs) {
    const apts = {
      boolean: ['help', 'assumeYes'],
      alias: { help: 'h', assumeYes: 'y' },
    };
    const comParse: ICommandParse = commandParse({ args: inputs.args }, apts);
    if (comParse.data?.help) {
      help(HELP);
      return;
    }
    const credentials: ICredentials = await getCredential(inputs.project.access);

    await getImageAndReport(inputs, credentials.AccountID, 'remove');

    const properties = inputs.props;
    const serviceName = properties.service.name;
    const functionName = properties.function.name || serviceName;
    const stackId = genStackId(credentials.AccountID, properties.region, properties.service.name);
    const pulumiStackDir = path.join(PULUMI_CACHE_DIR, stackId);
    const pulumiStackFile = path.join(pulumiStackDir, 'config.json');

    if (!await isFile(pulumiStackFile)) {
      this.logger.error('Please deploy resource first');
      return;
    }

    // try {
    //   await NasComponent.remove(properties, _.cloneDeep(inputs));
    // } catch (ex) {
    //   this.logger.debug(ex);
    // }

    const pulumiInputs = genPulumiInputs(
      inputs,
      stackId,
      properties.region,
      pulumiStackDir,
    );
    const pulumiComponentIns = await loadComponent('devsapp/pulumi-alibaba');
    await pulumiComponentIns.installPluginFromUrl({
      props: { url: ALICLOUD_PLUGIN_DOWNLOAD_URL, version: ALICLOUD_PLUGIN_VERSION }
    });

    const delFunction = await delFunctionInConfFile(pulumiStackFile, { serviceName, functionName }, 'w', 0o777);
    await promiseRetry(async (retry: any, times: number): Promise<any> => {
      try {
        if (delFunction) {
          const pulumiRes = await pulumiComponentIns.destroy(pulumiInputs);
          if (pulumiRes?.stderr && pulumiRes?.stderr !== '') {
            this.logger.error(`remove error:\n ${pulumiRes?.stderr}`);
            return;
          }
          await fse.remove(pulumiStackFile);
        } else {
          const pulumiRes = await pulumiComponentIns.up(pulumiInputs);
          if (pulumiRes?.stderr) {
            this.logger.error(`remove error:\n ${pulumiRes?.stderr}`);
          }
        }
      } catch (e) {
        this.logger.debug(`error when remove trigger, error is: \n${e}`);

        this.logger.log(`\tretry ${times} times`, 'red');
        retry(e);
      }
    });
  }

  async build(inputs: IInputs) {
    inputs.credentials = await getCredential(inputs.project.access);

    await getImageAndReport(inputs, inputs.credentials.AccountID, 'build');

    const builds = await loadComponent('devsapp/fc-build');
    const cloneInputs = Build.transfromInputs(_.cloneDeep(inputs));

    await builds.build(cloneInputs);
  }

  async logs(inputs: IInputs) {
    if (!inputs.props.service?.logConfig) {
      throw new Error('To use this function, you need to configure the log function in the service, please refer to https://github.com/devsapp/web-framework/blob/master/readme.md#service');
    }

    inputs.credentials = await getCredential(inputs.project.access);
    await getImageAndReport(inputs, inputs.credentials.AccountID, 'logs');

    const inputsLogs = await ToLogs.tarnsform(_.cloneDeep(inputs));
    const logs = await loadComponent('devsapp/logs');
    
    await logs.logs(inputsLogs);
  }

  async metrics(inputs: IInputs) {
    inputs.credentials = await getCredential(inputs.project.access);

    await getImageAndReport(inputs, inputs.credentials.AccountID, 'metrics');

    const inputsMetrics = await ToMetrics.tarnsform(_.cloneDeep(inputs));
    const metrics = await loadComponent('devsapp/fc-metrics');
    await metrics.metrics(inputsMetrics);
  }

  async cp(inputs: IInputs) {
    const credentials = await getCredential(inputs.project.access);
    await getImageAndReport(inputs, credentials.AccountID, 'cp');

    await NasComponent.cp(inputs.props, _.cloneDeep(inputs));
  }

  async ls(inputs: IInputs) {
    const credentials = await getCredential(inputs.project.access);
    await getImageAndReport(inputs, credentials.AccountID, 'ls');

    await NasComponent.ls(inputs.props, _.cloneDeep(inputs));
  }

  async rm(inputs: IInputs) {
    const credentials = await getCredential(inputs.project.access);
    await getImageAndReport(inputs, credentials.AccountID, 'rm');

    await NasComponent.rm(inputs.props, _.cloneDeep(inputs));
  }
}
