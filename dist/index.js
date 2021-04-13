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
                        assumeYes = (_b = comParse.data) === null || _b === void 0 ? void 0 : _b.assumeYes;
                        stackId = utils_1.genStackId(credentials.AccountID, properties.region, properties.service.name);
                        pulumiStackDir = path_1.default.join(PULUMI_CACHE_DIR, stackId);
                        this.logger.debug("Ensuring " + pulumiStackDir + "...");
                        return [4 /*yield*/, fs_extra_1.default.ensureDir(pulumiStackDir, 511)];
                    case 2:
                        _d.sent();
                        fcConfigJsonFile = path_1.default.join(pulumiStackDir, 'config.json');
                        this.logger.debug("Fc config json file path is: " + fcConfigJsonFile);
                        f = new framework_1.default(properties, fcConfigJsonFile, credentials.AccountID);
                        return [4 /*yield*/, f.createConfigFile(lodash_1.default.cloneDeep(inputs), assumeYes)];
                    case 3:
                        fcConfig = _d.sent();
                        return [4 /*yield*/, pulumi_1.cpPulumiCodeFiles(pulumiStackDir)];
                    case 4:
                        _d.sent();
                        shell.exec("cd " + pulumiStackDir + " && npm i", { silent: true });
                        pulumiInputs = pulumi_1.genPulumiInputs(inputs, stackId, properties.region, pulumiStackDir);
                        return [4 /*yield*/, core_1.loadComponent('pulumi-alibaba')];
                    case 5:
                        pulumiComponentIns = _d.sent();
                        return [4 /*yield*/, pulumiComponentIns.installPluginFromLocal({ args: PULUMI_LOCAL_PLUGIN_PATH })];
                    case 6:
                        _d.sent();
                        return [4 /*yield*/, pulumiComponentIns.up(pulumiInputs)];
                    case 7:
                        upRes = _d.sent();
                        if (upRes.stderr && upRes.stderr !== '') {
                            this.logger.error("deploy error: " + upRes.stderr);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, nasComponent_1.default.init(properties, lodash_1.default.cloneDeep(inputs))];
                    case 8:
                        _d.sent();
                        return [4 /*yield*/, fc_1.default.tryContainerAcceleration(credentials, properties)];
                    case 9:
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
                        properties = inputs.props;
                        stackId = utils_1.genStackId(credentials.AccountID, properties.region, properties.service.name);
                        pulumiStackDir = path_1.default.join(PULUMI_CACHE_DIR, stackId);
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, nasComponent_1.default.remove(properties, lodash_1.default.cloneDeep(inputs))];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_1 = _b.sent();
                        this.logger.debug(ex_1);
                        return [3 /*break*/, 5];
                    case 5:
                        pulumiInputs = pulumi_1.genPulumiInputs(inputs, stackId, properties.region, pulumiStackDir);
                        return [4 /*yield*/, core_1.loadComponent('pulumi-alibaba')];
                    case 6:
                        pulumiComponentIns = _b.sent();
                        return [4 /*yield*/, pulumiComponentIns.installPluginFromLocal({ args: PULUMI_LOCAL_PLUGIN_PATH })];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, pulumiComponentIns.destroy(pulumiInputs)];
                    case 8:
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
                        return [4 /*yield*/, core_1.loadComponent('fc-build')];
                    case 2:
                        builds = _b.sent();
                        cloneInputs = toBuild_1.default.transfromInputs(lodash_1.default.cloneDeep(inputs));
                        return [4 /*yield*/, builds.build(cloneInputs)];
                    case 3:
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
                        return [4 /*yield*/, toLogs_1.default.tarnsform(lodash_1.default.cloneDeep(inputs))];
                    case 2:
                        inputsLogs = _c.sent();
                        return [4 /*yield*/, core_1.loadComponent('logs')];
                    case 3:
                        logs = _c.sent();
                        return [4 /*yield*/, logs.logs(inputsLogs)];
                    case 4:
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
                        return [4 /*yield*/, toMetrics_1.default.tarnsform(lodash_1.default.cloneDeep(inputs))];
                    case 2:
                        inputsMetrics = _b.sent();
                        return [4 /*yield*/, core_1.loadComponent('fc-metrics')];
                    case 3:
                        metrics = _b.sent();
                        return [4 /*yield*/, metrics.metrics(inputsMetrics)];
                    case 4:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.cp = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, nasComponent_1.default.cp(inputs.props, lodash_1.default.cloneDeep(inputs))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.ls = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, nasComponent_1.default.ls(inputs.props, lodash_1.default.cloneDeep(inputs))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.rm = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, nasComponent_1.default.rm(inputs.props, lodash_1.default.cloneDeep(inputs))];
                    case 1:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBTytCO0FBQy9CLHNEQUEyQjtBQUMzQiwwQ0FBb0I7QUFDcEIsOENBQXdCO0FBQ3hCLGtEQUF1QjtBQUN2Qix1Q0FBMkM7QUFFM0MscUNBQXlDO0FBQ3pDLHVDQUFrRTtBQUNsRSw2Q0FBaUM7QUFDakMsb0VBQThDO0FBQzlDLDhEQUF3QztBQUN4Qyx3RUFBa0Q7QUFDbEQsa0VBQTRDO0FBQzVDLDBEQUFvQztBQUNwQyxvRUFBNEM7QUFFNUMsSUFBTSxnQkFBZ0IsR0FBVyxjQUFJLENBQUMsSUFBSSxDQUFDLFlBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxlQUFlLENBQUMsQ0FBQztBQUNuRyxJQUFNLHdCQUF3QixHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFFdkY7SUFBQTtJQXFJQSxDQUFDO0lBbElPLDBCQUFNLEdBQVosVUFBYSxNQUFlOzs7Ozs7O3dCQUNwQixJQUFJLEdBQUc7NEJBQ1gsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQzs0QkFDOUIsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO3lCQUNyQyxDQUFDO3dCQUNJLFFBQVEsR0FBa0IsbUJBQVksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBQzFFLFVBQUksUUFBUSxDQUFDLElBQUksMENBQUUsSUFBSSxFQUFFOzRCQUN2QixXQUFJLENBQUMsZUFBSSxD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