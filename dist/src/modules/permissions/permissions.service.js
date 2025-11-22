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
exports.PermissionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const permission_entity_1 = require("./entities/permission.entity");
const security_util_1 = require("../../common/utils/security.util");
let PermissionsService = class PermissionsService {
    constructor(permissionRepository) {
        this.permissionRepository = permissionRepository;
    }
    async create(dto) {
        try {
            security_util_1.SecurityUtil.validateObject(dto);
            const existingPermission = await this.permissionRepository.findOne({
                where: { name: dto.name },
            });
            if (existingPermission) {
                throw new common_1.ConflictException('Permission with this name already exists');
            }
            const permission = this.permissionRepository.create(dto);
            const savedPermission = await this.permissionRepository.save(permission);
            return {
                success: true,
                message: 'Permission created successfully',
                data: savedPermission,
            };
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new Error(`Failed to create permission: ${error.message}`);
        }
    }
    async findAll() {
        try {
            const permissions = await this.permissionRepository.find({
                order: { resource: 'ASC', action: 'ASC' },
            });
            return {
                success: true,
                message: 'Permissions retrieved successfully',
                data: permissions,
            };
        }
        catch (error) {
            throw new Error(`Failed to retrieve permissions: ${error.message}`);
        }
    }
    async findByResource(resource) {
        try {
            const sanitizedResource = security_util_1.SecurityUtil.sanitizeInput(resource);
            const permissions = await this.permissionRepository.find({
                where: { resource: sanitizedResource },
                order: { action: 'ASC' },
            });
            return {
                success: true,
                message: 'Permissions retrieved successfully',
                data: permissions,
            };
        }
        catch (error) {
            throw new Error(`Failed to retrieve permissions for resource: ${error.message}`);
        }
    }
    async findOne(id) {
        try {
            const validId = security_util_1.SecurityUtil.validateId(id);
            const permission = await this.permissionRepository.findOne({
                where: { id: validId },
            });
            if (!permission) {
                throw new common_1.NotFoundException('Permission not found');
            }
            return {
                success: true,
                message: 'Permission retrieved successfully',
                data: permission,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new Error(`Failed to retrieve permission: ${error.message}`);
        }
    }
    async update(id, dto) {
        try {
            const validId = security_util_1.SecurityUtil.validateId(id);
            security_util_1.SecurityUtil.validateObject(dto);
            const permission = await this.permissionRepository.findOne({
                where: { id: validId },
            });
            if (!permission) {
                throw new common_1.NotFoundException('Permission not found');
            }
            if (dto.name && dto.name !== permission.name) {
                const existingPermission = await this.permissionRepository.findOne({
                    where: { name: dto.name },
                });
                if (existingPermission) {
                    throw new common_1.ConflictException('Permission name already exists');
                }
            }
            await this.permissionRepository.update(validId, dto);
            const updatedPermission = await this.permissionRepository.findOne({
                where: { id: validId },
            });
            return {
                success: true,
                message: 'Permission updated successfully',
                data: updatedPermission,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new Error(`Failed to update permission: ${error.message}`);
        }
    }
    async remove(id) {
        try {
            const validId = security_util_1.SecurityUtil.validateId(id);
            const permission = await this.permissionRepository.findOne({
                where: { id: validId },
            });
            if (!permission) {
                throw new common_1.NotFoundException('Permission not found');
            }
            await this.permissionRepository.remove(permission);
            return {
                success: true,
                message: 'Permission deleted successfully',
                data: undefined,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new Error(`Failed to delete permission: ${error.message}`);
        }
    }
    async getAllResources() {
        try {
            const result = await this.permissionRepository
                .createQueryBuilder('permission')
                .select('DISTINCT permission.resource', 'resource')
                .orderBy('permission.resource', 'ASC')
                .getRawMany();
            const resources = result.map((r) => r.resource);
            return {
                success: true,
                message: 'Resources retrieved successfully',
                data: resources,
            };
        }
        catch (error) {
            throw new Error(`Failed to retrieve resources: ${error.message}`);
        }
    }
    async getAllActions() {
        try {
            const result = await this.permissionRepository
                .createQueryBuilder('permission')
                .select('DISTINCT permission.action', 'action')
                .orderBy('permission.action', 'ASC')
                .getRawMany();
            const actions = result.map((r) => r.action);
            return {
                success: true,
                message: 'Actions retrieved successfully',
                data: actions,
            };
        }
        catch (error) {
            throw new Error(`Failed to retrieve actions: ${error.message}`);
        }
    }
};
exports.PermissionsService = PermissionsService;
exports.PermissionsService = PermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PermissionsService);
//# sourceMappingURL=permissions.service.js.map