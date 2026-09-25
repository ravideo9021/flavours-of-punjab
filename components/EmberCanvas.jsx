'use client';
import { useEffect, useRef, useState } from 'react';
import { Flame, Pause, Play } from 'lucide-react';
import { useReducedMotion } from '@/lib/useMediaQuery';

const REACH = 170; // how far the pointer stirs the embers, px
const GRAVITY = 520; // px/s² pulling sparks back down

/**
 * Glowing embers drifting up from a tandoor, and you can stoke them: the
 * embers swirl away from the pointer and brighten, and a click or tap throws
 * a shower of sparks. A few dozen particles on a 2D canvas; it only animates
 * while on screen and the tab is visible, can be paused, and stays still for
 * reduced-motion users.
 */
export default function EmberCanvas({ density = 0.00006 }) {
  const ref = useRef(null);
  const api = useRef({ stoke: () => {}, setPaused: () => {} });
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    const section = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !section) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let embers = [];
    const sparks = [];
    const pointer = { x: -9999, y: -9999 };
    let raf = 0;
    let running = false;
    let visible = false;
    let userPaused = false;
    let last = 0;

    const spawn = (atBottom) => ({
      x: Math.random() * width,
      y: atBottom ? height + Math.random() * 40 : Math.random() * height,
      vx: 0,
      r: 0.6 + Math.random() * 1.8,
      vy: 14 + Math.random() * 36,
      sway: 6 + Math.random() * 16,
      phase: Math.random() * Math.PI * 2,
      life: 0.35 + Math.random() * 0.65,
      hue: 18 + Math.random() * 26,
      heat: 0,
    });

    const burst = (x, y, count, spread = Math.PI * 2, angle = -Math.PI / 2, power = 1) => {
      for (let i = 0; i < count && sparks.length < 260; i++) {
        const a = angle + (Math.random() - 0.5) * spread;
        const speed = (160 + Math.random() * 420) * power;
        sparks.push({
          x,
          y,
          vx: Math.cos(a) * speed,
          vy: Math.sin(a) * speed,
          life: 0.6 + Math.random() * 0.7,
          age: 0,
          hue: 20 + Math.random() * 30,
        });
      }
    };

    const resize = () => {
      width = Math.max(1, section.clientWidth);
      height = Math.max(1, section.clientHeight);
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(110, Math.round(width * height * density));
      embers = Array.from({ length: count }, () => spawn(false));
      if (!running) draw(0);
    };

    const draw = (dt) => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      for (const e of embers) {
        // Stir: push away from the pointer with a little swirl, and heat up.
        const dx = e.x - pointer.x;
        const dy = e.y - pointer.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REACH && dist > 0.5) {
          const f = (1 - dist / REACH) * 900 * dt;
          e.vx += (dx / dist) * f - (dy / dist) * f * 0.6;
          e.y += (dy / dist) * f * 0.25;
          e.heat = Math.min(1, e.heat + (1 - dist / REACH) * dt * 4);
        }
        e.vx *= Math.pow(0.08, dt);
        e.x += e.vx * dt;
        e.y -= e.vy * dt * (1 + e.heat);
        e.phase += dt * 1.4;
        e.heat = Math.max(0, e.heat - dt * 0.8);
        if (e.y < -10 || e.x < -40 || e.x > width + 40) Object.assign(e, spawn(true));

        const fade = Math.min(1, e.y / (height * 0.9)) * e.life;
        const x = e.x + Math.sin(e.phase) * e.sway;
        const r = e.r * (5 + e.heat * 4);
        const glow = ctx.createRadialGradient(x, e.y, 0, x, e.y, r);
        glow.addColorStop(0, `hsla(${e.hue + e.heat * 12}, 100%, ${70 + e.heat * 15}%, ${Math.min(1, (0.9 + e.heat) * fade)})`);
        glow.addColorStop(1, `hsla(${e.hue}, 100%, 50%, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, e.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Sparks: short bright streaks that arc and fall.
      ctx.lineCap = 'round';
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.age += dt;
        if (s.age >= s.life) {
          sparks.splice(i, 1);
          continue;
        }
        s.vy += GRAVITY * dt;
        s.vx *= Math.pow(0.35, dt);
        s.vy *= Math.pow(0.6, dt);
        const px = s.x;
        const py = s.y;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        const t = 1 - s.age / s.life;
        ctx.strokeStyle = `hsla(${s.hue}, 100%, ${52 + t * 20}%, ${Math.min(1, t * 1.3)})`;
        ctx.lineWidth = 1.4 + t * 1.8;
        ctx.beginPath();
        ctx.moveTo(px - s.vx * 0.012, py - s.vy * 0.012);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
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
      const shouldRun = visible && !document.hidden && !reduce && !userPaused;
      if (shouldRun && !running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(loop);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };

    const local = (e) => {
      const rect = section.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMove = (e) => {
      if (e.pointerType === 'touch') return;
      const p = local(e);
      pointer.x = p.x;
      pointer.y = p.y;
    };
    const onDown = (e) => {
      // Sparks on the open background only, not when tapping or swiping a card or button.
      if (reduce || userPaused || e.target.closest?.('a, button, .order-card, .meal-card')) return;
      const p = local(e);
      burst(p.x, p.y, 42, Math.PI * 1.6);
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    api.current = {
      stoke: () => {
        userPaused = false;
        update();
        for (let i = 0; i < 5; i++) burst(width * (0.3 + i * 0.1), height + 5, 26, 0.9, -Math.PI / 2, 1.5);
      },
      setPaused: (value) => {
        userPaused = value;
        update();
      },
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    const ro = new ResizeObserver(resize);
    ro.observe(section);
    io.observe(section);
    document.addEventListener('visibilitychange', update);
    section.addEventListener('pointermove', onMove);
    section.addEventListener('pointerdown', onDown);
    section.addEventListener('pointerleave', onLeave);
    section.addEventListener('pointercancel', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', update);
      section.removeEventListener('pointermove', onMove);
      section.removeEventListener('pointerdown', onDown);
      section.removeEventListener('pointerleave', onLeave);
      section.removeEventListener('pointercancel', onLeave);
    };
  }, [density]);

  const togglePause = () => {
    api.current.setPaused(!paused);
    setPaused(!paused);
  };

  const stoke = () => {
    setPaused(false);
    api.current.stoke();
  };

  return (
    <>
      <canvas ref={ref} className="ember-canvas" aria-hidden="true" />
      {!reduceMotion && (
        <div className="ember-controls">
          <button type="button" className="ember-btn" onClick={stoke} aria-label="Stoke the tandoor">
            <Flame size={14} aria-hidden="true" /> <span aria-hidden="true">Stoke</span>
          </button>
          <button
            type="button"
            className="ember-btn"
            onClick={togglePause}
            aria-label={paused ? 'Play the background animation' : 'Pause the background animation'}
          >
            {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
            <span aria-hidden="true">{paused ? 'Play' : 'Pause'}</span>
          </button>
        </div>
      )}
    </>
  );
}
