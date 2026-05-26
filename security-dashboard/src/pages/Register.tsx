import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ShieldAlert, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface RegisterProps {
  onNavigate: (page: 'login' | 'register' | 'forgot-password' | 'dashboard') => void;
}

export const Register: React.FC<RegisterProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError('CRITICAL MISMATCH: Cryptographic keys do not align.');
      setIsLoading(false);
      return;
    }

    if (securityCode !== 'SOC-SECURE-2026') {
      setError('AUTHORIZATION REFUSED: Invalid SOC node authorization code.');
      setIsLoading(false);
      return;
    }

    // Simulate key generation
    setTimeout(() => {
      setSuccess('Registry Pending: Administrator review initialized.');
      setIsLoading(false);
      setTimeout(() => {
        onNavigate('login');
      }, 2000);
    }, 1500);
  };

  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="relative min-h-screen bg-cyber-dark overflow-hidden flex items-center justify-center font-body-md text-white">
      <div className="absolute inset-0 cyber-grid z-0 opacity-40"></div>
      <div className="absolute inset-0 cyber-grid-dense z-0 opacity-20"></div>

      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute bg-neon-purple rounded-full opacity-20"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
            animate={{
              y: ['0px', '-100px', '0px'],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="absolute w-full h-[3px] bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-20 animate-scanline pointer-events-none z-0"></div>

      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[120px]"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md px-6 py-12"
      >
        <div className="glass-panel glass-panel-glow-purple p-8 rounded-2xl relative overflow-hidden backdrop-blur-2xl">
          <div className="scanner-line"></div>

          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="inline-flex items-center justify-center p-3.5 bg-neon-purple/10 border border-neon-purple/30 rounded-xl mb-4 text-neon-purple shadow-[0_0_15px_rgba(189,92,255,0.2)]"
            >
              <ShieldCheck className="h-7 w-7" />
            </motion.div>
            <h1 className="text-2xl font-bold font-futuristic text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan tracking-wider uppercase mb-1">
              REQUEST NODE NODE
            </h1>
            <p className="text-xs text-slate-400 tracking-widest uppercase">
              Register Core Web Tracker Operator
            </p>
          </div>

          {error && (
            <motion.div
              className="mb-6 flex items-start gap-3 p-4 bg-neon-rose/10 border border-neon-rose/30 text-neon-rose rounded-xl backdrop-blur-md"
            >
              <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <span className="font-semibold block uppercase tracking-wider mb-0.5">Registry Refused</span>
                {error}
              </div>
            </motion.div>
          )}

          {success && (
            <motion.div
              className="mb-6 flex items-start gap-3 p-4 bg-neon-green/10 border border-neon-green/30 text-neon-green rounded-xl backdrop-blur-md"
            >
              <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <span className="font-semibold block uppercase tracking-wider mb-0.5">System Initialized</span>
                {success}
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
                Operator Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Operator Name"
                  className="glass-input w-full rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono tracking-wider focus:outline-none"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
                Mainframe ID (Email Address)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operator@core.io"
                  className="glass-input w-full rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono tracking-wider focus:outline-none"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
                Secure Password Key
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="glass-input w-full rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono tracking-wider focus:outline-none"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
                Confirm Password Key
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="glass-input w-full rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono tracking-wider focus:outline-none"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                  SOC Node Authorization Code
                </label>
                <span className="text-[9px] text-slate-500 font-mono">Use: SOC-SECURE-2026</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  required
                  value={securityCode}
                  onChange={(e) => setSecurityCode(e.target.value)}
                  placeholder="SOC-XXXX-XXXX"
                  className="glass-input w-full rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono tracking-wider focus:outline-none uppercase"
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="cyber-btn w-full bg-neon-purple hover:bg-neon-purple/90 text-white font-bold uppercase tracking-widest text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(189,92,255,0.4)] hover:shadow-[0_0_30px_rgba(189,92,255,0.6)] duration-300 transform active:scale-95 disabled:opacity-50 mt-4"
            >
              {isLoading ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Request Authorization</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center border-t border-white/5 pt-4 text-xs text-slate-400">
            <span>Already Clearance Cleared? </span>
            <button
              onClick={() => onNavigate('login')}
              className="text-neon-purple hover:underline font-semibold bg-transparent border-none cursor-pointer"
            >
              Access Terminal
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
