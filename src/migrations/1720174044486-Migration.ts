import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1720174044486 implements MigrationInterface {
    name = 'Migration1720174044486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_ad02a1be8707004cb805a4b502\` (\`nickname\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_ad02a1be8707004cb805a4b502\``);
    }

}
