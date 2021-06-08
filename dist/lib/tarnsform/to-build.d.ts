export default class ToBuild {
    static transfromInputs({ runtime, region, service, function: functionConfig }: {
        runtime: any;
        region: any;
        service: any;
        function: any;
    }): {
        region: any;
        service: {
            name: any;
        };
        function: {
            name: any;
            runtime: any;
            codeUri: any;
            handler: any;
            initializationTimeout: any;
            initializer: any;
        };
    };
}
