import { MoviesModule } from "./movies/movies.module";
import { AppController } from "./app.controller";
import { UserModule } from "./user/user.module";
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
      entities: ["./src/app/models/*.ts"],
    }),
    UserModule,
    AuthModule,
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
