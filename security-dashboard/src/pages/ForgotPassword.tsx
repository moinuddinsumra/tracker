import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ShieldAlert, CheckCircle, ArrowRight, RefreshCw } from 'lucide-react';

interface ForgotPasswordProps {
  onNavigate: (page: 'login' | 'register' | 'forgot-password' | 'dashboard') => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulate mainframe token transmission
    setTimeout(() => {
      if (email) {
        setSuccess('Security Recovery Token Dispatched. Please check your terminal inbox.');
        setIsLoading(false);
      } else {
        setError('CRITICAL ERROR: Destination email undefined.');
        setIsLoading(false);
      }
    }, 1500);
  };

  const particles = Array.from({ length: 10 }, (_, i) => ({
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
            className="absolute bg-neon-cyan rounded-full opacity-20"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
            animate={{
              y: ['0px', '-120px', '0px'],
              opacity: [0.1, 0.3, 0.1],
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

      <div className="absolute w-full h-[3px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-20 animate-scanline pointer-events-none z-0"></div>

      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[120px]"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md px-6 py-12"
      >
        <div className="glass-panel glass-panel-glow-cyan p-8 rounded-2xl relative overflow-hidden backdrop-blur-2xl">
          <div className="scanner-line"></div>

          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="inline-flex items-center justify-center p-3.5 bg-neon-cyan/10 border border-neon-cyan/30 rounded-xl mb-4 text-neon-cyan shadow-[0_0_15px_rgba(0,229,255,0.2)]"
            >
              <RefreshCw className="h-7 w-7" />
            </motion.div>
            <h1 className="text-2xl font-bold font-futuristic text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple tracking-wider uppercase mb-1">
              KEY RECOVERY
            </h1>
            <p className="text-xs text-slate-400 tracking-widest uppercase">
              Retrieve Encryption Key Clearance
            </p>
          </div>

          {error && (
            <motion.div
              className="mb-6 flex items-start gap-3 p-4 bg-neon-rose/10 border border-neon-rose/30 text-neon-rose rounded-xl backdrop-blur-md"
            >
              <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <span className="font-semibold block uppercase tracking-wider mb-0.5">Transmission Failed</span>
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
                <span className="font-semibold block uppercase tracking-wider mb-0.5">Transmission Complete</span>
                {success}
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2">
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
                  className="glass-input w-full rounded-xl py-3 pl-10 pr-4 text-sm font-mono tracking-wider focus:outline-none"
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="cyber-btn w-full bg-neon-cyan hover:bg-neon-cyan/90 text-slate-950 font-bold uppercase tracking-widest text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] duration-300 transform active:scale-95 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Transmit Reset Token</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-white/5 pt-6 text-xs text-slate-400">
            <button
              onClick={() => onNavigate('login')}
              className="text-neon-cyan hover:underline font-semibold bg-transparent border-none cursor-pointer"
            >
              Return to Login Terminal
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
