"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBlogCommentDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_blog_comment_dto_1 = require("./create-blog-comment.dto");
class UpdateBlogCommentDto extends (0, mapped_types_1.PartialType)(create_blog_comment_dto_1.CreateBlogCommentDto) {
}
exports.UpdateBlogCommentDto = UpdateBlogCommentDto;
//# sourceMappingURL=update-blog-comment.dto.js.map