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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FNK0I7QUFDL0Isa0RBQXVCO0FBQ3ZCLHVDQUFrQztBQUVsQyxvRUFBNkM7QUFDN0MsMEVBQW1EO0FBQ25ELGdFQUF5QztBQUN6QyxzRUFBK0M7QUFFL0Msa0ZBQTJEO0FBQzNELG9FQUFzRDtBQUN0RCxrREFBcUM7QUFDckMsZ0RBQTBCO0FBQzFCLHFDQUFnRTtBQUNoRSx3REFBa0M7QUFDbEMsMkRBQXFDO0FBRXJDO0lBQUE7SUFnUEEsQ0FBQztJQTlPZSxpQ0FBYSxHQUEzQjs7Ozs7NEJBQ29CLHFCQUFNLG9CQUFhLENBQUMsb0JBQW9CLENBQUMsRUFBQTs7d0JBQXJELFNBQVMsR0FBRyxTQUF5Qzt3QkFDcEQscUJBQU0sU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsQ0FBQyxFQUFBOzRCQUFyRCxzQkFBTyxTQUE4QyxFQUFDOzs7O0tBQ3ZEO0lBRWEseUJBQUssR0FBbkI7Ozs7NEJBQ1MscUJBQU0sb0JBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFBOzRCQUEvQyxzQkFBTyxTQUF3QyxFQUFDOzs7O0tBQ2pEO0lBRUssMkJBQU8sR0FBYixVQUFjLE1BQU07Ozs7Ozs7d0JBQ1osSUFBSSxHQUFHOzRCQUNYLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQzs0QkFDakIsTUFBTSxFQUFFLENBQUMsYUFBYSxDQUFDOzRCQUN2QixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUU7eUJBQ3ZDLENBQUM7d0JBQ0ksUUFBUSxHQUFRLG1CQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO3dCQUU3Qyxx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