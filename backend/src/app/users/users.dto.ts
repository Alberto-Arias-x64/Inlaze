import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class UserDto {
  public id: string;

  @IsString()
  @IsEmail()
  public email: string;

  public favoriteMovies: string[];
}

export class UserWhitPassDto extends UserDto {
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  public password: string;
}
