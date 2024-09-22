import Side from "@/components/SidePanel/Side";
import Hero from "@/components/Hero/Hero";

export default function Home(): JSX.Element {
  return (
    <main>
      <Hero />
      <section>
        <Side />
        <div>Main content</div>
      </section>
    </main>
  );
}
