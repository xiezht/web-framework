import * as Interface from '../../interface/inputs';
export default class Component {
    static transform(inputs: Interface.IInputs): {
        props: {
            region: string;
            serviceName: string;
            functionName: string;
            triggerNames: string[];
        };
        project: {
            component: string;
            access: string;
            projectName: string;
        };
        credentials?: any;
        appName: string;
        args: string;
        path: any;
    };
}
