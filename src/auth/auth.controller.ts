import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { SignUpRequestDto } from "./dto/signUp.request.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
@ApiTags("Auth API")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  @ApiOperation({ description: "회원가입", summary: "회원가입" })
  @ApiBody({
    type: SignUpRequestDto,
  })
  signUp(@Body() signUpDto: SignUpRequestDto): Promise<string> {
    return this.authService.signUp(signUpDto);
  }
}
