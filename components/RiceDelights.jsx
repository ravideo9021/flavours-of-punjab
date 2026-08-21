export default function RiceDelights() {
  return (
    <section className="rice-section">
      <div className="rice-inner">
        <div className="rice-bowl rice-bowl-left scroll-parallax-up" aria-hidden="true">
          <img src="/media/rice_bowl.png" alt="" loading="lazy" />
        </div>
        <div className="rice-bowl rice-bowl-right scroll-parallax-down" aria-hidden="true">
          <img src="/media/rice_image.png" alt="" loading="lazy" />
        </div>

        <div className="rice-deco rice-deco-1" aria-hidden="true">
          <img src="/media/d04dbd8fbaefea2f.png" alt="" loading="lazy" />
        </div>
        <div className="rice-deco rice-deco-2" aria-hidden="true">
          <img src="/media/tomato_for_decoration.png" alt="" loading="lazy" />
        </div>

        <svg className="rice-art rice-art-1" viewBox="0 0 80 80" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="1" aria-hidden="true">
          <circle cx="40" cy="40" r="30" /><path d="M25 55c5-15 25-15 30 0" /><path d="M30 25c5 8 15 8 20 0" />
        </svg>
        <svg className="rice-art rice-art-2" viewBox="0 0 60 80" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="1" aria-hidden="true">
          <path d="M30 10c-10 15-10 35 0 50" /><path d="M30 10c10 15 10 35 0 50" /><path d="M15 40h30" />
        </svg>
        <svg className="rice-art rice-art-3" viewBox="0 0 80 80" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="1" aria-hidden="true">
          <ellipse cx="40" cy="50" rx="30" ry="15" /><path d="M20 50c5-25 35-25 40 0" />
        </svg>

        <div className="rice-content reveal">
          <p className="rice-kicker">Veg Biryani &bull; Veg Pulao &bull; Jeera Rice</p>
          <h2>Rice Delights<br />For Every Cravings</h2>
          <p className="rice-sub">From flavorful biryanis to comforting rice bowls, every bite is packed with authentic taste and aroma.</p>
          <a className="btn btn-white" href="#menu">
            Order Now
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
