import { AuthController } from "src/auth/auth.controller";
import { OperationObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { Auth } from "./auth.swagger.decorator";

interface Common {
  Auth: ApiOperator<keyof AuthController>;
}

export type ApiOperator<T extends string> = {
  [key in Capitalize<T>]: (
    opeartorOptions: Partial<OperationObject>,
  ) => PropertyDecorator;
};

export const Swagger: Common = {
  Auth,
};
