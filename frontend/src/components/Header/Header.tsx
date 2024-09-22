import Link from "next/link";
import module from "./Header.module.css";

export default function Header(): JSX.Element {
  return (
    <header className={module.header}>
      <div className={module.content}>
        <Link href={"/"}>
          <img src="/logo.svg" alt="logo" className={module.logo} />
        </Link>
        <nav>
          <Link href={"/popular"}>Popular</Link>
          <Link href={"/favorites"}>Favorites</Link>
        </nav>
        <img src="/icon_user.svg" alt="user" className="user" />
      </div>
    </header>
  );
}
