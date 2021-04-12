import * as core from '@serverless-devs/core';
import * as IReturn from './interface';
import { IProperties } from '../../interface/inputs';
export default class Component {
    logger: core.ILogger;
    readonly properties: IProperties;
    readonly configFile: string;
    readonly domain: string;
    readonly accountID: string;
    readonly autoName: string;
    readonly serviceName: string;
    readonly functionName: string;
    constructor(properties: IProperties, configFile: string, accountID: string);
    createConfigFile(inputs: any, assumeYes: boolean): Promise<any>;
    getService(): import("../../interface/service").IServiceConfig;
    getFunctonConfig(): import("../../interface/function").IFunctionConfig;
    getTrigger(): {
        name: string;
        function: string;
        service: string;
        type: string;
        config: string;
    };
    genVpcConfig(inputs: any): Promise<{
        network: {
            cidrBlock: string;
            vpc_name: string;
        };
        switch: {
            vswitch_name: string;
            cidrBlock: string;
            vpcId: string;
            availabilityZone: string;
        };
        securityGroup: {
            description: string;
            name: string;
            securityGroupType: string;
            InnerAccessPolicy: string;
            vpcId: string;
        };
    }>;
    genNasConfig(inputs: any, assumeYes: boolean): Promise<{
        fileSystem: {
            protocolType: string;
            storageType: string;
            description: string;
        };
        mountTarget: {
            fileSystemId: string;
            vswitchId: string;
            accessGroupName: string;
        };
    }>;
    genLogConfig(): IReturn.IGensls;
}
