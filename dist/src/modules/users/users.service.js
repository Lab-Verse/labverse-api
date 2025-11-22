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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const role_entity_1 = require("../roles/entities/role.entity");
const permission_entity_1 = require("../permissions/entities/permission.entity");
const user_permission_entity_1 = require("./entities/user-permission.entity");
const assign_permissions_dto_1 = require("./dto/assign-permissions.dto");
const security_util_1 = require("../../common/utils/security.util");
const bcrypt = require("bcryptjs");
let UsersService = class UsersService {
    constructor(userRepository, roleRepository, permissionRepository, userPermissionRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
        this.userPermissionRepository = userPermissionRepository;
    }
    async create(dto) {
        try {
            security_util_1.SecurityUtil.validateObject(dto);
            const existingUser = await this.userRepository.findOne({
                where: { email: dto.email },
            });
            if (existingUser) {
                throw new common_1.ConflictException('A user with this email address already exists');
            }
            let role;
            if (dto.roleId) {
                const validRoleId = security_util_1.SecurityUtil.validateId(dto.roleId);
                role = await this.roleRepository.findOne({
                    where: { id: validRoleId },
                });
                if (!role) {
                    throw new common_1.NotFoundException('Specified role not found');
                }
            }
            const hashedPassword = await bcrypt.hash(dto.password, 10);
            const user = this.userRepository.create({
                ...dto,
                password: hashedPassword,
                role,
            });
            const savedUser = await this.userRepository.save(user);
            return {
                success: true,
                message: 'User created successfully',
                data: savedUser,
            };
        }
        catch (error) {
            if (error instanceof common_1.ConflictException ||
                error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new Error(`Failed to create user: ${error.message}`);
        }
    }
    async findByEmail(email, options) {
        try {
            const queryBuilder = this.userRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.role', 'role')
                .where('user.email = :email', { email: email.toLowerCase().trim() });
            if (options?.includePassword) {
                queryBuilder.addSelect('user.password');
            }
            const user = await queryBuilder.getOne();
            return user || null;
        }
        catch (error) {
            throw new Error(`Failed to find user by email: ${error.message}`);
        }
    }
    async updatePassword(userId, hashedPassword) {
        try {
            const validUserId = security_util_1.SecurityUtil.validateId(userId);
            const result = await this.userRepository.update({ id: validUserId }, { password: hashedPassword });
            if (result.affected === 0) {
                throw new common_1.NotFoundException('User not found');
            }
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new Error(`Failed to update password: ${error.message}`);
        }
    }
    async createWithPermissions(dto) {
        try {
            security_util_1.SecurityUtil.validateObject(dto);
            const existingUser = await this.userRepository.findOne({
                where: { email: dto.email },
            });
            if (existingUser) {
                throw new common_1.ConflictException('A user with this email address already exists');
            }
            let role;
            if (dto.roleId) {
                const validRoleId = security_util_1.SecurityUtil.validateId(dto.roleId);
                role = await this.roleRepository.findOne({
                    where: { id: validRoleId },
                });
                if (!role) {
                    throw new common_1.NotFoundException('Specified role not found');
                }
            }
            const hashedPassword = await bcrypt.hash(dto.password, 10);
            const user = this.userRepository.create({
                email: dto.email,
                password: hashedPassword,
                fullName: dto.fullName,
                role,
            });
            const savedUser = await this.userRepository.save(user);
            if (dto.permissionIds && dto.permissionIds.length > 0) {
                const permissions = await this.permissionRepository.findByIds(dto.permissionIds);
                if (permissions.length !== dto.permissionIds.length) {
                    const foundIds = permissions.map((p) => p.id);
                    const missingIds = dto.permissionIds.filter((id) => !foundIds.includes(id));
                    throw new common_1.BadRequestException(`The following permission IDs do not exist: ${missingIds.join(', ')}.`);
                }
                const userPermissionsToCreate = permissions.map((permission) => this.userPermissionRepository.create({
                    user: savedUser,
                    permission,
                }));
                await this.userPermissionRepository.save(userPermissionsToCreate);
            }
            const userWithRelations = await this.findOneWithPermissions(savedUser.id);
            return {
                success: true,
                message: 'User created with permissions successfully',
                data: userWithRelations,
            };
        }
        catch (error) {
            if (error instanceof common_1.ConflictException ||
                error instanceof common_1.NotFoundException ||
                error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new Error(`Failed to create user with permissions: ${error.message}`);
        }
    }
    async assignPermissions(userId, dto) {
        try {
            const validUserId = security_util_1.SecurityUtil.validateId(userId);
            security_util_1.SecurityUtil.validateObject(dto);
            const user = await this.userRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.role', 'role')
                .leftJoinAndSelect('role.permissions', 'rolePermissions')
                .where('user.id = :id', { id: validUserId })
                .getOne();
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            const permissionNames = dto.actions.map((action) => `${dto.feature.toLowerCase()}.${action}`);
            const permissions = await this.userRepository.manager.query(`SELECT id, name FROM permissions WHERE name = ANY($1)`, [permissionNames]);
            if (permissions.length !== permissionNames.length) {
                const foundNames = permissions.map((p) => p.name);
                const missingNames = permissionNames.filter((name) => !foundNames.includes(name));
                throw new common_1.BadRequestException(`The following permissions do not exist: ${missingNames.join(', ')}.`);
            }
            const permissionIds = permissions.map((p) => p.id);
            if (dto.assignmentAction === assign_permissions_dto_1.AssignmentActionEnum.ADD) {
                const rolePermissionNames = user.role?.permissions?.map((p) => p.name) || [];
                const redundantPermissions = permissionNames.filter((name) => rolePermissionNames.includes(name));
                if (redundantPermissions.length > 0) {
                    throw new common_1.BadRequestException(`Cannot add permissions ${redundantPermissions.join(', ')} as they are already granted through the user's role: ${user.role.name}.`);
                }
            }
            switch (dto.assignmentAction) {
                case assign_permissions_dto_1.AssignmentActionEnum.ADD:
                    await this.addUserPermissions(validUserId, permissionIds);
                    break;
                case assign_permissions_dto_1.AssignmentActionEnum.REMOVE:
                    await this.removeUserPermissions(validUserId, permissionIds);
                    break;
                case assign_permissions_dto_1.AssignmentActionEnum.REPLACE:
                    await this.replaceUserFeaturePermissions(validUserId, dto.feature, permissionIds);
                    break;
                default:
                    await this.addUserPermissions(validUserId, permissionIds);
            }
            const updatedUser = await this.findOneWithPermissions(validUserId);
            return {
                success: true,
                message: `Permissions for ${dto.feature} ${dto.assignmentAction || 'assigned'} successfully`,
                data: updatedUser,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new Error(`Failed to assign permissions: ${error.message}`);
        }
    }
    async addUserPermissions(userId, permissionIds) {
        for (const permissionId of permissionIds) {
            await this.userRepository.manager.query(`INSERT INTO user_permissions (user_id, permission_id, created_at)
         VALUES ($1, $2, NOW())
         ON CONFLICT (user_id, permission_id) DO NOTHING`, [userId, permissionId]);
        }
    }
    async removeUserPermissions(userId, permissionIds) {
        if (permissionIds.length === 0)
            return;
        await this.userRepository.manager.query(`DELETE FROM user_permissions
       WHERE user_id = $1 AND permission_id = ANY($2)`, [userId, permissionIds]);
    }
    async replaceUserFeaturePermissions(userId, feature, newPermissionIds) {
        await this.userRepository.manager.transaction(async (transactionManager) => {
            await transactionManager.query(`DELETE FROM user_permissions up
           WHERE up.user_id = $1
           AND up.permission_id IN (
             SELECT p.id FROM permissions p
             WHERE p.resource = $2
           )`, [userId, feature]);
            for (const permissionId of newPermissionIds) {
                await transactionManager.query(`INSERT INTO user_permissions (user_id, permission_id, created_at)
             VALUES ($1, $2, NOW())`, [userId, permissionId]);
            }
        });
    }
    async getAvailableActionsForFeature(feature) {
        try {
            const actions = await this.userRepository.manager.query(`SELECT DISTINCT action FROM permissions WHERE resource = $1 ORDER BY action`, [feature]);
            return actions.map((row) => row.action);
        }
        catch (error) {
            throw new Error(`Failed to get available actions for feature ${feature}: ${error.message}`);
        }
    }
    async getAvailableFeatures() {
        try {
            const features = await this.userRepository.manager.query(`
        SELECT
          resource as feature,
          array_agg(DISTINCT action ORDER BY action) as actions,
          count(*) as permission_count
        FROM permissions
        GROUP BY resource
        ORDER BY resource
      `);
            const result = features.map((row) => ({
                feature: row.feature,
                actions: row.actions,
                permissionCount: parseInt(row.permission_count),
            }));
            return {
                success: true,
                message: 'Available features retrieved successfully',
                data: result,
            };
        }
        catch (error) {
            throw new Error(`Failed to get available features: ${error.message}`);
        }
    }
    async findOneWithPermissions(id) {
        try {
            const validId = security_util_1.SecurityUtil.validateId(id);
            const user = await this.userRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.role', 'role')
                .where('user.id = :id', { id: validId })
                .getOne();
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            let allPermissions = [];
            if (user.role?.id) {
                const rolePermissions = await this.userRepository.manager.query(`
          SELECT DISTINCT
            p.id,
            p.name,
            p.description,
            p.resource,
            p.action,
            p.created_at,
            p.updated_at,
            'role' as source
          FROM permissions p
          INNER JOIN role_permissions rp ON p.id = rp.permission_id
          WHERE rp.role_id = $1
          ORDER BY p.resource, p.action
          `, [user.role.id]);
                const userPermissions = await this.userRepository.manager.query(`
          SELECT DISTINCT
            p.id,
            p.name,
            p.description,
            p.resource,
            p.action,
            p.created_at,
            p.updated_at,
            'direct' as source
          FROM permissions p
          INNER JOIN user_permissions up ON p.id = up.permission_id
          WHERE up.user_id = $1
          ORDER BY p.resource, p.action
          `, [validId]);
                const permissionMap = new Map();
                rolePermissions.forEach((perm) => {
                    permissionMap.set(perm.id, perm);
                });
                userPermissions.forEach((perm) => {
                    if (!permissionMap.has(perm.id)) {
                        permissionMap.set(perm.id, perm);
                    }
                });
                allPermissions = Array.from(permissionMap.values()).sort((a, b) => `${a.resource}_${a.action}`.localeCompare(`${b.resource}_${b.action}`));
            }
            else {
                allPermissions = await this.userRepository.manager.query(`
          SELECT DISTINCT
            p.id,
            p.name,
            p.description,
            p.resource,
            p.action,
            p.created_at,
            p.updated_at,
            'direct' as source
          FROM permissions p
          INNER JOIN user_permissions up ON p.id = up.permission_id
          WHERE up.user_id = $1
          ORDER BY p.resource, p.action
          `, [validId]);
            }
            user.permissions = allPermissions || [];
            return user;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error('Error in findOneWithPermissions:', error);
            throw new Error(`Failed to find user with permissions: ${error.message}`);
        }
    }
    async findById(id) {
        try {
            const validId = security_util_1.SecurityUtil.validateId(id);
            const user = await this.userRepository.findOne({
                where: { id: validId },
                relations: ['role'],
            });
            return user || null;
        }
        catch (error) {
            throw new Error(`Failed to find user by ID: ${error.message}`);
        }
    }
    async getUserPermissions(userId) {
        try {
            const validUserId = security_util_1.SecurityUtil.validateId(userId);
            const user = await this.userRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.role', 'role')
                .where('user.id = :id', { id: validUserId })
                .getOne();
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            const allPermissions = new Map();
            if (user.role?.id) {
                const rolePermissions = await this.permissionRepository
                    .createQueryBuilder('permission')
                    .innerJoin('permission.rolePermissions', 'rp')
                    .where('rp.roleId = :roleId', { roleId: user.role.id })
                    .getMany();
                rolePermissions.forEach((permission) => {
                    allPermissions.set(permission.id, permission);
                });
            }
            const userPermissions = await this.permissionRepository
                .createQueryBuilder('permission')
                .innerJoin('permission.userPermissions', 'up')
                .where('up.userId = :userId', { userId: validUserId })
                .getMany();
            userPermissions.forEach((permission) => {
                allPermissions.set(permission.id, permission);
            });
            const permissions = Array.from(allPermissions.values()).sort((a, b) => `${a.resource}_${a.action}`.localeCompare(`${b.resource}_${b.action}`));
            return {
                success: true,
                message: 'User permissions retrieved successfully',
                data: permissions,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new Error(`Failed to retrieve user permissions: ${error.message}`);
        }
    }
    async findAll() {
        try {
            const users = await this.userRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.role', 'role')
                .select([
                'user.id',
                'user.email',
                'user.fullName',
                'user.createdAt',
                'user.updatedAt',
                'role.id',
                'role.name',
            ])
                .orderBy('user.createdAt', 'DESC')
                .getMany();
            return {
                success: true,
                message: 'Users retrieved successfully',
                data: users,
            };
        }
        catch (error) {
            throw new Error(`Failed to retrieve users: ${error.message}`);
        }
    }
    async findOne(id) {
        const user = await this.findOneWithPermissions(id);
        return {
            success: true,
            message: 'User retrieved successfully',
            data: user,
        };
    }
    async update(id, dto) {
        try {
            const validId = security_util_1.SecurityUtil.validateId(id);
            security_util_1.SecurityUtil.validateObject(dto);
            const user = await this.userRepository.findOne({
                where: { id: validId },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            if (dto.email && dto.email !== user.email) {
                const existingUser = await this.userRepository.findOne({
                    where: { email: dto.email },
                });
                if (existingUser) {
                    throw new common_1.ConflictException('Email already exists');
                }
            }
            let role;
            if (dto.roleId) {
                const validRoleId = security_util_1.SecurityUtil.validateId(dto.roleId);
                role = await this.roleRepository.findOne({
                    where: { id: validRoleId },
                });
                if (!role) {
                    throw new common_1.NotFoundException('Role not found');
                }
            }
            const updateData = { ...dto };
            if (dto.password) {
                updateData.password = await bcrypt.hash(dto.password, 10);
            }
            if (role) {
                updateData.role = role;
            }
            await this.userRepository.update(validId, updateData);
            const updatedUser = await this.findOneWithPermissions(validId);
            return {
                success: true,
                message: 'User updated successfully',
                data: updatedUser,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new Error(`Failed to update user: ${error.message}`);
        }
    }
    async remove(id) {
        try {
            const validId = security_util_1.SecurityUtil.validateId(id);
            const user = await this.userRepository.findOne({
                where: { id: validId },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            await this.userRepository.remove(user);
            return {
                success: true,
                message: 'User deleted successfully',
                data: undefined,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new Error(`Failed to delete user: ${error.message}`);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __param(2, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __param(3, (0, typeorm_1.InjectRepository)(user_permission_entity_1.UserPermission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map