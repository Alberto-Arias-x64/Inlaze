import module from "./Side.module.css";

export default function Side(): JSX.Element {
  return (
    <div className={module.side}>
      <div className={module.side__content}>
        <h1 className={module.side__title}>Inlaze</h1>
        <p className={module.side__description}>
          The QuickbetMovies API description
        </p>
      </div>
    </div>
  );
}
