import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert, WifiOff, BellRing, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'SUCCESS' | 'WARNING' | 'ALERT' | 'INFO';
  title: string;
  message: string;
}

interface ToastProps {
  toast: ToastMessage;
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  const getStyle = () => {
    switch (toast.type) {
      case 'SUCCESS':
        return {
          bg: 'border-neon-green/30 bg-cyber-blue/90 shadow-[0_0_20px_rgba(0,240,154,0.15)]',
          text: 'text-neon-green',
          icon: ShieldCheck,
          label: 'SECURE HANDSHAKE',
        };
      case 'WARNING':
        return {
          bg: 'border-neon-orange/30 bg-cyber-blue/90 shadow-[0_0_20px_rgba(255,155,38,0.15)]',
          text: 'text-neon-orange',
          icon: WifiOff,
          label: 'SECURITY ANOMALY',
        };
      case 'ALERT':
        return {
          bg: 'border-neon-rose/40 bg-cyber-blue/95 shadow-[0_0_25px_rgba(255,70,102,0.25)]',
          text: 'text-neon-rose',
          icon: ShieldAlert,
          label: 'THREAT TRIGGERED',
        };
      default:
        return {
          bg: 'border-neon-cyan/30 bg-cyber-blue/90 shadow-[0_0_20px_rgba(0,229,255,0.15)]',
          text: 'text-neon-cyan',
          icon: BellRing,
          label: 'MAINFRAME INFO',
        };
    }
  };

  const style = getStyle();
  const Icon = style.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className={`glass-panel border p-4 rounded-xl flex items-start gap-3 w-80 backdrop-blur-2xl pointer-events-auto ${style.bg}`}
    >
      <div className="shrink-0 mt-0.5">
        <Icon className={`h-5 w-5 animate-pulse ${style.text}`} />
      </div>

      <div className="flex-1 text-xs font-mono">
        <div className="flex justify-between items-start gap-2">
          <span className={`font-bold tracking-widest text-[9px] uppercase ${style.text}`}>
            {style.label}
          </span>
          <button 
            onClick={() => onClose(toast.id)}
            className="text-slate-500 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
        <h4 className="font-bold text-white uppercase text-[10px] mt-1 tracking-wider leading-snug">
          {toast.title}
        </h4>
        <p className="text-slate-400 text-[10px] leading-relaxed mt-1">
          {toast.message}
        </p>
      </div>
    </motion.div>
  );
};
