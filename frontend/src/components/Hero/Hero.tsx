import module from "./Hero.module.css";

export default function Hero(): JSX.Element {
  return (
    <div className={module.hero}>
      <div className={module.content}>
        <h1>Kung Fu Panda 4</h1>
        <div>
          <strong>
            Join Po and the Furious Five on a new epic adventure! Discover the
            power of friendship and the strength within! Get ready to unleash
            your inner warrior! 🥋✨
          </strong>
          <div>
            <img src="" alt="heat" />
          </div>
        </div>
      </div>
      <img src="/ph.png" alt="cover" />
    </div>
  );
}
