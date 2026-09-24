'use client';
import { useEffect, useRef } from 'react';

/**
 * Glowing embers drifting up from a tandoor. A few dozen particles on a 2D
 * canvas at 1x pixel ratio; it only animates while on screen and the tab is
 * visible, and stays still for reduced-motion users.
 */
export default function EmberCanvas({ density = 0.00005 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let embers = [];
    let raf = 0;
    let running = false;
    let visible = false;
    let last = 0;

    const spawn = (atBottom) => ({
      x: Math.random() * width,
      y: atBottom ? height + Math.random() * 40 : Math.random() * height,
      r: 0.6 + Math.random() * 1.8,
      vy: 14 + Math.random() * 36,
      sway: 6 + Math.random() * 16,
      phase: Math.random() * Math.PI * 2,
      life: 0.35 + Math.random() * 0.65,
      hue: 18 + Math.random() * 26,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas.width = width;
      canvas.height = height;
      const count = Math.min(90, Math.round(width * height * density));
      embers = Array.from({ length: count }, () => spawn(false));
      if (!running) draw(0);
    };

    const draw = (dt) => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';
      for (const e of embers) {
        e.y -= e.vy * dt;
        e.phase += dt * 1.4;
        if (e.y < -10) Object.assign(e, spawn(true));
        const fade = Math.min(1, e.y / (height * 0.9)) * e.life;
        const x = e.x + Math.sin(e.phase) * e.sway;
        const glow = ctx.createRadialGradient(x, e.y, 0, x, e.y, e.r * 5);
        glow.addColorStop(0, `hsla(${e.hue}, 100%, 70%, ${0.9 * fade})`);
        glow.addColorStop(1, `hsla(${e.hue}, 100%, 50%, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, e.y, e.r * 5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
    };

    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      draw(dt);
      raf = requestAnimationFrame(loop);
    };

    const update = () => {
      const shouldRun = visible && !document.hidden && !reduce;
      if (shouldRun && !running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(loop);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    io.observe(canvas);
    document.addEventListener('visibilitychange', update);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, [density]);

  return <canvas ref={ref} className="ember-canvas" aria-hidden="true" />;
}
