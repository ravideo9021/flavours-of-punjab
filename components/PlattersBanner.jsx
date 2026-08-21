export default function PlattersBanner() {
  return (
    <>
      {/* TICKER MARQUEE */}
      <div className="ticker-strip" aria-hidden="true">
        <div className="ticker-track">
          <span>Butter Chicken &bull; Dal Makhni &bull; Biryani &bull; Tandoori &bull; Paneer Tikka &bull; Garlic Naan &bull; Rogan Josh &bull; Seekh Kebab &bull;&nbsp;</span>
          <span>Butter Chicken &bull; Dal Makhni &bull; Biryani &bull; Tandoori &bull; Paneer Tikka &bull; Garlic Naan &bull; Rogan Josh &bull; Seekh Kebab &bull;&nbsp;</span>
        </div>
      </div>

      <section className="platters-banner">
        <div className="platters-overlay" />

        {/* Rotating SVG text around the dish */}
        <div className="dish-rotor scroll-spin" data-scroll-spin="0.19">
          <svg viewBox="0 0 220 220">
            <defs>
              <path id="rotor-path" d="M110,110 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
            </defs>
            <circle cx="110" cy="110" r="85" />
            <text>
              <textPath href="#rotor-path">SPECIAL &bull; TANDOORI PLATTER &bull; CHEF&apos;S PICK &bull; </textPath>
            </text>
          </svg>
        </div>

        <img
          className="platters-food scroll-parallax"
          data-parallax="-0.12"
          src="/media/tandoori_paneer_platter.png"
          alt="Special tandoori platter"
          loading="lazy"
        />

        <div className="platters-content reveal">
          <p className="eyebrow">Limited Special</p>
          <h2>Tandoori Platters</h2>
          <p>
            Share the joy of Punjab with our curated tandoori platters &mdash; a royal spread of succulent
            kebabs, tikkas and seekh, straight from the clay oven.
          </p>
          <div className="platter-prices">
            <div><strong>Non-Veg Platter</strong><em>₹580</em></div>
            <div><strong>Veg Platter</strong><em>₹540</em></div>
          </div>
          <a className="btn btn-gold" href="tel:+919910297708">Order Now</a>
        </div>
      </section>
    </>
  );
}
