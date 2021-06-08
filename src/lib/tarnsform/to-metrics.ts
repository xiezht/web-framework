import * as Interface from '../../interface/inputs';

export default class Component {
  static tarnsform(inputs: Interface.IInputs) {
    inputs.project.component = 'fc-metrics';

    const { region, service, function: functionConfig } = inputs.props;

    const serviceName = service.name;
    const functionName = functionConfig.name || serviceName;

    return {
      ...inputs,
      props: {
        regionId: region,
        serviceName,
        functionName
      }
    };
  }
}
