#!/usr/bin/env node
/**
 * One-off generator for the favicon / app icons and the social share image.
 *
 *   node scripts/make-brand-assets.mjs
 *
 * Outputs (committed, so builds don't need to run this):
 *   app/icon.svg, app/apple-icon.png, public/icon-192.png, public/icon-512.png,
 *   public/icon-maskable-512.png, app/opengraph-image.jpg (+ .alt.txt)
 *
 * The share image renders text with the brand fonts, so install Barlow,
 * Barlow Condensed and Mr Dafoe locally (Google Fonts) before re-running.
 */
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const out = (p) => path.join(ROOT, p);

const GOLD = `<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="#F0DC96"/><stop offset=".55" stop-color="#C9A84C"/><stop offset="1" stop-color="#9C7A2A"/>
</linearGradient>`;

// Bold condensed "F" with a saffron dot, on the site's ink background.
const monogram = ({ radius = 14, scale = 1 } = {}) => {
  const t = (64 - 64 * scale) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>${GOLD}</defs>
  <rect width="64" height="64" rx="${radius}" fill="#0D0B09"/>
  <g transform="translate(${t} ${t}) scale(${scale})">
    <rect x="4" y="4" width="56" height="56" rx="${Math.max(0, radius - 3)}" fill="none" stroke="url(#g)" stroke-width="1.6" opacity=".55"/>
    <path d="M20 13h25v8.5H29.5v6.8h13v8.4h-13V51H20z" fill="url(#g)"/>
    <circle cx="46.5" cy="46.5" r="4.5" fill="#E8832A"/>
  </g>
</svg>`;
};

async function icons() {
  const svg = monogram();
  await writeFile(out('app/icon.svg'), `${svg}\n`);
  const square = Buffer.from(monogram({ radius: 0 }));
  const maskable = Buffer.from(monogram({ radius: 0, scale: 0.72 }));
  await sharp(square, { density: 600 }).resize(180, 180).png().toFile(out('app/apple-icon.png'));
  await sharp(Buffer.from(svg), { density: 600 }).resize(192, 192).png().toFile(out('public/icon-192.png'));
  await sharp(Buffer.from(svg), { density: 800 }).resize(512, 512).png().toFile(out('public/icon-512.png'));
  await sharp(maskable, { density: 800 }).resize(512, 512).png().toFile(out('public/icon-maskable-512.png'));
}

async function shareImage() {
  const W = 1200;
  const H = 630;
  const background = await sharp(out('assets/photos/hero-bg-butter-chicken.webp'))
    .resize(W, H, { fit: 'cover', position: 'left' })
    .modulate({ brightness: 0.55 })
    .toBuffer();
  const dish = await sharp(out('assets/photos/butter-chicken-bowl.webp')).resize({ height: 500 }).toBuffer();
  const shade = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="s" x1="0" x2="1"><stop offset="0" stop-color="#0D0B09" stop-opacity=".96"/><stop offset=".55" stop-color="#0D0B09" stop-opacity=".78"/><stop offset="1" stop-color="#0D0B09" stop-opacity=".2"/></linearGradient>${GOLD}</defs>
    <rect width="${W}" height="${H}" fill="url(#s)"/>
  </svg>`);
  const text = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>${GOLD}</defs>
    <text x="72" y="150" font-family="Mr Dafoe" font-size="54" fill="#E8832A">Authentic taste of Punjab</text>
    <text x="68" y="266" font-family="Barlow Condensed ExtraBold, Barlow Condensed" font-weight="800" font-size="132" letter-spacing="2" fill="url(#g)">FLAVOURS</text>
    <text x="74" y="322" font-family="Barlow Condensed ExtraBold, Barlow Condensed" font-weight="800" font-size="46" letter-spacing="8" fill="#CDBB85">OF</text>
    <text x="68" y="436" font-family="Barlow Condensed ExtraBold, Barlow Condensed" font-weight="800" font-size="132" letter-spacing="2" fill="url(#g)">PUNJAB</text>
    <text x="72" y="494" font-family="Barlow Medium, Barlow" font-weight="500" font-size="30" fill="#F2E8D5">Punjabi family restaurant · Old Rajinder Nagar</text>
    <text x="72" y="540" font-family="Barlow Condensed SemiBold, Barlow Condensed" font-weight="600" font-size="26" letter-spacing="3" fill="#9B8B78">DINE-IN · TAKEAWAY · DELIVERY · CATERING</text>
  </svg>`);
  await sharp(background)
    .composite([
      { input: shade },
      { input: dish, left: W - 530, top: 65 },
      { input: text },
    ])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(out('app/opengraph-image.jpg'));
  await writeFile(
    out('app/opengraph-image.alt.txt'),
    'Flavours Of Punjab — butter chicken and the restaurant name on a dark background',
  );
}

await icons();
await shareImage();
console.log('Brand assets written.');
