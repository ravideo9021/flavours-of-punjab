export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-bg" aria-hidden="true" />
      <div className="about-inner">
        <div className="about-text reveal">
          <p className="eyebrow">Our Story</p>
          <h2>Where Every Dish Tells<br /><em>A Punjabi Tale</em></h2>
          <p className="lead">
            At Flavours Of Punjab, we bring the warmth and richness of authentic Punjabi cuisine to your table.
            From smoky tandoori delights to creamy butter chicken and aromatic biryanis, every dish is crafted
            with time-honoured recipes and the freshest ingredients.
          </p>
          <p className="lead">
            Whether you crave the comfort of dal makhni or the sizzle of seekh kebabs, our kitchen serves
            Punjab&apos;s finest &mdash; just the way it&apos;s meant to be.
          </p>
          <div className="about-badges">
            <div className="badge"><strong>100+</strong><span>Menu Items</span></div>
            <div className="badge"><strong>Veg &amp; Non-Veg</strong><span>For Everyone</span></div>
            <div className="badge"><strong>Dine-In</strong><span>Takeaway &amp; Delivery</span></div>
          </div>
        </div>
        <div className="about-visual">
          <div className="about-ring" aria-hidden="true">
            <svg viewBox="0 0 300 300">
              <defs><path id="about-circle" d="M150,150 m-120,0 a120,120 0 1,1 240,0 a120,120 0 1,1 -240,0" /></defs>
              <text><textPath href="#about-circle">AUTHENTIC &bull; PUNJABI &bull; CUISINE &bull; SINCE 2024 &bull; FLAVOURS &bull; OF &bull; PUNJAB &bull; </textPath></text>
            </svg>
          </div>
          <img
            className="about-img scroll-parallax"
            data-parallax="0.1"
            src="/media/garlic_naan.png"
            alt="Fresh garlic naan from the tandoor"
            loading="lazy"
          />
          <img className="about-decor d1" src="/media/d04dbd8fbaefea2f.png" alt="" loading="lazy" aria-hidden="true" />
          <img className="about-decor d2" src="/media/tomato_for_decoration.png" alt="" loading="lazy" aria-hidden="true" />
          <img className="about-decor d3" src="/media/724a9845945afdb7.png" alt="" loading="lazy" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
