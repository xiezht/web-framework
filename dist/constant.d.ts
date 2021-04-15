export declare const HELP: ({
    header: string;
    optionList: {
        name: string;
        description: string;
        alias: string;
        type: BooleanConstructor;
    }[];
    content?: undefined;
} | {
    header: string;
    content: {
        example: string;
    }[];
    optionList?: undefined;
})[];
export declare const CONTEXT = "WEB-FRAMEWORK";
export declare const CONTEXT_NAME = "web-framework";
export declare const getAutoName: (accountID: string, region: string, serviceName: string) => string;
export declare const STORENAME = "logstore";
export declare const HTTP_CONFIG = "{\"authType\":\"anonymous\",\"methods\":[\"GET\",\"POST\",\"PUT\"]}";
