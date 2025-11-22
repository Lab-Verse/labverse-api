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
exports.CreateProjectDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const project_status_enum_1 = require("./project-status.enum");
class CreateProjectDto {
}
exports.CreateProjectDto = CreateProjectDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the project',
        example: 'Website Redesign Project',
        minLength: 3,
        maxLength: 255,
    }),
    (0, class_validator_1.IsString)({ message: 'Project name must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Project name is required' }),
    (0, class_validator_1.MinLength)(3, { message: 'Project name must be at least 3 characters long' }),
    (0, class_validator_1.MaxLength)(255, { message: 'Project name cannot exceed 255 characters' }),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Detailed description of the project',
        example: 'This project involves redesigning the corporate website for better UX.',
        maxLength: 5000,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Description must be a string' }),
    (0, class_validator_1.MaxLength)(5000, { message: 'Description cannot exceed 5000 characters' }),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Project start date in ISO format',
        example: '2025-09-01',
        type: String,
        format: 'date',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'Start date must be a valid ISO date string' }),
    __metadata("design:type", Date)
], CreateProjectDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Project end date in ISO format',
        example: '2025-12-31',
        type: String,
        format: 'date',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'End date must be a valid ISO date string' }),
    __metadata("design:type", Date)
], CreateProjectDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Current status of the project',
        enum: project_status_enum_1.ProjectStatus,
        example: project_status_enum_1.ProjectStatus.IN_PROGRESS,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(project_status_enum_1.ProjectStatus, { message: 'Status must be a valid project status' }),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Budget allocated for the project',
        example: 150000,
        minimum: 0,
        maximum: 999999999.99,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'Budget must be a number' }),
    (0, class_validator_1.Min)(0, { message: 'Budget cannot be negative' }),
    (0, class_validator_1.Max)(999999999.99, { message: 'Budget cannot exceed 999,999,999.99' }),
    __metadata("design:type", Number)
], CreateProjectDto.prototype, "budget", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'UUID of the client for the project',
        example: '11111111-1111-1111-1111-111111111111',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Client ID cannot be empty' }),
    (0, class_validator_1.IsUUID)(4, { message: 'Client ID must be a valid UUID' }),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "clientId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Array of image URLs for the project',
        example: [
            'https://fvatmbbtvtixwnnmfbuh.supabase.co/storage/v1/object/public/Labverse/projects/image1.png',
        ],
        type: [String],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateProjectDto.prototype, "images", void 0);
//# sourceMappingURL=create-projects.dto.js.map