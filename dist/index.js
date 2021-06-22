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
var to_logs_1 = __importDefault(require("./lib/transform/to-logs"));
var to_metrics_1 = __importDefault(require("./lib/transform/to-metrics"));
var to_fc_1 = __importDefault(require("./lib/transform/to-fc"));
var to_build_1 = __importDefault(require("./lib/transform/to-build"));
var to_info_1 = __importDefault(require("./lib/transform/to-info"));
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
            var apts, comParse, credentials, cloneInputs, deployType, qualifier, imageId, provider, _c, _d, fcConfig, properties, vm, flag;
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
                        qualifier = "LATEST-" + new Date().getTime();
                        return [4 /*yield*/, generate_dockerfile_1.default(inputs, qualifier)];
                    case 4:
                        imageId = _e.sent();
                        provider = factory_1.default.getProvider(inputs);
                        return [4 /*yield*/, provider.login()];
                    case 5:
                        _e.sent();
                        _c = cloneInputs.props.function.customContainerConfig;
                        return [4 /*yield*/, provider.publish(imageId, qualifier)];
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
                        return [4 /*yield*/, to_logs_1.default.transform(lodash_1.default.cloneDeep(inputs))];
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
                        return [4 /*yield*/, to_metrics_1.default.transform(lodash_1.default.cloneDeep(inputs))];
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
    Component.prototype.info = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, inputsInfo, info;
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
                        return [4 /*yield*/, to_info_1.default.transform(lodash_1.default.cloneDeep(inputs))];
                    case 3:
                        inputsInfo = _b.sent();
                        return [4 /*yield*/, core_1.loadComponent('devsapp/fc-info')];
                    case 4:
                        info = _b.sent();
                        return [4 /*yield*/, info.info(inputsInfo)];
                    case 5: return [2 /*return*/, _b.sent()];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FNK0I7QUFDL0Isa0RBQXVCO0FBQ3ZCLHVDQUFrQztBQUVsQyxvRUFBNkM7QUFDN0MsMEVBQW1EO0FBQ25ELGdFQUF5QztBQUN6QyxzRUFBK0M7QUFDL0Msb0VBQTZDO0FBRTdDLGtGQUEyRDtBQUMzRCxvRUFBc0Q7QUFDdEQsa0RBQXFDO0FBQ3JDLGdEQUEwQjtBQUMxQixxQ0FBZ0U7QUFDaEUsd0RBQWtDO0FBQ2xDLDJEQUFxQztBQUVyQztJQUFBO0lBMlBBLENBQUM7SUF6UGUsaUNBQWEsR0FBM0I7Ozs7OzRCQUNvQixxQkFBTSxvQkFBYSxDQUFDLG9CQUFvQixDQUFDLEVBQUE7O3dCQUFyRCxTQUFTLEdBQUcsU0FBeUM7d0JBQ3BELHFCQUFNLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUMsRUFBQTs0QkFBckQsc0JBQU8sU0FBOEMsRUFBQzs7OztLQUN2RDtJQUVhLHlCQUFLLEdBQW5COzs7OzRCQUNTLHFCQUFNLG9CQUFhLENBQUMsbUJBQW1CLENBQUMsRUFBQTs0QkFBL0Msc0JBQU8sU0FBd0MsRUFBQzs7OztLQUNqRDtJQUVLLDJCQUFPLEdBQWIsVUFBYyxNQUFNOzs7Ozs7O3dCQUNaLElBQUksR0FBRzs0QkFDWCxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7NEJBQ2pCLE1BQU0sRUFBRSxDQUFDLGFBQWEsQ0FBQzs0QkFDdkIsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFO3lCQUN2QyxDQUFDO3dCQUNJLFFBQVEsR0FBUSxtQkFBWSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMs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