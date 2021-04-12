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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3Rhcm5zZm9ybS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBSUEsMkNBQTZDO0FBQzdDLGtDQUF1QztBQUV2QyxTQUFTLGVBQWUsQ0FBQyxNQUFlO0lBQ2hDLElBQUEsS0FBc0UsTUFBTSxDQUFDLEtBQUssRUFBaEYsT0FBTyxhQUFBLEVBQUUsTUFBTSxZQUFBLEVBQUUsT0FBTyxhQUFBLEVBQVksY0FBYyxjQUE4QixDQUFDO0lBRXpGLElBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO0lBQy9DLElBQU0sUUFBUSxHQUFHLHNCQUFXLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFOUQsSUFBTSxNQUFNLEdBQStCO1FBQ3pDLE1BQU0sUUFBQTtRQUNOLE9BQU8sRUFBRSxVQUFVLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQztRQUN0QyxRQUFRLEVBQUUsV0FBVyxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQztLQUM3RCxDQUFDO0lBRUYsNkJBQ0ssTUFBTSxLQUNULEtBQUssRUFBRSxNQUFNLElBQ2I7QUFDSixDQUFDO0FBRUQsU0FBUyxVQUFVLENBQUMsT0FBdUIsRUFBRSxRQUFnQjtJQUMzRCxJQUFNLE1BQU0sR0FBaUM7UUFDM0MsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO0tBQ25CLENBQUM7SUFFRixJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7UUFDckIsTUFBTSxDQUFDLFNBQVMsR0FBRyxvQkFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDOUQ7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQsU0FBUyxXQUFXLENBQUMsT0FBZSxFQUFFLGNBQStCLEVBQUUsV0FBbUI7SUFDeEYsSUFBTSxNQUFNLEdBQWtDO1FBQzVDLElBQUksRUFBRSxjQUFjLENBQUMsSUFBSSxJQUFJLFdBQVc7UUFDeEMsT0FBTyxFQUFFLE9BQU8sSUFBSSxRQUFRO1FBQzVCLE9BQU8sRUFBRSxjQUFjLENBQUMsSUFBSTtRQUM1QixPQUFPLEVBQUUsY0FBYyxDQUFDLE9BQU8sSUFBSSxlQUFlO1FBQ2xELHFCQUFxQixFQUFFLGNBQWMsQ0FBQyxxQkFBcUIsSUFBSSxDQUFDO1FBQ2hFLFdBQVcsRUFBRSxjQUFjLENBQUMsV0FBVztLQUN4QyxDQUFDO0lBRUYsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUVELGtCQUFlO0lBQ2IsZUFBZSxpQkFBQTtDQUNoQixDQUFDIn0=