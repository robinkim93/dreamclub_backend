import { HttpStatus } from "@nestjs/common";

const COMMON_ERROR = [
  {
    statusCode: HttpStatus.BAD_REQUEST,
    example: "KEY_ERROR",
    description: "회원가입 실패",
    message: `"key": [
    "key은(는) number 타입이 아닌 string 타입입니다."
]`,
  },
];

const AUTH = {
  error: [
    ...COMMON_ERROR,
    {
      statusCode: HttpStatus.BAD_REQUEST,
      example: "회원가입 실패",
      description: "회원가입 실패",
      message: "sign_up_fail",
    },
  ],
};

export const ERROR_CODE = {
  AUTH,
};
