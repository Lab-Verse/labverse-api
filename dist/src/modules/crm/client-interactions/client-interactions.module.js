"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientInteractionsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const client_interactions_service_1 = require("./client-interactions.service");
const client_interactions_controller_1 = require("./client-interactions.controller");
const client_interaction_entity_1 = require("./entities/client-interaction.entity");
let ClientInteractionsModule = class ClientInteractionsModule {
};
exports.ClientInteractionsModule = ClientInteractionsModule;
exports.ClientInteractionsModule = ClientInteractionsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([client_interaction_entity_1.ClientInteraction])],
        controllers: [client_interactions_controller_1.ClientInteractionsController],
        providers: [client_interactions_service_1.ClientInteractionsService],
        exports: [client_interactions_service_1.ClientInteractionsService],
    })
], ClientInteractionsModule);
//# sourceMappingURL=client-interactions.module.js.map