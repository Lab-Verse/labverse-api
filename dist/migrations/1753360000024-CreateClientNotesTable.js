"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClientNotesTable1753360000024 = void 0;
const typeorm_1 = require("typeorm");
class CreateClientNotesTable1753360000024 {
    constructor() {
        this.name = 'CreateClientNotesTable1753360000024';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'client_notes',
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
                    name: 'author_id',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'note_content',
                    type: 'text',
                    isNullable: false,
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
        await queryRunner.createForeignKey('client_notes', new typeorm_1.TableForeignKey({
            columnNames: ['client_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'clients',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('client_notes', new typeorm_1.TableForeignKey({
            columnNames: ['author_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'employee_profiles',
            onDelete: 'SET NULL',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('client_notes');
        const foreignKeyClient = table.foreignKeys.find((fk) => fk.columnNames.indexOf('client_id') !== -1);
        const foreignKeyAuthor = table.foreignKeys.find((fk) => fk.columnNames.indexOf('author_id') !== -1);
        if (foreignKeyClient)
            await queryRunner.dropForeignKey('client_notes', foreignKeyClient);
        if (foreignKeyAuthor)
            await queryRunner.dropForeignKey('client_notes', foreignKeyAuthor);
        await queryRunner.dropTable('client_notes');
    }
}
exports.CreateClientNotesTable1753360000024 = CreateClientNotesTable1753360000024;
//# sourceMappingURL=1753360000024-CreateClientNotesTable.js.map