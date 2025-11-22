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
exports.CreateProjectMemberDto = exports.ProjectMemberRole = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var ProjectMemberRole;
(function (ProjectMemberRole) {
    ProjectMemberRole["LEAD"] = "lead";
    ProjectMemberRole["DEVELOPER"] = "developer";
    ProjectMemberRole["DESIGNER"] = "designer";
    ProjectMemberRole["TESTER"] = "tester";
})(ProjectMemberRole || (exports.ProjectMemberRole = ProjectMemberRole = {}));
class CreateProjectMemberDto {
}
exports.CreateProjectMemberDto = CreateProjectMemberDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UUID of the project',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateProjectMemberDto.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UUID of the employee to be assigned to the project',
        example: '11111111-1111-1111-1111-111111111111',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateProjectMemberDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Role of the employee in the project',
        enum: ProjectMemberRole,
        example: ProjectMemberRole.DEVELOPER,
    }),
    (0, class_validator_1.IsEnum)(ProjectMemberRole),
    __metadata("design:type", String)
], CreateProjectMemberDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Optional responsibilities of the project member',
        example: 'Develop backend APIs and manage database schema',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProjectMemberDto.prototype, "responsibilities", void 0);
//# sourceMappingURL=create-project-member.dto.js.map