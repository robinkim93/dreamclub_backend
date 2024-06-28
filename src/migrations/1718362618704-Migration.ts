import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1718362618704 implements MigrationInterface {
    name = 'Migration1718362618704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NULL COMMENT 'access token 만료 시, 검증 token'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NOT NULL COMMENT 'access token 만료 시, 검증 token'`);
    }

}
