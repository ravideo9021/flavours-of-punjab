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
            <Picture name="garlic-naan" alt="" sizes="(max-width: 740px) 44vw, 260px" />
          </div>
          <svg className="about-ring" viewBox="0 0 300 300" aria-hidden="true">
            <defs>
              <path id="about-ring-path" d="M150,150 m-118,0 a118,118 0 1,1 236,0 a118,118 0 1,1 -236,0" />
            </defs>
            <text>
              <textPath href="#about-ring-path">AUTHENTIC • PUNJABI • KITCHEN • FLAVOURS OF PUNJAB • NEW DELHI •</textPath>
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
