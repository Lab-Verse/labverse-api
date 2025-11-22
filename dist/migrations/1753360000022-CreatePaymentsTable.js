"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePaymentsTable1753360000022 = void 0;
const typeorm_1 = require("typeorm");
class CreatePaymentsTable1753360000022 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'payments',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    default: 'gen_random_uuid()',
                },
                {
                    name: 'invoice_id',
                    type: 'uuid',
                    isNullable: false,
                },
                {
                    name: 'amount',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                    isNullable: false,
                },
                {
                    name: 'payment_date',
                    type: 'date',
                    isNullable: false,
                    default: 'CURRENT_DATE',
                },
                {
                    name: 'payment_method',
                    type: 'varchar',
                    length: '100',
                    isNullable: true,
                },
                {
                    name: 'transaction_reference',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                    isUnique: true,
                },
                {
                    name: 'notes',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
        await queryRunner.createForeignKey('payments', new typeorm_1.TableForeignKey({
            columnNames: ['invoice_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'invoices',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('payments');
        const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.includes('invoice_id'));
        if (foreignKey) {
            await queryRunner.dropForeignKey('payments', foreignKey);
        }
        await queryRunner.dropTable('payments');
    }
}
exports.CreatePaymentsTable1753360000022 = CreatePaymentsTable1753360000022;
//# sourceMappingURL=1753360000022-CreatePaymentsTable.js.map