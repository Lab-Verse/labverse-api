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
exports.ClientInteractionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const client_interaction_entity_1 = require("./entities/client-interaction.entity");
const security_util_1 = require("../../../common/utils/security.util");
let ClientInteractionsService = class ClientInteractionsService {
    constructor(clientInteractionRepository) {
        this.clientInteractionRepository = clientInteractionRepository;
    }
    async create(createClientInteractionDto) {
        security_util_1.SecurityUtil.validateObject(createClientInteractionDto);
        const clientInteraction = this.clientInteractionRepository.create(createClientInteractionDto);
        return this.clientInteractionRepository.save(clientInteraction);
    }
    async findAll() {
        return this.clientInteractionRepository.find({
            order: { interactionDate: 'DESC' },
        });
    }
    async findByClient(clientId) {
        const validClientId = security_util_1.SecurityUtil.validateId(clientId);
        return this.clientInteractionRepository.find({
            where: { clientId: validClientId },
            order: { interactionDate: 'DESC' },
        });
    }
    async findOne(id) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        const clientInteraction = await this.clientInteractionRepository.findOne({
            where: { id: validId },
        });
        if (!clientInteraction) {
            throw new common_1.NotFoundException(`Client interaction with ID ${id} not found`);
        }
        return clientInteraction;
    }
    async update(id, updateClientInteractionDto) {
        security_util_1.SecurityUtil.validateObject(updateClientInteractionDto);
        const clientInteraction = await this.findOne(id);
        Object.assign(clientInteraction, updateClientInteractionDto);
        return this.clientInteractionRepository.save(clientInteraction);
    }
    async remove(id) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        const clientInteraction = await this.findOne(id);
        await this.clientInteractionRepository.remove(clientInteraction);
    }
};
exports.ClientInteractionsService = ClientInteractionsService;
exports.ClientInteractionsService = ClientInteractionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(client_interaction_entity_1.ClientInteraction)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClientInteractionsService);
//# sourceMappingURL=client-interactions.service.js.map