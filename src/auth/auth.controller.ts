import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SignUpRequestDto } from "./dto/signUp.request.dto";

@Controller("auth")
@ApiTags("Auth API")
export class AuthController {
  @Post("sign-up")
  signUp(@Body() signUpDto: SignUpRequestDto) {
    console.log(signUpDto);
    throw new BadRequestException("ddd");
  }
}
