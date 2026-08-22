export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h3>Flavours Of Punjab</h3>
          <p>Authentic Punjabi cuisine, lovingly prepared with traditional recipes and the freshest ingredients.</p>
          <div className="footer-socials">
            <a href="https://www.instagram.com/flavorsofpunjab_fop/" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://wa.me/918252734533" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M12.003 2C6.486 2 2 6.486 2 12.003c0 1.97.57 3.806 1.553 5.356L2 22l4.765-1.51A9.95 9.95 0 0012.003 22C17.52 22 22 17.52 22 12.003S17.52 2 12.003 2zm5.616 14.156c-.235.66-1.16 1.21-1.903 1.37-.508.108-1.172.195-3.41-.733-2.864-1.19-4.704-4.094-4.847-4.283-.138-.19-1.161-1.547-1.161-2.951s.734-2.092.994-2.38c.261-.287.57-.36.76-.36.189 0 .38.002.546.01.175.008.41-.066.641.489.235.57.803 1.957.874 2.098.07.141.118.305.023.49-.094.189-.141.305-.282.472-.141.166-.297.371-.424.498-.141.141-.288.295-.123.57.166.274.738 1.217 1.585 1.97 1.087.968 2.002 1.268 2.287 1.41.284.14.45.118.614-.071.166-.189.704-.822.891-1.105.189-.282.377-.235.632-.141.261.094 1.636.771 1.918.912.282.141.469.212.537.329.071.118.071.682-.166 1.34z"/>
              </svg>
            </a>
          </div>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <nav aria-label="Footer navigation">
            <a href="#hero">Home</a>
            <a href="#about">About</a>
            <a href="#events">Events</a>
            <a href="#menu">Menu</a>
            <a href="#gallery">Gallery</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
        <div className="footer-hours">
          <h4>Opening Hours</h4>
          <p>Monday — Sunday</p>
          <p>11:00 AM — 11:00 PM</p>
          <p className="footer-phone">
            <a href="tel:+919910297708">+91 99102 97708</a>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Flavours Of Punjab. All rights reserved.</p>
      </div>
    </footer>
  );
}
