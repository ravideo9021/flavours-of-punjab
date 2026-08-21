'use client';
import { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const CF_CSS = `
.cf-wrap{width:100%;user-select:none}
.cf-frame-outer{position:relative}
.cf-frame{cursor:grab;overflow:hidden;padding:40px 0;outline:none;touch-action:pan-y}
.cf-frame:active{cursor:grabbing}
.cf-frame:focus-visible{box-shadow:0 0 0 2px var(--saffron,#d4a24e)}
.cf-stage{position:relative;height:var(--cf-card);transform-style:preserve-3d}
.cf-card{position:absolute;left:50%;top:0;width:var(--cf-card);aspect-ratio:1;overflow:hidden;border-radius:16px;background:rgba(255,255,255,.05);box-shadow:0 10px 40px rgba(0,0,0,.5);will-change:transform}
.cf-card img{width:100%;height:100%;object-fit:cover;pointer-events:none;user-select:none}
.cf-nav-btn{position:absolute;top:50%;z-index:200;transform:translateY(-50%);width:44px;height:44px;border-radius:50%;border:1.5px solid rgba(255,255,255,.2);background:rgba(13,11,9,.7);backdrop-filter:blur(8px);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .2s,border-color .2s}
.cf-nav-btn:hover{background:rgba(13,11,9,.9);border-color:rgba(255,255,255,.4)}
.cf-nav-btn svg{width:20px;height:20px}
.cf-nav-prev{left:16px}
.cf-nav-next{right:16px}
.cf-caption{margin-top:8px;display:flex;flex-direction:column;align-items:center;padding:0 24px;animation:cfFadeIn .3s ease}
.cf-caption-title{font-family:var(--display,sans-serif);font-size:20px;font-weight:700;color:#fff;letter-spacing:.5px;text-transform:uppercase}
.cf-caption-sub{margin-top:4px;font-size:13px;color:rgba(255,255,255,.5);letter-spacing:1px;text-transform:uppercase}
.cf-dots{margin-top:20px;display:flex;align-items:center;justify-content:center;gap:8px}
.cf-dot{width:8px;height:8px;border-radius:50%;border:0;background:#fff;opacity:.25;cursor:pointer;padding:0;transition:opacity .2s}
.cf-dot.active{opacity:1}
@keyframes cfFadeIn{from{opacity:0}to{opacity:1}}
`;

export default function CoverflowCarousel({
  slides,
  rotate = 44,
  depth = 0.6,
  perspective = 3,
  falloff = 0.56,
  fade = 0.1,
  cardWidth = 'clamp(148px, 22vw, 260px)',
  gap = 0.05,
  loop = true,
  showCaption = false,
  showPagination = false,
  showNavigation = false,
  label = 'Cover carousel',
  className = '',
  cardClassName = '',
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

  const indexAt = useCallback(
    (pos) => ((Math.round(pos) % count) + count) % count,
    [count]
  );

  const paint = useCallback(() => {
    const width = widthRef.current;
    if (!width) return;
    const pitch = width * (1 + gap);
    const pos = posRef.current;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      let offset = index - pos;
      if (loop) {
        offset = ((offset % count) + count) % count;
        if (offset > count / 2) offset -= count;
      }
      const distance = Math.abs(offset);
      const ramp = Math.pow(distance, falloff);
      const tilt = Math.min(rotate * ramp, 82) * Math.sign(offset);

      card.style.transform =
        `translateX(calc(-50% + ${offset * pitch}px)) ` +
        `translateZ(${-depth * width * ramp}px) rotateY(${-tilt}deg)`;

      const edge = loop ? Math.min(1, Math.max(0, count / 2 - distance)) : 1;
      card.style.opacity = String(Math.max(0, 1 - fade * distance) * edge);
      card.style.zIndex = String(100 - Math.round(distance));
    });
  }, [count, depth, fade, falloff, gap, loop, rotate]);

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
    [indexAt, paint]
  );

  const clamp = useCallback(
    (pos) => (loop ? pos : Math.max(0, Math.min(count - 1, pos))),
    [count, loop]
  );

  const goTo = useCallback(
    (index) => {
      const target = loop
        ? index + Math.round((targetRef.current - index) / count) * count
        : index;
      settle(clamp(target));
    },
    [clamp, count, loop, settle]
  );

  const nudge = useCallback(
    (by) => settle(clamp(Math.round(targetRef.current) + by)),
    [clamp, settle]
  );

  const onPointerDown = (e) => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    e.currentTarget.setPointerCapture(e.pointerId);
    targetRef.current = posRef.current;
    dragRef.current = {
      id: e.pointerId,
      x: e.clientX,
      pos: posRef.current,
      v: 0,
      t: performance.now(),
    };
  };

  const onPointerMove = (e) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== e.pointerId) return;
    const pitch = widthRef.current * (1 + gap);
    if (!pitch) return;
    const now = performance.now();
    const previous = posRef.current;
    posRef.current = clamp(drag.pos - (e.clientX - drag.x) / pitch);
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
    settle(clamp(Math.round(posRef.current + carried)));
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

  useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  const active = slides[selected];

  return (
    <>
      <style>{CF_CSS}</style>
      <div
        className={`cf-wrap ${className}`}
        style={{ '--cf-card': cardWidth }}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
      >
        <div className="cf-frame-outer">
          <div
            ref={frameRef}
            tabIndex={0}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') { e.preventDefault(); nudge(-1); }
              else if (e.key === 'ArrowRight') { e.preventDefault(); nudge(1); }
            }}
            className="cf-frame"
            style={{ perspective: `calc(var(--cf-card) * ${perspective})` }}
          >
            <div className="cf-stage">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  ref={(node) => { cardRefs.current[index] = node; }}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${count}`}
                  className={`cf-card ${cardClassName}`}
                >
                  <img src={slide.src} alt={slide.alt} draggable={false} />
                </div>
              ))}
            </div>
          </div>

          {showNavigation && (
            <>
              <button
                type="button"
                aria-label="Previous slide"
                onClick={() => nudge(-1)}
                className="cf-nav-btn cf-nav-prev"
              >
                <ChevronLeft />
              </button>
              <button
                type="button"
                aria-label="Next slide"
                onClick={() => nudge(1)}
                className="cf-nav-btn cf-nav-next"
              >
                <ChevronRight />
              </button>
            </>
          )}
        </div>

        {showCaption && active?.title && (
          <div key={selected} className="cf-caption">
            <p className="cf-caption-title">{active.title}</p>
            {active.subtitle && <p className="cf-caption-sub">{active.subtitle}</p>}
          </div>
        )}

        {showPagination && (
          <div className="cf-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === selected}
                onClick={() => goTo(index)}
                className={`cf-dot ${index === selected ? 'active' : ''}`}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
