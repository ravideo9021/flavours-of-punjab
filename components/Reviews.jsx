import { ArrowUpRight, Quote, Star } from 'lucide-react';
import { GoogleIcon, ZomatoIcon } from './BrandIcons';
import { reviews } from '@/data/reviews';
import { site } from '@/data/site';

function Stars({ rating }) {
  return (
    <span className="stars" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={16} aria-hidden="true" className={i < Math.round(rating) ? 'is-on' : undefined} />
      ))}
    </span>
  );
}

export default function Reviews() {
  const rating = site.reviews.googleRating;
  const writeUrl = site.reviews.googleWrite || site.reviews.google;

  return (
    <section className="reviews section section--open" id="reviews" aria-labelledby="reviews-title">
      <div className="container">
        <header className="section-head reveal">
          <p className="script">What our guests say</p>
          <h2 id="reviews-title">Real reviews, real love</h2>
          <p className="lead">
            Don&apos;t just take our word for it — see what diners say about us on Google and Zomato. Eaten with us?
            Your review helps other food lovers find us.
          </p>
        </header>

        {reviews.length > 0 && (
          <ul className="review-cards">
            {reviews.map((r) => (
              <li key={`${r.name}-${r.text.slice(0, 16)}`} className="review-card reveal">
                <div className="review-top">
                  {r.rating && <Stars rating={r.rating} />}
                  <Quote className="review-quote" size={28} aria-hidden="true" />
                </div>
                <blockquote>
                  <p>{r.text}</p>
                </blockquote>
                <p className="review-by">
                  <span className="review-avatar" aria-hidden="true">
                    {r.name.charAt(0)}
                  </span>
                  <span className="review-who">
                    <strong>{r.name}</strong>
                    <span>
                      {r.source} review
                      {r.badge ? ` · ${r.badge}` : ''}
                      {r.date ? ` · ${r.date}` : ''}
                    </span>
                  </span>
                </p>
              </li>
            ))}
          </ul>
        )}

        <div className="review-platforms">
          <a className="platform-card reveal" href={site.reviews.google} target="_blank" rel="noopener noreferrer">
            <span className="platform-icon platform-icon--google">
              <GoogleIcon size={26} />
            </span>
            <span className="platform-text">
              <strong>Google</strong>
              {rating ? (
                <span>
                  <Stars rating={rating.value} /> {rating.value} from {rating.count.toLocaleString('en-IN')}+ reviews
                </span>
              ) : (
                <span>Read our reviews on Google Maps</span>
              )}
            </span>
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
          <a className="platform-card reveal" href={site.reviews.zomato} target="_blank" rel="noopener noreferrer">
            <span className="platform-icon platform-icon--zomato">
              <ZomatoIcon size={44} />
            </span>
            <span className="platform-text">
              <strong>Zomato</strong>
              <span>Dining and delivery reviews</span>
            </span>
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
          <a className="platform-card platform-card--cta reveal" href={writeUrl} target="_blank" rel="noopener noreferrer">
            <span className="platform-icon">
              <Star size={24} aria-hidden="true" />
            </span>
            <span className="platform-text">
              <strong>Loved your meal?</strong>
              <span>Leave us a review on Google</span>
            </span>
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
        </div>

        <p className="favourites reveal">
          <span>Guest favourites</span> Butter Chicken · Paneer Tikka · Tandoori Chicken · Dal Tadka · Rumali Roti
        </p>
      </div>
    </section>
  );
}
