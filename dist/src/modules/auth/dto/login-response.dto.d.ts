import { User } from '../../users/entities/user.entity';
export declare class LoginResponseDto {
    accessToken: string;
    refreshToken: string;
    user: Partial<User>;
}
