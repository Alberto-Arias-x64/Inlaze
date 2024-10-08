import module from "./page.module.css";
import Carrousel from "@/components/Carrousel/Carrousel";
import HeroDetail from "@/components/HeroDetail/HeroDetail";

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

export function generateStaticParams(): [] {
  return [];
}

export default async function Detail({
  params,
}: {
  params: { id: string };
}): Promise<JSX.Element> {
  const detailFetch = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movies/detail/${params.id}`,
  );
  const detail: DetailDto = await detailFetch.json();
  return (
    <main>
      <HeroDetail
        title={detail.original_title}
        overview={detail.overview}
        posterPath={detail.poster_path}
        backdropPath={detail.backdrop_path}
        genres={detail.genres}
      />
      <div className={module.mainContent}>
        <div>
          <Carrousel title="Related" url={"/movies/similar/" + detail.id} />
        </div>
      </div>
    </main>
  );
}
