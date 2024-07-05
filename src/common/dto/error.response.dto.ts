import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class BaseErrorResponseDto<T = any> {
  @Expose()
  @ApiProperty({ description: "상태 코드", enum: HttpStatus })
  statusCode: number;

  @Expose()
  @ApiProperty({ description: "요청 시간", example: new Date() })
  timestamp: Date;

  @Expose()
  @ApiProperty({
    description: "요청 경로",
    example: "/end_point/params?query=example",
  })
  path: string;

  @Expose()
  @ApiProperty({
    description: "요청 method",
    example: "GET / POST / PUT / DELETE",
  })
  method: string;

  @Expose()
  @ApiProperty({ description: "에러 메시지" })
  error: T;
}
