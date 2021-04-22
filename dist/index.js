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
var core_1 = require("@serverless-devs/core");
var fs_extra_1 = __importDefault(require("fs-extra"));
var os_1 = __importDefault(require("os"));
var path_1 = __importDefault(require("path"));
var lodash_1 = __importDefault(require("lodash"));
var constant_1 = require("./constant");
var utils_1 = require("./lib/utils");
var pulumi_1 = require("./lib/pulumi");
var shell = __importStar(require("shelljs"));
var nasComponent_1 = __importDefault(require("./lib/nasComponent"));
var framework_1 = __importDefault(require("./lib/framework"));
var toMetrics_1 = __importDefault(require("./lib/tarnsform/toMetrics"));
var toLogs_1 = __importDefault(require("./lib/tarnsform/toLogs"));
var fc_1 = __importDefault(require("./lib/framework/fc"));
var toBuild_1 = __importDefault(require("./lib/tarnsform/toBuild"));
var PULUMI_CACHE_DIR = path_1.default.join(os_1.default.homedir(), '.s', 'cache', 'pulumi', 'web-framework');
var ALICLOUD_PLUGIN_VERSION = process.env.ALICLOUD_PLUGIN_VERSION || 'v2.38.0';
var ALICLOUD_PLUGIN_ZIP_FILE_NAME = "pulumi-resource-alicloud-" + ALICLOUD_PLUGIN_VERSION + ".tgz";
var ALICLOUD_PLUGIN_DOWNLOAD_URL = "serverless-pulumi.oss-accelerate.aliyuncs.com/alicloud-plugin/" + ALICLOUD_PLUGIN_ZIP_FILE_NAME;
process.setMaxListeners(0);
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.prototype.deploy = function (inputs) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, credentials, properties, assumeYes, stackId, pulumiStackDir, fcConfigJsonFile, f, fcConfig, pulumiInputs, pulumiComponentIns, upRes, vm, flag;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        apts = {
                            boolean: ['help', 'assumeYes'],
                            alias: { help: 'h', assumeYes: 'y' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        if ((_a = comParse.data) === null || _a === void 0 ? void 0 : _a.help) {
                            core_1.help(constant_1.HELP);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 1:
                        credentials = _d.sent();
                        inputs.credentials = credentials;
                        properties = inputs.props;
                        return [4 /*yield*/, utils_1.getImageAndReport(inputs, credentials.AccountID, 'deploy')];
                    case 2:
                        _d.sent();
                        assumeYes = (_b = comParse.data) === null || _b === void 0 ? void 0 : _b.assumeYes;
                        stackId = utils_1.genStackId(credentials.AccountID, properties.region, properties.service.name);
                        pulumiStackDir = path_1.default.join(PULUMI_CACHE_DIR, stackId);
                        this.logger.debug("Ensuring " + pulumiStackDir + "...");
                        return [4 /*yield*/, fs_extra_1.default.ensureDir(pulumiStackDir, 511)];
                    case 3:
                        _d.sent();
                        fcConfigJsonFile = path_1.default.join(pulumiStackDir, 'config.json');
                        this.logger.debug("Fc config json file path is: " + fcConfigJsonFile);
                        f = new framework_1.default(properties, fcConfigJsonFile, credentials.AccountID);
                        return [4 /*yield*/, f.createConfigFile(lodash_1.default.cloneDeep(inputs), assumeYes)];
                    case 4:
                        fcConfig = _d.sent();
                        return [4 /*yield*/, pulumi_1.cpPulumiCodeFiles(pulumiStackDir)];
                    case 5:
                        _d.sent();
                        shell.exec("cd " + pulumiStackDir + " && npm i", { silent: true });
                        pulumiInputs = pulumi_1.genPulumiInputs(inputs, stackId, properties.region, pulumiStackDir);
                        return [4 /*yield*/, core_1.loadComponent('devsapp/pulumi-alibaba')];
                    case 6:
                        pulumiComponentIns = _d.sent();
                        return [4 /*yield*/, pulumiComponentIns.installPluginFromUrl({
                                props: { url: ALICLOUD_PLUGIN_DOWNLOAD_URL, version: ALICLOUD_PLUGIN_VERSION }
                            })];
                    case 7:
                        _d.sent();
                        return [4 /*yield*/, pulumiComponentIns.up(pulumiInputs)];
                    case 8:
                        upRes = _d.sent();
                        if (upRes.stderr && upRes.stderr !== '') {
                            this.logger.error("deploy error: " + upRes.stderr);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, nasComponent_1.default.init(properties, lodash_1.default.cloneDeep(inputs))];
                    case 9:
                        _d.sent();
                        vm = core_1.spinner('Try container acceleration');
                        return [4 /*yield*/, fc_1.default.tryContainerAcceleration(credentials, properties.region, fcConfig.service.name, fcConfig.function.name, fcConfig.function.customContainerConfig)];
                    case 10:
                        flag = _d.sent();
                        if (!(fcConfig.customDomains && fcConfig.customDomains[0].domainName)) return [3 /*break*/, 12];
                        return [4 /*yield*/, utils_1.requestDomains(fcConfig.customDomains[0].domainName)];
                    case 11:
                        _d.sent();
                        _d.label = 12;
                    case 12: return [4 /*yield*/, nasComponent_1.default.remove(properties, lodash_1.default.cloneDeep(inputs))];
                    case 13:
                        _d.sent();
                        if (flag) {
                            vm.succeed();
                        }
                        else {
                            vm.fail();
                        }
                        // 返回结果
                        return [2 /*return*/, {
                                region: properties.region,
                                serviceName: fcConfig.service.name,
                                functionName: fcConfig.function.name,
                                customDomains: (_c = fcConfig.customDomains) === null || _c === void 0 ? void 0 : _c.map(function (_a) {
                                    var domainName = _a.domainName;
                                    return domainName;
                                })
                            }];
                }
            });
        });
    };
    Component.prototype.remove = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, credentials, properties, serviceName, functionName, stackId, pulumiStackDir, pulumiStackFile, pulumiInputs, pulumiComponentIns, upRes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help', 'assumeYes'],
                            alias: { help: 'h', assumeYes: 'y' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        if ((_a = comParse.data) === null || _a === void 0 ? void 0 : _a.help) {
                            core_1.help(constant_1.HELP);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 1:
                        credentials = _b.sent();
                        return [4 /*yield*/, utils_1.getImageAndReport(inputs, credentials.AccountID, 'remove')];
                    case 2:
                        _b.sent();
                        properties = inputs.props;
                        serviceName = properties.service.name;
                        functionName = properties.function.name || serviceName;
                        stackId = utils_1.genStackId(credentials.AccountID, properties.region, properties.service.name);
                        pulumiStackDir = path_1.default.join(PULUMI_CACHE_DIR, stackId);
                        pulumiStackFile = path_1.default.join(pulumiStackDir, 'config.json');
                        return [4 /*yield*/, utils_1.isFile(pulumiStackFile)];
                    case 3:
                        if (_b.sent()) {
                            this.logger.error('Please deploy resource first');
                            return [2 /*return*/];
                        }
                        pulumiInputs = pulumi_1.genPulumiInputs(inputs, stackId, properties.region, pulumiStackDir);
                        return [4 /*yield*/, core_1.loadComponent('devsapp/pulumi-alibaba')];
                    case 4:
                        pulumiComponentIns = _b.sent();
                        return [4 /*yield*/, pulumiComponentIns.installPluginFromUrl({
                                props: { url: ALICLOUD_PLUGIN_DOWNLOAD_URL, version: ALICLOUD_PLUGIN_VERSION }
                            })];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, utils_1.delFunctionInConfFile(pulumiStackFile, { serviceName: serviceName, functionName: functionName }, 'w', 511)];
                    case 6:
                        if (!_b.sent()) return [3 /*break*/, 9];
                        return [4 /*yield*/, pulumiComponentIns.destroy(pulumiInputs)];
                    case 7:
                        upRes = _b.sent();
                        return [4 /*yield*/, fs_extra_1.default.remove(pulumiStackFile)];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 11];
                    case 9: return [4 /*yield*/, pulumiComponentIns.up(pulumiInputs)];
                    case 10:
                        upRes = _b.sent();
                        _b.label = 11;
                    case 11:
                        if (upRes.stderr && upRes.stderr !== '') {
                            this.logger.error("destroy error: " + upRes.stderr);
                            return [2 /*return*/];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.build = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, builds, cloneInputs;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = inputs;
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 1:
                        _a.credentials = _b.sent();
                        return [4 /*yield*/, utils_1.getImageAndReport(inputs, inputs.credentials.AccountID, 'build')];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, core_1.loadComponent('devsapp/fc-build')];
                    case 3:
                        builds = _b.sent();
                        cloneInputs = toBuild_1.default.transfromInputs(lodash_1.default.cloneDeep(inputs));
                        return [4 /*yield*/, builds.build(cloneInputs)];
                    case 4:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.logs = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, inputsLogs, logs;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!((_a = inputs.props.service) === null || _a === void 0 ? void 0 : _a.logConfig)) {
                            throw new Error('To use this function, you need to configure the log function in the service, please refer to https://github.com/devsapp/web-framework/blob/master/readme.md#service');
                        }
                        _b = inputs;
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 1:
                        _b.credentials = _c.sent();
                        return [4 /*yield*/, utils_1.getImageAndReport(inputs, inputs.credentials.AccountID, 'logs')];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, toLogs_1.default.tarnsform(lodash_1.default.cloneDeep(inputs))];
                    case 3:
                        inputsLogs = _c.sent();
                        return [4 /*yield*/, core_1.loadComponent('devsapp/logs')];
                    case 4:
                        logs = _c.sent();
                        return [4 /*yield*/, logs.logs(inputsLogs)];
                    case 5:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.metrics = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, inputsMetrics, metrics;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = inputs;
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 1:
                        _a.credentials = _b.sent();
                        return [4 /*yield*/, utils_1.getImageAndReport(inputs, inputs.credentials.AccountID, 'metrics')];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, toMetrics_1.default.tarnsform(lodash_1.default.cloneDeep(inputs))];
                    case 3:
                        inputsMetrics = _b.sent();
                        return [4 /*yield*/, core_1.loadComponent('devsapp/fc-metrics')];
                    case 4:
                        metrics = _b.sent();
                        return [4 /*yield*/, metrics.metrics(inputsMetrics)];
                    case 5:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.cp = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 1:
                        credentials = _a.sent();
                        return [4 /*yield*/, utils_1.getImageAndReport(inputs, credentials.AccountID, 'cp')];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, nasComponent_1.default.cp(inputs.props, lodash_1.default.cloneDeep(inputs))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.ls = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 1:
                        credentials = _a.sent();
                        return [4 /*yield*/, utils_1.getImageAndReport(inputs, credentials.AccountID, 'ls')];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, nasComponent_1.default.ls(inputs.props, lodash_1.default.cloneDeep(inputs))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.rm = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 1:
                        credentials = _a.sent();
                        return [4 /*yield*/, utils_1.getImageAndReport(inputs, credentials.AccountID, 'rm')];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, nasComponent_1.default.rm(inputs.props, lodash_1.default.cloneDeep(inputs))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.HLogger(constant_1.CONTEXT),
        __metadata("design:type", Object)
    ], Component.prototype, "logger", void 0);
    return Component;
}());
exports.default = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBUStCO0FBQy9CLHNEQUEyQjtBQUMzQiwwQ0FBb0I7QUFDcEIsOENBQXdCO0FBQ3hCLGtEQUF1QjtBQUN2Qix1Q0FBMkM7QUFFM0MscUNBQTJHO0FBQzNHLHVDQUFrRTtBQUNsRSw2Q0FBaUM7QUFDakMsb0VBQThDO0FBQzlDLDhEQUF3QztBQUN4Qyx3RUFBa0Q7QUFDbEQsa0VBQTRDO0FBQzVDLDBEQUFvQztBQUNwQyxvRUFBNEM7QUFFNUMsSUFBTSxnQkFBZ0IsR0FBVyxjQUFJLENBQUMsSUFBSSxDQUFDLFlBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxlQUFlLENBQUMsQ0FBQztBQUVuRyxJQUFNLHVCQUF1QixHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLElBQUksU0FBUyxDQUFDO0FBQ2pGLElBQU0sNkJBQTZCLEdBQUcsOEJBQTRCLHVCQUF1QixTQUFNLENBQUM7QUFDaEcsSUFBTSw0QkFBNEIsR0FBRyxtRUFBaUUsNkJBQStCLENBQUM7QUFFdEksT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUUzQjtJQUFBO0lBOExBLENBQUM7SUEzTE8sMEJBQU0sR0FBWixVQUFhLE1BQWU7Ozs7Ozs7d0JBQ3BCLElBQUksR0FBRzs0QkFDWCxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDOzRCQUM5QixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7eUJBQ3JDLENBQUM7d0JBQ0ksUUFBUSxHQUFrQixtQkFBWSxDQUFDLEVBQUUsSUFBSSxFQUFF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