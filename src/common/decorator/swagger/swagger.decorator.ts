import { Auth } from "./auth/auth.swagger.decorator";
import { ISwaggerDecoratorObj } from "../../interfaces/swagger.interface";

// 실제 controller에서 @Swagger.Auth.SignUp()의 형태로 사용
export const Swagger: ISwaggerDecoratorObj = {
  Auth,
};
