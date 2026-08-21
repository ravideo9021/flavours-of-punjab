export default function FoodShowcase() {
  return (
    <section className="showcase">
      <div className="showcase-visual">
        <img
          className="showcase-main-img"
          src="/media/veg_biryani_bg.jpg"
          alt="Signature Biryani in a traditional handi"
          loading="lazy"
        />
        {/* Rotating circular badge */}
        <div className="showcase-badge scroll-spin" data-scroll-spin="0.15" aria-hidden="true">
          <svg viewBox="0 0 200 200">
            <defs>
              <path id="showcase-circle" d="M100,100 m-70,0 a70,70 0 1,1 140,0 a70,70 0 1,1 -140,0" />
            </defs>
            <circle cx="100" cy="100" r="75" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="1" />
            <circle cx="100" cy="100" r="65" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="1" />
            <text>
              <textPath href="#showcase-circle">TASTY &bull; VEG PULAO &bull; VEG BIRYANI &bull; BEST &bull;</textPath>
            </text>
          </svg>
        </div>
        {/* Parallax-moving food bowls */}
        <div className="showcase-float showcase-float-1 scroll-parallax-down" aria-hidden="true">
          <img src="/media/butter_chicken.png" alt="" loading="lazy" />
        </div>
        <div className="showcase-float showcase-float-2 scroll-parallax-up" aria-hidden="true">
          <img src="/media/dal_tadka.png" alt="" loading="lazy" />
        </div>
      </div>

      <div className="showcase-content">
        {/* Decorative line art */}
        <svg className="showcase-art" viewBox="0 0 100 120" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="1" aria-hidden="true">
          <ellipse cx="50" cy="80" rx="40" ry="20" /><path d="M20 80c8-40 52-40 60 0" /><path d="M35 80c5-20 25-20 30 0" /><circle cx="50" cy="30" r="5" />
        </svg>

        <p className="eyebrow">Discover The Soul Of India</p>
        <h2>Unveil Secrets Of<br />Missing Street Food!</h2>
        <p className="lead">From the bustling streets of Amritsar to the royal kitchens of Lahore, experience the flavours that define a culture.</p>
        <a className="btn btn-gold" href="#menu">Explore Our Menu</a>
      </div>
    </section>
  );
}
