"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProjectMilestoneDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_project_milestone_dto_1 = require("./create-project-milestone.dto");
class UpdateProjectMilestoneDto extends (0, mapped_types_1.PartialType)(create_project_milestone_dto_1.CreateProjectMilestoneDto) {
}
exports.UpdateProjectMilestoneDto = UpdateProjectMilestoneDto;
//# sourceMappingURL=update-project-milestone.dto.js.map