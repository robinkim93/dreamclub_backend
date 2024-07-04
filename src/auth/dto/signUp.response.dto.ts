import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class SignUpResponseDto {
  @Expose()
  @ApiProperty({
    description: "유저 access token",
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjMsImNyZWF0ZWRBdCI6IjIwMjQtMDctMDRUMDc6NDg6MTAuMTY1WiIsImlhdCI6MTcyMDA3OTI5MCwiZXhwIjoxNzIyNjcxMjkwfQ.qCbrHBvnVsKVfauzi7v-GgsV6lLrsmzyPpMU4pOwS5s",
  })
  accessToken: string;
}
