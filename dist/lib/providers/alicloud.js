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
var logger_1 = __importDefault(require("../../common/logger"));
var provider_1 = __importDefault(require("./provider"));
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
        spawnSync("docker login -u " + userName + " -p " + password + " registry." + region + ".aliyuncs.com ", [], { cwd: './', stdio: 'inherit', shell: true });
    };
    AliCloud.prototype.executeTagCommand = function (region, projectName, imgId, imgversion) {
        if (imgversion === void 0) { imgversion = 'LATEST'; }
        spawnSync("docker tag " + imgId + " registry." + region + ".aliyuncs.com/" + this.namespace + "/" + projectName + ":" + imgversion, [], { cwd: './', stdio: 'inherit', shell: true });
        return imgversion;
    };
    AliCloud.prototype.executePublishCommand = function (region, projectName, imgversion) {
        var status = spawnSync("docker push registry." + region + ".aliyuncs.com/" + this.namespace + "/" + projectName + ":" + imgversion, [], { cwd: './', stdio: 'inherit', shell: true }).status;
        if (status) {
            throw new Error('Failed to push the image to the Registry.');
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpY2xvdWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3Byb3ZpZGVycy9hbGljbG91ZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxnRUFBeUM7QUFDekMsK0RBQXlDO0FBQ3pDLHdEQUF1QztBQUUvQixJQUFBLFNBQVMsR0FBSyxPQUFPLENBQUMsZUFBZSxDQUFDLFVBQTdCLENBQThCO0FBRS9DO0lBQXNDLDRCQUFhO0lBR2pELGtCQUFZLEtBQUs7UUFBakIsWUFDRSxrQkFBTSxLQUFLLENBQUMsU0FFYjtRQURDLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7O0lBQ3JELENBQUM7SUFFYSw2QkFBVSxHQUF4QixVQUF5QixJQUFJLEVBQUUsTUFBYyxFQUFFLElBQVcsRUFBRSxNQUFXO1FBQXhDLHVCQUFBLEVBQUEsY0FBYztRQUFFLHFCQUFBLEVBQUEsV0FBVztRQUFFLHVCQUFBLEVBQUEsV0FBVzs7Ozs7O3dCQUMvRCxVQUFVLEdBQUcsTUFBTSxDQUFDO3dCQUNwQixPQUFPLEdBQUcsSUFBSSxDQUFDO3dCQUNmLE9BQU8sR0FBRyxFQUFFLENBQUM7d0JBQ2IsT0FBTyxHQUFHOzRCQUNkLGNBQWMsRUFBRSxrQkFBa0I7eUJBQ25DLENBQUM7d0JBRUksU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQzt3QkFDbEMscUJBQU0sU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxFQUFBOzRCQUFuRixzQkFBTyxTQUE0RSxFQUFDOzs7O0tBQ3JGO0lBQ08sa0NBQWUsR0FBdkI7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFB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