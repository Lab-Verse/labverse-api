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
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const clients_entity_1 = require("./entities/clients.entity");
const validation_util_1 = require("../../../common/utils/validation.util");
const logger_util_1 = require("../../../common/utils/logger.util");
const supabase_service_1 = require("../../../common/services/supabase.service");
let ClientsService = class ClientsService {
    constructor(clientsRepository, supabaseService) {
        this.clientsRepository = clientsRepository;
        this.supabaseService = supabaseService;
    }
    async create(dto, profile_photo) {
        validation_util_1.ValidationUtil.validateString(dto.name, 'name', 2, 100);
        if (dto.email)
            validation_util_1.ValidationUtil.validateEmail(dto.email);
        if (dto.phone)
            validation_util_1.ValidationUtil.validatePhone(dto.phone);
        if (dto.company)
            validation_util_1.ValidationUtil.validateString(dto.company, 'company', 2, 100);
        if (dto.address)
            validation_util_1.ValidationUtil.validateString(dto.address, 'address', 5, 255);
        if (dto.website)
            validation_util_1.ValidationUtil.validateUrl(dto.website, 'website');
        if (dto.email) {
            const existingClient = await this.clientsRepository.findOne({
                where: { email: dto.email.toLowerCase().trim() },
            });
            if (existingClient) {
                throw new common_1.ConflictException('Client with this email already exists');
            }
        }
        let profilePhotoUrl;
        if (profile_photo) {
            profilePhotoUrl = await this.supabaseService.uploadImage(profile_photo, 'clients');
        }
        try {
            const client = this.clientsRepository.create({
                ...dto,
                name: validation_util_1.ValidationUtil.sanitizeString(dto.name),
                email: dto.email
                    ? validation_util_1.ValidationUtil.sanitizeString(dto.email.toLowerCase())
                    : null,
                company: dto.company
                    ? validation_util_1.ValidationUtil.sanitizeString(dto.company)
                    : undefined,
                address: dto.address
                    ? validation_util_1.ValidationUtil.sanitizeString(dto.address)
                    : undefined,
                profilePhoto: profilePhotoUrl,
            });
            const savedClient = await this.clientsRepository.save(client);
            logger_util_1.SafeLogger.log(`Client created: ${dto.name} (${dto.email})`, 'ClientsService');
            return validation_util_1.ValidationUtil.createSuccessResponse('Client created successfully', savedClient);
        }
        catch (error) {
            if (profilePhotoUrl) {
                await this.supabaseService.deleteImage(profilePhotoUrl);
            }
            throw error;
        }
    }
    async findAll() {
        const clients = await this.clientsRepository.find({
            order: { created_at: 'DESC' },
        });
        return validation_util_1.ValidationUtil.createSuccessResponse('Clients retrieved successfully', clients);
    }
    async findOne(id) {
        validation_util_1.ValidationUtil.validateObjectId(id, 'clientId');
        const client = await this.clientsRepository.findOneBy({ id });
        if (!client) {
            throw new common_1.NotFoundException('Client not found');
        }
        return validation_util_1.ValidationUtil.createSuccessResponse('Client retrieved successfully', client);
    }
    async update(id, dto, profile_photo) {
        validation_util_1.ValidationUtil.validateObjectId(id, 'clientId');
        if (dto.name)
            validation_util_1.ValidationUtil.validateString(dto.name, 'name', 2, 100);
        if (dto.email)
            validation_util_1.ValidationUtil.validateEmail(dto.email);
        if (dto.phone)
            validation_util_1.ValidationUtil.validatePhone(dto.phone);
        if (dto.company)
            validation_util_1.ValidationUtil.validateString(dto.company, 'company', 2, 100);
        if (dto.address)
            validation_util_1.ValidationUtil.validateString(dto.address, 'address', 5, 255);
        if (dto.website)
            validation_util_1.ValidationUtil.validateUrl(dto.website, 'website');
        const client = await this.clientsRepository.findOneBy({ id });
        if (!client) {
            throw new common_1.NotFoundException('Client not found');
        }
        if (dto.email && dto.email.toLowerCase().trim() !== client.email) {
            const existingClient = await this.clientsRepository.findOne({
                where: { email: dto.email.toLowerCase().trim() },
            });
            if (existingClient) {
                throw new common_1.ConflictException('Client with this email already exists');
            }
        }
        let profilePhotoUrl;
        let oldPhotoUrl;
        if (profile_photo) {
            oldPhotoUrl = client.profilePhoto;
            profilePhotoUrl = await this.supabaseService.uploadImage(profile_photo, 'clients');
        }
        try {
            Object.assign(client, {
                ...dto,
                name: dto.name ? validation_util_1.ValidationUtil.sanitizeString(dto.name) : client.name,
                email: dto.email
                    ? validation_util_1.ValidationUtil.sanitizeString(dto.email.toLowerCase())
                    : client.email,
                company: dto.company
                    ? validation_util_1.ValidationUtil.sanitizeString(dto.company)
                    : client.company,
                address: dto.address
                    ? validation_util_1.ValidationUtil.sanitizeString(dto.address)
                    : client.address,
                profilePhoto: profilePhotoUrl ?? client.profilePhoto,
            });
            const updatedClient = await this.clientsRepository.save(client);
            if (oldPhotoUrl && profilePhotoUrl) {
                await this.supabaseService.deleteImage(oldPhotoUrl);
            }
            logger_util_1.SafeLogger.log(`Client updated: ${client.name} (ID: ${id})`, 'ClientsService');
            return validation_util_1.ValidationUtil.createSuccessResponse('Client updated successfully', updatedClient);
        }
        catch (error) {
            if (profilePhotoUrl) {
                await this.supabaseService.deleteImage(profilePhotoUrl);
            }
            throw error;
        }
    }
    async remove(id) {
        validation_util_1.ValidationUtil.validateObjectId(id, 'clientId');
        const client = await this.clientsRepository.findOneBy({ id });
        if (!client) {
            throw new common_1.NotFoundException('Client not found');
        }
        if (client.profilePhoto) {
            await this.supabaseService.deleteImage(client.profilePhoto);
        }
        await this.clientsRepository.delete(id);
        logger_util_1.SafeLogger.log(`Client deleted: ${client.name} (ID: ${id})`, 'ClientsService');
        return validation_util_1.ValidationUtil.createSuccessResponse('Client deleted successfully');
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(clients_entity_1.Client)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        supabase_service_1.SupabaseService])
], ClientsService);
//# sourceMappingURL=clients.service.js.map