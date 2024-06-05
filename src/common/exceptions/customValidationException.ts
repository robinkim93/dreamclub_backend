import { HttpException } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { ValidationErrorResponseDto } from "../dto/validationError.response.dto";

export class CustomValidationException extends HttpException {
  constructor(validationErrorArray: ValidationError[]) {
    const customValidationError: ValidationErrorResponseDto =
      validationErrorArray
        .map((validationError: ValidationError) => {
          const errorMessage = Object.keys(validationError.constraints).map(
            (key) => validationError.constraints[key],
          );
          return { [validationError.property]: errorMessage };
        })
        .reduce((acc, value) => {
          /**
           * acc는 처음 {}로 초기화하고, value는 {key: [value, value]} 로 이루어져 있다.
           * 이 때 Object.assign(acc, value)는 value 객체가 복사된 acc 객체를 반환한다.
           * 그래서 결과물은 acc = {key: [value, value]} 의 형식이며, 전체를 돌며 누적한다.
           * acc = {key: [value, value], key: [value, value]}
           * */
          Object.assign(acc, value);
          return acc;
        }, {});

    super(customValidationError, 400);
  }
}
