'use client';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Picture from './Picture';

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * 3D coverflow carousel: drag, swipe, arrow keys or buttons. It only runs
 * requestAnimationFrame while a slide is settling, so it costs nothing at rest.
 */
export default function CoverflowCarousel({
  slides,
  rotate = 44,
  depth = 0.6,
  perspective = 3,
  falloff = 0.56,
  fade = 0.1,
  cardWidth = 'clamp(180px, 25vw, 300px)',
  sizes = '(max-width: 740px) 50vw, 300px',
  gap = 0.05,
  label = 'Carousel',
}) {
  const count = slides.length;
  const frameRef = useRef(null);
  const cardRefs = useRef([]);
  const posRef = useRef(0);
  const targetRef = useRef(0);
  const widthRef = useRef(0);
  const rafRef = useRef(null);
  const dragRef = useRef(null);
  const [selected, setSelected] = useState(0);

  const indexAt = useCallback((pos) => ((Math.round(pos) % count) + count) % count, [count]);

  const paint = useCallback(() => {
    const width = widthRef.current;
    if (!width) return;
    const pitch = width * (1 + gap);
    const pos = posRef.current;
    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      let offset = (((index - pos) % count) + count) % count;
      if (offset > count / 2) offset -= count;
      const distance = Math.abs(offset);
      const ramp = Math.pow(distance, falloff);
      const tilt = Math.min(rotate * ramp, 82) * Math.sign(offset);
      card.style.transform = `translateX(calc(-50% + ${offset * pitch}px)) translateZ(${-depth * width * ramp}px) rotateY(${-tilt}deg)`;
      const edge = Math.min(1, Math.max(0, count / 2 - distance));
      card.style.opacity = String(Math.max(0, 1 - fade * distance) * edge);
      card.style.zIndex = String(100 - Math.round(distance));
      card.style.visibility = distance > 3.5 ? 'hidden' : 'visible';
    });
  }, [count, depth, fade, falloff, gap, rotate]);

  const settle = useCallback(
    (target) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      targetRef.current = target;
      setSelected(indexAt(target));
      const step = () => {
        const remaining = target - posRef.current;
        if (Math.abs(remaining) < 0.0004) {
          posRef.current = target;
          paint();
          rafRef.current = null;
          return;
        }
        posRef.current += remaining * 0.16;
        paint();
        rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    },
    [indexAt, paint],
  );

  const goTo = (index) => settle(index + Math.round((targetRef.current - index) / count) * count);
  const nudge = (by) => settle(Math.round(targetRef.current) + by);

  const onPointerDown = (e) => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    e.currentTarget.setPointerCapture(e.pointerId);
    targetRef.current = posRef.current;
    dragRef.current = { id: e.pointerId, x: e.clientX, pos: posRef.current, v: 0, t: performance.now() };
  };

  const onPointerMove = (e) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== e.pointerId) return;
    const pitch = widthRef.current * (1 + gap);
    if (!pitch) return;
    const now = performance.now();
    const previous = posRef.current;
    posRef.current = drag.pos - (e.clientX - drag.x) / pitch;
    drag.v = ((posRef.current - previous) / Math.max(now - drag.t, 1)) * 1000;
    drag.t = now;
    const index = indexAt(posRef.current);
    if (index !== selected) setSelected(index);
    paint();
  };

  const endDrag = (e) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== e.pointerId) return;
    dragRef.current = null;
    const carried = Math.max(-2, Math.min(2, drag.v * 0.18));
    settle(Math.round(posRef.current + carried));
  };

  useIsoLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const measure = () => {
      const card = cardRefs.current[0];
      if (!card) return;
      widthRef.current = card.offsetWidth;
      paint();
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [paint]);

  useEffect(() => () => rafRef.current !== null && cancelAnimationFrame(rafRef.current), []);

  const active = slides[selected];

  return (
    <div className="cf" style={{ '--cf-card': cardWidth }} role="region" aria-roledescription="carousel" aria-label={label}>
      <div className="cf-frame-outer">
        <div
          ref={frameRef}
          tabIndex={0}
          className="cf-frame"
          style={{ perspective: `calc(var(--cf-card) * ${perspective})` }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') {
              e.preventDefault();
              nudge(-1);
            } else if (e.key === 'ArrowRight') {
              e.preventDefault();
              nudge(1);
            }
          }}
          aria-label={`${label}: use the arrow keys to browse`}
        >
          <div className="cf-stage">
            {slides.map((slide, index) => (
              <div
                key={slide.image}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${count}: ${slide.title}`}
                aria-hidden={index !== selected}
                className={`cf-card cf-card--${slide.fit ?? 'cover'}`}
              >
                <Picture name={slide.image} alt={slide.alt} sizes={sizes} draggable={false} />
              </div>
            ))}
          </div>
        </div>

        <button type="button" aria-label="Previous photo" onClick={() => nudge(-1)} className="cf-nav cf-nav--prev">
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <button type="button" aria-label="Next photo" onClick={() => nudge(1)} className="cf-nav cf-nav--next">
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>

      <div key={selected} className="cf-caption" aria-live="polite">
        <p className="cf-caption-title">{active.title}</p>
        {active.subtitle && <p className="cf-caption-sub">{active.subtitle}</p>}
      </div>

      <div className="cf-dots">
        {slides.map((slide, index) => (
          <button
            key={slide.image}
            type="button"
            aria-label={`Show ${slide.title}`}
            aria-current={index === selected ? 'true' : undefined}
            onClick={() => goTo(index)}
            className={`cf-dot${index === selected ? ' is-active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
