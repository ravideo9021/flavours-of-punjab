import DishCard from './DishCard';

const SIZES = '(max-width: 740px) 70vw, (max-width: 900px) 40vw, (max-width: 1040px) 30vw, 380px';

export default function Signatures() {
  return (
    <section className="signatures section" aria-labelledby="signatures-title">
      <div className="container">
        <header className="section-head reveal">
          <p className="script">Chef&apos;s recommendations</p>
          <h2 id="signatures-title">Signature dishes</h2>
        </header>
        <div className="dish-grid dish-grid--3">
          <DishCard
            slug="dal-makhni"
            image="dal-makhani"
            alt="Dal makhni with a swirl of cream and a knob of butter"
            name="Dal Makhni"
            tag="Must try"
            description="Black lentils slow-cooked into a rich, creamy, buttery gravy — the soul of Punjabi cooking."
            sizes={SIZES}
          />
          <DishCard
            slug="chicken-biryani"
            image="chicken-biryani"
            alt="Chicken biryani with raita on the side"
            name="Chicken Biryani"
            tag="Popular"
            description="Aromatic basmati layered with tender chicken, whole spices and saffron. Served with curry and raita."
            sizes={SIZES}
          />
          <DishCard
            slug="butter-chicken"
            image="butter-chicken-bowl"
            alt="Butter chicken in a velvety tomato and butter gravy"
            tag="Classic"
            description="Tender chicken in a velvety tomato-butter sauce — Punjab's most iconic dish. Quarter, half or full."
            sizes={SIZES}
          />
        </div>
      </div>
    </section>
  );
}
