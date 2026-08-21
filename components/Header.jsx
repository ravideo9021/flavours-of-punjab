'use client';
import { useState, useEffect, useCallback } from 'react';
import { Phone, ArrowRight } from 'lucide-react';

const NAV_LINKS = [
  { href: '#top', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#menu', label: 'Menu' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#top');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll('section[id]');
      const scrollPos = window.scrollY + 150;
      for (const section of sections) {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
          setActiveSection(`#${section.id}`);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 80;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    }
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`} id="top">
      <button
        className={`mobile-toggle ${menuOpen ? 'active' : ''}`}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMenuOpen(v => !v)}
      >
        <span /><span /><span />
      </button>

      <a className="logo" href="#top" aria-label="Flavours Of Punjab — home" onClick={e => handleNavClick(e, '#top')}>
        <span className="logo-main">Flavours<span className="logo-of"> Of </span>Punjab</span>
      </a>

      <nav className={`nav ${menuOpen ? 'open' : ''}`} aria-label="Primary navigation">
        {NAV_LINKS.map(link => (
          <a
            key={link.href}
            href={link.href}
            className={activeSection === link.href ? 'active' : ''}
            onClick={e => handleNavClick(e, link.href)}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a className="header-cta" href="tel:+919910297708">
        <span className="cta-label">
          <Phone size={16} />
          <span>Call Now</span>
        </span>
        <div className="cta-hover">
          <span>Call Now</span>
          <ArrowRight size={16} />
        </div>
        <div className="cta-dot" />
      </a>
    </header>
  );
}
