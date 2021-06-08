"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var alicloud_1 = __importDefault(require("./alicloud"));
var ProviderFactory = /** @class */ (function () {
    function ProviderFactory() {
    }
    ProviderFactory.getProvider = function (inputs) {
        return new alicloud_1.default(inputs);
    };
    return ProviderFactory;
}());
exports.default = ProviderFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcHJvdmlkZXJzL2ZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSx3REFBa0M7QUFFbEM7SUFBQTtJQUlBLENBQUM7SUFIUSwyQkFBVyxHQUFsQixVQUFtQixNQUFNO1FBQ3ZCLE9BQU8sSUFBSSxrQkFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUFKRCxJQUlDIn0=