import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RefreshTokenDto, PasswordResetDto, ResetPasswordDto } from './dto/refresh-token.dto';
import { User } from '../users/entities/user.entity';
import { RefreshToken } from './entities/refresh-token.entity';
type UserWithoutPassword = Omit<User, 'password'>;
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly refreshTokenRepository;
    constructor(usersService: UsersService, jwtService: JwtService, refreshTokenRepository: Repository<RefreshToken>);
    register(dto: RegisterDto): Promise<{
        success: boolean;
        message: string;
        user: UserWithoutPassword;
    }>;
    validateUser(email: string, password: string): Promise<User>;
    login(dto: AuthCredentialsDto): Promise<{
        success: boolean;
        message: string;
        data: LoginResponseDto;
    }>;
    refreshToken(dto: RefreshTokenDto): Promise<{
        success: boolean;
        message: string;
        data: {
            accessToken: string;
        };
    }>;
    logout(refreshToken: string): Promise<{
        success: boolean;
        message: string;
    }>;
    requestPasswordReset(dto: PasswordResetDto): Promise<{
        success: boolean;
        message: string;
        token?: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        success: boolean;
        message: string;
    }>;
    getCurrentUser(userId: string): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    getCurrentUserByEmail(email: string): Promise<any>;
    private generateRefreshToken;
    getUserWithDetails(userId: string): Promise<User>;
}
export {};
