"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInvoicesTable1753360000020 = void 0;
const typeorm_1 = require("typeorm");
class CreateInvoicesTable1753360000020 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'invoices',
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
                    name: 'project_id',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'quotation_id',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'status',
                    type: 'varchar',
                    length: '50',
                    isNullable: false,
                    default: "'unpaid'",
                },
                {
                    name: 'issue_date',
                    type: 'date',
                    isNullable: false,
                },
                {
                    name: 'due_date',
                    type: 'date',
                    isNullable: false,
                },
                {
                    name: 'total_amount',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                    isNullable: false,
                },
                {
                    name: 'paid_amount',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                    isNullable: false,
                    default: 0.0,
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
        await queryRunner.createForeignKey('invoices', new typeorm_1.TableForeignKey({
            columnNames: ['client_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'clients',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('invoices', new typeorm_1.TableForeignKey({
            columnNames: ['project_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'projects',
            onDelete: 'SET NULL',
        }));
        await queryRunner.createForeignKey('invoices', new typeorm_1.TableForeignKey({
            columnNames: ['quotation_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'client_plan_quotations',
            onDelete: 'SET NULL',
        }));
        await queryRunner.query(`ALTER TABLE invoices ADD CONSTRAINT chk_invoice_status CHECK (status IN ('unpaid', 'partially_paid', 'paid', 'overdue'))`);
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('invoices');
        const foreignKeyClient = table.foreignKeys.find((fk) => fk.columnNames.includes('client_id'));
        const foreignKeyProject = table.foreignKeys.find((fk) => fk.columnNames.includes('project_id'));
        const foreignKeyQuotation = table.foreignKeys.find((fk) => fk.columnNames.includes('quotation_id'));
        if (foreignKeyClient) {
            await queryRunner.dropForeignKey('invoices', foreignKeyClient);
        }
        if (foreignKeyProject) {
            await queryRunner.dropForeignKey('invoices', foreignKeyProject);
        }
        if (foreignKeyQuotation) {
            await queryRunner.dropForeignKey('invoices', foreignKeyQuotation);
        }
        await queryRunner.query(`ALTER TABLE invoices DROP CONSTRAINT IF EXISTS chk_invoice_status`);
        await queryRunner.dropTable('invoices');
    }
}
exports.CreateInvoicesTable1753360000020 = CreateInvoicesTable1753360000020;
//# sourceMappingURL=1753360000020-CreateInvoicesTable.js.map