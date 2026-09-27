import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, Truck, BadgePercent, ArrowRight, ArrowLeft, Lock } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { formatPrice, localizeTitle, formatNumber } from '../lib/format';
import { isRTL } from '../lib/i18n';

const FREE_THRESHOLD = 500000;
const SHIPPING = 45000;

export default function CartDrawer() {
  const { t, lang, dir, cart, cartOpen, setCartOpen, updateQty, removeFromCart, subtotal, totalSavings, cartCount, setCheckoutOpen, user, setAuthOpen } = useStore();
  const rtl = isRTL(lang);
  const Arrow = rtl ? ArrowLeft : ArrowRight;
  const sidePos = dir === 'rtl' ? 'left-0' : 'right-0';
  const slideFrom = dir === 'rtl' ? '-100%' : '100%';
  const shipping = subtotal >= FREE_THRESHOLD || subtotal === 0 ? 0 : SHIPPING;
  const progress = Math.min(100, (subtotal / FREE_THRESHOLD) * 100);

  const goCheckout = () => {
    setCartOpen(false);
    if (!user) { setAuthOpen(true); return; }
    setCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] bg-black/55 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <motion.aside initial={{ x: slideFrom }} animate={{ x: 0 }} exit={{ x: slideFrom }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} className={'fixed top-0 bottom-0 ' + sidePos + ' z-[81] w-full max-w-md bg-white shadow-2xl flex flex-col'}>
            <div className="flex items-center gap-3 px-5 h-[72px] border-b border-slate-100 bg-[#082f49]">
              <span className="w-10 h-10 rounded-xl bg-[#0891b2] flex items-center justify-center text-white"><ShoppingBag size={18} /></span>
              <div className="flex-1">
                <h2 className="text-white font-black text-base">{t('cartTitle')}</h2>
                <p className="text-white/50 text-[11px]">{formatNumber(cartCount, lang)} {t('productsCount')}</p>
              </div>
              <button onClick={() => setCartOpen(false)} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"><X size={17} /></button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
                <span className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-4"><ShoppingBag size={30} className="text-slate-300" /></span>
                <h3 className="font-black text-slate-800 text-lg">{t('cartEmpty')}</h3>
                <p className="text-slate-400 text-[13px] mt-1.5 mb-6 leading-6">{t('cartEmptyDesc')}</p>
                <button onClick={() => { setCartOpen(false); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }); }} className="h-12 px-8 rounded-full bg-gradient-to-r from-[#0891b2] to-[#0e7490] text-white text-sm font-black shadow-lg">{t('startShopping')}</button>
              </div>
            ) : (
              <>
                <div className="px-5 py-3 bg-sky-50 border-b border-sky-100">
                  <p className="text-[11px] font-bold text-sky-800 flex items-center gap-1.5 mb-1.5">
                    <Truck size={13} />
                    {shipping === 0 ? t('freeDelivery') : formatPrice(FREE_THRESHOLD - subtotal, lang) + ' ' + t('leftForFree')}
                  </p>
                  <div className="h-1.5 rounded-full bg-sky-200/60 overflow-hidden">
                    <motion.div animate={{ width: progress + '%' }} className="h-full rounded-full bg-gradient-to-r from-[#0284c7] to-[#67e8f9]" />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5">
                  {cart.map(line => (
                    <motion.div key={line.key} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 bg-slate-50 hover:bg-cyan-50/50 border border-slate-100 rounded-2xl p-2.5 transition-colors">
                      <img src={line.product.image} alt="" className="w-[72px] h-[84px] rounded-xl object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-[#0891b2] uppercase">{line.product.brand}</p>
                        <h4 className="font-bold text-slate-800 text-[13px] leading-5 line-clamp-1">{localizeTitle(line.product, lang)}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] bg-white border border-slate-200 rounded-md px-1.5 py-0.5 font-bold text-slate-600">{line.size}</span>
                          <span className="w-4 h-4 rounded-full border border-slate-300" style={{ backgroundColor: line.color }} />
                        </div>
                        <div className="flex items-center justify-between mt-1.5">
                          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5">
                            <button onClick={() => updateQty(line.key, line.qty + 1)} className="w-6 h-6 rounded-md flex items-center justify-center text-slate-600 hover:bg-cyan-50 hover:text-[#0891b2]"><Plus size={12} /></button>
                            <span className="w-6 text-center text-xs font-black tabular-nums">{formatNumber(line.qty, lang)}</span>
                            <button onClick={() => updateQty(line.key, line.qty - 1)} className="w-6 h-6 rounded-md flex items-center justify-center text-slate-600 hover:bg-sky-50 hover:text-sky-500"><Minus size={12} /></button>
                          </div>
                          <span className="text-[13px] font-black text-[#0891b2]">{formatPrice(line.product.discount_price * line.qty, lang)}</span>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(line.key)} className="self-start w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-sky-500 hover:bg-sky-50 transition-colors"><Trash2 size={14} /></button>
                    </motion.div>
                  ))}
                </div>
                <div className="border-t border-slate-100 px-5 py-4 bg-white space-y-2">
                  <div className="flex justify-between text-[13px] text-slate-500">
                    <span>{t('subtotal')}</span>
                    <span className="font-bold text-slate-700">{formatPrice(subtotal, lang)}</span>
                  </div>
                  {totalSavings > 0 && (
                    <div className="flex justify-between text-[13px] text-cyan-600">
                      <span className="flex items-center gap-1"><BadgePercent size={13} /> {t('savings')}</span>
                      <span className="font-bold">-{formatPrice(totalSavings, lang)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[13px] text-slate-500">
                    <span>{t('shipping')}</span>
                    <span className={'font-bold ' + (shipping === 0 ? 'text-cyan-600' : 'text-slate-700')}>{shipping === 0 ? t('free') : formatPrice(shipping, lang)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-dashed border-slate-200">
                    <span className="font-black text-slate-800 text-sm">{t('total')}</span>
                    <span className="font-black text-[#082f49] text-lg">{formatPrice(subtotal + shipping, lang)}</span>
                  </div>
                  <button onClick={goCheckout} className="w-full flex items-center justify-center gap-2 h-[52px] rounded-2xl bg-gradient-to-r from-[#0891b2] to-[#0e7490] text-white text-sm font-black shadow-xl shadow-cyan-900/20 hover:scale-[1.01] transition-transform">
                    <Lock size={15} /> {t('checkout')} <Arrow size={16} />
                  </button>
                  <button onClick={() => setCartOpen(false)} className="w-full text-center text-xs font-bold text-slate-500 hover:text-[#0891b2] py-1">{t('continueShopping')}</button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
