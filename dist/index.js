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
var PULUMI_LOCAL_PLUGIN_PATH = path_1.default.join(__dirname, 'lib', 'utils', 'pulumi-plugin');
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.prototype.deploy = function (inputs) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, credentials, properties, assumeYes, stackId, pulumiStackDir, fcConfigJsonFile, f, fcConfig, pulumiInputs, pulumiComponentIns, upRes;
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
                        return [4 /*yield*/, core_1.reportComponent(constant_1.CONTEXT_NAME, {
                                command: 'deploy',
                                uid: credentials.AccountID,
                                remark: '部署应用',
                            })];
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
                        return [4 /*yield*/, pulumiComponentIns.installPluginFromLocal({ args: PULUMI_LOCAL_PLUGIN_PATH })];
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
                        return [4 /*yield*/, fc_1.default.tryContainerAcceleration(credentials, properties)];
                    case 10:
                        _d.sent();
                        // 返回结果
                        return [2 /*return*/, (_c = fcConfig.customDomains) === null || _c === void 0 ? void 0 : _c.map(function (_a) {
                                var domainName = _a.domainName;
                                return domainName;
                            })];
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
                        return [4 /*yield*/, core_1.reportComponent(constant_1.CONTEXT_NAME, {
                                command: 'remove',
                                uid: credentials.AccountID,
                                remark: '删除应用',
                            })];
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
                        return [4 /*yield*/, pulumiComponentIns.installPluginFromLocal({ args: PULUMI_LOCAL_PLUGIN_PATH })];
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
                        return [4 /*yield*/, core_1.reportComponent(constant_1.CONTEXT_NAME, {
                                command: 'build',
                                uid: inputs.credentials.AccountID,
                                remark: '应用打包',
                            })];
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
                            throw new Error('The service is not configured to logConfig.');
                        }
                        _b = inputs;
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 1:
                        _b.credentials = _c.sent();
                        return [4 /*yield*/, core_1.reportComponent(constant_1.CONTEXT_NAME, {
                                command: 'logs',
                                uid: inputs.credentials.AccountID,
                                remark: '查看日志',
                            })];
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
                        return [4 /*yield*/, core_1.reportComponent(constant_1.CONTEXT_NAME, {
                                command: 'metrics',
                                uid: inputs.credentials.AccountID,
                                remark: '查看监控',
                            })];
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
                        return [4 /*yield*/, core_1.reportComponent(constant_1.CONTEXT_NAME, {
                                command: 'cp',
                                uid: credentials.AccountID,
                                remark: '查看日志',
                            })];
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
                        return [4 /*yield*/, core_1.reportComponent(constant_1.CONTEXT_NAME, {
                                command: 'ls',
                                uid: credentials.AccountID,
                                remark: '查看日志',
                            })];
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
                        return [4 /*yield*/, core_1.reportComponent(constant_1.CONTEXT_NAME, {
                                command: 'rm',
                                uid: credentials.AccountID,
                                remark: '查看日志',
                            })];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBUStCO0FBQy9CLHNEQUEyQjtBQUMzQiwwQ0FBb0I7QUFDcEIsOENBQXdCO0FBQ3hCLGtEQUF1QjtBQUN2Qix1Q0FBeUQ7QUFFekQscUNBQXlDO0FBQ3pDLHVDQUFrRTtBQUNsRSw2Q0FBaUM7QUFDakMsb0VBQThDO0FBQzlDLDhEQUF3QztBQUN4Qyx3RUFBa0Q7QUFDbEQsa0VBQTRDO0FBQzVDLDBEQUFvQztBQUNwQyxvRUFBNEM7QUFFNUMsSUFBTSxnQkFBZ0IsR0FBVyxjQUFJLENBQUMsSUFBSSxDQUFDLFlBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxlQUFlLENBQUMsQ0FBQztBQUNuRyxJQUFNLHdCQUF3QixHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFFdkY7SUFBQTtJQTJMQSxDQUFDO0lBeExPLDBCQUFNLEdBQVosVUFBYSxNQUFlOzs7Ozs7O3dCQUNwQixJQUFJLEdBQUc7NEJBQ1gsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQzs0QkFDOUIsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO3lCQUNyQyxDQUFDO3dCQUNJLFFBQVEsR0FBa0IsbUJBQVksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBQzFFLFVBQUksUUFBUSxDQUFDLElBQUksMENBQUUsSUFBSSxFQUFFOzRCQUN2QixXQUFJLENBQUMsZUFBSSxD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