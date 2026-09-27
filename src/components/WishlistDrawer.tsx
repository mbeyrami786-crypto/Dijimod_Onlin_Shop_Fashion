import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { formatPrice, localizeTitle } from '../lib/format';

export default function WishlistDrawer() {
  const { t, lang, dir, wishlist, wishlistOpen, setWishlistOpen, toggleWishlist, addToCart, showToast, setCartOpen } = useStore();
  const sidePos = dir === 'rtl' ? 'left-0' : 'right-0';
  const slideFrom = dir === 'rtl' ? '-100%' : '100%';

  const moveToCart = (id: number) => {
    const p = wishlist.find(x => x.id === id);
    if (!p) return;
    addToCart(p, 1);
    toggleWishlist(p);
    showToast(t('addedToCart'));
    setWishlistOpen(false);
    setCartOpen(true);
  };

  return (
    <AnimatePresence>
      {wishlistOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] bg-black/55 backdrop-blur-sm" onClick={() => setWishlistOpen(false)} />
          <motion.aside initial={{ x: slideFrom }} animate={{ x: 0 }} exit={{ x: slideFrom }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} className={'fixed top-0 bottom-0 ' + sidePos + ' z-[81] w-full max-w-md bg-white shadow-2xl flex flex-col'}>
            <div className="flex items-center gap-3 px-5 h-[72px] border-b border-slate-100 bg-[#082f49]">
              <span className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center text-white"><Heart size={18} fill="currentColor" /></span>
              <h2 className="flex-1 text-white font-black text-base">{t('wishlistTitle')}</h2>
              <button onClick={() => setWishlistOpen(false)} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"><X size={17} /></button>
            </div>
            {wishlist.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
                <span className="w-20 h-20 rounded-full bg-sky-50 flex items-center justify-center mb-4"><Heart size={30} className="text-sky-200" /></span>
                <h3 className="font-black text-slate-800">{t('wishlistEmpty')}</h3>
                <button onClick={() => { setWishlistOpen(false); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }); }} className="mt-5 h-12 px-8 rounded-full bg-[#082f49] text-white text-sm font-black">{t('startShopping')}</button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5">
                {wishlist.map(p => (
                  <div key={p.id} className="flex gap-3 bg-slate-50 border border-slate-100 rounded-2xl p-2.5">
                    <img src={p.image} alt="" className="w-[72px] h-[84px] rounded-xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold text-[#0891b2] uppercase">{p.brand}</p>
                      <h4 className="font-bold text-slate-800 text-[13px] line-clamp-1">{localizeTitle(p, lang)}</h4>
                      <p className="text-[13px] font-black text-[#0891b2] mt-1">{formatPrice(p.discount_price, lang)}</p>
                      <button onClick={() => moveToCart(p.id)} className="mt-1.5 flex items-center gap-1.5 h-8 px-3 rounded-lg bg-[#082f49] text-white text-[11px] font-bold hover:bg-[#0891b2] transition-colors">
                        <ShoppingBag size={13} /> {t('moveToCart')}
                      </button>
                    </div>
                    <button onClick={() => toggleWishlist(p)} className="self-start w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-sky-500 hover:bg-sky-50"><Trash2 size={14} /></button>
                  </div>
                ))}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
