"use strict";
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
var lodash_1 = __importDefault(require("lodash"));
var constant_1 = require("./constant");
var to_logs_1 = __importDefault(require("./lib/tarnsform/to-logs"));
var to_metrics_1 = __importDefault(require("./lib/tarnsform/to-metrics"));
var to_fc_1 = __importDefault(require("./lib/tarnsform/to-fc"));
var to_build_1 = __importDefault(require("./lib/tarnsform/to-build"));
var generate_dockerfile_1 = __importDefault(require("./lib/generate-dockerfile"));
var factory_1 = __importDefault(require("./lib/providers/factory"));
var nas_1 = __importDefault(require("./lib/nas"));
var fc_1 = __importDefault(require("./lib/fc"));
var utils_1 = require("./lib/utils");
var domain_1 = __importDefault(require("./lib/domain"));
var logger_1 = __importDefault(require("./common/logger"));
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.prototype.getDeployType = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fcDefault;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, core_1.loadComponent('devsapp/fc-default')];
                    case 1:
                        fcDefault = _a.sent();
                        return [4 /*yield*/, fcDefault.get({ args: "web-framework" })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Component.prototype.getFc = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, core_1.loadComponent('devsapp/fc-deploy')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Component.prototype.publish = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, deployType, credentials, region, serviceName, nextQualifier, versions, cloneInputs, imageId, provider, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            string: ['description'],
                            alias: { help: 'h', description: 'd' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        return [4 /*yield*/, this.getDeployType()];
                    case 1:
                        deployType = _d.sent();
                        if (deployType !== 'container') {
                            throw new Error('The verison capability currently only supports container.');
                        }
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 2:
                        credentials = _d.sent();
                        inputs.credentials = credentials;
                        region = inputs.props.region;
                        serviceName = inputs.props.service.name;
                        return [4 /*yield*/, fc_1.default.listVersions(credentials, region, serviceName)];
                    case 3:
                        versions = _d.sent();
                        if (lodash_1.default.isEmpty(versions)) {
                            nextQualifier = 1;
                        }
                        else {
                            nextQualifier = versions.shift().versionId / 1 + 1;
                        }
                        logger_1.default.debug("next qualifier is " + nextQualifier + ".");
                        return [4 /*yield*/, utils_1.getImageAndReport(inputs, credentials.AccountID, 'publish')];
                    case 4:
                        inputs = _d.sent();
                        cloneInputs = lodash_1.default.cloneDeep(inputs);
                        cloneInputs.props = to_fc_1.default.transform(cloneInputs.props, deployType);
                        return [4 /*yield*/, generate_dockerfile_1.default(inputs, nextQualifier)];
                    case 5:
                        imageId = _d.sent();
                        provider = factory_1.default.getProvider(inputs);
                        return [4 /*yield*/, provider.login()];
                    case 6:
                        _d.sent();
                        _b = cloneInputs.props.function.customContainerConfig;
                        return [4 /*yield*/, provider.publish(imageId, nextQualifier)];
                    case 7:
                        _b.image = _d.sent();
                        logger_1.default.debug("custom container config image is " + cloneInputs.props.function.customContainerConfig.image);
                        _c = cloneInputs.props;
                        return [4 /*yield*/, domain_1.default.get(inputs)];
                    case 8:
                        _c.customDomains = _d.sent();
                        return [4 /*yield*/, this.getFc()];
                    case 9: return [4 /*yield*/, (_d.sent()).deploy(cloneInputs)];
                    case 10:
                        _d.sent();
                        return [4 /*yield*/, fc_1.default.publishVersion(credentials, region, serviceName, (_a = comParse.data) === null || _a === void 0 ? void 0 : _a.description)];
                    case 11: return [2 /*return*/, _d.sent()];
                }
            });
        });
    };
    Component.prototype.unpublish = function (inputs) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, credentials, region, serviceName;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            string: ['version'],
                            alias: { help: 'h', version: 'v' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 1:
                        credentials = _c.sent();
                        inputs.credentials = credentials;
                        region = inputs.props.region;
                        serviceName = inputs.props.service.name;
                        logger_1.default.info("unpublish version " + region + "/" + serviceName + "." + ((_a = comParse.data) === null || _a === void 0 ? void 0 : _a.version));
                        return [4 /*yield*/, fc_1.default.deleteVersion(credentials, region, serviceName, (_b = comParse.data) === null || _b === void 0 ? void 0 : _b.version)];
                    case 2: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    Component.prototype.deploy = function (inputs) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, credentials, cloneInputs, deployType, imageId, provider, _c, _d, fcConfig, properties, vm, flag;
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
                        return [4 /*yield*/, utils_1.getImageAndReport(inputs, credentials.AccountID, 'deploy')];
                    case 2:
                        inputs = _e.sent();
                        cloneInputs = lodash_1.default.cloneDeep(inputs);
                        return [4 /*yield*/, this.getDeployType()];
                    case 3:
                        deployType = _e.sent();
                        cloneInputs.props = to_fc_1.default.transform(cloneInputs.props, deployType);
                        // @ts-ignore
                        delete cloneInputs.Properties;
                        if (!(deployType === 'container')) return [3 /*break*/, 7];
                        return [4 /*yield*/, generate_dockerfile_1.default(inputs)];
                    case 4:
                        imageId = _e.sent();
                        provider = factory_1.default.getProvider(inputs);
                        return [4 /*yield*/, provider.login()];
                    case 5:
                        _e.sent();
                        _c = cloneInputs.props.function.customContainerConfig;
                        return [4 /*yield*/, provider.publish(imageId)];
                    case 6:
                        _c.image = _e.sent();
                        _e.label = 7;
                    case 7:
                        _d = cloneInputs.props;
                        return [4 /*yield*/, domain_1.default.get(inputs)];
                    case 8:
                        _d.customDomains = _e.sent();
                        logger_1.default.debug("transfrom props: " + JSON.stringify(cloneInputs.props, null, '  '));
                        return [4 /*yield*/, this.getFc()];
                    case 9: return [4 /*yield*/, (_e.sent()).deploy(cloneInputs)];
                    case 10:
                        fcConfig = _e.sent();
                        properties = inputs.props;
                        if (!(deployType === 'nas')) return [3 /*break*/, 13];
                        return [4 /*yield*/, nas_1.default.init(properties, lodash_1.default.cloneDeep(inputs))];
                    case 11:
                        _e.sent();
                        return [4 /*yield*/, nas_1.default.remove(properties, lodash_1.default.cloneDeep(inputs))];
                    case 12:
                        _e.sent();
                        _e.label = 13;
                    case 13:
                        vm = core_1.spinner('Try container acceleration');
                        return [4 /*yield*/, fc_1.default.tryContainerAcceleration(credentials, fcConfig.region, fcConfig.service.name, fcConfig.function.name, fcConfig.function.customContainerConfig)];
                    case 14:
                        flag = _e.sent();
                        if (!(fcConfig.customDomains && fcConfig.customDomains[0].domainName)) return [3 /*break*/, 16];
                        return [4 /*yield*/, utils_1.requestDomains(fcConfig.customDomains[0].domainName)];
                    case 15:
                        _e.sent();
                        _e.label = 16;
                    case 16:
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
                                customDomains: (_b = fcConfig.customDomains) === null || _b === void 0 ? void 0 : _b.map(function (_a) {
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
            var apts, comParse, cloneInputs, _b, deployType, _c, region, serviceName, versions, _i, versions_1, versionId;
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
                        cloneInputs = lodash_1.default.cloneDeep(inputs);
                        // @ts-ignore
                        delete cloneInputs.Properties;
                        _b = cloneInputs;
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 1:
                        _b.credentials = _d.sent();
                        return [4 /*yield*/, utils_1.getImageAndReport(cloneInputs, cloneInputs.credentials.AccountID, 'build')];
                    case 2:
                        _d.sent();
                        return [4 /*yield*/, this.getDeployType()];
                    case 3:
                        deployType = _d.sent();
                        cloneInputs.props = to_fc_1.default.transform(cloneInputs.props, deployType);
                        _c = cloneInputs.props;
                        return [4 /*yield*/, domain_1.default.get(inputs)];
                    case 4:
                        _c.customDomains = _d.sent();
                        logger_1.default.debug("transfrom props: " + JSON.stringify(cloneInputs.props.customDomains));
                        cloneInputs.args = 'service';
                        region = inputs.props.region;
                        serviceName = inputs.props.service.name;
                        return [4 /*yield*/, fc_1.default.listVersions(cloneInputs.credentials, region, serviceName)];
                    case 5:
                        versions = _d.sent();
                        _i = 0, versions_1 = versions;
                        _d.label = 6;
                    case 6:
                        if (!(_i < versions_1.length)) return [3 /*break*/, 9];
                        versionId = versions_1[_i].versionId;
                        return [4 /*yield*/, this.unpublish({
                                project: inputs.project,
                                args: "--version " + versionId,
                                props: {
                                    region: region,
                                    service: { name: serviceName },
                                }
                            })];
                    case 7:
                        _d.sent();
                        _d.label = 8;
                    case 8:
                        _i++;
                        return [3 /*break*/, 6];
                    case 9: return [4 /*yield*/, this.getFc()];
                    case 10: return [2 /*return*/, (_d.sent()).remove(cloneInputs)];
                }
            });
        });
    };
    Component.prototype.build = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, builds;
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
                        inputs.project.component = 'fc-build';
                        inputs.props = to_build_1.default.transfromInputs(inputs.props);
                        return [4 /*yield*/, builds.build(inputs)];
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
                        return [4 /*yield*/, to_logs_1.default.tarnsform(lodash_1.default.cloneDeep(inputs))];
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
                        return [4 /*yield*/, to_metrics_1.default.tarnsform(lodash_1.default.cloneDeep(inputs))];
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
                        return [4 /*yield*/, nas_1.default.cp(inputs.props, lodash_1.default.cloneDeep(inputs))];
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
                        return [4 /*yield*/, nas_1.default.ls(inputs.props, lodash_1.default.cloneDeep(inputs))];
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
                        return [4 /*yield*/, nas_1.default.rm(inputs.props, lodash_1.default.cloneDeep(inputs))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.command = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 1:
                        credentials = _a.sent();
                        return [4 /*yield*/, utils_1.getImageAndReport(inputs, credentials.AccountID, 'command')];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, nas_1.default.command(inputs.props, lodash_1.default.cloneDeep(inputs))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Component;
}());
exports.default = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FNK0I7QUFDL0Isa0RBQXVCO0FBQ3ZCLHVDQUFrQztBQUVsQyxvRUFBNkM7QUFDN0MsMEVBQW1EO0FBQ25ELGdFQUF5QztBQUN6QyxzRUFBK0M7QUFFL0Msa0ZBQTJEO0FBQzNELG9FQUFzRDtBQUN0RCxrREFBcUM7QUFDckMsZ0RBQTBCO0FBQzFCLHFDQUFnRTtBQUNoRSx3REFBa0M7QUFDbEMsMkRBQXFDO0FBRXJDO0lBQUE7SUFnUEEsQ0FBQztJQTlPTyxpQ0FBYSxHQUFuQjs7Ozs7NEJBQ29CLHFCQUFNLG9CQUFhLENBQUMsb0JBQW9CLENBQUMsRUFBQTs7d0JBQXJELFNBQVMsR0FBRyxTQUF5Qzt3QkFDcEQscUJBQU0sU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsQ0FBQyxFQUFBOzRCQUFyRCxzQkFBTyxTQUE4QyxFQUFDOzs7O0tBQ3ZEO0lBRUsseUJBQUssR0FBWDs7Ozs0QkFDUyxxQkFBTSxvQkFBYSxDQUFDLG1CQUFtQixDQUFDLEVBQUE7NEJBQS9DLHNCQUFPLFNBQXdDLEVBQUM7Ozs7S0FDakQ7SUFFSywyQkFBTyxHQUFiLFVBQWMsTUFBTTs7Ozs7Ozt3QkFDWixJQUFJLEdBQUc7NEJBQ1gsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDOzRCQUNqQixNQUFNLEVBQUUsQ0FBQyxhQUFhLENBQUM7NEJBQ3ZCLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRTt5QkFDdkMsQ0FBQzt3QkFDSSxRQUFRLEdBQVEsbUJBQVksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBRTdDLHFC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