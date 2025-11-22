"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTestimonialsTable1753360000031 = void 0;
const typeorm_1 = require("typeorm");
class CreateTestimonialsTable1753360000031 {
    constructor() {
        this.name = 'CreateTestimonialsTable1753360000031';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'testimonials',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    default: 'gen_random_uuid()',
                },
                {
                    name: 'quote_content',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'author_name',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'author_title_company',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'author_avatar_url',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'is_approved',
                    type: 'boolean',
                    default: false,
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
        await queryRunner.dropTable('testimonials');
    }
}
exports.CreateTestimonialsTable1753360000031 = CreateTestimonialsTable1753360000031;
//# sourceMappingURL=1753360000031-CreateTestimonialsTable.js.map