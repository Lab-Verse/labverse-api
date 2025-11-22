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
exports.TechnologiesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const technology_entity_1 = require("./entities/technology.entity");
const security_util_1 = require("../../common/utils/security.util");
const supabase_service_1 = require("../../common/services/supabase.service");
let TechnologiesService = class TechnologiesService {
    constructor(technologyRepository, supabaseService) {
        this.technologyRepository = technologyRepository;
        this.supabaseService = supabaseService;
    }
    async create(createTechnologyDto, logoFile) {
        security_util_1.SecurityUtil.validateObject(createTechnologyDto);
        const { name } = createTechnologyDto;
        const sanitizedName = security_util_1.SecurityUtil.sanitizeString(name);
        const existingTechnology = await this.technologyRepository.findOne({
            where: { name: sanitizedName },
        });
        if (existingTechnology) {
            throw new common_1.ConflictException(`Technology with name "${name}" already exists.`);
        }
        let logoUrl;
        if (logoFile) {
            logoUrl = await this.supabaseService.uploadImage(logoFile, 'technologies');
        }
        try {
            const technology = this.technologyRepository.create({
                ...createTechnologyDto,
                logo: logoUrl,
            });
            return await this.technologyRepository.save(technology);
        }
        catch (error) {
            if (logoUrl) {
                await this.supabaseService.deleteImage(logoUrl);
            }
            throw error;
        }
    }
    async findAll() {
        return this.technologyRepository.find();
    }
    async findOne(id) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        const technology = await this.technologyRepository.findOne({
            where: { id: validId },
        });
        if (!technology) {
            throw new common_1.NotFoundException(`Technology with ID "${id}" not found.`);
        }
        return technology;
    }
    async update(id, updateTechnologyDto, logoFile) {
        security_util_1.SecurityUtil.validateObject(updateTechnologyDto);
        const technology = await this.findOne(id);
        if (updateTechnologyDto.name &&
            updateTechnologyDto.name !== technology.name) {
            const sanitizedName = security_util_1.SecurityUtil.sanitizeString(updateTechnologyDto.name);
            const existingTechnology = await this.technologyRepository.findOne({
                where: { name: sanitizedName },
            });
            if (existingTechnology && existingTechnology.id !== id) {
                throw new common_1.ConflictException(`Technology with name "${updateTechnologyDto.name}" already exists.`);
            }
        }
        let logoUrl;
        let oldLogoUrl;
        if (logoFile) {
            oldLogoUrl = technology.logo;
            logoUrl = await this.supabaseService.uploadImage(logoFile, 'technologies');
        }
        try {
            Object.assign(technology, {
                ...updateTechnologyDto,
                logo: logoUrl ?? technology.logo,
            });
            const savedTechnology = await this.technologyRepository.save(technology);
            if (oldLogoUrl && logoUrl) {
                await this.supabaseService.deleteImage(oldLogoUrl);
            }
            return savedTechnology;
        }
        catch (error) {
            if (logoUrl) {
                await this.supabaseService.deleteImage(logoUrl);
            }
            throw error;
        }
    }
    async remove(id) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        const result = await this.technologyRepository.delete(validId);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Technology with ID "${id}" not found.`);
        }
    }
};
exports.TechnologiesService = TechnologiesService;
exports.TechnologiesService = TechnologiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(technology_entity_1.Technology)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        supabase_service_1.SupabaseService])
], TechnologiesService);
//# sourceMappingURL=technology.service.js.map