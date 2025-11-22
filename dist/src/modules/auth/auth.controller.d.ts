import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { RefreshTokenDto, PasswordResetDto, ResetPasswordDto } from './dto/refresh-token.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        success: boolean;
        message: string;
        user: {
            id: string;
            email: string;
            roleId: string;
            role: import("../roles/entities/role.entity").Role;
            createdAt: Date;
            permissions: import("../permissions/entities/permission.entity").Permission[];
            userPermissions: import("../users/entities/user-permission.entity").UserPermission[];
            updatedAt: Date;
            fullName: string;
            createdClientPlanQuotations: import("../client-plan-quotations/entities/client-plan-quotation.entity").ClientPlanQuotation[];
        };
    }>;
    login(dto: AuthCredentialsDto): Promise<{
        success: boolean;
        message: string;
        data: import("./dto/login-response.dto").LoginResponseDto;
    }>;
    refresh(dto: RefreshTokenDto): Promise<{
        success: boolean;
        message: string;
        data: {
            accessToken: string;
        };
    }>;
    logout(dto: RefreshTokenDto): Promise<{
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
}
