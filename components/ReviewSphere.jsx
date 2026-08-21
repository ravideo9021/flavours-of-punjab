'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

const RS_CSS = `
.rs-wrap{position:relative;width:100%;padding:100px clamp(24px,5vw,80px);background:#0a0a0a;overflow:hidden}
.rs-layout{display:grid;grid-template-columns:1fr 1fr;gap:40px;max-width:1400px;margin:0 auto;align-items:center;min-height:560px}
.rs-left{position:relative;z-index:5}
.rs-left .script{color:var(--saffron,#d4a24e);font-family:var(--script,Georgia,serif);font-size:clamp(22px,3vw,36px);margin-bottom:6px}
.rs-left h2{color:#fff;font-size:clamp(36px,5vw,64px);font-weight:800;letter-spacing:-.02em;text-transform:uppercase;line-height:.88;margin-bottom:40px}
.rs-review-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:28px;animation:rs-slide-in .5s ease-out}
.rs-review-stars{color:#fbbf24;font-size:22px;letter-spacing:3px;margin-bottom:14px}
.rs-review-text{color:rgba(255,255,255,.8);font-size:17px;line-height:1.7;margin-bottom:20px;font-style:italic;min-height:52px}
.rs-review-author{display:flex;align-items:center;gap:12px}
.rs-review-avatar{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:18px;flex-shrink:0}
.rs-review-name{font-weight:700;color:#fff;font-size:15px}
.rs-review-date{font-size:12px;color:rgba(255,255,255,.4);margin-top:2px}
.rs-review-google{display:flex;align-items:center;gap:6px;margin-top:16px;padding-top:16px;border-top:1px solid rgba(255,255,255,.06);font-size:12px;color:rgba(255,255,255,.35)}
.rs-review-nav{display:flex;gap:8px;margin-top:20px}
.rs-review-dot{width:10px;height:10px;border-radius:50%;border:0;background:rgba(255,255,255,.15);cursor:pointer;padding:0;transition:all .3s}
.rs-review-dot.active{background:var(--saffron,#d4a24e);transform:scale(1.2)}
.rs-right{position:relative;display:flex;align-items:center;justify-content:center}
.rs-container{position:relative;cursor:grab}
.rs-container:active{cursor:grabbing}
.rs-node{position:absolute;cursor:pointer;user-select:none;transition:transform .2s ease-out}
.rs-node-inner{position:relative;width:100%;height:100%;border-radius:50%;overflow:hidden;border:2px solid rgba(255,255,255,.18);box-shadow:0 4px 24px rgba(0,0,0,.5)}
.rs-node-inner img{width:100%;height:100%;object-fit:cover;display:block}
.rs-node-inner::after{content:'';position:absolute;inset:0;border-radius:50%;background:linear-gradient(135deg,rgba(255,255,255,.08),transparent 50%)}
@keyframes rs-slide-in{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
@media(max-width:900px){
  .rs-layout{grid-template-columns:1fr;text-align:center}
  .rs-left{order:1}
  .rs-right{order:0;margin-bottom:20px}
  .rs-left h2{font-size:clamp(32px,8vw,48px)}
  .rs-review-nav{justify-content:center}
}
@media(max-width:600px){.rs-container{transform:scale(.8);transform-origin:center center}}
`;

const REVIEWS = [
  { name: 'Vishal Khurmi', date: '14 April 2024', stars: 5, text: '"Good service by Jeel. Amazing food and the ambience was perfect for a family dinner. Will definitely visit again!"', avatar: 'V', color: '#4CAF50' },
  { name: 'Jay Sadaniya', date: '14 April 2024', stars: 5, text: '"Very good taste and best service specially from Janki. The butter chicken was outstanding. Will definitely come back!"', avatar: 'J', color: '#2196F3' },
  { name: 'Brijal Patel', date: '14 April 2024', stars: 5, text: '"Went there with a group of friends, had a great time. Fast service and the complimentary dessert was a lovely touch!"', avatar: 'B', color: '#9C27B0' },
  { name: 'Rajveer Singh', date: '22 March 2024', stars: 5, text: '"The butter chicken and garlic naan here is absolutely divine. Takes me straight back to Punjab. A must-visit restaurant!"', avatar: 'R', color: '#FF9800' },
  { name: 'Priya Mehta', date: '10 March 2024', stars: 5, text: '"We hosted our family gathering and ordered the tandoori platter — it was outstanding! Great portions and authentic flavours."', avatar: 'P', color: '#E91E63' },
];

const FOOD_IMAGES = [
  '/media/Butter-Chicken.jpg',
  '/media/Dal%20Makhani.png',
  '/media/palak_paneer.jpg',
  '/media/b45da0506d942600.jpg',
  '/media/palak_paneer.jpg',
  '/media/veg_biryani_bg.jpg',
  '/media/butter_chicken_bg.png',
  '/media/paneer_tikka_bg.jpg',
];

function buildImageData() {
  const items = [];
  for (let i = 0; i < 28; i++) {
    items.push({
      id: `sphere-${i}`,
      src: FOOD_IMAGES[i % FOOD_IMAGES.length],
      alt: `Food ${i + 1}`,
    });
  }
  return items;
}

function normalizeAngle(a) {
  while (a > 180) a -= 360;
  while (a < -180) a += 360;
  return a;
}

const DEG2RAD = Math.PI / 180;

export default function ReviewSphere() {
  const images = useRef(buildImageData()).current;
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [rotation, setRotation] = useState({ x: 15, y: 15 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [activeReview, setActiveReview] = useState(0);
  const [positions, setPositions] = useState([]);
  const lastMouse = useRef({ x: 0, y: 0 });
  const animRef = useRef(null);
  const reviewTimer = useRef(null);

  const SIZE = 520;
  const RADIUS = 210;
  const IMG_SCALE = 0.22;
  const MOMENTUM = 0.96;
  const MAX_SPEED = 5;
  const DRAG_SENS = 0.5;

  const clamp = (v) => Math.max(-MAX_SPEED, Math.min(MAX_SPEED, v));
  const baseImgSize = SIZE * IMG_SCALE;

  const genPositions = useCallback(() => {
    const golden = (1 + Math.sqrt(5)) / 2;
    const inc = 2 * Math.PI / golden;
    const pos = [];
    const n = images.length;
    for (let i = 0; i < n; i++) {
      const t = i / n;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = inc * i;
      let phi = inclination * (180 / Math.PI);
      let theta = (azimuth * (180 / Math.PI)) % 360;
      const bonus = Math.pow(Math.abs(phi - 90) / 90, 0.6) * 35;
      phi = phi < 90 ? Math.max(5, phi - bonus) : Math.min(175, phi + bonus);
      phi = 15 + (phi / 180) * 150;
      theta = (theta + (Math.random() - 0.5) * 20) % 360;
      phi = Math.max(0, Math.min(180, phi + (Math.random() - 0.5) * 10));
      pos.push({ theta, phi, radius: RADIUS });
    }
    return pos;
  }, [images.length]);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setPositions(genPositions()); }, [genPositions]);

  useEffect(() => {
    reviewTimer.current = setInterval(() => {
      setActiveReview(r => (r + 1) % REVIEWS.length);
    }, 4000);
    return () => clearInterval(reviewTimer.current);
  }, []);

  const worldPositions = useCallback(() => {
    return positions.map((pos, index) => {
      const tR = pos.theta * DEG2RAD;
      const pR = pos.phi * DEG2RAD;
      const rxR = rotation.x * DEG2RAD;
      const ryR = rotation.y * DEG2RAD;

      let x = pos.radius * Math.sin(pR) * Math.cos(tR);
      let y = pos.radius * Math.cos(pR);
      let z = pos.radius * Math.sin(pR) * Math.sin(tR);

      const x1 = x * Math.cos(ryR) + z * Math.sin(ryR);
      const z1 = -x * Math.sin(ryR) + z * Math.cos(ryR);
      x = x1; z = z1;

      const y2 = y * Math.cos(rxR) - z * Math.sin(rxR);
      const z2 = y * Math.sin(rxR) + z * Math.cos(rxR);
      y = y2; z = z2;

      const fadeStart = -10, fadeEnd = -30;
      const isVisible = z > fadeEnd;
      let fadeOpacity = 1;
      if (z <= fadeStart) fadeOpacity = Math.max(0, (z - fadeEnd) / (fadeStart - fadeEnd));

      const dist2D = Math.sqrt(x * x + y * y);
      const distRatio = Math.min(dist2D / RADIUS, 1);
      const centerScale = Math.max(0.3, 1 - distRatio * 0.7);
      const depthScale = (z + RADIUS) / (2 * RADIUS);
      const scale = centerScale * Math.max(0.5, 0.8 + depthScale * 0.3);

      return { x, y, z, scale, zIndex: Math.round(1000 + z), isVisible, fadeOpacity, index };
    });
  }, [positions, rotation]);

  useEffect(() => {
    if (!mounted) return;
    const tick = () => {
      if (!dragging) {
        setVelocity(v => {
          const nx = v.x * MOMENTUM;
          const ny = v.y * MOMENTUM;
          if (Math.abs(nx) < 0.01 && Math.abs(ny) < 0.01) return { x: 0, y: 0 };
          return { x: nx, y: ny };
        });
        setRotation(r => ({
          x: normalizeAngle(r.x + clamp(velocity.x)),
          y: normalizeAngle(r.y + clamp(velocity.y) + 0.15),
        }));
      }
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [mounted, dragging, velocity]);

  useEffect(() => {
    if (!mounted) return;
    const onMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      const rx = -dy * DRAG_SENS;
      const ry = dx * DRAG_SENS;
      setRotation(r => ({ x: normalizeAngle(r.x + clamp(rx)), y: normalizeAngle(r.y + clamp(ry)) }));
      setVelocity({ x: clamp(rx), y: clamp(ry) });
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };
    const onUp = () => setDragging(false);
    const onTouchMove = (e) => {
      if (!dragging) return;
      e.preventDefault();
      const t = e.touches[0];
      const dx = t.clientX - lastMouse.current.x;
      const dy = t.clientY - lastMouse.current.y;
      const rx = -dy * DRAG_SENS;
      const ry = dx * DRAG_SENS;
      setRotation(r => ({ x: normalizeAngle(r.x + clamp(rx)), y: normalizeAngle(r.y + clamp(ry)) }));
      setVelocity({ x: clamp(rx), y: clamp(ry) });
      lastMouse.current = { x: t.clientX, y: t.clientY };
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onUp);
    };
  }, [mounted, dragging]);

  const onMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
    setVelocity({ x: 0, y: 0 });
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const onTouchStart = (e) => {
    const t = e.touches[0];
    setDragging(true);
    setVelocity({ x: 0, y: 0 });
    lastMouse.current = { x: t.clientX, y: t.clientY };
  };

  const wp = worldPositions();
  const review = REVIEWS[activeReview];

  if (!mounted) return null;

  return (
    <>
      <style>{RS_CSS}</style>
      <section className="rs-wrap" id="reviews">
        <div className="rs-layout">
          <div className="rs-left">
            <p className="script">What Our Guests Say</p>
            <h2>Real Reviews,<br />Real Love</h2>

            <div className="rs-review-card" key={activeReview}>
              <div className="rs-review-stars">{'★'.repeat(review.stars)}</div>
              <p className="rs-review-text">{review.text}</p>
              <div className="rs-review-author">
                <div className="rs-review-avatar" style={{ background: review.color }}>
                  {review.avatar}
                </div>
                <div>
                  <div className="rs-review-name">{review.name}</div>
                  <div className="rs-review-date">{review.date}</div>
                </div>
              </div>
              <div className="rs-review-google">
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span>Verified Google Review</span>
              </div>
            </div>

            <div className="rs-review-nav">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  className={`rs-review-dot ${i === activeReview ? 'active' : ''}`}
                  onClick={() => setActiveReview(i)}
                  aria-label={`Review ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="rs-right">
            <div
              ref={containerRef}
              className="rs-container"
              style={{ width: SIZE, height: SIZE, perspective: 1000 }}
              onMouseDown={onMouseDown}
              onTouchStart={onTouchStart}
            >
              <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 10 }}>
                {images.map((img, i) => {
                  const p = wp[i];
                  if (!p || !p.isVisible) return null;
                  const s = baseImgSize * p.scale;
                  return (
                    <div
                      key={img.id}
                      className="rs-node"
                      style={{
                        width: s, height: s,
                        left: SIZE / 2 + p.x,
                        top: SIZE / 2 + p.y,
                        opacity: p.fadeOpacity,
                        transform: 'translate(-50%,-50%)',
                        zIndex: p.zIndex,
                      }}
                    >
                      <div className="rs-node-inner">
                        <img src={img.src} alt={img.alt} draggable={false} loading="lazy" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
