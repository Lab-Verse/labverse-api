import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateUsersAndRoles1689774123456 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
