import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddProjectImagesToCaseStudies1753360000039 implements MigrationInterface {
  name = 'AddProjectImagesToCaseStudies1753360000039';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'case_studies',
      new TableColumn({
        name: 'project_images',
        type: 'text',
        isArray: true,
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('case_studies', 'project_images');
  }
}