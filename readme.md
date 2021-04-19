# 帮助文档

通过该组件，可以快速完成阿里云函数计算相关项目的构建。

## 参数

|  参数   |  必填  |  类型  | 取值  |  描述  |  备注  |    
|  ----  | ----  |  ----  | ----  |  ----  |  ----  |
| runtime  | true | string  | nodejs12、python3、php7.2、custom | 运行环境  |  -  |
| region  | true |  string |  cn-beijing、cn-hangzhou、cn-shanghai、cn-qingdao、cn-zhangjiakou、cn-huhehaote、cn-shenzhen、cn-chengdu、 cn-hongkong、ap-southeast-1、 ap-southeast-2、ap-southeast-3、 ap-southeast-5、ap-northeast-1、eu-central-1、eu-west-1、us-west-1、us-east-1、ap-south-1  |  地域 |   |
| service  | true | struct  | [service](#service) | 服务  |  -  |
| function  | true | struct  | [function](#function) | 函数  |  -  |
| trigger  | false | struct  | [trigger](#trigger) | 触发器  |  -  |
| customDomains | false | struct  | [customContainer](#customContainer) | 自定义域名  |  -  |


### service

|  参数   |  必填  |  类型  | 取值  |  描述  |  备注  |    
|  ----  | ----  |  ----  | ----  |  ----  |  ----  |
| name  | true | string  | - | 服务名称  |  -  |
| description  | false | string  | - | 描述  |  -  |
| logConfig  | false | Auto、auto 和 [logConfig](#logConfig)  | - | 日志配置  |  -  |
| role  | false | Auto、auto 和 [role](#role)  | - | 角色配置  |  默认为 Auto  |

#### logConfig

|  参数   |  必填  |  类型  | 取值  |  描述  |  备注  |    
|  ----  | ----  |  ----  | ----  |  ----  |  ----  |
| logStore  | true | string  | - | logstore 名称  |  -  |
| project  | true | string  | - | project 名称  |  -  |

#### role

|  参数   |  必填  |  类型  | 取值  |  描述  |  备注  |    
|  ----  | ----  |  ----  | ----  |  ----  |  ----  |
| name  | true | string  | - | 角色名  |  -  |
| statement  | false | [statement](#statement)  | - | 角色授权 statement  |  请参考[权限策略基本元素](https://help.aliyun.com/document_detail/93738.html)  |
| policys  | true | list<string> 、List<[policy](#policy)>  | - | 角色名  |  -  |

##### policy

|  参数   |  必填  |  类型  | 取值  |  描述  |  备注  |    
|  ----  | ----  |  ----  | ----  |  ----  |  ----  |
| policyName  | true | string  | - | 策略名称  |  -  |
| policyType  | false | Custom 、System   | - | 策略类型  | 和 statement 有一个必填，如果填写则认为是已经存在的，直接复用，优先级高于statement |
| statement  | false | [statement](#statement)  | - | 角色授权 statement  |  和 policyType 有一个必填，如果填写则创建，具体配置请参考[权限策略基本元素](https://help.aliyun.com/document_detail/93738.html)  |

##### statement

|  参数   |  必填  |  类型  | 取值  |  描述  |  备注  |    
|  ----  | ----  |  ----  | ----  |  ----  |  ----  |
| Effect  | true | string  | Deny、Allow | Effect设置，同意或拒绝  |  -  |
|  Action  | true  |  List<String>  | ----  |  行为，动作  |  ----  |
|  Principal  | true  | ----  | ----  |  ----  |  ----  |


### function

|  参数   |  必填  |  类型  | 取值  |  描述  |  备注  |    
|  ----  | ----  |  ----  | ----  |  ----  |  ----  |
| name  | false | string  | - | 函数名称  |  -  |
| description  | false | string  | - | 描述  |  -  |
| customContainerConfig  | true | [customContainerConfig](#customContainerConfig)  | - | 自定义镜像  | - |
| code  | true | [code](#code)  | - | 代码包配置  |  -  |
| environmentVariables  | false | strcut | - | 环境变量配置  | 示例配置：PATH: /mnt/auto:/mnt/auto/lib  |
| caPort  | false | number  | - | 监听端口  |  默认 9000  |
| timeout  | false | number  | - | 超时  |  默认 60s  |
| memorySize  | false | number  | - | 内存大小  | 默认 1024  |

#### customContainerConfig

|  参数   |  必填  |  类型  | 取值  |  描述  |  备注  |    
|  ----  | ----  |  ----  | ----  |  ----  |  ----  |
| image  | false | string  | - | 仓库地址  | 例如`'registry.cn-hongkong.aliyuncs.com/s-devs-generate/fc-com-test-build-image:v0.1'`  |
| command  | false | string  | - | 命令  |  例如`'["node"]'`  |
| args  | false | string  | - | 参数  |  例如 `'["index.js"]'`  |

#### code

|  参数   |  必填  |  类型  | 取值  |  描述  |  备注  |    
|  ----  | ----  |  ----  | ----  |  ----  |  ----  |
|  src  | true  |  string  | ----  |  代码包本地路径  |  ----  |
|  excludes  | false  |  list<string>  | ----  |  代码包本地路径不包含部分  |  写法参考.gitignore  |


### trigger

|  参数   |  必填  |  类型  | 取值  |  描述  |  备注  |    
|  ----  | ----  |  ----  | ----  |  ----  |  ----  |
|  name  | false  |  string  | ----  |  触发器名称  |  ----  |
|  type  | true  |  -  | http  |  触发器类型  |  ----  |
|  config  | true  |  -  | [config](#config)  |  触发器配置  |  ----  |

#### config

|  参数   |  必填  |  类型  | 取值  |  描述  |  备注  |    
|  ----  | ----  |  ----  | ----  |  ----  |  ----  |
|  authType  | true  |  string  | ANONYMOUS、FUNCTION  |  鉴权类型  |  ----  |
|  methods  | true  |  list<string>  | GET POST PUT DELETE HEAD PATCH |  HTTP 触发器支持的访问方法  |  ----  |


### customContainer

|  参数   |  必填  |  类型  | 取值  |  描述  |  备注  |    
|  ----  | ----  |  ----  | ----  |  ----  |  ----  |
|  domainName  | true  |  string  | ----  |  域名  |  ----  |
|  protocol  | true  |  string  | HTTP 、 'HTTP,HTTPS'  |  协议  |  ----  |
|  routeConfigs  | true  |  list<[routeConfig](#routeConfigs)>  | ----  |  路由配置  |  ----  |

#### routeConfig

|  参数   |  必填  |  类型  | 取值  |  描述  |  备注  |
|  ----  | ----  |  ----  | ----  |  ----  |  ----  |
|  path  | true  |  string  | ----  |  路径  |  ----  |
|  serviceName  | false  |  string  | ----  |  服务名  |  ----  |
|  functionName  | false  |  string  | ----  |  函数名  |  ----  |
|  methods  | false  |  list<string>  | ----  |  请求方法  |  ----  |
|  certConfig  | false  |  [certConfig](#certConfig)  | ----  |  证书配置  |  ----  |

##### certConfig

|  参数   |  必填  |  类型  | 取值  |  描述  |  备注  |
|  ----  | ----  |  ----  | ----  |  ----  |  ----  |
|  certName  | true  |  string  | ----  |  证书名称  |  ----  |
|  certificate  | true  |  string  | ----  |  证书certificate  |  本地路径或文件内容  |
|  privateKey  | true  |  string  | ----  |  证书privateKey  |  本地路径或文件内容  |


## 操作的资源

- 函数计算
- 访问控制
- 专有网路 VPC
- 安全组
- 自定义域名
- 日志仓库
  - 如果没有配置日志则不需要
- 容器镜像服务
  - 如果获取的不是私有仓库则不需要


## s.yml

````
Test:
  Component: web-framework
  Provider: alibaba
  Access: wss
  Properties:
    runtime: nodejs12
    region: cn-shenzhen
    service:
      name: A-express
      # logConfig: Auto
      # description: 测试环节
    function:
      # name: A-express
      # service: test-wss-web
      # runtime: nodejs12
      # description: 测试环节
      customContainerConfig:
        image: registry.cn-shenzhen.aliyuncs.com/test-wss/nodejs12:v0.1
        command: '["node", "index.js"]'
        # args: '["--port", "9000"]'
      # caPort: 9000
      code:
        src: ./src
        excludes:
          - package-lock.json
    # trigger:
    #   # name: def
    #   # function: test
    #   # service: test-wss-web
    #   type: http
    #   config:
    #     authType: anonymous
    #     methods:
    #       - GET
    #       - POST
    #       - PUT
    customDomains:
      - domainName: Auto
        protocol: HTTP
        routeConfigs:
          - path: '/*'
      # - domainName: test.shoushuai.top
      #   protocol: HTTP,HTTPS
      #   routeConfigs:
      #     - path: '/'
      #   certConfig:
      #     certName: test
      #     certificate: ./certConfigCutom/cate.pem
      #     privateKey: ./certConfigCutom/key.pem
````

## 发布流程:
````
$ npm i

$ npm run build:ts
````