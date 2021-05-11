import { ILogger } from '@serverless-devs/core';
import { IInputs } from './interface/inputs';
export default class Component {
    logger: ILogger;
    deploy(inputs: IInputs): Promise<{
        region: string;
        serviceName: any;
        functionName: any;
        customDomains: any;
    }>;
    remove(inputs: IInputs): Promise<void>;
    build(inputs: IInputs): Promise<void>;
    logs(inputs: IInputs): Promise<void>;
    metrics(inputs: IInputs): Promise<void>;
    cp(inputs: IInputs): Promise<void>;
    ls(inputs: IInputs): Promise<void>;
    rm(inputs: IInputs): Promise<void>;
    command(inputs: IInputs): Promise<void>;
}
