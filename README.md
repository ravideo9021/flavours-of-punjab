# Flavours Of Punjab

A modern, production-grade restaurant website for **Flavours Of Punjab** -- an authentic Punjabi family restaurant serving vegetarian and non-vegetarian cuisine in New Delhi, India.

Built with **Next.js 15** and **React 19**, featuring immersive animations, interactive components, and a fully responsive design.

## Live Demo

Deployed on Vercel (link will be added after deployment).

## Features

- **Hero Carousel** -- Full-screen slideshow with cinematic arc food animation, auto-advance, and manual navigation
- **3D Coverflow Gallery** -- Draggable carousel with perspective transforms, momentum physics, and touch support
- **Interactive Review Sphere** -- 3D rotating sphere of food images with auto-cycling Google reviews in a split layout
- **Kinetic Matrix Canvas** -- Spring-mass lattice simulation with real-time physics, shockwave pulses, and marketing overlay
- **Order Integration** -- Interactive hover buttons linking to Swiggy and Zomato with brand-colored animations
- **Full Menu System** -- Tabbed menu with 6 categories, stagger-in animations, and 150+ dishes
- **Smooth Scroll Effects** -- IntersectionObserver-based reveal animations, parallax layers, and scroll-spin elements
- **Responsive Design** -- Optimized layouts for desktop, tablet, and mobile
- **SEO Optimized** -- OpenGraph meta, structured data (JSON-LD), semantic HTML, and accessibility attributes
- **Content Security Policy** -- Strict CSP headers via middleware for security hardening

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 15 | React framework with App Router |
| React 19 | UI library |
| Framer Motion | Animation library |
| Lucide React | Icon system |
| Plain CSS | Custom design system with CSS variables |

## Project Structure

```
flavours-of-punjab/
├── app/
│   ├── globals.css        # Global styles, design system, all component CSS
│   ├── layout.js          # Root layout with metadata, structured data
│   └── page.js            # Home page composing all sections
├── components/
│   ├── Hero.jsx           # Hero carousel with arc food animation
│   ├── About.jsx          # Restaurant story section
│   ├── KineticMatrix.jsx  # Canvas physics animation + marketing CTA
│   ├── Signatures.jsx     # Signature dishes showcase
│   ├── StreetFood.jsx     # Tandoor starters grid
│   ├── RiceDelights.jsx   # Rice dishes parallax section
│   ├── FoodShowcase.jsx   # Visual food display with floating elements
│   ├── PlattersBanner.jsx # Platters promotion banner
│   ├── Menu.jsx           # Tabbed full menu system
│   ├── Gallery.jsx        # Photo gallery using CoverflowCarousel
│   ├── CoverflowCarousel.jsx # 3D coverflow carousel component
│   ├── GlassHero.jsx      # Glassmorphism transition section
│   ├── ReviewSphere.jsx   # 3D review sphere + review cards
│   ├── Contact.jsx        # Contact info + Google Maps link
│   ├── Newsletter.jsx     # Email subscription section
│   ├── Header.jsx         # Navigation bar with call button
│   ├── Footer.jsx         # Site footer
│   └── ScrollEffects.jsx  # Global scroll-based animations
├── data/
│   └── menu.js            # Menu data (categories, items, prices)
├── public/media/          # All images, fonts, and assets
├── middleware.js           # CSP security headers
└── next.config.mjs        # Next.js configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ (Node.js 20 recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/ravidev9021/flavours-of-punjab.git
cd flavours-of-punjab
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:4173](http://localhost:4173) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Deployment

This project is configured for one-click deployment on Vercel:

1. Push to GitHub
2. Import the repository on [vercel.com](https://vercel.com)
3. Vercel auto-detects Next.js and deploys

No environment variables or additional configuration required.

## Design System

The project uses a custom CSS design system with CSS variables defined in `app/globals.css`:

- `--accent` / `--saffron` / `--gold` -- Brand accent colors
- `--red-cta` -- Call-to-action red
- `--ink` / `--charcoal` / `--warm` -- Background tones
- `--display` / `--script` -- Typography families
- All images are self-hosted in `/public/media/` (no external CDN dependencies)

## Restaurant Info

- **Name:** Flavours Of Punjab
- **Location:** Shankar Main Road, Rajinder Nagar, New Delhi
- **Phone:** +91 99102 97708
- **Hours:** Mon-Sun, 11:00 AM - 11:00 PM
- **Order Online:** [Swiggy](https://www.swiggy.com/city/delhi/flavours-of-punjab-shankar-main-road-rajinder-nagar-rest9826) | [Zomato](https://zomato.onelink.me/xqzv/5ynak9ns)
- **Google Maps:** [View Location](https://www.google.com/maps/place/Flavours+Of+Punjab+Restaurant/@28.6366247,77.1812959,17z)

## License

All rights reserved. This website and its content are the property of Flavours Of Punjab.
