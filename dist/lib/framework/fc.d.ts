import * as core from '@serverless-devs/core';
import { ICredentials } from '../../interface/inputs';
export default class Component {
    static logger: core.ILogger;
    static getZoneId(region: string, profile: ICredentials): Promise<string>;
    static tryContainerAcceleration(profile: ICredentials, region: string, serviceName: string, functionName: string, customContainerConfig: any): Promise<boolean>;
}
