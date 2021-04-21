const path = require('path');
const fse = require('fs-extra');
const alicloud = require('@pulumi/alicloud');

const defaultTimeout = '5m';
const defaultCustomTimeouts = {
  create: defaultTimeout,
  update: defaultTimeout,
  delete: defaultTimeout,
};
const configFile = path.join(__dirname, 'config.json');

if (fse.pathExistsSync(configFile)) {
  const {
    vpc,
    nas,
    log,
    service,
    functions,
    role,
    rolePolicy,
    rolePolicyAttachments
  } = JSON.parse(fse.readFileSync(configFile, { encoding: 'utf-8' }));

  const dependsOnRam = [];
  const dependsOnPolicy = [];
  // 创建角色相关
  let arn = service.role;
  if (role) {
    const ram = new alicloud.ram.Role(role.name, role, { customTimeouts: defaultCustomTimeouts });
    dependsOnRam.push(ram);
  
    if (rolePolicy) {
      for (const policy of rolePolicy) {
        const p = new alicloud.ram.Policy(policy.policyName, policy, { dependsOn: [ram], customTimeouts: defaultCustomTimeouts });
        dependsOnPolicy.push(p);
        dependsOnRam.push(p);
      }
    }
  
    for (const rolePolicyAttachment of rolePolicyAttachments) {
      const policy = new alicloud.ram.RolePolicyAttachment(rolePolicyAttachment.policyName, {
        ...rolePolicyAttachment,
        roleName: ram.name
      }, { dependsOn: [...dependsOnPolicy, ram], parent: ram, customTimeouts: defaultCustomTimeouts });
  
      dependsOnRam.push(policy);
    }
    arn = ram.arn;
  }

  // 创建 log 相关
  let logConfig = service.logConfig;
  if (log) {
    const { project, store, storeIndex } = log;
    const p = new alicloud.log.Project(project.name, project, { customTimeouts: defaultCustomTimeouts });
    const s = new alicloud.log.Store(store.name, {
      ...store,
      project: p.name,
    }, { dependsOn: [p, ...dependsOnRam], parent: p, customTimeouts: defaultCustomTimeouts });
    new alicloud.log.StoreIndex(store.name, {
      ...storeIndex,
      project: p.name,
      logstore: s.name
    }, { dependsOn: [p, s, ...dependsOnRam], parent: s, customTimeouts: defaultCustomTimeouts });
    
    logConfig = {
      project: p.name,
      logstore: s.name,
    }
  }

  // 创建 vpc
  const { network, switch: vswitch, securityGroup } = vpc;
  const v = new alicloud.vpc.Network(network.vpc_name, network, { dependsOn: dependsOnRam, customTimeouts: defaultCustomTimeouts });
  const vs = new alicloud.vpc.Switch(vswitch.vswitch_name, {
    ...vswitch,
    vpcId: v.id
  }, { dependsOn: [v, ...dependsOnRam], parent: v, customTimeouts: defaultCustomTimeouts });
  const sg = new alicloud.ecs.SecurityGroup(securityGroup.name, {
    ...securityGroup,
    vpcId: v.id
  }, { dependsOn: [v, ...dependsOnRam], parent: v, customTimeouts: defaultCustomTimeouts });

  // 创建 nas
  const { fileSystem, mountTarget } = nas;
  const fs = new alicloud.nas.FileSystem(fileSystem.storageType, fileSystem);
  const mt = new alicloud.nas.MountTarget(mountTarget.accessGroupName, {
    ...mountTarget,
    vswitchId: vs.id,
    fileSystemId: fs.id
  }, { dependsOn: [fs, vs, ...dependsOnRam], parent: fs, customTimeouts: defaultCustomTimeouts });

  const fcService = new alicloud.fc.Service(service.name, {
    ...service,
    logConfig,
    vpcConfig: {
      securityGroupId: sg.id,
      vswitchIds: [vs.id]
    },
    nasConfig: {
      groupId: 10003,
      userId: 10003,
      mountPoints: [
        {
          serverAddr: mt.id.apply(id => `${id.slice(id.indexOf(':') + 1)}:/${service.name}`),
          mountDir: '/mnt/auto'
        }
      ]
    },
    role: arn
  }, { dependsOn: [v, vs, sg, fs, mt, ...dependsOnRam], customTimeouts: defaultCustomTimeouts });

  for (const funKey in functions) {
    const { function: functionConfig, trigger, customDomains } = functions[funKey];
    const fcFunc = new alicloud.fc.Function(functionConfig.name, {
      ...functionConfig,
      service: fcService.name,
    }, { dependsOn: [fcService], parent: fcService, customTimeouts: defaultCustomTimeouts });

    const fcTrigger = new alicloud.fc.Trigger(`${functionConfig.name}-${trigger.name}`, {
      ...trigger,
      service: fcService.name,
      function: fcFunc.name,
    }, { dependsOn: [fcService, fcFunc], parent: fcFunc, customTimeouts: defaultCustomTimeouts });
  
    if (customDomains) {
      customDomains.forEach(customDomain => {
        new alicloud.fc.CustomDomain(customDomain.domainName, customDomain, { dependsOn: [fcService, fcFunc, fcTrigger], customTimeouts: defaultCustomTimeouts });
      })
    }
  }
}
