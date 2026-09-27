import type { Lang } from './i18n';

export interface Product {
  id: number;
  title_en: string;
  title_fa: string;
  title_ar: string;
  category: 'women' | 'men' | 'shoes' | 'accessories';
  price: number;
  discount_price: number;
  discount_percent: number;
  rating: number;
  reviews: number;
  is_amazing: boolean;
  sizes: string[];
  colors: string[];
  image: string;
  description_en: string;
  description_fa: string;
  description_ar: string;
  brand: string;
  stock: number;
  badge?: string | null;
}

export function formatPrice(price: number, lang: Lang): string {
  if (lang === 'fa') return `${Number(price).toLocaleString('fa-IR')} تومان`;
  if (lang === 'ar') return `${Number(price).toLocaleString('ar-EG')} تومان`;
  return `${Number(price).toLocaleString('en-US')} Toman`;
}

export function formatNumber(n: number, lang: Lang): string {
  if (lang === 'fa') return Number(n).toLocaleString('fa-IR');
  if (lang === 'ar') return Number(n).toLocaleString('ar-EG');
  return Number(n).toLocaleString('en-US');
}

export function localizeTitle(p: Product, lang: Lang): string {
  if (lang === 'fa') return p.title_fa;
  if (lang === 'ar') return p.title_ar;
  return p.title_en;
}

export function localizeDesc(p: Product, lang: Lang): string {
  if (lang === 'fa') return p.description_fa;
  if (lang === 'ar') return p.description_ar;
  return p.description_en;
}

export function timeLeftToMidnight(): { h: number; m: number; s: number } {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(23, 59, 59, 999);
  const diff = Math.max(0, midnight.getTime() - now.getTime());
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { h, m, s };
}

export function pad(n: number): string {
  return String(n).padStart(2, '0');
}
