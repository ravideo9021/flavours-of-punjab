'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PartyPopper, Users, Briefcase, UtensilsCrossed } from 'lucide-react';

const SERVICES = [
  {
    id: 'birthday',
    label: 'Birthday Party',
    Icon: PartyPopper,
    image: '/media/birthday_party.png',
    tagline: 'Celebrate In Style',
    description: 'Make your special day unforgettable with our curated birthday packages — customized menus, stunning decor, and a warm Punjabi celebration.',
  },
  {
    id: 'kitty',
    label: 'Kitty Party',
    Icon: Users,
    image: '/media/kitty_party.png',
    tagline: 'Fun-Filled Gatherings',
    description: 'Get together with your squad for a kitty party like no other — delicious food, great ambience, and memories that last.',
  },
  {
    id: 'corporate',
    label: 'Corporate Event',
    Icon: Briefcase,
    image: '/media/corporate%20event.jpg',
    tagline: 'Impress Your Team',
    description: 'Host your next team lunch, client dinner, or office celebration in a space that combines professionalism with Punjabi hospitality.',
  },
  {
    id: 'catering',
    label: 'Catering Service',
    Icon: UtensilsCrossed,
    image: '/media/catering_service.png',
    tagline: 'We Come To You',
    description: 'Bring the Flavours Of Punjab to your venue — weddings, house parties, or events. Full-service catering with our signature dishes.',
  },
];

const AUTO_PLAY_INTERVAL = 4000;
const ITEM_HEIGHT = 62;

function wrap(min, max, v) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

export default function PartyServices() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex = ((step % SERVICES.length) + SERVICES.length) % SERVICES.length;

  const nextStep = useCallback(() => {
    setStep(prev => prev + 1);
  }, []);

  const handleChipClick = (index) => {
    const diff = (index - currentIndex + SERVICES.length) % SERVICES.length;
    if (diff > 0) setStep(s => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index) => {
    const diff = index - currentIndex;
    const len = SERVICES.length;
    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;
    if (normalizedDiff === 0) return 'active';
    if (normalizedDiff === -1) return 'prev';
    if (normalizedDiff === 1) return 'next';
    return 'hidden';
  };

  return (
    <section className="party-services" id="events">
      <div className="party-header reveal">
        <p className="script">Celebrate With Us</p>
        <h2>Events &amp; Catering</h2>
        <p className="lead">From intimate kitty parties to grand corporate events — let us make your occasion truly special.</p>
      </div>

      <div className="party-carousel">
        <div className="party-left">
          <div className="party-left-fade party-left-fade-top" />
          <div className="party-left-fade party-left-fade-bottom" />
          <div className="party-chips">
            {SERVICES.map((service, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(-(SERVICES.length / 2), SERVICES.length / 2, distance);

              return (
                <motion.div
                  key={service.id}
                  style={{ height: ITEM_HEIGHT, width: 'fit-content' }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.3,
                  }}
                  transition={{ type: 'spring', stiffness: 90, damping: 22, mass: 1 }}
                  className="party-chip-wrap"
                >
                  <button
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={`party-chip ${isActive ? 'active' : ''}`}
                  >
                    <service.Icon size={18} strokeWidth={2} />
                    <span>{service.label}</span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="party-right">
          <div className="party-cards">
            {SERVICES.map((service, index) => {
              const status = getCardStatus(index);
              const isActive = status === 'active';
              const isPrev = status === 'prev';
              const isNext = status === 'next';

              return (
                <motion.div
                  key={service.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                    rotate: isPrev ? -3 : isNext ? 3 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 260, damping: 25, mass: 0.8 }}
                  className="party-card"
                  style={{ pointerEvents: isActive ? 'auto' : 'none' }}
                >
                  <img
                    src={service.image}
                    alt={service.label}
                    className={`party-card-img ${isActive ? '' : 'inactive'}`}
                  />
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="party-card-overlay"
                      >
                        <span className="party-card-tag">{service.tagline}</span>
                        <p className="party-card-desc">{service.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {isActive && (
                    <div className="party-card-live">
                      <span className="party-card-dot" />
                      <span>Now Booking</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="party-cta reveal">
        <a className="btn btn-gold" href="https://wa.me/918252734533?text=Hi!%20I%20want%20to%20book%20an%20event%20at%20Flavours%20Of%20Punjab." target="_blank" rel="noopener noreferrer">
          Book Your Event
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </section>
  );
}
