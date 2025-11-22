import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateBlogPostsTable1753360000027 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
