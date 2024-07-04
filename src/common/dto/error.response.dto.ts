import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class BaseErrorResponseDto {
  @Expose()
  @ApiProperty({ description: "상태 코드", enum: HttpStatus })
  statusCode: number;

  @Expose()
  @ApiProperty({ description: "요청 시간", example: new Date() })
  timestamp: Date;

  @Expose()
  @ApiProperty({ description: "요청 경로", example: "/health_check" })
  path: string;

  @Expose()
  @ApiProperty({
    description: "요청 method",
    example: "GET / POST / PUT / DELETE",
  })
  method: string;

  @Expose()
  @ApiProperty({ description: "에러 메시지", example: "error_message" })
  error: string;
}
