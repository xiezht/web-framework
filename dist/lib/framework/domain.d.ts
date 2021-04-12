import * as core from '@serverless-devs/core';
import { IDomain } from './interface';
import { IInputs } from '../../interface/inputs';
export default class Component {
    static logger: core.ILogger;
    static get(inputs: IInputs): Promise<IDomain[]>;
    static getAutoDomain(inputs: IInputs, serviceName: string, functionName: string): Promise<string>;
}
