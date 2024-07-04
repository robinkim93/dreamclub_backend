import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SignUpRequestDto } from "./dto/signUp.request.dto";
import { AuthService } from "./auth.service";
import { Swagger } from "src/common/decorator/swagger/swagger.decorator";

@Controller("auth")
@ApiTags("Auth API")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  @Swagger.Auth.SignUp({ summary: "회원가입" })
  signUp(@Body() signUpDto: SignUpRequestDto): Promise<string> {
    return this.authService.signUp(signUpDto);
  }
}
