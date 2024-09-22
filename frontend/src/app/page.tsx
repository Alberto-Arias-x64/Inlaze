import Carrousel from "@/components/Carrousel/Carrousel";
import Side from "@/components/SidePanel/Side";
import Hero from "@/components/Hero/Hero";
import module from "./page.module.css";

export default function Home(): JSX.Element {
  return (
    <main>
      <Hero />
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
