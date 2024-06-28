import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SignUpRequestDto } from "./dto/signUp.request.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
@ApiTags("Auth API")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  signUp(@Body() signUpDto: SignUpRequestDto) {
    return this.authService.signUp(signUpDto);
  }
}
