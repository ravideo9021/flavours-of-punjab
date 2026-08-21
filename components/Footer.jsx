export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h3>Flavours Of Punjab</h3>
          <p>Authentic Punjabi cuisine, lovingly prepared with traditional recipes and the freshest ingredients.</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <nav aria-label="Footer navigation">
            <a href="#hero">Home</a>
            <a href="#about">About</a>
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
