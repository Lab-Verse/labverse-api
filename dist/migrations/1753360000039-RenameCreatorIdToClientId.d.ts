import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class RenameCreatorIdToClientId1753360000039 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
