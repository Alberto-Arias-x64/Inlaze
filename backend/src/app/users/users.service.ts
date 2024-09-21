import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { type QueryFailedError, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./users.entity";
import type { UserDto } from "./users.dto";

@Injectable()
export class UsersService {
  public constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  public async create(user: UserEntity): Promise<UserDto | HttpException> {
    try {
      const userCreated = await this.usersRepository.save(user);
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
    const user = await this.usersRepository.findOneBy({ id });
    if (user && user.id) {
      return {
        id: user.id.toString(),
        email: user.email,
        favoriteMovies: [],
      };
    }
    throw new NotFoundException("User not found");
  }

  public async remove(id: number): Promise<void> {
    await this.usersRepository.update(id, { isActive: false });
  }
}
