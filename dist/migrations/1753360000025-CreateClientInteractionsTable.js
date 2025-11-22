"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClientInteractionsTable1753360000025 = void 0;
const typeorm_1 = require("typeorm");
class CreateClientInteractionsTable1753360000025 {
    constructor() {
        this.name = 'CreateClientInteractionsTable1753360000025';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'client_interactions',
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
                    name: 'interaction_type',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'interaction_date',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'interacted_by',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'summary',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'notes',
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
        await queryRunner.createForeignKey('client_interactions', new typeorm_1.TableForeignKey({
            columnNames: ['client_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'clients',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('client_interactions', new typeorm_1.TableForeignKey({
            columnNames: ['interacted_by'],
            referencedColumnNames: ['id'],
            referencedTableName: 'employee_profiles',
            onDelete: 'SET NULL',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('client_interactions');
        const foreignKeyClient = table.foreignKeys.find((fk) => fk.columnNames.indexOf('client_id') !== -1);
        const foreignKeyInteractedBy = table.foreignKeys.find((fk) => fk.columnNames.indexOf('interacted_by') !== -1);
        if (foreignKeyClient)
            await queryRunner.dropForeignKey('client_interactions', foreignKeyClient);
        if (foreignKeyInteractedBy)
            await queryRunner.dropForeignKey('client_interactions', foreignKeyInteractedBy);
        await queryRunner.dropTable('client_interactions');
    }
}
exports.CreateClientInteractionsTable1753360000025 = CreateClientInteractionsTable1753360000025;
//# sourceMappingURL=1753360000025-CreateClientInteractionsTable.js.map