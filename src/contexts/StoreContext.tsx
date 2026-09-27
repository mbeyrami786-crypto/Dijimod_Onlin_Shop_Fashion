import { createContext, useContext, useState, useEffect, useMemo, useCallback, type ReactNode } from 'react';
import { type Lang, getTranslator, isRTL } from '../lib/i18n';
import type { Product } from '../lib/format';
import { MOCK_PRODUCTS } from '../data/mockProducts';

export interface CartLine {
  key: string;
  product: Product;
  qty: number;
  size: string;
  color: string;
}

interface StoreValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  dir: 'rtl' | 'ltr';
  t: (key: string) => string;
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  cart: CartLine[];
  addToCart: (p: Product, qty?: number, size?: string, color?: string) => void;
  updateQty: (key: string, qty: number) => void;
  removeFromCart: (key: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  totalSavings: number;
  wishlist: Product[];
  toggleWishlist: (p: Product) => void;
  isWishlisted: (id: number) => boolean;
  searchQuery: string;
  setSearchQuery: (s: string) => void;
  category: string;
  setCategory: (c: string) => void;
  cartOpen: boolean;
  setCartOpen: (b: boolean) => void;
  wishlistOpen: boolean;
  setWishlistOpen: (b: boolean) => void;
  authOpen: boolean;
  setAuthOpen: (b: boolean) => void;
  checkoutOpen: boolean;
  setCheckoutOpen: (b: boolean) => void;
  quickView: Product | null;
  setQuickView: (p: Product | null) => void;
  user: { name: string; email: string } | null;
  setUser: (u: { name: string; email: string } | null) => void;
  toast: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreValue | null>(null);


const STUDIO_PRODUCT_IMAGES: Record<string, string[]> = {
  women: [
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1200&q=90',
  ],
  men: [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1529375130-48f3e7d6d6d2?auto=format&fit=crop&w=1200&q=90',
  ],
  shoes: [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=90',
  ],
  accessories: [
    'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=90',
  ],
};

const STUDIO_FALLBACK_IMAGES = [
  ...STUDIO_PRODUCT_IMAGES.women,
  ...STUDIO_PRODUCT_IMAGES.men,
  ...STUDIO_PRODUCT_IMAGES.shoes,
  ...STUDIO_PRODUCT_IMAGES.accessories,
];

function applyStudioImages(items: Product[]): Product[] {
  const categoryIndexes: Record<string, number> = {};
  return items.map((product, index) => {
    const key = String(product.category || '').toLowerCase();
    const images = STUDIO_PRODUCT_IMAGES[key] || STUDIO_FALLBACK_IMAGES;
    const imageIndex = categoryIndexes[key] ?? 0;
    categoryIndexes[key] = imageIndex + 1;
    return {
      ...product,
      image: images[imageIndex % images.length] || STUDIO_FALLBACK_IMAGES[index % STUDIO_FALLBACK_IMAGES.length],
    };
  });
}

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch { return fallback; }
}

function save(key: string, val: unknown) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* noop */ }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => load<Lang>('dijimod-lang', 'fa'));
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<CartLine[]>(() => load('dijimod-cart', []));
  const [wishlist, setWishlist] = useState<Product[]>(() => load('dijimod-wishlist', []));
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [user, setUserState] = useState<{ name: string; email: string } | null>(() => load('dijimod-user', null));
  const [toast, setToast] = useState<string | null>(null);

  const t = useMemo(() => getTranslator(lang), [lang]);
  const dir = isRTL(lang) ? 'rtl' : 'ltr';

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    save('dijimod-lang', l);
  }, []);

  const setUser = useCallback((u: { name: string; email: string } | null) => {
    setUserState(u);
    save('dijimod-user', u);
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2200);
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/products', { headers: { Accept: 'application/json' } });
      const contentType = res.headers.get('content-type') || '';

      // Vite serves the Vercel function source as text during local development.
      // In that case the browser receives `import ...` instead of JSON. Use the
      // local catalog so the storefront remains usable on localhost.
      if (!res.ok || !contentType.includes('application/json')) {
        setProducts(applyStudioImages(MOCK_PRODUCTS));
        setError(null);
        return;
      }

      const data: unknown = await res.json();
      if (!Array.isArray(data)) throw new Error('Invalid products response');
      setProducts(applyStudioImages(data as Product[]));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);
  useEffect(() => { save('dijimod-cart', cart); }, [cart]);
  useEffect(() => { save('dijimod-wishlist', wishlist); }, [wishlist]);

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [dir, lang]);

  const addToCart = useCallback((p: Product, qty = 1, size?: string, color?: string) => {
    const s = size || (p.sizes?.[0] ?? 'M');
    const c = color || (p.colors?.[0] ?? '#000000');
    const key = `${p.id}-${s}-${c}`;
    setCart(prev => {
      const found = prev.find(l => l.key === key);
      if (found) return prev.map(l => l.key === key ? { ...l, qty: Math.min(l.qty + qty, p.stock || 99) } : l);
      return [...prev, { key, product: p, qty, size: s, color: c }];
    });
  }, []);

  const updateQty = useCallback((key: string, qty: number) => {
    setCart(prev => qty <= 0 ? prev.filter(l => l.key !== key) : prev.map(l => l.key === key ? { ...l, qty: Math.min(qty, l.product.stock || 99) } : l));
  }, []);

  const removeFromCart = useCallback((key: string) => {
    setCart(prev => prev.filter(l => l.key !== key));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((p: Product) => {
    setWishlist(prev => prev.some(x => x.id === p.id) ? prev.filter(x => x.id !== p.id) : [...prev, p]);
  }, []);

  const isWishlisted = useCallback((id: number) => wishlist.some(x => x.id === id), [wishlist]);

  const cartCount = useMemo(() => cart.reduce((a, l) => a + l.qty, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((a, l) => a + l.product.discount_price * l.qty, 0), [cart]);
  const totalSavings = useMemo(() => cart.reduce((a, l) => a + (l.product.price - l.product.discount_price) * l.qty, 0), [cart]);

  const value: StoreValue = {
    lang, setLang, dir, t, products, loading, error, refetch: fetchProducts,
    cart, addToCart, updateQty, removeFromCart, clearCart, cartCount, subtotal, totalSavings,
    wishlist, toggleWishlist, isWishlisted,
    searchQuery, setSearchQuery, category, setCategory,
    cartOpen, setCartOpen, wishlistOpen, setWishlistOpen, authOpen, setAuthOpen,
    checkoutOpen, setCheckoutOpen, quickView, setQuickView,
    user, setUser, toast, showToast,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
