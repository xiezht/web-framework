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
                        if (!service.role || utils_1.isAuto(service.role)) {
                            Object.assign(config, role_1.default.genAutoRole(this.autoName));
                        }
                        else {
                            Object.assign(config, role_1.default.getRole(service.role));
                        }
                        delete config.service.role;
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