import { Type } from "@nestjs/common";
import { BaseErrorResponseDto } from "../dto/error.response.dto";
import { BaseSuccessResponseDto } from "../dto/success.response.dto";

// baseDtoClass는 success와 fail일때로 나뉘는데 함수를 나눌지, 인자를 나눠받을지 아직 고민중
// response dto에 작성한 ApiProperty 내부 값들을 이용해 dto의 property에 실제 값이 채워진 객체를 생성
export const makeSwaggerSuccessExampleValue = ({
  dtoClass,
}: {
  dtoClass: Type;
}) => {
  // success.interceptor의 반환값에 대한 dto의 apiProperty값이 담긴 배열
  const baseResponsePropertyArray: string[] = Reflect.getMetadata(
    "swagger/apiModelPropertiesArray",
    BaseSuccessResponseDto.prototype,
  );

  // 최종 return 객체
  const result = {};

  baseResponsePropertyArray.forEach((property) => {
    // :email, :name 처럼 앞에 :가 붙어나오기 때문에 지워주면서 dto class 내부 property와 같게 변경
    const fieldName = property.replace(":", "");
    let example: string;

    // fieldName이 data일 때는 enum이나 example이 없기 때문에 해당 loop 종료
    if (fieldName === "data") return;

    // property마다 @ApiProperty() 내부에 들어간 옵션 객체를 변수에 할당
    const metaData = Reflect.getMetadata(
      "swagger/apiModelProperties",
      BaseSuccessResponseDto.prototype,
      fieldName,
    );

    // example이 있으면 example 할당, 없으면 enum 배열의 첫번째 값 할당
    if (!metaData.example) {
      example = metaData.enum[0];
    } else {
      example = metaData.example;
    }

    result[fieldName] = example;
  });

  // 넘어갔던 success.interceptor의 data 객체 생성을 위한 실제 return할 데이터의 dto 내부 property 배열
  const responseData: string[] = Reflect.getMetadata(
    "swagger/apiModelPropertiesArray",
    dtoClass.prototype,
  );

  // result.data에 할당할 객체
  const dataObj = {};

  responseData.forEach((property) => {
    const fieldName = property.replace(":", "");
    const metaData = Reflect.getMetadata(
      "swagger/apiModelProperties",
      dtoClass.prototype,
      fieldName,
    );

    if (!metaData.example) {
      dataObj[fieldName] = metaData.enum[0];
    } else {
      dataObj[fieldName] = metaData.example;
    }
  });

  result["data"] = dataObj;

  return result;
};

export const makeSwaggerErrorExampleValue = ({
  message,
}: {
  message: string;
}) => {
  // success.interceptor의 반환값에 대한 dto의 apiProperty값이 담긴 배열
  const baseResponsePropertyArray: string[] = Reflect.getMetadata(
    "swagger/apiModelPropertiesArray",
    BaseErrorResponseDto.prototype,
  );

  // 최종 return 객체
  const result = {};

  baseResponsePropertyArray.forEach((property) => {
    // :email, :name 처럼 앞에 :가 붙어나오기 때문에 지워주면서 dto class 내부 property와 같게 변경
    const fieldName = property.replace(":", "");
    let example: string;

    // fieldName이 data일 때는 enum이나 example이 없기 때문에 해당 loop 종료
    if (fieldName === "data") return;

    // property마다 @ApiProperty() 내부에 들어간 옵션 객체를 변수에 할당
    const metaData = Reflect.getMetadata(
      "swagger/apiModelProperties",
      BaseErrorResponseDto.prototype,
      fieldName,
    );

    // example이 있으면 example 할당, 없으면 enum 배열의 첫번째 값 할당
    if (metaData.example) {
      example = metaData.example;
    }

    if (metaData.enum) {
      example = metaData.enum[0];
    }

    result[fieldName] = example;
  });

  // result.error에 할당할 객체
  const errorObj = {
    message,
  };

  result["error"] = errorObj;

  return result;
};
