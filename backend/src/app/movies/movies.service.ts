import { type DetailDto, type MovieDto, type MoviesListDto, MovieType } from "./movies.dto";
import {
  apiGenres,
  apiNowPlaying,
  apiPopular,
  apiTopRated,
  apiUpcoming,
  type GenresResponse,
  type ApiResponse,
  apiDetail,
  apiSimilar,
} from "../core/utils/api-fetch";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UserEntity } from "../users/users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { MovieEntity } from "./movies.entity";
import { Repository } from "typeorm";

@Injectable()
export class MoviesService {
  private genres: GenresResponse = {
    genres: [],
  };

  private formatDate(date: string): string {
    const mountList = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const [year, mount, day] = date.split("-");

    return `${mountList[parseInt(mount, 10) - 1]} ${parseInt(day, 10)}, ${year}`;
  }

  public constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  public async fetchMovies(
    movieType: MovieType,
    page: number,
    id?: string,
  ): Promise<MoviesListDto> {
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
    if (movieType === MovieType.SIMILAR && id) movies = await apiSimilar(id, page);
    const results = movies.results.map(async (movie): Promise<MovieDto> => {
      const dbMovie = await this.movieRepository.findOneBy({ id: movie.id.toString() });
      if (!dbMovie) await this.movieRepository.save({ id: movie.id.toString(), favorites: 0 });
      return {
        id: movie.id.toString(),
        backdrop_path: movie.backdrop_path,
        original_title: movie.original_title,
        vote_average: Math.floor(movie.vote_average * 10),
        poster_path: movie.poster_path,
        release_date: this.formatDate(movie.release_date),
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

  public async fetchMovie(id: string): Promise<DetailDto | NotFoundException> {
    const movie = await apiDetail(id);
    if (!movie.id) throw new NotFoundException("Movie not found");
    return {
      backdrop_path: movie.backdrop_path,
      genres: movie.genres,
      id: movie.id,
      original_title: movie.original_title,
      overview: movie.overview,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      related_movies: [],
    };
  }

  public async addFav(userId: string, movieId: string): Promise<void> {
    const user = await this.userRepository.findOne({
      relations: { movies: true },
      where: { id: Number(userId) },
    });
    if (!user) throw new NotFoundException("User not found");
    const movie = await this.movieRepository.findOneBy({ id: movieId });
    if (!movie) throw new NotFoundException("Movie not found");
    await this.movieRepository.update(movieId, { favorites: movie.favorites + 1 });
    user.movies = [...user.movies, movie];
    await this.userRepository.manager.save(user);
  }
}
