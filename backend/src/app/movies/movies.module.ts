import { MoviesController } from "./movies.controller";
import { UserEntity } from "../users/users.entity";
import { MoviesService } from "./movies.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MovieEntity } from "./movies.entity";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity, UserEntity]), JwtModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
