"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClientInteractionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_client_interaction_dto_1 = require("./create-client-interaction.dto");
class UpdateClientInteractionDto extends (0, mapped_types_1.PartialType)(create_client_interaction_dto_1.CreateClientInteractionDto) {
}
exports.UpdateClientInteractionDto = UpdateClientInteractionDto;
//# sourceMappingURL=update-client-interaction.dto.js.map