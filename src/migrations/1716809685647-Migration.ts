import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1716809685647 implements MigrationInterface {
    name = 'Migration1716809685647'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_association\` ADD CONSTRAINT \`FK_dc9d298ad060e077258f33dbf81\` FOREIGN KEY (\`team_id\`) REFERENCES \`teams\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_association\` ADD CONSTRAINT \`FK_20f0d571bf47bd52cc5e52c5fff\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_association\` DROP FOREIGN KEY \`FK_20f0d571bf47bd52cc5e52c5fff\``);
        await queryRunner.query(`ALTER TABLE \`user_association\` DROP FOREIGN KEY \`FK_dc9d298ad060e077258f33dbf81\``);
    }

}
