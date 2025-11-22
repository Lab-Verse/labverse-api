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
exports.CreateProjectMilestoneDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateProjectMilestoneDto {
}
exports.CreateProjectMilestoneDto = CreateProjectMilestoneDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UUID of the project this milestone belongs to',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateProjectMilestoneDto.prototype, "project_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the milestone',
        example: 'Phase 1 Completion',
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProjectMilestoneDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Detailed description of the milestone',
        example: 'Complete all initial setup tasks and core module development',
        maxLength: 255,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProjectMilestoneDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Due date for the milestone',
        example: '2025-09-30',
        type: String,
        format: 'date',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateProjectMilestoneDto.prototype, "due_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Current status of the milestone',
        example: 'in_progress',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProjectMilestoneDto.prototype, "status", void 0);
//# sourceMappingURL=create-project-milestone.dto.js.map