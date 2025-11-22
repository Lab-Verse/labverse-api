"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDevelopmentPlansTable1753360000014 = void 0;
const typeorm_1 = require("typeorm");
class CreateDevelopmentPlansTable1753360000014 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'development_plans',
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
                    length: '255',
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
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('development_plans');
    }
}
exports.CreateDevelopmentPlansTable1753360000014 = CreateDevelopmentPlansTable1753360000014;
//# sourceMappingURL=1753360000014-CreateDevelopmentPlansTable.js.map