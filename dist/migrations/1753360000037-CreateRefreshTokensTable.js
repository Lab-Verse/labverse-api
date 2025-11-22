"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRefreshTokensTable1753360000037 = void 0;
class CreateRefreshTokensTable1753360000037 {
    constructor() {
        this.name = 'CreateRefreshTokensTable1753360000037';
    }
    async up(queryRunner) {
        await queryRunner.query(`

      CREATE TABLE IF NOT EXISTS refresh_tokens (

        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

        token VARCHAR NOT NULL,

        user_id UUID NOT NULL,

        expires_at TIMESTAMP NOT NULL,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        is_revoked BOOLEAN DEFAULT FALSE,

        CONSTRAINT fk_refresh_tokens_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE

      );

    `);
        await queryRunner.query(`

      CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON refresh_tokens(user_id);

    `);
        await queryRunner.query(`

      CREATE INDEX IF NOT EXISTS idx_refresh_tokens_token ON refresh_tokens(token);

    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX IF EXISTS idx_refresh_tokens_token;`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_refresh_tokens_user_id;`);
        await queryRunner.query(`DROP TABLE IF EXISTS refresh_tokens;`);
    }
}
exports.CreateRefreshTokensTable1753360000037 = CreateRefreshTokensTable1753360000037;
//# sourceMappingURL=1753360000037-CreateRefreshTokensTable.js.map