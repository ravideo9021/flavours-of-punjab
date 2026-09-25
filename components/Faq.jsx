import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';
import { site, whatsappLink } from '@/data/site';
import { formatTime, hoursSummary } from '@/lib/hours';

const { address, hours } = site;
const everyDay = hours.length === 1 && hours[0].days.length === 7;

/**
 * Questions guests ask before ordering or visiting, answered from the same
 * facts as the rest of the site. Also published as FAQPage structured data,
 * which search engines and AI assistants use to answer questions about us.
 */
const FAQS = [
  {
    q: 'Do you deliver?',
    a: `Yes. Order direct on WhatsApp (${site.whatsapp.display}) or call ${site.phone.display} for home delivery or takeaway, or order through Swiggy or Zomato.`,
    link: { href: '#order', label: 'Ways to order' },
  },
  {
    q: 'What are your opening hours?',
    a: everyDay
      ? `We are open every day from ${formatTime(hours[0].opens)} to ${formatTime(hours[0].closes)}, for lunch and dinner.`
      : `${hoursSummary()}.`,
  },
  {
    q: 'Is there food for vegetarians?',
    a: 'Plenty: dal makhni, paneer, soya chaap, vegetable curries, veg biryani and Indo-Chinese. Every dish on the menu has a green (veg) or brown (non-veg) mark, and the menu can show only veg dishes.',
    link: { href: '/menu', label: 'See the menu' },
  },
  {
    q: 'What do Qtr, Half and Full mean?',
    a: 'They are portion sizes of the same dish: a quarter, half or full plate. Not sure how much to order for your group? Ask us on WhatsApp, or pick one of our ready-made meals.',
  },
  {
    q: 'Can I book a table?',
    a: `Yes. Call us on ${site.phone.display} or send us a WhatsApp message with the day, time and number of guests.`,
    link: { href: whatsappLink('Hi! I would like to book a table at Flavours Of Punjab.'), label: 'Book on WhatsApp', external: true },
  },
  {
    q: 'Do you cater parties and events?',
    a: 'Yes: birthday parties, kitty parties, corporate events and outdoor catering. Tell us about yours in the events form and we will get back to you on WhatsApp.',
    link: { href: '#events', label: 'Plan your event' },
  },
  {
    q: 'Where exactly are you?',
    a: `${address.street}, ${address.locality}, ${address.city} ${address.postalCode}, ${address.landmark.charAt(0).toLowerCase()}${address.landmark.slice(1)}. Look for our red signboard.`,
    link: { href: site.maps.directions, label: 'Get directions', external: true },
  },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export default function Faq() {
  return (
    <section className="faq section section--open" id="faq" aria-labelledby="faq-title">
      <script
        type="application/ld+json"
        // JSON-LD must be inline; the content is static and escapes "<".
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      <div className="container faq-grid">
        <header className="faq-head reveal">
          <p className="script">Good to know</p>
          <h2 id="faq-title">Questions, answered</h2>
          <p className="lead">Anything else on your mind? Send us a message and we will help.</p>
          <a
            className="btn btn-whatsapp"
            href={whatsappLink('Hi Flavours Of Punjab! I have a question.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={18} /> Ask on WhatsApp
          </a>
        </header>

        <div className="faq-list reveal">
          {FAQS.map(({ q, a, link }, i) => (
            <details key={q} name="faq" open={i === 0}>
              <summary>{q}</summary>
              <div className="faq-answer">
                <p>{a}</p>
                {link && (
                  <a
                    href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {link.label}{' '}
                    {link.external ? <ArrowUpRight size={16} aria-hidden="true" /> : <ArrowRight size={16} aria-hidden="true" />}
                  </a>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
