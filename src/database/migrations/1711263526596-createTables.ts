import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1711263526596 implements MigrationInterface {
  name = 'CreateTables1711263526596';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."LoginHistory_type_enum" AS ENUM('Web', 'Android', 'iOS')`,
    );
    await queryRunner.query(
      `CREATE TABLE "LoginHistory" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedBy" character varying(300), "deletedAt" TIMESTAMP, "deletedBy" character varying(255), "token" text NOT NULL, "type" "public"."LoginHistory_type_enum" NOT NULL DEFAULT 'Web', "isActive" boolean NOT NULL DEFAULT false, "userId" integer, CONSTRAINT "PK_ea9fbee4ef493c45b025accf242" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "User" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedBy" character varying(300), "deletedAt" TIMESTAMP, "deletedBy" character varying(255), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "bio" character varying, "profilePicture" character varying, CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e" UNIQUE ("email"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "UserPassword" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedBy" character varying(300), "deletedAt" TIMESTAMP, "deletedBy" character varying(255), "passwordHash" character varying NOT NULL, "userId" integer, CONSTRAINT "REL_233f86b6494c8a29b643f2d54d" UNIQUE ("userId"), CONSTRAINT "PK_b955c3f9fe514b69ad164a49841" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "LoginHistory" ADD CONSTRAINT "FK_009c9d4faf97d8c5be059171e79" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "UserPassword" ADD CONSTRAINT "FK_233f86b6494c8a29b643f2d54d8" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "UserPassword" DROP CONSTRAINT "FK_233f86b6494c8a29b643f2d54d8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "LoginHistory" DROP CONSTRAINT "FK_009c9d4faf97d8c5be059171e79"`,
    );
    await queryRunner.query(`DROP TABLE "UserPassword"`);
    await queryRunner.query(`DROP TABLE "User"`);
    await queryRunner.query(`DROP TABLE "LoginHistory"`);
    await queryRunner.query(`DROP TYPE "public"."LoginHistory_type_enum"`);
  }
}
