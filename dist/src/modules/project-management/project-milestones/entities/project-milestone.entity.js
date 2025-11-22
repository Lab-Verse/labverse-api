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
exports.ProjectMilestone = void 0;
const typeorm_1 = require("typeorm");
const projects_entity_1 = require("../../projects/entities/projects.entity");
const task_entity_1 = require("../../tasks/entities/task.entity");
let ProjectMilestone = class ProjectMilestone {
};
exports.ProjectMilestone = ProjectMilestone;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProjectMilestone.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => projects_entity_1.Project, (project) => project.milestones, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'project_id' }),
    __metadata("design:type", projects_entity_1.Project)
], ProjectMilestone.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectMilestone.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ProjectMilestone.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], ProjectMilestone.prototype, "due_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Not Started' }),
    __metadata("design:type", String)
], ProjectMilestone.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_entity_1.Task, (task) => task.project_milestone),
    __metadata("design:type", Array)
], ProjectMilestone.prototype, "tasks", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ProjectMilestone.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ProjectMilestone.prototype, "updated_at", void 0);
exports.ProjectMilestone = ProjectMilestone = __decorate([
    (0, typeorm_1.Entity)('project_milestones')
], ProjectMilestone);
//# sourceMappingURL=project-milestone.entity.js.map