import CoverflowCarousel from './CoverflowCarousel';

const SLIDES = [
  { image: 'butter-chicken-kadai', alt: 'Butter chicken in a copper kadai', title: 'Butter Chicken', subtitle: 'Signature' },
  { image: 'paneer-tikka-skewers', alt: 'Paneer tikka skewers', title: 'Paneer Tikka', subtitle: 'Tandoor grill', fit: 'contain' },
  { image: 'dal-makhani', alt: 'Dal makhni with cream', title: 'Dal Makhni', subtitle: 'Slow-cooked', fit: 'contain' },
  { image: 'tandoori-chicken', alt: 'Tandoori chicken platter', title: 'Tandoori Chicken', subtitle: 'Clay oven', fit: 'contain' },
  { image: 'biryani-handi', alt: 'Biryani in a copper handi', title: 'Biryani', subtitle: 'Dum cooked' },
  { image: 'malai-chaap', alt: 'Malai chaap skewers', title: 'Malai Chaap', subtitle: 'Creamy delight', fit: 'contain' },
  { image: 'garlic-naan', alt: 'Basket of garlic naan', title: 'Garlic Naan', subtitle: 'Fresh from the tandoor', fit: 'contain' },
  { image: 'chicken-biryani', alt: 'Chicken biryani', title: 'Chicken Biryani', subtitle: 'Royal', fit: 'contain' },
  { image: 'chicken-seekh', alt: 'Chicken seekh kebabs', title: 'Seekh Chatpata', subtitle: 'Grilled', fit: 'contain' },
  { image: 'paneer-tikka-bowl', alt: 'Paneer tikka with peppers and onion', title: 'Paneer Tikka', subtitle: 'Char-grilled', fit: 'contain' },
  { image: 'veg-biryani', alt: 'Vegetable biryani', title: 'Veg Biryani', subtitle: 'Garden fresh', fit: 'contain' },
  { image: 'jeera-rice', alt: 'Jeera rice', title: 'Jeera Rice', subtitle: 'Fragrant', fit: 'contain' },
];

export default function Gallery() {
  return (
    <section className="gallery section" id="gallery" aria-labelledby="gallery-title">
      <header className="section-head reveal">
        <p className="script">Visual feast</p>
        <h2 id="gallery-title">From our kitchen</h2>
      </header>
      <CoverflowCarousel slides={SLIDES} label="Food gallery" cardWidth="clamp(190px, 25vw, 300px)" sizes="(max-width: 740px) 50vw, 300px" />
    </section>
  );
}
