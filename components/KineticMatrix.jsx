'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles, Play, Pause } from 'lucide-react';

const KM_CSS = `
.km{position:relative;display:flex;width:100%;height:100%;flex-direction:column;justify-content:space-between;overflow:hidden;user-select:none;background:#06070a;transition:background .7s}
.km canvas{position:absolute;inset:0;display:block;width:100%;height:100%;cursor:crosshair}
.km-deck{position:relative;z-index:20;display:flex;flex-direction:column;justify-content:space-between;width:100%;height:100%;padding:24px}
@media(min-width:768px){.km-deck{padding:40px}}
.km-header{display:flex;width:100%;align-items:center;justify-content:space-between;font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-size:11px;color:rgba(160,163,175,1)}
.km-btn{display:flex;align-items:center;gap:6px;padding:6px 10px;border-radius:8px;border:1px solid rgba(64,64,64,.5);background:rgba(23,23,23,.7);backdrop-filter:blur(12px);cursor:pointer;transition:background .2s;color:rgba(229,231,235,1);font-family:inherit;font-size:10px;letter-spacing:.06em}
.km-btn:hover{background:rgba(38,38,38,.9)}
.km-btn svg{width:12px;height:12px}
.km-btns{display:flex;align-items:center;gap:8px}
.km-hero{pointer-events:none;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:16px}
.km-tagline{font-family:var(--script,Georgia,serif);color:var(--saffron,#d4a24e);font-size:clamp(20px,3vw,32px);opacity:.9}
.km-hero h1{font-family:var(--display,sans-serif);font-weight:900;text-transform:uppercase;letter-spacing:-.04em;color:#fff;font-size:clamp(36px,7vw,96px);line-height:1}
.km-sub{color:rgba(255,255,255,.5);font-size:clamp(13px,1.4vw,16px);letter-spacing:2px;text-transform:uppercase;max-width:500px}
.km-stats{pointer-events:none;display:flex;align-items:center;justify-content:center;gap:clamp(30px,6vw,80px);padding:0 20px}
.km-stat{display:flex;flex-direction:column;align-items:center;gap:4px}
.km-stat-num{font-family:var(--display,sans-serif);font-size:clamp(28px,4vw,52px);font-weight:900;color:#fff;line-height:1}
.km-stat-label{font-size:clamp(10px,1.1vw,13px);color:rgba(255,255,255,.4);letter-spacing:2px;text-transform:uppercase}
`;

function drawLatticeLink(ctx, n1, n2, restLen, isDark, nodeColor) {
  const dx = n1.x - n2.x;
  const dy = n1.y - n2.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const stretch = Math.abs(dist - restLen) / restLen;
  const isTensioned = n1.tension > 0.05 || n2.tension > 0.05 || stretch > 0.1;

  if (isTensioned) {
    const glow = Math.max(n1.tension, n2.tension, stretch * 2);
    ctx.strokeStyle = isDark
      ? `rgba(255,255,255,${Math.min(1, 0.25 + glow * 0.75)})`
      : `rgba(0,0,0,${Math.min(1, 0.25 + glow * 0.75)})`;
    ctx.lineWidth = 0.8 + glow * 1.4;
  } else {
    ctx.strokeStyle = `rgba(${nodeColor},${isDark ? 0.08 : 0.05})`;
    ctx.lineWidth = 0.65;
  }

  ctx.beginPath();
  ctx.moveTo(n1.x, n1.y);
  ctx.lineTo(n2.x, n2.y);
  ctx.stroke();
}

export default function KineticMatrix() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isRunning, setIsRunning] = useState(true);

  const pointerRef = useRef({
    x: -2000, y: -2000, prevX: -2000, prevY: -2000,
    vx: 0, vy: 0, radius: 220, isDown: false,
  });

  const nodesRef = useRef([]);
  const pulsesRef = useRef([]);
  const shockwavesRef = useRef([]);
  const dimensionsRef = useRef({ width: 0, height: 0, cols: 0, rows: 0, spacing: 52 });

  const buildLattice = useCallback((width, height) => {
    const spacing = 52;
    const cols = Math.ceil(width / spacing) + 1;
    const rows = Math.ceil(height / spacing) + 1;
    const nodes = [];

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const x = c * spacing;
        const y = r * spacing;
        nodes.push({
          x, y, vx: 0, vy: 0, baseX: x, baseY: y, col: c, row: r,
          radius: 1.4,
          label: `0x${((c * 17 + r * 31) % 256).toString(16).padStart(2, '0').toUpperCase()}`,
          tension: 0,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    }

    dimensionsRef.current = { width, height, cols, rows, spacing };
    nodesRef.current = nodes;
    pulsesRef.current = [];
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const rect = entry.contentRect;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = Math.floor(rect.width * dpr);
        canvas.height = Math.floor(rect.height * dpr);
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
        buildLattice(rect.width, rect.height);
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [buildLattice]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animId = 0;
    let lastTime = performance.now();

    const render = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.033);
      lastTime = now;

      if (!isRunning) { animId = requestAnimationFrame(render); return; }

      const { width, height, cols, rows, spacing } = dimensionsRef.current;
      const nodes = nodesRef.current;
      const pulses = pulsesRef.current;
      const shockwaves = shockwavesRef.current;
      const pointer = pointerRef.current;

      pointer.vx = (pointer.x - pointer.prevX) / (dt * 1000 || 1);
      pointer.vy = (pointer.y - pointer.prevY) / (dt * 1000 || 1);
      pointer.prevX = pointer.x;
      pointer.prevY = pointer.y;
      const mouseSpeed = Math.sqrt(pointer.vx * pointer.vx + pointer.vy * pointer.vy);

      const bgColor = '#06070a';
      const nodeColor = '255,255,255';
      const accentGlow = '255,255,255';

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += 400 * dt;
        sw.power *= Math.pow(0.12, dt);
        if (sw.radius > sw.maxRadius || sw.power < 0.01) shockwaves.splice(s, 1);
      }

      const SPRING_K = 26;
      const DAMPING = 0.85;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.pulsePhase += dt * 3.2;
        const dx = pointer.x - n.x;
        const dy = pointer.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < pointer.radius && dist > 0) {
          const ratio = 1 - dist / pointer.radius;
          const force = ratio * (1600 + mouseSpeed * 180 + (pointer.isDown ? 2400 : 0));
          const angle = Math.atan2(dy, dx);
          n.vx -= Math.cos(angle) * force * dt;
          n.vy -= Math.sin(angle) * force * dt;
          n.tension = Math.min(1, n.tension + ratio * 0.5);
        }

        for (let s = 0; s < shockwaves.length; s++) {
          const sw = shockwaves[s];
          const swDx = n.x - sw.x;
          const swDy = n.y - sw.y;
          const swDist = Math.sqrt(swDx * swDx + swDy * swDy);
          const delta = Math.abs(swDist - sw.radius);
          if (delta < 55) {
            const force = (1 - delta / 55) * sw.power * 2800;
            const angle = Math.atan2(swDy, swDx);
            n.vx += Math.cos(angle) * force * dt;
            n.vy += Math.sin(angle) * force * dt;
            n.tension = 1.0;
          }
        }

        const hx = n.baseX - n.x;
        const hy = n.baseY - n.y;
        n.vx += hx * SPRING_K * dt;
        n.vy += hy * SPRING_K * dt;
        n.vx *= DAMPING;
        n.vy *= DAMPING;
        n.x += n.vx * dt * 60;
        n.y += n.vy * dt * 60;
        n.tension = Math.max(0, n.tension - dt * 0.9);
      }

      if (Math.random() < 0.3 && nodes.length > 0 && pulses.length < 40) {
        const fromIdx = Math.floor(Math.random() * nodes.length);
        const fromNode = nodes[fromIdx];
        const dirs = [{ dc: 1, dr: 0 }, { dc: -1, dr: 0 }, { dc: 0, dr: 1 }, { dc: 0, dr: -1 }];
        const dir = dirs[Math.floor(Math.random() * dirs.length)];
        const tc = fromNode.col + dir.dc;
        const tr = fromNode.row + dir.dr;
        if (tc >= 0 && tc < cols && tr >= 0 && tr < rows) {
          const toIdx = tc * rows + tr;
          if (toIdx >= 0 && toIdx < nodes.length) {
            pulses.push({ fromNode: fromIdx, toNode: toIdx, progress: 0, speed: 1.6 + Math.random() * 2.2 });
          }
        }
      }

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const idx = c * rows + r;
          const n = nodes[idx];
          if (!n) continue;
          if (c < cols - 1) {
            const nr = nodes[(c + 1) * rows + r];
            if (nr) drawLatticeLink(ctx, n, nr, spacing, true, nodeColor);
          }
          if (r < rows - 1) {
            const nd = nodes[c * rows + (r + 1)];
            if (nd) drawLatticeLink(ctx, n, nd, spacing, true, nodeColor);
          }
        }
      }

      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.progress += dt * pulse.speed;
        const n1 = nodes[pulse.fromNode];
        const n2 = nodes[pulse.toNode];
        if (!n1 || !n2 || pulse.progress >= 1) {
          if (n2) n2.tension = Math.min(1, n2.tension + 0.35);
          pulses.splice(p, 1);
          continue;
        }
        const px = n1.x + (n2.x - n1.x) * pulse.progress;
        const py = n1.y + (n2.y - n1.y) * pulse.progress;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(px, py, 2.0, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const dx = pointer.x - n.x;
        const dy = pointer.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const isNear = dist < pointer.radius;
        const currentRadius = isNear
          ? n.radius * 2.2 + n.tension * 1.5
          : n.radius + Math.sin(n.pulsePhase) * 0.25;

        if (isNear || n.tension > 0.1) {
          ctx.fillStyle = `rgba(${accentGlow},${Math.min(1, 0.25 + n.tension * 0.65)})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, currentRadius * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = isNear || n.tension > 0.1
          ? '#ffffff'
          : `rgba(${nodeColor},0.28)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, Math.max(0.8, currentRadius), 0, Math.PI * 2);
        ctx.fill();

        if (dist < 90) {
          const radarRing = ((n.pulsePhase * 20) % 32) + 4;
          const ringAlpha = (1 - radarRing / 36) * 0.35;
          ctx.strokeStyle = `rgba(${accentGlow},${ringAlpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(n.x, n.y, radarRing, 0, Math.PI * 2);
          ctx.stroke();
          ctx.font = '8px ui-monospace,SFMono-Regular,Consolas,monospace';
          ctx.fillStyle = `rgba(${accentGlow},0.85)`;
          ctx.fillText(n.label, n.x + 9, n.y - 9);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isRunning]);

  const handlePointerMove = (e) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    pointerRef.current.x = e.clientX - rect.left;
    pointerRef.current.y = e.clientY - rect.top;
  };

  const handlePointerDown = (e) => {
    const container = containerRef.current;
    if (!container) return;
    pointerRef.current.isDown = true;
    const rect = container.getBoundingClientRect();
    shockwavesRef.current.push({
      x: e.clientX - rect.left, y: e.clientY - rect.top,
      radius: 8, maxRadius: 420, power: 1.2,
    });
  };

  const handlePointerUp = () => { pointerRef.current.isDown = false; };

  const handlePointerLeave = () => {
    pointerRef.current.x = -2000;
    pointerRef.current.y = -2000;
    pointerRef.current.isDown = false;
  };

  const triggerCentralImpulse = () => {
    const { width, height } = dimensionsRef.current;
    shockwavesRef.current.push({
      x: width / 2, y: height / 2,
      radius: 10, maxRadius: Math.max(width, height) * 0.85, power: 1.4,
    });
  };

  return (
    <>
      <style>{KM_CSS}</style>
      <section
        ref={containerRef}
        className="km"
        onMouseMove={handlePointerMove}
        onMouseDown={handlePointerDown}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerLeave}
        style={{ height: '80vh' }}
      >
        <canvas ref={canvasRef} />
        <div className="km-deck">
          <header className="km-header">
            <div className="km-btns">
              <button className="km-btn" onClick={triggerCentralImpulse} title="Trigger Shockwave">
                <Sparkles />
                <span>PULSE</span>
              </button>
              <button className="km-btn" onClick={() => setIsRunning(v => !v)}>
                {isRunning ? <Pause /> : <Play />}
                <span>{isRunning ? 'FREEZE' : 'RUN'}</span>
              </button>
            </div>
          </header>
          <main className="km-hero">
            <p className="km-tagline">Craving Something Special?</p>
            <h1>Order Online</h1>
            <p className="km-sub">Skip the wait. Get authentic Punjabi flavours delivered to your door via Swiggy & Zomato</p>
          </main>
          <div className="km-stats">
            <div className="km-stat">
              <span className="km-stat-num">4.5</span>
              <span className="km-stat-label">Google Rating</span>
            </div>
            <div className="km-stat">
              <span className="km-stat-num">150+</span>
              <span className="km-stat-label">Dishes</span>
            </div>
            <div className="km-stat">
              <span className="km-stat-num">10K+</span>
              <span className="km-stat-label">Happy Customers</span>
            </div>
            <div className="km-stat">
              <span className="km-stat-num">5+</span>
              <span className="km-stat-label">Years Serving</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
