"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignPermissionsDto = exports.AssignmentActionEnum = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const permission_actions_enum_1 = require("../../../common/enums/permission-actions.enum");
var AssignmentActionEnum;
(function (AssignmentActionEnum) {
    AssignmentActionEnum["ADD"] = "add";
    AssignmentActionEnum["REMOVE"] = "remove";
    AssignmentActionEnum["REPLACE"] = "replace";
})(AssignmentActionEnum || (exports.AssignmentActionEnum = AssignmentActionEnum = {}));
class AssignPermissionsDto {
    constructor() {
        this.assignmentAction = AssignmentActionEnum.ADD;
    }
}
exports.AssignPermissionsDto = AssignPermissionsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Feature name (e.g., users, projects, tasks, client-notes)',
        example: 'users',
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AssignPermissionsDto.prototype, "feature", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Actions to assign for this feature',
        enum: permission_actions_enum_1.PermissionActionEnum,
        isArray: true,
        example: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
        ],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(permission_actions_enum_1.PermissionActionEnum, { each: true }),
    __metadata("design:type", Array)
], AssignPermissionsDto.prototype, "actions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'How to apply these permissions to the user',
        enum: AssignmentActionEnum,
        default: AssignmentActionEnum.ADD,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(AssignmentActionEnum),
    __metadata("design:type", String)
], AssignPermissionsDto.prototype, "assignmentAction", void 0);
//# sourceMappingURL=assign-permissions.dto.js.map