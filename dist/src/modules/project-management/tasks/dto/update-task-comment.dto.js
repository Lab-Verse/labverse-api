"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskCommentDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_task_comment_dto_1 = require("./create-task-comment.dto");
class UpdateTaskCommentDto extends (0, mapped_types_1.PartialType)(create_task_comment_dto_1.CreateTaskCommentDto) {
}
exports.UpdateTaskCommentDto = UpdateTaskCommentDto;
//# sourceMappingURL=update-task-comment.dto.js.map