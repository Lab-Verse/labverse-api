"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoriesTable1753360000023 = void 0;
const typeorm_1 = require("typeorm");
class CreateCategoriesTable1753360000023 {
    constructor() {
        this.name = 'CreateCategoriesTable1753360000023';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'categories',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    default: 'gen_random_uuid()',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'slug',
                    type: 'varchar',
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
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
    }
    async down(queryRunner) {
        await queryRunner.dropTable('categories');
    }
}
exports.CreateCategoriesTable1753360000023 = CreateCategoriesTable1753360000023;
//# sourceMappingURL=1753360000023-CreateCategoriesTable.js.map