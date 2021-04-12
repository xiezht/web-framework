import * as buildInterface from './buildInterface';
import { IInputs } from '../../interface/inputs';
declare function transfromInputs(inputs: IInputs): {
    props: buildInterface.IProperties;
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
declare const _default: {
    transfromInputs: typeof transfromInputs;
};
export default _default;
