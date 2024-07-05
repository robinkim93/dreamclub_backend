import { applyDecorators } from "@nestjs/common";
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidationOptions,
} from "class-validator";
import {
  notEmptyValidationMessage,
  stringValidationMessage,
  numberValidationMessage,
} from "../util/type-validation.message";

interface IDecoratorArg {
  empty?: boolean;
  validationOptions?: ValidationOptions;
}

/**
 *
 * @description class-validator에서 DTO 객체 내부 프로퍼티 유효성 검사에 활용
 *
 * 기존의 validationOptions는 그대로 사용이 가능하고, 자주 붙어나오는 IsNotEmpty 데코레이터를 empty 인자의 값에 따라 동적으로 설정 가능
 */
export const IsStringWithErrorMessage = ({
  empty = false,
  validationOptions,
}: IDecoratorArg = {}) => {
  return empty
    ? IsString({ ...validationOptions, message: stringValidationMessage })
    : applyDecorators(
        IsNotEmpty({ message: notEmptyValidationMessage }),
        IsString({ ...validationOptions, message: stringValidationMessage }),
      );
};

export const IsNumberWithErrorMessage = ({
  empty = false,
  validationOptions,
}: IDecoratorArg = {}) => {
  return empty
    ? IsNumber(
        { allowInfinity: false },
        { ...validationOptions, message: numberValidationMessage },
      )
    : applyDecorators(
        IsNotEmpty({ message: notEmptyValidationMessage }),
        IsNumber(
          { allowInfinity: false },
          { ...validationOptions, message: numberValidationMessage },
        ),
      );
};
