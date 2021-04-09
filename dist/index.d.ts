import { ILogger } from '@serverless-devs/core';
import { ICredentials } from './interface/inputs';
export default class Component {
    logger: ILogger;
    getCredentials(credentials: {} | ICredentials, provider: string, accessAlias?: string): Promise<ICredentials>;
    handlerInputs(inputs: any): Promise<{
        args: any;
        provider: any;
        accessAlias: any;
        credentials: ICredentials;
        properties: any;
        project: any;
    }>;
    deploy(inputs: any): Promise<any>;
    remove(inputs: any): Promise<void>;
    build(inputs: any): Promise<void>;
    logs(inputs: any): Promise<void>;
    metrics(inputs: any): Promise<void>;
    cp(inputs: any): Promise<void>;
    ls(inputs: any): Promise<void>;
    rm(inputs: any): Promise<void>;
}
