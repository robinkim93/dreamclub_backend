import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1717504325967 implements MigrationInterface {
    name = 'Migration1717504325967'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`post_like\` (\`id\` int NOT NULL AUTO_INCREMENT, \`post_id\` int NOT NULL COMMENT '글 번호', \`user_id\` int NOT NULL COMMENT '유저 번호', \`created_at\` timestamp(6) NOT NULL COMMENT '생성일자' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL COMMENT '수정일자' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL COMMENT '삭제일자', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`post_view\` (\`id\` int NOT NULL AUTO_INCREMENT, \`post_id\` int NOT NULL COMMENT '글 번호', \`user_id\` int NOT NULL COMMENT '유저 번호', \`created_at\` timestamp(6) NOT NULL COMMENT '생성일자' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL COMMENT '수정일자' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL COMMENT '삭제일자', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sports\` (\`id\` int NOT NULL AUTO_INCREMENT, \`sport\` varchar(255) NOT NULL COMMENT '종목명', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`teams\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL COMMENT '팀명', \`logo_url\` varchar(255) NULL COMMENT '팀 로고 파일 url', \`introduce\` varchar(255) NULL COMMENT '한 줄 소개', \`since\` timestamp NOT NULL COMMENT '창단일', \`sports_id\` int NOT NULL COMMENT '종목 번호', \`created_at\` timestamp(6) NOT NULL COMMENT '생성일자' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL COMMENT '수정일자' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL COMMENT '삭제일자', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`posts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL COMMENT '제목', \`content\` varchar(255) NOT NULL COMMENT '내용', \`file_url\` varchar(255) NULL COMMENT '첨부 파일 url', \`user_id\` int NOT NULL COMMENT '유저 번호', \`is_notice\` tinyint NOT NULL COMMENT '공지글 여부' DEFAULT '0', \`is_secret\` tinyint NOT NULL COMMENT '비밀글 여부' DEFAULT '0', \`password\` varchar(255) NULL COMMENT '비밀번호', \`team_id\` int NULL COMMENT '팀 번호', \`created_at\` timestamp(6) NOT NULL COMMENT '생성일자' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL COMMENT '수정일자' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL COMMENT '삭제일자', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` varchar(255) NOT NULL COMMENT '내용', \`user_id\` int NOT NULL COMMENT '유저 번호', \`created_at\` timestamp(6) NOT NULL COMMENT '생성일자' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL COMMENT '수정일자' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL COMMENT '삭제일자', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comment_like\` (\`id\` int NOT NULL AUTO_INCREMENT, \`comment_id\` int NOT NULL COMMENT '댓글 번호', \`user_id\` int NOT NULL COMMENT '유저 번호', \`created_at\` timestamp(6) NOT NULL COMMENT '생성일자' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL COMMENT '수정일자' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL COMMENT '삭제일자', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL COMMENT '이메일', \`nickname\` varchar(255) NOT NULL COMMENT '닉네임', \`password\` varchar(255) NOT NULL COMMENT '비밀번호', \`name\` varchar(255) NOT NULL COMMENT '이름', \`phone_number\` varchar(255) NOT NULL COMMENT '핸드폰 번호', \`refresh_token\` varchar(255) NOT NULL COMMENT 'access token 만료 시, 검증 token', \`created_at\` timestamp(6) NOT NULL COMMENT '생성일자' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL COMMENT '수정일자' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL COMMENT '삭제일자', UNIQUE INDEX \`IDX_17d1817f241f10a3dbafb169fd\` (\`phone_number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`role\` varchar(255) NOT NULL COMMENT '역할명', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_association\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL COMMENT '유저 번호', \`team_id\` int NULL COMMENT '팀 번호', \`role_id\` int NOT NULL COMMENT '역할 번호', \`is_confirm\` tinyint NOT NULL COMMENT '승인 여부 (0: 미승인, 1: 승인)' DEFAULT '0', \`created_at\` timestamp(6) NOT NULL COMMENT '생성일자' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL COMMENT '수정일자' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL COMMENT '삭제일자', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`post_like\` ADD CONSTRAINT \`FK_c635b15915984c8cdb520a1fef3\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post_like\` ADD CONSTRAINT \`FK_a7ec6ac3dc7a05a9648c418f1ad\` FOREIGN KEY (\`post_id\`) REFERENCES \`posts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post_view\` ADD CONSTRAINT \`FK_74891cf0e56d9f942c8d55babd0\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post_view\` ADD CONSTRAINT \`FK_72c52f1354467735fb51efef486\` FOREIGN KEY (\`post_id\`) REFERENCES \`posts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`teams\` ADD CONSTRAINT \`FK_bce92c7fe209f49dad0f4fa9d93\` FOREIGN KEY (\`sports_id\`) REFERENCES \`sports\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_c4f9a7bd77b489e711277ee5986\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_2f40b36f3917816f01d901e64bf\` FOREIGN KEY (\`team_id\`) REFERENCES \`teams\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_4c675567d2a58f0b07cef09c13d\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment_like\` ADD CONSTRAINT \`FK_fd7207639a77fa0f1fea8943b78\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment_like\` ADD CONSTRAINT \`FK_4a0c128374ff87d4641cab920f0\` FOREIGN KEY (\`comment_id\`) REFERENCES \`comments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_association\` ADD CONSTRAINT \`FK_79623e791435e55819ba82e28e0\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_association\` ADD CONSTRAINT \`FK_dc9d298ad060e077258f33dbf81\` FOREIGN KEY (\`team_id\`) REFERENCES \`teams\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_association\` ADD CONSTRAINT \`FK_20f0d571bf47bd52cc5e52c5fff\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE TABLE \`query-result-cache\` (\`id\` int NOT NULL AUTO_INCREMENT, \`identifier\` varchar(255) NULL, \`time\` bigint NOT NULL, \`duration\` int NOT NULL, \`query\` text NOT NULL, \`result\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`query-result-cache\``);
        await queryRunner.query(`ALTER TABLE \`user_association\` DROP FOREIGN KEY \`FK_20f0d571bf47bd52cc5e52c5fff\``);
        await queryRunner.query(`ALTER TABLE \`user_association\` DROP FOREIGN KEY \`FK_dc9d298ad060e077258f33dbf81\``);
        await queryRunner.query(`ALTER TABLE \`user_association\` DROP FOREIGN KEY \`FK_79623e791435e55819ba82e28e0\``);
        await queryRunner.query(`ALTER TABLE \`comment_like\` DROP FOREIGN KEY \`FK_4a0c128374ff87d4641cab920f0\``);
        await queryRunner.query(`ALTER TABLE \`comment_like\` DROP FOREIGN KEY \`FK_fd7207639a77fa0f1fea8943b78\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_4c675567d2a58f0b07cef09c13d\``);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_2f40b36f3917816f01d901e64bf\``);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_c4f9a7bd77b489e711277ee5986\``);
        await queryRunner.query(`ALTER TABLE \`teams\` DROP FOREIGN KEY \`FK_bce92c7fe209f49dad0f4fa9d93\``);
        await queryRunner.query(`ALTER TABLE \`post_view\` DROP FOREIGN KEY \`FK_72c52f1354467735fb51efef486\``);
        await queryRunner.query(`ALTER TABLE \`post_view\` DROP FOREIGN KEY \`FK_74891cf0e56d9f942c8d55babd0\``);
        await queryRunner.query(`ALTER TABLE \`post_like\` DROP FOREIGN KEY \`FK_a7ec6ac3dc7a05a9648c418f1ad\``);
        await queryRunner.query(`ALTER TABLE \`post_like\` DROP FOREIGN KEY \`FK_c635b15915984c8cdb520a1fef3\``);
        await queryRunner.query(`DROP TABLE \`user_association\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_17d1817f241f10a3dbafb169fd\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`comment_like\``);
        await queryRunner.query(`DROP TABLE \`comments\``);
        await queryRunner.query(`DROP TABLE \`posts\``);
        await queryRunner.query(`DROP TABLE \`teams\``);
        await queryRunner.query(`DROP TABLE \`sports\``);
        await queryRunner.query(`DROP TABLE \`post_view\``);
        await queryRunner.query(`DROP TABLE \`post_like\``);
    }

}
