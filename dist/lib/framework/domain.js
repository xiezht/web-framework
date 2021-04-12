"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var core = __importStar(require("@serverless-devs/core"));
var lodash_1 = __importDefault(require("lodash"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var constant_1 = require("../../constant");
var utils_1 = require("../utils");
function readCertFile(filePath) {
    if (filePath === void 0) { filePath = ''; }
    return __awaiter(this, void 0, void 0, function () {
        var cert;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_extra_1.default.pathExists(filePath)];
                case 1:
                    if (!_a.sent()) return [3 /*break*/, 3];
                    if (filePath.endsWith('.pom')) {
                        throw new Error("");
                    }
                    return [4 /*yield*/, fs_extra_1.default.readFile(filePath, 'utf-8')];
                case 2:
                    cert = _a.sent();
                    if (cert.endsWith('\n')) {
                        return [2 /*return*/, cert.slice(0, -2)];
                    }
                    return [2 /*return*/, cert];
                case 3: return [2 /*return*/, filePath];
            }
        });
    });
}
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.get = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, customDomains, service, functionConfig, serviceName, functionName, domainName, domain, domainConfigs, _i, customDomains_1, domainConfig, domainName, protocol, _b, routeConfigs, certConfig, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = inputs.props, customDomains = _a.customDomains, service = _a.service, functionConfig = _a.function;
                        serviceName = service.name;
                        functionName = functionConfig.name || serviceName;
                        if (!!customDomains) return [3 /*break*/, 2];
                        this.logger.info('The configuration of the domain name is not detected, and a temporary domain name is generated.');
                        return [4 /*yield*/, this.getAutoDomain(inputs, serviceName, functionName)];
                    case 1:
                        domainName = _e.sent();
                        return [2 /*return*/, [{
                                    domainName: domainName,
                                    protocol: 'HTTP',
                                    routeConfigs: [
                                        {
                                            serviceName: serviceName,
                                            functionName: functionName,
                                            qualifier: 'LATEST',
                                            methods: ['GET', 'POST'],
                                            path: '/*',
                                        },
                                    ],
                                }]];
                    case 2:
                        if (!lodash_1.default.isArray(customDomains)) {
                            throw new Error('customDomains configuration error.');
                        }
                        domain = '';
                        domainConfigs = [];
                        _i = 0, customDomains_1 = customDomains;
                        _e.label = 3;
                    case 3:
                        if (!(_i < customDomains_1.length)) return [3 /*break*/, 13];
                        domainConfig = customDomains_1[_i];
                        domainName = domainConfig.domainName, protocol = domainConfig.protocol, _b = domainConfig.routeConfigs, routeConfigs = _b === void 0 ? [] : _b, certConfig = domainConfig.certConfig;
                        if (!!domainName) return [3 /*break*/, 4];
                        throw new Error('customDomains configuration domainName is need.');
                    case 4:
                        if (!utils_1.isAuto(domainName)) return [3 /*break*/, 8];
                        this.logger.debug('It is detected that the domain configuration is auto.');
                        if (protocol !== 'HTTP') {
                            this.logger.warn('Temporary domain name only supports http protocol.');
                        }
                        if (!!domain) return [3 /*break*/, 6];
                        this.logger.debug('domain name is generated.');
                        return [4 /*yield*/, this.getAutoDomain(inputs, serviceName, functionName)];
                    case 5:
                        domain = _e.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        this.logger.warn("Multiple domainName: " + domain);
                        _e.label = 7;
                    case 7:
                        domainConfigs.push({
                            domainName: domain,
                            protocol: 'HTTP',
                            routeConfigs: routeConfigs.map(function (item) { return (__assign({ serviceName: serviceName,
                                functionName: functionName, qualifier: 'LATEST', methods: ['GET', 'POST'], path: '/*' }, item)); }),
                        });
                        return [3 /*break*/, 12];
                    case 8:
                        domainConfig.routeConfigs = routeConfigs.map(function (item) { return (__assign({ serviceName: serviceName, functionName: functionName }, item)); });
                        if (!certConfig) return [3 /*break*/, 11];
                        _c = certConfig;
                        return [4 /*yield*/, readCertFile(certConfig.certificate)];
                    case 9:
                        _c.certificate = _e.sent();
                        _d = certConfig;
                        return [4 /*yield*/, readCertFile(certConfig.privateKey)];
                    case 10:
                        _d.privateKey = _e.sent();
                        domainConfig.certConfig = certConfig;
                        _e.label = 11;
                    case 11:
                        // @ts-ignore: serviceName 和 functionName 已经被赋值
                        domainConfigs.push(domainConfig);
                        _e.label = 12;
                    case 12:
                        _i++;
                        return [3 /*break*/, 3];
                    case 13: return [2 /*return*/, domainConfigs];
                }
            });
        });
    };
    Component.getAutoDomain = function (inputs, serviceName, functionName) {
        return __awaiter(this, void 0, void 0, function () {
            var domainComponent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, core.loadComponent('alibaba/domain')];
                    case 1:
                        domainComponent = _a.sent();
                        return [4 /*yield*/, domainComponent.get(__assign(__assign({}, inputs), { props: {
                                    type: 'fc',
                                    user: inputs.credentials.AccountID,
                                    region: inputs.props.region,
                                    service: serviceName,
                                    function: functionName,
                                } }))];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    __decorate([
        core.HLogger(constant_1.CONTEXT),
        __metadata("design:type", Object)
    ], Component, "logger", void 0);
    return Component;
}());
exports.default = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9mcmFtZXdvcmsvZG9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBQzlDLGtEQUF1QjtBQUN2QixzREFBMkI7QUFDM0IsMkNBQXlDO0FBR3pDLGtDQUFrQztBQUdsQyxTQUFlLFlBQVksQ0FBRSxRQUFxQjtJQUFyQix5QkFBQSxFQUFBLGFBQXFCOzs7Ozt3QkFDNUMscUJBQU0sa0JBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUE7O3lCQUE5QixTQUE4QixFQUE5Qix3QkFBOEI7b0JBQ2hDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTt3QkFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztxQkFDckI7b0JBRVkscUJBQU0sa0JBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxFQUFBOztvQkFBNUMsSUFBSSxHQUFHLFNBQXFDO29CQUVsRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7d0JBQ3ZCLHNCQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUE7cUJBQ3pCO29CQUNELHNCQUFPLElBQUksRUFBQzt3QkFHZCxzQkFBTyxRQUFRLEVBQUM7Ozs7Q0FDakI7QUFFRDtJQUFBO0lBOEZBLENBQUM7SUEzRmMsYUFBRyxHQUFoQixVQUFpQixNQUFlOzs7Ozs7d0JBQ3hCLEtBQW9FLE1BQU0sQ0FBQyxLQUFLLEVBQTlFLGFBQWEsbUJBQUEsRUFBRSxPQUFPLGFBQUEsRUFBWSxjQUFjLGNBQUEsQ0FBK0I7d0JBQ2pGLFdBQVcsR0FBRyxPQUFP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