export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-wrapper">
        <div className="contact-info reveal">
          <p className="script">Visit Us</p>
          <h2>Find Us Here</h2>
          <address>
            <div className="contact-item">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <a href="https://www.google.com/maps/place/Flavours+Of+Punjab+Restaurant/@28.6366247,77.1812959,17z/data=!3m1!4b1!4m6!3m5!1s0x390d03c42a226741:0xd6907d276a4fefdf!8m2!3d28.6366247!4d77.1838708!16s%2Fg%2F11gsn4hfl2" target="_blank" rel="noopener noreferrer">Shankar Main Road, Rajinder Nagar, New Delhi, India</a>
            </div>
            <div className="contact-item">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:+919910297708">+91 99102 97708</a>
            </div>
            <div className="contact-item">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Mon — Sun &middot; 11:00 AM — 11:00 PM</span>
            </div>
          </address>
        </div>
        <div className="contact-map reveal">
          <a className="map-placeholder" href="https://www.google.com/maps/place/Flavours+Of+Punjab+Restaurant/@28.6366247,77.1812959,17z/data=!3m1!4b1!4m6!3m5!1s0x390d03c42a226741:0xd6907d276a4fefdf!8m2!3d28.6366247!4d77.1838708!16s%2Fg%2F11gsn4hfl2" target="_blank" rel="noopener noreferrer" aria-label="View Flavours Of Punjab on Google Maps">
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="var(--gold)" strokeWidth="1.5">
              <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p>View on Google Maps</p>
          </a>
        </div>
      </div>
    </section>
  );
}
