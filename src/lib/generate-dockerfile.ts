import fse from 'fs-extra';
import path from 'path';

const { spawnSync } = require('child_process');

export default async function (inputs, qualifier = 'LATEST') {
  const properties = inputs.props;
  const serviceName = properties.service.name;
  const {
    customContainerConfig,
    code,
    name: functionName = serviceName
  } = properties.function;
  /*
  创建镜像过程
  1. 生成dockerfile以及dockerignore，如果存在则不处理
  2. 利用hanxie大佬的provider修改push，
      由于之前的镜像是我们的公用镜像，所以需要转化成用户的镜像。
  3. 替换   getImageAndReport   得到imageId */

  let dockerPath = 'DockerFile';
  let deleteIgnore = false;

  const codeUri = await getSrc(code, serviceName, functionName);
  if (!(await fse.pathExists('DockerFile'))) {
    dockerPath = '.Dockerfile';
    await fse.writeFileSync(dockerPath, `FROM ${customContainerConfig.image}
RUN mkdir /code
ADD ${codeUri} /code/${functionName}
RUN chmod 755 -R /code
WORKDIR /code/${functionName}`);
  }

  if (!(await fse.pathExists('.dockerignore'))) {
    deleteIgnore = true;
    const exclude = code.excludes || [];
    exclude.unshift('.s/');
    await fse.writeFileSync('.dockerignore', exclude.join(codeUri ? `\n${codeUri}/` : '\n'));
  }

  const imageId = `${inputs.appName.toLowerCase()}/${inputs.project.projectName.toLowerCase()}:${qualifier}`;
  const { status } = spawnSync(`docker build -t ${imageId} -f ${dockerPath} . `, [], {
    cwd: './',
    stdio: 'inherit',
    shell: true
  });

  if (deleteIgnore) {
    await fse.remove('.dockerignore');
  }
  if (dockerPath === '.Dockerfile') {
    await fse.remove(dockerPath);
  }

  if (status) {
    throw new Error('Failed to package image.');
  }
  return imageId;
}

async function getSrc(code, serviceName: string, functionName: string): Promise<string> {
  const buildCodeUri = path.join(
    process.cwd(),
    '.s',
    'build',
    'artifacts',
    serviceName,
    functionName,
  );

  if (await fse.pathExists(buildCodeUri)) {
    return buildCodeUri;
  }

  return code.src;
}
