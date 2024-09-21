import { Controller, Get, Param } from "@nestjs/common";

@Controller("user")
export class UserController {
  /* @Post("/create")
  public createUser(@Body() user: User): User {
    return user;
  } */

  @Get("/get/:id?")
  public getUser(@Param() { id }: { id: string }): string {
    return id;
  }
}
