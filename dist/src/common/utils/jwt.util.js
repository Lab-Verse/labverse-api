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
exports.UserService = exports.TokenUtil = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let TokenUtil = class TokenUtil {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    extractUserIdFromToken(token) {
        try {
            const cleanToken = token.replace(/^Bearer\s+/, '');
            const payload = this.jwtService.verify(cleanToken);
            const userId = payload.sub || payload.id || payload.userId;
            if (!userId) {
                throw new common_1.UnauthorizedException('Invalid token: User ID not found in token payload');
            }
            return userId;
        }
        catch (error) {
            if (error.name === 'JsonWebTokenError') {
                throw new common_1.UnauthorizedException('Invalid token format');
            }
            if (error.name === 'TokenExpiredError') {
                throw new common_1.UnauthorizedException('Token has expired');
            }
            throw new common_1.UnauthorizedException('Failed to extract user ID from token');
        }
    }
    extractUserIdFromRequest(request) {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new common_1.UnauthorizedException('Authorization header is missing');
        }
        return this.extractUserIdFromToken(authHeader);
    }
    getTokenPayload(token) {
        try {
            const cleanToken = token.replace(/^Bearer\s+/, '');
            return this.jwtService.verify(cleanToken);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
};
exports.TokenUtil = TokenUtil;
exports.TokenUtil = TokenUtil = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], TokenUtil);
const security_util_1 = require("./security.util");
const typeorm_1 = require("typeorm");
let UserService = class UserService {
    constructor(userRepository, tokenUtil) {
        this.userRepository = userRepository;
        this.tokenUtil = tokenUtil;
    }
    async removeSelf(request) {
        try {
            const userId = this.tokenUtil.extractUserIdFromRequest(request);
            const validId = security_util_1.SecurityUtil.validateId(userId);
            const user = await this.userRepository.findOne({
                where: { id: validId },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            await this.userRepository.remove(user);
            return {
                success: true,
                message: 'User account deleted successfully',
                data: undefined,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            throw new Error(`Failed to delete user account: ${error.message}`);
        }
    }
    async remove(id) {
        try {
            const validId = security_util_1.SecurityUtil.validateId(id);
            const user = await this.userRepository.findOne({
                where: { id: validId },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            await this.userRepository.remove(user);
            return {
                success: true,
                message: 'User deleted successfully',
                data: undefined,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new Error(`Failed to delete user: ${error.message}`);
        }
    }
    async getCurrentUser(request) {
        try {
            const userId = this.tokenUtil.extractUserIdFromRequest(request);
            const validId = security_util_1.SecurityUtil.validateId(userId);
            const user = await this.userRepository.findOne({
                where: { id: validId },
                select: ['id', 'email', 'password', 'createdAt', 'updatedAt'],
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            return {
                success: true,
                message: 'User profile retrieved successfully',
                data: user,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            throw new Error(`Failed to get user profile: ${error.message}`);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        TokenUtil])
], UserService);
//# sourceMappingURL=jwt.util.js.map