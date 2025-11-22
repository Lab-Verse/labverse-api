"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const user_entity_1 = require("./entities/user.entity");
const user_permission_entity_1 = require("./entities/user-permission.entity");
const role_entity_1 = require("../roles/entities/role.entity");
const permission_entity_1 = require("../permissions/entities/permission.entity");
const role_permission_entity_1 = require("../role-permissions/entities/role-permission.entity");
const shared_module_1 = require("../shared/shared.module");
const jwt_util_1 = require("../../common/utils/jwt.util");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User,
                user_permission_entity_1.UserPermission,
                role_entity_1.Role,
                permission_entity_1.Permission,
                role_permission_entity_1.RolePermission,
            ]),
            shared_module_1.SharedModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '7d') },
            }),
        ],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService, jwt_util_1.TokenUtil],
        exports: [users_service_1.UsersService, jwt_util_1.TokenUtil, typeorm_1.TypeOrmModule],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map