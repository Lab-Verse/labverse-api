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
exports.ClientPlanQuotationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const client_plan_quotation_entity_1 = require("./entities/client-plan-quotation.entity");
let ClientPlanQuotationsService = class ClientPlanQuotationsService {
    constructor(clientPlanQuotationsRepository) {
        this.clientPlanQuotationsRepository = clientPlanQuotationsRepository;
    }
    async create(createDto) {
        const quotation = this.clientPlanQuotationsRepository.create(createDto);
        return this.clientPlanQuotationsRepository.save(quotation);
    }
    async findAll() {
        return this.clientPlanQuotationsRepository.find({
            relations: ['client', 'plan', 'createdBy'],
        });
    }
    async findOne(id) {
        const quotation = await this.clientPlanQuotationsRepository.findOne({
            where: { id },
            relations: ['client', 'plan', 'createdBy'],
        });
        if (!quotation) {
            throw new common_1.NotFoundException(`Client Plan Quotation with ID "${id}" not found`);
        }
        return quotation;
    }
    async update(id, updateDto) {
        const quotation = await this.findOne(id);
        this.clientPlanQuotationsRepository.merge(quotation, updateDto);
        return this.clientPlanQuotationsRepository.save(quotation);
    }
    async remove(id) {
        const result = await this.clientPlanQuotationsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Client Plan Quotation with ID "${id}" not found`);
        }
    }
};
exports.ClientPlanQuotationsService = ClientPlanQuotationsService;
exports.ClientPlanQuotationsService = ClientPlanQuotationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(client_plan_quotation_entity_1.ClientPlanQuotation)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClientPlanQuotationsService);
//# sourceMappingURL=client-plan-quotations.service.js.map