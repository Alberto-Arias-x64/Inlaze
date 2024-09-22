import Link from "next/link";
import module from "./Card.module.css";

export interface CardProps {
  id: string;
  title: string;
  date: string;
  image: string;
  rating: number;
  favorites: boolean;
}

export default function Card({
  id,
  title,
  date,
  image,
  rating,
  favorites,
}: CardProps): JSX.Element {
  return (
    <div className={module.card}>
      <Link href={`/detail/${id}`}>
        <img src={image} alt="cover" />
      </Link>
      <div className={module.content}>
        <p className={module.title}>{title}</p>
        <p className={module.text}>{date}</p>
        <div className={module.info}>
          <div>
            <p className={module.text}>Rating</p>
            <p>{rating}</p>
          </div>
          <div>
            <p className={module.text}>Favorites</p>
            <img src="/icon_heart.svg" alt="heart" />
          </div>
        </div>
      </div>
    </div>
  );
}
