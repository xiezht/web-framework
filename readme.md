# s.yml

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

# 发布流程:
````
$ npm i

$ npm run build:ts
````