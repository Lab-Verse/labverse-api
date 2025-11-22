"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClientPlanQuotationsTable1753360000019 = void 0;
const typeorm_1 = require("typeorm");
class CreateClientPlanQuotationsTable1753360000019 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'client_plan_quotations',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    default: 'gen_random_uuid()',
                },
                {
                    name: 'client_id',
                    type: 'uuid',
                    isNullable: false,
                },
                {
                    name: 'plan_id',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'status',
                    type: 'varchar',
                    length: '50',
                    isNullable: false,
                    default: "'draft'",
                },
                {
                    name: 'discount_percent',
                    type: 'decimal',
                    precision: 5,
                    scale: 2,
                    isNullable: false,
                    default: 0.0,
                },
                {
                    name: 'notes',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'total_amount',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                    isNullable: true,
                },
                {
                    name: 'created_by',
                    type: 'uuid',
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
        await queryRunner.createForeignKey('client_plan_quotations', new typeorm_1.TableForeignKey({
            columnNames: ['client_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'clients',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('client_plan_quotations', new typeorm_1.TableForeignKey({
            columnNames: ['plan_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'development_plans',
            onDelete: 'SET NULL',
        }));
        await queryRunner.createForeignKey('client_plan_quotations', new typeorm_1.TableForeignKey({
            columnNames: ['created_by'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('client_plan_quotations');
        const foreignKeyClient = table.foreignKeys.find((fk) => fk.columnNames.includes('client_id'));
        const foreignKeyPlan = table.foreignKeys.find((fk) => fk.columnNames.includes('plan_id'));
        const foreignKeyCreatedBy = table.foreignKeys.find((fk) => fk.columnNames.includes('created_by'));
        if (foreignKeyClient) {
            await queryRunner.dropForeignKey('client_plan_quotations', foreignKeyClient);
        }
        if (foreignKeyPlan) {
            await queryRunner.dropForeignKey('client_plan_quotations', foreignKeyPlan);
        }
        if (foreignKeyCreatedBy) {
            await queryRunner.dropForeignKey('client_plan_quotations', foreignKeyCreatedBy);
        }
        await queryRunner.dropTable('client_plan_quotations');
    }
}
exports.CreateClientPlanQuotationsTable1753360000019 = CreateClientPlanQuotationsTable1753360000019;
//# sourceMappingURL=1753360000019-CreateClientPlanQuotationsTable.js.map