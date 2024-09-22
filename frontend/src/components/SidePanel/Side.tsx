"use client";
import { useEffect, useState } from "react";
import module from "./Side.module.css";

export interface GenresResponse {
  genres: Genre[];
}

export interface Genre {
  id: number;
  name: string;
}

export default function Side(): JSX.Element {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [search, setSearch] = useState("");
  const [listState, setListState] = useState(false);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const data = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/movies/genres",
      );
      const posts: GenresResponse = await data.json();
      setGenres(posts.genres);
    };
    fetchData();
  }, []);
  return (
    <aside className={module.side}>
      <div className={module.input}>
        <label htmlFor="searchInput">Search</label>
        <div>
          <input
            type="text"
            name="searchInput"
            id="searchInput"
            placeholder="Keywords"
          />
          <img src="/icon_mag.svg" alt="search" />
        </div>
      </div>
      <div className={module.input}>
        <label htmlFor="genres">Genres</label>
        <div>
          <input
            type="text"
            name="genres"
            id="genres"
            onFocus={() => setListState(true)}
            onBlur={() => setTimeout(() => setListState(false), 10)}
            value={search}
            readOnly
          />
          <img src="/icon_chevron.svg" alt="genre" />
        </div>
        {listState && (
          <div className={module.genresList}>
            {genres.map((genre) => (
              <p key={genre.id} onClick={() => setSearch(genre.name)}>
                {genre.name}
              </p>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
