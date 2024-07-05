import { HttpStatus, applyDecorators } from "@nestjs/common";
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  getSchemaPath,
} from "@nestjs/swagger";
import { OperationObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { SignUpRequestDto } from "src/auth/dto/signUp.request.dto";
import { SignUpResponseDto } from "src/auth/dto/signUp.response.dto";
import { ERROR_CODE } from "src/common/error/errorCode";
import {
  makeSwaggerErrorExampleValue,
  makeSwaggerSuccessExampleValue,
} from "src/common/util/swagger.example.value";
import { ISwaggerExamples } from "../../../../interfaces/swagger.interface";

export const SignUp = (opeartorOptions: Partial<OperationObject>) => {
  const { summary, description = null } = opeartorOptions;

  // examples가 아닌 apiResponse에 들어가는 객체 전체를 생성하는 것으로 로직 교체해보기
  const successResponseValue = makeSwaggerSuccessExampleValue({
    dtoClass: SignUpResponseDto,
  });

  // error 코드 별로 객체를 생성하고, 객체의 갯수대로 ApiResponse를 반환한다.
  // 결과물 용 빈 배열 생성
  // map 돌면서 code 확인하고, 결과물 배열에서 code에 대한 객체가 있으면 새로 만들고, 없으면 해당 객체에 examples에 내용 추가
  const failResponseValue = () => {
    const result: ISwaggerExamples[] = [];

    ERROR_CODE.AUTH.errors.forEach((error) => {
      const { statusCode, example, message, exampleDescription } = error;
      // 없으면 -1, 있으면 index 번호
      const errorObjIndex = result.findIndex(
        (item) => item.status === statusCode,
      );

      const examples = {
        [example]: {
          value: makeSwaggerErrorExampleValue({
            message,
          }),
          description: exampleDescription,
        },
      };

      // -1 이면 새로운 객체를 추가, 있으면 index 번호의 examples에 추가
      if (errorObjIndex === -1) {
        result.push({
          status: statusCode,
          description: HttpStatus[statusCode],
          content: { "application/json": { examples } },
        });
      } else {
        Object.assign(
          result[errorObjIndex].content["application/json"].examples,
          examples,
        );
      }
    });

    return result.map((item) => ApiResponse(item));
  };

  return applyDecorators(
    ApiOperation({
      summary,
      description: !description ? summary : description,
    }),
    ApiBody({ type: SignUpRequestDto }),
    ApiExtraModels(SignUpResponseDto),
    ...failResponseValue(),
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
};
