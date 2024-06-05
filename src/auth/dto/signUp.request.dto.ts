import { IsOptional } from "class-validator";
import { IsStringWithErrorMessage } from "src/common/decorator/dtoValidator.decorator";

export class SignUpRequestDto {
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
  team: string | null;

  @IsStringWithErrorMessage()
  role: string;
}
