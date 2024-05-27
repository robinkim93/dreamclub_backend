import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller()
@ApiTags("health-check")
export class AppController {
  constructor() {}

  @Get("/health-check")
  healthCheck(): string {
    return "OK";
  }
}
