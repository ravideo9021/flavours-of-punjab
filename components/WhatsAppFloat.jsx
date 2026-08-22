'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PHONE = '918252734533';
const MESSAGE = encodeURIComponent('Hi! I would like to make a reservation at Flavours Of Punjab.');

export default function WhatsAppFloat() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      className="whatsapp-float"
      href={`https://wa.me/${PHONE}?text=${MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            className="whatsapp-tooltip"
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            Chat with us
          </motion.span>
        )}
      </AnimatePresence>
      <svg viewBox="0 0 32 32" width="28" height="28" fill="#fff">
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.744 3.054 9.378L1.056 31.37l6.2-1.97A15.89 15.89 0 0016.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.31 22.608c-.39 1.1-1.932 2.014-3.168 2.28-.846.18-1.952.324-5.674-1.22-4.764-1.976-7.826-6.808-8.064-7.122-.23-.314-1.932-2.574-1.932-4.908s1.222-3.482 1.656-3.96c.434-.478.948-.598 1.264-.598.314 0 .632.004.908.016.292.014.682-.11.968.738.314.902 1.068 3.09 1.16 3.314.094.224.156.484.03.782-.124.298-.186.484-.374.748-.186.262-.39.586-.56.786-.186.216-.378.452-.162.886.216.434.96 1.586 2.062 2.57 1.416 1.264 2.61 1.656 2.98 1.84.372.186.59.156.808-.094.216-.25.93-1.084 1.178-1.458.248-.372.496-.31.836-.186.34.124 2.164 1.022 2.536 1.208.37.186.618.278.71.434.092.156.092.902-.298 2.002z" />
      </svg>
      <span className="whatsapp-pulse" />
    </a>
  );
}
