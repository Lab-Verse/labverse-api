"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateConversationsParticipantsMessages1753360000033 = void 0;
class CreateConversationsParticipantsMessages1753360000033 {
    constructor() {
        this.name = 'CreateConversationsParticipantsMessages1753360000033';
    }
    async up(queryRunner) {
        await queryRunner.query(`

      CREATE TABLE "conversations" (

        "id" uuid NOT NULL DEFAULT gen_random_uuid(),

        "name" character varying,

        "is_group_chat" boolean NOT NULL DEFAULT false,

        "created_at" TIMESTAMP NOT NULL DEFAULT now(),

        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),

        CONSTRAINT "PK_5569427b37013824f9104de4c71" PRIMARY KEY ("id")

      )

    `);
        await queryRunner.query(`

      CREATE TABLE "messages" (

        "id" uuid NOT NULL DEFAULT gen_random_uuid(),

        "conversation_id" uuid NOT NULL,

        "sender_id" character varying NOT NULL,

        "content" text NOT NULL,

        "message_type" character varying NOT NULL DEFAULT 'text',

        "created_at" TIMESTAMP NOT NULL DEFAULT now(),

        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),

        CONSTRAINT "PK_18325f38ae60c84181a4d46e098" PRIMARY KEY ("id")

      )

    `);
        await queryRunner.query(`

      CREATE TABLE "conversation_participants" (

        "id" uuid NOT NULL DEFAULT gen_random_uuid(),

        "conversation_id" uuid NOT NULL,

        "user_id" character varying NOT NULL,

        "last_read_message_id" uuid,

        "joined_at" TIMESTAMP NOT NULL DEFAULT now(),

        "created_at" TIMESTAMP NOT NULL DEFAULT now(),

        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),

        CONSTRAINT "PK_7893b8f2d5930602330e7048325" PRIMARY KEY ("id")

      )

    `);
        await queryRunner.query(`

      ALTER TABLE "messages" ADD CONSTRAINT "FK_c9688432a29d5b0c95029e2467d" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE NO ACTION

    `);
        await queryRunner.query(`

      ALTER TABLE "conversation_participants" ADD CONSTRAINT "FK_286419f96b341f48039c9413222" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE NO ACTION

    `);
        await queryRunner.query(`

      ALTER TABLE "conversation_participants" ADD CONSTRAINT "FK_55726210f81d1152a5598285514" FOREIGN KEY ("last_read_message_id") REFERENCES "messages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION

    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "conversation_participants" DROP CONSTRAINT "FK_55726210f81d1152a5598285514"`);
        await queryRunner.query(`ALTER TABLE "conversation_participants" DROP CONSTRAINT "FK_286419f96b341f48039c9413222"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_c9688432a29d5b0c95029e2467d"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "conversation_participants"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "messages"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "conversations"`);
    }
}
exports.CreateConversationsParticipantsMessages1753360000033 = CreateConversationsParticipantsMessages1753360000033;
//# sourceMappingURL=1753360000033-CreateConversationsParticipantsMessages.js.map