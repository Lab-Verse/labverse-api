import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateCategoriesTable1753360000023 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
