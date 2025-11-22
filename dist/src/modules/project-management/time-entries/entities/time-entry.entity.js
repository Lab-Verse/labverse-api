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
exports.TimeEntry = void 0;
const typeorm_1 = require("typeorm");
const projects_entity_1 = require("../../projects/entities/projects.entity");
const employee_entity_1 = require("../../../hr/employees/entities/employee.entity");
const task_entity_1 = require("../../tasks/entities/task.entity");
let TimeEntry = class TimeEntry {
};
exports.TimeEntry = TimeEntry;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TimeEntry.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'project_id', type: 'uuid' }),
    __metadata("design:type", String)
], TimeEntry.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_id', type: 'uuid' }),
    __metadata("design:type", String)
], TimeEntry.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'task_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], TimeEntry.prototype, "taskId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'hours_worked', type: 'decimal', precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], TimeEntry.prototype, "hoursWorked", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'work_date', type: 'date' }),
    __metadata("design:type", Date)
], TimeEntry.prototype, "workDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], TimeEntry.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], TimeEntry.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], TimeEntry.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => projects_entity_1.Project),
    (0, typeorm_1.JoinColumn)({ name: 'project_id' }),
    __metadata("design:type", projects_entity_1.Project)
], TimeEntry.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.EmployeeProfile),
    (0, typeorm_1.JoinColumn)({ name: 'employee_id' }),
    __metadata("design:type", employee_entity_1.EmployeeProfile)
], TimeEntry.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => task_entity_1.Task),
    (0, typeorm_1.JoinColumn)({ name: 'task_id' }),
    __metadata("design:type", task_entity_1.Task)
], TimeEntry.prototype, "task", void 0);
exports.TimeEntry = TimeEntry = __decorate([
    (0, typeorm_1.Entity)('time_entries')
], TimeEntry);
//# sourceMappingURL=time-entry.entity.js.map