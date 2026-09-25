/**
 * The full menu — the single source of truth for the menu section, the /menu
 * page, dish cards and structured data. Prices are in rupees.
 *
 * - `diet`: 'veg' | 'nonveg' | 'both' (drives the FSSAI-style green / brown marks)
 * - `prices`: one number, or several matching the section's `portions`
 *   (when an item has fewer prices than portions, they map to the last ones,
 *   e.g. two prices in a Qtr / Half / Full section = Half / Full)
 * - `special`: highlighted as a chef's special
 *
 * Items marked "diet assumed" were not labelled on the original menu; please
 * confirm them.
 */

export const menu = [
  {
    id: 'starters',
    label: 'Starters',
    blurb: 'Soups, tandoor starters and platters',
    sections: [
      {
        title: 'Soups',
        portions: ['Veg', 'Non-Veg'],
        items: [
          { name: 'Manchow Soup', diet: 'both', prices: [150, 190] },
          { name: 'Hot N Sour Soup', diet: 'both', prices: [150, 190] },
          { name: 'Sweet Corn Soup', diet: 'both', prices: [150, 190] },
        ],
      },
      {
        title: 'Non-Veg Starters',
        portions: ['Half', 'Full'],
        items: [
          { name: 'Tandoori Chicken', diet: 'nonveg', prices: [290, 450] },
          { name: 'Afghani Chicken', diet: 'nonveg', prices: [320, 480] },
          { name: 'Bhatti Murg', diet: 'nonveg', prices: [330, 490] },
          { name: 'Chicken Chatpata', diet: 'nonveg', prices: [320, 480] },
          { name: 'Murg Kali Mirch', diet: 'nonveg', prices: [330, 490] },
          { name: 'Murg Tikka', diet: 'nonveg', prices: [240, 370] },
          { name: 'Malai Chicken Tikka', diet: 'nonveg', prices: [250, 370] },
          { name: 'Murg Tikka Garlic Flavour', diet: 'nonveg', prices: [250, 370] },
          { name: 'Murg Kali Mirch Tikka', diet: 'nonveg', prices: [250, 370] },
          { name: 'Murg Tikka Achari', diet: 'nonveg', prices: [250, 370] },
          { name: 'Murg Tikka Hariyali', diet: 'nonveg', prices: [250, 370] },
          { name: 'Chicken Seekh Chatpata', diet: 'nonveg', prices: [240, 350] },
          { name: 'Mutton Seekh Karari', diet: 'nonveg', prices: [250, 370] },
        ],
      },
      {
        title: 'Veg Starters',
        items: [
          { name: 'Paneer Tikka', diet: 'veg', prices: [310] },
          { name: 'Paneer Kali Mirch Tikka', diet: 'veg', prices: [320] },
          { name: 'Paneer Tikka Malai', diet: 'veg', prices: [320] },
          { name: 'Paneer Tikka Hariyali', diet: 'veg', prices: [320] },
          { name: 'Tandoori Aloo', diet: 'veg', prices: [320] },
          { name: 'Afghani Chaap', diet: 'veg', prices: [290] },
          { name: 'Malai Chaap', diet: 'veg', prices: [310] },
          { name: 'Chatpati Chaap', diet: 'veg', prices: [290] },
          { name: 'Bharwa Chaap', diet: 'veg', prices: [370] },
          { name: 'Hariyali Chaap', diet: 'veg', prices: [290] },
          { name: 'Dahi Ke Chholay', diet: 'veg', prices: [360] },
          { name: 'Tandoori Mushroom', diet: 'veg', prices: [360] },
          { name: 'Tandoori Bharwa Mushroom', diet: 'veg', prices: [400] },
        ],
      },
      {
        title: 'Special Platters',
        items: [
          { name: 'Tandoori Platter (Non-Veg)', slug: 'tandoori-platter-nonveg', diet: 'nonveg', prices: [580], special: true },
          { name: 'Special Tandoori Platter (Veg)', slug: 'tandoori-platter-veg', diet: 'veg', prices: [540], special: true },
        ],
      },
    ],
  },
  {
    id: 'non-veg-mains',
    label: 'Non-Veg Mains',
    blurb: 'Tawa and handi chicken, mutton and egg',
    sections: [
      {
        title: 'Tawa Non-Veg',
        portions: ['Qtr', 'Half', 'Full'],
        items: [
          { name: 'Butter Chicken', diet: 'nonveg', prices: [290, 440, 650] },
          { name: 'Butter Chicken (Boneless)', diet: 'nonveg', prices: [300, 480, 690] },
          { name: 'Kadhai Chicken', diet: 'nonveg', prices: [290, 440, 650] },
          { name: 'Kadhai Chicken (Boneless)', diet: 'nonveg', prices: [300, 480, 690] },
          { name: 'Chicken Tikka Butter Masala', diet: 'nonveg', prices: [480, 690] },
          { name: 'Chicken Butter Masala', diet: 'nonveg', prices: [440, 650] },
          { name: 'Murg Masala', diet: 'nonveg', prices: [480, 690] },
          { name: 'Ghar Ka Murg', diet: 'nonveg', prices: [480, 690] },
          { name: 'Murg Kali Mirch', slug: 'murg-kali-mirch-curry', diet: 'nonveg', prices: [480, 690] },
          { name: 'Chicken Patiala', diet: 'nonveg', prices: [790] },
          { name: 'Murg Do Pyaza', diet: 'nonveg', prices: [440, 650] },
        ],
      },
      {
        title: 'Non-Veg Curries',
        portions: ['Half', 'Full'],
        items: [
          { name: 'Tawa Seekh Butter Masala', diet: 'nonveg', prices: [450] },
          { name: 'Chicken Curry', diet: 'nonveg', prices: [440, 650] },
          { name: 'Murg Rara', diet: 'nonveg', prices: [480, 690] },
          { name: 'Takata Tawa Masala', diet: 'nonveg', prices: [440, 650] },
          { name: 'Chicken Lababdar', diet: 'nonveg', prices: [440, 650] },
          { name: 'Mutton Rogan Josh', diet: 'nonveg', prices: [320, 470] },
          { name: 'Mutton Masala', diet: 'nonveg', prices: [320, 470] },
          { name: 'Mutton Seekh Masala', diet: 'nonveg', prices: [450] },
          { name: 'Keema Meat', diet: 'nonveg', prices: [350, 480] },
          { name: 'Egg Curry', diet: 'nonveg', prices: [260, 380] },
          { name: 'Chef Spl. Beleram Boneless Chicken', diet: 'nonveg', prices: [540, 780], special: true },
        ],
      },
    ],
  },
  {
    id: 'veg-mains',
    label: 'Veg Mains',
    blurb: 'Dal, paneer and vegetable curries',
    sections: [
      {
        title: 'Dal & Paneer',
        items: [
          { name: 'Chef Spl. Dal Makhni', slug: 'dal-makhni', diet: 'veg', prices: [240], special: true },
          { name: 'Spl. Punjabi Dal Tadka', diet: 'veg', prices: [235] },
          { name: 'Rajma', diet: 'veg', prices: [260] },
          { name: 'Chana Masala', diet: 'veg', prices: [250] },
          { name: 'Paneer Makhni', diet: 'veg', prices: [310] },
          { name: 'Palak Paneer', diet: 'veg', prices: [310] },
          { name: 'Kadhai Paneer', diet: 'veg', prices: [310] },
          { name: 'Tawa Paneer Masala', diet: 'veg', prices: [310] },
          { name: 'Paneer Tikka Butter Masala', diet: 'veg', prices: [320] },
          { name: 'Paneer Butter Masala', diet: 'veg', prices: [320] },
          { name: 'Shahi Paneer', diet: 'veg', prices: [320] },
          { name: 'Paneer Lababdar', diet: 'veg', prices: [320] },
          { name: 'Aloo Jeera', diet: 'veg', prices: [300] },
        ],
      },
      {
        title: 'Veg Specials',
        items: [
          { name: 'Mutter Paneer', diet: 'veg', prices: [310] },
          { name: 'Tawa Mushroom Masala', diet: 'veg', prices: [310] },
          { name: 'Khumb Do Pyaza', diet: 'veg', prices: [310] },
          { name: 'Sabzi Miloni (Mix Veg)', diet: 'veg', prices: [310] },
          { name: 'Shahi Malai Kofta Bharwan', diet: 'veg', prices: [350] },
          { name: 'Paneer Pasanda', diet: 'veg', prices: [350] },
          { name: 'Chaap Pasaala', diet: 'veg', prices: [310] },
          { name: 'Veg Soya Rogan Josh', diet: 'veg', prices: [310] },
          { name: 'Soya Keema Mutter', diet: 'veg', prices: [310] },
          { name: 'Dum Aloo Kashmiri', diet: 'veg', prices: [250] },
          { name: 'Methi Malai Mutter', diet: 'veg', prices: [350] },
          { name: 'Palak Corn', diet: 'veg', prices: [350] },
        ],
      },
    ],
  },
  {
    id: 'indo-chinese',
    label: 'Indo-Chinese',
    blurb: 'Chilli, Manchurian, fried rice and noodles',
    sections: [
      {
        title: 'Veg',
        portions: ['Half', 'Full'],
        items: [
          { name: 'Chilli Paneer (Dry / Gravy)', diet: 'veg', prices: [290, 340] },
          { name: 'Veg Manchurian (Dry / Gravy)', diet: 'veg', prices: [330, 370] },
          { name: 'Honey Crispy Potato', diet: 'veg', prices: [270] },
          { name: 'Chilli Potato', diet: 'veg', prices: [270] },
          { name: 'Chilli Mushroom (Dry / Gravy)', diet: 'veg', prices: [370, 400] },
          { name: 'Chilli Chaap (Dry / Gravy)', diet: 'veg', prices: [320, 360] },
        ],
      },
      {
        title: 'Non-Veg',
        portions: ['Half', 'Full'],
        items: [
          { name: 'Chilli Chicken (Dry / Gravy)', diet: 'nonveg', prices: [370, 410] },
          { name: 'Chicken Salt & Pepper', diet: 'nonveg', prices: [440] },
          { name: 'Chicken Manchurian (Dry / Gravy)', diet: 'nonveg', prices: [440, 470] },
          { name: 'Chicken in Hot Garlic Sauce', diet: 'nonveg', prices: [450] },
          { name: 'Chicken Lollipop', diet: 'nonveg', prices: [440] },
          { name: 'Chilli Fish (Dry / Gravy)', diet: 'nonveg', prices: [540, 580] },
        ],
      },
      {
        title: 'Fried Rice',
        items: [
          { name: 'Veg Fried Rice', diet: 'veg', prices: [260] },
          { name: 'Egg Fried Rice', diet: 'nonveg', prices: [320] },
          { name: 'Chicken Fried Rice', diet: 'nonveg', prices: [350] },
          { name: 'Mix Fried Rice (incl. Chicken)', diet: 'nonveg', prices: [360] },
        ],
      },
      {
        title: 'Noodles',
        items: [
          { name: 'Veg Noodles', diet: 'veg', prices: [220] },
          { name: 'Egg Noodles', diet: 'nonveg', prices: [250] },
          { name: 'Chicken Noodles', diet: 'nonveg', prices: [300] },
          { name: 'Hakka Noodles', diet: 'veg', prices: [230] }, // diet assumed
          { name: 'Chilli Garlic Noodles', diet: 'veg', prices: [230] }, // diet assumed
          { name: 'Mix Noodles', diet: 'nonveg', prices: [320] }, // diet assumed
        ],
      },
    ],
  },
  {
    id: 'rice-breads',
    label: 'Rice & Breads',
    blurb: 'Biryani, rice and breads from the tandoor',
    sections: [
      {
        title: 'Rice & Biryani',
        items: [
          { name: 'Plain Rice', diet: 'veg', prices: [140] },
          { name: 'Jeera Rice', diet: 'veg', prices: [170] },
          { name: 'Veg Biryani with Raita', slug: 'veg-biryani', diet: 'veg', prices: [310] },
          { name: 'Egg Biryani with Curry / Raita', diet: 'nonveg', prices: [330] },
          { name: 'Chicken Biryani with Curry / Raita', slug: 'chicken-biryani', diet: 'nonveg', prices: [370] },
          { name: 'Mutton Biryani with Curry / Raita', diet: 'nonveg', prices: [390] },
        ],
      },
      {
        title: 'Breads',
        items: [
          { name: 'Tandoori Roti', diet: 'veg', prices: [20] },
          { name: 'Butter Roti', diet: 'veg', prices: [25] },
          { name: 'Rumali Roti', diet: 'veg', prices: [20] },
          { name: 'Plain Naan', diet: 'veg', prices: [45] },
          { name: 'Butter Naan', diet: 'veg', prices: [50] },
          { name: 'Missi Roti', diet: 'veg', prices: [65] },
          { name: 'Garlic Naan', diet: 'veg', prices: [55] },
          { name: 'Laccha Paratha', diet: 'veg', prices: [55] },
          { name: 'Pudina Paratha', diet: 'veg', prices: [55] },
          { name: 'Mirchi Paratha (Red / Green)', diet: 'veg', prices: [55] },
          { name: 'Paneer Paratha', diet: 'veg', prices: [125] },
          { name: 'Aloo Paratha', diet: 'veg', prices: [95] },
          { name: 'Amritsari Kulcha', diet: 'veg', prices: [140] },
          { name: 'Mutton Keema Naan', diet: 'nonveg', prices: [170] },
          { name: 'Chicken Keema Naan', diet: 'nonveg', prices: [160] },
          { name: 'Mutton Keema Naan with Gravy', diet: 'nonveg', prices: [270] },
          { name: 'Chicken Keema Naan with Gravy', diet: 'nonveg', prices: [260] },
        ],
      },
    ],
  },
  {
    id: 'sides-drinks',
    label: 'Sides & Drinks',
    blurb: 'Raita, salad, papad, drinks and dessert',
    sections: [
      {
        title: 'Sides',
        items: [
          { name: 'Mix Raita', diet: 'veg', prices: [130] },
          { name: 'Plain Curd', diet: 'veg', prices: [120] },
          { name: 'Pineapple Raita', diet: 'veg', prices: [180] },
          { name: 'Boondi Raita', diet: 'veg', prices: [130] },
          { name: 'Green Salad', diet: 'veg', prices: [130] },
          { name: 'Roasted Papad', diet: 'veg', prices: [60] },
          { name: 'Masala Papad', diet: 'veg', prices: [70] },
          { name: 'Fried Papad', diet: 'veg', prices: [80] },
        ],
      },
      {
        title: 'Drinks',
        items: [
          { name: 'Soft Drinks', diet: 'veg', prices: [] },
          { name: 'Water Bottle', diet: 'veg', prices: [] },
          { name: 'Fresh Lime', diet: 'veg', prices: [120] },
          { name: 'Sweet / Salted Lassi', diet: 'veg', prices: [120] },
        ],
      },
      {
        title: 'Desserts',
        items: [{ name: 'Gulab Jamun', diet: 'veg', prices: [150], special: true }],
      },
    ],
  },
];

export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/** Every item with its category/section context and a stable slug. */
export const allItems = menu.flatMap((category) =>
  category.sections.flatMap((section) =>
    section.items.map((item) => ({
      ...item,
      slug: item.slug ?? slugify(item.name),
      categoryId: category.id,
      section: section.title,
      portions: section.portions,
    })),
  ),
);

const bySlug = new Map(allItems.map((item) => [item.slug, item]));

export function getItem(slug) {
  const item = bySlug.get(slug);
  if (!item) throw new Error(`Unknown menu item "${slug}"`);
  return item;
}

export const formatRupees = (value) => `₹${value.toLocaleString('en-IN')}`;

/** Name for short lists: "Chef Spl. Dal Makhni" -> "Dal Makhni", "Chicken Biryani with Curry / Raita" -> "Chicken Biryani". */
export const shortName = (name) => name.replace(/^(Chef )?Spl\.\s*/, '').replace(/ with .*$/, '');

/** [{ label: 'Half', value: 290 }, ...] — labels align to the right of `portions`. */
export function priceList(item) {
  const { prices = [], portions } = item;
  if (!portions || prices.length < 2) return prices.map((value) => ({ label: null, value }));
  const labels = portions.slice(portions.length - prices.length);
  return prices.map((value, i) => ({ label: labels[i] ?? null, value }));
}

/** Short price for cards: "₹310" or "from ₹290". */
export function priceFrom(item) {
  if (!item.prices?.length) return '';
  const min = Math.min(...item.prices);
  return item.prices.length > 1 ? `from ${formatRupees(min)}` : formatRupees(min);
}

export const dishCount = allItems.length;
