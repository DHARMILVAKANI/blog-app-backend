import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableForPosts1711563897619 implements MigrationInterface {
  name = 'CreateTableForPosts1711563897619';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Posts" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedBy" character varying(300), "deletedAt" TIMESTAMP, "deletedBy" character varying(255), "title" character varying NOT NULL, "content" text NOT NULL, "isPublished" boolean NOT NULL, "userId" integer, CONSTRAINT "PK_0f050d6d1112b2d07545b43f945" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "Posts" ADD CONSTRAINT "FK_a8237eded7a9a311081b65ed0b8" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Posts" DROP CONSTRAINT "FK_a8237eded7a9a311081b65ed0b8"`,
    );
    await queryRunner.query(`DROP TABLE "Posts"`);
  }
}
