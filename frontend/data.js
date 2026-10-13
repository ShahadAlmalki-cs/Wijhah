// Local vendor/menu data for Wijhah | وجهة.
// These are the real Taif University campus vendors, all located in Building 16
// (the restaurant / pickup hub). This file is the offline fallback; the same data
// is served by the backend at GET /api/vendors.
const campusVendors = [
  {
    id: 'fandeer-coffee',
    name: { en: 'Fandeer Coffee', ar: 'فندير كافيه' },
    category: { en: 'Coffee & Breakfast', ar: 'قهوة وفطور' },
    building: 16,
    eta: 10,
    accent: 'gold',
    menu: [
      { id: 'flat-white', name: { en: 'Flat white', ar: 'فلات وايت' }, description: { en: 'Double espresso with silky milk', ar: 'إسبريسو مزدوج مع حليب مخملي' }, price: 14 },
      { id: 'v60', name: { en: 'V60 pour over', ar: 'V60 مقطّر' }, description: { en: 'Hand-brewed single origin filter', ar: 'قهوة مقطرة يدوياً من أصل واحد' }, price: 18 },
      { id: 'cheese-croissant', name: { en: 'Cheese croissant', ar: 'كرواسون بالجبن' }, description: { en: 'Butter croissant baked with cheese', ar: 'كرواسون بالزبدة مخبوز مع الجبن' }, price: 13 },
      { id: 'breakfast-wrap', name: { en: 'Breakfast wrap', ar: 'راب الفطور' }, description: { en: 'Egg, cheese and turkey in a warm wrap', ar: 'بيض وجبن وديك رومي في خبز راب' }, price: 19 }
    ]
  },
  {
    id: 'starbucks',
    name: { en: 'Starbucks', ar: 'ستاربكس' },
    category: { en: 'Coffee & Drinks', ar: 'قهوة ومشروبات' },
    building: 16,
    eta: 12,
    accent: 'mint',
    menu: [
      { id: 'caramel-macchiato', name: { en: 'Caramel macchiato', ar: 'كراميل ماكياتو' }, description: { en: 'Espresso, milk and caramel drizzle', ar: 'إسبريسو وحليب مع كراميل' }, price: 19 },
      { id: 'iced-latte', name: { en: 'Iced latte', ar: 'لاتيه مثلج' }, description: { en: 'Chilled espresso with milk over ice', ar: 'إسبريسو بارد مع حليب وثلج' }, price: 16 },
      { id: 'cold-brew', name: { en: 'Cold brew', ar: 'كولد برو' }, description: { en: 'Slow-steeped cold coffee', ar: 'قهوة باردة منقوعة ببطء' }, price: 17 },
      { id: 'croissant', name: { en: 'Butter croissant', ar: 'كرواسون بالزبدة' }, description: { en: 'Freshly baked flaky croissant', ar: 'كرواسون طازج مقرمش' }, price: 11 }
    ]
  },
  {
    id: 'dr-dotri',
    name: { en: 'Dr. Dotri', ar: 'د.دوتري' },
    category: { en: 'Desserts & Bakeries', ar: 'حلويات ومخبوزات' },
    building: 16,
    eta: 14,
    accent: 'coral',
    menu: [
      { id: 'cheesecake', name: { en: 'Mini cheesecake', ar: 'تشيزكيك صغير' }, description: { en: 'Creamy cheesecake with berry sauce', ar: 'تشيزكيك كريمي مع صلصة التوت' }, price: 18 },
      { id: 'chocolate-cake', name: { en: 'Chocolate fudge cake', ar: 'كيكة الشوكولاتة' }, description: { en: 'Rich chocolate slice', ar: 'قطعة كيك شوكولاتة غنية' }, price: 20 },
      { id: 'cookie', name: { en: 'Chocolate chip cookie', ar: 'كوكيز الشوكولاتة' }, description: { en: 'Soft-baked cookie with chocolate chips', ar: 'كوكيز طري مع رقائق الشوكولاتة' }, price: 9 },
      { id: 'cinnamon-roll', name: { en: 'Cinnamon roll', ar: 'سينامون رول' }, description: { en: 'Baked roll with cinnamon glaze', ar: 'لفافة مخبوزة مع صلصة القرفة' }, price: 15 }
    ]
  },
  {
    id: 'fresh-shop',
    name: { en: 'Fresh Shop', ar: 'فريش شوب' },
    category: { en: 'Sandwiches & Quick bites', ar: 'ساندويتشات ووجبات سريعة' },
    building: 16,
    eta: 15,
    accent: 'blue',
    menu: [
      { id: 'chicken-sandwich', name: { en: 'Grilled chicken sandwich', ar: 'ساندويتش دجاج مشوي' }, description: { en: 'Grilled chicken, lettuce and sauce', ar: 'دجاج مشوي مع خس وصلصة' }, price: 22 },
      { id: 'turkey-sandwich', name: { en: 'Turkey & cheese sandwich', ar: 'ساندويتش ديك رومي بالجبن' }, description: { en: 'Turkey, cheese and fresh greens', ar: 'ديك رومي وجبن وخضار طازجة' }, price: 20 },
      { id: 'fries', name: { en: 'Seasoned fries', ar: 'بطاطس متبلة' }, description: { en: 'Crispy fries with house seasoning', ar: 'بطاطس مقرمشة بتتبيلة خاصة' }, price: 10 },
      { id: 'veggie-wrap', name: { en: 'Veggie wrap', ar: 'راب نباتي' }, description: { en: 'Seasonal vegetables in a soft wrap', ar: 'خضار موسمية في خبز راب' }, price: 17 }
    ]
  },
  {
    id: 'judy',
    name: { en: 'Judy', ar: 'جودي' },
    category: { en: 'Meals & Snacks', ar: 'وجبات ومسحبات' },
    building: 16,
    eta: 16,
    accent: 'gold',
    menu: [
      { id: 'chicken-bowl', name: { en: 'Chicken rice bowl', ar: 'وعاء دجاج باللحم' }, description: { en: 'Rice with grilled chicken and sides', ar: 'أرز مع دجاج مشوي وإضافات' }, price: 26 },
      { id: 'shawarma', name: { en: 'Chicken shawarma', ar: 'شاورما دجاج' }, description: { en: 'Wrapped shawarma with garlic sauce', ar: 'شاورما مع صوص الثوم' }, price: 16 },
      { id: 'samosa', name: { en: 'Samosa (3 pcs)', ar: 'سمبوسة (٣ حبات)' }, description: { en: 'Crispy savory pastries', ar: 'معجنات مقرمشة محشوة' }, price: 8 },
      { id: 'salad', name: { en: 'Garden salad', ar: 'سلطة الخضار' }, description: { en: 'Fresh salad with a light dressing', ar: 'سلطة طازجة بصلصة خفيفة' }, price: 14 }
    ]
  },
  {
    id: 'karaz-al-bunn',
    name: { en: 'Karaz Al-Bunn', ar: 'كرز البن' },
    category: { en: 'Specialty Coffee', ar: 'قهوة مختصة' },
    building: 16,
    eta: 11,
    accent: 'mint',
    menu: [
      { id: 'spanish-latte', name: { en: 'Spanish latte', ar: 'سبانيش لاتيه' }, description: { en: 'Espresso with sweet condensed milk', ar: 'إسبريسو مع حليب مكثف محلى' }, price: 17 },
      { id: 'turkish-coffee', name: { en: 'Turkish coffee', ar: 'قهوة تركية' }, description: { en: 'Traditional finely ground coffee', ar: 'قهوة تركية مطحونة ناعماً' }, price: 12 },
      { id: 'cortado', name: { en: 'Cortado', ar: 'كورتادو' }, description: { en: 'Equal parts espresso and steamed milk', ar: 'إسبريسو وحليب مبخر بالتساوي' }, price: 13 },
      { id: 'americano', name: { en: 'Americano', ar: 'أمريكانو' }, description: { en: 'Espresso with hot water', ar: 'إسبريسو مع ماء ساخن' }, price: 11 }
    ]
  }
];
