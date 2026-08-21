const items = [
  { img: '/media/Butter-Chicken.jpg', name: 'Chicken Tikka', price: '₹320', desc: 'Smoky, charred and marinated to perfection.' },
  { img: '/media/tandoori_paneer_platter.png', name: 'Seekh Kebab', price: '₹300', desc: 'Juicy minced meat on skewers, straight from the grill.' },
  { img: '/media/675aefc93b9788df.png', name: 'Paneer Tikka', price: '₹280', desc: 'Cottage cheese cubes in rich tandoori marinade.' },
  { img: '/media/408043caa38c7906.png', name: 'Fish Tikka', price: '₹350', desc: 'Tender fish fillets, spiced and clay-oven roasted.' },
];

export default function StreetFood() {
  return (
    <>
      {/* Second ticker strip — reversed direction */}
      <div className="ticker-strip ticker-reverse" aria-hidden="true">
        <div className="ticker-track">
          <span>Tandoori &bull; Biryani &bull; Butter Chicken &bull; Dal Makhni &bull; Naan &bull; Seekh Kebab &bull; Paneer Tikka &bull; Rogan Josh &bull;&nbsp;</span>
          <span>Tandoori &bull; Biryani &bull; Butter Chicken &bull; Dal Makhni &bull; Naan &bull; Seekh Kebab &bull; Paneer Tikka &bull; Rogan Josh &bull;&nbsp;</span>
        </div>
      </div>

      <section className="street-food">
        <div className="sf-header reveal">
          <p className="script">From The Tandoor</p>
          <h2>Sizzling Starters</h2>
          <p className="lead" style={{margin: '0 auto'}}>Straight from the clay oven to your plate — charred, smoky, irresistible.</p>
        </div>
        <div className="sf-grid">
          {items.map(item => (
            <article key={item.name} className="sf-card reveal">
              <div className="sf-img-wrap">
                <img src={item.img} alt={item.name} loading="lazy" />
              </div>
              <div className="sf-body">
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
                <span className="sf-price">{item.price}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
