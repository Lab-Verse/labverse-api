"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProjectDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_projects_dto_1 = require("./create-projects.dto");
class UpdateProjectDto extends (0, swagger_1.PartialType)(create_projects_dto_1.CreateProjectDto) {
}
exports.UpdateProjectDto = UpdateProjectDto;
//# sourceMappingURL=update-projects.dto.js.map