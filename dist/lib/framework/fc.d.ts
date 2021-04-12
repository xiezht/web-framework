import * as core from '@serverless-devs/core';
import { ICredentials } from '../../interface/inputs';
import { IProperties } from '../../interface/inputs';
export default class Component {
    static logger: core.ILogger;
    static getZoneId(region: string, profile: ICredentials): Promise<string>;
    static tryContainerAcceleration(profile: ICredentials, properties: IProperties): Promise<void>;
}
