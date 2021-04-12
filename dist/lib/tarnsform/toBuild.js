"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("../../constant");
var utils_1 = require("../utils");
function transfromInputs(inputs) {
    var _a = inputs.props, runtime = _a.runtime, region = _a.region, service = _a.service, functionConfig = _a.function;
    inputs.project.component = 'fc-build';
    var accountID = inputs.credentials.AccountID;
    var autoName = constant_1.getAutoName(accountID, region, service.name);
    var config = {
        region: region,
        service: getService(service, autoName),
        function: getFunction(runtime, functionConfig, service.name),
    };
    return __assign(__assign({}, inputs), { props: config });
}
function getService(service, autoName) {
    var config = {
        name: service.name,
    };
    if (service.logConfig) {
        config.logConfig = utils_1.getLogConfig(service.logConfig, autoName);
    }
    return config;
}
function getFunction(runtime, functionConfig, serviceName) {
    var config = {
        name: functionConfig.name || serviceName,
        runtime: runtime || 'custom',
        codeUri: functionConfig.code,
        handler: functionConfig.handler || 'index.handler',
        initializationTimeout: functionConfig.initializationTimeout || 3,
        initializer: functionConfig.initializer,
    };
    return config;
}
exports.default = {
    transfromInputs: transfromInputs,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9CdWlsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdGFybnNmb3JtL3RvQnVpbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUlBLDJDQUE2QztBQUM3QyxrQ0FBdUM7QUFFdkMsU0FBUyxlQUFlLENBQUMsTUFBZTtJQUNoQyxJQUFBLEtBQXNFLE1BQU0sQ0FBQyxLQUFLLEVBQWhGLE9BQU8sYUFBQSxFQUFFLE1BQU0sWUFBQSxFQUFFLE9BQU8sYUFBQSxFQUFZLGNBQWMsY0FBOEIsQ0FBQztJQUV6RixNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7SUFFdEMsSUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7SUFDL0MsSUFBTSxRQUFRLEdBQUcsc0JBQVcsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUU5RCxJQUFNLE1BQU0sR0FBK0I7UUFDekMsTUFBTSxRQUFBO1FBQ04sT0FBTyxFQUFFLFVBQVUsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDO1FBQ3RDLFFBQVEsRUFBRSxXQUFXLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDO0tBQzdELENBQUM7SUFFRiw2QkFDSyxNQUFNLEtBQ1QsS0FBSyxFQUFFLE1BQU0sSUFDYjtBQUNKLENBQUM7QUFFRCxTQUFTLFVBQVUsQ0FBQyxPQUF1QixFQUFFLFFBQWdCO0lBQzNELElBQU0sTUFBTSxHQUFpQztRQUMzQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7S0FDbkIsQ0FBQztJQUVGLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtRQUNyQixNQUFNLENBQUMsU0FBUyxHQUFHLG9CQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztLQUM5RDtJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxPQUFlLEVBQUUsY0FBK0IsRUFBRSxXQUFtQjtJQUN4RixJQUFNLE1BQU0sR0FBa0M7UUFDNUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxJQUFJLElBQUksV0FBVztRQUN4QyxPQUFPLEVBQUUsT0FBTyxJQUFJLFFBQVE7UUFDNUIsT0FBTyxFQUFFLGNBQWMsQ0FBQyxJQUFJO1FBQzVCLE9BQU8sRUFBRSxjQUFjLENBQUMsT0FBTyxJQUFJLGVBQWU7UUFDbEQscUJBQXFCLEVBQUUsY0FBYyxDQUFDLHFCQUFxQixJQUFJLENBQUM7UUFDaEUsV0FBVyxFQUFFLGNBQWMsQ0FBQyxXQUFXO0tBQ3hDLENBQUM7SUFFRixPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQsa0JBQWU7SUFDYixlQUFlLGlCQUFBO0NBQ2hCLENBQUMifQ==