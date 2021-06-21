export default class ToFc {
    static transform(props: any, deployType?: any): {
        service: any;
        triggers: any[];
        region: any;
        function: any;
    };
    static service(service: any, deployType: any): any;
    static function(serviceName: any, functionConfig: any): any;
    static triggers(serviceName: any, triggerConfig: any): any[];
}
