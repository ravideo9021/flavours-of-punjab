'use client';
import { useEffect } from 'react';

export default function ScrollEffects() {
  useEffect(() => {
    document.documentElement.classList.add('js-reveal');

    /* ── Intersection Observer for .reveal ── */
    const revealObs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            revealObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

    /* ── Stagger animation for menu items ── */
    const staggerObs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const items = e.target.querySelectorAll('li');
            items.forEach((li, i) => {
              li.style.transitionDelay = `${i * 40}ms`;
              li.classList.add('stagger-in');
            });
            staggerObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    document.querySelectorAll('.menu-list').forEach(el => staggerObs.observe(el));

    /* ── Gallery stagger ── */
    const galleryObs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const items = e.target.querySelectorAll('.gallery-item');
            items.forEach((item, i) => {
              item.style.transitionDelay = `${i * 80}ms`;
              item.classList.add('gallery-in');
            });
            galleryObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.gallery-grid').forEach(el => galleryObs.observe(el));

    /* ── Rotating SVG on scroll + Parallax food bowls ── */
    const spinEls = document.querySelectorAll('.scroll-spin');
    const parallaxUpEls = document.querySelectorAll('.scroll-parallax-up');
    const parallaxDownEls = document.querySelectorAll('.scroll-parallax-down');
    let scrollTicking = false;

    function onScrollEffects() {
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          const sy = window.scrollY;
          const vh = window.innerHeight;

          spinEls.forEach(el => {
            const speed = parseFloat(el.dataset.scrollSpin || '0.1');
            el.style.transform = `rotate(${sy * speed}deg)`;
          });

          parallaxUpEls.forEach(el => {
            const rect = el.getBoundingClientRect();
            const center = rect.top + rect.height / 2;
            const offset = (center - vh / 2) * 0.15;
            el.style.transform = `translateY(${-offset}px)`;
          });

          parallaxDownEls.forEach(el => {
            const rect = el.getBoundingClientRect();
            const center = rect.top + rect.height / 2;
            const offset = (center - vh / 2) * 0.12;
            el.style.transform = `translateY(${offset}px)`;
          });

          scrollTicking = false;
        });
        scrollTicking = true;
      }
    }
    if (spinEls.length || parallaxUpEls.length || parallaxDownEls.length) {
      window.addEventListener('scroll', onScrollEffects, { passive: true });
      onScrollEffects();
    }

    /* ── Back-to-top button ── */
    const btt = document.createElement('button');
    btt.className = 'back-to-top';
    btt.setAttribute('aria-label', 'Scroll to top');
    btt.innerHTML = '&#8593;';
    document.body.appendChild(btt);

    function toggleBtt() {
      btt.classList.toggle('visible', window.scrollY > 600);
    }
    window.addEventListener('scroll', toggleBtt, { passive: true });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    toggleBtt();

    /* ── 3D tilt on signature cards (desktop only) ── */
    if (window.matchMedia('(pointer: fine)').matches) {
      document.querySelectorAll('.sig-card').forEach(card => {
        card.addEventListener('mousemove', e => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
          card.style.transform = '';
        });
      });
    }

    /* ── Counter animation for badges ── */
    const counterObs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const el = e.target;
            const text = el.textContent;
            const match = text.match(/(\d+)\+?/);
            if (match) {
              const target = parseInt(match[1]);
              const suffix = text.includes('+') ? '+' : '';
              let count = 0;
              const step = Math.max(1, Math.floor(target / 40));
              const interval = setInterval(() => {
                count = Math.min(count + step, target);
                el.textContent = count + suffix;
                if (count >= target) clearInterval(interval);
              }, 30);
            }
            counterObs.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll('.badge strong').forEach(el => counterObs.observe(el));

    return () => {
      document.documentElement.classList.remove('js-reveal');
      window.removeEventListener('scroll', onScrollEffects);
      window.removeEventListener('scroll', toggleBtt);
      btt.remove();
      revealObs.disconnect();
      staggerObs.disconnect();
      galleryObs.disconnect();
      counterObs.disconnect();
    };
  }, []);

  return null;
}
