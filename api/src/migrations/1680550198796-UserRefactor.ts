import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserRefactor1680550198796 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user RENAME COLUMN "username" TO "name"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user RENAME COLUMN "name" TO "username"`,
    );
  }
}
