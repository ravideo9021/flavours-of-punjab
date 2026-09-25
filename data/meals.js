import { formatRupees, getItem, priceList, shortName } from './menu';

/**
 * Ready-made meals for the "Order online" section: suggestions put together
 * from the menu, at menu prices, that guests can order on WhatsApp in one tap.
 * Change the dishes here and the prices, totals and message follow; a dish or
 * portion that is not on the menu stops the build instead of showing a wrong
 * price.
 *
 * - `slug`: a menu item (see data/menu.js)
 * - `portion`: 'Qtr' | 'Half' | 'Full' for dishes that come in sizes
 * - `qty`: how many (1 if left out)
 * - `photos`: cut-out images from data/images.json, left to right
 */
export const meals = [
  {
    id: 'dinner-for-two',
    title: 'Dinner for two',
    people: 2,
    diet: 'nonveg',
    photos: ['dal-makhani', 'butter-chicken-bowl', 'garlic-naan'],
    items: [
      { slug: 'butter-chicken', portion: 'Half' },
      { slug: 'dal-makhni' },
      { slug: 'jeera-rice' },
      { slug: 'garlic-naan', qty: 4 },
      { slug: 'sweet-salted-lassi', qty: 2 },
    ],
  },
  {
    id: 'veg-feast-for-two',
    title: 'Veg feast for two',
    people: 2,
    diet: 'veg',
    photos: ['dal-makhani', 'paneer-tikka-bowl', 'veg-biryani'],
    items: [
      { slug: 'paneer-tikka' },
      { slug: 'dal-makhni' },
      { slug: 'veg-biryani' },
      { slug: 'butter-naan', qty: 2 },
      { slug: 'gulab-jamun' },
    ],
  },
  {
    id: 'family-feast',
    title: 'Family feast for four',
    people: 4,
    diet: 'nonveg',
    photos: ['chicken-biryani', 'tandoori-chicken', 'butter-chicken-bowl'],
    items: [
      { slug: 'tandoori-chicken', portion: 'Full' },
      { slug: 'butter-chicken', portion: 'Full' },
      { slug: 'dal-makhni' },
      { slug: 'chicken-biryani' },
      { slug: 'butter-naan', qty: 6 },
      { slug: 'gulab-jamun', qty: 2 },
    ],
  },
];

/** Lines with menu prices, the total and a rounded price per person. */
export function priceMeal(meal) {
  const lines = meal.items.map(({ slug, portion, qty = 1 }) => {
    const item = getItem(slug);
    const price = portion
      ? priceList(item).find((p) => p.label === portion)?.value
      : item.prices.length === 1
        ? item.prices[0]
        : undefined;
    if (!price) throw new Error(`Meal "${meal.id}": no ${portion ?? 'single'} price for "${slug}"`);
    return { slug, name: shortName(item.name), portion, qty, total: price * qty };
  });
  const total = lines.reduce((sum, line) => sum + line.total, 0);
  return { lines, total, perPerson: Math.round(total / meal.people / 5) * 5 };
}

/** The pre-filled WhatsApp order. */
export function mealMessage(meal) {
  const { lines, total } = priceMeal(meal);
  const list = lines
    .map((l) => `• ${l.qty > 1 ? `${l.qty} × ` : ''}${l.name}${l.portion ? ` (${l.portion})` : ''} – ${formatRupees(l.total)}`)
    .join('\n');
  return `Hi Flavours Of Punjab! I'd like to order the ${meal.title}:\n${list}\nMenu total: ${formatRupees(total)}\n\nDelivery address (or "pickup"): `;
}
