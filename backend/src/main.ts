import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app/app.module";
import { NestFactory } from "@nestjs/core";
import { PORT } from "./app/core/constants";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(PORT);
}
void bootstrap();
