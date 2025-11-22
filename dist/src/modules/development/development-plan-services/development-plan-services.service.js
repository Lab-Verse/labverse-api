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
exports.DevelopmentPlanServicesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const development_plan_service_entity_1 = require("./entities/development-plan-service.entity");
const security_util_1 = require("../../../common/utils/security.util");
let DevelopmentPlanServicesService = class DevelopmentPlanServicesService {
    constructor(dpsRepository) {
        this.dpsRepository = dpsRepository;
    }
    async create(createDpsDto) {
        security_util_1.SecurityUtil.validateObject(createDpsDto);
        const dps = this.dpsRepository.create(createDpsDto);
        return this.dpsRepository.save(dps);
    }
    async findAll() {
        return this.dpsRepository.find({ relations: ['plan', 'service'] });
    }
    async findOne(id) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        const dps = await this.dpsRepository.findOne({
            where: { id: validId },
            relations: ['plan', 'service'],
        });
        if (!dps) {
            throw new common_1.NotFoundException(`Development Plan Service with ID "${id}" not found`);
        }
        return dps;
    }
    async update(id, updateDpsDto) {
        security_util_1.SecurityUtil.validateObject(updateDpsDto);
        const dps = await this.findOne(id);
        this.dpsRepository.merge(dps, updateDpsDto);
        return this.dpsRepository.save(dps);
    }
    async remove(id) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        const result = await this.dpsRepository.delete(validId);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Development Plan Service with ID "${id}" not found`);
        }
    }
};
exports.DevelopmentPlanServicesService = DevelopmentPlanServicesService;
exports.DevelopmentPlanServicesService = DevelopmentPlanServicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(development_plan_service_entity_1.DevelopmentPlanService)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DevelopmentPlanServicesService);
//# sourceMappingURL=development-plan-services.service.js.map