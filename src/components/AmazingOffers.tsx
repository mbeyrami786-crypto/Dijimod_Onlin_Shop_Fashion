import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, ShoppingBag, Eye, Star, Flame } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { formatPrice, localizeTitle, timeLeftToMidnight, pad, formatNumber, type Product } from '../lib/format';

export default function AmazingOffers() {
  const { t, lang, products, loading, addToCart, showToast, setQuickView } = useStore();
  const [time, setTime] = useState(timeLeftToMidnight());

  useEffect(() => {
    const id = window.setInterval(() => setTime(timeLeftToMidnight()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const amazing = products.filter(p => p.is_amazing).slice(0, 10);

  const handleAdd = (p: Product) => {
    addToCart(p, 1);
    showToast(t('addedToCart'));
  };

  if (!loading && amazing.length === 0) return null;

  return (
    <section id="amazing" className="relative py-12 sm:py-16 bg-gradient-to-b from-[#082f49] via-[#0c4a6e] to-slate-50 overflow-hidden">
      <div className="absolute top-0 start-1/4 w-96 h-96 bg-[#0891b2]/15 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 end-0 w-96 h-96 bg-sky-600/10 blur-[120px] rounded-full" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center gap-5 mb-8">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-sky-900/40">
              <Zap size={22} className="text-white" fill="currentColor" />
            </span>
            <div>
              <h2 className="text-white font-black text-xl sm:text-2xl flex items-center gap-2">
                {t('amazingOffers')}
                <Flame size={20} className="text-cyan-400" />
              </h2>
              <p className="text-white/50 text-xs sm:text-sm mt-0.5">{t('amazingSubtitle')}</p>
            </div>
          </div>
          <div className="md:ms-auto flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 backdrop-blur">
            <span className="text-white/60 text-xs font-semibold hidden sm:block">{t('endsIn')}</span>
            <div className="flex items-center gap-1.5" dir="ltr">
              {[
                { v: pad(time.h), l: t('hours') },
                { v: pad(time.m), l: t('minutes') },
                { v: pad(time.s), l: t('seconds') },
              ].map((u, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className="text-center">
                    <div className="min-w-[46px] h-11 rounded-xl bg-gradient-to-b from-[#0891b2] to-[#155e75] flex items-center justify-center text-white font-black text-lg tabular-nums shadow-lg">{u.v}</div>
                    <div className="text-white/40 text-[9px] mt-1">{u.l}</div>
                  </div>
                  {i < 2 && <span className="text-[#0284c7] font-black text-lg -mt-4">:</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3, 4].map(i => <div key={i} className="min-w-[260px] h-[380px] rounded-3xl bg-white/5 animate-pulse" />)}
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth amazing-scroll">
            {amazing.map((p, idx) => {
              const sold = Math.min(92, 45 + ((p.id * 13) % 45));
              return (
                <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }} className="group min-w-[250px] sm:min-w-[270px] max-w-[270px] snap-start bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-56 overflow-hidden">
                    <img src={p.image} alt={localizeTitle(p, lang)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                    <span className="absolute top-3 start-3 bg-gradient-to-r from-sky-500 to-cyan-500 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-lg" dir="ltr">%{formatNumber(p.discount_percent, lang)} {t('off')}</span>
                    <span className="absolute top-3 end-3 bg-[#082f49]/80 backdrop-blur text-[#67e8f9] text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Zap size={10} fill="currentColor" /> {t('hotDeal')}
                    </span>
                    <button onClick={() => setQuickView(p)} className="absolute bottom-3 end-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#0891b2] hover:text-white">
                      <Eye size={16} />
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] font-bold text-[#0891b2] uppercase tracking-wider mb-1">{p.brand}</p>
                    <h3 className="font-bold text-slate-800 text-sm leading-6 line-clamp-1 mb-1.5">{localizeTitle(p, lang)}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star size={13} className="text-[#0284c7]" fill="currentColor" />
                      <span className="text-xs font-bold text-slate-700">{p.rating}</span>
                      <span className="text-[11px] text-slate-400">({formatNumber(p.reviews, lang)} {t('reviews')})</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[13px] text-slate-400 line-through">{formatPrice(p.price, lang)}</span>
                    </div>
                    <div className="text-[#0891b2] font-black text-lg mb-2.5">{formatPrice(p.discount_price, lang)}</div>
                    <div className="mb-3">
                      <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-500" style={{ width: sold + '%' }} />
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">%{formatNumber(sold, lang)} {t('soldPercent')} - {formatNumber(p.stock, lang)} {t('onlyLeft')}</p>
                    </div>
                    <button onClick={() => handleAdd(p)} className="w-full flex items-center justify-center gap-2 h-10 rounded-xl bg-[#082f49] hover:bg-[#0891b2] text-white text-[13px] font-bold transition-colors">
                      <ShoppingBag size={15} /> {t('addToCart')}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
