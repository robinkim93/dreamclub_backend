import { ValidationArguments } from "class-validator";

export const stringValidationMessage = (args: ValidationArguments) => {
  return `${args.property}은(는) ${typeof args.value} 타입이 아닌 string 타입입니다.`;
};

export const notEmptyValidationMessage = (args: ValidationArguments) => {
  return `${args.property} 데이터가 비어있습니다.`;
};

export const numberValidationMessage = (args: ValidationArguments) => {
  return `${args.property}은(는) ${typeof args.value} 타입이 아닌 number 타입입니다.`;
};
