import {
  Body,
  Controller,
  Delete,
  Get,
  Req,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  type HttpException,
} from "@nestjs/common";
import { type UserDto, UserWhitPassDto } from "./users.dto";
import { TokenGuard } from "../core/guards/token.guard";
import { UsersService } from "./users.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Get("/all")
  public getAllUsers(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Get("/:id?")
  public async getUser(@Param() { id }: { id: string }): Promise<UserDto | NotFoundException> {
    if (id && Number(id)) return this.usersService.findOne(Number(id));
    throw new NotFoundException("no provided id");
  }

  @Post()
  public createUser(
    @Body() { email, password }: UserWhitPassDto,
  ): Promise<UserDto | HttpException> {
    return this.usersService.create({ email, password, movies: [] });
  }

  @Delete()
  @UseGuards(TokenGuard)
  public async deleteUser(@Req() request: Request): Promise<void> {
    if (request["user"]) await this.usersService.remove(Number(request["user"].id));
  }
}
