/**
 * Business facts used across the whole site (header, footer, contact,
 * structured data, WhatsApp messages...). Change them here, once.
 *
 * Please double-check anything marked VERIFY against your Google Business
 * Profile: search engines and customers compare the two, and mismatched hours
 * or phone numbers cost both rankings and walk-ins.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://flavours-of-punjab.vercel.app').replace(/\/$/, '');

export const site = {
  name: 'Flavours Of Punjab',
  shortName: 'Flavours Of Punjab',
  tagline: 'Authentic Punjabi Family Restaurant',
  description:
    'Authentic Punjabi family restaurant in Old Rajinder Nagar, New Delhi. Smoky tandoori, rich butter chicken, dal makhni, biryani and fresh breads from the tandoor. Dine-in, takeaway, home delivery, parties and outdoor catering.',
  cuisines: ['Punjabi', 'North Indian', 'Mughlai', 'Indo-Chinese'],
  priceRange: '₹₹',

  phone: { display: '+91 99102 97708', href: 'tel:+919910297708', e164: '+919910297708' },
  whatsapp: { display: '+91 82527 34533', number: '918252734533' },

  address: {
    street: '3/16, Shankar Road, Block 3',
    locality: 'Old Rajinder Nagar',
    city: 'New Delhi',
    region: 'Delhi',
    postalCode: '110060',
    country: 'IN',
    landmark: 'Near Main Market, Shankar Road',
  },
  geo: { lat: 28.6366247, lng: 77.1838708 },

  maps: {
    place:
      'https://www.google.com/maps/place/Flavours+Of+Punjab+Restaurant/@28.6366247,77.1812959,17z/data=!3m1!4b1!4m6!3m5!1s0x390d03c42a226741:0xd6907d276a4fefdf!8m2!3d28.6366247!4d77.1838708!16s%2Fg%2F11gsn4hfl2',
    directions:
      'https://www.google.com/maps/dir/?api=1&destination=Flavours+Of+Punjab+Restaurant%2C+3%2F16+Shankar+Rd%2C+Old+Rajinder+Nagar%2C+New+Delhi+110060',
    embed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.7!2d77.1812959!3d28.6366247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03c42a226741%3A0xd6907d276a4fefdf!2sFlavours%20Of%20Punjab%20Restaurant!5e0!3m2!1sen!2sin',
  },

  // VERIFY: the previous site said 11 AM - 11 PM every day, while public
  // listings (Google/Justdial) show 12 PM - 12 AM. Keep this identical to your
  // Google Business Profile. Days: 0 = Sunday ... 6 = Saturday, 24h "HH:MM".
  hours: [{ days: [0, 1, 2, 3, 4, 5, 6], opens: '11:00', closes: '23:00' }],
  timeZone: 'Asia/Kolkata',

  order: {
    swiggy:
      'https://www.swiggy.com/city/delhi/flavours-of-punjab-shankar-main-road-rajinder-nagar-rest9826?source=sharing',
    zomato: 'https://zomato.onelink.me/xqzv/5ynak9ns',
  },

  social: {
    instagram: 'https://www.instagram.com/flavorsofpunjab_fop/',
  },

  reviews: {
    // Where "Read our reviews" sends people (your Google Maps listing).
    google:
      'https://www.google.com/maps/place/Flavours+Of+Punjab+Restaurant/@28.6366247,77.1812959,17z/data=!3m1!4b1!4m6!3m5!1s0x390d03c42a226741:0xd6907d276a4fefdf!8m2!3d28.6366247!4d77.1838708!16s%2Fg%2F11gsn4hfl2',
    zomato: 'https://www.zomato.com/ncr/flavours-of-punjab-rajinder-nagar-new-delhi/reviews',
    // Optional: paste the "Ask for reviews" short link from your Google
    // Business Profile (looks like https://g.page/r/XXXX/review) to open the
    // review form directly. Until then the button opens your Maps listing.
    googleWrite: null,
    // Optional: shown as "4.x on Google" once filled in from your profile,
    // e.g. { value: 4.1, count: 1000 }. Left empty so the site never shows a
    // number that is out of date.
    googleRating: null,
  },
};

export const fullAddress = `${site.address.street}, ${site.address.locality}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;

/** wa.me deep link with a pre-filled message. */
export function whatsappLink(message) {
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${site.whatsapp.number}${text}`;
}
