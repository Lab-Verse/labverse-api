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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_entity_1 = require("./entities/payment.entity");
const invoice_entity_1 = require("../invoices/entities/invoice.entity");
const security_util_1 = require("../../../common/utils/security.util");
let PaymentsService = class PaymentsService {
    constructor(paymentRepository, invoiceRepository) {
        this.paymentRepository = paymentRepository;
        this.invoiceRepository = invoiceRepository;
    }
    async create(createPaymentDto) {
        try {
            security_util_1.SecurityUtil.validateObject(createPaymentDto);
            const { invoiceId } = createPaymentDto;
            if (invoiceId) {
                const validInvoiceId = security_util_1.SecurityUtil.validateId(invoiceId);
                const invoice = await this.invoiceRepository.findOne({
                    where: { id: validInvoiceId },
                });
                if (!invoice) {
                    throw new common_1.NotFoundException(`Invoice with ID "${invoiceId}" not found.`);
                }
            }
            const payment = this.paymentRepository.create(createPaymentDto);
            return await this.paymentRepository.save(payment);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            if (error.code === '23503') {
                throw new common_1.NotFoundException('Referenced invoice not found.');
            }
            throw error;
        }
    }
    async findAll() {
        return this.paymentRepository.find({ relations: ['invoice'] });
    }
    async findOne(id) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        const payment = await this.paymentRepository.findOne({
            where: { id: validId },
            relations: ['invoice'],
        });
        if (!payment) {
            throw new common_1.NotFoundException(`Payment with ID "${id}" not found.`);
        }
        return payment;
    }
    async update(id, updatePaymentDto) {
        try {
            security_util_1.SecurityUtil.validateObject(updatePaymentDto);
            if (updatePaymentDto.invoiceId) {
                const validInvoiceId = security_util_1.SecurityUtil.validateId(updatePaymentDto.invoiceId);
                const invoice = await this.invoiceRepository.findOne({
                    where: { id: validInvoiceId },
                });
                if (!invoice) {
                    throw new common_1.NotFoundException(`Invoice with ID "${updatePaymentDto.invoiceId}" not found.`);
                }
            }
            const validId = security_util_1.SecurityUtil.validateId(id);
            await this.paymentRepository.update(validId, updatePaymentDto);
            return this.findOne(id);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            if (error.code === '23503') {
                throw new common_1.NotFoundException('Referenced invoice not found.');
            }
            throw error;
        }
    }
    async remove(id) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        const result = await this.paymentRepository.delete(validId);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Payment with ID "${id}" not found.`);
        }
        return { message: 'Payment successfully deleted' };
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __param(1, (0, typeorm_1.InjectRepository)(invoice_entity_1.Invoice)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map