import CloudProvider from './provider';
import AliCloud from './alicloud';

export default class ProviderFactory {
  static getProvider(inputs): CloudProvider {
    return new AliCloud(inputs);
  }
}
