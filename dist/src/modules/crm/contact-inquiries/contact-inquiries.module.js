"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactInquiriesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const contact_inquiries_service_1 = require("./contact-inquiries.service");
const contact_inquiries_controller_1 = require("./contact-inquiries.controller");
const contact_inquiry_entity_1 = require("./entities/contact-inquiry.entity");
let ContactInquiriesModule = class ContactInquiriesModule {
};
exports.ContactInquiriesModule = ContactInquiriesModule;
exports.ContactInquiriesModule = ContactInquiriesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([contact_inquiry_entity_1.ContactInquiry])],
        controllers: [contact_inquiries_controller_1.ContactInquiriesController],
        providers: [contact_inquiries_service_1.ContactInquiriesService],
        exports: [contact_inquiries_service_1.ContactInquiriesService],
    })
], ContactInquiriesModule);
//# sourceMappingURL=contact-inquiries.module.js.map