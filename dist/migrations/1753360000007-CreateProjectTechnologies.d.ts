import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateProjectTechnologies1753360000007 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
