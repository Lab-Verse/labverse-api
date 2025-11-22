import { User } from '../../users/entities/user.entity';
export declare class RefreshToken {
    id: string;
    token: string;
    userId: string;
    user: User;
    expiresAt: Date;
    createdAt: Date;
    isRevoked: boolean;
}
