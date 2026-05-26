import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar
} from 'recharts';
import { BarChart3, PieChart as PieIcon, LineChart as LineIcon } from 'lucide-react';

// Custom Glowing Glassmorphic Tooltip for Recharts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-3.5 rounded-xl border border-white/10 shadow-2xl backdrop-blur-2xl text-[10px] font-mono leading-relaxed">
        <p className="font-bold text-white uppercase tracking-widest mb-1.5 border-b border-white/5 pb-1">
          {label}
        </p>
        {payload.map((item: any, idx: number) => (
          <div key={idx} className="flex items-center gap-2 mt-1">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }}></div>
            <span className="text-slate-400 uppercase">{item.name}:</span>
            <span className="font-bold text-white tracking-wider">{item.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Mock data setups for analytics
const trendData = [
  { day: 'MON', Success: 42, Failed: 3 },
  { day: 'TUE', Success: 55, Failed: 8 },
  { day: 'WED', Success: 78, Failed: 12 },
  { day: 'THU', Success: 61, Failed: 4 },
  { day: 'FRI', Success: 95, Failed: 18 },
  { day: 'SAT', Success: 38, Failed: 1 },
  { day: 'SUN', Success: 48, Failed: 5 },
];

const browserData = [
  { name: 'Chrome', value: 580, color: '#00e5ff' },
  { name: 'Safari', value: 240, color: '#bd5cff' },
  { name: 'Firefox', value: 110, color: '#ff9b26' },
  { name: 'Edge', value: 70, color: '#00f09a' },
];

const deviceData = [
  { type: 'DESKTOP', count: 680, color: '#00e5ff' },
  { type: 'MOBILE', count: 240, color: '#bd5cff' },
  { type: 'TABLET', count: 58, color: '#ff9b26' },
  { type: 'SERVER', count: 22, color: '#00f09a' },
];

export const AnalyticsCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Chart 1: Login Frequency and Failure Area Trend */}
      <div className="glass-panel p-5 rounded-2xl border border-white/5 lg:col-span-2 flex flex-col h-[350px]">
        <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-neon-cyan/10 border border-neon-cyan/20 rounded-lg text-neon-cyan shadow-[0_0_8px_rgba(0,229,255,0.15)]">
              <LineIcon className="h-4.5 w-4.5" />
            </div>
            <span className="font-futuristic font-bold text-xs tracking-widest text-slate-200 uppercase">
              TEMPORAL LOGINS & ATTEMPTS
            </span>
          </div>
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
            Last 7-Day Cycle
          </span>
        </div>

        <div className="flex-1 w-full text-[9px] font-mono text-slate-400">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00f09a" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#00f09a" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorFailed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff4666" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#ff4666" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="day" stroke="rgba(255,255,255,0.2)" />
              <YAxis stroke="rgba(255,255,255,0.2)" />
              <Tooltip content={<CustomTooltip />} />
              <Area
                name="Success Logins"
                type="monotone"
                dataKey="Success"
                stroke="#00f09a"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorSuccess)"
              />
              <Area
                name="Failed Detections"
                type="monotone"
                dataKey="Failed"
                stroke="#ff4666"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorFailed)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Browser usage vector charts */}
      <div className="glass-panel p-5 rounded-2xl border border-white/5 flex flex-col h-[350px]">
        <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-neon-purple/10 border border-neon-purple/20 rounded-lg text-neon-purple shadow-[0_0_8px_rgba(189,92,255,0.15)]">
              <PieIcon className="h-4.5 w-4.5" />
            </div>
            <span className="font-futuristic font-bold text-xs tracking-widest text-slate-200 uppercase">
              BROWSER SIGN-IN VECTOR
            </span>
          </div>
        </div>

        <div className="flex-1 w-full relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie
                data={browserData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {browserData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(2,6,23,0.8)" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                iconSize={8}
                iconType="circle"
                content={({ payload }) => (
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-4">
                    {payload?.map((entry: any, index: number) => (
                      <div key={index} className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-wider text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }}></div>
                        <span>{entry.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 3: Device Registry Analytics */}
      <div className="glass-panel p-5 rounded-2xl border border-white/5 lg:col-span-3 flex flex-col h-[280px]">
        <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-neon-orange/10 border border-neon-orange/20 rounded-lg text-neon-orange shadow-[0_0_8px_rgba(255,155,38,0.15)]">
              <BarChart3 className="h-4.5 w-4.5" />
            </div>
            <span className="font-futuristic font-bold text-xs tracking-widest text-slate-200 uppercase">
              HARDWARE REGISTRY ALLOCATION
            </span>
          </div>
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
            Index Breakdown
          </span>
        </div>

        <div className="flex-1 w-full text-[9px] font-mono text-slate-400">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={deviceData}
              margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
              <XAxis type="number" stroke="rgba(255,255,255,0.1)" />
              <YAxis dataKey="type" type="category" stroke="rgba(255,255,255,0.1)" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {deviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
