import { MigrationInterface, QueryRunner } from 'typeorm';

export class NameOfMigration1751816662415 implements MigrationInterface {
  name = 'NameOfMigration1751816662415';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cat" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "age" integer NOT NULL, "breed" character varying NOT NULL, CONSTRAINT "PK_7704d5c2c0250e4256935ae31b4" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "cat"`);
  }
}
