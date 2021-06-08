import CloudProvider from './provider';
export default class ProviderFactory {
    static getProvider(inputs: any): CloudProvider;
}
