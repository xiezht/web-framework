import {
  HLogger,
  ILogger,
  getCredential,
  help,
  commandParse,
  loadComponent,
} from '@serverless-devs/core';
import fse from 'fs-extra';
import os from 'os';
import path from 'path';
import _ from 'lodash';
import { HELP, CONTEXT } from './constant';
import { ICredentials, IInputs, ICommandParse } from './interface/inputs';
import { genStackId, getImageAndReport } from './lib/utils';
import { cpPulumiCodeFiles, genPulumiInputs } from './lib/pulumi';
import * as shell from 'shelljs';
import NasComponent from './lib/nasComponent';
import Framework from './lib/framework';
import ToMetrics from './lib/tarnsform/toMetrics';
import ToLogs from './lib/tarnsform/toLogs';
import Fc from './lib/framework/fc';
import Build from './lib/tarnsform/toBuild';

const PULUMI_CACHE_DIR: string = path.join(os.homedir(), '.s', 'cache', 'pulumi', 'web-framework');
const PULUMI_LOCAL_PLUGIN_PATH = path.join(__dirname, 'lib', 'utils', 'pulumi-plugin');

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
    await pulumiComponentIns.installPluginFromLocal({ args: PULUMI_LOCAL_PLUGIN_PATH });

    const upRes = await pulumiComponentIns.up(pulumiInputs);
    if (upRes.stderr && upRes.stderr !== '') {
      this.logger.error(`deploy error: ${upRes.stderr}`);
      return;
    }

    await NasComponent.init(properties, _.cloneDeep(inputs));

    await Fc.tryContainerAcceleration(credentials, properties);

    // 返回结果
    return fcConfig.customDomains?.map(({ domainName }) => domainName);
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
    const stackId = genStackId(credentials.AccountID, properties.region, properties.service.name);
    const pulumiStackDir = path.join(PULUMI_CACHE_DIR, stackId);

    try {
      await NasComponent.remove(properties, _.cloneDeep(inputs));
    } catch (ex) {
      this.logger.debug(ex);
    }

    const pulumiInputs = genPulumiInputs(
      inputs,
      stackId,
      properties.region,
      pulumiStackDir,
    );
    const pulumiComponentIns = await loadComponent('devsapp/pulumi-alibaba');
    await pulumiComponentIns.installPluginFromLocal({ args: PULUMI_LOCAL_PLUGIN_PATH });
    const upRes = await pulumiComponentIns.destroy(pulumiInputs);
    if (upRes.stderr && upRes.stderr !== '') {
      this.logger.error(`destroy error: ${upRes.stderr}`);
      return;
    }
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
      throw new Error('The service is not configured to logConfig.');
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
