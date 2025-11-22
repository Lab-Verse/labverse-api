"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClientApprovals1753360000035 = void 0;
class CreateClientApprovals1753360000035 {
    constructor() {
        this.name = 'CreateClientApprovals1753360000035';
    }
    async up(queryRunner) {
        await queryRunner.query(`

      DO $$ BEGIN

        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'approval_status_enum') THEN

          CREATE TYPE approval_status_enum AS ENUM ('pending', 'approved', 'rejected');

        END IF;

      END $$;

    `);
        await queryRunner.query(`

      CREATE TABLE client_approvals (

        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

        "clientId" VARCHAR NOT NULL,

        "deliverableId" VARCHAR NOT NULL,

        "requestDetails" TEXT NOT NULL,

        status approval_status_enum DEFAULT 'pending',

        "responseNotes" TEXT,

        "requestedAt" TIMESTAMP DEFAULT now(),

        "respondedAt" TIMESTAMP,

        "createdAt" TIMESTAMP DEFAULT now(),

        "updatedAt" TIMESTAMP DEFAULT now()

      )

    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS client_approvals`);
        await queryRunner.query(`DROP TYPE IF EXISTS approval_status_enum`);
    }
}
exports.CreateClientApprovals1753360000035 = CreateClientApprovals1753360000035;
//# sourceMappingURL=1753360000035-CreateClientApprovals.js.map