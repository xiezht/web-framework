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
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.tarnsform = function (inputs) {
        inputs.project.component = 'fc-logs';
        var _a = inputs.props, region = _a.region, service = _a.service, functionConfig = _a.function;
        var accountID = inputs.credentials.AccountID;
        var topic = service.name;
        var query = (functionConfig.name || topic) + " | with_pack_meta";
        var autoName = constant_1.getAutoName(accountID, region, topic);
        return __assign(__assign({}, inputs), { props: {
                region: region,
                topic: topic,
                query: query,
                logConfig: utils_1.getLogConfig(service.logConfig, autoName),
            } });
    };
    return Component;
}());
exports.default = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9Mb2dzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi90YXJuc2Zvcm0vdG9Mb2dzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFHQSwyQ0FBNkM7QUFDN0Msa0NBQXdDO0FBRXhDO0lBQUE7SUFzQkEsQ0FBQztJQXJCUSxtQkFBUyxHQUFoQixVQUFpQixNQUFlO1FBQzlCLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUUvQixJQUFBLEtBQXVFLE1BQU0sQ0FBQyxLQUFLLEVBQWpGLE1BQU0sWUFBQSxFQUFFLE9BQU8sYUFBQSxFQUFZLGNBQWMsY0FBd0MsQ0FBQztRQUMxRixJQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztRQUUvQyxJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQzNCLElBQU0sS0FBSyxHQUFHLENBQUcsY0FBYyxDQUFDLElBQUksSUFBSSxLQUFLLHVCQUFtQixDQUFDO1FBRWpFLElBQU0sUUFBUSxHQUFHLHNCQUFXLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV2RCw2QkFDSyxNQUFNLEtBQ1QsS0FBSyxFQUFFO2dCQUNMLE1BQU0sUUFBQTtnQkFDTixLQUFLLE9BQUE7Z0JBQ0wsS0FBSyxPQUFBO2dCQUNMLFNBQVMsRUFBRSxvQkFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDO2FBQ3JELElBQ0Q7SUFDSixDQUFDO0lBQ0gsZ0JBQUM7QUFBRCxDQUFDLEFBdEJELElBc0JDIn0=