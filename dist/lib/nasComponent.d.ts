import * as core from '@serverless-devs/core';
import { ICredentials, IProperties, IInputs } from '../interface/inputs';
interface ISrc {
    src: string;
    excludes?: string[];
}
export default class Component {
    static logger: core.ILogger;
    static getSrc(code: ISrc, serviceName: string, functionName: string): Promise<string>;
    static init(properties: IProperties, v1Inputs: IInputs): Promise<{
        regionId: string;
        serviceName: string;
        description: string;
        vpcId: any;
        vSwitchId: any;
        securityGroupId: any;
        role: any;
        userId: any;
        groupId: any;
        mountPointDomain: any;
        nasDir: any;
        excludes: string[];
    }>;
    static remove(properties: IProperties, v1Inputs: IInputs): Promise<void>;
    static cp(properties: IProperties, v1Inputs: IInputs): Promise<void>;
    static ls(properties: IProperties, v1Inputs: IInputs): Promise<void>;
    static rm(properties: IProperties, v1Inputs: IInputs): Promise<void>;
    static command(properties: IProperties, v1Inputs: IInputs): Promise<void>;
    static transfromInputs(properties: IProperties, inputs: IInputs): Promise<{
        nas: any;
        inputs: {
            props: {
                regionId: string;
                serviceName: string;
                description: string;
                vpcId: any;
                vSwitchId: any;
                securityGroupId: any;
                role: any;
                userId: any;
                groupId: any;
                mountPointDomain: any;
                nasDir: any;
                excludes: string[];
            };
            project: {
                component: string;
                access: string;
                projectName: string;
            };
            credentials?: any;
            appName: string;
            args: string;
            path: any;
        };
    }>;
    static getNasProperties(regionId: string, serviceName: string, credentials: ICredentials, excludes: undefined | string[]): Promise<{
        regionId: string;
        serviceName: string;
        description: string;
        vpcId: any;
        vSwitchId: any;
        securityGroupId: any;
        role: any;
        userId: any;
        groupId: any;
        mountPointDomain: any;
        nasDir: any;
        excludes: string[];
    }>;
}
export {};
