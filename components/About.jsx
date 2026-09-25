import { ChefHat, Leaf, PartyPopper, UtensilsCrossed } from 'lucide-react';
import Picture from './Picture';
import { dishCount } from '@/data/menu';

const roundedDishes = Math.floor(dishCount / 10) * 10;

export default function About() {
  return (
    <section className="about section section--open" id="about">
      <div className="container about-grid">
        <div className="about-copy reveal">
          <p className="eyebrow">Our story</p>
          <h2>
            Every dish tells <em>a Punjabi tale</em>
          </h2>
          <p className="gurmukhi">
            <span lang="pa">ਜੀ ਆਇਆਂ ਨੂੰ</span>
            <span className="gurmukhi-note">“Welcome”, the Punjabi way</span>
          </p>
          <p className="lead">
            At Flavours Of Punjab we cook the food Punjabi families gather around: smoky tandoori straight from the clay
            oven, velvety butter chicken, slow-cooked dal makhni, fragrant biryani and breads made fresh to order.
          </p>
          <p className="lead">
            Time-honoured recipes, fresh ingredients and generous portions — whether you dine in with the family, pick
            up on the way home or have us deliver to your door.
          </p>
          <ul className="about-points">
            <li>
              <Leaf size={22} aria-hidden="true" />
              <strong>Veg &amp; non-veg</strong>
              <span>Clearly marked on every dish</span>
            </li>
            <li>
              <UtensilsCrossed size={22} aria-hidden="true" />
              <strong>{roundedDishes}+ dishes</strong>
              <span>Tandoor, curries, Indo-Chinese</span>
            </li>
            <li>
              <ChefHat size={22} aria-hidden="true" />
              <strong>Dine-in &amp; takeaway</strong>
              <span>Plus home delivery</span>
            </li>
            <li>
              <PartyPopper size={22} aria-hidden="true" />
              <strong>Parties &amp; catering</strong>
              <span>At our place or yours</span>
            </li>
          </ul>
        </div>

        <div className="about-visual reveal">
          <div className="about-arch">
            <Picture
              name="storefront"
              alt="The Flavours Of Punjab signboard and dining room on Shankar Road, lit up at night"
              sizes="(max-width: 1040px) 88vw, 480px"
            />
          </div>
          <div className="about-naan" aria-hidden="true">
            <Picture name="paneer-tikka-bowl" alt="" sizes="(max-width: 740px) 44vw, 260px" />
          </div>
          <div className="about-seal" aria-hidden="true">
            <svg className="spin-ring" viewBox="0 0 300 300">
              <defs>
                <path id="about-ring-path" d="M150,150 m-112,0 a112,112 0 1,1 224,0 a112,112 0 1,1 -224,0" />
              </defs>
              <circle cx="150" cy="150" r="146" />
              <text>
                <textPath href="#about-ring-path" textLength="700" lengthAdjust="spacing">
                  AUTHENTIC • PUNJABI • KITCHEN • OLD RAJINDER NAGAR • NEW DELHI •
                </textPath>
              </text>
            </svg>
            <span className="about-seal-mark">FOP</span>
          </div>
        </div>
      </div>
    </section>
  );
}
