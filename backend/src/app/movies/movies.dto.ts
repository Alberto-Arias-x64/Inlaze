import type { Genre } from "../core/utils/api-fetch";

export enum MovieType {
  NOW_PLAYING = "now_playing",
  POPULAR = "popular",
  TOP_RATED = "top_rated",
  UPCOMING = "upcoming",
  SIMILAR = "similar",
}

export class MovieDto {
  public id: string;
  public favorites: number;
  public backdrop_path: string;
  public original_title: string;
  public overview: string;
  public poster_path: string;
  public vote_average: number;
  public release_date: string;
}

export class MoviesListDto {
  public page: number;
  public results: MovieDto[];
  public total_pages: number;
  public total_results: number;
}

export class DetailDto {
  public backdrop_path: string;
  public genres: Genre[];
  public id: number;
  public original_title: string;
  public overview: string;
  public poster_path: string;
  public release_date: string;
  public vote_average: number;
  public related_movies: MovieDto[];
}
