'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { Briefcase, PartyPopper, Phone, Send, Users, UtensilsCrossed } from 'lucide-react';
import Picture from './Picture';
import { site, whatsappLink } from '@/data/site';
import { useReducedMotion } from '@/lib/useMediaQuery';

const SERVICES = [
  {
    id: 'birthday',
    label: 'Birthday party',
    Icon: PartyPopper,
    image: 'birthday-party',
    alt: 'Gold balloons and a Happy Birthday banner',
    tagline: 'Celebrate in style',
    description:
      'Make the day unforgettable with a menu made for your guests, festive decor and a warm Punjabi welcome.',
  },
  {
    id: 'kitty',
    label: 'Kitty party',
    Icon: Users,
    image: 'kitty-party',
    alt: 'Illustrated kitty party invitation for Flavours Of Punjab',
    tagline: 'Fun-filled get-togethers',
    description: 'Get the group together over great food, a relaxed space and service that keeps the plates coming.',
  },
  {
    id: 'corporate',
    label: 'Corporate event',
    Icon: Briefcase,
    image: 'butter-chicken-kadai',
    alt: 'Butter chicken served in a copper kadai',
    tagline: 'Impress your team',
    description: 'Team lunches, client dinners and office celebrations with generous Punjabi hospitality.',
  },
  {
    id: 'catering',
    label: 'Outdoor catering',
    Icon: UtensilsCrossed,
    image: 'biryani-handi',
    alt: 'Biryani served in a copper handi',
    tagline: 'We come to you',
    description: 'Weddings, house parties and functions — our signature dishes, cooked fresh and served at your venue.',
  },
];

const AUTOPLAY = 5000;

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function EnquiryForm({ occasion, setOccasion }) {
  const id = useId();

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const service = SERVICES.find((s) => s.id === data.get('occasion'));
    const date = data.get('date')
      ? new Date(`${data.get('date')}T12:00:00`).toLocaleDateString('en-IN', {
          weekday: 'short',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : '';
    const lines = ['Hi Flavours Of Punjab! I would like to enquire about an event booking.', ''];
    lines.push(`Occasion: ${service?.label ?? 'Something else'}`);
    if (date) lines.push(`Date: ${date}`);
    if (data.get('guests')) lines.push(`Guests: ${data.get('guests')}`);
    if (data.get('name')) lines.push(`Name: ${data.get('name')}`);
    if (data.get('notes')) lines.push(`Details: ${data.get('notes')}`);
    window.open(whatsappLink(lines.join('\n')), '_blank', 'noopener,noreferrer');
  };

  return (
    <form className="enquiry" onSubmit={onSubmit} aria-labelledby={`${id}-title`}>
      <h3 id={`${id}-title`}>Plan your event</h3>
      <p className="enquiry-intro">Tell us a little about it — this opens WhatsApp with your details filled in.</p>
      <div className="enquiry-grid">
        <label className="field field--occasion">
          <span>Occasion</span>
          <select name="occasion" value={occasion} onChange={(e) => setOccasion(e.target.value)}>
            {SERVICES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
            <option value="other">Something else</option>
          </select>
        </label>
        <label className="field">
          <span>Date</span>
          <input type="date" name="date" required onFocus={(e) => (e.currentTarget.min = todayISO())} />
        </label>
        <label className="field">
          <span>Guests</span>
          <input type="number" name="guests" min="1" max="2000" inputMode="numeric" placeholder="e.g. 25" required />
        </label>
        <label className="field field--name">
          <span>Your name</span>
          <input type="text" name="name" autoComplete="name" placeholder="Optional" />
        </label>
        <label className="field field--wide">
          <span>Anything else?</span>
          <textarea name="notes" rows={2} placeholder="Veg / non-veg, budget, timing, venue…" />
        </label>
      </div>
      <div className="enquiry-actions">
        <button type="submit" className="btn btn-whatsapp">
          <Send size={17} aria-hidden="true" /> Send on WhatsApp
        </button>
        <a className="enquiry-call" href={site.phone.href}>
          <Phone size={16} aria-hidden="true" /> or call {site.phone.display}
        </a>
      </div>
    </form>
  );
}

export default function Events() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [occasion, setOccasion] = useState(SERVICES[0].id);
  const reduceMotion = useReducedMotion();
  const rootRef = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    if (rootRef.current) io.observe(rootRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !inView || reduceMotion) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % SERVICES.length), AUTOPLAY);
    return () => clearTimeout(t);
  }, [index, paused, inView, reduceMotion]);

  const select = (i) => {
    setIndex(i);
    setOccasion(SERVICES[i].id);
  };

  const stateOf = (i) => {
    const diff = (i - index + SERVICES.length) % SERVICES.length;
    if (diff === 0) return 'is-active';
    if (diff === 1) return 'is-next';
    if (diff === SERVICES.length - 1) return 'is-prev';
    return 'is-hidden';
  };

  return (
    <section className="events section" id="events" aria-labelledby="events-title">
      <div className="container">
        <header className="section-head reveal">
          <p className="script">Celebrate with us</p>
          <h2 id="events-title">Events &amp; catering</h2>
          <p className="lead">From intimate kitty parties to big family functions — we&apos;ll make the occasion special.</p>
        </header>

        <div
          ref={rootRef}
          className="events-showcase"
          onPointerEnter={(e) => e.pointerType === 'mouse' && setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setPaused(false)}
        >
          <div className="events-chips" role="group" aria-label="Choose an occasion">
            {SERVICES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className={`events-chip${i === index ? ' is-active' : ''}`}
                aria-pressed={i === index}
                onClick={() => select(i)}
              >
                <s.Icon size={18} aria-hidden="true" />
                {s.label}
              </button>
            ))}
          </div>

          <div className="events-stage">
            {SERVICES.map((s, i) => (
              <figure key={s.id} className={`events-card ${stateOf(i)}`} aria-hidden={i !== index}>
                <Picture name={s.image} alt={s.alt} sizes="(max-width: 740px) 92vw, (max-width: 1040px) 60vw, 720px" />
                <figcaption>
                  <span className="events-tag">{s.tagline}</span>
                  <span className="events-desc">{s.description}</span>
                </figcaption>
                <span className="events-live">
                  <span aria-hidden="true" /> Now booking
                </span>
              </figure>
            ))}
          </div>
        </div>

        <EnquiryForm occasion={occasion} setOccasion={setOccasion} />
      </div>
    </section>
  );
}
