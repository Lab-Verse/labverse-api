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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketReply = void 0;
const typeorm_1 = require("typeorm");
const ticket_entity_1 = require("./ticket.entity");
let TicketReply = class TicketReply {
};
exports.TicketReply = TicketReply;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TicketReply.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ticketId', type: 'uuid' }),
    __metadata("design:type", String)
], TicketReply.prototype, "ticketId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'senderId' }),
    __metadata("design:type", String)
], TicketReply.prototype, "senderId", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], TicketReply.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], TicketReply.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'isInternal', default: false }),
    __metadata("design:type", Boolean)
], TicketReply.prototype, "isInternal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'isRead', default: false }),
    __metadata("design:type", Boolean)
], TicketReply.prototype, "isRead", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'readAt', nullable: true }),
    __metadata("design:type", Date)
], TicketReply.prototype, "readAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ticket_entity_1.Ticket, (ticket) => ticket.replies),
    (0, typeorm_1.JoinColumn)({ name: 'ticketId' }),
    __metadata("design:type", ticket_entity_1.Ticket)
], TicketReply.prototype, "ticket", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'createdAt' }),
    __metadata("design:type", Date)
], TicketReply.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updatedAt' }),
    __metadata("design:type", Date)
], TicketReply.prototype, "updatedAt", void 0);
exports.TicketReply = TicketReply = __decorate([
    (0, typeorm_1.Entity)('ticket_replies')
], TicketReply);
//# sourceMappingURL=ticket-reply.entity.js.map