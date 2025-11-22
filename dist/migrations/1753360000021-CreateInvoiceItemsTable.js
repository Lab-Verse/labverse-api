"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInvoiceItemsTable1753360000021 = void 0;
const typeorm_1 = require("typeorm");
class CreateInvoiceItemsTable1753360000021 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'invoice_items',
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
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'service_id',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'quantity',
                    type: 'int',
                    isNullable: false,
                    default: 1,
                },
                {
                    name: 'unit_price',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                    isNullable: false,
                },
                {
                    name: 'total_price',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                    isNullable: false,
                },
            ],
        }), true);
        await queryRunner.createForeignKey('invoice_items', new typeorm_1.TableForeignKey({
            columnNames: ['invoice_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'invoices',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('invoice_items', new typeorm_1.TableForeignKey({
            columnNames: ['service_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'services',
            onDelete: 'SET NULL',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('invoice_items');
        const foreignKeyInvoice = table.foreignKeys.find((fk) => fk.columnNames.includes('invoice_id'));
        const foreignKeyService = table.foreignKeys.find((fk) => fk.columnNames.includes('service_id'));
        if (foreignKeyInvoice) {
            await queryRunner.dropForeignKey('invoice_items', foreignKeyInvoice);
        }
        if (foreignKeyService) {
            await queryRunner.dropForeignKey('invoice_items', foreignKeyService);
        }
        await queryRunner.dropTable('invoice_items');
    }
}
exports.CreateInvoiceItemsTable1753360000021 = CreateInvoiceItemsTable1753360000021;
//# sourceMappingURL=1753360000021-CreateInvoiceItemsTable.js.map