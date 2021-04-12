"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core = __importStar(require("@serverless-devs/core"));
var lodash_1 = __importDefault(require("lodash"));
var constant_1 = require("../../constant");
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.getRole = function (roleInput) {
        var _a = lodash_1.default.cloneDeep(roleInput), name = _a.name, statement = _a.statement, policys = _a.policys;
        if (!name) {
            throw new Error("service/role configuration error.");
        }
        var rolePolicyAttachments = [];
        var rolePolicy = [];
        if (!lodash_1.default.isEmpty(policys)) {
            for (var _i = 0, policys_1 = policys; _i < policys_1.length; _i++) {
                var policyAttachment = policys_1[_i];
                policyAttachment.roleName = name;
                if (policyAttachment.policyType) {
                    rolePolicyAttachments.push(policyAttachment);
                }
                else if (!lodash_1.default.isEmpty(policyAttachment.statement)) {
                    var policyDocument = JSON.stringify({
                        Version: '1',
                        Statement: policyAttachment.statement,
                    });
                    rolePolicy.push({
                        roleName: name,
                        policyName: policyAttachment.policyName,
                        policyDocument: policyDocument
                    });
                }
                else {
                    throw new Error("service/role/policys configuration error.");
                }
            }
        }
        var document;
        if (statement) {
            document = JSON.stringify({
                Statement: JSON.stringify(document),
                Version: '1',
            });
        }
        return {
            role: {
                name: name,
                document: document
            },
            rolePolicyAttachments: rolePolicyAttachments,
            rolePolicy: rolePolicy
        };
    };
    Component.genAutoRole = function (autoName) {
        var rolePolicyAttachments = [
            {
                roleName: autoName,
                policyType: 'System',
                policyName: 'AliyunECSNetworkInterfaceManagementAccess',
            },
            {
                roleName: autoName,
                policyType: 'System',
                policyName: 'AliyunContainerRegistryReadOnlyAccess',
            },
            {
                roleName: autoName,
                policyType: 'System',
                policyName: 'AliyunLogFullAccess',
            }
        ];
        return {
            role: {
                name: autoName,
                document: JSON.stringify({
                    Statement: [
                        {
                            Action: 'sts:AssumeRole',
                            Effect: 'Allow',
                            Principal: {
                                Service: ['fc.aliyuncs.com'],
                            },
                        },
                    ],
                    Version: '1',
                }),
            },
            rolePolicyAttachments: rolePolicyAttachments,
        };
    };
    __decorate([
        core.HLogger(constant_1.CONTEXT),
        __metadata("design:type", Object)
    ], Component, "logger", void 0);
    return Component;
}());
exports.default = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZnJhbWV3b3JrL3JvbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBQzlDLGtEQUF1QjtBQUN2QiwyQ0FBeUM7QUFFekM7SUFBQTtJQTJGQSxDQUFDO0lBeEZRLGlCQUFPLEdBQWQsVUFBZSxTQUFTO1FBQ2hCLElBQUEsS0FBK0IsZ0JBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQW5ELElBQUksVUFBQSxFQUFFLFNBQVMsZUFBQSxFQUFFLE9BQU8sYUFBMkIsQ0FBQztRQUU1RCxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1NBQ3REO1FBRUQsSUFBTSxxQkFBcUIsR0FBRyxFQUFFLENBQUM7UUFDakMsSUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxnQkFBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN2QixLQUErQixVQUFPLEVBQVAsbUJBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU8sRUFBRTtnQkFBbkMsSUFBTSxnQkFBZ0IsZ0JBQUE7Z0JBQ3pCLGdCQUFnQixDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBRWpDLElBQUksZ0JBQWdCLENBQUMsVUFBVSxFQUFFO29CQUMvQixxQkFBcUIsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztpQkFDOUM7cUJBQU0sSUFBSSxDQUFDLGdCQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUNqRCxJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO3dCQUNwQyxPQUFPLEVBQUUsR0FBRzt3QkFDWixTQUFTLEVBQUUsZ0JBQWdCLENBQUMsU0FBUztxQkFDdEMsQ0FBQyxDQUFDO29CQUVILFVBQVUsQ0FBQyxJQUFJLENBQUM7d0JBQ2QsUUFBUSxFQUFFLElBQUk7d0JBQ2QsVUFBVSxFQUFFLGdCQUFnQixDQUFDLFVBQVU7d0JBQ3ZDLGNBQWMsZ0JBQUE7cUJBQ2YsQ0FBQyxDQUFDO2lCQUNKO3FCQUFNO29CQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsMkNBQTJDLENBQUMsQ0FBQTtpQkFDN0Q7YUFDRjtTQUNGO1FBRUQsSUFBSSxRQUFlLENBQUM7UUFDcEIsSUFBSSxTQUFTLEVBQUU7WUFDYixRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDeEIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO2dCQUNuQyxPQUFPLEVBQUUsR0FBRzthQUNiLENBQUMsQ0FBQztTQUNKO1FBRUQsT0FBTztZQUNMLElBQUksRUFBRTtnQkFDSixJQUFJLE1BQUE7Z0JBQ0osUUFBUSxVQUFBO2FBQ1Q7WUFDRCxxQkFBcUIsdUJBQUE7WUFDckIsVUFBVSxZQUFBO1NBQ1gsQ0FBQTtJQUNILENBQUM7SUFFTSxxQkFBVyxHQUFsQixVQUFtQixRQUFnQjtRQUNqQyxJQUFNLHFCQUFxQixHQUFHO1lBQzVCO2dCQUNFLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixVQUFVLEVBQUUsUUFBUTtnQkFDcEIsVUFBVSxFQUFFLDJDQUEyQzthQUN4RDtZQUNEO2dCQUNFLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixVQUFVLEVBQUUsUUFBUTtnQkFDcEIsVUFBVSxFQUFFLHVDQUF1QzthQUNwRDtZQUNEO2dCQUNFLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixVQUFVLEVBQUUsUUFBUTtnQkFDcEIsVUFBVSxFQUFFLHFCQUFxQjthQUNsQztTQUNGLENBQUM7UUFFRixPQUFPO1lBQ0wsSUFBSSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUN2QixTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsTUFBTSxFQUFFLGdCQUFnQjs0QkFDeEIsTUFBTSxFQUFFLE9BQU87NEJBQ2YsU0FBUyxFQUFFO2dDQUNULE9BQU8sRUFBRSxDQUFDLGlCQUFpQixDQUFDOzZCQUM3Qjt5QkFDRjtxQkFDRjtvQkFDRCxPQUFPLEVBQUUsR0FBRztpQkFDYixDQUFDO2FBQ0g7WUFDRCxxQkFBcUIsdUJBQUE7U0FDdEIsQ0FBQztJQUNKLENBQUM7SUF6RnNCO1FBQXRCLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQU8sQ0FBQzs7bUNBQTZCO0lBMEZyRCxnQkFBQztDQUFBLEFBM0ZELElBMkZDO2tCQTNGb0IsU0FBUyJ9