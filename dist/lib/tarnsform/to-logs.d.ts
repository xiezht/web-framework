import { IInputs } from '../../interface/inputs';
export default class Component {
    static tarnsform(inputs: IInputs): {
        props: {
            region: string;
            topic: string;
            query: string;
            logConfig: import("../../interface/service").ILogConfig;
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
