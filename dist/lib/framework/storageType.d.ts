import * as core from '@serverless-devs/core';
import { ICredentials } from '../../interface/inputs';
export default class Component {
    static logger: core.ILogger;
    static get(regionId: string, profile: ICredentials, assumeYes: boolean): Promise<string>;
}
