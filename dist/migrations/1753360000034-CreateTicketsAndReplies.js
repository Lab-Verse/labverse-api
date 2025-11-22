"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTicketsAndReplies1753360000034 = void 0;
class CreateTicketsAndReplies1753360000034 {
    constructor() {
        this.name = 'CreateTicketsAndReplies1753360000034';
    }
    async up(queryRunner) {
        await queryRunner.query(`

      DO $$ BEGIN

        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ticket_status_enum') THEN

          CREATE TYPE ticket_status_enum AS ENUM ('open', 'in_progress', 'closed', 'reopened');

        END IF;

      END $$;

    `);
        await queryRunner.query(`

      DO $$ BEGIN

        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ticket_priority_enum') THEN

          CREATE TYPE ticket_priority_enum AS ENUM ('low', 'medium', 'high', 'urgent');

        END IF;

      END $$;

    `);
        await queryRunner.query(`

      CREATE TABLE tickets (

        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

        "clientId" VARCHAR NOT NULL,

        subject VARCHAR NOT NULL,

        description TEXT NOT NULL,

        status ticket_status_enum DEFAULT 'open',

        priority ticket_priority_enum DEFAULT 'medium',

        "assignedTo" VARCHAR,

        "createdAt" TIMESTAMP DEFAULT now(),

        "updatedAt" TIMESTAMP DEFAULT now()

      )

    `);
        await queryRunner.query(`

      CREATE TABLE ticket_replies (

        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

        "ticketId" UUID NOT NULL,

        "senderId" VARCHAR NOT NULL,

        content TEXT NOT NULL,

        "isInternal" BOOLEAN DEFAULT FALSE,

        "createdAt" TIMESTAMP DEFAULT now(),

        "updatedAt" TIMESTAMP DEFAULT now(),

        CONSTRAINT fk_reply_ticket FOREIGN KEY ("ticketId") REFERENCES tickets(id) ON DELETE CASCADE

      )

    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS ticket_replies`);
        await queryRunner.query(`DROP TABLE IF EXISTS tickets`);
        await queryRunner.query(`DROP TYPE IF EXISTS ticket_priority_enum`);
        await queryRunner.query(`DROP TYPE IF EXISTS ticket_status_enum`);
    }
}
exports.CreateTicketsAndReplies1753360000034 = CreateTicketsAndReplies1753360000034;
//# sourceMappingURL=1753360000034-CreateTicketsAndReplies.js.map