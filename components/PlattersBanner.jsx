import { Phone } from 'lucide-react';
import Picture from './Picture';
import DietMark from './DietMark';
import { SwiggyIcon } from './BrandIcons';
import { formatRupees, getItem } from '@/data/menu';
import { site } from '@/data/site';

export default function PlattersBanner() {
  const nonVeg = getItem('tandoori-platter-nonveg');
  const veg = getItem('tandoori-platter-veg');

  return (
    <section className="platters" aria-labelledby="platters-title">
      <div className="platters-bg" aria-hidden="true">
        <Picture name="paneer-tikka-slate" alt="" sizes="100vw" blur={false} />
      </div>
      <div className="platters-shade" aria-hidden="true" />

      <div className="container platters-inner">
        <div className="platters-copy reveal">
          <p className="eyebrow">Chef&apos;s pick</p>
          <h2 id="platters-title">Tandoori platters</h2>
          <p className="lead">
            Share the joy of Punjab — a royal spread of succulent kebabs, tikkas and seekh, straight from the clay oven.
          </p>
          <ul className="platter-prices">
            <li>
              <DietMark diet="nonveg" size={16} />
              <span>Non-veg platter</span>
              <strong>{formatRupees(nonVeg.prices[0])}</strong>
            </li>
            <li>
              <DietMark diet="veg" size={16} />
              <span>Veg platter</span>
              <strong>{formatRupees(veg.prices[0])}</strong>
            </li>
          </ul>
          <div className="platters-actions">
            <a className="btn btn-gold" href={site.order.swiggy} target="_blank" rel="noopener noreferrer">
              <SwiggyIcon size={18} /> Order now
            </a>
            <a className="btn btn-outline" href={site.phone.href}>
              <Phone size={17} aria-hidden="true" /> Call to order
            </a>
          </div>
        </div>

        <svg className="platters-ring" viewBox="0 0 220 220" aria-hidden="true">
          <defs>
            <path id="platters-ring-path" d="M110,110 m-86,0 a86,86 0 1,1 172,0 a86,86 0 1,1 -172,0" />
          </defs>
          <text>
            <textPath href="#platters-ring-path">SPECIAL • TANDOORI PLATTER • CHEF&apos;S PICK • </textPath>
          </text>
        </svg>
      </div>
    </section>
  );
}
