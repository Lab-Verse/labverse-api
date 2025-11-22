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
exports.ProjectTechnology = void 0;
const typeorm_1 = require("typeorm");
const projects_entity_1 = require("../../projects/entities/projects.entity");
const technology_entity_1 = require("../../../technology/entities/technology.entity");
let ProjectTechnology = class ProjectTechnology {
};
exports.ProjectTechnology = ProjectTechnology;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'project_id', type: 'uuid' }),
    __metadata("design:type", String)
], ProjectTechnology.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'technology_id', type: 'uuid' }),
    __metadata("design:type", String)
], ProjectTechnology.prototype, "technologyId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => projects_entity_1.Project, (project) => project.id, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'project_id' }),
    __metadata("design:type", projects_entity_1.Project)
], ProjectTechnology.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => technology_entity_1.Technology, (technology) => technology.id, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'technology_id' }),
    __metadata("design:type", technology_entity_1.Technology)
], ProjectTechnology.prototype, "technology", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ProjectTechnology.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], ProjectTechnology.prototype, "updatedAt", void 0);
exports.ProjectTechnology = ProjectTechnology = __decorate([
    (0, typeorm_1.Entity)({ name: 'project_technologies' })
], ProjectTechnology);
//# sourceMappingURL=project-technology.entity.js.map