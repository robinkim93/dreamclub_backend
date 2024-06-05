import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import * as expressBasicAuth from "express-basic-auth";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { HttpExceptionFilter } from "./common/exceptions/httpExceptionFilter";
import { SuccessInterceptor } from "./common/interceptors/success.interceptor";
import { ValidationPipe } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { CustomValidationException } from "./common/exceptions/customValidationException";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.use(
    ["/docs", "/docs-json"],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new SuccessInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationError: ValidationError[]) => {
        return new CustomValidationException(validationError);
      },
    }),
  );

  // swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle("dreamclub")
    .setDescription("dreamclub App API Description")
    .setVersion("0.0.1")
    .addBearerAuth()
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("docs", app, swaggerDocument);

  await app.listen(process.env.SERVER_PORT);
}

bootstrap();
