import { InstagramIcon, WhatsAppIcon } from './BrandIcons';
import { site, whatsappLink } from '@/data/site';

/**
 * Replaces the old e-mail form, whose sign-ups were only kept in server memory
 * and lost on every restart. WhatsApp and Instagram reach diners where they are.
 */
export default function StayConnected() {
  return (
    <section className="connect section section--open" aria-labelledby="connect-title">
      <div className="container">
        <div className="connect-card reveal">
          <p className="script">Stay connected</p>
          <h2 id="connect-title">Offers &amp; festival specials</h2>
          <p>Be the first to hear about new dishes, festive feasts and special offers. No spam — just good food.</p>
          <div className="connect-actions">
            <a
              className="btn btn-whatsapp"
              href={whatsappLink('Hi! Please add me to your offers and updates list.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={18} /> Get offers on WhatsApp
            </a>
            <a className="btn btn-outline" href={site.social.instagram} target="_blank" rel="noopener noreferrer">
              <InstagramIcon size={18} /> Follow on Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
