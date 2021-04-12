import Pop from '@alicloud/pop-core';
import { ICredentials } from '../interface/inputs';
export default class Component {
    static fc(region: string, profile: ICredentials): any;
    static pop(endpoint: string, profile: ICredentials): Pop;
}
