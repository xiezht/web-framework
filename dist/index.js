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
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.prototype.deploy = function (inputs) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, credentials, properties, assumeYes, stackId, pulumiStackDir, fcConfigJsonFile, f, fcConfig, pulumiInputs, pulumiComponentIns, upRes;
            return __generator(this, function (_e) {
                switch (_e.label) {
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
                        credentials = _e.sent();
                        inputs.credentials = credentials;
                        properties = inputs.props;
                        return [4 /*yield*/, utils_1.getImageAndReport(inputs, credentials.AccountID, 'deploy')];
                    case 2:
                        _e.sent();
                        assumeYes = (_b = comParse.data) === null || _b === void 0 ? void 0 : _b.assumeYes;
                        stackId = utils_1.genStackId(credentials.AccountID, properties.region, properties.service.name);
                        pulumiStackDir = path_1.default.join(PULUMI_CACHE_DIR, stackId);
                        this.logger.debug("Ensuring " + pulumiStackDir + "...");
                        return [4 /*yield*/, fs_extra_1.default.ensureDir(pulumiStackDir, 511)];
                    case 3:
                        _e.sent();
                        fcConfigJsonFile = path_1.default.join(pulumiStackDir, 'config.json');
                        this.logger.debug("Fc config json file path is: " + fcConfigJsonFile);
                        f = new framework_1.default(properties, fcConfigJsonFile, credentials.AccountID);
                        return [4 /*yield*/, f.createConfigFile(lodash_1.default.cloneDeep(inputs), assumeYes)];
                    case 4:
                        fcConfig = _e.sent();
                        return [4 /*yield*/, pulumi_1.cpPulumiCodeFiles(pulumiStackDir)];
                    case 5:
                        _e.sent();
                        shell.exec("cd " + pulumiStackDir + " && npm i", { silent: true });
                        pulumiInputs = pulumi_1.genPulumiInputs(inputs, stackId, properties.region, pulumiStackDir);
                        return [4 /*yield*/, core_1.loadComponent('devsapp/pulumi-alibaba')];
                    case 6:
                        pulumiComponentIns = _e.sent();
                        return [4 /*yield*/, pulumiComponentIns.installPluginFromUrl({
                                props: { url: ALICLOUD_PLUGIN_DOWNLOAD_URL, version: ALICLOUD_PLUGIN_VERSION }
                            })];
                    case 7:
                        _e.sent();
                        return [4 /*yield*/, pulumiComponentIns.up(pulumiInputs)];
                    case 8:
                        upRes = _e.sent();
                        if (upRes.stderr && upRes.stderr !== '') {
                            this.logger.error("deploy error: " + upRes.stderr);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, nasComponent_1.default.init(properties, lodash_1.default.cloneDeep(inputs))];
                    case 9:
                        _e.sent();
                        return [4 /*yield*/, fc_1.default.tryContainerAcceleration(credentials, properties)];
                    case 10:
                        _e.sent();
                        if (fcConfig.customDomains) {
                            (_c = fcConfig.customDomains) === null || _c === void 0 ? void 0 : _c.forEach(function (_a) {
                                var domainName = _a.domainName;
                                return core_1.request(domainName);
                            });
                        }
                        // 返回结果
                        return [2 /*return*/, {
                                region: properties.region,
                                serviceName: fcConfig.service.name,
                                functionName: fcConfig.function.name,
                                customDomains: (_d = fcConfig.customDomains) === null || _d === void 0 ? void 0 : _d.map(function (_a) {
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
            var apts, comParse, credentials, properties, stackId, pulumiStackDir, ex_1, pulumiInputs, pulumiComponentIns, upRes;
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
                        stackId = utils_1.genStackId(credentials.AccountID, properties.region, properties.service.name);
                        pulumiStackDir = path_1.default.join(PULUMI_CACHE_DIR, stackId);
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, nasComponent_1.default.remove(properties, lodash_1.default.cloneDeep(inputs))];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        ex_1 = _b.sent();
                        this.logger.debug(ex_1);
                        return [3 /*break*/, 6];
                    case 6:
                        pulumiInputs = pulumi_1.genPulumiInputs(inputs, stackId, properties.region, pulumiStackDir);
                        return [4 /*yield*/, core_1.loadComponent('devsapp/pulumi-alibaba')];
                    case 7:
                        pulumiComponentIns = _b.sent();
                        return [4 /*yield*/, pulumiComponentIns.installPluginFromUrl({
                                props: { url: ALICLOUD_PLUGIN_DOWNLOAD_URL, version: ALICLOUD_PLUGIN_VERSION }
                            })];
                    case 8:
                        _b.sent();
                        return [4 /*yield*/, pulumiComponentIns.destroy(pulumiInputs)];
                    case 9:
                        upRes = _b.sent();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBUStCO0FBQy9CLHNEQUEyQjtBQUMzQiwwQ0FBb0I7QUFDcEIsOENBQXdCO0FBQ3hCLGtEQUF1QjtBQUN2Qix1Q0FBMkM7QUFFM0MscUNBQTREO0FBQzVELHVDQUFrRTtBQUNsRSw2Q0FBaUM7QUFDakMsb0VBQThDO0FBQzlDLDhEQUF3QztBQUN4Qyx3RUFBa0Q7QUFDbEQsa0VBQTRDO0FBQzVDLDBEQUFvQztBQUNwQyxvRUFBNEM7QUFFNUMsSUFBTSxnQkFBZ0IsR0FBVyxjQUFJLENBQUMsSUFBSSxDQUFDLFlBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxlQUFlLENBQUMsQ0FBQztBQUVuRyxJQUFNLHVCQUF1QixHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLElBQUksU0FBUyxDQUFDO0FBQ2pGLElBQU0sNkJBQTZCLEdBQUcsOEJBQTRCLHVCQUF1QixTQUFNLENBQUM7QUFDaEcsSUFBTSw0QkFBNEIsR0FBRyxtRUFBaUUsNkJBQStCLENBQUM7QUFFdEk7SUFBQTtJQXVLQSxDQUFDO0lBcEtPLDBCQUFNLEdBQVosVUFBYSxNQUFlOzs7Ozs7O3dCQUNwQixJQUFJLEdBQUc7NEJBQ1gsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQzs0QkFDOUIsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO3lCQUNyQyxDQUFDO3dCQUNJLFFBQVEsR0FBa0IsbUJBQVksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7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