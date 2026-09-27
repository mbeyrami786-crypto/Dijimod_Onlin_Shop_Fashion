import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, CreditCard, Banknote, CheckCircle2, Truck } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { formatPrice, localizeTitle, formatNumber } from '../lib/format';

const SHIPPING = 45000;
const FREE_THRESHOLD = 500000;

export default function CheckoutModal() {
  const { t, lang, checkoutOpen, setCheckoutOpen, cart, subtotal, clearCart, user } = useStore();
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [method, setMethod] = useState<'online' | 'cod'>('online');
  const [done, setDone] = useState(false);
  const [orderNo, setOrderNo] = useState('');
  const [err, setErr] = useState('');

  const shipping = subtotal >= FREE_THRESHOLD ? 0 : SHIPPING;
  const total = subtotal + shipping;

  const place = () => {
    setErr('');
    if (city.trim().length < 2 || address.trim().length < 8 || phone.trim().length < 7) {
      setErr('!');
      return;
    }
    setOrderNo('DJM-' + Math.floor(100000 + Math.random() * 900000));
    setDone(true);
    clearCart();
  };

  const close = () => {
    setCheckoutOpen(false);
    setTimeout(() => { setDone(false); setCity(''); setAddress(''); setPhone(''); }, 400);
  };

  return (
    <AnimatePresence>
      {checkoutOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6" onClick={close}>
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 16 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl">
            {!done ? (
              <>
                <div className="flex items-center gap-3 px-6 h-[68px] border-b border-slate-100 sticky top-0 bg-white rounded-t-3xl z-10">
                  <h2 className="flex-1 font-black text-[#082f49]">{t('checkoutTitle')}</h2>
                  <button onClick={close} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-sky-500"><X size={16} /></button>
                </div>
                <div className="p-6 space-y-5">
                  <div className="bg-slate-50 rounded-2xl p-3 space-y-2 max-h-44 overflow-y-auto">
                    {cart.map(l => (
                      <div key={l.key} className="flex items-center gap-2.5">
                        <img src={l.product.image} alt="" className="w-10 h-12 rounded-lg object-cover" />
                        <span className="flex-1 text-xs font-bold text-slate-700 line-clamp-1">{localizeTitle(l.product, lang)} <span className="text-slate-400">x {formatNumber(l.qty, lang)}</span></span>
                        <span className="text-xs font-black text-[#0891b2]">{formatPrice(l.product.discount_price * l.qty, lang)}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="text-[13px] font-black text-slate-800 flex items-center gap-1.5 mb-2.5"><MapPin size={15} className="text-[#0891b2]" /> {t('shippingInfo')}</h3>
                    <div className="space-y-2.5">
                      <div className="grid grid-cols-2 gap-2.5">
                        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder={t('city')} className="h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-[13px] outline-none focus:border-[#0891b2]" />
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t('phone')} className="h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-[13px] outline-none focus:border-[#0891b2]" />
                      </div>
                      <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder={t('address')} rows={2} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-[13px] outline-none focus:border-[#0891b2] resize-none" />
                      {user && <p className="text-[11px] text-slate-400">{user.name} - {user.email}</p>}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[13px] font-black text-slate-800 flex items-center gap-1.5 mb-2.5"><CreditCard size={15} className="text-[#0891b2]" /> {t('paymentMethod')}</h3>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button onClick={() => setMethod('online')} className={'flex items-center gap-2 h-12 px-4 rounded-xl border-2 text-[13px] font-bold transition-all ' + (method === 'online' ? 'border-[#0891b2] bg-cyan-50 text-[#0891b2]' : 'border-slate-200 text-slate-500')}>
                        <CreditCard size={17} /> {t('onlinePayment')}
                      </button>
                      <button onClick={() => setMethod('cod')} className={'flex items-center gap-2 h-12 px-4 rounded-xl border-2 text-[13px] font-bold transition-all ' + (method === 'cod' ? 'border-[#0284c7] bg-sky-50 text-[#0369a1]' : 'border-slate-200 text-slate-500')}>
                        <Banknote size={17} /> {t('cashOnDelivery')}
                      </button>
                    </div>
                  </div>
                  {err && <p className="text-sky-500 text-xs font-bold">{err}</p>}
                  <div className="bg-[#082f49] rounded-2xl p-4 space-y-1.5">
                    <div className="flex justify-between text-xs text-white/60"><span>{t('subtotal')}</span><span>{formatPrice(subtotal, lang)}</span></div>
                    <div className="flex justify-between text-xs text-white/60"><span>{t('shipping')}</span><span>{shipping === 0 ? t('free') : formatPrice(shipping, lang)}</span></div>
                    <div className="flex justify-between text-white font-black pt-1.5 border-t border-white/10"><span>{t('total')}</span><span className="text-[#67e8f9]">{formatPrice(total, lang)}</span></div>
                  </div>
                  <button onClick={place} className="w-full h-[52px] rounded-2xl bg-gradient-to-r from-[#0891b2] to-[#0e7490] text-white text-sm font-black shadow-xl flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform">
                    <Truck size={17} /> {t('placeOrder')}
                  </button>
                </div>
              </>
            ) : (
              <div className="p-8 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 12 }} className="inline-flex w-20 h-20 rounded-full bg-cyan-100 items-center justify-center mb-4">
                  <CheckCircle2 size={40} className="text-[#0891b2]" />
                </motion.div>
                <h2 className="font-black text-[#082f49] text-xl">{t('orderSuccess')}</h2>
                <p className="text-slate-500 text-[13px] leading-6 mt-2 mb-4">{t('orderSuccessDesc')}</p>
                <div className="inline-block bg-slate-50 border border-dashed border-slate-300 rounded-2xl px-6 py-3 mb-6">
                  <p className="text-[11px] text-slate-400">{t('orderNumber')}</p>
                  <p className="font-black text-[#082f49] text-lg tracking-wider" dir="ltr">{orderNo}</p>
                </div>
                <br />
                <button onClick={close} className="h-12 px-8 rounded-full bg-[#082f49] text-white text-sm font-black">{t('backToHome')}</button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
