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
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.tarnsform = function (inputs) {
        inputs.project.component = 'fc-metrics';
        var _a = inputs.props, region = _a.region, service = _a.service, functionConfig = _a.function;
        var serviceName = service.name;
        var functionName = functionConfig.name || serviceName;
        return __assign(__assign({}, inputs), { props: {
                regionId: region,
                serviceName: serviceName,
                functionName: functionName
            } });
    };
    return Component;
}());
exports.default = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9NZXRyaWNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi90YXJuc2Zvcm0vdG9NZXRyaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFFQTtJQUFBO0lBa0JBLENBQUM7SUFqQlEsbUJBQVMsR0FBaEIsVUFBaUIsTUFBeUI7UUFDeEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDO1FBRWxDLElBQUEsS0FBZ0QsTUFBTSxDQUFDLEtBQUssRUFBMUQsTUFBTSxZQUFBLEVBQUUsT0FBTyxhQUFBLEVBQVksY0FBYyxjQUFpQixDQUFDO1FBRW5FLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDakMsSUFBTSxZQUFZLEdBQUcsY0FBYyxDQUFDLElBQUksSUFBSSxXQUFXLENBQUM7UUFFeEQsNkJBQ0ssTUFBTSxLQUNULEtBQUssRUFBRTtnQkFDTCxRQUFRLEVBQUUsTUFBTTtnQkFDaEIsV0FBVyxhQUFBO2dCQUNYLFlBQVksY0FBQTthQUNiLElBQ0Q7SUFDSixDQUFDO0lBQ0gsZ0JBQUM7QUFBRCxDQUFDLEFBbEJELElBa0JDIn0=