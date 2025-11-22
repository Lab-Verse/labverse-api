import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateEmployeeSkills1753360000003 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
