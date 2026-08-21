'use client';
import CoverflowCarousel from './CoverflowCarousel';

const slides = [
  { src: '/media/Butter-Chicken.jpg', alt: 'Butter Chicken curry', title: 'Butter Chicken', subtitle: 'Signature' },
  { src: '/media/paneer_tikka_bg.jpg', alt: 'Paneer Tikka skewers', title: 'Paneer Tikka', subtitle: 'Tandoor Grill' },
  { src: '/media/Dal%20Makhani.png', alt: 'Dal Makhani slow-cooked', title: 'Dal Makhni', subtitle: 'Slow-Cooked' },
  { src: '/media/butter_chicken_bg.png', alt: 'Chicken curry with rice', title: 'Chicken Curry', subtitle: 'House Special' },
  { src: '/media/veg_biryani_bg.jpg', alt: 'Veg Biryani in handi', title: 'Veg Biryani', subtitle: 'Dum Cooked' },
  { src: '/media/palak_paneer.jpg', alt: 'Palak Paneer', title: 'Palak Paneer', subtitle: 'Iron Rich' },
  { src: '/media/b45da0506d942600.jpg', alt: 'Dal with steamed rice', title: 'Dal Rice', subtitle: 'Comfort Classic' },
  { src: '/media/tandoori_paneer_platter.png', alt: 'Tandoori paneer platter', title: 'Tandoori Platter', subtitle: 'Chef Special' },
  { src: '/media/garlic_naan.png', alt: 'Fresh garlic naan basket', title: 'Garlic Naan', subtitle: 'Tandoor Fresh' },
  { src: '/media/juice.jpg', alt: 'Mango Lassi drink', title: 'Mango Lassi', subtitle: 'Refreshing' },
];

export default function Gallery() {
  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-top reveal">
        <p className="script">Visual Feast</p>
        <h2>From Our Kitchen</h2>
      </div>
      <CoverflowCarousel
        slides={slides}
        showCaption
        showNavigation
        showPagination
        loop
        cardWidth="clamp(180px, 25vw, 300px)"
        rotate={44}
        depth={0.6}
        perspective={3}
        falloff={0.56}
        fade={0.1}
        gap={0.05}
        label="Food gallery carousel"
      />
    </section>
  );
}
