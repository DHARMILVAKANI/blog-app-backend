import { MigrationInterface, QueryRunner } from 'typeorm';

export class TableCategoriesAndTags1711827180700 implements MigrationInterface {
  name = 'TableCategoriesAndTags1711827180700';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Category" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedBy" character varying(300), "deletedAt" TIMESTAMP, "deletedBy" character varying(255), "name" character varying NOT NULL, CONSTRAINT "PK_c2727780c5b9b0c564c29a4977c" PRIMARY KEY ("id"))`,
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
      `ALTER TABLE "post_categories" ADD CONSTRAINT "FK_9bd6598aa52c1550ed7707a71b9" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_categories" ADD CONSTRAINT "FK_b65c475f56d0e375ef192564266" FOREIGN KEY ("postsId") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
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
    await queryRunner.query(`DROP TABLE "Category"`);
  }
}
