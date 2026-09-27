import { useState } from 'react';
import { Send, Check, Phone, Mail, MapPin, Instagram, Twitter, Facebook, Youtube, CreditCard, ShieldCheck } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';

export default function Footer() {
  const { t, setCategory } = useStore();
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const go = (c: string) => {
    setCategory(c);
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#082f49] text-white">
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex-1">
            <h3 className="font-black text-xl sm:text-2xl">{t('newsletterTitle')}</h3>
            <p className="text-white/50 text-sm mt-1.5">{t('newsletterDesc')}</p>
          </div>
          {done ? (
            <p className="flex items-center gap-2 text-cyan-400 font-bold text-sm bg-cyan-500/10 border border-cyan-500/30 rounded-full px-5 py-3"><Check size={16} /> {t('subscribed')}</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (email.includes('@')) setDone(true); }} className="flex w-full lg:w-auto gap-2">
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder={t('emailPlaceholder')} className="flex-1 lg:w-72 h-12 rounded-full bg-white/10 border border-white/15 px-5 text-sm outline-none placeholder:text-white/35 focus:border-[#0891b2]" />
              <button className="h-12 px-6 rounded-full bg-gradient-to-r from-[#0891b2] to-[#0e7490] text-sm font-black flex items-center gap-2 hover:scale-105 transition-transform">
                <Send size={15} /> {t('subscribe')}
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0891b2] to-[#155e75] flex items-center justify-center"><span className="text-white font-black text-2xl">d</span></div>
            <span className="font-black text-2xl">diji<span className="text-[#0284c7]">mod</span></span>
          </div>
          <p className="text-white/50 text-[13px] leading-6 mb-5">{t('footerAbout')}</p>
          <div className="flex gap-2">
            {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
              <a key={i} href="#" onClick={(e) => e.preventDefault()} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-[#0891b2] hover:text-white transition-colors"><Icon size={16} /></a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-black text-sm mb-4 text-[#67e8f9]">{t('shopLinks')}</h4>
          <ul className="space-y-2.5 text-[13px] text-white/60">
            <li><button onClick={() => go('women')} className="hover:text-white transition-colors">{t('women')}</button></li>
            <li><button onClick={() => go('men')} className="hover:text-white transition-colors">{t('men')}</button></li>
            <li><button onClick={() => go('shoes')} className="hover:text-white transition-colors">{t('shoes')}</button></li>
            <li><button onClick={() => go('accessories')} className="hover:text-white transition-colors">{t('accessories')}</button></li>
            <li><button onClick={() => document.getElementById('amazing')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">{t('amazingOffers')}</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-black text-sm mb-4 text-[#67e8f9]">{t('customerService')}</h4>
          <ul className="space-y-2.5 text-[13px] text-white/60">
            {[t('faq'), t('returns'), t('shippingInfo'), t('privacy'), t('terms')].map((x, i) => (
              <li key={i}><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">{x}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-black text-sm mb-4 text-[#67e8f9]">{t('contactUs')}</h4>
          <ul className="space-y-3 text-[13px] text-white/60">
            <li className="flex items-center gap-2"><Phone size={14} className="text-[#0891b2]" /> <span dir="ltr">{t('callUs')}</span></li>
            <li className="flex items-center gap-2"><Mail size={14} className="text-[#0891b2]" /> <span dir="ltr">support@dijimod.com</span></li>
            <li className="flex items-center gap-2"><MapPin size={14} className="text-[#0891b2]" /> Tehran, Vanak Mall</li>
          </ul>
          <div className="flex items-center gap-2 mt-5 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5">
            <ShieldCheck size={18} className="text-cyan-400" />
            <span className="text-[11px] text-white/60 font-bold">{t('trustTitle')}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center gap-3 justify-between">
          <p className="text-white/40 text-xs">2026 dijimod - {t('rights')}</p>
          <div className="flex items-center gap-2 text-white/40 text-[11px]">
            <CreditCard size={15} />
            <span>VISA - MasterCard - Shetab</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
