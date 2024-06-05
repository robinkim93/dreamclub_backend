import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { CustomValidationException } from "./customValidationException";
import { ValidationErrorResponseDto } from "../dto/validationError.response.dto";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    let error: ValidationErrorResponseDto | string | string[];
    let statusCode: number;

    /**
     * @nestjs/common에서 사용하는 기본 HttpException의 경우의 응답 데이터
     * CustomValidationException도 HttpException의 인스턴스기 때문에 순서를 맞춰서 작성해야한다.
     * ex) CustomValidationException도 HttpException의 인스턴스기 때문에 하단의 if문 두 개를 모두 거친다.
     * 첫번째 if문에서 error를 정의한 후, 다시 두번째 if문에서 error를 오버라이딩한다.
     */
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const getError = exception.getResponse() as
        | string
        | { error: string; statusCode: number; message: string | string[] };
      error = typeof getError === "string" ? getError : getError.message;
    }

    if (exception instanceof CustomValidationException) {
      statusCode = exception.getStatus();
      const getError = exception.getResponse() as ValidationErrorResponseDto;
      error = { ...getError };
    }

    const errorResponseObj = {
      statusCode,
      timestamp: new Date(),
      path: request.url,
      method: request.method,
      error,
    };

    response.status(statusCode).json(errorResponseObj);
  }
}
