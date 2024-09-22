import {
  Body,
  Controller,
  Get,
  type NotFoundException,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { type DetailDto, MovieType, type MoviesListDto } from "./movies.dto";
import type { GenresResponse } from "../core/utils/api-fetch";
import { MoviesService } from "./movies.service";
import { ApiTags } from "@nestjs/swagger";
import { TokenGuard } from "../core/guards/token.guard";

@ApiTags("Movies")
@Controller("movies")
export class MoviesController {
  public constructor(private readonly moviesService: MoviesService) {}

  @Get("now-playing")
  public getNowPlaying(@Query("page") page: number): Promise<MoviesListDto> {
    return this.moviesService.fetchMovies(MovieType.NOW_PLAYING, page);
  }

  @Get("popular")
  public popular(@Query("page") page: number): Promise<MoviesListDto> {
    return this.moviesService.fetchMovies(MovieType.POPULAR, page);
  }

  @Get("top-rated")
  public topRated(@Query("page") page: number): Promise<MoviesListDto> {
    return this.moviesService.fetchMovies(MovieType.TOP_RATED, page);
  }

  @Get("upcoming")
  public upcoming(@Query("page") page: number): Promise<MoviesListDto> {
    return this.moviesService.fetchMovies(MovieType.UPCOMING, page);
  }

  @Get("genres")
  public genres(): Promise<GenresResponse> {
    return this.moviesService.fetchGenres();
  }

  @Get("detail/:id")
  public detail(@Param("id") id: string): Promise<DetailDto | NotFoundException> {
    return this.moviesService.fetchMovie(id);
  }

  @Get("similar/:id")
  public similar(@Param("id") id: string): Promise<MoviesListDto> {
    return this.moviesService.fetchMovies(MovieType.SIMILAR, 1, id);
  }

  @Get("favorites")
  public favorites(@Query("page") page: number): Promise<MoviesListDto> {
    return this.moviesService.fetchMovies(MovieType.UPCOMING, page);
  }

  @Post("favorites")
  @UseGuards(TokenGuard)
  public addFavorite(@Body() body: { movieId: string }, @Req() request: Request): Promise<void> {
    return this.moviesService.addFav(request["user"].id as string, body.movieId);
  }
}
