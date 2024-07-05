import { HttpStatus } from "@nestjs/common";

interface IErrorCode {
  [key: string]: {
    errors: {
      statusCode: number;
      example: string;
      message: string;
      exampleDescription: string;
    }[];
  };
}

// 일반적인 에러가 생길 때 추가
const COMMON_ERROR = [
  {
    statusCode: HttpStatus.BAD_REQUEST,
    example: "KEY_ERROR",
    message: `"key": [
    "key은(는) number 타입이 아닌 string 타입입니다."
]`,
    exampleDescription: "요청 데이터의 에러 (key 또는 query 확인 필요)",
  },
];

const AUTH = {
  errors: [
    {
      statusCode: HttpStatus.BAD_REQUEST,
      example: "회원가입 실패",
      message: "sign_up_fail",
      exampleDescription: "회원가입 실패",
    },
    ...COMMON_ERROR,
  ],
};

// 모듈 별 에러 정의
export const ERROR_CODE: IErrorCode = {
  AUTH,
};
