import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { StoreProvider, useStore } from './contexts/StoreContext';
import Header from './components/Header';
import Hero from './components/Hero';
import AmazingOffers from './components/AmazingOffers';
import CategoryBanners from './components/CategoryBanners';
import ProductGrid from './components/ProductGrid';
import QuickView from './components/QuickView';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import AuthModal from './components/AuthModal';
import CheckoutModal from './components/CheckoutModal';
import Footer from './components/Footer';

function Toast() {
  const { toast } = useStore();
  return (
    <AnimatePresence>
      {toast && (
        <motion.div initial={{ opacity: 0, y: 24, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.9 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 bg-[#082f49] text-white text-[13px] font-bold px-5 py-3 rounded-full shadow-2xl border border-white/10 whitespace-nowrap max-w-[92vw] overflow-hidden">
          <CheckCircle2 size={17} className="text-cyan-400 shrink-0" />
          {toast}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Shell() {
  const { dir, lang } = useStore();
  return (
    <div dir={dir} lang={lang} className={'min-h-screen bg-slate-50 ' + (dir === 'rtl' ? 'font-vazir' : 'font-inter')}>
      <Header />
      <main>
        <Hero />
        <AmazingOffers />
        <CategoryBanners />
        <ProductGrid />
      </main>
      <Footer />
      <QuickView />
      <CartDrawer />
      <WishlistDrawer />
      <AuthModal />
      <CheckoutModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}
