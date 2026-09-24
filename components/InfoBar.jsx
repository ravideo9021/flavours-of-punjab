import Link from 'next/link';
import { Bike, Clock, MapPin, Phone } from 'lucide-react';
import OpenStatus from './OpenStatus';
import { site } from '@/data/site';
import { hoursSummary } from '@/lib/hours';

/** The four things most visitors look for first: hours, location, phone, delivery. */
export default function InfoBar() {
  return (
    <section className="infobar" aria-label="Opening hours, location and contact">
      <div className="infobar-grid">
        <div className="info-card">
          <Clock className="info-icon" size={22} aria-hidden="true" />
          <div>
            <p className="info-label">Hours</p>
            <p className="info-value">
              <OpenStatus />
            </p>
            <p className="info-sub">{hoursSummary()}</p>
          </div>
        </div>
        <a className="info-card" href={site.maps.directions} target="_blank" rel="noopener noreferrer">
          <MapPin className="info-icon" size={22} aria-hidden="true" />
          <div>
            <p className="info-label">Find us</p>
            <p className="info-value">Shankar Road, Old Rajinder Nagar</p>
            <p className="info-sub info-link">Get directions</p>
          </div>
        </a>
        <a className="info-card" href={site.phone.href}>
          <Phone className="info-icon" size={22} aria-hidden="true" />
          <div>
            <p className="info-label">Reservations</p>
            <p className="info-value">{site.phone.display}</p>
            <p className="info-sub info-link">Call to book a table</p>
          </div>
        </a>
        <Link className="info-card" href="/#order">
          <Bike className="info-icon" size={22} aria-hidden="true" />
          <div>
            <p className="info-label">Home delivery</p>
            <p className="info-value">Swiggy · Zomato · WhatsApp</p>
            <p className="info-sub info-link">Order online</p>
          </div>
        </Link>
      </div>
    </section>
  );
}
