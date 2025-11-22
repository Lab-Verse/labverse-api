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
exports.ClientPlanQuotation = void 0;
const typeorm_1 = require("typeorm");
const clients_entity_1 = require("../../crm/clients/entities/clients.entity");
const development_plan_entity_1 = require("../../development/development-plans/entities/development-plan.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const client_plan_quotation_status_enum_1 = require("../enums/client-plan-quotation-status.enum");
const invoice_entity_1 = require("../../billing/invoices/entities/invoice.entity");
let ClientPlanQuotation = class ClientPlanQuotation {
};
exports.ClientPlanQuotation = ClientPlanQuotation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ClientPlanQuotation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: false }),
    __metadata("design:type", String)
], ClientPlanQuotation.prototype, "client_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ClientPlanQuotation.prototype, "plan_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        nullable: false,
        default: client_plan_quotation_status_enum_1.ClientPlanQuotationStatus.DRAFT,
    }),
    __metadata("design:type", String)
], ClientPlanQuotation.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0.0 }),
    __metadata("design:type", Number)
], ClientPlanQuotation.prototype, "discount_percent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ClientPlanQuotation.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], ClientPlanQuotation.prototype, "total_amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ClientPlanQuotation.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ClientPlanQuotation.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], ClientPlanQuotation.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => clients_entity_1.Client, (client) => client.clientPlanQuotations, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'client_id' }),
    __metadata("design:type", clients_entity_1.Client)
], ClientPlanQuotation.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => development_plan_entity_1.DevelopmentPlan, (plan) => plan.clientPlanQuotations, {
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'plan_id' }),
    __metadata("design:type", development_plan_entity_1.DevelopmentPlan)
], ClientPlanQuotation.prototype, "plan", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.createdClientPlanQuotations, {
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.User)
], ClientPlanQuotation.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => invoice_entity_1.Invoice, (invoice) => invoice.quotation),
    __metadata("design:type", Array)
], ClientPlanQuotation.prototype, "invoices", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.createdClientPlanQuotations, {
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.User)
], ClientPlanQuotation.prototype, "createdByUser", void 0);
exports.ClientPlanQuotation = ClientPlanQuotation = __decorate([
    (0, typeorm_1.Entity)('client_plan_quotations')
], ClientPlanQuotation);
//# sourceMappingURL=client-plan-quotation.entity.js.map