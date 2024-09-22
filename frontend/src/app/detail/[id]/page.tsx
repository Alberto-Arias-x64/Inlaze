import Hero from "@/components/Hero/Hero";
import module from "./page.module.css";
import Carrousel from "@/components/Carrousel/Carrousel";

export async function generateStaticParams() {
  return [];
}

export default function Detail({
  params,
}: {
  params: { id: string };
}): JSX.Element {
  return (
    <main>
      <Hero />
      <div className={module.mainContent}>
        <div>
          <Carrousel title="Popular" url="/movies/popular" />
        </div>
      </div>
    </main>
  );
}
