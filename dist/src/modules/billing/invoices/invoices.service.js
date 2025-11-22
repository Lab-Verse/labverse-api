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
exports.InvoicesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const invoice_entity_1 = require("./entities/invoice.entity");
const validation_util_1 = require("../../../common/utils/validation.util");
const logger_util_1 = require("../../../common/utils/logger.util");
let InvoicesService = class InvoicesService {
    constructor(invoicesRepository) {
        this.invoicesRepository = invoicesRepository;
    }
    async create(createInvoiceDto) {
        if (createInvoiceDto.invoice_number) {
            validation_util_1.ValidationUtil.validateString(createInvoiceDto.invoice_number, 'invoice_number', 3, 50);
        }
        validation_util_1.ValidationUtil.validateDecimal(createInvoiceDto.total_amount, 'total_amount');
        validation_util_1.ValidationUtil.validateDate(createInvoiceDto.issue_date, 'issue_date');
        validation_util_1.ValidationUtil.validateDate(createInvoiceDto.due_date, 'due_date');
        validation_util_1.ValidationUtil.validateUUID(createInvoiceDto.client_id, 'client_id');
        if (createInvoiceDto.project_id) {
            validation_util_1.ValidationUtil.validateUUID(createInvoiceDto.project_id, 'project_id');
        }
        if (createInvoiceDto.quotation_id) {
            validation_util_1.ValidationUtil.validateUUID(createInvoiceDto.quotation_id, 'quotation_id');
        }
        if (createInvoiceDto.status) {
            validation_util_1.ValidationUtil.validateString(createInvoiceDto.status, 'status', 1, 50);
        }
        if (createInvoiceDto.description) {
            validation_util_1.ValidationUtil.validateString(createInvoiceDto.description, 'description', 0, 1000);
        }
        if (new Date(createInvoiceDto.issue_date) >
            new Date(createInvoiceDto.due_date)) {
            throw new common_1.BadRequestException('Issue date cannot be after due date');
        }
        try {
            const invoice = this.invoicesRepository.create({
                ...createInvoiceDto,
                invoice_number: createInvoiceDto.invoice_number
                    ? validation_util_1.ValidationUtil.sanitizeString(createInvoiceDto.invoice_number)
                    : undefined,
                description: createInvoiceDto.description
                    ? validation_util_1.ValidationUtil.sanitizeString(createInvoiceDto.description)
                    : undefined,
            });
            const savedInvoice = await this.invoicesRepository.save(invoice);
            logger_util_1.SafeLogger.log(`Invoice created: ${createInvoiceDto.invoice_number || 'Auto-generated'}`, 'InvoicesService');
            return {
                success: true,
                message: 'Invoice created successfully',
                data: savedInvoice,
            };
        }
        catch (error) {
            if (error.code === '23503') {
                throw new common_1.NotFoundException('Referenced client, project, or quotation not found');
            }
            if (error.code === '23505') {
                throw new common_1.ConflictException('Invoice number already exists');
            }
            throw error;
        }
    }
    async findAll() {
        const invoices = await this.invoicesRepository.find({
            relations: ['client', 'project', 'quotation'],
            order: { created_at: 'DESC' },
        });
        return {
            success: true,
            message: 'Invoices retrieved successfully',
            data: invoices,
        };
    }
    async findOne(id) {
        validation_util_1.ValidationUtil.validateUUID(id, 'invoiceId');
        const invoice = await this.invoicesRepository.findOne({
            where: { id },
            relations: ['client', 'project', 'quotation'],
        });
        if (!invoice) {
            throw new common_1.NotFoundException(`Invoice with ID "${id}" not found`);
        }
        return {
            success: true,
            message: 'Invoice retrieved successfully',
            data: invoice,
        };
    }
    async update(id, updateInvoiceDto) {
        validation_util_1.ValidationUtil.validateUUID(id, 'invoiceId');
        if (updateInvoiceDto.invoice_number) {
            validation_util_1.ValidationUtil.validateString(updateInvoiceDto.invoice_number, 'invoice_number', 3, 50);
        }
        if (updateInvoiceDto.total_amount !== undefined) {
            validation_util_1.ValidationUtil.validateDecimal(updateInvoiceDto.total_amount, 'total_amount');
        }
        if (updateInvoiceDto.issue_date) {
            validation_util_1.ValidationUtil.validateDate(updateInvoiceDto.issue_date, 'issue_date');
        }
        if (updateInvoiceDto.due_date) {
            validation_util_1.ValidationUtil.validateDate(updateInvoiceDto.due_date, 'due_date');
        }
        if (updateInvoiceDto.client_id) {
            validation_util_1.ValidationUtil.validateUUID(updateInvoiceDto.client_id, 'client_id');
        }
        if (updateInvoiceDto.project_id) {
            validation_util_1.ValidationUtil.validateUUID(updateInvoiceDto.project_id, 'project_id');
        }
        if (updateInvoiceDto.quotation_id) {
            validation_util_1.ValidationUtil.validateUUID(updateInvoiceDto.quotation_id, 'quotation_id');
        }
        if (updateInvoiceDto.status) {
            validation_util_1.ValidationUtil.validateString(updateInvoiceDto.status, 'status', 1, 50);
        }
        if (updateInvoiceDto.description !== undefined) {
            if (updateInvoiceDto.description) {
                validation_util_1.ValidationUtil.validateString(updateInvoiceDto.description, 'description', 0, 1000);
            }
        }
        try {
            const invoiceResult = await this.findOne(id);
            const invoice = invoiceResult.data;
            const newIssueDate = updateInvoiceDto.issue_date || invoice.issue_date;
            const newDueDate = updateInvoiceDto.due_date || invoice.due_date;
            if (newIssueDate &&
                newDueDate &&
                new Date(newIssueDate) > new Date(newDueDate)) {
                throw new common_1.BadRequestException('Issue date cannot be after due date');
            }
            const updateData = {
                ...updateInvoiceDto,
                ...(updateInvoiceDto.invoice_number && {
                    invoice_number: validation_util_1.ValidationUtil.sanitizeString(updateInvoiceDto.invoice_number),
                }),
                ...(updateInvoiceDto.description !== undefined && {
                    description: updateInvoiceDto.description
                        ? validation_util_1.ValidationUtil.sanitizeString(updateInvoiceDto.description)
                        : null,
                }),
            };
            this.invoicesRepository.merge(invoice, updateData);
            const updatedInvoice = await this.invoicesRepository.save(invoice);
            logger_util_1.SafeLogger.log(`Invoice updated: ${id}`, 'InvoicesService');
            return {
                success: true,
                message: 'Invoice updated successfully',
                data: updatedInvoice,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.BadRequestException) {
                throw error;
            }
            if (error.code === '23503') {
                throw new common_1.NotFoundException('Referenced client, project, or quotation not found');
            }
            if (error.code === '23505') {
                throw new common_1.ConflictException('Invoice number already exists');
            }
            throw error;
        }
    }
    async remove(id) {
        validation_util_1.ValidationUtil.validateUUID(id, 'invoiceId');
        const result = await this.invoicesRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Invoice with ID "${id}" not found`);
        }
        logger_util_1.SafeLogger.log(`Invoice deleted: ${id}`, 'InvoicesService');
        return {
            success: true,
            message: 'Invoice deleted successfully',
        };
    }
};
exports.InvoicesService = InvoicesService;
exports.InvoicesService = InvoicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(invoice_entity_1.Invoice)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], InvoicesService);
//# sourceMappingURL=invoices.service.js.map