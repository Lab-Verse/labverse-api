"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectTechnologiesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const project_technology_service_1 = require("./project-technology.service");
const project_technology_controller_1 = require("./project-technology.controller");
const project_technology_entity_1 = require("./entities/project-technology.entity");
const projects_entity_1 = require("../projects/entities/projects.entity");
const technology_entity_1 = require("../../technology/entities/technology.entity");
let ProjectTechnologiesModule = class ProjectTechnologiesModule {
};
exports.ProjectTechnologiesModule = ProjectTechnologiesModule;
exports.ProjectTechnologiesModule = ProjectTechnologiesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([project_technology_entity_1.ProjectTechnology, projects_entity_1.Project, technology_entity_1.Technology])],
        controllers: [project_technology_controller_1.ProjectTechnologiesController],
        providers: [project_technology_service_1.ProjectTechnologiesService],
        exports: [project_technology_service_1.ProjectTechnologiesService],
    })
], ProjectTechnologiesModule);
//# sourceMappingURL=project-technology.module.js.map