import Carrousel from "@/components/Carrousel/Carrousel";
import Side from "@/components/SidePanel/Side";
import Hero from "@/components/Hero/Hero";
import module from "./page.module.css";

interface Genre {
  id: number;
  name: string;
}
interface DetailDto {
  backdrop_path: string;
  genres: Genre[];
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: Date;
  vote_average: number;
}

export default async function Home(): Promise<JSX.Element> {
  const detailFetch = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movies/detail/${533535}`,
  );
  const detail: DetailDto = await detailFetch.json();
  return (
    <main>
      <Hero
        title={detail.original_title}
        overview={detail.overview}
        posterPath={detail.backdrop_path}
      />
      <section className={module.mainLayout}>
        <Side />
        <div className={module.mainContent}>
          <div>
            <Carrousel title="Popular" url="/movies/popular" />
          </div>
          <div>
            <Carrousel title="Now Playing" url="/movies/now-playing" />
          </div>
          <div>
            <Carrousel title="Upcoming" url="/movies/upcoming" />
          </div>
          <div>
            <Carrousel title="Top Rated" url="/movies/top-rated" />
          </div>
          <div>
            <Carrousel title="Favorites" url="/movies/favorites" />
          </div>
        </div>
      </section>
    </main>
  );
}
