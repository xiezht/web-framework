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
var domain_1 = __importDefault(require("./domain"));
var role_1 = __importDefault(require("./role"));
var fc_1 = __importDefault(require("./fc"));
var storageType_1 = __importDefault(require("./storageType"));
var utils_1 = require("../utils");
var Component = /** @class */ (function () {
    function Component(properties, configFile, accountID) {
        var serviceName = properties.service.name;
        var functionName = properties.function.name || serviceName;
        this.properties = properties;
        this.configFile = configFile;
        this.accountID = accountID;
        this.serviceName = serviceName;
        this.functionName = functionName;
        this.autoName = constant_1.getAutoName(accountID, properties.region, serviceName);
    }
    Component.prototype.createConfigFile = function (inputs, assumeYes) {
        return __awaiter(this, void 0, void 0, function () {
            var config, service, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.logger.debug(this.configFile + " not exist, creating...");
                        config = {
                            service: this.getService(),
                            function: this.getFunctonConfig(),
                            trigger: this.getTrigger(),
                        };
                        service = this.properties.service;
                        _a = config;
                        return [4 /*yield*/, this.genVpcConfig(inputs)];
                    case 1:
                        _a.vpc = _d.sent();
                        _b = config;
                        return [4 /*yield*/, this.genNasConfig(inputs, assumeYes)];
                    case 2:
                        _b.nas = _d.sent();
                        if (utils_1.isAuto(service.logConfig)) {
                            config.log = this.genLogConfig();
                        }
                        // @TODO: 需要重构 pulumi 的 role 模块
                        if (!service.role || utils_1.isAuto(service.role)) {
                            Object.assign(config, role_1.default.genAutoRole(this.autoName));
                        }
                        else {
                            Object.assign(config, role_1.default.getRole(service.role));
                        }
                        delete service.role;
                        _c = config;
                        return [4 /*yield*/, domain_1.default.get(inputs)];
                    case 3:
                        _c.customDomains = _d.sent();
                        return [4 /*yield*/, utils_1.writeStrToFile(this.configFile, JSON.stringify(config, null, '  '), 'w', 511)];
                    case 4:
                        _d.sent();
                        this.logger.debug(this.configFile + " created done!");
                        return [2 /*return*/, config];
                }
            });
        });
    };
    Component.prototype.getService = function () {
        var service = lodash_1.default.cloneDeep(this.properties.service);
        if (utils_1.isAuto(service.logConfig)) {
            delete service.logConfig;
        }
        return service;
    };
    Component.prototype.getFunctonConfig = function () {
        var functionConfig = lodash_1.default.clone(this.properties.function);
        var caPort = functionConfig.caPort, handler = functionConfig.handler, memorySize = functionConfig.memorySize, timeout = functionConfig.timeout;
        functionConfig.service = this.serviceName;
        functionConfig.name = this.functionName;
        functionConfig.caPort = caPort || 9000;
        functionConfig.timeout = timeout || 60;
        functionConfig.memorySize = memorySize || 1024;
        functionConfig.handler = handler || 'index.handler';
        functionConfig.runtime = 'custom-container';
        delete functionConfig.code;
        return functionConfig;
    };
    Component.prototype.getTrigger = function () {
        var triggerConfig = this.properties.trigger;
        var _a = this, serviceName = _a.serviceName, functionName = _a.functionName;
        if (!triggerConfig) {
            return {
                name: serviceName,
                function: functionName,
                service: serviceName,
                type: 'http',
                config: constant_1.HTTP_CONFIG
            };
        }
        var name = triggerConfig.name, type = triggerConfig.type, config = triggerConfig.config;
        return {
            type: type,
            name: name || serviceName,
            function: functionName,
            service: serviceName,
            config: JSON.stringify(config),
        };
    };
    Component.prototype.genVpcConfig = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = {
                            network: {
                                cidrBlock: '10.0.0.0/8',
                                vpc_name: this.autoName,
                            }
                        };
                        _b = {
                            vswitch_name: this.autoName,
                            cidrBlock: '10.0.0.0/16',
                            vpcId: ''
                        };
                        return [4 /*yield*/, fc_1.default.getZoneId(this.properties.region, inputs.Credentials)];
                    case 1: return [2 /*return*/, (_a.switch = (_b.availabilityZone = _c.sent(),
                            _b),
                            _a.securityGroup = {
                                description: 'web-framework-generate',
                                name: this.autoName,
                                securityGroupType: 'normal',
                                InnerAccessPolicy: 'Accept',
                                vpcId: '',
                            },
                            _a)];
                }
            });
        });
    };
    Component.prototype.genNasConfig = function (inputs, assumeYes) {
        return __awaiter(this, void 0, void 0, function () {
            var profile, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        profile = inputs.Credentials;
                        _a = {};
                        _b = {
                            protocolType: 'NFS'
                        };
                        return [4 /*yield*/, storageType_1.default.get(this.properties.region, profile, assumeYes)];
                    case 1: return [2 /*return*/, (_a.fileSystem = (_b.storageType = _c.sent(),
                            _b.description = 'web-framework-generate',
                            _b),
                            _a.mountTarget = {
                                fileSystemId: '',
                                vswitchId: '',
                                accessGroupName: 'DEFAULT_VPC_GROUP_NAME',
                            },
                            _a)];
                }
            });
        });
    };
    Component.prototype.genLogConfig = function () {
        return {
            project: {
                name: this.autoName.toLocaleLowerCase().replace(/_/g, '-'),
                description: 'web-framework-generate',
            },
            store: {
                name: constant_1.STORENAME,
                enableWebTracking: true,
            },
            storeIndex: {
                fullText: {
                    token: ', \'";=()[]{}?@&<>/:\n\t\r',
                },
            },
        };
    };
    __decorate([
        core.HLogger(constant_1.CONTEXT),
        __metadata("design:type", Object)
    ], Component.prototype, "logger", void 0);
    return Component;
}());
exports.default = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2ZyYW1ld29yay9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBOEM7QUFDOUMsa0RBQXVCO0FBRXZCLDJDQUE4RTtBQUM5RSxvREFBOEI7QUFDOUIsZ0RBQTBCO0FBQzFCLDRDQUFzQjtBQUN0Qiw4REFBd0M7QUFDeEMsa0NBQWtEO0FBR2xEO0lBV0UsbUJBQVksVUFBdUIsRUFBRSxVQUFrQixFQUFFLFNBQWlCO1FBQ3hFLElBQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQzVDLElBQU0sWUFBWSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLFdBQVcsQ0FBQztRQUU3RCxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUVqQyxJQUFJLENBQUMsUUFBUSxHQUFHLHNCQUFXLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVLLG9DQUFnQixHQUF0QixVQUF1QixNQUFNLEVBQUUsU0FBa0I7Ozs7Ozt3QkFDL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUksSUFBSSxDQUFDLFVBQVUsNEJBQXlCLENBQUMsQ0FBQzt3QkFFekQsTUFBTSxHQUFROzRCQUNsQixPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRTs0QkFDMUIsUUFB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