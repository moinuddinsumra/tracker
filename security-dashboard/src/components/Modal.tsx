import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onConfirm: () => void;
  confirmText: string;
  cancelText?: string;
  type?: 'danger' | 'info';
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  onConfirm,
  confirmText,
  cancelText = 'Cancel',
  type = 'info',
  children,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
          ></motion.div>

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`relative z-10 w-full max-w-md glass-panel rounded-2xl p-6 overflow-hidden border border-white/10 shadow-2xl ${
              type === 'danger' ? 'glass-panel-glow-rose' : 'glass-panel-glow-cyan'
            }`}
          >
            {/* Scanner line animation */}
            <div className="scanner-line"></div>

            {/* Header */}
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 border rounded-lg ${
                  type === 'danger' ? 'bg-neon-rose/10 border-neon-rose/30 text-neon-rose' : 'bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan'
                }`}>
                  <ShieldAlert className="h-4.5 w-4.5" />
                </div>
                <span className="font-futuristic font-bold text-xs tracking-widest text-white uppercase">
                  {title}
                </span>
              </div>
              <button 
                onClick={onClose}
                className="p-1 rounded-lg border border-white/5 bg-white/2 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            <div className="text-xs font-mono text-slate-300 leading-relaxed py-2">
              {children}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-6 border-t border-white/5 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-[10px] font-mono uppercase font-bold tracking-widest text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                {cancelText}
              </button>
              <button
                type="button"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={`px-4 py-2 rounded-xl font-mono uppercase font-bold text-[10px] tracking-widest cursor-pointer transition-all duration-300 active:scale-95 shadow-lg ${
                  type === 'danger'
                    ? 'bg-neon-rose hover:bg-neon-rose/90 text-white shadow-[0_0_15px_rgba(255,70,102,0.3)]'
                    : 'bg-neon-cyan hover:bg-neon-cyan/90 text-slate-950 shadow-[0_0_15px_rgba(0,229,255,0.3)]'
                }`}
              >
                {confirmText}
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
