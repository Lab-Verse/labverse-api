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
exports.CreateBlogCommentDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateBlogCommentDto {
}
exports.CreateBlogCommentDto = CreateBlogCommentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the blog post being commented on (UUID v4)',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateBlogCommentDto.prototype, "postId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID of the user making the comment (UUID v4). Used if the commenter is a registered user.',
        example: '11111111-1111-1111-1111-111111111111',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateBlogCommentDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Name of the guest commenter (if not logged in)',
        example: 'Jane Doe',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBlogCommentDto.prototype, "guestName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Email of the guest commenter (if not logged in)',
        example: 'guest@example.com',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateBlogCommentDto.prototype, "guestEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Content of the blog comment',
        example: 'This article really helped me understand NestJS services better!',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBlogCommentDto.prototype, "commentContent", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID of the parent comment (UUID v4) if this is a reply',
        example: '22222222-2222-2222-2222-222222222222',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateBlogCommentDto.prototype, "parentCommentId", void 0);
//# sourceMappingURL=create-blog-comment.dto.js.map