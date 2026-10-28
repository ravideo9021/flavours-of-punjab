'use client';
import { useId, useState } from 'react';

// Longer reviews start clipped to a few lines with "Read more", so one long
// review doesn't tower over the rest (or over a phone screen).
const LONG = 420;

export default function ReviewText({ text }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const long = text.length > LONG;

  return (
    <>
      <blockquote id={id} className={long && !open ? 'is-clipped' : undefined}>
        {text.split('\n\n').map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </blockquote>
      {long && (
        <button
          type="button"
          className="review-more"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen(!open)}
        >
          {open ? 'Show less' : 'Read more'}
        </button>
      )}
    </>
  );
}
