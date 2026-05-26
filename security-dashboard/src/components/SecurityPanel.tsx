import React from 'react';
import { ShieldAlert, MapPin, Eye, KeyRound, AlertTriangle, AlertCircle } from 'lucide-react';

interface SecurityAlert {
  id: string;
  ip: string;
  location: string;
  userName: string;
  threatLevel: 'CRITICAL' | 'WARNING' | 'MINOR';
  reason: string;
  timestamp: string;
}

const mockSecurityAlerts: SecurityAlert[] = [
  {
    id: '1',
    ip: '198.51.100.42',
    location: 'Shenzhen, China',
    userName: 'operator_alpha',
    threatLevel: 'CRITICAL',
    reason: 'Geo-velocity mismatch (Last access 5m ago in local node)',
    timestamp: '14:28:10',
  },
  {
    id: '2',
    ip: '203.0.113.88',
    location: 'Moscow, Russia',
    userName: 'mnddnsumra1@gmail.com',
    threatLevel: 'WARNING',
    reason: 'Brute-force payload signature (5 failed handshakes in 30s)',
    timestamp: '14:12:05',
  },
  {
    id: '3',
    ip: '192.0.2.14',
    location: 'Frankfurt, Germany',
    userName: 'guest_user',
    threatLevel: 'MINOR',
    reason: 'Auto-logout boundary triggered (120s inactivity limit)',
    timestamp: '13:58:33',
  }
];

export const SecurityPanel: React.FC = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      
      {/* Dynamic Security Threat logs */}
      <div className="glass-panel p-5 rounded-2xl border border-white/5 xl:col-span-2 flex flex-col h-[380px]">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-neon-rose/10 border border-neon-rose/20 rounded-lg text-neon-rose shadow-[0_0_8px_rgba(255,70,102,0.15)]">
              <ShieldAlert className="h-4.5 w-4.5" />
            </div>
            <span className="font-futuristic font-bold text-xs tracking-widest text-slate-200 uppercase">
              THREAT INTELLIGENCE FEED
            </span>
          </div>
          <span className="text-[9px] font-mono text-neon-rose animate-pulse font-bold bg-neon-rose/10 border border-neon-rose/30 px-2 py-0.5 rounded-lg">
            3 ACTIVE THREATS
          </span>
        </div>

        {/* Live List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {mockSecurityAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border flex items-start gap-4 transition-all duration-300 hover:bg-white/2 ${
                alert.threatLevel === 'CRITICAL'
                  ? 'border-neon-rose/30 bg-neon-rose/5'
                  : alert.threatLevel === 'WARNING'
                  ? 'border-neon-orange/20 bg-neon-orange/5'
                  : 'border-white/5 bg-white/2'
              }`}
            >
              <div className="mt-0.5">
                {alert.threatLevel === 'CRITICAL' ? (
                  <AlertCircle className="h-5 w-5 text-neon-rose animate-bounce shrink-0" />
                ) : alert.threatLevel === 'WARNING' ? (
                  <AlertTriangle className="h-5 w-5 text-neon-orange animate-pulse shrink-0" />
                ) : (
                  <Eye className="h-5 w-5 text-slate-400 shrink-0" />
                )}
              </div>

              <div className="flex-1 text-xs font-mono min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`font-bold tracking-widest text-[9px] px-1.5 py-0.5 border rounded-md uppercase ${
                    alert.threatLevel === 'CRITICAL'
                      ? 'border-neon-rose/30 text-neon-rose bg-neon-rose/10'
                      : alert.threatLevel === 'WARNING'
                      ? 'border-neon-orange/30 text-neon-orange bg-neon-orange/10'
                      : 'border-white/10 text-slate-400 bg-white/5'
                  }`}>
                    {alert.threatLevel}
                  </span>
                  <span className="text-[10px] text-slate-500">{alert.timestamp}</span>
                  <span className="text-[10px] text-neon-cyan select-all ml-auto hover:underline">{alert.ip}</span>
                </div>
                <div className="mt-2 text-white font-semibold uppercase tracking-wider text-[11px] truncate">
                  TARGET: {alert.userName}
                </div>
                <p className="text-slate-400 leading-relaxed mt-1 text-[11px]">
                  {alert.reason}
                </p>
                <div className="mt-3 flex items-center gap-1 text-[10px] text-slate-500 uppercase tracking-widest">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Geo-Node: {alert.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Environment Threat Dial (Middle card) */}
      <div className="glass-panel p-5 rounded-2xl border border-white/5 flex flex-col h-[380px] justify-between relative overflow-hidden">
        <div className="scanner-line"></div>
        
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
          <div className="p-1.5 bg-neon-purple/10 border border-neon-purple/20 rounded-lg text-neon-purple shadow-[0_0_8px_rgba(189,92,255,0.15)]">
            <KeyRound className="h-4.5 w-4.5" />
          </div>
          <span className="font-futuristic font-bold text-xs tracking-widest text-slate-200 uppercase">
            VECTOR SECURITY MATRIX
          </span>
        </div>

        {/* Dynamic Threat Level Indicator Ring */}
        <div className="flex-1 flex flex-col items-center justify-center py-6">
          <div className="relative w-36 h-36 border border-white/5 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,70,102,0.05)]">
            {/* Pulsing warning element */}
            <div className="absolute inset-2 border-2 border-dashed border-neon-rose/30 rounded-full animate-[spin_12s_linear_infinite]"></div>
            <div className="absolute inset-4 border border-neon-cyan/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
            
            <div className="text-center z-10 select-none">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">DANGER_RATIO</span>
              <span className="text-3xl font-bold font-futuristic text-neon-rose tracking-tighter filter drop-shadow-[0_0_8px_#ff4666]">
                32%
              </span>
              <span className="text-[8px] font-mono text-neon-cyan block tracking-widest mt-1 uppercase">NODE_ORANGE</span>
            </div>
          </div>
        </div>

        {/* Alert Sub-metrics */}
        <div className="mt-4 border-t border-white/5 pt-4 space-y-2 text-[10px] font-mono text-slate-400">
          <div className="flex justify-between">
            <span>BRUTE FORCE COUNTER:</span>
            <span className="text-neon-orange font-bold font-futuristic">02 BLOCKED</span>
          </div>
          <div className="flex justify-between">
            <span>GEOLOCATION ANOMALIES:</span>
            <span className="text-neon-rose font-bold font-futuristic">01 WARNING</span>
          </div>
          <div className="flex justify-between">
            <span>ACTIVE SECURITY POLICIES:</span>
            <span className="text-neon-green font-bold font-futuristic">12 DEPLOYED</span>
          </div>
        </div>

      </div>

    </div>
  );
};
