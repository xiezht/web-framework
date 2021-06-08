
import popCore from '@alicloud/pop-core';
import Logger from '../../common/logger';
import CloudProvider from './provider';

const { spawnSync } = require('child_process');

export default class AliCloud extends CloudProvider {
  protected client;
  protected namespace;
  constructor(props) {
    super(props);
    this.namespace = this.inputs.appName.toLowerCase();
  }

  private async requestApi(path, method = 'GET', body = '{}', option = {}) {
    const httpMethod = method;
    const uriPath = path;
    const queries = {};
    const headers = {
      'Content-Type': 'application/json',
    };

    const apiClient = this.createApiClient();
    return await apiClient.request(httpMethod, uriPath, queries, body, headers, option);
  }
  private createApiClient() {
    if (!this.client) {
      const { AccessKeyID, AccessKeySecret } = this.inputs.credentials;
      const _popCore = popCore as any;
      this.client = new _popCore.ROAClient({
        accessKeyId: AccessKeyID,
        accessKeySecret: AccessKeySecret,
        endpoint: `https://cr.${this.inputs.props.region || 'cn-hangzhou'}.aliyuncs.com`,
        apiVersion: '2016-06-07',
      });
    }
    return this.client;
  }

  private async getTempLoginUserInfo() {
    return this.requestApi('/tokens');
  }

  private executeLoginCommand(userName, password, region = 'cn-hangzhou') {
    spawnSync(`docker login -u ${userName} -p ${password} registry.${region}.aliyuncs.com `, [], { cwd: './', stdio: 'inherit', shell: true });
  }

  private executeTagCommand(region: string, imgId: string, imgversion = 'LATEST') {
    const projectName = this.inputs.project.projectName.toLocaleLowerCase();
    // const imgversion = Date.now();
    spawnSync(`docker tag ${imgId} registry.${region}.aliyuncs.com/${this.namespace}/${projectName}:${imgversion}`, [], { cwd: './', stdio: 'inherit', shell: true });
    return imgversion;
  }

  private executePublishCommand(region: string, imgversion: string | number) {
    const projectName = this.inputs.project.projectName.toLocaleLowerCase();
    const { status } = spawnSync(`docker push registry.${region}.aliyuncs.com/${this.namespace}/${projectName}:${imgversion}`, [], { cwd: './', stdio: 'inherit', shell: true });
    if (status) {
      throw new Error('Failed to push the image to the Registry.');
    }
  }

  private getNameSpace() {
    return this.requestApi('/namespace');
  }

  private async createNameSpace(name) {
    const body = {
      Namespace: {
        namespace: name,
      },
    };
    return this.requestApi('/namespace', 'PUT', JSON.stringify(body));
  }

  private async updateNamespace(name) {
    const body = {
      Namespace: {
        AutoCreate: true,
        DefaultVisibility: 'PUBLIC',
      },
    };
    return this.requestApi(`/namespace/${name}`, 'POST', JSON.stringify(body));
  }

  private async createRepo(name) {
    const body = {
      Repo: {
        RepoNamespace: this.namespace,
        RepoName: name,
        Summary: 'serverless devs',
        Detail: 'serverless devs',
        RepoType: 'PRIVATE',
      },
    };
    return this.requestApi('/repos', 'PUT', JSON.stringify(body));
  }

  private async getRepos() {
    return this.requestApi('/repos');
  }

  async login() {
    const tempLoginInfo = await this.getTempLoginUserInfo();
    if (tempLoginInfo.data) {
      const region = this.inputs.props.region || 'cn-hangzhou';
      const { tempUserName, authorizationToken } = tempLoginInfo.data;
      await this.executeLoginCommand(tempUserName, authorizationToken, region);
    }
  }

  async publish(buildImg: string, qualifier?: string): Promise<string> {
    const namespaceData = await this.getNameSpace();
    const { namespaces } = namespaceData.data;
    const namespaceNameList: any[] = namespaces.map((data) => data.namespace);
    if (!namespaceNameList.includes(this.namespace)) {
      // 这里容易会触发一个问题，容器镜像服务命名空间仅能创建三个
      await this.createNameSpace(this.namespace).catch((e) => Logger.error(e));
    }
    await this.updateNamespace(this.namespace).catch((e) => Logger.error(e));
    const projectName = this.inputs.project.projectName.toLocaleLowerCase();
    const repoResult = await this.getRepos().catch((e) => Logger.error(e));
    const repos: any[] = repoResult.data.repos.map((item) => item.repoName);
    if (!repos.includes(projectName)) {
      await this.createRepo(projectName).catch((e) => Logger.error(e));
    }
    const region = this.inputs.props.region || 'cn-hangzhou';
    const imgversion = await this.executeTagCommand(region, buildImg, qualifier);
    await this.executePublishCommand(region, imgversion);
    const imageUrl = `registry.${region}.aliyuncs.com/${this.namespace}/${projectName}:${imgversion}`;
    return imageUrl;
  }
}