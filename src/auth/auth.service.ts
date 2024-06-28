import { BadRequestException, Injectable } from "@nestjs/common";
import { SignUpRequestDto } from "./dto/signUp.request.dto";
import { UsersRepository } from "src/user/user.repository";
import * as jwt from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import { UsersEntity } from "src/entities/users.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly configService: ConfigService,
    private readonly dataSoruce: DataSource,
  ) {}

  async signUp(signUpDto: SignUpRequestDto) {
    const queryRunner = this.dataSoruce.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    // user 테이블에 회원정보 추가
    // 추가된 userId로 user_association 테이블 내용 추가
    // 회원가입 시, team에 대한 정보도 추가 될 수 있지만 한 번에 이루어지는 로직은 아니기 때문에
    // 하나의 트랜잭션으로 묶지는 않음.
    try {
      const {
        email,
        nickname,
        password,
        name,
        phoneNumber,
        teamId = null,
        role,
      } = signUpDto;

      const newUser = await queryRunner.manager.insert(UsersEntity, {
        email,
        nickname,
        password,
        name,
        phoneNumber,
      });

      const userId = newUser.raw["insertId"];

      const refreshToken = this.createRefreshToken(userId);
      const accessToken = this.createAccessToken(userId);

      await queryRunner.manager.update(UsersEntity, userId, { refreshToken });

      /**
       * 팀 검색 후, 존재하는 팀이면 user_association에 userId, teamId, roleId (role 테이블 검색), isConfirm은 false
       * 없으면 throw new Error하면 catch에서 받아서 에러 반환
       */
      if (teamId) {
      }

      await queryRunner.commitTransaction();
      return accessToken;
    } catch (error) {
      // if (error.sqlState === "example1") {
      //   throw new BadRequestException("example message1");
      // }

      // if (error.sqlState === "example2") {
      //   throw new BadRequestException("example message2");
      // }

      await queryRunner.rollbackTransaction();
      throw new BadRequestException("sign_up_fail");
    } finally {
      await queryRunner.release();
    }
  }

  createRefreshToken(userId: number) {
    const payload = {
      id: userId,
    };

    const secretKey: string = this.configService.get(
      "JWT_REFRESH_TOKEN_SECRET_KEY",
    );

    const expiresIn: string = this.configService.get(
      "JWT_REFRESH_TOKEN_EXPIRATION_TIME",
    );

    const token = jwt.sign(payload, secretKey, { expiresIn });

    return token;
  }

  createAccessToken(userId: number) {
    const payload = {
      id: userId,
    };

    const secretKey: string = this.configService.get(
      "JWT_ACCESS_TOKEN_SECRET_KEY",
    );

    const expiresIn: string = this.configService.get(
      "JWT_ACCESS_TOKEN_EXPIRATION_TIME",
    );

    const token = jwt.sign(payload, secretKey, { expiresIn });

    return token;
  }
}
