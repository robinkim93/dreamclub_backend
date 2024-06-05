import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UserModule } from "./user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeORMConfig } from "./common/config/typeORM.config";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, TypeOrmModule.forRootAsync(typeORMConfig), AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
