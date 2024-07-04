import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BaseSuccessResponseDto } from "../dto/success.response.dto";

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<BaseSuccessResponseDto> {
    const res = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data) => ({
        status: res.statusCode,
        timestamp: new Date(),
        result: "success",
        data,
      })),
    );
  }
}
