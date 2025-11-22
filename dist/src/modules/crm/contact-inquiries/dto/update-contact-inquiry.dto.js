"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateContactInquiryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_contact_inquiry_dto_1 = require("./create-contact-inquiry.dto");
class UpdateContactInquiryDto extends (0, mapped_types_1.PartialType)(create_contact_inquiry_dto_1.CreateContactInquiryDto) {
}
exports.UpdateContactInquiryDto = UpdateContactInquiryDto;
//# sourceMappingURL=update-contact-inquiry.dto.js.map