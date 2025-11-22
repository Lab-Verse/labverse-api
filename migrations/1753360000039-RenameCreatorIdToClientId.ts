import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameCreatorIdToClientId1753360000039 implements MigrationInterface {
  name = 'RenameCreatorIdToClientId1753360000039';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "projects" RENAME COLUMN "creator_id" TO "client_id"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "projects" RENAME COLUMN "client_id" TO "creator_id"`);
  }
}