'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const slides = [
  {
    bg: '/media/butter_chicken_bg.png',
    food: '/media/butter_chicken.png',
    kicker: 'Authentic Taste of Punjab',
    title: ['Butter', 'Chicken', 'Special'],
    sub: "Punjab's most iconic dish — since generations",
  },
  {
    bg: '/media/Food%20background_1.png',
    food: '/media/chiken_biryani_bowl.png',
    kicker: 'Aromatic & Flavorful',
    title: ['Royal', 'Chicken', 'Biryani'],
    sub: 'Layered with saffron, spices & love',
  },
  {
    bg: '/media/Food_background%20_2.jpg',
    food: '/media/veg_biryani.png',
    kicker: 'Garden Fresh Flavours',
    title: ['Veg', 'Biryani', 'Delight'],
    sub: 'Aromatic rice with garden-fresh vegetables',
  },
  {
    bg: '/media/food_background_3.png',
    food: '/media/dal_tadka.png',
    kicker: 'Slow-Cooked Perfection',
    title: ['Dal', 'Makhni', 'Classic'],
    sub: 'Rich, creamy & full of Punjabi warmth',
  },
];

const foodVariants = {
  enter: {
    x: '-100%',
    y: 60,
    scale: 0.3,
    rotate: -20,
    opacity: 0,
    filter: 'blur(12px) drop-shadow(0 0 0px transparent)',
  },
  center: {
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    opacity: 1,
    filter: 'blur(0px) drop-shadow(0 30px 60px rgba(0,0,0,0.6))',
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 18,
      mass: 1.2,
      duration: 1.4,
    },
  },
  exit: {
    x: '110%',
    y: -60,
    scale: 0.25,
    rotate: 25,
    opacity: 0,
    filter: 'blur(14px) drop-shadow(0 0 0px transparent)',
    transition: {
      type: 'spring',
      stiffness: 60,
      damping: 20,
      duration: 1,
    },
  },
};

const glowVariants = {
  enter: { opacity: 0, scale: 0.3, x: '-100%' },
  center: {
    opacity: 0.4,
    scale: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 40, damping: 16, duration: 1.4 },
  },
  exit: {
    opacity: 0,
    scale: 0.3,
    x: '110%',
    transition: { type: 'spring', stiffness: 50, damping: 18, duration: 1 },
  },
};

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((idx) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(idx);
    setTimeout(() => setAnimating(false), 1200);
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

      <div className="hero-floaters" aria-hidden="true">
        <span className="floater f1"></span>
        <span className="floater f2"></span>
        <span className="floater f3"></span>
        <span className="floater f4"></span>
        <span className="floater f5"></span>
      </div>

      <div className="hero-split" key={current}>
        <div className="hero-food-side">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="hero-food-glow"
              variants={glowVariants}
              initial="enter"
              animate="center"
              exit="exit"
            />
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              className="hero-food"
              src={slide.food}
              alt={slide.title.join(' ')}
              variants={foodVariants}
              initial="enter"
              animate="center"
              exit="exit"
            />
          </AnimatePresence>
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
