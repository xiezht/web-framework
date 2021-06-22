
export default abstract class CloudProvider {
  protected inputs;

  constructor(inputs) {
    this.inputs = inputs;
  }

  abstract login();
  abstract publish(buildImg: string, qualifier: string): Promise<string>;
}
