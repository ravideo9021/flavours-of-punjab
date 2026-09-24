import Link from 'next/link';

/**
 * Wordmark. Each word carries its own gradient: Safari only paints
 * `background-clip: text` on an element's own text, and a child with its own
 * layer (opacity, transform, position) inside a clipped parent renders as
 * transparent text — which is why "of" used to vanish on phones.
 */
export default function Logo({ className = '', onClick }) {
  return (
    <Link href="/" className={`logo ${className}`} aria-label="Flavours Of Punjab — home" onClick={onClick}>
      <span className="logo-word">Flavours</span>
      <span className="logo-of">of</span>
      <span className="logo-word">Punjab</span>
    </Link>
  );
}
