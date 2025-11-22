"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateContactInquiriesTable1753360000032 = void 0;
const typeorm_1 = require("typeorm");
class CreateContactInquiriesTable1753360000032 {
    constructor() {
        this.name = 'CreateContactInquiriesTable1753360000032';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'contact_inquiries',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    default: 'gen_random_uuid()',
                },
                {
                    name: 'full_name',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'phone_number',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'subject',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'message',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'status',
                    type: 'varchar',
                    default: `'New'`,
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
    }
    async down(queryRunner) {
        await queryRunner.dropTable('contact_inquiries');
    }
}
exports.CreateContactInquiriesTable1753360000032 = CreateContactInquiriesTable1753360000032;
//# sourceMappingURL=1753360000032-CreateContactInquiriesTable.js.map