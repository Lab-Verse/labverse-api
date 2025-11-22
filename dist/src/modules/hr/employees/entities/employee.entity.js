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
exports.EmployeeProfile = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../../users/entities/user.entity");
const employee_status_enum_1 = require("../dto/employee-status.enum");
const uuid_1 = require("uuid");
let EmployeeProfile = class EmployeeProfile {
    generateEmployeeCode() {
        this.employeeCode = `EMP-${(0, uuid_1.v4)()}`;
    }
};
exports.EmployeeProfile = EmployeeProfile;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EmployeeProfile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', unique: true }),
    __metadata("design:type", String)
], EmployeeProfile.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], EmployeeProfile.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_code', unique: true, length: 100 }),
    __metadata("design:type", String)
], EmployeeProfile.prototype, "employeeCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'hire_date', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], EmployeeProfile.prototype, "hireDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'job_title', length: 255, nullable: true }),
    __metadata("design:type", String)
], EmployeeProfile.prototype, "jobTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], EmployeeProfile.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'profile_image', length: 2048, nullable: true }),
    __metadata("design:type", String)
], EmployeeProfile.prototype, "profileImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, default: employee_status_enum_1.EmployeeStatus.ACTIVE }),
    __metadata("design:type", String)
], EmployeeProfile.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], EmployeeProfile.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], EmployeeProfile.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EmployeeProfile.prototype, "generateEmployeeCode", null);
exports.EmployeeProfile = EmployeeProfile = __decorate([
    (0, typeorm_1.Entity)({ name: 'employee_profiles' })
], EmployeeProfile);
//# sourceMappingURL=employee.entity.js.map