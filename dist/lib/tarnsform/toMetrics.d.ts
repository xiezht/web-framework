import * as Interface from '../../interface/inputs';
export default class Component {
    static tarnsform(inputs: Interface.IInputs): {
        props: {
            regionId: string;
            serviceName: string;
            functionName: string;
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
