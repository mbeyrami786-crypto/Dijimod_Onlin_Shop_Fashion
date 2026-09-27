import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { isRTL } from '../lib/i18n';

const banners = [
  { id: 'women', img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=90' },
  { id: 'men', img: 'https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=1200&q=90' },
  { id: 'shoes', img: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=1200&q=90' },
  { id: 'accessories', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=90' },
];

export default function CategoryBanners() {
  const { t, lang, setCategory } = useStore();
  const rtl = isRTL(lang);
  const Arrow = rtl ? ArrowLeft : ArrowRight;
  const labels: Record<string, string> = { women: t('fashionWomen'), men: t('fashionMen'), shoes: t('footwear'), accessories: t('accessoriesCat') };

  const go = (id: string) => {
    setCategory(id);
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-12 sm:py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <span className="inline-block text-[11px] font-black tracking-[0.25em] uppercase text-[#0284c7] bg-[#0284c7]/10 rounded-full px-4 py-1.5 mb-3">dijimod</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#082f49]">{t('categoryTitle')}</h2>
          <p className="text-slate-500 text-sm mt-2">{t('categorySubtitle')}</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {banners.map((b, i) => (
            <motion.button key={b.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} onClick={() => go(b.id)} className="group relative rounded-2xl sm:rounded-3xl overflow-hidden h-52 sm:h-80 text-start shadow-lg hover:shadow-2xl transition-shadow">
              <img src={b.img} alt={labels[b.id]} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#082f49] via-[#082f49]/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
                <h3 className="text-white font-black text-sm sm:text-xl mb-1">{labels[b.id]}</h3>
                <span className="inline-flex items-center gap-1.5 text-[#67e8f9] text-[11px] sm:text-[13px] font-bold group-hover:gap-2.5 transition-all">
                  {t('shopNow')} <Arrow size={14} />
                </span>
              </div>
              <span className="absolute top-3 end-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur border border-white/30 text-white text-xs font-black flex items-center justify-center">0{i + 1}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
