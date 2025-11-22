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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_permission_entity_1 = require("./entities/role-permission.entity");
const role_entity_1 = require("../roles/entities/role.entity");
const permission_entity_1 = require("../permissions/entities/permission.entity");
const security_util_1 = require("../../common/utils/security.util");
let RolePermissionsService = class RolePermissionsService {
    constructor(rolePermissionRepo, roleRepo, permissionRepo) {
        this.rolePermissionRepo = rolePermissionRepo;
        this.roleRepo = roleRepo;
        this.permissionRepo = permissionRepo;
    }
    async assignPermissions(roleId, dto) {
        const role = await this.roleRepo.findOne({ where: { id: roleId } });
        if (!role) {
            throw new common_1.NotFoundException(`Role with ID ${roleId} not found`);
        }
        const permissions = await this.permissionRepo.find({
            where: { id: (0, typeorm_2.In)(dto.permissionIds) },
        });
        if (permissions.length !== dto.permissionIds.length) {
            throw new common_1.NotFoundException(`Some permissions were not found`);
        }
        const existingPermissions = await this.rolePermissionRepo.find({
            where: { roleId },
            select: ['permissionId'],
        });
        const existingPermissionIds = new Set(existingPermissions.map((rp) => rp.permissionId));
        const permissionsToAssign = permissions.filter((permission) => !existingPermissionIds.has(permission.id));
        if (permissionsToAssign.length === 0) {
            console.log(`All provided permissions are already assigned to role ID ${roleId}. No changes made.`);
            return [];
        }
        const newRolePermissions = permissionsToAssign.map((permission) => this.rolePermissionRepo.create({
            roleId: role.id,
            permissionId: permission.id,
        }));
        return this.rolePermissionRepo.save(newRolePermissions);
    }
    async getPermissionsByRole(roleId) {
        const validRoleId = security_util_1.SecurityUtil.validateId(roleId);
        const role = await this.roleRepo
            .createQueryBuilder('role')
            .leftJoinAndSelect('role.permissions', 'permissions')
            .where('role.id = :id', { id: validRoleId })
            .getOne();
        if (!role) {
            throw new common_1.NotFoundException('Role not found');
        }
        return role.permissions;
    }
    async removePermission(roleId, permissionId) {
        const existing = await this.rolePermissionRepo.findOne({
            where: { roleId, permissionId },
        });
        if (!existing) {
            throw new common_1.NotFoundException(`Permission not assigned to this role`);
        }
        return this.rolePermissionRepo.remove(existing);
    }
};
exports.RolePermissionsService = RolePermissionsService;
exports.RolePermissionsService = RolePermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_permission_entity_1.RolePermission)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __param(2, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RolePermissionsService);
//# sourceMappingURL=role-permissions.service.js.map