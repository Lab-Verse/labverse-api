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
var TechnologiesController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechnologiesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const technology_service_1 = require("./technology.service");
const create_technology_dto_1 = require("./dto/create-technology.dto");
const update_technology_dto_1 = require("./dto/update-technology.dto");
const roles_guard_1 = require("../../common/guards/roles.guard");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const role_enum_1 = require("../roles/role.enum");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
let TechnologiesController = TechnologiesController_1 = class TechnologiesController {
    constructor(technologiesService) {
        this.technologiesService = technologiesService;
        this.logger = new common_1.Logger(TechnologiesController_1.name);
    }
    async create(body, logo) {
        try {
            const createTechnologyDto = (0, class_transformer_1.plainToClass)(create_technology_dto_1.CreateTechnologyDto, body);
            const errors = await (0, class_validator_1.validate)(createTechnologyDto);
            if (errors.length > 0) {
                const messages = errors.flatMap((error) => Object.values(error.constraints));
                throw new common_1.BadRequestException(messages);
            }
            return await this.technologiesService.create(createTechnologyDto, logo);
        }
        catch (error) {
            this.logger.error(`Failed to create technology: ${error.message}`);
            throw error;
        }
    }
    findAll() {
        return this.technologiesService.findAll();
    }
    findOne(id) {
        return this.technologiesService.findOne(id);
    }
    async update(id, body, logo) {
        try {
            const updateTechnologyDto = (0, class_transformer_1.plainToClass)(update_technology_dto_1.UpdateTechnologyDto, body);
            const errors = await (0, class_validator_1.validate)(updateTechnologyDto);
            if (errors.length > 0) {
                const messages = errors.flatMap((error) => Object.values(error.constraints));
                throw new common_1.BadRequestException(messages);
            }
            return await this.technologiesService.update(id, updateTechnologyDto, logo);
        }
        catch (error) {
            this.logger.error(`Failed to update technology ${id}: ${error.message}`);
            throw error;
        }
    }
    remove(id) {
        return this.technologiesService.remove(id);
    }
};
exports.TechnologiesController = TechnologiesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new technology with optional logo upload',
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.DEVELOPER, role_enum_1.RoleEnum.PROJECT_MANAGER),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('logo')),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string', example: 'NestJS' },
                description: {
                    type: 'string',
                    example: 'A progressive Node.js framework',
                },
                category: { type: 'string', example: 'Backend Framework' },
                logo: { type: 'string', format: 'binary' },
            },
            required: ['name'],
        },
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 }),
            new common_1.FileTypeValidator({
                fileType: /^image\/(jpeg|png|webp|gif|svg\+xml)$/,
            }),
        ],
        fileIsRequired: false,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TechnologiesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all technologies' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TechnologiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a technology by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TechnologiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a technology with optional logo upload' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.DEVELOPER, role_enum_1.RoleEnum.PROJECT_MANAGER),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('logo')),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string', example: 'NestJS Updated' },
                description: { type: 'string', example: 'Updated description' },
                category: { type: 'string', example: 'Backend Framework Updated' },
                logo: { type: 'string', format: 'binary' },
            },
            required: [],
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 }),
            new common_1.FileTypeValidator({
                fileType: /^image\/(jpeg|png|webp|gif|svg\+xml)$/,
            }),
        ],
        fileIsRequired: false,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], TechnologiesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a technology' }),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TechnologiesController.prototype, "remove", null);
exports.TechnologiesController = TechnologiesController = TechnologiesController_1 = __decorate([
    (0, swagger_1.ApiTags)('Technologies'),
    (0, common_1.Controller)('technologies'),
    __metadata("design:paramtypes", [technology_service_1.TechnologiesService])
], TechnologiesController);
//# sourceMappingURL=technology.controller.js.map