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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcryptjs");
const users_service_1 = require("../users/users.service");
const refresh_token_entity_1 = require("./entities/refresh-token.entity");
const logger_util_1 = require("../../common/utils/logger.util");
const validation_util_1 = require("../../common/utils/validation.util");
let AuthService = class AuthService {
    constructor(usersService, jwtService, refreshTokenRepository) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.refreshTokenRepository = refreshTokenRepository;
    }
    async register(dto) {
        validation_util_1.ValidationUtil.validateEmail(dto.email);
        validation_util_1.ValidationUtil.validatePassword(dto.password);
        const existing = await this.usersService.findByEmail(dto.email);
        if (existing) {
            throw new common_1.ConflictException('Email is already registered');
        }
        const userResponse = await this.usersService.create({
            email: validation_util_1.ValidationUtil.sanitizeString(dto.email.toLowerCase()),
            password: dto.password,
            fullName: validation_util_1.ValidationUtil.sanitizeString(dto.fullName),
            roleId: dto.roleId,
        });
        logger_util_1.SafeLogger.log(`User registered successfully: ${dto.email}`, 'AuthService');
        const userData = userResponse.data || userResponse;
        const { ...userWithoutPassword } = userData;
        return {
            success: true,
            message: 'User registered successfully',
            user: userWithoutPassword,
        };
    }
    async validateUser(email, password) {
        const user = await this.usersService.findByEmail(email, {
            includePassword: true,
        });
        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
        return null;
    }
    async login(dto) {
        validation_util_1.ValidationUtil.validateEmail(dto.email);
        validation_util_1.ValidationUtil.validateString(dto.password, 'password', 1);
        const user = await this.usersService.findByEmail(dto.email.toLowerCase().trim(), {
            includePassword: true,
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const isMatch = await bcrypt.compare(dto.password, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const { ...userSafe } = user;
        const payload = { sub: user.id, email: user.email };
        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: '15m',
        });
        const refreshToken = await this.generateRefreshToken(user.id);
        logger_util_1.SafeLogger.log(`User logged in successfully: ${dto.email}`, 'AuthService');
        return {
            success: true,
            message: 'Login successful',
            data: { accessToken, refreshToken: refreshToken.token, user: userSafe },
        };
    }
    async refreshToken(dto) {
        validation_util_1.ValidationUtil.validateString(dto.refreshToken, 'refreshToken');
        const refreshToken = await this.refreshTokenRepository.findOne({
            where: { token: dto.refreshToken, isRevoked: false },
            relations: ['user'],
        });
        if (!refreshToken || refreshToken.expiresAt < new Date()) {
            throw new common_1.UnauthorizedException('Invalid or expired refresh token');
        }
        const payload = {
            sub: refreshToken.user.id,
            email: refreshToken.user.email,
        };
        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: '15m',
        });
        logger_util_1.SafeLogger.log(`Token refreshed for user: ${refreshToken.user.email}`, 'AuthService');
        return {
            success: true,
            message: 'Token refreshed successfully',
            data: { accessToken },
        };
    }
    async logout(refreshToken) {
        validation_util_1.ValidationUtil.validateString(refreshToken, 'refreshToken');
        const result = await this.refreshTokenRepository.update({ token: refreshToken }, { isRevoked: true });
        if (result.affected === 0) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        logger_util_1.SafeLogger.log('User logged out successfully', 'AuthService');
        return {
            success: true,
            message: 'Logged out successfully',
        };
    }
    async requestPasswordReset(dto) {
        validation_util_1.ValidationUtil.validateEmail(dto.email);
        const user = await this.usersService.findByEmail(dto.email.toLowerCase().trim());
        if (!user) {
            throw new common_1.NotFoundException('No user found with this email address');
        }
        const resetToken = await this.jwtService.signAsync({ sub: user.id, type: 'password-reset' }, { expiresIn: '1h' });
        logger_util_1.SafeLogger.log(`Password reset token generated for: ${dto.email}`, 'AuthService');
        logger_util_1.SafeLogger.log(`Reset token: ${resetToken}`, 'AuthService');
        return {
            success: true,
            message: 'Password reset token generated successfully. Check server logs for token.',
            token: resetToken,
        };
    }
    async resetPassword(dto) {
        validation_util_1.ValidationUtil.validateString(dto.token, 'token');
        validation_util_1.ValidationUtil.validatePassword(dto.password);
        try {
            const payload = await this.jwtService.verifyAsync(dto.token);
            if (payload.type !== 'password-reset') {
                throw new common_1.UnauthorizedException('Invalid token type');
            }
            const hashedPassword = await bcrypt.hash(dto.password, 10);
            await this.usersService.updatePassword(payload.sub, hashedPassword);
            await this.refreshTokenRepository.update({ userId: payload.sub }, { isRevoked: true });
            logger_util_1.SafeLogger.log(`Password reset successful for user ID: ${payload.sub}`, 'AuthService');
            return {
                success: true,
                message: 'Password has been changed successfully. Please login with your new password.',
            };
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            throw new common_1.UnauthorizedException('Invalid or expired reset token');
        }
    }
    async getCurrentUser(userId) {
        const user = await this.usersService.findOne(userId);
        const { ...userWithoutPassword } = user;
        return {
            success: true,
            message: 'User details retrieved successfully',
            data: userWithoutPassword,
        };
    }
    async getCurrentUserByEmail(email) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const { ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async generateRefreshToken(userId) {
        const token = await this.jwtService.signAsync({ sub: userId, type: 'refresh' }, { expiresIn: '7d' });
        const refreshToken = this.refreshTokenRepository.create({
            token,
            userId,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        return this.refreshTokenRepository.save(refreshToken);
    }
    async getUserWithDetails(userId) {
        return this.usersService.findOneWithPermissions(userId);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(refresh_token_entity_1.RefreshToken)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map