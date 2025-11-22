import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateCaseStudiesTable1753360000030 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
