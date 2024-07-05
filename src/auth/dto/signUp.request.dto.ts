import { ApiProperty } from "@nestjs/swagger";
import { USER_ROLE, userRole } from "./../../common/constant/userRole";
import { IsEmail, IsEnum, IsOptional, Matches } from "class-validator";
import {
  IsNumberWithErrorMessage,
  IsStringWithErrorMessage,
} from "src/common/decorator/dtoValidator.decorator";

export class SignUpRequestDto {
  @IsEmail()
  @IsStringWithErrorMessage()
  @ApiProperty({
    description: "유저 email",
    required: true,
    example: "aaa@example.com",
  })
  email: string;

  @IsStringWithErrorMessage()
  @Matches(/^[가-힣a-zA-Z0-9_-]{2,12}$/)
  @ApiProperty({
    description: "유저 nickname",
    required: true,
    example: "홍길동",
  })
  nickname: string;

  @IsStringWithErrorMessage()
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*?_]).{6,20}$/)
  @ApiProperty({
    description: "유저 password",
    required: true,
    example: "Password12345!",
  })
  password: string;

  @IsStringWithErrorMessage()
  @ApiProperty({
    description: "유저 이름",
    required: true,
    example: "홍길동",
  })
  name: string;

  @IsStringWithErrorMessage()
  @Matches(/^[0-9]+$/)
  @ApiProperty({
    description: "유저 핸드폰 번호 (- 제외 숫자만)",
    required: true,
    example: "01012345678",
  })
  phoneNumber: string;

  @IsOptional()
  @IsNumberWithErrorMessage()
  @ApiProperty({
    description: "소속될 팀의 id (number type)",
    example: 1,
    nullable: true,
  })
  teamId?: number | null;

  @IsOptional()
  @IsStringWithErrorMessage()
  @IsEnum(USER_ROLE)
  @ApiProperty({
    description: "소속팀에서의 역할",
    enum: USER_ROLE,
    nullable: true,
  })
  role?: userRole | null;
}
