"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenameCreatorIdToClientId1753360000039 = void 0;
class RenameCreatorIdToClientId1753360000039 {
    constructor() {
        this.name = 'RenameCreatorIdToClientId1753360000039';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "projects" RENAME COLUMN "creator_id" TO "client_id"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "projects" RENAME COLUMN "client_id" TO "creator_id"`);
    }
}
exports.RenameCreatorIdToClientId1753360000039 = RenameCreatorIdToClientId1753360000039;
//# sourceMappingURL=1753360000039-RenameCreatorIdToClientId.js.map