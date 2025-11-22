import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateEmployeeProfiles1753360000001 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
