import { ApiOperator } from "../../../interfaces/swagger.interface";
import { AuthController } from "src/auth/auth.controller";
import { SignUp } from "./function/signup";

/**
 * Controller 내부의 함수와 같은 키 값에 함수가 필요
 */
export const Auth: ApiOperator<keyof AuthController> = {
  SignUp,
};
