import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { type QueryFailedError, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./users.entity";
import type { UserDto } from "./users.dto";
import * as bcrypt from "bcrypt";
import { apiDetail } from "../core/utils/api-fetch";
import type { MovieDto } from "../movies/movies.dto";

@Injectable()
export class UsersService {
  public constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  public async create(user: UserEntity): Promise<UserDto | HttpException> {
    try {
      const userCreated = await this.usersRepository.save({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      });
      if (userCreated.id) {
        return {
          id: userCreated.id.toString(),
          email: userCreated.email,
          favoriteMovies: [],
        };
      }
      throw new HttpException("User not created", 400);
    } catch (e) {
      const error = e as QueryFailedError;
      if (error.message === "SQLITE_CONSTRAINT: UNIQUE constraint failed: user_entity.email") {
        throw new HttpException("User already exists", 400);
      }
      throw new HttpException("Data base error", 400);
    }
  }

  public async findAll(): Promise<UserDto[]> {
    const users = await this.usersRepository.find();
    return users.map((user) => {
      if (!user.id) user.id = 0;
      return {
        id: user.id.toString(),
        email: user.email,
        favoriteMovies: [],
      };
    });
  }

  public async findOne(id: number): Promise<UserDto | NotFoundException> {
    const user = await this.usersRepository.findOne({ relations: { movies: true }, where: { id } });
    if (user && user.id) {
      const moviesList: Promise<MovieDto>[] = user.movies.map(async ({ id }): Promise<MovieDto> => {
        const detail = await apiDetail(id.toString());
        return {
          id: detail.id.toString(),
          backdrop_path: detail.backdrop_path,
          original_title: detail.original_title,
          vote_average: detail.vote_average,
          poster_path: detail.poster_path,
          release_date: detail.release_date,
          overview: detail.overview,
          favorites: 0,
        };
      });
      return {
        id: user.id.toString(),
        email: user.email,
        favoriteMovies: await Promise.all(moviesList),
      };
    }
    throw new NotFoundException("User not found");
  }

  public async remove(id: number): Promise<void> {
    await this.usersRepository.update(id, { isActive: false });
  }
}
