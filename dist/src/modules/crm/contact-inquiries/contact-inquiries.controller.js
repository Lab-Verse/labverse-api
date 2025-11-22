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
exports.ContactInquiriesController = void 0;
const common_1 = require("@nestjs/common");
const contact_inquiries_service_1 = require("./contact-inquiries.service");
const create_contact_inquiry_dto_1 = require("./dto/create-contact-inquiry.dto");
const update_contact_inquiry_dto_1 = require("./dto/update-contact-inquiry.dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let ContactInquiriesController = class ContactInquiriesController {
    constructor(contactInquiriesService) {
        this.contactInquiriesService = contactInquiriesService;
    }
    create(createContactInquiryDto) {
        return this.contactInquiriesService.create(createContactInquiryDto);
    }
    findAll() {
        return this.contactInquiriesService.findAll();
    }
    findOne(id) {
        return this.contactInquiriesService.findOne(id);
    }
    update(id, updateContactInquiryDto) {
        return this.contactInquiriesService.update(id, updateContactInquiryDto);
    }
    remove(id) {
        return this.contactInquiriesService.remove(id);
    }
};
exports.ContactInquiriesController = ContactInquiriesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new client plan quotation' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contact_inquiry_dto_1.CreateContactInquiryDto]),
    __metadata("design:returntype", void 0)
], ContactInquiriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all client plan quotations' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContactInquiriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a client plan quotation by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContactInquiriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a client plan quotation by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_contact_inquiry_dto_1.UpdateContactInquiryDto]),
    __metadata("design:returntype", void 0)
], ContactInquiriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a client plan quotation by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContactInquiriesController.prototype, "remove", null);
exports.ContactInquiriesController = ContactInquiriesController = __decorate([
    (0, swagger_1.ApiTags)('Contact Inquiries'),
    (0, common_1.Controller)('contact-inquiries'),
    __metadata("design:paramtypes", [contact_inquiries_service_1.ContactInquiriesService])
], ContactInquiriesController);
//# sourceMappingURL=contact-inquiries.controller.js.map