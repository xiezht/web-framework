"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core = __importStar(require("@serverless-devs/core"));
var lodash_1 = __importDefault(require("lodash"));
var constant_1 = require("../../constant");
var utils_1 = require("../utils");
var client_1 = __importDefault(require("../client"));
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.get = function (regionId, profile, assumeYes) {
        return __awaiter(this, void 0, void 0, function () {
            var nasClient, zones, _i, _a, item, _b, _c, item, msg, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        nasClient = client_1.default.pop("http://nas." + regionId + ".aliyuncs.com", profile);
                        return [4 /*yield*/, nasClient.request('DescribeZones', { RegionId: regionId }, { method: 'POST' })];
                    case 1:
                        zones = _e.sent();
                        this.logger.debug("Call DescribeZones RegionId is: " + regionId + ", response is: " + JSON.stringify(zones));
                        for (_i = 0, _a = zones.Zones.Zone; _i < _a.length; _i++) {
                            item = _a[_i];
                            if (!lodash_1.default.isEmpty(item.Performance.Protocol)) {
                                return [2 /*return*/, 'Performance'];
                            }
                        }
                        _b = 0, _c = zones.Zones.Zone;
                        _e.label = 2;
                    case 2:
                        if (!(_b < _c.length)) return [3 /*break*/, 6];
                        item = _c[_b];
                        if (!!lodash_1.default.isEmpty(item.Capacity.Protocol)) return [3 /*break*/, 5];
                        msg = "Region " + regionId + " only supports capacity NAS. Do you want to create it automatically?";
                        _d = assumeYes;
                        if (_d) return [3 /*break*/, 4];
                        return [4 /*yield*/, utils_1.promptForConfirmContinue(msg)];
                    case 3:
                        _d = (_e.sent());
                        _e.label = 4;
                    case 4:
                        if (_d) {
                            return [2 /*return*/, 'Capacity'];
                        }
                        _e.label = 5;
                    case 5:
                        _b++;
                        return [3 /*break*/, 2];
                    case 6: throw new Error("No NAS service available under region " + regionId + ".");
                }
            });
        });
    };
    __decorate([
        core.HLogger(constant_1.CONTEXT),
        __metadata("design:type", Object)
    ], Component, "logger", void 0);
    return Component;
}());
exports.default = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZVR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2ZyYW1ld29yay9zdG9yYWdlVHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBOEM7QUFDOUMsa0RBQXVCO0FBQ3ZCLDJDQUF5QztBQUN6QyxrQ0FBb0Q7QUFDcEQscURBQStCO0FBRy9CO0lBQUE7SUFpQ0EsQ0FBQztJQTlCYyxhQUFHLEdBQWhCLFVBQWlCLFFBQWdCLEVBQUUsT0FBcUIsRUFBRSxTQUFrQjs7Ozs7O3dCQUNwRSxTQUFTLEdBQUcsZ0JBQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWMsUUFBUSxrQkFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFDO3dCQUUxRCxxQkFBTSxTQUFTLENBQUMsT0FBTyxDQUN4QyxlQUFlLEVBQ2YsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEVBQ3RCLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUNuQixFQUFBOzt3QkFKSyxLQUFLLEdBQVEsU0FJbEI7d0JBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQ2YscUNBQW1DLFFBQVEsdUJBQWtCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFHLENBQ3JGLENBQUM7d0JBRUYsV0FBbUMsRUFBaEIsS0FBQSxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBaEIsY0FBZ0IsRUFBaEIsSUFBZ0IsRUFBRTs0QkFBMUIsSUFBSTs0QkFDYixJQUFJLENBQUMsZ0JBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQ0FDekMsc0JBQU8sYUFBYSxFQUFDOzZCQUN0Qjt5QkFDRjs4QkFFa0MsRUFBaEIsS0FBQSxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUk7Ozs2QkFBaEIsQ0FBQSxjQUFnQixDQUFBO3dCQUF4QixJQUFJOzZCQUNULENBQUMsZ0JBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBbEMsd0JBQWtDO3dCQUM5QixHQUFHLEdBQUcsWUFBVSxRQUFRLHlFQUFzRSxDQUFDO3dCQUNqRyxLQUFBLFNBQVMsQ0FBQTtnQ0FBVCx3QkFBUzt3QkFBSyxxQkFBTSxnQ0FBd0IsQ0FBQyxHQUFHLENBQUMsRUFBQTs7d0JBQXBDLEtBQUEsQ0FBQyxTQUFtQyxDQUFDLENBQUE7Ozt3QkFBdEQsUUFBd0Q7NEJBQ3RELHNCQUFPLFVBQVUsRUFBQzt5QkFDbkI7Ozt3QkFMYyxJQUFnQixDQUFBOzs0QkFTbkMsTUFBTSxJQUFJLEtBQUssQ0FBQywyQ0FBeUMsUUFBUSxNQUFHLENBQUMsQ0FBQzs7OztLQUN2RTtJQS9Cc0I7UUFBdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBTyxDQUFDOzttQ0FBNkI7SUFnQ3JELGdCQUFDO0NBQUEsQUFqQ0QsSUFpQ0M7a0JBakNvQixTQUFTIn0=