import { type MovieDto, type MoviesListDto, MovieType } from "./movies.dto";
import {
  apiGenres,
  apiNowPlaying,
  apiPopular,
  apiTopRated,
  apiUpcoming,
  type GenresResponse,
  type ApiResponse,
} from "../core/utils/api-fetch";
import { InjectRepository } from "@nestjs/typeorm";
import { MovieEntity } from "./movies.entity";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

@Injectable()
export class MoviesService {
  private genres: GenresResponse = {
    genres: [],
  };

  public constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}
  public async fetchMovies(movieType: MovieType, page: number): Promise<MoviesListDto> {
    let movies: ApiResponse = {
      results: [],
      page: 1,
      total_pages: 0,
      total_results: 0,
      dates: { maximum: "", minimum: "" },
    };
    if (movieType === MovieType.NOW_PLAYING) movies = await apiNowPlaying(page);
    if (movieType === MovieType.POPULAR) movies = await apiPopular(page);
    if (movieType === MovieType.TOP_RATED) movies = await apiTopRated(page);
    if (movieType === MovieType.UPCOMING) movies = await apiUpcoming(page);
    const results = movies.results.map(async (movie): Promise<MovieDto> => {
      const dbMovie = await this.movieRepository.findOneBy({ id: movie.id.toString() });
      if (!dbMovie) await this.movieRepository.save({ id: movie.id.toString(), favorites: 0 });
      return {
        id: movie.id.toString(),
        backdrop_path: movie.backdrop_path,
        original_title: movie.original_title,
        vote_average: movie.vote_average,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        overview: movie.overview,
        favorites: dbMovie?.favorites ?? 0,
      };
    });
    const moviesList: MoviesListDto = {
      ...movies,
      results: await Promise.all(results),
    };
    return moviesList;
  }

  public async fetchGenres(): Promise<GenresResponse> {
    if (!this.genres.genres.length) this.genres = await apiGenres();
    return this.genres;
  }
}
