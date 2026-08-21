const items = [
  { img: '/media/tandoori_chicken.png', name: 'Tandoori Chicken', price: '₹450', desc: 'Smoky, charred and marinated to perfection in the clay oven.' },
  { img: '/media/Chicken%20Seekh%20Chatpata%20.png', name: 'Chicken Seekh Chatpata', price: '₹300', desc: 'Juicy spiced minced chicken on skewers, straight from the grill.' },
  { img: '/media/paneer%20tikka.png', name: 'Paneer Tikka', price: '₹310', desc: 'Cottage cheese cubes in rich tandoori marinade, char-grilled.' },
  { img: '/media/Malai_chaap.png', name: 'Malai Chaap', price: '₹280', desc: 'Creamy, melt-in-mouth soy chaap in a rich malai marinade.' },
];

export default function StreetFood() {
  return (
    <>
      <div className="ticker-strip ticker-reverse" aria-hidden="true">
        <div className="ticker-track">
          <span>Tandoori &bull; Biryani &bull; Butter Chicken &bull; Dal Makhni &bull; Naan &bull; Malai Chaap &bull; Paneer Tikka &bull; Rogan Josh &bull;&nbsp;</span>
          <span>Tandoori &bull; Biryani &bull; Butter Chicken &bull; Dal Makhni &bull; Naan &bull; Malai Chaap &bull; Paneer Tikka &bull; Rogan Josh &bull;&nbsp;</span>
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
