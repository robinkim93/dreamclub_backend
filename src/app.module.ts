import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UserModule } from "./user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeORMConfig } from "./common/config/typeORM.config";

@Module({
  imports: [UserModule, TypeOrmModule.forRootAsync(typeORMConfig)],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
