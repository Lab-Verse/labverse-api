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
exports.CreateCaseStudyDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateCaseStudyDto {
}
exports.CreateCaseStudyDto = CreateCaseStudyDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Title of the case study',
        example: 'Scaling an E-commerce Platform with NestJS and PostgreSQL',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCaseStudyDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'SEO-friendly slug for the case study',
        example: 'scaling-ecommerce-platform-nestjs-postgresql',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCaseStudyDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Introduction or summary of the case study',
        example: 'This case study highlights how we improved performance and scalability for a leading e-commerce client.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCaseStudyDto.prototype, "introduction", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Challenges faced by the client',
        example: 'The client struggled with slow checkout processes and database bottlenecks during peak sales.',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCaseStudyDto.prototype, "challenge", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Solution implemented to address the challenge',
        example: 'We migrated the system to NestJS with PostgreSQL, optimized queries, and introduced caching.',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCaseStudyDto.prototype, "solution", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Results achieved after implementing the solution',
        example: 'Checkout speed improved by 60%, and the platform handled 5x more concurrent users.',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCaseStudyDto.prototype, "results", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Name of the client featured in the case study',
        example: 'Acme Corp',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCaseStudyDto.prototype, "clientName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Thumbnail image URL for the case study',
        example: 'https://example.com/images/case-study-thumbnail.png',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCaseStudyDto.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Category ID of the case study (UUID v4)',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateCaseStudyDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Publication status of the case study',
        example: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCaseStudyDto.prototype, "isPublished", void 0);
//# sourceMappingURL=create-case-study.dto.js.map