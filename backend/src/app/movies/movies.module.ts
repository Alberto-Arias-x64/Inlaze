import { MoviesController } from "./movies.controller";
import { MoviesService } from "./movies.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MovieEntity } from "./movies.entity";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity]), JwtModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
