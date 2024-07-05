import { OperationObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { AuthController } from "src/auth/auth.controller";

// 모듈 별로 추가 (내부 타입은 같게)
export interface ISwaggerDecoratorObj {
  Auth: ApiOperator<keyof AuthController>;
}

// Controller의 함수를 키로 받아서 함수에 Swagger Decorator가 하나씩 생성되도록 타입지정
export type ApiOperator<T extends string> = {
  [key in Capitalize<T>]: (
    opeartorOptions: Partial<OperationObject>,
  ) => PropertyDecorator;
};

export interface ISwaggerExamples {
  status: number;
  description: string;
  content: {
    "application/json": {
      examples?: {
        [key: string]: {
          value: object;
          description: string;
        };
      };
    };
  };
}
