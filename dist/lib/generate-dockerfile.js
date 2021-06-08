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
var path_1 = __importDefault(require("path"));
var spawnSync = require('child_process').spawnSync;
function default_1(inputs, qualifier) {
    if (qualifier === void 0) { qualifier = 'LATEST'; }
    return __awaiter(this, void 0, void 0, function () {
        var properties, serviceName, _a, customContainerConfig, code, _b, functionName, dockerPath, deleteIgnore, codeUri, exclude, projectName, imageId, status;
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
                    status = spawnSync("docker build -t " + imageId + " -f " + dockerPath + " . ", [], {
                        cwd: './',
                        stdio: 'inherit',
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
                        throw new Error('Failed to package image.');
                    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUtZG9ja2VyZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZ2VuZXJhdGUtZG9ja2VyZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUEyQjtBQUMzQiw4Q0FBd0I7QUFFaEIsSUFBQSxTQUFTLEdBQUssT0FBTyxDQUFDLGVBQWUsQ0FBQyxVQUE3QixDQUE4QjtBQUUvQyxtQkFBK0IsTUFBTSxFQUFFLFNBQW9CO0lBQXBCLDBCQUFBLEVBQUEsb0JBQW9COzs7Ozs7b0JBQ25ELFVBQVUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO29CQUMxQixXQUFXLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQ3RDLEtBSUYsVUFBVSxDQUFDLFFBQVEsRUFIckIscUJBQXFCLDJCQUFBLEVBQ3JCLElBQUksVUFBQSxFQUNKLFlBQWdDLEVBQTFCLFlBQVksbUJBQUcsV0FBVyxLQUFBLENBQ1Y7b0JBUXBCLFVBQVUsR0FBRyxZQUFZLENBQUM7b0JBQzFCLFlBQVksR0FBRyxLQUFLLENBQUM7b0JBRVQscUJBQU0sTUFBTSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsWUFBWSxDQUFDLEVBQUE7O29CQUF2RCxPQUFPLEdBQUcsU0FBNkM7b0JBQ3ZELHFCQUFNLGtCQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFBOzt5QkFBcEMsQ0FBQyxDQUFDLFNBQWtDLENBQUMsRUFBckMsd0JBQXFDO29CQUN2QyxVQUFVLEdBQUcsYUFBYSxDQUFDO29CQUMzQixxQkFBTSxrQkFBRyxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsVUFBUSxxQkFBcUIsQ0FBQyxLQUFLLCtCQUVyRSxPQUFPLGVBQVUsWUFBWSxnREFFbkIsWUFBYyxDQUFDLEVBQUE7O29CQUozQixTQUkyQixDQUFDOzt3QkFHeEIscUJBQU0sa0JBQUcsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLEVBQUE7O3lCQUF2QyxDQUFDLENBQUMsU0FBcUMsQ0FBQyxFQUF4Qyx3QkFBd0M7b0JBQzFDLFlBQVksR0FBRyxJQUFJLENBQUM7b0JBQ2QsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO29CQUNwQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN2QixxQkFBTSxrQkFBRyxDQUFDLGFBQWEsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQUssT0FBTyxNQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUE7O29CQUF4RixTQUF3RixDQUFDOzs7b0JBR3JGLFdBQVcsR0FBRyxDQUFHLFdBQVcsU0FBSSxZQUFjLENBQUEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDbkUsSUFBSSxXQUFXLENBQUMsTUFBTSxHQUFHLEVBQUUsRUFBRTt3QkFDM0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFJLFdBQVcsNkdBQTBHLENBQUMsQ0FBQTtxQkFDM0k7b0JBQ0ssT0FBTyxHQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLFNBQUksV0FBVyxTQUFJLFNBQVcsQ0FBQztvQkFDdEUsTUFBTSxHQUFLLFNBQVMsQ0FBQyxxQkFBbUIsT0FBTyxZQUFPLFVBQVUsUUFBSyxFQUFFLEVBQUUsRUFBRTt3QkFDakYsR0FBRyxFQUFFLElBQUk7d0JBQ1QsS0FBSyxFQUFFLFNBQVM7d0JBQ2hCLEtBQUssRUFBRSxJQUFJO3FCQUNaLENBQUMsT0FKWSxDQUlYO3lCQUVDLFlBQVksRUFBWix3QkFBWTtvQkFDZCxxQkFBTSxrQkFBRyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFBQTs7b0JBQWpDLFNBQWlDLENBQUM7Ozt5QkFFaEMsQ0FBQSxVQUFVLEtBQUssYUFBYSxDQUFBLEVBQTVCLHlCQUE0QjtvQkFDOUIscUJBQU0sa0JBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUE7O29CQUE1QixTQUE0QixDQUFDOzs7b0JBRy9CLElBQUksTUFBTSxFQUFFO3dCQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQztxQkFDN0M7b0JBQ0Qsc0JBQU8sT0FBTyxFQUFDOzs7O0NBQ2hCO0FBekRELDRCQXlEQztBQUVELFNBQWUsTUFBTSxDQUFDLElBQUksRUFBRSxXQUFtQixFQUFFLFlBQW9COzs7Ozs7b0JBQzdELFlBQVksR0FBRyxjQUFJLENBQUMsSUFBSSxDQUM1QixPQUFPLENBQUMsR0FBRyxFQUFFLEVBQ2IsSUFBSSxFQUNKLE9BQU8sRUFDUCxXQUFXLEVBQ1gsV0FBVyxFQUNYLFlBQVksQ0FDYixDQUFDO29CQUVFLHFCQUFNLGtCQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFBOztvQkFBdEMsSUFBSSxTQUFrQyxFQUFFO3dCQUN0QyxzQkFBTyxZQUFZLEVBQUM7cUJBQ3JCO29CQUVELHNCQUFPLElBQUksQ0FBQyxHQUFHLEVBQUM7Ozs7Q0FDakIifQ==