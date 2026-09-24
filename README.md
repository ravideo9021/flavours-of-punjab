# Flavours Of Punjab

Website for **Flavours Of Punjab**, an authentic Punjabi family restaurant in Old
Rajinder Nagar, New Delhi — dine-in, takeaway, home delivery, parties and
outdoor catering.

Built with **Next.js 16** (App Router, static pages) and **React 19**, plain CSS,
and pre-optimised AVIF/WebP images.

## What's in version 2

**Speed**

- Every photo is pre-optimised into responsive **AVIF + WebP** sizes
  (`npm run images`), so phones download a 30–70 KB image instead of a 3–10 MB
  PNG. Media went from 58 MB to what a visitor actually needs (~0.5 MB for the
  first screen on a phone).
- Hero backdrops are pre-blurred for a depth-of-field look (and ~8x smaller);
  only the first slide loads up front, the next one is fetched in the background.
- Fonts are self-hosted, subset and preloaded (one ~12 KB file per weight).
- No runtime image optimiser, no middleware, no animation library: less
  JavaScript, nothing that can hit a hosting quota.
- Animations pause when off-screen or in a background tab and respect
  "reduce motion". Scroll reveals use CSS scroll-driven animations (no JS).

Lighthouse (mobile, simulated slow 4G) before → after: **Performance 42 → 92**,
LCP 86 s → ~3.3 s (0.3 s on the actual trace), page weight 47 MB → 0.4 MB,
Accessibility 89 → 99. Desktop: Performance 100.

**For guests**

- Live **open / closed** status in Indian time, hours, directions, call and
  WhatsApp one tap away (sticky action bar on phones).
- **Menu** with search (understands "chicken" for *murg*, "potato" for *aloo*…),
  Veg / Non-veg filter with **FSSAI-style marks**, Qtr / Half / Full price labels
  and a printable full-menu page at `/menu`.
- **Order online** via WhatsApp/phone (direct), Swiggy or Zomato.
- **Events & catering** enquiry form that opens WhatsApp with the details filled in.
- Gallery, reviews (links to your real Google / Zomato reviews), map that loads
  on demand, storefront photo so people recognise the place.

**Behind the scenes**

- `Restaurant` + `Menu` structured data, sitemap, robots, web app manifest,
  proper favicon / app icons and a share image for WhatsApp/Instagram links.
- Security headers (CSP, HSTS, frame protection) from `next.config.mjs`.
- Accessible: one `h1` per page, skip link, keyboard-friendly carousels with
  pause controls, visible focus, WCAG-checked contrast.

## Editing content

| What | Where |
|---|---|
| Phone, WhatsApp, address, **opening hours**, Swiggy/Zomato/Instagram links | `data/site.js` |
| Menu items, prices, veg / non-veg | `data/menu.js` |
| Guest reviews shown on the site | `data/reviews.js` (real reviews only) |
| Photos | `assets/photos/` then `npm run images` |

Dish cards (signatures, starters, platters) read their names, prices and
veg/non-veg marks from `data/menu.js`, so a price change only needs to be made
once.

### Adding or replacing a photo

1. Put the image in `assets/photos/` named like `paneer-butter-masala.webp`
   (PNG/JPG work too; transparent cut-outs look best for dishes).
2. Add it to the `IMAGES` list in `scripts/optimize-images.mjs` with a preset
   (`cutout`, `photo`, `background` or `backdrop`).
3. Run `npm run images` — it writes the responsive files to `public/media/` and
   updates `data/images.json`. Unchanged photos are skipped.
4. Use it: `<Picture name="paneer-butter-masala" alt="…" sizes="…" />`.

## Development

```bash
npm install
npm run dev        # http://localhost:4173
npm run lint
npm run build && npm start
```

Requires Node.js 20.9 or newer.

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://www.yourdomain.in`) in your hosting
provider when you move to a custom domain; canonical URLs, the sitemap and
structured data use it.

## Project structure

```
app/
  layout.js          fonts, metadata, structured data, header/footer
  page.js            home page sections
  menu/page.js       full menu page (+ Menu structured data)
  globals.css        design system and all styles
  icon.svg, apple-icon.png, opengraph-image.jpg, manifest.js, robots.js, sitemap.js
components/          one file per section / UI piece (Hero, MenuExplorer, Events…)
data/                site facts, menu, reviews, generated image manifest
lib/                 opening-hours logic, media-query hook
assets/photos/       high-quality master photos (not served directly)
assets/fonts/        self-hosted Barlow subsets (OFL)
scripts/             image pipeline and brand-asset generator
public/media/        generated AVIF/WebP files (content-hashed, cached forever)
```

## Restaurant info

- **Address:** 3/16, Shankar Road, Block 3, Old Rajinder Nagar, New Delhi 110060
- **Phone:** +91 99102 97708 · **WhatsApp:** +91 82527 34533
- **Order online:** [Swiggy](https://www.swiggy.com/city/delhi/flavours-of-punjab-shankar-main-road-rajinder-nagar-rest9826) · [Zomato](https://zomato.onelink.me/xqzv/5ynak9ns)

## License

All rights reserved. This website and its content are the property of
Flavours Of Punjab. Barlow fonts are used under the SIL Open Font License
(`assets/fonts/OFL.txt`); brand icons are from Simple Icons (CC0).
