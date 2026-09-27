import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Heart, User, Globe, Menu, X, ChevronDown, Zap, LogOut, Crown } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { languages, type Lang } from '../lib/i18n';

export default function Header() {
  const { t, lang, setLang, cartCount, wishlist, setCartOpen, setWishlistOpen, setAuthOpen, searchQuery, setSearchQuery, category, setCategory, user, setUser } = useStore();
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const nav = [
    { id: 'all', label: t('home') },
    { id: 'amazing', label: t('amazingOffers'), hot: true },
    { id: 'women', label: t('women') },
    { id: 'men', label: t('men') },
    { id: 'shoes', label: t('shoes') },
    { id: 'accessories', label: t('accessories') },
  ];

  const goCategory = (id: string) => {
    if (id === 'amazing') {
      document.getElementById('amazing')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setCategory(id);
      document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-gradient-to-r from-[#082f49] via-[#164e63] to-[#082f49] text-white text-center py-2 px-4 text-[11px] sm:text-xs font-medium tracking-wide">
        <span className="inline-flex items-center gap-2 flex-wrap justify-center">
          <Crown size={13} className="text-[#0284c7]" />
          <span>{t('announcement')}</span>
          <span className="bg-[#0284c7] text-white px-2 py-0.5 rounded-full font-bold">{t('announcementCode')}</span>
        </span>
      </div>

      <div className="bg-[#082f49]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-3 sm:gap-5 h-16 sm:h-[72px]">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white/80 hover:text-white p-1">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-2 shrink-0 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#0891b2] to-[#155e75] flex items-center justify-center shadow-lg shadow-cyan-900/50 group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-xl sm:text-2xl">d</span>
            </div>
            <div className="leading-none">
              <span className="text-white font-black text-xl sm:text-2xl tracking-tight">diji<span className="text-[#0284c7]">mod</span></span>
              <span className="hidden sm:block text-[9px] text-white/50 tracking-[0.3em] uppercase mt-0.5">Luxury Fashion</span>
            </div>
          </a>

          <div className="hidden md:flex flex-1 max-w-xl mx-auto">
            <div className="relative w-full group">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }); }}
                placeholder={t('searchPlaceholder')}
                className="w-full h-11 rounded-full bg-white/10 border border-white/15 text-white placeholder:text-white/40 text-sm px-5 pe-12 outline-none focus:bg-white/15 focus:border-[#0891b2] transition-all"
              />
              <button onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })} className="absolute end-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#0891b2] hover:bg-[#0e7490] flex items-center justify-center text-white transition-colors">
                <Search size={16} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 ms-auto">
            <div className="relative">
              <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-1.5 h-10 px-2.5 sm:px-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-semibold transition-colors">
                <Globe size={16} className="text-[#0284c7]" />
                <span className="uppercase">{lang}</span>
                <ChevronDown size={13} className={'opacity-60 transition-transform ' + (langOpen ? 'rotate-180' : '')} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.96 }} className="absolute end-0 top-12 w-40 rounded-2xl bg-white shadow-2xl border border-slate-100 overflow-hidden z-50">
                    {languages.map((l) => (
                      <button key={l.code} onClick={() => { setLang(l.code as Lang); setLangOpen(false); }} className={'w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-cyan-50 transition-colors ' + (lang === l.code ? 'bg-cyan-50 text-[#0891b2] font-bold' : 'text-slate-700')}>
                        <span>{l.label}</span>
                        <span className="text-[10px] font-black bg-slate-100 rounded px-1.5 py-0.5">{l.short}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <button onClick={() => (user ? setUserOpen(!userOpen) : setAuthOpen(true))} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-colors" title={t('account')}>
                <User size={17} />
              </button>
              <AnimatePresence>
                {userOpen && user && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute end-0 top-12 w-52 rounded-2xl bg-white shadow-2xl border border-slate-100 p-4 z-50">
                    <p className="text-xs text-slate-500">{t('welcome')}</p>
                    <p className="font-bold text-slate-800 truncate">{user.name}</p>
                    <p className="text-xs text-slate-400 truncate mb-3">{user.email}</p>
                    <button onClick={() => { setUser(null); setUserOpen(false); }} className="w-full flex items-center justify-center gap-2 text-xs font-bold text-sky-600 bg-sky-50 hover:bg-sky-100 rounded-xl py-2 transition-colors">
                      <LogOut size={13} /> {t('logout')}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button onClick={() => setWishlistOpen(true)} className="relative w-10 h-10 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-colors" title={t('wishlist')}>
              <Heart size={17} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -end-1 min-w-[20px] h-5 px-1 rounded-full bg-[#0284c7] text-white text-[10px] font-black flex items-center justify-center">{wishlist.length}</span>
              )}
            </button>

            <button onClick={() => setCartOpen(true)} className="relative flex items-center gap-2 h-10 ps-3 pe-4 rounded-full bg-gradient-to-r from-[#0891b2] to-[#0e7490] hover:from-[#0e7490] hover:to-[#155e75] text-white text-xs font-bold shadow-lg shadow-cyan-950/50 transition-all hover:scale-[1.03]" title={t('cart')}>
              <ShoppingBag size={17} />
              <span className="hidden sm:inline">{t('cart')}</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -end-1 min-w-[22px] h-[22px] px-1 rounded-full bg-[#0284c7] text-white text-[11px] font-black flex items-center justify-center border-2 border-[#082f49]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="md:hidden px-4 pb-3">
          <div className="relative w-full">
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t('searchPlaceholder')} className="w-full h-10 rounded-full bg-white/10 border border-white/15 text-white placeholder:text-white/40 text-[13px] px-4 pe-11 outline-none focus:border-[#0891b2]" />
            <span className="absolute end-3 top-1/2 -translate-y-1/2 text-white/50"><Search size={16} /></span>
          </div>
        </div>

        <nav className="hidden lg:block border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 flex items-center gap-1 h-11">
            {nav.map((n) => (
              <button key={n.id} onClick={() => goCategory(n.id)} className={'flex items-center gap-1.5 px-4 h-full text-[13px] font-semibold transition-colors relative ' + (category === n.id ? 'text-[#0284c7]' : 'text-white/70 hover:text-white')}>
                {'hot' in n && n.hot ? <Zap size={13} className="text-sky-400" fill="currentColor" /> : null}
                {n.label}
                {(category === n.id) && <span className="absolute bottom-0 inset-x-3 h-0.5 rounded-full bg-[#0284c7]" />}
              </button>
            ))}
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-[#082f49] border-b border-white/10 overflow-hidden">
            <div className="px-4 py-3 flex flex-col">
              {nav.map((n) => (
                <button key={n.id} onClick={() => goCategory(n.id)} className="flex items-center gap-2 py-2.5 text-sm font-semibold text-white/80 hover:text-white text-start border-b border-white/5 last:border-0">
                  {'hot' in n && n.hot ? <Zap size={14} className="text-sky-400" fill="currentColor" /> : null}
                  {n.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
