"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClientsTable1753359999999 = void 0;
const typeorm_1 = require("typeorm");
class CreateClientsTable1753359999999 {
    constructor() {
        this.name = 'CreateClientsTable1753359999999';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'clients',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    default: 'gen_random_uuid()',
                },
                {
                    name: 'profile_photo',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                    isUnique: true,
                },
                {
                    name: 'phone',
                    type: 'varchar',
                    length: '50',
                    isNullable: true,
                },
                {
                    name: 'company',
                    type: 'varchar',
                    length: '100',
                    isNullable: true,
                },
                {
                    name: 'address',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'website',
                    type: 'varchar',
                    length: '255',
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
        await queryRunner.dropTable('clients');
    }
}
exports.CreateClientsTable1753359999999 = CreateClientsTable1753359999999;
//# sourceMappingURL=1753359999999-CreateClientsTable.js.map