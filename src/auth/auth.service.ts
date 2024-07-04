import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { SignUpRequestDto } from "./dto/signUp.request.dto";
import { UsersRepository } from "src/user/user.repository";
import * as jwt from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import { UsersEntity } from "src/entities/users.entity";
import { userRoleMappingObj } from "src/common/constant/userRole";
import { UserAssociationEntity } from "src/entities/userAssociation.entity";
import { TeamsEntity } from "src/entities/teams.entity";
import * as bcrypt from "bcrypt";

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
        role = null,
      } = signUpDto;

      const newUser = await queryRunner.manager.save(UsersEntity, {
        email,
        nickname,
        password: await this.hashPassword(password),
        name,
        phoneNumber,
      });

      const userId = newUser.id;

      const refreshToken = this.createRefreshToken(newUser);
      const accessToken = this.createAccessToken(newUser);

      await queryRunner.manager.update(UsersEntity, userId, {
        refreshToken,
      });

      /**
       * 팀 검색 후, 존재하는 팀이면 user_association에 userId, teamId, roleId (role 테이블 검색), isConfirm은 false
       * 없으면 throw new Error하면 catch에서 받아서 에러 반환
       */
      // if (teamId || role) {
      //   const isCheckInvalidTeam = await queryRunner.manager.exists(
      //     TeamsEntity,
      //     { where: { id: teamId } },
      //   );

      //   if (!isCheckInvalidTeam) {
      //     throw new NotFoundException("invalid team");
      //   }

      //   const roleId = userRoleMappingObj[role];

      //   await queryRunner.manager.insert(UserAssociationEntity, {
      //     userId,
      //     teamId,
      //     roleId,
      //     isConfirm: 0,
      //   });
      // }

      await queryRunner.commitTransaction();
      return accessToken;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (error instanceof NotFoundException) {
        throw new BadRequestException("invalid_team");
      }

      throw new BadRequestException("sign_up_fail");
    } finally {
      await queryRunner.release();
    }
  }

  createRefreshToken(newUser: UsersEntity) {
    const payload = {
      id: newUser.id,
      createdAt: newUser.createdAt,
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

  createAccessToken(newUser: UsersEntity) {
    const payload = {
      id: newUser.id,
      createdAt: newUser.createdAt,
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

  /**
   * bcrypt 사용해서 비밀번호 암호화
   * @param password
   */
  async hashPassword(password: string): Promise<string> {
    const hashedPassword: string = await bcrypt.hash(
      password,
      +this.configService.get("SALT_ROUND"),
    );

    return hashedPassword;
  }
}
