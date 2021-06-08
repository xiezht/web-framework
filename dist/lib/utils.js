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
exports.getImageAndReport = exports.requestDomains = exports.getLogConfig = exports.isAuto = exports.promptForConfirmContinue = exports.delFunctionInConfFile = exports.writeStrToFile = exports.isDir = exports.isFile = exports.genStackId = exports.promiseRetry = void 0;
var fs_extra_1 = __importDefault(require("fs-extra"));
var inquirer_1 = __importDefault(require("inquirer"));
var axios_1 = __importDefault(require("axios"));
var promise_retry_1 = __importDefault(require("promise-retry"));
var constant_1 = require("../constant");
var core_1 = require("@serverless-devs/core");
var lodash_1 = __importDefault(require("lodash"));
function promiseRetry(fn) {
    return __awaiter(this, void 0, void 0, function () {
        var retryOptions;
        return __generator(this, function (_a) {
            retryOptions = {
                retries: 2,
                factor: 2,
                minTimeout: 1 * 1000,
                randomize: true,
            };
            return [2 /*return*/, promise_retry_1.default(fn, retryOptions)];
        });
    });
}
exports.promiseRetry = promiseRetry;
function genStackId(accountId, region, serviceName) {
    return accountId + "-" + region + "-" + serviceName;
}
exports.genStackId = genStackId;
function isFile(inputPath) {
    return __awaiter(this, void 0, void 0, function () {
        var stats;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_extra_1.default.pathExists(inputPath)];
                case 1:
                    if (!(_a.sent())) {
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, fs_extra_1.default.lstat(inputPath)];
                case 2:
                    stats = _a.sent();
                    return [2 /*return*/, stats.isFile()];
            }
        });
    });
}
exports.isFile = isFile;
function isDir(inputPath) {
    return __awaiter(this, void 0, void 0, function () {
        var stats;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_extra_1.default.lstat(inputPath)];
                case 1:
                    stats = _a.sent();
                    return [2 /*return*/, stats.isDirectory()];
            }
        });
    });
}
exports.isDir = isDir;
function writeStrToFile(targetFile, content, flags, mode) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var ws = fs_extra_1.default.createWriteStream(targetFile, { flags: flags, mode: mode });
                    ws.write(content);
                    ws.end();
                    ws.on('finish', function () { return resolve(); });
                    ws.on('error', function (error) {
                        core_1.Logger.error(constant_1.CONTEXT, targetFile + " write error: " + error);
                        reject(error);
                    });
                })];
        });
    });
}
exports.writeStrToFile = writeStrToFile;
function delFunctionInConfFile(targetFile, content, flags, mode) {
    return __awaiter(this, void 0, void 0, function () {
        var functionName, config;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    functionName = content.functionName;
                    return [4 /*yield*/, fs_extra_1.default.readJSON(targetFile)];
                case 1:
                    config = _a.sent();
                    delete config.functions[functionName];
                    if (!!lodash_1.default.isEmpty(config.functions)) return [3 /*break*/, 3];
                    return [4 /*yield*/, writeStrToFile(targetFile, JSON.stringify(config, null, '  '), flags, mode)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/, true];
            }
        });
    });
}
exports.delFunctionInConfFile = delFunctionInConfFile;
function isInteractiveEnvironment() {
    return process.stdin.isTTY;
}
function promptForConfirmContinue(message) {
    return __awaiter(this, void 0, void 0, function () {
        var answers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isInteractiveEnvironment()) {
                        return [2 /*return*/, true];
                    }
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: 'confirm',
                                name: 'ok',
                                message: message,
                            },
                        ])];
                case 1:
                    answers = _a.sent();
                    if (answers.ok) {
                        return [2 /*return*/, true];
                    }
                    return [2 /*return*/, false];
            }
        });
    });
}
exports.promptForConfirmContinue = promptForConfirmContinue;
function isAuto(arg) {
    return arg === 'auto' || arg === 'Auto';
}
exports.isAuto = isAuto;
function getLogConfig(logConfig, autoName) {
    if (isAuto(logConfig)) {
        return {
            project: autoName.toLocaleLowerCase().replace(/_/g, '-'),
            logstore: constant_1.STORENAME
        };
    }
    if ((logConfig === null || logConfig === void 0 ? void 0 : logConfig.project) && (logConfig === null || logConfig === void 0 ? void 0 : logConfig.logstore)) {
        return logConfig;
    }
    throw new Error('service/logConfig configuration error');
}
exports.getLogConfig = getLogConfig;
function requestDomains(domainName) {
    return __awaiter(this, void 0, void 0, function () {
        var ex_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    core_1.Logger.debug(constant_1.CONTEXT, "Request domains http://" + domainName);
                    return [4 /*yield*/, axios_1.default.get("http://" + domainName, { timeout: 15 * 1000 })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    ex_1 = _a.sent();
                    core_1.Logger.debug(constant_1.CONTEXT, ex_1.toString());
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.requestDomains = requestDomains;
function getImageAndReport(inputs, uid, command) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var image;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    core_1.reportComponent(constant_1.CONTEXT_NAME, { command: command, uid: uid });
                    core_1.Logger.debug(constant_1.CONTEXT, "get image customContainerConfig: " + JSON.stringify(inputs.props.function.customContainerConfig) + ", runtime: " + inputs.props.runtime + ", region: " + inputs.props.region + ".");
                    if (!!((_a = inputs.props.function.customContainerConfig) === null || _a === void 0 ? void 0 : _a.image)) return [3 /*break*/, 2];
                    return [4 /*yield*/, core_1.request('https://registry.devsapp.cn/registry/image', {
                            method: 'post',
                            body: {
                                region: inputs.props.region,
                                runtime: inputs.props.runtime === 'php7.2' ? 'php7' : inputs.props.runtime
                            },
                            form: true
                        })];
                case 1:
                    image = (_b.sent()).image;
                    core_1.Logger.debug(constant_1.CONTEXT, "auto image is " + image + ".");
                    // @ts-ignore
                    inputs.props.function.customContainerConfig || (inputs.props.function.customContainerConfig = {});
                    inputs.props.function.customContainerConfig.image = image;
                    _b.label = 2;
                case 2: return [2 /*return*/, inputs];
            }
        });
    });
}
exports.getImageAndReport = getImageAndReport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUEyQjtBQUMzQixzREFBZ0M7QUFDaEMsZ0RBQTBCO0FBQzFCLGdFQUFrQztBQUNsQyx3Q0FBK0Q7QUFHL0QsOENBQXlFO0FBQ3pFLGtEQUF1QjtBQUV2QixTQUFzQixZQUFZLENBQUMsRUFBTzs7OztZQUNsQyxZQUFZLEdBQUc7Z0JBQ25CLE9BQU8sRUFBRSxDQUFDO2dCQUNWLE1BQU0sRUFBRSxDQUFDO2dCQUNULFVBQVUsRUFBRSxDQUFDLEdBQUcsSUFBSTtnQkFDcEIsU0FBUyxFQUFFLElBQUk7YUFDaEIsQ0FBQztZQUNGLHNCQUFPLHVCQUFLLENBQUMsRUFBRSxFQUFFLFlBQVksQ0FBQyxFQUFDOzs7Q0FDaEM7QUFSRCxvQ0FRQztBQUVELFNBQWdCLFVBQVUsQ0FBQyxTQUFpQixFQUFFLE1BQWMsRUFBRSxXQUFtQjtJQUMvRSxPQUFVLFNBQVMsU0FBSSxNQUFNLFNBQUksV0FBYSxDQUFDO0FBQ2pELENBQUM7QUFGRCxnQ0FFQztBQUVELFNBQXNCLE1BQU0sQ0FBQyxTQUFpQjs7Ozs7d0JBQ3ZDLHFCQUFNLGtCQUFHLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFBOztvQkFBcEMsSUFBSSxDQUFDLENBQUEsU0FBK0IsQ0FBQSxFQUFFO3dCQUNwQyxzQkFBTyxLQUFLLEVBQUM7cUJBQ2Q7b0JBQ2EscUJBQU0sa0JBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUE7O29CQUFsQyxLQUFLLEdBQUcsU0FBMEI7b0JBQ3hDLHNCQUFPLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBQzs7OztDQUN2QjtBQU5ELHdCQU1DO0FBRUQsU0FBc0IsS0FBSyxDQUFDLFNBQVM7Ozs7O3dCQUNyQixxQkFBTSxrQkFBRyxDQUFD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