'use client';
import { useState, useEffect, useRef } from 'react';
import { menuCategories, menuData } from '@/data/menu';

function MenuCategory({ section }) {
  return (
    <div>
      <h3 className="cat-title">
        {section.title}
        {section.subtitle && <small> {section.subtitle}</small>}
      </h3>
      <ul className="menu-list">
        {section.items.map((item, i) => (
          <li key={i} className={item.highlight ? 'highlight' : ''}>
            <span>{item.name}</span>
            <em>{item.price}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState('starters');
  const panelRef = useRef(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const items = panel.querySelectorAll('.menu-list li');
    items.forEach((li, i) => {
      li.style.transitionDelay = `${i * 40}ms`;
      li.classList.add('stagger-in');
    });
  }, [activeTab]);

  const sections = menuData[activeTab] || [];
  const mid = Math.ceil(sections.length / 2);
  const col1 = sections.slice(0, mid);
  const col2 = sections.slice(mid);

  return (
    <section className="menu-section" id="menu">
      <div className="menu-top reveal">
        <p className="script">Our Menu</p>
        <h2>A Feast For Every Palate</h2>
        <p className="menu-note">Half &amp; quarter portions available on select items</p>
      </div>

      <nav className="menu-tabs" aria-label="Menu categories">
        {menuCategories.map(cat => (
          <button
            key={cat.key}
            className={`menu-tab ${activeTab === cat.key ? 'active' : ''}`}
            onClick={() => setActiveTab(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </nav>

      <div className="menu-panels">
        <div className="menu-panel active" key={activeTab} ref={panelRef}>
          <div className="menu-col">
            {col1.map((section, i) => (
              <MenuCategory key={i} section={section} />
            ))}
          </div>
          <div className="menu-col">
            {col2.map((section, i) => (
              <MenuCategory key={i} section={section} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
