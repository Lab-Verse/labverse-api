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
exports.CreateClientPlanQuotationDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const client_plan_quotation_status_enum_1 = require("../enums/client-plan-quotation-status.enum");
class CreateClientPlanQuotationDto {
}
exports.CreateClientPlanQuotationDto = CreateClientPlanQuotationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UUID of the client associated with the quotation',
        example: 'client-uuid-1',
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateClientPlanQuotationDto.prototype, "client_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UUID of the development plan (optional, for custom quotations)',
        required: false,
        example: 'plan-uuid-1',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateClientPlanQuotationDto.prototype, "plan_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Current status of the quotation',
        enum: client_plan_quotation_status_enum_1.ClientPlanQuotationStatus,
        default: client_plan_quotation_status_enum_1.ClientPlanQuotationStatus.DRAFT,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_plan_quotation_status_enum_1.ClientPlanQuotationStatus),
    __metadata("design:type", String)
], CreateClientPlanQuotationDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Discount percentage applied to the quotation (0-100)',
        required: false,
        example: 5.0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CreateClientPlanQuotationDto.prototype, "discount_percent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional notes for the quotation',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateClientPlanQuotationDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total amount of the quotation (can be calculated by backend)',
        required: false,
        example: 1250.75,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateClientPlanQuotationDto.prototype, "total_amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UUID of the user who created the quotation (optional)',
        required: false,
        example: 'user-uuid-1',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateClientPlanQuotationDto.prototype, "created_by", void 0);
//# sourceMappingURL=create-client-plan-quotation.dto.js.map