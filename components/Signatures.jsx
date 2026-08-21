const dishes = [
  {
    img: '/media/dal_tadka.png',
    alt: 'Dal Makhni — creamy black lentils',
    tag: 'Must Try',
    name: 'Dal Makhni',
    desc: 'Slow-cooked black lentils in a rich, creamy, buttery gravy — the soul of Punjabi cuisine.',
    price: '₹240',
  },
  {
    img: '/media/veg_biryani.png',
    alt: 'Aromatic Biryani with raita',
    tag: 'Popular',
    name: 'Chicken Biryani',
    desc: 'Aromatic basmati rice layered with tender chicken, rich spices and saffron.',
    price: '₹370',
  },
  {
    img: '/media/Butter-Chicken.jpg',
    alt: 'Butter Chicken in rich tomato gravy',
    tag: 'Classic',
    name: 'Butter Chicken',
    desc: "Tender chicken in a velvety tomato-butter sauce — Punjab's most iconic dish.",
    price: '₹650',
  },
];

export default function Signatures() {
  return (
    <section className="signatures">
      <div className="sig-header reveal">
        <p className="script">Chef&apos;s Recommendations</p>
        <h2>Signature Dishes</h2>
      </div>
      <div className="sig-grid">
        {dishes.map(dish => (
          <article key={dish.name} className="sig-card reveal">
            <div className="sig-img">
              <img src={dish.img} alt={dish.alt} loading="lazy" />
            </div>
            <div className="sig-body">
              <span className="sig-tag">{dish.tag}</span>
              <h3>{dish.name}</h3>
              <p>{dish.desc}</p>
              <span className="sig-price">{dish.price}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
