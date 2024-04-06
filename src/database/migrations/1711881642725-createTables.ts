import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1711881642725 implements MigrationInterface {
  name = 'CreateTables1711881642725';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "UserPassword" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedBy" character varying(300), "deletedAt" TIMESTAMP, "deletedBy" character varying(255), "passwordHash" character varying NOT NULL, "userId" integer, CONSTRAINT "REL_233f86b6494c8a29b643f2d54d" UNIQUE ("userId"), CONSTRAINT "PK_b955c3f9fe514b69ad164a49841" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Category" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedBy" character varying(300), "deletedAt" TIMESTAMP, "deletedBy" character varying(255), "name" character varying NOT NULL, CONSTRAINT "PK_c2727780c5b9b0c564c29a4977c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Posts" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedBy" character varying(300), "deletedAt" TIMESTAMP, "deletedBy" character varying(255), "title" character varying NOT NULL, "content" text NOT NULL, "isPublished" boolean NOT NULL DEFAULT false, "userId" integer, CONSTRAINT "PK_0f050d6d1112b2d07545b43f945" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "User" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedBy" character varying(300), "deletedAt" TIMESTAMP, "deletedBy" character varying(255), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "bio" character varying, "profilePicture" character varying, CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e" UNIQUE ("email"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "LoginHistory" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedBy" character varying(300), "deletedAt" TIMESTAMP, "deletedBy" character varying(255), "token" text NOT NULL, "type" "public"."LoginHistory_type_enum" NOT NULL DEFAULT 'Web', "isActive" boolean NOT NULL DEFAULT true, "userId" integer, CONSTRAINT "PK_ea9fbee4ef493c45b025accf242" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Tag" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedBy" character varying(300), "deletedAt" TIMESTAMP, "deletedBy" character varying(255), "name" character varying NOT NULL, CONSTRAINT "PK_00bd1ec314f664289873394731a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "post_categories" ("categoryId" integer NOT NULL, "postsId" integer NOT NULL, CONSTRAINT "PK_96d3e2205cab1fb94587fa984a1" PRIMARY KEY ("categoryId", "postsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9bd6598aa52c1550ed7707a71b" ON "post_categories" ("categoryId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b65c475f56d0e375ef19256426" ON "post_categories" ("postsId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "post_tags" ("tagId" integer NOT NULL, "postsId" integer NOT NULL, CONSTRAINT "PK_febe642c9a9dc9dc3520197b7d6" PRIMARY KEY ("tagId", "postsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_86fabcae8483f7cc4fbd36cf6a" ON "post_tags" ("tagId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e989388f06246063f9af179809" ON "post_tags" ("postsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "UserPassword" ADD CONSTRAINT "FK_233f86b6494c8a29b643f2d54d8" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Posts" ADD CONSTRAINT "FK_a8237eded7a9a311081b65ed0b8" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "LoginHistory" ADD CONSTRAINT "FK_009c9d4faf97d8c5be059171e79" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_categories" ADD CONSTRAINT "FK_9bd6598aa52c1550ed7707a71b9" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_categories" ADD CONSTRAINT "FK_b65c475f56d0e375ef192564266" FOREIGN KEY ("postsId") REFERENCES "Posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_tags" ADD CONSTRAINT "FK_86fabcae8483f7cc4fbd36cf6a2" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_tags" ADD CONSTRAINT "FK_e989388f06246063f9af1798098" FOREIGN KEY ("postsId") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post_tags" DROP CONSTRAINT "FK_e989388f06246063f9af1798098"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_tags" DROP CONSTRAINT "FK_86fabcae8483f7cc4fbd36cf6a2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_categories" DROP CONSTRAINT "FK_b65c475f56d0e375ef192564266"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_categories" DROP CONSTRAINT "FK_9bd6598aa52c1550ed7707a71b9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "LoginHistory" DROP CONSTRAINT "FK_009c9d4faf97d8c5be059171e79"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Posts" DROP CONSTRAINT "FK_a8237eded7a9a311081b65ed0b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "UserPassword" DROP CONSTRAINT "FK_233f86b6494c8a29b643f2d54d8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e989388f06246063f9af179809"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_86fabcae8483f7cc4fbd36cf6a"`,
    );
    await queryRunner.query(`DROP TABLE "post_tags"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b65c475f56d0e375ef19256426"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9bd6598aa52c1550ed7707a71b"`,
    );
    await queryRunner.query(`DROP TABLE "post_categories"`);
    await queryRunner.query(`DROP TABLE "Tag"`);
    await queryRunner.query(`DROP TABLE "LoginHistory"`);
    await queryRunner.query(`DROP TABLE "User"`);
    await queryRunner.query(`DROP TABLE "Posts"`);
    await queryRunner.query(`DROP TABLE "Category"`);
    await queryRunner.query(`DROP TABLE "UserPassword"`);
  }
}
