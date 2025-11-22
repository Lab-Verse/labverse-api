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
exports.CreateProjectUpdateDto = exports.ProjectUpdateType = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var ProjectUpdateType;
(function (ProjectUpdateType) {
    ProjectUpdateType["PROGRESS"] = "progress";
    ProjectUpdateType["MILESTONE"] = "milestone";
    ProjectUpdateType["ISSUE"] = "issue";
    ProjectUpdateType["COMPLETION"] = "completion";
})(ProjectUpdateType || (exports.ProjectUpdateType = ProjectUpdateType = {}));
class CreateProjectUpdateDto {
}
exports.CreateProjectUpdateDto = CreateProjectUpdateDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UUID of the project',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateProjectUpdateDto.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Title of the project update',
        example: 'Phase 1 Development Completed',
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProjectUpdateDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Detailed description of the update',
        example: 'The development of core modules for Phase 1 has been completed successfully.',
        maxLength: 255,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProjectUpdateDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of the project update',
        enum: ProjectUpdateType,
        example: ProjectUpdateType.PROGRESS,
    }),
    (0, class_validator_1.IsEnum)(ProjectUpdateType),
    __metadata("design:type", String)
], CreateProjectUpdateDto.prototype, "updateType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'UUID of the employee who created this update',
        example: '11111111-1111-1111-1111-111111111111',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateProjectUpdateDto.prototype, "createdByEmployeeId", void 0);
//# sourceMappingURL=create-project-update.dto.js.map