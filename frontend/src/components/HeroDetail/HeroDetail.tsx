import module from "./HeroDetail.module.css";

interface Genre {
  id: number;
  name: string;
}

interface HeroProps {
  title: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  genres: Genre[];
}

export default function HeroDetail({
  title,
  genres,
  overview,
  posterPath,
  backdropPath,
}: HeroProps): JSX.Element {
  return (
    <div className={module.hero}>
      <div className={module.content}>
        <div className={module.poster}>
          <img
            src={
              "https://media.themoviedb.org/t/p/w300_and_h450_bestv2" +
              posterPath
            }
            alt="cover"
          />
          <button>
            <p>Official Trailer</p>
            <img src="/icon_play.svg" alt="play" />
          </button>
        </div>
        <div className={module.info}>
          <h1>{title}</h1>
          <div>
            <strong>Overview:</strong>
            <p>{overview}</p>
          </div>
          <div>
            <p>users score</p>
          </div>
          <div className={module.categories}>
            {genres.map((gen) => (
              <div key={gen.id} className={module.category}>
                {gen.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      <img
        src={
          "https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/" +
          backdropPath
        }
        alt="cover"
      />
    </div>
  );
}
