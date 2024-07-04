import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class BaseSuccessResponseDto<T = any> {
  @Expose()
  @ApiProperty({
    description: "http 응답코드",
    enum: HttpStatus,
  })
  readonly status: number;

  @Expose()
  @ApiProperty({ description: "응답 시간", example: new Date() })
  readonly timestamp: Date;

  @Expose()
  @ApiProperty({ description: "결과", example: "success" })
  readonly result: string;

  @Expose()
  @ApiProperty({ description: "데이터" })
  readonly data: T;
}
