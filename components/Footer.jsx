import Link from 'next/link';
import Logo from './Logo';
import { InstagramIcon, SwiggyIcon, WhatsAppIcon, ZomatoIcon } from './BrandIcons';
import { site, whatsappLink } from '@/data/site';
import { hoursSummary } from '@/lib/hours';

export default function Footer() {
  const { address } = site;
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>
            Authentic Punjabi food — tandoor, curries, biryani and fresh breads — from our family kitchen on Shankar
            Road, Old Rajinder Nagar.
          </p>
          <div className="footer-socials">
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon size={20} />
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <WhatsAppIcon size={20} />
            </a>
            <a href={site.order.swiggy} target="_blank" rel="noopener noreferrer" aria-label="Order on Swiggy">
              <SwiggyIcon size={20} />
            </a>
            <a href={site.order.zomato} target="_blank" rel="noopener noreferrer" aria-label="Order on Zomato">
              <ZomatoIcon size={30} />
            </a>
          </div>
        </div>

        <nav className="footer-col" aria-label="Footer">
          <h2>Explore</h2>
          <ul>
            <li><Link href="/menu">Full menu</Link></li>
            <li><Link href="/#about">Our story</Link></li>
            <li><Link href="/#order">Order online</Link></li>
            <li><Link href="/#events">Events &amp; catering</Link></li>
            <li><Link href="/#reviews">Reviews</Link></li>
            <li><Link href="/#faq">FAQ</Link></li>
            <li><Link href="/#visit">Find us</Link></li>
          </ul>
        </nav>

        <div className="footer-col">
          <h2>Visit</h2>
          <address>
            <p>
              {address.street}
              <br />
              {address.locality}, {address.city} {address.postalCode}
            </p>
            <p>{hoursSummary()}</p>
          </address>
        </div>

        <div className="footer-col">
          <h2>Contact</h2>
          <p>
            <a className="footer-phone" href={site.phone.href}>
              {site.phone.display}
            </a>
          </p>
          <p>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              WhatsApp {site.whatsapp.display}
            </a>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
