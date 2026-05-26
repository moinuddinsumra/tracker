import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend: string;
  trendType: 'positive' | 'negative' | 'neutral';
  description: string;
  colorType: 'cyan' | 'purple' | 'rose' | 'green' | 'orange';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  trendType,
  description,
  colorType
}) => {
  // Theme styling configurations
  const themeStyles = {
    cyan: {
      bg: 'bg-neon-cyan/5 border-neon-cyan/20 hover:border-neon-cyan/40 hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]',
      iconBg: 'bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan shadow-[0_0_10px_rgba(0,229,255,0.15)]',
      line: 'from-neon-cyan to-transparent',
    },
    purple: {
      bg: 'bg-neon-purple/5 border-neon-purple/20 hover:border-neon-purple/40 hover:shadow-[0_0_20px_rgba(189,92,255,0.15)]',
      iconBg: 'bg-neon-purple/10 border-neon-purple/30 text-neon-purple shadow-[0_0_10px_rgba(189,92,255,0.15)]',
      line: 'from-neon-purple to-transparent',
    },
    rose: {
      bg: 'bg-neon-rose/5 border-neon-rose/20 hover:border-neon-rose/40 hover:shadow-[0_0_20px_rgba(255,70,102,0.15)]',
      iconBg: 'bg-neon-rose/10 border-neon-rose/30 text-neon-rose shadow-[0_0_10px_rgba(255,70,102,0.15)]',
      line: 'from-neon-rose to-transparent',
    },
    green: {
      bg: 'bg-neon-green/5 border-neon-green/20 hover:border-neon-green/40 hover:shadow-[0_0_20px_rgba(0,240,154,0.15)]',
      iconBg: 'bg-neon-green/10 border-neon-green/30 text-neon-green shadow-[0_0_10px_rgba(0,240,154,0.15)]',
      line: 'from-neon-green to-transparent',
    },
    orange: {
      bg: 'bg-neon-orange/5 border-neon-orange/20 hover:border-neon-orange/40 hover:shadow-[0_0_20px_rgba(255,155,38,0.15)]',
      iconBg: 'bg-neon-orange/10 border-neon-orange/30 text-neon-orange shadow-[0_0_10px_rgba(255,155,38,0.15)]',
      line: 'from-neon-orange to-transparent',
    }
  };

  const style = themeStyles[colorType];

  return (
    <div className={`glass-panel p-6 rounded-2xl flex flex-col justify-between relative group transition-all duration-300 hover:-translate-y-0.5 border ${style.bg}`}>
      {/* Decorative colored scanner accent border at top */}
      <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${style.line} opacity-40 rounded-t-2xl`}></div>
      
      {/* Dynamic Scanline inside card */}
      <div className="scanner-line group-hover:block hidden"></div>

      <div className="flex justify-between items-start mb-5">
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
          {title}
        </span>
        <div className={`p-2 border rounded-xl transition-all duration-300 group-hover:scale-110 ${style.iconBg}`}>
          <Icon className="h-4.5 w-4.5" />
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <div className="text-3xl font-bold font-futuristic text-white tracking-tighter">
          {value}
        </div>
        
        {/* Trend Indicator */}
        <span className={`text-[10px] font-mono font-bold uppercase ${
          trendType === 'positive' 
            ? 'text-neon-green filter drop-shadow-[0_0_2px_rgba(0,240,154,0.4)]' 
            : trendType === 'negative' 
            ? 'text-neon-rose filter drop-shadow-[0_0_2px_rgba(255,70,102,0.4)]' 
            : 'text-slate-400'
        }`}>
          {trend}
        </span>
      </div>

      <p className="mt-2 text-[10px] font-mono text-slate-500 uppercase tracking-wide">
        {description}
      </p>
    </div>
  );
};
