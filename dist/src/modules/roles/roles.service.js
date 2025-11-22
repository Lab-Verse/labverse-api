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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("./entities/role.entity");
const permission_entity_1 = require("../permissions/entities/permission.entity");
const role_permission_entity_1 = require("../role-permissions/entities/role-permission.entity");
const security_util_1 = require("../../common/utils/security.util");
let RolesService = class RolesService {
    constructor(roleRepository, permissionRepository, rolePermissionRepository) {
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
        this.rolePermissionRepository = rolePermissionRepository;
    }
    async create(dto) {
        try {
            security_util_1.SecurityUtil.validateObject(dto);
            const existingRole = await this.roleRepository.findOne({
                where: { name: dto.name },
            });
            if (existingRole) {
                throw new common_1.ConflictException('Role with this name already exists');
            }
            const role = this.roleRepository.create(dto);
            const savedRole = await this.roleRepository.save(role);
            return {
                success: true,
                message: 'Role created successfully',
                data: savedRole,
            };
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new Error(`Failed to create role: ${error.message}`);
        }
    }
    async findOneWithPermissions(id) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        const role = await this.roleRepository
            .createQueryBuilder('role')
            .leftJoinAndSelect('role.permissions', 'permissions')
            .where('role.id = :id', { id: validId })
            .getOne();
        if (!role) {
            throw new common_1.NotFoundException('Role not found');
        }
        return role;
    }
    async findAll() {
        try {
            const roles = await this.roleRepository.find({
                order: { name: 'ASC' },
            });
            return {
                success: true,
                message: 'Roles retrieved successfully',
                data: roles,
            };
        }
        catch (error) {
            throw new Error(`Failed to retrieve roles: ${error.message}`);
        }
    }
    async findOne(id) {
        const role = await this.findOneWithPermissions(id);
        return {
            success: true,
            message: 'Role retrieved successfully',
            data: role,
        };
    }
    async update(id, dto) {
        try {
            const validId = security_util_1.SecurityUtil.validateId(id);
            security_util_1.SecurityUtil.validateObject(dto);
            const role = await this.roleRepository.findOne({
                where: { id: validId },
            });
            if (!role) {
                throw new common_1.NotFoundException('Role not found');
            }
            if (dto.name && dto.name !== role.name) {
                const existingRole = await this.roleRepository.findOne({
                    where: { name: dto.name },
                });
                if (existingRole) {
                    throw new common_1.ConflictException('Role name already exists');
                }
            }
            await this.roleRepository.update(validId, dto);
            const updatedRole = await this.findOneWithPermissions(validId);
            return {
                success: true,
                message: 'Role updated successfully',
                data: updatedRole,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new Error(`Failed to update role: ${error.message}`);
        }
    }
    async remove(id) {
        try {
            const validId = security_util_1.SecurityUtil.validateId(id);
            const role = await this.roleRepository.findOne({
                where: { id: validId },
                relations: ['users'],
            });
            if (!role) {
                throw new common_1.NotFoundException('Role not found');
            }
            if (role.users && role.users.length > 0) {
                throw new common_1.ConflictException('Cannot delete role that has assigned users');
            }
            await this.roleRepository.remove(role);
            return {
                success: true,
                message: 'Role deleted successfully',
                data: undefined,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new Error(`Failed to delete role: ${error.message}`);
        }
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __param(1, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __param(2, (0, typeorm_1.InjectRepository)(role_permission_entity_1.RolePermission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RolesService);
//# sourceMappingURL=roles.service.js.map