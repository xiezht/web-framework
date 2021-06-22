"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var pop_core_1 = __importDefault(require("@alicloud/pop-core"));
var core_1 = require("@serverless-devs/core");
var logger_1 = __importDefault(require("../../common/logger"));
var provider_1 = __importDefault(require("./provider"));
var utils_1 = require("../utils");
var spawnSync = require('child_process').spawnSync;
var AliCloud = /** @class */ (function (_super) {
    __extends(AliCloud, _super);
    function AliCloud(props) {
        var _this = _super.call(this, props) || this;
        _this.namespace = _this.inputs.appName.toLowerCase();
        return _this;
    }
    AliCloud.prototype.requestApi = function (path, method, body, option) {
        if (method === void 0) { method = 'GET'; }
        if (body === void 0) { body = '{}'; }
        if (option === void 0) { option = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var httpMethod, uriPath, queries, headers, apiClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        httpMethod = method;
                        uriPath = path;
                        queries = {};
                        headers = {
                            'Content-Type': 'application/json',
                        };
                        apiClient = this.createApiClient();
                        return [4 /*yield*/, apiClient.request(httpMethod, uriPath, queries, body, headers, option)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AliCloud.prototype.createApiClient = function () {
        if (!this.client) {
            var _a = this.inputs.credentials, AccessKeyID = _a.AccessKeyID, AccessKeySecret = _a.AccessKeySecret;
            var _popCore = pop_core_1.default;
            this.client = new _popCore.ROAClient({
                accessKeyId: AccessKeyID,
                accessKeySecret: AccessKeySecret,
                endpoint: "https://cr." + (this.inputs.props.region || 'cn-hangzhou') + ".aliyuncs.com",
                apiVersion: '2016-06-07',
            });
        }
        return this.client;
    };
    AliCloud.prototype.getTempLoginUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestApi('/tokens')];
            });
        });
    };
    AliCloud.prototype.executeLoginCommand = function (userName, password, region) {
        if (region === void 0) { region = 'cn-hangzhou'; }
        var command = "docker login -u " + userName + " -p " + password + " registry." + region + ".aliyuncs.com ";
        var vm = utils_1.isDebug ? undefined : core_1.spinner("Run: " + command);
        spawnSync(command, [], {
            cwd: './',
            stdio: utils_1.isDebug ? 'inherit' : 'ignore',
            shell: true,
        });
        vm === null || vm === void 0 ? void 0 : vm.stop();
    };
    AliCloud.prototype.executeTagCommand = function (region, projectName, imgId, imgversion) {
        var command = "docker tag " + imgId + " registry." + region + ".aliyuncs.com/" + this.namespace + "/" + projectName + ":" + imgversion;
        var vm = utils_1.isDebug ? undefined : core_1.spinner("Run: " + command);
        spawnSync(command, [], {
            cwd: './',
            stdio: utils_1.isDebug ? 'inherit' : 'ignore',
            shell: true,
        });
        vm === null || vm === void 0 ? void 0 : vm.stop();
        return imgversion;
    };
    AliCloud.prototype.executePublishCommand = function (region, projectName, imgversion) {
        var command = "docker push registry." + region + ".aliyuncs.com/" + this.namespace + "/" + projectName + ":" + imgversion;
        var vm = utils_1.isDebug ? undefined : core_1.spinner("Run: " + command);
        var status = spawnSync(command, [], {
            cwd: './',
            stdio: utils_1.isDebug ? 'inherit' : 'ignore',
            shell: true,
        }).status;
        if (status) {
            vm === null || vm === void 0 ? void 0 : vm.fail();
            throw new Error('Failed to push the image to the Registry.');
        }
        vm === null || vm === void 0 ? void 0 : vm.succeed();
    };
    AliCloud.prototype.getNameSpace = function () {
        return this.requestApi('/namespace');
    };
    AliCloud.prototype.createNameSpace = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                body = {
                    Namespace: {
                        namespace: name,
                    },
                };
                return [2 /*return*/, this.requestApi('/namespace', 'PUT', JSON.stringify(body))];
            });
        });
    };
    AliCloud.prototype.updateNamespace = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                body = {
                    Namespace: {
                        AutoCreate: true,
                        DefaultVisibility: 'PUBLIC',
                    },
                };
                return [2 /*return*/, this.requestApi("/namespace/" + name, 'POST', JSON.stringify(body))];
            });
        });
    };
    AliCloud.prototype.createRepo = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                body = {
                    Repo: {
                        RepoNamespace: this.namespace,
                        RepoName: name,
                        Summary: 'serverless devs',
                        Detail: 'serverless devs',
                        RepoType: 'PRIVATE',
                    },
                };
                return [2 /*return*/, this.requestApi('/repos', 'PUT', JSON.stringify(body))];
            });
        });
    };
    AliCloud.prototype.getRepos = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestApi('/repos')];
            });
        });
    };
    AliCloud.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tempLoginInfo, region, _a, tempUserName, authorizationToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getTempLoginUserInfo()];
                    case 1:
                        tempLoginInfo = _b.sent();
                        if (!tempLoginInfo.data) return [3 /*break*/, 3];
                        region = this.inputs.props.region || 'cn-hangzhou';
                        _a = tempLoginInfo.data, tempUserName = _a.tempUserName, authorizationToken = _a.authorizationToken;
                        return [4 /*yield*/, this.executeLoginCommand(tempUserName, authorizationToken, region)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AliCloud.prototype.publish = function (buildImg, qualifier) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var namespaceData, namespaces, namespaceNameList, properties, serviceName, functionName, projectName, repoResult, repos, region, imgversion, imageUrl;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getNameSpace()];
                    case 1:
                        namespaceData = _b.sent();
                        namespaces = namespaceData.data.namespaces;
                        namespaceNameList = namespaces.map(function (data) { return data.namespace; });
                        if (!!namespaceNameList.includes(this.namespace)) return [3 /*break*/, 3];
                        // 这里容易会触发一个问题，容器镜像服务命名空间仅能创建三个
                        return [4 /*yield*/, this.createNameSpace(this.namespace).catch(function (e) { return logger_1.default.error(e); })];
                    case 2:
                        // 这里容易会触发一个问题，容器镜像服务命名空间仅能创建三个
                        _b.sent();
                        _b.label = 3;
                    case 3: return [4 /*yield*/, this.updateNamespace(this.namespace).catch(function (e) { return logger_1.default.error(e); })];
                    case 4:
                        _b.sent();
                        properties = this.inputs.props;
                        serviceName = properties.service.name;
                        functionName = ((_a = properties.function) === null || _a === void 0 ? void 0 : _a.name) || serviceName;
                        projectName = (serviceName + "." + functionName).toLowerCase();
                        return [4 /*yield*/, this.getRepos().catch(function (e) { return logger_1.default.error(e); })];
                    case 5:
                        repoResult = _b.sent();
                        repos = repoResult.data.repos.map(function (item) { return item.repoName; });
                        if (!!repos.includes(projectName)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.createRepo(projectName).catch(function (e) { return logger_1.default.error(e); })];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7:
                        region = this.inputs.props.region || 'cn-hangzhou';
                        return [4 /*yield*/, this.executeTagCommand(region, projectName, buildImg, qualifier)];
                    case 8:
                        imgversion = _b.sent();
                        return [4 /*yield*/, this.executePublishCommand(region, projectName, imgversion)];
                    case 9:
                        _b.sent();
                        imageUrl = "registry." + region + ".aliyuncs.com/" + this.namespace + "/" + projectName + ":" + imgversion;
                        return [2 /*return*/, imageUrl];
                }
            });
        });
    };
    return AliCloud;
}(provider_1.default));
exports.default = AliCloud;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpY2xvdWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3Byb3ZpZGVycy9hbGljbG91ZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxnRUFBeUM7QUFDekMsOENBQWdEO0FBQ2hELCtEQUF5QztBQUN6Qyx3REFBdUM7QUFDdkMsa0NBQW1DO0FBRTNCLElBQUEsU0FBUyxHQUFLLE9BQU8sQ0FBQyxlQUFlLENBQUMsVUFBN0IsQ0FBOEI7QUFFL0M7SUFBc0MsNEJBQWE7SUFHakQsa0JBQVksS0FBSztRQUFqQixZQUNFLGtCQUFNLEtBQUssQ0FBQyxTQUViO1FBREMsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7SUFDckQsQ0FBQztJQUVhLDZCQUFVLEdBQXhCLFVBQXlCLElBQUksRUFBRSxNQUFjLEVBQUUsSUFBVyxFQUFFLE1BQVc7UUFBeEMsdUJBQUEsRUFBQSxjQUFjO1FBQUUscUJBQUEsRUFBQSxXQUFXO1FBQUUsdUJBQUEsRUFBQSxXQUFXOzs7Ozs7d0JBQy9ELFVBQVUsR0FBRyxNQUFNLENBQUM7d0JBQ3BCLE9BQU8sR0FBRyxJQUFJLENBQUM7d0JBQ2YsT0FBTyxHQUFHLEVBQUUsQ0FBQzt3QkFDYixPQUFPLEdBQUc7NEJBQ2QsY0FBYyxFQUFFLGtCQUFrQjt5QkFDbkMsQ0FBQzt3QkFFSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO3dCQUNsQyxxQkFBTSxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQUE7NEJBQW5GLHNCQUFPLFNBQTRFLEVBQUM7Ozs7S0FDckY7SUFDTyxrQ0FBZSxHQUF2QjtRQUNFLElB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