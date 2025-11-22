"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateServicesTable1753360000013 = void 0;
const typeorm_1 = require("typeorm");
class CreateServicesTable1753360000013 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'services',
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
                    name: 'base_price',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                    isNullable: false,
                },
                {
                    name: 'duration_in_days',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'category',
                    type: 'varchar',
                    length: '100',
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
        await queryRunner.dropTable('services');
    }
}
exports.CreateServicesTable1753360000013 = CreateServicesTable1753360000013;
//# sourceMappingURL=1753360000013-CreateServicesTable.js.map