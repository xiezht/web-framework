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
exports.getImageAndReport = exports.getLogConfig = exports.isAuto = exports.promptForConfirmContinue = exports.writeStrToFile = exports.isDir = exports.isFile = exports.genStackId = void 0;
var fs_extra_1 = __importDefault(require("fs-extra"));
var inquirer_1 = __importDefault(require("inquirer"));
var constant_1 = require("../constant");
var core_1 = require("@serverless-devs/core");
function genStackId(accountId, region, serviceName) {
    return accountId + "-" + region + "-" + serviceName;
}
exports.genStackId = genStackId;
function isFile(inputPath) {
    return __awaiter(this, void 0, void 0, function () {
        var stats;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_extra_1.default.lstat(inputPath)];
                case 1:
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
function getImageAndReport(inputs, uid, command) {
    return __awaiter(this, void 0, void 0, function () {
        var image;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    core_1.reportComponent(constant_1.CONTEXT_NAME, { command: command, uid: uid });
                    if (!!inputs.props.function.customContainerConfig.image) return [3 /*break*/, 2];
                    return [4 /*yield*/, core_1.request('https://registry.serverlessfans.cn/registry/image', {
                            method: 'post',
                            body: {
                                region: inputs.props.region,
                                runtime: inputs.props.runtime
                            },
                            form: true
                        })];
                case 1:
                    image = (_a.sent()).image;
                    inputs.props.function.customContainerConfig.image = image;
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
exports.getImageAndReport = getImageAndReport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUEyQjtBQUMzQixzREFBZ0M7QUFDaEMsd0NBQStEO0FBRy9ELDhDQUF5RTtBQUV6RSxTQUFnQixVQUFVLENBQUMsU0FBaUIsRUFBRSxNQUFjLEVBQUUsV0FBbUI7SUFDL0UsT0FBVSxTQUFTLFNBQUksTUFBTSxTQUFJLFdBQWEsQ0FBQztBQUNqRCxDQUFDO0FBRkQsZ0NBRUM7QUFFRCxTQUFzQixNQUFNLENBQUMsU0FBaUI7Ozs7O3dCQUM5QixxQkFBTSxrQkFBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBQTs7b0JBQWxDLEtBQUssR0FBRyxTQUEwQjtvQkFDeEMsc0JBQU8sS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFDOzs7O0NBQ3ZCO0FBSEQsd0JBR0M7QUFFRCxTQUFzQixLQUFLLENBQUMsU0FBUzs7Ozs7d0JBQ3JCLHFCQUFNLGtCQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFBOztvQkFBbEMsS0FBSyxHQUFHLFNBQTBCO29CQUN4QyxzQkFBTyxLQUFLLENBQUMsV0FBVyxFQUFFLEVBQUM7Ozs7Q0FDNUI7QUFIRCxzQkFHQztBQUVELFNBQXNCLGNBQWMsQ0FDbEMsVUFBa0IsRUFDbEIsT0FBZSxFQUNmLEtBQWMsRUFDZCxJQUFhOzs7WUFFYixzQkFBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO29CQUNqQyxJQUFNLEVBQUUsR0FBRyxrQkFBRyxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxFQUFFLEtBQUssT0FBQSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUMsQ0FBQztvQkFDOUQsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDbEIsRUFBRSxDQUFD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