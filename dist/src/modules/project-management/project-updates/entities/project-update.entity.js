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
exports.ProjectUpdate = void 0;
const typeorm_1 = require("typeorm");
const projects_entity_1 = require("../../projects/entities/projects.entity");
const employee_entity_1 = require("../../../hr/employees/entities/employee.entity");
let ProjectUpdate = class ProjectUpdate {
};
exports.ProjectUpdate = ProjectUpdate;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProjectUpdate.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'project_id', type: 'uuid' }),
    __metadata("design:type", String)
], ProjectUpdate.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'uuid' }),
    __metadata("design:type", String)
], ProjectUpdate.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectUpdate.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ProjectUpdate.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'update_date', type: 'date' }),
    __metadata("design:type", Date)
], ProjectUpdate.prototype, "updateDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ProjectUpdate.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], ProjectUpdate.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => projects_entity_1.Project),
    (0, typeorm_1.JoinColumn)({ name: 'project_id' }),
    __metadata("design:type", projects_entity_1.Project)
], ProjectUpdate.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.EmployeeProfile),
    (0, typeorm_1.JoinColumn)({ name: 'updated_by' }),
    __metadata("design:type", employee_entity_1.EmployeeProfile)
], ProjectUpdate.prototype, "updatedByEmployee", void 0);
exports.ProjectUpdate = ProjectUpdate = __decorate([
    (0, typeorm_1.Entity)('project_updates')
], ProjectUpdate);
//# sourceMappingURL=project-update.entity.js.map