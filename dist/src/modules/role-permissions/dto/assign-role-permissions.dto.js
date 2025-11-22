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
exports.AssignRolePermissionsDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const permission_actions_enum_1 = require("../../../common/enums/permission-actions.enum");
class AssignRolePermissionsDto {
}
exports.AssignRolePermissionsDto = AssignRolePermissionsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of permission UUIDs to assign to the role',
        example: [
            '11111111-1111-1111-1111-111111111111',
            '22222222-2222-2222-2222-222222222222',
        ],
        isArray: true,
        type: String,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('4', { each: true }),
    __metadata("design:type", Array)
], AssignRolePermissionsDto.prototype, "permissionIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Action to apply for these permissions',
        enum: permission_actions_enum_1.PermissionActionEnum,
        example: permission_actions_enum_1.PermissionActionEnum.CREATE,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(permission_actions_enum_1.PermissionActionEnum),
    __metadata("design:type", String)
], AssignRolePermissionsDto.prototype, "action", void 0);
//# sourceMappingURL=assign-role-permissions.dto.js.map