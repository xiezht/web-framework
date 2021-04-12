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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.genPulumiInputs = exports.cpPulumiCodeFiles = void 0;
var path_1 = __importDefault(require("path"));
var fse = __importStar(require("fs-extra"));
var core_1 = require("@serverless-devs/core");
var constant_1 = require("../constant");
var PULUMI_CODE_DIR = path_1.default.join(__dirname, 'pulumi-fc');
var PULUMI_CODE_FILE = path_1.default.join(PULUMI_CODE_DIR, 'index.js');
var PULUMI_PACKAGE_FILE = path_1.default.join(PULUMI_CODE_DIR, 'package.json');
function cpPulumiCodeFiles(targetDir) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    core_1.Logger.debug(constant_1.CONTEXT, "Coping files under " + PULUMI_CODE_DIR + " to " + targetDir);
                    return [4 /*yield*/, fse.copy(PULUMI_CODE_FILE, path_1.default.join(targetDir, path_1.default.basename(PULUMI_CODE_FILE)), {
                            overwrite: true,
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, fse.copy(PULUMI_PACKAGE_FILE, path_1.default.join(targetDir, path_1.default.basename(PULUMI_PACKAGE_FILE)), {
                            overwrite: true,
                        })];
                case 2:
                    _a.sent();
                    core_1.Logger.debug(constant_1.CONTEXT, "Copy files under " + PULUMI_CODE_DIR + " to " + targetDir + " done.");
                    return [2 /*return*/];
            }
        });
    });
}
exports.cpPulumiCodeFiles = cpPulumiCodeFiles;
function genPulumiInputs(inputs, stackId, region, pulumiStackDirOfService) {
    return __assign(__assign({}, inputs), { props: {
            region: region,
            projectName: stackId,
            stackName: stackId,
            workDir: pulumiStackDirOfService,
            runtime: 'nodejs',
            cloudPlatform: 'alicloud',
        }, args: '' });
}
exports.genPulumiInputs = genPulumiInputs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVsdW1pLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9wdWx1bWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXdCO0FBQ3hCLDRDQUFnQztBQUNoQyw4Q0FBK0M7QUFDL0Msd0NBQXNDO0FBRXRDLElBQU0sZUFBZSxHQUFXLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ2xFLElBQU0sZ0JBQWdCLEdBQVcsY0FBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDeEUsSUFBTSxtQkFBbUIsR0FBVyxjQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxjQUFjLENBQUMsQ0FBQztBQUUvRSxTQUFzQixpQkFBaUIsQ0FBQyxTQUFTOzs7OztvQkFDL0MsYUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBTyxFQUFFLHdCQUFzQixlQUFlLFlBQU8sU0FBVyxDQUFDLENBQUM7b0JBRS9FLHFCQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsY0FBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUU7NEJBQ3RGLFNBQVMsRUFBRSxJQUFJO3lCQUNoQixDQUFDLEVBQUE7O29CQUZGLFNBRUUsQ0FBQztvQkFFSCxxQkFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGNBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxFQUFFOzRCQUM1RixTQUFTLEVBQUUsSUFBSTt5QkFDaEIsQ0FBQyxFQUFBOztvQkFGRixTQUVFLENBQUM7b0JBRUgsYUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBTyxFQUFFLHNCQUFvQixlQUFlLFlBQU8sU0FBUyxXQUFRLENBQUMsQ0FBQzs7Ozs7Q0FDcEY7QUFaRCw4Q0FZQztBQUVELFNBQWdCLGVBQWUsQ0FDN0IsTUFBTSxFQUNOLE9BQWUsRUFDZixNQUFjLEVBQ2QsdUJBQStCO0lBRy9CLDZCQUNLLE1BQU0sS0FDVCxLQUFLLEVBQUU7WUFDTCxNQUFNLFFBQUE7WUFDTixXQUFXLEVBQUUsT0FBTztZQUNwQixTQUFTLEVBQUUsT0FBTztZQUNsQixPQUFPLEVBQUUsdUJBQXVCO1lBQ2hDLE9BQU8sRUFBRSxRQUFRO1lBQ2pCLGFBQWEsRUFBRSxVQUFVO1NBQzFCLEVBQ0QsSUFBSSxFQUFFLEVBQUUsSUFDUjtBQUNKLENBQUM7QUFuQkQsMENBbUJDIn0=