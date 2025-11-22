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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogCommentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const blog_comment_entity_1 = require("./entities/blog-comment.entity");
const security_util_1 = require("../../../common/utils/security.util");
let BlogCommentsService = class BlogCommentsService {
    constructor(blogCommentRepository) {
        this.blogCommentRepository = blogCommentRepository;
    }
    create(createBlogCommentDto) {
        security_util_1.SecurityUtil.validateObject(createBlogCommentDto);
        const comment = this.blogCommentRepository.create(createBlogCommentDto);
        return this.blogCommentRepository.save(comment);
    }
    findAll() {
        return this.blogCommentRepository.find({
            relations: ['blogPost', 'parentComment'],
        });
    }
    findOne(id) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        return this.blogCommentRepository.findOne({
            where: { id: validId },
            relations: ['blogPost', 'parentComment'],
        });
    }
    async update(id, updateBlogCommentDto) {
        security_util_1.SecurityUtil.validateObject(updateBlogCommentDto);
        const validId = security_util_1.SecurityUtil.validateId(id);
        await this.blogCommentRepository.update(validId, updateBlogCommentDto);
        return this.findOne(validId);
    }
    async remove(id) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        const result = await this.blogCommentRepository.delete(validId);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Blog comment with ID "${validId}" not found.`);
        }
        return { message: 'Blog comment successfully deleted' };
    }
};
exports.BlogCommentsService = BlogCommentsService;
exports.BlogCommentsService = BlogCommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(blog_comment_entity_1.BlogComment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BlogCommentsService);
//# sourceMappingURL=blog-comments.service.js.map