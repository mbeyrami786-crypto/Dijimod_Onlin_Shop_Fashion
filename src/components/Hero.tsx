import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Sparkles, Truck, ShieldCheck, BadgePercent, Star } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { isRTL } from '../lib/i18n';

export default function Hero() {
  const { t, lang } = useStore();
  const rtl = isRTL(lang);
  const Arrow = rtl ? ArrowLeft : ArrowRight;

  return (
    <section className="relative overflow-hidden bg-[#082f49]">
      <div className="absolute -top-32 -start-32 w-[420px] h-[420px] rounded-full bg-[#0891b2]/25 blur-[120px]" />
      <div className="absolute -bottom-40 -end-20 w-[480px] h-[480px] rounded-full bg-[#0284c7]/15 blur-[140px]" />
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '28px 28px' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 grid lg:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-[#0284c7]/40 rounded-full px-4 py-1.5 text-xs font-bold text-[#67e8f9] mb-5">
            <Sparkles size={14} />
            {t('heroBadge')}
          </div>
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white leading-[1.15] mb-4">
            {t('heroTitle1')}
            <br />
            <span className="bg-gradient-to-r from-[#22d3ee] via-[#0284c7] to-[#67e8f9] bg-clip-text text-transparent">{t('heroTitle2')}</span>
          </h1>
          <p className="text-white/60 text-sm sm:text-base leading-7 max-w-lg mb-7">{t('heroSubtitle')}</p>
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <button onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })} className="group flex items-center gap-2 h-12 px-7 rounded-full bg-gradient-to-r from-[#0891b2] to-[#0e7490] text-white text-sm font-bold shadow-xl shadow-cyan-950 hover:scale-[1.03] transition-transform">
              {t('heroCta1')}
              <Arrow size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => document.getElementById('amazing')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-2 h-12 px-7 rounded-full border border-[#0284c7]/60 text-[#67e8f9] text-sm font-bold hover:bg-[#0284c7]/10 transition-colors">
              <BadgePercent size={16} />
              {t('heroCta2')}
            </button>
          </div>
          <div className="flex items-center gap-6 sm:gap-10">
            {[
              { n: '24K+', l: t('statProducts') },
              { n: '180K+', l: t('statCustomers') },
              { n: '4.9', l: t('statRating'), star: true },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="flex items-center justify-center gap-1 text-white font-black text-xl sm:text-2xl">
                  {s.n}
                  {'star' in s && s.star ? <Star size={16} className="text-[#0284c7]" fill="currentColor" /> : null}
                </div>
                <div className="text-white/45 text-[11px] sm:text-xs mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }} className="relative hidden md:block">
          <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
            <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=90" alt="hero" className="w-full h-[440px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#082f49]/80 via-transparent to-transparent" />
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute top-5 start-5 bg-white/95 backdrop-blur rounded-2xl px-4 py-2.5 shadow-xl flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center"><BadgePercent size={16} className="text-sky-600" /></span>
              <div className="leading-tight"><div className="text-sm font-black text-slate-800">{t('offUpTo')}</div><div className="text-[10px] text-slate-500">{t('limitedOffer')}</div></div>
            </motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 3.5 }} className="absolute bottom-5 end-5 bg-white/95 backdrop-blur rounded-2xl px-4 py-2.5 shadow-xl flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center"><Truck size={16} className="text-[#0891b2]" /></span>
              <div className="leading-tight"><div className="text-sm font-black text-slate-800">{t('freeDelivery')}</div><div className="text-[10px] text-slate-500">{t('fastDelivery')}</div></div>
            </motion.div>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute top-5 end-5 bg-[#082f49]/85 backdrop-blur border border-[#0284c7]/40 rounded-2xl px-4 py-2.5 flex items-center gap-2">
              <ShieldCheck size={18} className="text-[#0284c7]" />
              <div className="leading-tight"><div className="text-xs font-black text-white">100% Original</div><div className="text-[10px] text-white/50">Authenticity</div></div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="relative border-t border-white/10 bg-white/[0.03]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {['securePayment', 'fastDelivery', 'easyReturns', 'support247'].map((k, i) => {
            const icons = [ShieldCheck, Truck, BadgePercent, Sparkles];
            const Icon = icons[i];
            return (
              <div key={k} className="flex items-center justify-center gap-2 text-white/70 text-xs sm:text-[13px] font-semibold">
                <Icon size={17} className="text-[#0284c7] shrink-0" />
                {t(k)}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
