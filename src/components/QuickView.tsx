import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Star, Minus, Plus, Truck, ShieldCheck, RotateCcw, Share2, Check } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { formatPrice, localizeTitle, localizeDesc, formatNumber } from '../lib/format';

export default function QuickView() {
  const { t, lang, quickView: p, setQuickView, addToCart, showToast, toggleWishlist, isWishlisted, setCartOpen } = useStore();
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => {
    if (p) {
      setSize(p.sizes?.[0] ?? '');
      setColor(p.colors?.[0] ?? '');
      setQty(1);
      setSizeError(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [p]);

  if (!p) return null;
  const wished = isWishlisted(p.id);

  const handleAdd = () => {
    if (!size && p.sizes?.length) { setSizeError(true); showToast(t('selectSize')); return; }
    addToCart(p, qty, size, color);
    showToast(t('addedToCart'));
    setQuickView(null);
    setCartOpen(true);
  };

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6" onClick={() => setQuickView(null)}>
        <motion.div initial={{ opacity: 0, scale: 0.94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 20 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl grid md:grid-cols-2">
          <button onClick={() => setQuickView(null)} className="absolute top-4 end-4 z-10 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center text-slate-600 hover:text-sky-500 transition-all">
            <X size={18} />
          </button>
          <div className="relative h-64 sm:h-80 md:h-full md:min-h-[520px] bg-slate-50">
            <img src={p.image} alt={localizeTitle(p, lang)} className="absolute inset-0 w-full h-full object-cover" />
            {p.discount_percent > 0 && (
              <span className="absolute top-4 start-4 bg-gradient-to-r from-sky-500 to-cyan-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg" dir="ltr">%{formatNumber(p.discount_percent, lang)} {t('off')}</span>
            )}
          </div>
          <div className="p-5 sm:p-7">
            <p className="text-[11px] font-black text-[#0891b2] uppercase tracking-[0.2em]">{p.brand}</p>
            <h2 className="text-xl sm:text-2xl font-black text-[#082f49] mt-1 leading-8">{localizeTitle(p, lang)}</h2>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} size={14} className={i <= Math.round(p.rating) ? 'text-[#0284c7]' : 'text-slate-200'} fill="currentColor" />
                ))}
              </span>
              <span className="text-xs font-bold text-slate-600">{p.rating}</span>
              <span className="text-xs text-slate-400">({formatNumber(p.reviews, lang)} {t('reviews')})</span>
              <span className="ms-auto text-[11px] text-slate-400">{t('sku')}: DJM-{p.id}024</span>
            </div>
            <div className="flex items-end gap-3 mt-4 pb-4 border-b border-slate-100">
              <span className="text-2xl sm:text-3xl font-black text-[#0891b2]">{formatPrice(p.discount_price, lang)}</span>
              {p.discount_percent > 0 && <span className="text-sm text-slate-400 line-through mb-1">{formatPrice(p.price, lang)}</span>}
            </div>
            <p className="text-slate-500 text-[13px] leading-6 mt-4 line-clamp-3">{localizeDesc(p, lang)}</p>
            {p.sizes && p.sizes.length > 0 && (
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[13px] font-black text-slate-800">{t('sizes')}</span>
                  <span className="text-[11px] text-[#0891b2] font-bold cursor-pointer">{t('sizeGuide')}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.sizes.map(s => (
                    <button key={s} onClick={() => { setSize(s); setSizeError(false); }} className={'min-w-[46px] h-10 px-3 rounded-xl text-[13px] font-bold border-2 transition-all ' + (size === s ? 'border-[#0891b2] bg-cyan-50 text-[#0891b2]' : sizeError ? 'border-sky-200 text-slate-600' : 'border-slate-200 text-slate-600 hover:border-slate-300')}>{s}</button>
                  ))}
                </div>
                {sizeError && <p className="text-sky-500 text-[11px] mt-1.5 font-bold">{t('selectSize')}</p>}
              </div>
            )}
            {p.colors && p.colors.length > 0 && (
              <div className="mt-4">
                <span className="text-[13px] font-black text-slate-800">{t('colors')}</span>
                <div className="flex gap-2.5 mt-2">
                  {p.colors.map(c => (
                    <button key={c} onClick={() => setColor(c)} className={'w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ' + (color === c ? 'border-[#082f49] scale-110' : 'border-slate-200')} style={{ backgroundColor: c }}>
                      {color === c && <Check size={14} className="text-white drop-shadow" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-2.5 mt-6">
              <div className="flex items-center gap-1 bg-slate-100 rounded-xl px-1.5 h-12">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-600 hover:text-[#0891b2]"><Minus size={14} /></button>
                <span className="w-8 text-center font-black text-slate-800 tabular-nums">{formatNumber(qty, lang)}</span>
                <button onClick={() => setQty(Math.min(p.stock, qty + 1))} className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-600 hover:text-[#0891b2]"><Plus size={14} /></button>
              </div>
              <button onClick={handleAdd} className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-gradient-to-r from-[#0891b2] to-[#0e7490] text-white text-sm font-black shadow-lg shadow-cyan-900/20 hover:scale-[1.02] transition-transform">
                <ShoppingBag size={17} /> {t('addToCart')}
              </button>
              <button onClick={() => { toggleWishlist(p); }} className={'w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all shrink-0 ' + (wished ? 'border-sky-200 bg-sky-50 text-sky-500' : 'border-slate-200 text-slate-400 hover:border-sky-200 hover:text-sky-500')}>
                <Heart size={18} fill={wished ? 'currentColor' : 'none'} />
              </button>
              <button className="hidden sm:flex w-12 h-12 rounded-xl border-2 border-slate-200 items-center justify-center text-slate-400 hover:text-[#0891b2] hover:border-cyan-200 transition-all shrink-0" title={t('share')}><Share2 size={18} /></button>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-5">
              {[
                { icon: Truck, label: t('fastDelivery') },
                { icon: ShieldCheck, label: t('securePayment') },
                { icon: RotateCcw, label: t('easyReturns') },
              ].map((m, i) => (
                <div key={i} className="flex flex-col items-center gap-1 bg-slate-50 rounded-xl py-2.5 px-1 text-center">
                  <m.icon size={16} className="text-[#0891b2]" />
                  <span className="text-[10px] font-bold text-slate-600">{m.label}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[11px] font-bold text-cyan-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              {t('inStock')} - {formatNumber(p.stock, lang)} {t('onlyLeft')}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
