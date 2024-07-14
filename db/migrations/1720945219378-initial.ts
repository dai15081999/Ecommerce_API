import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1720945219378 implements MigrationInterface {
    name = 'Initial1720945219378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "roles" SET DEFAULT '{admin}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "roles" SET DEFAULT '{user}'`);
    }

}
