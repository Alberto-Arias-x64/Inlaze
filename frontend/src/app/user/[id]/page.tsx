import module from "./page.module.css";
import Card from "@/components/Carrousel/Card/Card";

export function generateStaticParams(): [] {
  return [];
}

interface UserDto {
  id: string;
  email: string;
  favoriteMovies: MovieDto[];
}

interface MovieDto {
  id: string;
  favorites: number;
  backdrop_path: string;
  original_title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

export default async function Detail({
  params,
}: {
  params: { id: string };
}): Promise<JSX.Element> {
  const detailFetch = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`,
  );
  const detail: UserDto = await detailFetch.json();
  return (
    <main className={module.mainContent}>
      <span>
        <h1>User:</h1>
        <p>{detail.email}</p>
      </span>
      <strong>Favorite Movies</strong>
      <div className={module.favs}>
        {detail.favoriteMovies.map((detail) => {
          return (
            <Card
              key={detail.id}
              id={detail.id}
              date={detail.release_date}
              favorites={false}
              image={
                "https://media.themoviedb.org/t/p/w300_and_h450_bestv2" +
                detail.backdrop_path
              }
              rating={detail.vote_average}
              title={detail.original_title}
            />
          );
        })}
      </div>
    </main>
  );
}
