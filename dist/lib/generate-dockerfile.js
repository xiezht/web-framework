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
var fs_extra_1 = __importDefault(require("fs-extra"));
var core_1 = require("@serverless-devs/core");
var path_1 = __importDefault(require("path"));
var utils_1 = require("./utils");
var spawnSync = require('child_process').spawnSync;
function default_1(inputs, qualifier) {
    if (qualifier === void 0) { qualifier = 'LATEST'; }
    return __awaiter(this, void 0, void 0, function () {
        var properties, serviceName, _a, customContainerConfig, code, _b, functionName, dockerPath, deleteIgnore, codeUri, exclude, projectName, imageId, command, stdio, vm, status;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    properties = inputs.props;
                    serviceName = properties.service.name;
                    _a = properties.function, customContainerConfig = _a.customContainerConfig, code = _a.code, _b = _a.name, functionName = _b === void 0 ? serviceName : _b;
                    dockerPath = 'DockerFile';
                    deleteIgnore = false;
                    return [4 /*yield*/, getSrc(code, serviceName, functionName)];
                case 1:
                    codeUri = _c.sent();
                    return [4 /*yield*/, fs_extra_1.default.pathExists('DockerFile')];
                case 2:
                    if (!!(_c.sent())) return [3 /*break*/, 4];
                    dockerPath = '.Dockerfile';
                    return [4 /*yield*/, fs_extra_1.default.writeFileSync(dockerPath, "FROM " + customContainerConfig.image + "\nRUN mkdir /code\nADD " + codeUri + " /code/" + functionName + "\nRUN chmod 755 -R /code\nWORKDIR /code/" + functionName)];
                case 3:
                    _c.sent();
                    _c.label = 4;
                case 4: return [4 /*yield*/, fs_extra_1.default.pathExists('.dockerignore')];
                case 5:
                    if (!!(_c.sent())) return [3 /*break*/, 7];
                    deleteIgnore = true;
                    exclude = code.excludes || [];
                    exclude.unshift('.s/');
                    return [4 /*yield*/, fs_extra_1.default.writeFileSync('.dockerignore', exclude.join(codeUri ? "\n" + codeUri + "/" : '\n'))];
                case 6:
                    _c.sent();
                    _c.label = 7;
                case 7:
                    projectName = (serviceName + "." + functionName).toLowerCase();
                    if (projectName.length > 64) {
                        throw new Error("[" + projectName + "] The length is greater than 64, it is recommended to reduce the length of the service or function name.");
                    }
                    imageId = inputs.appName.toLowerCase() + "/" + projectName + ":" + qualifier;
                    command = "docker build -t " + imageId + " -f " + dockerPath + " . ";
                    stdio = utils_1.isDebug ? 'inherit' : 'ignore';
                    vm = utils_1.isDebug ? undefined : core_1.spinner("Run: " + command);
                    status = spawnSync(command, [], {
                        stdio: stdio,
                        cwd: './',
                        shell: true
                    }).status;
                    if (!deleteIgnore) return [3 /*break*/, 9];
                    return [4 /*yield*/, fs_extra_1.default.remove('.dockerignore')];
                case 8:
                    _c.sent();
                    _c.label = 9;
                case 9:
                    if (!(dockerPath === '.Dockerfile')) return [3 /*break*/, 11];
                    return [4 /*yield*/, fs_extra_1.default.remove(dockerPath)];
                case 10:
                    _c.sent();
                    _c.label = 11;
                case 11:
                    if (status) {
                        vm === null || vm === void 0 ? void 0 : vm.fail();
                        throw new Error('Failed to package image.');
                    }
                    vm === null || vm === void 0 ? void 0 : vm.succeed();
                    return [2 /*return*/, imageId];
            }
        });
    });
}
exports.default = default_1;
function getSrc(code, serviceName, functionName) {
    return __awaiter(this, void 0, void 0, function () {
        var buildCodeUri;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    buildCodeUri = path_1.default.join(process.cwd(), '.s', 'build', 'artifacts', serviceName, functionName);
                    return [4 /*yield*/, fs_extra_1.default.pathExists(buildCodeUri)];
                case 1:
                    if (_a.sent()) {
                        return [2 /*return*/, buildCodeUri];
                    }
                    return [2 /*return*/, code.src];
            }
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUtZG9ja2VyZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZ2VuZXJhdGUtZG9ja2VyZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUEyQjtBQUMzQiw4Q0FBZ0Q7QUFDaEQsOENBQXdCO0FBQ3hCLGlDQUFrQztBQUUxQixJQUFBLFNBQVMsR0FBSyxPQUFPLENBQUMsZUFBZSxDQUFDLFVBQTdCLENBQThCO0FBRS9DLG1CQUErQixNQUFNLEVBQUUsU0FBb0I7SUFBcEIsMEJBQUEsRUFBQSxvQkFBb0I7Ozs7OztvQkFDbkQsVUFBVSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7b0JBQzFCLFdBQVcsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztvQkFDdEMsS0FJRixVQUFVLENBQUMsUUFBUSxFQUhyQixxQkFBcUIsMkJBQUEsRUFDckIsSUFBSSxVQUFBLEVBQ0osWUFBZ0MsRUFBMUIsWUFBWSxtQkFBRyxXQUFXLEtBQUEsQ0FDVjtvQkFRcEIsVUFBVSxHQUFHLFlBQVksQ0FBQztvQkFDMUIsWUFBWSxHQUFHLEtBQUssQ0FBQztvQkFFVCxxQkFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxZQUFZLENBQUMsRUFBQTs7b0JBQXZELE9BQU8sR0FBRyxTQUE2QztvQkFDdkQscUJBQU0sa0JBQUcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUE7O3lCQUFwQyxDQUFDLENBQUMsU0FBa0MsQ0FBQyxFQUFyQyx3QkFBcUM7b0JBQ3ZDLFVBQVUsR0FBRyxhQUFhLENBQUM7b0JBQzNCLHFCQUFNLGtCQUFHLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxVQUFRLHFCQUFxQixDQUFDLEtBQUssK0JBRXJFLE9BQU8sZUFBVSxZQUFZLGdEQUVuQixZQUFjLENBQUMsRUFBQTs7b0JBSjNCLFNBSTJCLENBQUM7O3dCQUd4QixxQkFBTSxrQkFBRyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsRUFBQTs7eUJBQXZDLENBQUMsQ0FBQyxTQUFxQyxDQUFDLEVBQXhDLHdCQUF3QztvQkFDMUMsWUFBWSxHQUFHLElBQUksQ0FBQztvQkFDZCxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7b0JBQ3BDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3ZCLHFCQUFNLGtCQUFHLENBQUMsYUFBYSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBSyxPQUFPLE1BQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQTs7b0JBQXhGLFNBQXdGLENBQUM7OztvQkFHckYsV0FBVyxHQUFHLENBQUcsV0FBVyxTQUFJLFlBQWMsQ0FBQSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUNuRSxJQUFJLFdBQVcsQ0FBQyxNQUFNLEdBQUcsRUFBRSxFQUFFO3dCQUMzQixNQUFNLElBQUksS0FBSyxDQUFDLE1BQUksV0FBVyw2R0FBMEcsQ0FBQyxDQUFBO3FCQUMzSTtvQkFFSyxPQUFPLEdBQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsU0FBSSxXQUFXLFNBQUksU0FBVyxDQUFDO29CQUN4RSxPQUFPLEdBQUcscUJBQW1CLE9BQU8sWUFBTyxVQUFVLFFBQUssQ0FBQztvQkFFM0QsS0FBSyxHQUFHLGVBQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7b0JBQ3ZDLEVBQUUsR0FBRyxlQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsY0FBTyxDQUFDLFVBQVEsT0FBUyxDQUFDLENBQUM7b0JBRXBELE1BQU0sR0FBSyxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRTt3QkFDeEMsS0FBSyxPQUFBO3dCQUNMLEdBQUcsRUFBRSxJQUFJO3dCQUNULEtBQUssRUFBRSxJQUFJO3FCQUNaLENBQUMsT0FKWSxDQUlYO3lCQUVDLFlBQVksRUFBWix3QkFBWTtvQkFDZCxxQkFBTSxrQkFBRyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFBQTs7b0JBQWpDLFNBQWlDLENBQUM7Ozt5QkFFaEMsQ0FBQSxVQUFVLEtBQUssYUFBYSxDQUFBLEVBQTVCLHlCQUE0QjtvQkFDOUIscUJBQU0sa0JBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUE7O29CQUE1QixTQUE0QixDQUFDOzs7b0JBRy9CLElBQUksTUFBTSxFQUFFO3dCQUNWLEVBQUUsYUFBRixFQUFFLHVCQUFGLEVBQUUsQ0FBRSxJQUFJLEdBQUc7d0JBQ1gsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO3FCQUM3QztvQkFDRCxFQUFFLGFBQUYsRUFBRSx1QkFBRixFQUFFLENBQUUsT0FBTyxHQUFHO29CQUNkLHNCQUFPLE9BQU8sRUFBQzs7OztDQUNoQjtBQWpFRCw0QkFpRUM7QUFFRCxTQUFlLE1BQU0sQ0FBQyxJQUFJLEVBQUUsV0FBbUIsRUFBRSxZQUFvQjs7Ozs7O29CQUM3RCxZQUFZLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FDNUIsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUNiLElBQUksRUFDSixPQUFPLEVBQ1AsV0FBVyxFQUNYLFdBQVcsRUFDWCxZQUFZLENBQ2IsQ0FBQztvQkFFRSxxQkFBTSxrQkFBRyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBQTs7b0JBQXRDLElBQUksU0FBa0MsRUFBRTt3QkFDdEMsc0JBQU8sWUFBWSxFQUFDO3FCQUNyQjtvQkFFRCxzQkFBTyxJQUFJLENBQUMsR0FBRyxFQUFDOzs7O0NBQ2pCIn0=