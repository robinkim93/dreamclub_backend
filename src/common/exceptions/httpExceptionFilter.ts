import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();
    const error = exception.getResponse() as
      | string
      | { error: string; statusCode: number; message: string | [] };

    if (typeof error === "string") {
      response.status(status).json({
        status,
        result: "fail",
        comment: error,
      });
    } else {
      response.status(status).json({
        status,
        result: "fail",
        comment: error.message,
      });
    }
  }
}
