import { MoviesModule } from "./movies/movies.module";
import { MovieEntity } from "./movies/movies.entity";
import { UserModule } from "./users/users.module";
import { UserEntity } from "./users/users.entity";
import { AppController } from "./app.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { AppService } from "./app.service";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "./db.sqlite",
      synchronize: true,
      logging: true,
      entities: [UserEntity, MovieEntity],
    }),
    UserModule,
    AuthModule,
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
