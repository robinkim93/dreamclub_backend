import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersEntity } from "src/entities/users.entity";
import { UsersRepository } from "src/user/user.repository";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository, ConfigService],
})
export class AuthModule {}
