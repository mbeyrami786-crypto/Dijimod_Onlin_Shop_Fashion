import { useMemo, useState } from 'react';
import { SearchX, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import ProductCard from './ProductCard';

export default function ProductGrid() {
  const { t, products, loading, error, refetch, category, setCategory, searchQuery, setSearchQuery } = useStore();
  const [sort, setSort] = useState('newest');
  const [sortOpen, setSortOpen] = useState(false);

  const cats = [
    { id: 'all', label: t('all') },
    { id: 'women', label: t('women') },
    { id: 'men', label: t('men') },
    { id: 'shoes', label: t('shoes') },
    { id: 'accessories', label: t('accessories') },
  ];

  const sorts = [
    { id: 'newest', label: t('newest') },
    { id: 'cheapest', label: t('cheapest') },
    { id: 'expensive', label: t('expensive') },
    { id: 'rating', label: t('highestRated') },
  ];

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== 'all') list = list.filter(p => p.category === category);
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(p => (p.title_en + p.title_fa + p.title_ar + p.brand + p.category).toLowerCase().includes(q));
    }
    if (sort === 'cheapest') list.sort((a, b) => a.discount_price - b.discount_price);
    else if (sort === 'expensive') list.sort((a, b) => b.discount_price - a.discount_price);
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    else list.sort((a, b) => b.id - a.id);
    return list;
  }, [products, category, searchQuery, sort]);

  return (
    <section id="shop" className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-7">
          <div>
            <span className="inline-block text-[11px] font-black tracking-[0.25em] uppercase text-[#0891b2] bg-cyan-50 rounded-full px-4 py-1.5 mb-3">dijimod</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#082f49]">{t('featuredTitle')}</h2>
            <p className="text-slate-500 text-sm mt-1.5">{t('featuredSubtitle')}</p>
          </div>
          <div className="sm:ms-auto relative">
            <button onClick={() => setSortOpen(!sortOpen)} className="flex items-center gap-2 h-11 px-4 rounded-xl border border-slate-200 text-slate-700 text-[13px] font-bold hover:border-[#0891b2] transition-colors">
              <SlidersHorizontal size={16} className="text-[#0891b2]" />
              {t('sortBy')}: {sorts.find(s => s.id === sort)?.label}
              <ChevronDown size={14} className="opacity-50" />
            </button>
            {sortOpen && (
              <div className="absolute end-0 top-12 w-44 rounded-xl bg-white shadow-2xl border border-slate-100 overflow-hidden z-30">
                {sorts.map(s => (
                  <button key={s.id} onClick={() => { setSort(s.id); setSortOpen(false); }} className={'w-full text-start px-4 py-2.5 text-[13px] hover:bg-cyan-50 transition-colors ' + (sort === s.id ? 'text-[#0891b2] font-bold bg-cyan-50' : 'text-slate-600')}>{s.label}</button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {cats.map(c => (
            <button key={c.id} onClick={() => setCategory(c.id)} className={'shrink-0 h-10 px-5 rounded-full text-[13px] font-bold transition-all ' + (category === c.id ? 'bg-[#082f49] text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')}>
              {c.label}
            </button>
          ))}
          {searchQuery.trim() && (
            <div className="shrink-0 flex items-center gap-2 h-10 px-4 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold">
              {t('searchResults')} ({filtered.length})
              <button onClick={() => setSearchQuery('')} className="underline">x</button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="rounded-3xl overflow-hidden border border-slate-100">
                <div className="h-52 sm:h-64 bg-slate-100 animate-pulse" />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-slate-100 rounded animate-pulse" />
                  <div className="h-3 w-2/3 bg-slate-100 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-slate-500 mb-4">{error}</p>
            <button onClick={refetch} className="h-11 px-6 rounded-full bg-[#0891b2] text-white text-sm font-bold">Retry</button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <span className="inline-flex w-16 h-16 rounded-full bg-slate-100 items-center justify-center mb-4"><SearchX size={26} className="text-slate-400" /></span>
            <h3 className="font-black text-slate-800 text-lg">{t('noProducts')}</h3>
            <p className="text-slate-500 text-sm mt-1 mb-5">{t('noProductsDesc')}</p>
            <button onClick={() => { setCategory('all'); setSearchQuery(''); }} className="h-11 px-6 rounded-full bg-[#082f49] text-white text-sm font-bold">{t('clearFilters')}</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </section>
  );
}
