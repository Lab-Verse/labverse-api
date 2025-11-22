"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProjectMemberDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_project_member_dto_1 = require("./create-project-member.dto");
class UpdateProjectMemberDto extends (0, mapped_types_1.PartialType)(create_project_member_dto_1.CreateProjectMemberDto) {
}
exports.UpdateProjectMemberDto = UpdateProjectMemberDto;
//# sourceMappingURL=update-project-member.dto.js.map