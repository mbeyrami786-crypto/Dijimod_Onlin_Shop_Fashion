import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Phone, Crown } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';

export default function AuthModal() {
  const { t, authOpen, setAuthOpen, setUser, showToast, setCheckoutOpen, cart } = useStore();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    if (!email.includes('@')) { setErr(t('email')); return; }
    if (password.length < 4) { setErr(t('password')); return; }
    if (mode === 'signup' && name.trim().length < 2) { setErr(t('name')); return; }
    const displayName = mode === 'signup' ? name.trim() : email.split('@')[0];
    setUser({ name: displayName, email });
    setAuthOpen(false);
    showToast(t('welcome') + ' ' + displayName);
    setName(''); setEmail(''); setPassword(''); setPhone('');
    if (cart.length > 0) setCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      {authOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setAuthOpen(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.94, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 16 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-br from-[#082f49] to-[#155e75] px-6 pt-6 pb-8 text-center relative overflow-hidden">
              <div className="absolute -top-10 -end-10 w-40 h-40 bg-[#0284c7]/20 blur-3xl rounded-full" />
              <button onClick={() => setAuthOpen(false)} className="absolute top-4 end-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"><X size={15} /></button>
              <span className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0284c7] to-[#0369a1] items-center justify-center shadow-xl mb-3"><Crown size={26} className="text-white" /></span>
              <h2 className="text-white font-black text-lg">{mode === 'login' ? t('loginTitle') : t('signupTitle')}</h2>
              <div className="flex bg-white/10 rounded-full p-1 mt-4 gap-1">
                <button onClick={() => setMode('login')} className={'flex-1 h-9 rounded-full text-xs font-black transition-all ' + (mode === 'login' ? 'bg-white text-[#082f49]' : 'text-white/70')}>{t('loginBtn')}</button>
                <button onClick={() => setMode('signup')} className={'flex-1 h-9 rounded-full text-xs font-black transition-all ' + (mode === 'signup' ? 'bg-white text-[#082f49]' : 'text-white/70')}>{t('signupBtn')}</button>
              </div>
            </div>
            <form onSubmit={submit} className="px-6 py-6 space-y-3 -mt-2">
              {mode === 'signup' && (
                <label className="flex items-center gap-2.5 h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 focus-within:border-[#0891b2] transition-colors">
                  <User size={16} className="text-slate-400 shrink-0" />
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t('name')} className="flex-1 bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400" />
                </label>
              )}
              <label className="flex items-center gap-2.5 h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 focus-within:border-[#0891b2] transition-colors">
                <Mail size={16} className="text-slate-400 shrink-0" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('email')} className="flex-1 bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400" dir="ltr" />
              </label>
              {mode === 'signup' && (
                <label className="flex items-center gap-2.5 h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 focus-within:border-[#0891b2] transition-colors">
                  <Phone size={16} className="text-slate-400 shrink-0" />
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t('phone')} className="flex-1 bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400" />
                </label>
              )}
              <label className="flex items-center gap-2.5 h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 focus-within:border-[#0891b2] transition-colors">
                <Lock size={16} className="text-slate-400 shrink-0" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t('password')} className="flex-1 bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400" dir="ltr" />
              </label>
              {err && <p className="text-sky-500 text-xs font-bold">! {err}</p>}
              <button type="submit" className="w-full h-12 rounded-xl bg-gradient-to-r from-[#0891b2] to-[#0e7490] text-white text-sm font-black shadow-lg shadow-cyan-900/20 hover:scale-[1.01] transition-transform">
                {mode === 'login' ? t('loginBtn') : t('signupBtn')}
              </button>
              <button type="button" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="w-full text-center text-xs font-bold text-[#0891b2] hover:underline pt-1">
                {mode === 'login' ? t('noAccount') : t('hasAccount')}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
