import { Controller, Get, HttpCode } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("errors")
@Controller()
export class AppController {
  public constructor(private readonly appService: AppService) {}

  @Get("not-found")
  @HttpCode(404)
  public notFound(): string {
    return "Not found";
  }

  @Get("error")
  @HttpCode(400)
  public error(): string {
    return "Error";
  }
}
