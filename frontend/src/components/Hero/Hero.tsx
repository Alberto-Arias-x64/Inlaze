import module from "./Hero.module.css";

interface HeroProps {
  title: string;
  overview: string;
  posterPath: string;
}

export default function Hero({
  title,
  overview,
  posterPath,
}: HeroProps): JSX.Element {
  return (
    <div className={module.hero}>
      <div className={module.content}>
        <h1>{title}</h1>
        <div>
          <strong>{overview}</strong>
          <div>
            <img src="/icon_heart.svg" alt="heat" />
          </div>
        </div>
      </div>
      <img
        src={
          "https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/" +
          posterPath
        }
        alt="cover"
      />
    </div>
  );
}
