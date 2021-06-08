export default class Component {
    static listVersions(profile: any, region: string, serviceName: string): Promise<any>;
    static publishVersion(profile: any, region: string, serviceName: string, description?: any): Promise<any>;
    static deleteVersion(profile: any, region: string, serviceName: string, versionId: any): Promise<any>;
    static tryContainerAcceleration(profile: any, region: string, serviceName: string, functionName: string, customContainerConfig: any): Promise<boolean>;
}
