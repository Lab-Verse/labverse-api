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
exports.ContactInquiry = exports.ContactInquiryStatus = void 0;
const typeorm_1 = require("typeorm");
var ContactInquiryStatus;
(function (ContactInquiryStatus) {
    ContactInquiryStatus["NEW"] = "New";
    ContactInquiryStatus["IN_PROGRESS"] = "In Progress";
    ContactInquiryStatus["RESOLVED"] = "Resolved";
    ContactInquiryStatus["CLOSED"] = "Closed";
})(ContactInquiryStatus || (exports.ContactInquiryStatus = ContactInquiryStatus = {}));
let ContactInquiry = class ContactInquiry {
};
exports.ContactInquiry = ContactInquiry;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ContactInquiry.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'full_name' }),
    __metadata("design:type", String)
], ContactInquiry.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContactInquiry.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'phone_number', nullable: true }),
    __metadata("design:type", String)
], ContactInquiry.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ContactInquiry.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ContactInquiry.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ContactInquiryStatus,
        default: ContactInquiryStatus.NEW,
    }),
    __metadata("design:type", String)
], ContactInquiry.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ContactInquiry.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], ContactInquiry.prototype, "updatedAt", void 0);
exports.ContactInquiry = ContactInquiry = __decorate([
    (0, typeorm_1.Entity)('contact_inquiries')
], ContactInquiry);
//# sourceMappingURL=contact-inquiry.entity.js.map