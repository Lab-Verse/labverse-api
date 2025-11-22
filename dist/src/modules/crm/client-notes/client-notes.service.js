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
exports.ClientNotesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const client_note_entity_1 = require("./entities/client-note.entity");
const security_util_1 = require("../../../common/utils/security.util");
let ClientNotesService = class ClientNotesService {
    constructor(clientNoteRepository) {
        this.clientNoteRepository = clientNoteRepository;
    }
    async create(createClientNoteDto) {
        security_util_1.SecurityUtil.validateObject(createClientNoteDto);
        const clientNote = this.clientNoteRepository.create(createClientNoteDto);
        return this.clientNoteRepository.save(clientNote);
    }
    async findAll() {
        return this.clientNoteRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
    async findByClient(clientId) {
        const validClientId = security_util_1.SecurityUtil.validateId(clientId);
        return this.clientNoteRepository.find({
            where: { clientId: validClientId },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        const clientNote = await this.clientNoteRepository.findOne({
            where: { id: validId },
        });
        if (!clientNote) {
            throw new common_1.NotFoundException(`Client note with ID ${id} not found`);
        }
        return clientNote;
    }
    async update(id, updateClientNoteDto) {
        security_util_1.SecurityUtil.validateObject(updateClientNoteDto);
        const clientNote = await this.findOne(id);
        Object.assign(clientNote, updateClientNoteDto);
        return this.clientNoteRepository.save(clientNote);
    }
    async remove(id) {
        const clientNote = await this.findOne(id);
        await this.clientNoteRepository.remove(clientNote);
    }
};
exports.ClientNotesService = ClientNotesService;
exports.ClientNotesService = ClientNotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(client_note_entity_1.ClientNote)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClientNotesService);
//# sourceMappingURL=client-notes.service.js.map