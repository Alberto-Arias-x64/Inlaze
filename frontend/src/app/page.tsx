import Side from "@/components/SidePanel/Side";
import Hero from "@/components/Hero/Hero";
import module from "./page.module.css";

export default function Home(): JSX.Element {
  return (
    <main>
      <Hero />
      <section className={module.mainLayout}>
        <Side />
        <div>
          <p>Main content</p>
        </div>
      </section>
    </main>
  );
}
