import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import MenuExplorer from './MenuExplorer';

export default function MenuSection() {
  return (
    <section className="menu-section section section--open" id="menu" aria-labelledby="menu-title">
      <div className="container">
        <div className="menu-card">
          <header className="section-head reveal">
            <p className="script">Our menu</p>
            <h2 id="menu-title">A feast for every palate</h2>
            <p className="menu-note">Quarter, half and full portions on many dishes · Prices in ₹, subject to change</p>
          </header>
          <MenuExplorer mode="tabs" headingLevel={3} />
          <div className="menu-card-foot">
            <Link className="btn btn-dark" href="/menu">
              See the full menu <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link className="btn btn-outline-dark" href="/#order">
              Order online
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
