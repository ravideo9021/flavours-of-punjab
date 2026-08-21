export const menuCategories = [
  { key: 'starters', label: 'Starters' },
  { key: 'tawa', label: 'Tawa & Tandoor' },
  { key: 'curries', label: 'Curries' },
  { key: 'chinese', label: 'Indo-Chinese' },
  { key: 'rice', label: 'Rice & Breads' },
  { key: 'extras', label: 'Extras' },
];

export const menuData = {
  starters: [
    {
      title: 'Soups',
      items: [
        { name: 'Manchow Soup (Veg / Non-Veg)', price: '₹150 / ₹190' },
        { name: 'Hot N Sour Soup (Veg / Non-Veg)', price: '₹150 / ₹190' },
        { name: 'Sweet Corn Soup (Veg / Non-Veg)', price: '₹150 / ₹190' },
      ],
    },
    {
      title: 'Non-Veg Starters',
      subtitle: 'Half / Full',
      items: [
        { name: 'Tandoori Chicken', price: '₹290 / ₹450' },
        { name: 'Afghani Chicken', price: '₹320 / ₹480' },
        { name: 'Bhatti Murg', price: '₹330 / ₹490' },
        { name: 'Chicken Chatpata', price: '₹320 / ₹480' },
        { name: 'Murg Kali Mirch', price: '₹330 / ₹490' },
        { name: 'Murg Tikka', price: '₹240 / ₹370' },
        { name: 'Malai Chicken Tikka', price: '₹250 / ₹370' },
        { name: 'Murg Tikka Garlic Flavour', price: '₹250 / ₹370' },
        { name: 'Murg Kali Mirch Tikka', price: '₹250 / ₹370' },
        { name: 'Murg Tikka Achari', price: '₹250 / ₹370' },
        { name: 'Murg Tikka Hariyali', price: '₹250 / ₹370' },
        { name: 'Chicken Seekh Chatpata', price: '₹240 / ₹350' },
        { name: 'Mutton Seekh Karari', price: '₹250 / ₹370' },
      ],
    },
    {
      title: 'Veg Starters',
      items: [
        { name: 'Paneer Tikka', price: '₹310' },
        { name: 'Paneer Kali Mirch Tikka', price: '₹320' },
        { name: 'Paneer Tikka Malai', price: '₹320' },
        { name: 'Paneer Tikka Hariyali', price: '₹320' },
        { name: 'Tandoori Aloo', price: '₹320' },
        { name: 'Afghani Chaap', price: '₹290' },
        { name: 'Malai Chaap', price: '₹310' },
        { name: 'Chatpati Chaap', price: '₹290' },
        { name: 'Bharwa Chaap', price: '₹370' },
        { name: 'Hariyali Chaap', price: '₹290' },
        { name: 'Dahi Ke Chholay', price: '₹360' },
        { name: 'Tandoori Mushroom', price: '₹360' },
        { name: 'Tandoori Bharwa Mushroom', price: '₹400' },
      ],
    },
    {
      title: 'Special Platters',
      items: [
        { name: 'Tandoori Platter (Non-Veg)', price: '₹580', highlight: true },
        { name: 'Special Tandoori Platter (Veg)', price: '₹540', highlight: true },
      ],
    },
  ],

  tawa: [
    {
      title: 'Tawa Non-Veg',
      subtitle: 'Qtr / Half / Full',
      items: [
        { name: 'Butter Chicken', price: '₹290 / ₹440 / ₹650' },
        { name: 'Butter Chicken (Boneless)', price: '₹300 / ₹480 / ₹690' },
        { name: 'Kadhai Chicken', price: '₹290 / ₹440 / ₹650' },
        { name: 'Kadhai Chicken (Boneless)', price: '₹300 / ₹480 / ₹690' },
        { name: 'Chicken Tikka Butter Masala', price: '₹480 / ₹690' },
        { name: 'Chicken Butter Masala', price: '₹440 / ₹650' },
        { name: 'Murg Masala', price: '₹480 / ₹690' },
        { name: 'Ghar Ka Murg', price: '₹480 / ₹690' },
        { name: 'Murg Kali Mirch', price: '₹480 / ₹690' },
        { name: 'Chicken Patiala', price: '₹790' },
        { name: 'Murg Do Pyaza', price: '₹440 / ₹650' },
      ],
    },
    {
      title: ' ',
      subtitle: 'Half / Full',
      items: [
        { name: 'Tawa Seekh Butter Masala', price: '₹450' },
        { name: 'Chicken Curry', price: '₹440 / ₹650' },
        { name: 'Murg Rara', price: '₹480 / ₹690' },
        { name: 'Takata Tawa Masala', price: '₹440 / ₹650' },
        { name: 'Chicken Lababdar', price: '₹440 / ₹650' },
        { name: 'Mutton Rogan Josh', price: '₹320 / ₹470' },
        { name: 'Mutton Masala', price: '₹320 / ₹470' },
        { name: 'Mutton Seekh Masala', price: '₹450' },
        { name: 'Keema Meat', price: '₹350 / ₹480' },
        { name: 'Egg Curry', price: '₹260 / ₹380' },
        { name: 'Chef Spl. Beleram Boneless Chicken', price: '₹540 / ₹780', highlight: true },
      ],
    },
  ],

  curries: [
    {
      title: 'Handi & Tawa',
      items: [
        { name: 'Chef Spl. Dal Makhni', price: '₹240', highlight: true },
        { name: 'Spl. Punjabi Dal Tadka', price: '₹235' },
        { name: 'Rajma', price: '₹260' },
        { name: 'Chana Masala', price: '₹250' },
        { name: 'Paneer Makhni', price: '₹310' },
        { name: 'Palak Paneer', price: '₹310' },
        { name: 'Kadhai Paneer', price: '₹310' },
        { name: 'Tawa Paneer Masala', price: '₹310' },
        { name: 'Paneer Tikka Butter Masala', price: '₹320' },
        { name: 'Paneer Butter Masala', price: '₹320' },
        { name: 'Shahi Paneer', price: '₹320' },
        { name: 'Paneer Lababdar', price: '₹320' },
        { name: 'Aloo Jeera', price: '₹300' },
      ],
    },
    {
      title: ' ',
      items: [
        { name: 'Mutter Paneer', price: '₹310' },
        { name: 'Tawa Mushroom Masala', price: '₹310' },
        { name: 'Khumb Do Pyaza', price: '₹310' },
        { name: 'Sabzi Miloni (Mix Veg)', price: '₹310' },
        { name: 'Shahi Malai Kofta Bharwan', price: '₹350' },
        { name: 'Paneer Pasanda', price: '₹350' },
        { name: 'Chaap Pasaala', price: '₹310' },
        { name: 'Veg Soya Rogan Josh', price: '₹310' },
        { name: 'Soya Keema Mutter', price: '₹310' },
        { name: 'Dum Aloo Kashmiri', price: '₹250' },
        { name: 'Methi Malai Mutter', price: '₹350' },
        { name: 'Palak Corn', price: '₹350' },
      ],
    },
  ],

  chinese: [
    {
      title: 'Veg',
      subtitle: 'Half / Full',
      items: [
        { name: 'Chilli Paneer (Dry/Gravy)', price: '₹290 / ₹340' },
        { name: 'Veg Manchurian (Dry/Gravy)', price: '₹330 / ₹370' },
        { name: 'Honey Crispy Potato', price: '₹270' },
        { name: 'Chilli Potato', price: '₹270' },
        { name: 'Chilli Mushroom (Dry/Gravy)', price: '₹370 / ₹400' },
        { name: 'Chilli Chaap (Dry/Gravy)', price: '₹320 / ₹360' },
      ],
    },
    {
      title: 'Non-Veg',
      subtitle: 'Half / Full',
      items: [
        { name: 'Chilli Chicken (Dry/Gravy)', price: '₹370 / ₹410' },
        { name: 'Chicken Salt & Pepper', price: '₹440' },
        { name: 'Chicken Manchurian (Dry/Gravy)', price: '₹440 / ₹470' },
        { name: 'Chicken in Hot Garlic Sauce', price: '₹450' },
        { name: 'Chicken Lollipop', price: '₹440' },
        { name: 'Chilli Fish (Dry/Gravy)', price: '₹540 / ₹580' },
      ],
    },
  ],

  rice: [
    {
      title: 'Rice & Biryani',
      items: [
        { name: 'Plain Rice', price: '₹140' },
        { name: 'Jeera Rice', price: '₹170' },
        { name: 'Veg Biryani with Raita', price: '₹310' },
        { name: 'Egg Biryani Curry / Raita', price: '₹330' },
        { name: 'Chicken Biryani Curry / Raita', price: '₹370' },
        { name: 'Mutton Biryani Curry / Raita', price: '₹390' },
      ],
    },
    {
      title: 'Fried Rice',
      items: [
        { name: 'Veg Fried Rice', price: '₹260' },
        { name: 'Egg Fried Rice', price: '₹320' },
        { name: 'Chicken Fried Rice', price: '₹350' },
        { name: 'Mix Fried Rice (Incl. Chicken)', price: '₹360' },
      ],
    },
    {
      title: 'Noodles',
      items: [
        { name: 'Veg Noodles', price: '₹220' },
        { name: 'Egg Noodles', price: '₹250' },
        { name: 'Chicken Noodles', price: '₹300' },
        { name: 'Hakka Noodles', price: '₹230' },
        { name: 'Chilli Garlic Noodles', price: '₹230' },
        { name: 'Mix Noodles', price: '₹320' },
      ],
    },
    {
      title: 'Breads',
      items: [
        { name: 'Tandoori Roti', price: '₹20' },
        { name: 'Butter Roti', price: '₹25' },
        { name: 'Rumali Roti', price: '₹20' },
        { name: 'Plain Naan', price: '₹45' },
        { name: 'Butter Naan', price: '₹50' },
        { name: 'Missi Roti', price: '₹65' },
        { name: 'Garlic Naan', price: '₹55' },
        { name: 'Laccha Paratha', price: '₹55' },
        { name: 'Pudina Paratha', price: '₹55' },
        { name: 'Mirchi Paratha (Red / Green)', price: '₹55' },
        { name: 'Paneer Paratha', price: '₹125' },
        { name: 'Aloo Paratha', price: '₹95' },
        { name: 'Amritsari Kulcha', price: '₹140' },
        { name: 'Mutton Keema Naan', price: '₹170' },
        { name: 'Chicken Keema Naan', price: '₹160' },
        { name: 'Mutton Keema Naan with Gravy', price: '₹270' },
        { name: 'Chicken Keema Naan with Gravy', price: '₹260' },
      ],
    },
  ],

  extras: [
    {
      title: 'Sides & Extras',
      items: [
        { name: 'Mix Raita', price: '₹130' },
        { name: 'Plain Curd', price: '₹120' },
        { name: 'Pineapple Raita', price: '₹180' },
        { name: 'Boondi Raita', price: '₹130' },
        { name: 'Green Salad', price: '₹130' },
        { name: 'Roasted Papad', price: '₹60' },
        { name: 'Masala Papad', price: '₹70' },
        { name: 'Fried Papad', price: '₹80' },
      ],
    },
    {
      title: 'Drinks',
      items: [
        { name: 'Soft Drinks', price: '—' },
        { name: 'Water Bottle', price: '—' },
        { name: 'Fresh Lime', price: '₹120' },
        { name: 'Sweet / Salted Lassi', price: '₹120' },
      ],
    },
    {
      title: 'Desserts',
      items: [
        { name: 'Gulab Jamun', price: '₹150', highlight: true },
      ],
    },
  ],
};
