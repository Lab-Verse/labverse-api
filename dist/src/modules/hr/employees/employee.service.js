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
exports.EmployeeProfilesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const employee_entity_1 = require("./entities/employee.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const logger_util_1 = require("../../../common/utils/logger.util");
const supabase_service_1 = require("../../../common/services/supabase.service");
let EmployeeProfilesService = class EmployeeProfilesService {
    constructor(employeeProfileRepository, userRepository, supabaseService) {
        this.employeeProfileRepository = employeeProfileRepository;
        this.userRepository = userRepository;
        this.supabaseService = supabaseService;
    }
    async create(createEmployeeProfileDto, file) {
        try {
            const { userId } = createEmployeeProfileDto;
            const user = await this.userRepository.findOne({
                where: { id: userId },
                relations: ['role'],
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found for the provided userId');
            }
            if (!user.role || user.role.name.toLowerCase() !== 'employee') {
                throw new common_1.ForbiddenException('User is not an employee. Only users with employee role can have employee profiles.');
            }
            const existingProfileByUser = await this.employeeProfileRepository.findOne({
                where: { userId },
            });
            if (existingProfileByUser) {
                throw new common_1.ConflictException('Employee profile already exists for this user');
            }
            const employeeProfile = this.employeeProfileRepository.create(createEmployeeProfileDto);
            let imageUrl;
            if (file) {
                imageUrl = await this.supabaseService.uploadImage(file, 'employee-profiles');
            }
            try {
                employeeProfile.profileImage = imageUrl;
                const savedProfile = await this.employeeProfileRepository.save(employeeProfile);
                logger_util_1.SafeLogger.log(`Employee profile created for user ${userId}`, 'EmployeeProfilesService');
                return {
                    success: true,
                    message: 'Employee profile created successfully',
                    data: savedProfile,
                    statusCode: common_1.HttpStatus.CREATED,
                };
            }
            catch (error) {
                if (imageUrl) {
                    await this.supabaseService.deleteImage(imageUrl);
                }
                throw error;
            }
        }
        catch (error) {
            this.handleServiceError(error, 'Failed to create employee profile');
        }
    }
    async findAll() {
        try {
            const profiles = await this.employeeProfileRepository.find({
                relations: ['user'],
            });
            logger_util_1.SafeLogger.log(`Retrieved ${profiles.length} employee profiles`, 'EmployeeProfilesService');
            return {
                success: true,
                message: 'Employee profiles retrieved successfully',
                data: profiles,
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            this.handleServiceError(error, 'Failed to retrieve employee profiles');
        }
    }
    async findOne(id) {
        try {
            const employeeProfile = await this.employeeProfileRepository.findOne({
                where: { id },
                relations: ['user'],
            });
            if (!employeeProfile) {
                logger_util_1.SafeLogger.warn(`Attempted to find non-existent employee profile: ${id}`, 'EmployeeProfilesService');
                throw new common_1.NotFoundException(`Employee profile with ID "${id}" not found`);
            }
            return {
                success: true,
                message: 'Employee profile retrieved successfully',
                data: employeeProfile,
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            this.handleServiceError(error, `Failed to retrieve employee profile ${id}`);
        }
    }
    async update(id, updateEmployeeProfileDto) {
        try {
            const employeeProfile = await this.employeeProfileRepository.findOne({
                where: { id },
                relations: ['user'],
            });
            if (!employeeProfile) {
                throw new common_1.NotFoundException(`Employee profile with ID "${id}" not found`);
            }
            if (updateEmployeeProfileDto.userId &&
                updateEmployeeProfileDto.userId !== employeeProfile.userId) {
                const newUser = await this.userRepository.findOne({
                    where: { id: updateEmployeeProfileDto.userId },
                });
                if (!newUser) {
                    throw new common_1.NotFoundException('New user not found for the provided userId');
                }
                const existingProfileForNewUser = await this.employeeProfileRepository.findOne({
                    where: { userId: updateEmployeeProfileDto.userId },
                });
                if (existingProfileForNewUser && existingProfileForNewUser.id !== id) {
                    throw new common_1.ConflictException('Employee profile already exists for the new user');
                }
            }
            Object.assign(employeeProfile, updateEmployeeProfileDto);
            const updatedProfile = await this.employeeProfileRepository.save(employeeProfile);
            logger_util_1.SafeLogger.log(`Employee profile updated: ${id}`, 'EmployeeProfilesService');
            return {
                success: true,
                message: 'Employee profile updated successfully',
                data: updatedProfile,
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            this.handleServiceError(error, `Failed to update employee profile ${id}`);
        }
    }
    async remove(id) {
        try {
            const profile = await this.employeeProfileRepository.findOne({
                where: { id },
            });
            if (!profile) {
                throw new common_1.NotFoundException(`Employee profile with ID "${id}" not found`);
            }
            if (profile.profileImage) {
                await this.supabaseService.deleteImage(profile.profileImage);
            }
            const result = await this.employeeProfileRepository.delete(id);
            if (result.affected === 0) {
                throw new common_1.NotFoundException(`Employee profile with ID "${id}" not found`);
            }
            logger_util_1.SafeLogger.log(`Employee profile deleted: ${id}`, 'EmployeeProfilesService');
            return {
                success: true,
                message: 'Employee profile deleted successfully',
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            this.handleServiceError(error, `Failed to delete employee profile ${id}`);
        }
    }
    async uploadProfileImage(id, file) {
        try {
            if (!file) {
                throw new common_1.NotFoundException('Image file is required');
            }
            const employeeProfile = await this.employeeProfileRepository.findOne({
                where: { id },
            });
            if (!employeeProfile) {
                throw new common_1.NotFoundException(`Employee profile with ID "${id}" not found`);
            }
            if (employeeProfile.profileImage) {
                await this.supabaseService.deleteImage(employeeProfile.profileImage);
            }
            const folderName = 'employee-profiles';
            const imageUrl = await this.supabaseService.uploadImage(file, folderName);
            employeeProfile.profileImage = imageUrl;
            const updatedProfile = await this.employeeProfileRepository.save(employeeProfile);
            return {
                success: true,
                message: 'Profile image uploaded successfully',
                data: updatedProfile,
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            this.handleServiceError(error, 'Failed to upload profile image');
        }
    }
    handleServiceError(error, context) {
        logger_util_1.SafeLogger.error(`${context}: ${error.message}`, 'EmployeeProfilesService', error.stack);
        if (error instanceof common_1.HttpException) {
            throw error;
        }
        throw new common_1.InternalServerErrorException(`${context}. Please try again later.`);
    }
};
exports.EmployeeProfilesService = EmployeeProfilesService;
exports.EmployeeProfilesService = EmployeeProfilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_entity_1.EmployeeProfile)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        supabase_service_1.SupabaseService])
], EmployeeProfilesService);
//# sourceMappingURL=employee.service.js.map