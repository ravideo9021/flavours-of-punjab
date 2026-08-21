'use client';
import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', msg: data.message });
        setEmail('');
      } else {
        setStatus({ type: 'error', msg: data.error });
      }
    } catch {
      setStatus({ type: 'error', msg: 'Something went wrong. Try again.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="newsletter">
      <div className="newsletter-inner reveal">
        <p className="script">Stay Connected</p>
        <h2>Get Exclusive Offers</h2>
        <p>Subscribe for special deals, new menu launches, and festival feasts.</p>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            aria-label="Email address"
          />
          <button type="submit" className="btn btn-gold" disabled={loading}>
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        {status && (
          <p className={`newsletter-status ${status.type}`}>{status.msg}</p>
        )}
      </div>
    </section>
  );
}
