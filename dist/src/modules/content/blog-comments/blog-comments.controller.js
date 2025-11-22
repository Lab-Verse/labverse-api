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
exports.BlogCommentsController = void 0;
const common_1 = require("@nestjs/common");
const blog_comments_service_1 = require("./blog-comments.service");
const create_blog_comment_dto_1 = require("./dto/create-blog-comment.dto");
const update_blog_comment_dto_1 = require("./dto/update-blog-comment.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
let BlogCommentsController = class BlogCommentsController {
    constructor(blogCommentsService) {
        this.blogCommentsService = blogCommentsService;
    }
    create(createBlogCommentDto) {
        return this.blogCommentsService.create(createBlogCommentDto);
    }
    findAll() {
        return this.blogCommentsService.findAll();
    }
    findOne(id) {
        return this.blogCommentsService.findOne(id);
    }
    update(id, updateBlogCommentDto) {
        return this.blogCommentsService.update(id, updateBlogCommentDto);
    }
    remove(id) {
        return this.blogCommentsService.remove(id);
    }
};
exports.BlogCommentsController = BlogCommentsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new blog comment' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_blog_comment_dto_1.CreateBlogCommentDto]),
    __metadata("design:returntype", void 0)
], BlogCommentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all blog comments' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BlogCommentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a specific blog comment by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlogCommentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing blog comment' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_blog_comment_dto_1.UpdateBlogCommentDto]),
    __metadata("design:returntype", void 0)
], BlogCommentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an existing blog comment' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlogCommentsController.prototype, "remove", null);
exports.BlogCommentsController = BlogCommentsController = __decorate([
    (0, swagger_1.ApiTags)('Blog Comments'),
    (0, common_1.Controller)('blog-comments'),
    __metadata("design:paramtypes", [blog_comments_service_1.BlogCommentsService])
], BlogCommentsController);
//# sourceMappingURL=blog-comments.controller.js.map