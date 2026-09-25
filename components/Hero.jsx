'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import Picture from './Picture';
import OrderButton from './OrderButton';
import { site } from '@/data/site';
import { useReducedMotion } from '@/lib/useMediaQuery';

const SLIDES = [
  {
    bg: 'hero-bg-butter-chicken',
    food: 'butter-chicken-bowl',
    alt: 'Butter chicken in a white bowl, garnished with cream and coriander',
    kicker: 'Authentic taste of Punjab',
    title: ['Butter', 'Chicken', 'Special'],
    sub: "Punjab's most iconic dish, loved for generations",
  },
  {
    bg: 'hero-bg-spices',
    food: 'chicken-biryani',
    alt: 'Chicken biryani with raita',
    kicker: 'Aromatic & flavourful',
    title: ['Royal', 'Chicken', 'Biryani'],
    sub: 'Layered with saffron, whole spices and love',
  },
  {
    bg: 'hero-bg-slate',
    food: 'veg-biryani',
    alt: 'Vegetable biryani in a clay bowl',
    kicker: 'Garden-fresh flavours',
    title: ['Veg', 'Biryani', 'Delight'],
    sub: 'Fragrant rice with garden-fresh vegetables',
  },
  {
    bg: 'hero-bg-herbs',
    food: 'dal-makhani',
    alt: 'Dal makhni finished with cream and butter',
    kicker: 'Slow-cooked perfection',
    title: ['Dal', 'Makhni', 'Classic'],
    sub: 'Rich, creamy and full of Punjabi warmth',
  },
];

const INTERVAL = 6000;
const FOOD_SIZES = '(max-width: 740px) 64vw, (max-width: 1040px) 420px, 560px';

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(null);
  const [userPaused, setUserPaused] = useState(false);
  const [hold, setHold] = useState(false);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [interacted, setInteracted] = useState(false);
  // Slides are fetched one step ahead of the one on screen, not all at once.
  const [loadedUpTo, setLoadedUpTo] = useState(0);
  const rootRef = useRef(null);

  // Load the other slides only after the page (and the first slide) is done.
  useEffect(() => {
    const start = () => {
      const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1200));
      idle(() => {
        setReady(true);
        setLoadedUpTo(1);
      });
    };
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });
    return () => window.removeEventListener('load', start);
  }, []);

  useEffect(() => {
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    if (rootRef.current) io.observe(rootRef.current);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      io.disconnect();
    };
  }, []);

  const goTo = useCallback(
    (index) => {
      const next = (index + SLIDES.length) % SLIDES.length;
      if (next === current) return;
      setPrevious(current);
      setCurrent(next);
      setInteracted(true);
      setLoadedUpTo((n) => Math.max(n, next + 1));
    },
    [current],
  );

  const playing = ready && !userPaused && !hold && inView && pageVisible && !reduceMotion;

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => goTo(current + 1), INTERVAL);
    return () => clearTimeout(timer);
  }, [playing, current, goTo]);

  const slide = SLIDES[current];

  return (
    <section
      ref={rootRef}
      className="hero"
      aria-roledescription="carousel"
      aria-label="Signature dishes"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHold(true)}
      onPointerLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHold(false)}
    >
      <div className="hero-bgs" aria-hidden="true">
        {SLIDES.map((s, i) =>
          i <= loadedUpTo ? (
            <div key={s.bg} className={`hero-bg${i === current ? ' is-active' : ''}`}>
              <Picture name={s.bg} alt="" sizes="100vw" priority={i === 0} fetchPriority={i === 0 ? 'high' : 'low'} blur={false} />
            </div>
          ) : null,
        )}
      </div>
      <div className="hero-shade" aria-hidden="true" />

      <div className="hero-inner">
        <div className="hero-visual">
          <div className="hero-glow" aria-hidden="true" />
          <svg className="hero-ring" viewBox="0 0 400 400" aria-hidden="true">
            <defs>
              <path id="hero-ring-path" d="M200,200 m-184,0 a184,184 0 1,1 368,0 a184,184 0 1,1 -368,0" />
            </defs>
            <circle cx="200" cy="200" r="198" />
            <text>
              <textPath href="#hero-ring-path" textLength="1150" lengthAdjust="spacing">
                FLAVOURS OF PUNJAB • AUTHENTIC PUNJABI KITCHEN • OLD RAJINDER NAGAR • NEW DELHI •
              </textPath>
            </text>
          </svg>
          <div className="hero-steam" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          {SLIDES.map((s, i) => {
            if (i > loadedUpTo) return null;
            const state = i === current ? (interacted ? 'is-entering' : 'is-active') : i === previous ? 'is-leaving' : '';
            return (
              <div key={s.food} className={`hero-plate ${state}`} aria-hidden={i !== current}>
                <Picture
                  name={s.food}
                  alt={i === current ? s.alt : ''}
                  sizes={FOOD_SIZES}
                  priority={i === 0}
                  fetchPriority={i === 0 ? 'high' : 'low'}
                />
              </div>
            );
          })}
        </div>

        <div className="hero-copy">
          <h1 className="hero-eyebrow">Punjabi restaurant · Old Rajinder Nagar, New Delhi</h1>
          <div
            key={current}
            className={`hero-slide-text${interacted ? ' is-changing' : ''}`}
            aria-live={playing ? 'off' : 'polite'}
          >
            <p className="hero-kicker">{slide.kicker}</p>
            <p className="hero-title">
              {slide.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
            <p className="hero-sub">{slide.sub}</p>
          </div>

          <div className="hero-actions">
            <OrderButton brand="swiggy" />
            <OrderButton brand="zomato" />
          </div>
          <div className="hero-meta">
            <Link href="/menu" className="hero-menu-link">
              See the full menu
            </Link>
          </div>
        </div>
      </div>

      <div className="hero-controls">
        <button type="button" className="hero-arrow" onClick={() => goTo(current - 1)} aria-label="Previous dish">
          <ChevronLeft size={22} aria-hidden="true" />
        </button>
        <div className="hero-dots">
          {SLIDES.map((s, i) => (
            <button
              key={s.food}
              type="button"
              className={`hero-dot${i === current ? ' is-active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Show ${s.title.slice(0, 2).join(' ')}`}
              aria-current={i === current ? 'true' : undefined}
            />
          ))}
        </div>
        <button type="button" className="hero-arrow" onClick={() => goTo(current + 1)} aria-label="Next dish">
          <ChevronRight size={22} aria-hidden="true" />
        </button>
        {!reduceMotion && (
          <button
            type="button"
            className="hero-arrow hero-pause"
            onClick={() => setUserPaused((v) => !v)}
            aria-label={userPaused ? 'Play slideshow' : 'Pause slideshow'}
          >
            {userPaused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
          </button>
        )}
      </div>
    </section>
  );
}
