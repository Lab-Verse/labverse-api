"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCaseStudiesTable1753360000030 = void 0;
const typeorm_1 = require("typeorm");
class CreateCaseStudiesTable1753360000030 {
    constructor() {
        this.name = 'CreateCaseStudiesTable1753360000030';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'case_studies',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    default: 'gen_random_uuid()',
                },
                {
                    name: 'title',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'slug',
                    type: 'varchar',
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'introduction',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'challenge',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'solution',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'results',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'client_name',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'thumbnail_url',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'category_id',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'is_published',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
        }));
        await queryRunner.createForeignKey('case_studies', new typeorm_1.TableForeignKey({
            columnNames: ['category_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'categories',
            onDelete: 'SET NULL',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('case_studies');
        const foreignKeyCategory = table.foreignKeys.find((fk) => fk.columnNames.indexOf('category_id') !== -1);
        if (foreignKeyCategory)
            await queryRunner.dropForeignKey('case_studies', foreignKeyCategory);
        await queryRunner.dropTable('case_studies');
    }
}
exports.CreateCaseStudiesTable1753360000030 = CreateCaseStudiesTable1753360000030;
//# sourceMappingURL=1753360000030-CreateCaseStudiesTable.js.map