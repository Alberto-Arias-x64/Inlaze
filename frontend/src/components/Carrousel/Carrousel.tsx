import Card from "./Card/Card";
import module from "./Carrousel.module.css";
interface CarrouselProps {
  title: string;
  url: string;
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

interface MoviesListDto {
  page: number;
  results: MovieDto[];
  total_pages: number;
  total_results: number;
}

export default async function Carrousel({
  title,
  url,
}: CarrouselProps): Promise<JSX.Element> {
  const data = await fetch(process.env.NEXT_PUBLIC_API_URL + url);
  const posts: MoviesListDto = await data.json();
  return (
    <div className={module.carrousel}>
      <strong className={module.title}>{title}</strong>
      <div>
        {posts.results.map((post) => (
          <Card
            key={post.id}
            date={post.release_date}
            favorites={false}
            image={
              "https://media.themoviedb.org/t/p/w300_and_h450_bestv2" +
              post.backdrop_path
            }
            rating={post.vote_average}
            title={post.original_title}
          />
        ))}
      </div>
    </div>
  );
}
