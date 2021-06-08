export default abstract class CloudProvider {
    protected inputs: any;
    constructor(inputs: any);
    abstract login(): any;
    abstract publish(buildImg: string, qualifier?: string): Promise<string>;
}
