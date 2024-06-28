import { USER_ROLE, userRole } from "./../../common/constant/userRole";
import { IsEmail, IsEnum, IsOptional } from "class-validator";
import {
  IsNumberWithErrorMessage,
  IsStringWithErrorMessage,
} from "src/common/decorator/dtoValidator.decorator";

export class SignUpRequestDto {
  @IsEmail()
  @IsStringWithErrorMessage()
  email: string;

  @IsStringWithErrorMessage()
  nickname: string;

  @IsStringWithErrorMessage()
  password: string;

  @IsStringWithErrorMessage()
  name: string;

  @IsStringWithErrorMessage()
  phoneNumber: string;

  @IsOptional()
  @IsNumberWithErrorMessage()
  teamId?: number | null;

  @IsStringWithErrorMessage()
  @IsEnum(USER_ROLE)
  role: userRole;
}
