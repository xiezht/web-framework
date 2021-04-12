import * as core from '@serverless-devs/core';
export default class Component {
    static logger: core.ILogger;
    static getRole(roleInput: any): {
        role: {
            name: any;
            document: string;
        };
        rolePolicyAttachments: any[];
        rolePolicy: any[];
    };
    static genAutoRole(autoName: string): any;
}
