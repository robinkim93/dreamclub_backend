import { userRole, USER_ROLE } from "./../../common/constant/userRole";
import { IsEmail, IsEnum, IsOptional } from "class-validator";
import { IsStringWithErrorMessage } from "src/common/decorator/dtoValidator.decorator";

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
  @IsStringWithErrorMessage()
  team?: string | null;

  @IsStringWithErrorMessage()
  @IsEnum(USER_ROLE)
  role: userRole;
}
