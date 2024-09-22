import { Body, Controller, type UnauthorizedException, Post } from "@nestjs/common";
import { UserWhitPassDto } from "../users/users.dto";
import { AuthService } from "./auth.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post("login")
  public login(@Body() user: UserWhitPassDto): Promise<string | UnauthorizedException> {
    return this.authService.login(user.email, user.password);
  }
}
