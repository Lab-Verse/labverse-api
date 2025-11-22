import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateUserPermissions1753360000038 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
