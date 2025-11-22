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
exports.Project = void 0;
const typeorm_1 = require("typeorm");
const clients_entity_1 = require("../../../crm/clients/entities/clients.entity");
const project_status_enum_1 = require("../dto/project-status.enum");
const project_milestone_entity_1 = require("../../project-milestones/entities/project-milestone.entity");
const project_member_entity_1 = require("../../project-members/entities/project-member.entity");
const project_technology_entity_1 = require("../../project-technologies/entities/project-technology.entity");
const invoice_entity_1 = require("../../../billing/invoices/entities/invoice.entity");
const project_update_entity_1 = require("../../project-updates/entities/project-update.entity");
const time_entry_entity_1 = require("../../time-entries/entities/time-entry.entity");
const task_entity_1 = require("../../tasks/entities/task.entity");
let Project = class Project {
};
exports.Project = Project;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Project.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: false,
        unique: true,
    }),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], Project.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        nullable: true,
    }),
    __metadata("design:type", Date)
], Project.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        nullable: true,
    }),
    __metadata("design:type", Date)
], Project.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: project_status_enum_1.ProjectStatus,
        default: project_status_enum_1.ProjectStatus.IN_PROGRESS,
    }),
    __metadata("design:type", String)
], Project.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 12,
        scale: 2,
        nullable: true,
    }),
    __metadata("design:type", Number)
], Project.prototype, "budget", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        array: true,
        nullable: true,
    }),
    __metadata("design:type", Array)
], Project.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => clients_entity_1.Client, (client) => client.projects, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'client_id' }),
    __metadata("design:type", clients_entity_1.Client)
], Project.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'uuid',
        nullable: true,
        name: 'client_id',
    }),
    __metadata("design:type", String)
], Project.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_entity_1.Task, (task) => task.project),
    __metadata("design:type", Array)
], Project.prototype, "tasks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => time_entry_entity_1.TimeEntry, (timeEntry) => timeEntry.project),
    __metadata("design:type", Array)
], Project.prototype, "timeEntries", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_update_entity_1.ProjectUpdate, (update) => update.project),
    __metadata("design:type", Array)
], Project.prototype, "updates", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_milestone_entity_1.ProjectMilestone, (milestone) => milestone.project),
    __metadata("design:type", Array)
], Project.prototype, "milestones", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_member_entity_1.ProjectMember, (member) => member.project),
    __metadata("design:type", Array)
], Project.prototype, "members", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_technology_entity_1.ProjectTechnology, (pt) => pt.project),
    __metadata("design:type", Array)
], Project.prototype, "projectTechnologies", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => invoice_entity_1.Invoice, (invoice) => invoice.project),
    __metadata("design:type", Array)
], Project.prototype, "invoices", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Project.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Project.prototype, "updatedAt", void 0);
exports.Project = Project = __decorate([
    (0, typeorm_1.Entity)('projects')
], Project);
//# sourceMappingURL=projects.entity.js.map