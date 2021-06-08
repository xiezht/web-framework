"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fc2_1 = __importDefault(require("@alicloud/fc2"));
var pop_core_1 = __importDefault(require("@alicloud/pop-core"));
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.fc = function (region, profile) {
        fc2_1.default.prototype.getAccountSettings = function (options, headers) {
            if (options === void 0) { options = {}; }
            if (headers === void 0) { headers = {}; }
            return this.get('/account-settings', options, headers);
        };
        return new fc2_1.default(profile.AccountID, {
            region: region,
            accessKeyID: profile.AccessKeyID,
            accessKeySecret: profile.AccessKeySecret,
            securityToken: profile.SecurityToken,
            endpoint: "https://" + profile.AccountID + "." + region + ".fc.aliyuncs.com",
            timeout: 6000000,
        });
    };
    Component.pop = function (endpoint, profile) {
        return new pop_core_1.default({
            endpoint: endpoint,
            apiVersion: '2017-06-26',
            accessKeyId: profile.AccessKeyID,
            // @ts-ignore
            securityToken: profile.SecurityToken,
            accessKeySecret: profile.AccessKeySecret,
        });
    };
    return Component;
}());
exports.default = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBK0I7QUFDL0IsZ0VBQXFDO0FBR3JDO0lBQUE7SUEwQkEsQ0FBQztJQXpCUSxZQUFFLEdBQVQsVUFBVSxNQUFjLEVBQUUsT0FBcUI7UUFDN0MsYUFBRSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsR0FBRyxVQUFVLE9BQVksRUFBRSxPQUFZO1lBQTFCLHdCQUFBLEVBQUEsWUFBWTtZQUFFLHdCQUFBLEVBQUEsWUFBWTtZQUNwRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3pELENBQUMsQ0FBQztRQUVGLE9BQU8sSUFBSSxhQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTtZQUMvQixNQUFNLFFBQUE7WUFDTixXQUFXLEVBQUUsT0FBTyxDQUFDLFdBQVc7WUFDaEMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxlQUFlO1lBQ3hDLGFBQWEsRUFBRSxPQUFPLENBQUMsYUFBYTtZQUNwQyxRQUFRLEVBQUUsYUFBVyxPQUFPLENBQUMsU0FBUyxTQUFJLE1BQU0scUJBQWtCO1lBQ2xFLE9BQU8sRUFBRSxPQUFPO1NBQ2pCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxhQUFHLEdBQVYsVUFBVyxRQUFnQixFQUFFLE9BQXFCO1FBQ2hELE9BQU8sSUFBSSxrQkFBRyxDQUFDO1lBQ2IsUUFBUSxVQUFBO1lBQ1IsVUFBVSxFQUFFLFlBQVk7WUFDeEIsV0FBVyxFQUFFLE9BQU8sQ0FBQyxXQUFXO1lBQ2hDLGFBQWE7WUFDYixhQUFhLEVBQUUsT0FBTyxDQUFDLGFBQWE7WUFDcEMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxlQUFlO1NBQ3pDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCxnQkFBQztBQUFELENBQUMsQUExQkQsSUEwQkMifQ==