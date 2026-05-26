import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, AlertOctagon, PowerOff, ShieldCheck, Key } from 'lucide-react';

export interface FeedEvent {
  id: string;
  type: 'LOGIN' | 'LOGOUT' | 'FAILED' | 'SUSPICIOUS' | 'HIJACK_BLOCKED';
  userName: string;
  timestamp: string;
  ip: string;
}

interface LiveFeedProps {
  events: FeedEvent[];
}

export const LiveFeed: React.FC<LiveFeedProps> = ({ events }) => {
  const getEventStyle = (type: FeedEvent['type']) => {
    switch (type) {
      case 'LOGIN':
        return {
          pulse: 'bg-neon-green',
          border: 'border-neon-green/20 bg-neon-green/5',
          text: 'text-neon-green',
          icon: ShieldCheck,
          label: 'SECURE HANDSHAKE',
        };
      case 'LOGOUT':
        return {
          pulse: 'bg-slate-500',
          border: 'border-white/5 bg-white/2',
          text: 'text-slate-400',
          icon: PowerOff,
          label: 'TERMINAL CLOSE',
        };
      case 'SUSPICIOUS':
        return {
          pulse: 'bg-neon-orange',
          border: 'border-neon-orange/20 bg-neon-orange/5',
          text: 'text-neon-orange',
          icon: AlertOctagon,
          label: 'SECURITY ANOMALY',
        };
      case 'HIJACK_BLOCKED':
        return {
          pulse: 'bg-neon-rose',
          border: 'border-neon-rose/30 bg-neon-rose/10',
          text: 'text-neon-rose',
          icon: AlertOctagon,
          label: 'HIJACK SHIELD TRIGGER',
        };
      default:
        return {
          pulse: 'bg-neon-rose',
          border: 'border-neon-rose/20 bg-neon-rose/5',
          text: 'text-neon-rose',
          icon: Key,
          label: 'DECRYPTION FAILURE',
        };
    }
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border border-white/5 flex flex-col h-[350px]">
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-cyan"></span>
          </div>
          <span className="font-futuristic font-bold text-xs tracking-widest text-slate-200 uppercase">
            LIVE TELEMETRY STREAM
          </span>
        </div>
        <div className="flex items-center gap-1 bg-neon-cyan/10 px-2 py-0.5 border border-neon-cyan/20 rounded-lg">
          <Radio className="h-3 w-3 text-neon-cyan animate-pulse" />
          <span className="text-[8px] font-mono text-neon-cyan font-bold tracking-widest uppercase">
            100ms POLL
          </span>
        </div>
      </div>

      {/* Dynamic scrolling events stream container */}
      <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
        <AnimatePresence initial={false}>
          {events.map((event) => {
            const style = getEventStyle(event.type);
            const Icon = style.icon;
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${style.border}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Status Pulse */}
                  <div className="relative shrink-0 flex h-2 w-2">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${style.pulse}`}></span>
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${style.pulse}`}></span>
                  </div>

                  <div className="p-1.5 rounded-lg bg-slate-900 border border-white/5 shrink-0 text-slate-400">
                    <Icon className={`h-3.5 w-3.5 ${style.text}`} />
                  </div>

                  <div className="min-w-0">
                    <span className={`text-[9px] font-mono font-bold tracking-wider uppercase block ${style.text}`}>
                      {style.label}
                    </span>
                    <span className="text-xs font-semibold text-white truncate block max-w-[150px] uppercase tracking-wider">
                      {event.userName}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[9px] font-mono text-slate-500 block">
                    {event.timestamp}
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 block tracking-wider mt-0.5">
                    IP: {event.ip}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
