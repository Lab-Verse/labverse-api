"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLeadsTable1753360000026 = void 0;
const typeorm_1 = require("typeorm");
class CreateLeadsTable1753360000026 {
    constructor() {
        this.name = 'CreateLeadsTable1753360000026';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'leads',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    default: 'gen_random_uuid()',
                },
                {
                    name: 'company_name',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'contact_person_name',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'phone_number',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'notes',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'status',
                    type: 'varchar',
                    default: `'New'`,
                    isNullable: false,
                },
                {
                    name: 'assigned_to',
                    type: 'uuid',
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
        await queryRunner.createForeignKey('leads', new typeorm_1.TableForeignKey({
            columnNames: ['assigned_to'],
            referencedColumnNames: ['id'],
            referencedTableName: 'employee_profiles',
            onDelete: 'SET NULL',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('leads');
        const foreignKeyAssignedTo = table.foreignKeys.find((fk) => fk.columnNames.indexOf('assigned_to') !== -1);
        if (foreignKeyAssignedTo)
            await queryRunner.dropForeignKey('leads', foreignKeyAssignedTo);
        await queryRunner.dropTable('leads');
    }
}
exports.CreateLeadsTable1753360000026 = CreateLeadsTable1753360000026;
//# sourceMappingURL=1753360000026-CreateLeadsTable.js.map