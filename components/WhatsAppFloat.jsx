import { WhatsAppIcon } from './BrandIcons';
import { whatsappLink } from '@/data/site';

/** Floating WhatsApp button for larger screens (phones get the action bar). */
export default function WhatsAppFloat() {
  return (
    <a
      className="whatsapp-float"
      href={whatsappLink('Hi! I would like to make a reservation at Flavours Of Punjab.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <WhatsAppIcon size={28} color="#fff" />
      <span className="whatsapp-float-tip" aria-hidden="true">
        Chat with us
      </span>
    </a>
  );
}
