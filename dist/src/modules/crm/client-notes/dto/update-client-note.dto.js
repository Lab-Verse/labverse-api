"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClientNoteDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_client_note_dto_1 = require("./create-client-note.dto");
class UpdateClientNoteDto extends (0, mapped_types_1.PartialType)(create_client_note_dto_1.CreateClientNoteDto) {
}
exports.UpdateClientNoteDto = UpdateClientNoteDto;
//# sourceMappingURL=update-client-note.dto.js.map