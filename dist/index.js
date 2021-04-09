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
var inputs_1 = require("./interface/inputs");
var utils_1 = require("./lib/utils");
var pulumi_1 = require("./lib/pulumi");
var shell = __importStar(require("shelljs"));
var nasComponent_1 = __importDefault(require("./lib/nasComponent"));
var framework_1 = __importDefault(require("./lib/framework"));
var toMetrics_1 = __importDefault(require("./lib/tarnsform/toMetrics"));
var toLogs_1 = __importDefault(require("./lib/tarnsform/toLogs"));
var fc_1 = __importDefault(require("./lib/framework/fc"));
var build_1 = __importDefault(require("./lib/build"));
var PULUMI_CACHE_DIR = path_1.default.join(os_1.default.homedir(), '.s', 'cache', 'pulumi', 'web-framework');
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.prototype.getCredentials = function (credentials, provider, accessAlias) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug("Obtain the key configuration, whether the key needs to be obtained separately: " + lodash_1.default.isEmpty(credentials));
                        if (inputs_1.isCredentials(credentials)) {
                            return [2 /*return*/, credentials];
                        }
                        return [4 /*yield*/, core_1.getCredential(provider, accessAlias)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Component.prototype.handlerInputs = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, provider, accessAlias, credentials, properties, args;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = inputs.Project || inputs.project, provider = _a.Provider, accessAlias = _a.AccessAlias;
                        return [4 /*yield*/, this.getCredentials(inputs.Credentials, provider, accessAlias)];
                    case 1:
                        credentials = _b.sent();
                        inputs.Credentials = credentials;
                        properties = inputs.Properties || inputs.properties;
                        args = inputs.Args || inputs.args;
                        return [2 /*return*/, {
                                args: args,
                                provider: provider,
                                accessAlias: accessAlias,
                                credentials: credentials,
                                properties: properties,
                                project: inputs.Project || inputs.project,
                            }];
                }
            });
        });
    };
    Component.prototype.deploy = function (inputs) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, outputInputs, credentials, properties, project, assumeYes, stackId, pulumiStackDir, fcConfigJsonFile, f, fcConfig, pulumiComponentIns, pulumiInputs, upRes;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        apts = {
                            boolean: ['help', 'assumeYes'],
                            alias: { help: 'h', assumeYes: 'y' },
                        };
                        comParse = core_1.commandParse({ args: inputs.Args }, apts);
                        if ((_a = comParse.data) === null || _a === void 0 ? void 0 : _a.help) {
                            core_1.help(constant_1.HELP);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        outputInputs = _d.sent();
                        credentials = outputInputs.credentials, properties = outputInputs.properties, project = outputInputs.project;
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
                        return [4 /*yield*/, core_1.loadComponent('alibaba/pulumi-alibaba')];
                    case 5:
                        pulumiComponentIns = _d.sent();
                        pulumiInputs = pulumi_1.genPulumiInputs(credentials, project, stackId, properties.region, pulumiStackDir);
                        return [4 /*yield*/, pulumiComponentIns.up(pulumiInputs)];
                    case 6:
                        upRes = _d.sent();
                        if (upRes.stderr && upRes.stderr !== '') {
                            this.logger.error("deploy error: " + upRes.stderr);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, nasComponent_1.default.init(properties, lodash_1.default.cloneDeep(inputs))];
                    case 7:
                        _d.sent();
                        return [4 /*yield*/, fc_1.default.tryContainerAcceleration(credentials, properties)];
                    case 8:
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
            var apts, comParse, _b, credentials, properties, project, stackId, pulumiStackDir, ex_1, pulumiComponentIns, pulumiInputs, upRes;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        apts = {
                            boolean: ['help', 'assumeYes'],
                            alias: { help: 'h', assumeYes: 'y' },
                        };
                        comParse = core_1.commandParse({ args: inputs.Args }, apts);
                        if ((_a = comParse.data) === null || _a === void 0 ? void 0 : _a.help) {
                            core_1.help(constant_1.HELP);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        _b = _c.sent(), credentials = _b.credentials, properties = _b.properties, project = _b.project;
                        stackId = utils_1.genStackId(credentials.AccountID, properties.region, properties.service.name);
                        pulumiStackDir = path_1.default.join(PULUMI_CACHE_DIR, stackId);
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, nasComponent_1.default.remove(properties, lodash_1.default.cloneDeep(inputs))];
                    case 3:
                        _c.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_1 = _c.sent();
                        this.logger.debug(ex_1);
                        return [3 /*break*/, 5];
                    case 5: return [4 /*yield*/, core_1.loadComponent('alibaba/pulumi-alibaba')];
                    case 6:
                        pulumiComponentIns = _c.sent();
                        pulumiInputs = pulumi_1.genPulumiInputs(credentials, project, stackId, properties.region, pulumiStackDir);
                        return [4 /*yield*/, pulumiComponentIns.destroy(pulumiInputs)];
                    case 7:
                        upRes = _c.sent();
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
            var builds, cloneInputs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.handlerInputs(inputs);
                        return [4 /*yield*/, core_1.loadComponent('alibaba/fc-build')];
                    case 1:
                        builds = _a.sent();
                        cloneInputs = build_1.default.transfromInputs(lodash_1.default.cloneDeep(inputs));
                        return [4 /*yield*/, builds.build(cloneInputs)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.logs = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var outputInputs, inputsLogs, logs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        outputInputs = _a.sent();
                        if (!outputInputs.properties.service.logConfig) {
                            throw new Error('The service is not configured to logConfig.');
                        }
                        return [4 /*yield*/, toLogs_1.default.tarnsform(lodash_1.default.cloneDeep(inputs))];
                    case 2:
                        inputsLogs = _a.sent();
                        return [4 /*yield*/, core_1.loadComponent('alibaba/logs')];
                    case 3:
                        logs = _a.sent();
                        return [4 /*yield*/, logs.logs(inputsLogs)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.metrics = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var inputsMetrics, metrics;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, toMetrics_1.default.tarnsform(lodash_1.default.cloneDeep(inputs))];
                    case 2:
                        inputsMetrics = _a.sent();
                        return [4 /*yield*/, core_1.loadComponent('alibaba/fc-metrics')];
                    case 3:
                        metrics = _a.sent();
                        return [4 /*yield*/, metrics.metrics(inputsMetrics)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.cp = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, nasComponent_1.default.cp(inputs.Properties, lodash_1.default.cloneDeep(inputs))];
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
                    case 0: return [4 /*yield*/, nasComponent_1.default.ls(inputs.Properties, lodash_1.default.cloneDeep(inputs))];
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
                    case 0: return [4 /*yield*/, nasComponent_1.default.rm(inputs.Properties, lodash_1.default.cloneDeep(inputs))];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBTytCO0FBQy9CLHNEQUEyQjtBQUMzQiwwQ0FBb0I7QUFDcEIsOENBQXdCO0FBQ3hCLGtEQUF1QjtBQUN2Qix1Q0FBMkM7QUFDM0MsNkNBQWdGO0FBQ2hGLHFDQUF5QztBQUN6Qyx1Q0FBa0U7QUFDbEUsNkNBQWlDO0FBQ2pDLG9FQUE4QztBQUM5Qyw4REFBd0M7QUFDeEMsd0VBQWtEO0FBQ2xELGtFQUE0QztBQUM1QywwREFBb0M7QUFDcEMsc0RBQWdDO0FBRWhDLElBQU0sZ0JBQWdCLEdBQVcsY0FBSSxDQUFDLElBQUksQ0FBQyxZQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFFbkc7SUFBQTtJQXdLQSxDQUFDO0lBcktPLGtDQUFjLEdBQXBCLFVBQ0UsV0FBOEIsRUFDOUIsUUFBZ0IsRUFDaEIsV0FBb0I7Ozs7O3dCQUVwQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FDZixvRkFBa0YsZ0JBQUMsQ0FBQyxPQUFPLENBQ3pGLFdBQVcsQ0FDVixDQUNKLENBQUM7d0JBRUYsSUFBSSxzQkFBYSxDQUFDLFdBQVcsQ0FBQyxFQUFFOzRCQUM5QixzQkFBTyxXQUFXLEVBQUM7eUJBQ3BCO3dCQUNNLHFCQUFNLG9CQUFhLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxFQUFBOzRCQUFqRCxzQkFBTyxTQUEwQyxFQUFDOzs7O0tBQ25EO0lBRUssaUNBQWEsR0FBbkIsVUFBb0IsTUFBTTs7Ozs7O3dCQUNsQixLQUFtRCxNQUFNLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQXZFLFFBQVEsY0FBQSxF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