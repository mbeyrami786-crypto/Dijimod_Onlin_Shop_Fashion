import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { formatPrice, localizeTitle, formatNumber } from '../lib/format';
import type { Product } from '../lib/format';

export default function ProductCard({ product: p, index }: { product: Product; index: number }) {
  const { t, lang, addToCart, showToast, toggleWishlist, isWishlisted, setQuickView } = useStore();
  const wished = isWishlisted(p.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(p, 1);
    showToast(t('addedToCart'));
  };

  const handleWish = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(p);
    showToast(wished ? t('removedFromWishlist') : t('addedToWishlist'));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: (index % 4) * 0.06 }} className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-100 hover:border-cyan-200 hover:shadow-2xl hover:shadow-cyan-900/10 transition-all duration-300 cursor-pointer" onClick={() => setQuickView(p)}>
      <div className="relative h-48 sm:h-72 overflow-hidden bg-slate-50">
        <img src={p.image} alt={localizeTitle(p, lang)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
        <div className="absolute top-2.5 start-2.5 flex flex-col gap-1.5">
          {p.discount_percent > 0 && (
            <span className="bg-gradient-to-r from-[#0891b2] to-[#0e7490] text-white text-[10px] sm:text-[11px] font-black px-2 py-1 rounded-lg shadow" dir="ltr">%{formatNumber(p.discount_percent, lang)}</span>
          )}
          {p.badge && (
            <span className="bg-[#0284c7] text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow">{p.badge}</span>
          )}
        </div>
        <button onClick={handleWish} className={'absolute top-2.5 end-2.5 w-8 h-8 rounded-full backdrop-blur flex items-center justify-center transition-all ' + (wished ? 'bg-sky-500 text-white' : 'bg-white/85 text-slate-500 hover:text-sky-500')}>
          <Heart size={15} fill={wished ? 'currentColor' : 'none'} />
        </button>
        <div className="absolute inset-x-2.5 bottom-2.5 hidden sm:flex gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button onClick={handleAdd} className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-xl bg-[#082f49]/90 backdrop-blur text-white text-[11px] sm:text-xs font-bold hover:bg-[#0891b2] transition-colors">
            <ShoppingBag size={14} /> {t('addToCart')}
          </button>
          <button onClick={(e) => { e.stopPropagation(); setQuickView(p); }} className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur flex items-center justify-center text-slate-700 hover:bg-[#0284c7] hover:text-white transition-colors">
            <Eye size={15} />
          </button>
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <p className="text-[9px] sm:text-[10px] font-bold text-[#0891b2] uppercase tracking-wider">{p.brand}</p>
        <h3 className="font-bold text-slate-800 text-xs sm:text-sm leading-5 sm:leading-6 line-clamp-1 mt-0.5">{localizeTitle(p, lang)}</h3>
        <div className="flex items-center gap-1 mt-1">
          <Star size={11} className="text-[#0284c7]" fill="currentColor" />
          <span className="text-[11px] font-bold text-slate-700">{p.rating}</span>
          <span className="text-[10px] text-slate-400">({formatNumber(p.reviews, lang)})</span>
          <span className="ms-auto flex gap-1">
            {(p.colors || []).slice(0, 3).map((c, i) => (
              <span key={i} className="w-3 h-3 rounded-full border border-slate-200" style={{ backgroundColor: c }} />
            ))}
          </span>
        </div>
        <div className="flex items-end justify-between mt-1.5 gap-1">
          <span className="text-[#0891b2] font-black text-sm sm:text-base">{formatPrice(p.discount_price, lang)}</span>
          {p.discount_percent > 0 && <span className="text-[10px] sm:text-xs text-slate-400 line-through">{formatPrice(p.price, lang)}</span>}
        </div>
        <button onClick={handleAdd} className="sm:hidden mt-2 w-full h-8 rounded-lg bg-cyan-50 text-[#0891b2] text-[11px] font-black">
          {t('addToCart')}
        </button>
      </div>
    </motion.div>
  );
}
