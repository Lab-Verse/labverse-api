import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class UpdateEmployeeSkillsTable1753360000036 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
