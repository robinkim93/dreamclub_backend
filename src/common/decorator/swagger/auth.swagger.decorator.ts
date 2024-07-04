import { HttpStatus, applyDecorators } from "@nestjs/common";
import { ApiOperator } from "./swagger.decorator";
import { AuthController } from "src/auth/auth.controller";
import { OperationObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  getSchemaPath,
} from "@nestjs/swagger";
import { SignUpRequestDto } from "src/auth/dto/signUp.request.dto";
import { SignUpResponseDto } from "src/auth/dto/signUp.response.dto";
import { makeSwaggerSuccessExampleValue } from "src/common/util/swagger.example.value";

/**
 * examples의 value에 dto를 기반으로 한 내용을 값이 들어있는 객체로 생성해서 넣어줘야함.
 */
export const Auth: ApiOperator<keyof AuthController> = {
  SignUp: (opeartorOptions: Partial<OperationObject>) => {
    const { summary, description = null } = opeartorOptions;

    // examples가 아닌 apiResponse에 들어가는 객체 전체를 생성하는 것으로 로직 교체해보기
    const successResponseValue = makeSwaggerSuccessExampleValue({
      dtoClass: SignUpResponseDto,
    });

    return applyDecorators(
      ApiOperation({
        summary,
        description: !description ? summary : description,
      }),
      ApiBody({ type: SignUpRequestDto }),
      ApiExtraModels(SignUpResponseDto),
      ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: "회원가입 실패",
        content: {
          "application/json": {
            examples: {
              "회원가입 실패": {
                value: failResponseValue,
                description,
              },
            },
          },
        },
      }),
      ApiResponse({
        status: HttpStatus.OK,
        description: "회원가입 성공",
        content: {
          "application/json": {
            schema: {
              oneOf: [{ $ref: getSchemaPath(SignUpResponseDto) }],
            },
            examples: {
              "가입 성공": {
                value: successResponseValue,
                description: "가입 성공 후 access_token 반환",
              },
            },
          },
        },
      }),
    );
  },
};
