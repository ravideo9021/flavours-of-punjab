import DishCard from './DishCard';

const SIZES = '(max-width: 740px) 56vw, (max-width: 1040px) 45vw, 280px';

export default function Starters() {
  return (
    <section className="starters section" aria-labelledby="starters-title">
      <div className="container">
        <header className="section-head reveal">
          <p className="script">From the tandoor</p>
          <h2 id="starters-title">Sizzling starters</h2>
          <p className="lead">Straight from the clay oven to your plate — charred, smoky and irresistible.</p>
        </header>
        <div className="dish-grid dish-grid--4">
          <DishCard
            compact
            slug="tandoori-chicken"
            image="tandoori-chicken"
            alt="Tandoori chicken with onion rings, lemon and mint chutney"
            description="Smoky, charred and marinated to perfection in the clay oven."
            sizes={SIZES}
          />
          <DishCard
            compact
            slug="chicken-seekh-chatpata"
            image="chicken-seekh"
            alt="Chicken seekh kebabs with onion rings and lemon"
            description="Juicy spiced minced chicken on skewers, straight from the grill."
            sizes={SIZES}
          />
          <DishCard
            compact
            slug="paneer-tikka"
            image="paneer-tikka-skewers"
            alt="Paneer tikka skewers with peppers and onion"
            description="Cottage cheese cubes in a rich tandoori marinade, char-grilled."
            sizes={SIZES}
          />
          <DishCard
            compact
            slug="malai-chaap"
            image="malai-chaap"
            alt="Malai soya chaap skewers with a creamy glaze"
            description="Creamy, melt-in-the-mouth soya chaap in a rich malai marinade."
            sizes={SIZES}
          />
        </div>
      </div>
    </section>
  );
}
