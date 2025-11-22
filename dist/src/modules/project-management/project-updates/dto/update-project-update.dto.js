"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProjectUpdateDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_project_update_dto_1 = require("./create-project-update.dto");
class UpdateProjectUpdateDto extends (0, mapped_types_1.PartialType)(create_project_update_dto_1.CreateProjectUpdateDto) {
}
exports.UpdateProjectUpdateDto = UpdateProjectUpdateDto;
//# sourceMappingURL=update-project-update.dto.js.map