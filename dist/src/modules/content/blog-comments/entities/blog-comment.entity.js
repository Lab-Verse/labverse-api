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
exports.BlogComment = void 0;
const typeorm_1 = require("typeorm");
const blog_post_entity_1 = require("../../blog-posts/entities/blog-post.entity");
let BlogComment = class BlogComment {
};
exports.BlogComment = BlogComment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BlogComment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'post_id', type: 'uuid' }),
    __metadata("design:type", String)
], BlogComment.prototype, "postId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], BlogComment.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'guest_name', nullable: true }),
    __metadata("design:type", String)
], BlogComment.prototype, "guestName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'guest_email', nullable: true }),
    __metadata("design:type", String)
], BlogComment.prototype, "guestEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'comment_content', type: 'text' }),
    __metadata("design:type", String)
], BlogComment.prototype, "commentContent", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'parent_comment_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], BlogComment.prototype, "parentCommentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_approved', default: false }),
    __metadata("design:type", Boolean)
], BlogComment.prototype, "isApproved", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], BlogComment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], BlogComment.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => blog_post_entity_1.BlogPost),
    (0, typeorm_1.JoinColumn)({ name: 'post_id' }),
    __metadata("design:type", blog_post_entity_1.BlogPost)
], BlogComment.prototype, "blogPost", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => BlogComment),
    (0, typeorm_1.JoinColumn)({ name: 'parent_comment_id' }),
    __metadata("design:type", BlogComment)
], BlogComment.prototype, "parentComment", void 0);
exports.BlogComment = BlogComment = __decorate([
    (0, typeorm_1.Entity)('blog_comments')
], BlogComment);
//# sourceMappingURL=blog-comment.entity.js.map