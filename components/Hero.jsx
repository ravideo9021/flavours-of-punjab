'use client';
import { useState, useEffect, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';

const slides = [
  {
    bg: '/media/butter_chicken_bg.png',
    food: '/media/butter_chicken.png',
    kicker: 'Authentic Taste of Punjab',
    title: ['Authentic', 'Veg', 'Biryani'],
    sub: 'The Family Restaurant — Veg & Non-Veg',
  },
  {
    bg: '/media/Food%20background_1.png',
    food: '/media/veg_biryani.png',
    kicker: 'Aromatic & Flavorful',
    title: ['Royal', 'Chicken', 'Biryani'],
    sub: 'Layered with saffron, spices & love',
  },
  {
    bg: '/media/Food_background%20_2.jpg',
    food: '/media/veg_biryni.png',
    kicker: 'Creamy & Buttery',
    title: ['Butter', 'Chicken', 'Special'],
    sub: "Punjab's most iconic dish — since generations",
  },
  {
    bg: '/media/food_background_3.png',
    food: '/media/dal_tadka.png',
    kicker: 'Slow-Cooked Perfection',
    title: ['Dal', 'Makhni', 'Classic'],
    sub: 'Rich, creamy & full of Punjabi warmth',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((idx) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(idx);
    setTimeout(() => setAnimating(false), 900);
  }, [animating]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="hero" id="hero" aria-label="Welcome to Flavours Of Punjab">
      {slides.map((s, i) => (
        <div key={i} className={`hero-bg ${i === current ? 'active' : ''}`}>
          <img src={s.bg} alt="" aria-hidden="true" />
        </div>
      ))}
      <div className="hero-overlay" />

      {/* Floating herbs/spices decoration */}
      <div className="hero-floaters" aria-hidden="true">
        <span className="floater f1"></span>
        <span className="floater f2"></span>
        <span className="floater f3"></span>
        <span className="floater f4"></span>
        <span className="floater f5"></span>
      </div>

      {/* Split layout: food left, text right */}
      <div className="hero-split" key={current}>
        <div className="hero-food-side">
          <img className="hero-food" src={slide.food} alt="" />
        </div>
        <div className="hero-text-side">
          <p className="hero-kicker">{slide.kicker}</p>
          <h1>
            {slide.title.map((line, i) => (
              <span key={i} className="hero-line">{line}</span>
            ))}
          </h1>
          <p className="hero-sub">{slide.sub}</p>
          <div className="hero-actions">
            <a className="order-btn order-swiggy" href="https://www.swiggy.com/city/delhi/flavours-of-punjab-shankar-main-road-rajinder-nagar-rest9826?source=sharing" target="_blank" rel="noopener noreferrer">
              <span className="order-btn-label">
                <img src="/media/swiggy_logo.png" alt="Swiggy" className="order-logo" />
                <span>Order Now</span>
              </span>
              <div className="order-btn-hover">
                <span>Order Now</span>
                <ArrowRight size={16} />
              </div>
              <div className="order-btn-dot" />
            </a>
            <a className="order-btn order-zomato" href="https://zomato.onelink.me/xqzv/5ynak9ns" target="_blank" rel="noopener noreferrer">
              <span className="order-btn-label">
                <img src="/media/zomato_logo.png" alt="Zomato" className="order-logo" />
                <span>Order Now</span>
              </span>
              <div className="order-btn-hover">
                <span>Order Now</span>
                <ArrowRight size={16} />
              </div>
              <div className="order-btn-dot" />
            </a>
          </div>
        </div>
      </div>

      {/* Slide navigation */}
      <div className="hero-nav">
        <button className="hero-arrow" onClick={prev} aria-label="Previous slide">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div className="hero-dots">
          {slides.map((_, i) => (
            <button key={i} className={`hero-dot ${i === current ? 'active' : ''}`} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
        <button className="hero-arrow" onClick={next} aria-label="Next slide">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      <div className="hero-scroll">
        <span>Scroll</span>
        <span className="scroll-bar" />
      </div>
    </section>
  );
}
