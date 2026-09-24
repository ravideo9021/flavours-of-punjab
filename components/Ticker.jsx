/** Decorative marquee strip. Pure CSS; stops for reduced-motion users. */
export default function Ticker({ items, variant = 'saffron' }) {
  const line = items.join(' • ') + ' • ';
  return (
    <div className={`ticker ticker--${variant}`} aria-hidden="true">
      <div className="ticker-track">
        <span>{line}</span>
        <span>{line}</span>
      </div>
    </div>
  );
}
