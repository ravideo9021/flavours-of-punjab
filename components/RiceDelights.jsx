import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Picture from './Picture';
import DietMark from './DietMark';
import { formatRupees, menu } from '@/data/menu';

const rice = menu.find((c) => c.id === 'rice-breads').sections.find((s) => s.title === 'Rice & Biryani').items;
// "Chicken Biryani with Curry / Raita" reads better as "Chicken Biryani" in a short list.
const shortName = (name) => name.replace(/ with .*$/, '');

export default function RiceDelights() {
  return (
    <section className="rice section" aria-labelledby="rice-title">
      <div className="rice-bowl rice-bowl--left" aria-hidden="true">
        <Picture name="rice-bowl" alt="" sizes="(max-width: 1040px) 30vw, 380px" />
      </div>
      <div className="rice-bowl rice-bowl--right" aria-hidden="true">
        <Picture name="jeera-rice" alt="" sizes="(max-width: 1040px) 26vw, 320px" />
      </div>
      <div className="rice-content reveal">
        <p className="rice-kicker">Biryani • Jeera Rice • Fried Rice</p>
        <h2 id="rice-title">
          Rice delights
          <br />
          for every craving
        </h2>
        <p className="rice-sub">
          From fragrant chicken, mutton and veg biryanis to comforting jeera rice — every plate is packed with aroma.
          Biryanis come with curry or raita.
        </p>
        <ul className="rice-list">
          {rice.map((item) => (
            <li key={item.name}>
              <DietMark diet={item.diet} size={14} />
              <span>{shortName(item.name)}</span>
              <strong>{formatRupees(item.prices[0])}</strong>
            </li>
          ))}
        </ul>
        <Link className="btn btn-white" href="/menu#rice-breads">
          Explore rice &amp; biryani <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
