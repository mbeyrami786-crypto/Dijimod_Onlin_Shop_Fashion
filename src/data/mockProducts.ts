import type { Product } from '../lib/format';

const images = {
  women: [
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=90',
  ],
  men: [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=1200&q=90',
  ],
  shoes: [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=90',
  ],
  accessories: [
    'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=90',
  ],
} as const;

const makeProduct = (
  id: number,
  category: Product['category'],
  titleEn: string,
  titleFa: string,
  brand: string,
  price: number,
  discountPrice: number,
  image: string,
  isAmazing = false,
): Product => ({
  id,
  title_en: titleEn,
  title_fa: titleFa,
  title_ar: titleEn,
  category,
  price,
  discount_price: discountPrice,
  discount_percent: Math.round((1 - discountPrice / price) * 100),
  rating: 4.6,
  reviews: 48 + id * 7,
  is_amazing: isAmazing,
  sizes: category === 'shoes' ? ['40', '41', '42', '43', '44'] : ['S', 'M', 'L', 'XL'],
  colors: ['#0ea5e9', '#111827', '#f8fafc'],
  image,
  description_en: 'Premium fashion item with a studio-quality presentation.',
  description_fa: 'محصولی باکیفیت با طراحی مدرن و ارائه آتلیه‌ای.',
  description_ar: 'منتج أزياء فاخر بتصميم عصري.',
  brand,
  stock: 12 + id,
  badge: isAmazing ? 'فوق‌العاده' : null,
});

export const MOCK_PRODUCTS: Product[] = [
  makeProduct(101, 'women', 'Sky Blue Satin Dress', 'پیراهن ساتن آبی آسمانی', 'Dijimod', 4800000, 3990000, images.women[0], true),
  makeProduct(102, 'women', 'Cyan Evening Blazer', 'بلیزر مجلسی فیروزه‌ای', 'Lumiere', 6200000, 5190000, images.women[1]),
  makeProduct(103, 'women', 'Minimal Linen Set', 'ست لینن مینیمال', 'Dijimod', 3900000, 3290000, images.women[2]),
  makeProduct(104, 'men', 'Modern Blue Jacket', 'کت مدرن آبی', 'Northline', 7100000, 5990000, images.men[0], true),
  makeProduct(105, 'men', 'Premium Casual Look', 'استایل کژوال پریمیوم', 'Dijimod', 5300000, 4490000, images.men[1]),
  makeProduct(106, 'men', 'Classic Tailored Shirt', 'پیراهن کلاسیک دوخت‌دار', 'Monarch', 2800000, 2390000, images.men[2]),
  makeProduct(107, 'shoes', 'Air Blue Sneakers', 'کتانی آبی آسمانی', 'Aero', 4600000, 3890000, images.shoes[0], true),
  makeProduct(108, 'shoes', 'Cyan Leather Sneakers', 'کتانی چرمی فیروزه‌ای', 'Urban Step', 5200000, 4390000, images.shoes[1]),
  makeProduct(109, 'shoes', 'Minimal White Runner', 'کتانی مینیمال سفید', 'Dijimod', 4100000, 3490000, images.shoes[2]),
  makeProduct(110, 'accessories', 'Sky Blue Chronograph', 'ساعت کرونوگراف آبی', 'Aster', 8900000, 7590000, images.accessories[0], true),
  makeProduct(111, 'accessories', 'Cyan Leather Bag', 'کیف چرمی فیروزه‌ای', 'Lumiere', 6800000, 5790000, images.accessories[1]),
  makeProduct(112, 'accessories', 'Premium Travel Bag', 'کیف مسافرتی پریمیوم', 'Dijimod', 5900000, 4990000, images.accessories[2]),
];
