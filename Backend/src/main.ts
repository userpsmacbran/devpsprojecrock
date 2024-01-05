import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import * as morgan from "morgan";
import { CORS } from "./constants";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ["debug"] });
  app.setGlobalPrefix("api");

  app.use(morgan("dev"));
  console.log("this is a test");
  app.enableCors(CORS);
  console.log("Hola");
  const reflector = app.get(Reflector);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.get("PORT"));
  console.log("Running on port: ", configService.get("PORT"));
}

bootstrap();
