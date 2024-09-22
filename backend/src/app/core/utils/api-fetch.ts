/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { API_KEY, API_URL, USE_LOCAL_DATA } from "../constants";
import { nowPlayingMock } from "../mocks/now-playing.mock";
import { popularMock } from "../mocks/popular.mock";
import { apiTopRatedMock } from "../mocks/top-rated.mock";
import { upcomingMock } from "../mocks/upcoming.mock";

export interface ApiResponse {
  dates: Dates;
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Dates {
  maximum: string;
  minimum: string;
}

export interface Result {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export default async function apiFetch(url: string): Promise<ApiResponse> {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${API_KEY}`);
  const options = {
    method: "GET",
    headers,
  };
  const response = await fetch(API_URL + url, options);
  return response.json();
}

export function apiNowPlaying(page: number): Promise<ApiResponse> {
  if (USE_LOCAL_DATA) return Promise.resolve(nowPlayingMock);
  return apiFetch(`/movie/now_playing?language=en-US&page=${page}`);
}

export function apiPopular(page: number): Promise<ApiResponse> {
  if (USE_LOCAL_DATA) return Promise.resolve(popularMock);
  return apiFetch(`/movie/popular?language=en-US&page=${page}`);
}

export function apiTopRated(page: number): Promise<ApiResponse> {
  if (USE_LOCAL_DATA) return Promise.resolve(apiTopRatedMock);
  return apiFetch(`/movie/popular?language=en-US&page=${page}`);
}

export function apiUpcoming(page: number): Promise<ApiResponse> {
  if (USE_LOCAL_DATA) return Promise.resolve(upcomingMock);
  return apiFetch(`/movie/upcoming?language=en-US&page=${page}`);
}
