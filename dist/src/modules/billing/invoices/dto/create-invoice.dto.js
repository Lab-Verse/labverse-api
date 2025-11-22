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
exports.CreateInvoiceDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const invoice_status_enum_1 = require("../enums/invoice-status.enum");
class CreateInvoiceDto {
}
exports.CreateInvoiceDto = CreateInvoiceDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'A unique invoice number',
        required: false,
        example: 'INV-2025-001',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "invoice_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UUID of the client for this invoice',
        example: 'client-uuid-1',
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "client_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UUID of the related project (optional)',
        required: false,
        example: 'project-uuid-1',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "project_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UUID of the related quotation (optional)',
        required: false,
        example: 'quotation-uuid-1',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "quotation_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status of the invoice',
        enum: invoice_status_enum_1.InvoiceStatus,
        default: invoice_status_enum_1.InvoiceStatus.UNPAID,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(invoice_status_enum_1.InvoiceStatus),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date the invoice was issued (YYYY-MM-DD)',
        example: '2025-07-29',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], CreateInvoiceDto.prototype, "issue_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date the invoice is due (YYYY-MM-DD)',
        example: '2025-08-29',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], CreateInvoiceDto.prototype, "due_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total amount of the invoice', example: 1500.0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateInvoiceDto.prototype, "total_amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Amount already paid on the invoice',
        required: false,
        example: 500.0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateInvoiceDto.prototype, "paid_amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Description or notes for the invoice',
        required: false,
        example: 'Invoice for web development services',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 1000),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "description", void 0);
//# sourceMappingURL=create-invoice.dto.js.map