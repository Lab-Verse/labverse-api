"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBlogPostsTable1753360000027 = void 0;
const typeorm_1 = require("typeorm");
class CreateBlogPostsTable1753360000027 {
    constructor() {
        this.name = 'CreateBlogPostsTable1753360000027';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'blog_posts',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    default: 'gen_random_uuid()',
                },
                {
                    name: 'title',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'slug',
                    type: 'varchar',
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'content',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'author_id',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'category_id',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'thumbnail_url',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'is_published',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'published_at',
                    type: 'timestamp',
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
        await queryRunner.createForeignKey('blog_posts', new typeorm_1.TableForeignKey({
            columnNames: ['author_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'employee_profiles',
            onDelete: 'SET NULL',
        }));
        await queryRunner.createForeignKey('blog_posts', new typeorm_1.TableForeignKey({
            columnNames: ['category_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'categories',
            onDelete: 'SET NULL',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('blog_posts');
        const foreignKeyAuthor = table.foreignKeys.find((fk) => fk.columnNames.indexOf('author_id') !== -1);
        const foreignKeyCategory = table.foreignKeys.find((fk) => fk.columnNames.indexOf('category_id') !== -1);
        if (foreignKeyAuthor)
            await queryRunner.dropForeignKey('blog_posts', foreignKeyAuthor);
        if (foreignKeyCategory)
            await queryRunner.dropForeignKey('blog_posts', foreignKeyCategory);
        await queryRunner.dropTable('blog_posts');
    }
}
exports.CreateBlogPostsTable1753360000027 = CreateBlogPostsTable1753360000027;
//# sourceMappingURL=1753360000027-CreateBlogPostsTable.js.map