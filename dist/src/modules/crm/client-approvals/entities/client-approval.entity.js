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
exports.ClientApproval = exports.ApprovalStatus = void 0;
const typeorm_1 = require("typeorm");
var ApprovalStatus;
(function (ApprovalStatus) {
    ApprovalStatus["PENDING"] = "pending";
    ApprovalStatus["APPROVED"] = "approved";
    ApprovalStatus["REJECTED"] = "rejected";
})(ApprovalStatus || (exports.ApprovalStatus = ApprovalStatus = {}));
let ClientApproval = class ClientApproval {
};
exports.ClientApproval = ClientApproval;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ClientApproval.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'clientId' }),
    __metadata("design:type", String)
], ClientApproval.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'deliverableId' }),
    __metadata("design:type", String)
], ClientApproval.prototype, "deliverableId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'requestDetails', type: 'text' }),
    __metadata("design:type", String)
], ClientApproval.prototype, "requestDetails", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ApprovalStatus,
        default: ApprovalStatus.PENDING,
    }),
    __metadata("design:type", String)
], ClientApproval.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'responseNotes', type: 'text', nullable: true }),
    __metadata("design:type", String)
], ClientApproval.prototype, "responseNotes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'requestedAt' }),
    __metadata("design:type", Date)
], ClientApproval.prototype, "requestedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'respondedAt', nullable: true }),
    __metadata("design:type", Date)
], ClientApproval.prototype, "respondedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'createdAt' }),
    __metadata("design:type", Date)
], ClientApproval.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updatedAt' }),
    __metadata("design:type", Date)
], ClientApproval.prototype, "updatedAt", void 0);
exports.ClientApproval = ClientApproval = __decorate([
    (0, typeorm_1.Entity)('client_approvals')
], ClientApproval);
//# sourceMappingURL=client-approval.entity.js.map