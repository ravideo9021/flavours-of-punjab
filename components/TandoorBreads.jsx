import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Picture from './Picture';
import DietMark from './DietMark';
import { formatRupees, getItem } from '@/data/menu';

const BREADS = [
  'tandoori-roti',
  'butter-naan',
  'garlic-naan',
  'laccha-paratha',
  'missi-roti',
  'aloo-paratha',
  'amritsari-kulcha',
  'chicken-keema-naan',
];

export default function TandoorBreads() {
  return (
    <section className="breads section" aria-labelledby="breads-title">
      <div className="container breads-grid">
        <div className="breads-visual reveal">
          <div className="breads-glow" aria-hidden="true" />
          <div className="breads-dish">
            <Picture
              name="garlic-naan"
              alt="A basket of garlic naan brushed with butter and coriander"
              sizes="(max-width: 740px) 76vw, (max-width: 1040px) 420px, 460px"
            />
          </div>
        </div>

        <div className="breads-copy reveal">
          <p className="eyebrow">From the tandoor</p>
          <h2 id="breads-title">
            Breads &amp; kulchas <em>Hot from the clay oven</em>
          </h2>
          <p className="lead">
            No Punjabi meal is complete without them: tandoori roti, butter and garlic naan, flaky laccha paratha and
            stuffed Amritsari kulcha, made fresh to order. Pair them with dal makhni or butter chicken.
          </p>
          <ul className="price-list price-list--2">
            {BREADS.map((slug) => {
              const item = getItem(slug);
              return (
                <li key={slug}>
                  <DietMark diet={item.diet} size={14} />
                  <span>{item.name}</span>
                  <strong>{formatRupees(item.prices[0])}</strong>
                </li>
              );
            })}
          </ul>
          <Link className="btn btn-gold" href="/menu#rice-breads">
            All breads &amp; rice <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
