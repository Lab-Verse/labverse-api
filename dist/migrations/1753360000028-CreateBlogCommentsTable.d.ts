import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateBlogCommentsTable1753360000028 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
