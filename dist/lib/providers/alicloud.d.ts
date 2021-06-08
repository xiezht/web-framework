import CloudProvider from './provider';
export default class AliCloud extends CloudProvider {
    protected client: any;
    protected namespace: any;
    constructor(props: any);
    private requestApi;
    private createApiClient;
    private getTempLoginUserInfo;
    private executeLoginCommand;
    private executeTagCommand;
    private executePublishCommand;
    private getNameSpace;
    private createNameSpace;
    private updateNamespace;
    private createRepo;
    private getRepos;
    login(): Promise<void>;
    publish(buildImg: string, qualifier?: string): Promise<string>;
}
