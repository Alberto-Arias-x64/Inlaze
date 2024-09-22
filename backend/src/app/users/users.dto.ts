import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import type { MovieEntity } from "../movies/movies.entity";
import type { MovieDto } from "../movies/movies.dto";

export class UserDto {
  public id: string;

  @IsString()
  @IsEmail()
  public email: string;

  public favoriteMovies: MovieDto[];
}

export class UserWhitPassDto extends UserDto {
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  public password: string;
}
