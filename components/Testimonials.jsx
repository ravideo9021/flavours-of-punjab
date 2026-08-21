'use client';
import { useState, useCallback } from 'react';

const reviews = [
  {
    name: 'Vishal Khurmi',
    date: '14 April 2024',
    stars: 5,
    verified: true,
    text: 'Good service by Jeel. Amazing food and the ambience was perfect for a family dinner.',
    avatar: 'V',
    color: '#4CAF50',
  },
  {
    name: 'Jay Sadaniya',
    date: '14 April 2024',
    stars: 5,
    verified: true,
    text: 'Very good taste and best service specially from janki. Will definitely come back again!',
    avatar: 'J',
    color: '#2196F3',
  },
  {
    name: 'Brijal Patel',
    date: '14 April 2024',
    stars: 5,
    verified: true,
    text: 'Went there with a group of friends, had a great time, fast service and they also gave compliment dessert.',
    avatar: null,
    color: '#9C27B0',
  },
  {
    name: 'Rajveer Singh',
    date: '22 March 2024',
    stars: 5,
    verified: true,
    text: 'The butter chicken and garlic naan here is absolutely divine. Takes me straight back to Punjab.',
    avatar: 'R',
    color: '#FF9800',
  },
  {
    name: 'Priya Mehta',
    date: '10 March 2024',
    stars: 5,
    verified: true,
    text: 'We hosted our family gathering and ordered the tandoori platter — it was outstanding! Great portions.',
    avatar: 'P',
    color: '#E91E63',
  },
];

const VISIBLE = 3;

export default function Testimonials() {
  const [start, setStart] = useState(0);
  const canNext = start + VISIBLE < reviews.length;
  const canPrev = start > 0;

  const nextReview = useCallback(() => {
    if (canNext) setStart(s => s + 1);
  }, [canNext]);

  const prevReview = useCallback(() => {
    if (canPrev) setStart(s => s - 1);
  }, [canPrev]);

  const visible = reviews.slice(start, start + VISIBLE);

  return (
    <section className="reviews-section">
      <div className="reviews-header reveal">
        <p className="script">Flavorful Feedback</p>
        <h2>Customer Picks And Praises</h2>
      </div>

      <div className="reviews-body">
        {/* Left: restaurant info */}
        <div className="reviews-info reveal">
          <div className="reviews-logo">
            <span className="reviews-logo-text">FP</span>
          </div>
          <h3>Flavours Of Punjab</h3>
          <div className="reviews-rating">
            <span className="reviews-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
          </div>
          <p className="reviews-count">4.8 &middot; Google reviews</p>
          <a className="btn-review" href="#contact">Write a review</a>
        </div>

        {/* Right: review cards */}
        <div className="reviews-cards-wrap">
          {canPrev && (
            <button className="review-nav review-nav-prev" onClick={prevReview} aria-label="Previous reviews">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
          )}
          <div className="reviews-cards">
            {visible.map(review => (
              <article key={review.name} className="review-card reveal">
                <div className="review-card-top">
                  <div className="review-avatar" style={{ background: review.color }}>
                    {review.avatar || review.name[0]}
                  </div>
                  <div className="review-meta">
                    <strong>{review.name}</strong>
                    <span>{review.date}</span>
                  </div>
                  <div className="review-google" aria-label="Google review">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>
                </div>
                <div className="review-stars-row">
                  <span className="review-stars">{'★'.repeat(review.stars)}</span>
                  {review.verified && <span className="review-verified">&#10004;</span>}
                </div>
                <p className="review-text">{review.text}</p>
              </article>
            ))}
          </div>
          {canNext && (
            <button className="review-nav review-nav-next" onClick={nextReview} aria-label="Next reviews">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
