import React, { useState } from 'react';
import { Search, Bell, Shield, Clock, ChevronDown, User, LogOut, Terminal } from 'lucide-react';

interface NavbarProps {
  userName: string;
  userEmail: string;
  userAvatar: string | null;
  activeSessionTime: number; // in seconds
  onLogout: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  systemAlertsCount: number;
  onClearAlerts: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  userName,
  userEmail,
  userAvatar,
  activeSessionTime,
  onLogout,
  searchTerm,
  setSearchTerm,
  systemAlertsCount,
  onClearAlerts,
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [alertsOpen, setAlertsOpen] = useState(false);

  // Format session countdown (e.g. 120s -> 2:00)
  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <nav className="fixed top-0 right-0 left-0 h-20 bg-cyber-blue/40 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 md:pl-72 pr-8 z-30 shadow-2xl">
      {/* Global Search Bar */}
      <div className="flex-1 max-w-md relative hidden md:block">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="h-4 w-4" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Query intelligence database (User, IP, Browser...)"
          className="glass-input w-full rounded-xl py-2 pl-10 pr-4 text-xs font-mono tracking-wider focus:outline-none placeholder-slate-500"
        />
      </div>

      {/* Right Navbar Controls */}
      <div className="flex items-center gap-6 ml-auto">
        {/* Session Inactivity Countdown Clock */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 shadow-[0_0_10px_rgba(0,229,255,0.05)]">
          <Clock className="h-3.5 w-3.5 text-neon-cyan animate-pulse" />
          <span className="text-[10px] font-mono font-bold tracking-widest text-neon-cyan">
            GATEWAY_KEY: {formatTime(activeSessionTime)}
          </span>
        </div>

        {/* Real-time System Heartbeat Status Badge */}
        <div className="flex items-center gap-2 bg-neon-green/10 border border-neon-green/30 px-3.5 py-1.5 rounded-full shadow-[0_0_15px_rgba(0,240,154,0.1)]">
          <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-ping"></div>
          <span className="text-[9px] font-mono uppercase font-bold tracking-widest text-neon-green">
            System Secure
          </span>
        </div>

        {/* Notification Bell Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setAlertsOpen(!alertsOpen);
              setProfileOpen(false);
            }}
            className="p-2.5 rounded-xl border border-white/5 bg-white/3 hover:bg-white/10 hover:border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer relative"
          >
            <Bell className="h-4.5 w-4.5" />
            {systemAlertsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-neon-rose text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-[0_0_8px_#ff4666]">
                {systemAlertsCount}
              </span>
            )}
          </button>

          {alertsOpen && (
            <div className="absolute right-0 mt-3 w-80 glass-panel rounded-2xl p-4 shadow-2xl z-50 border border-white/10">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/5">
                <span className="font-futuristic font-bold text-xs text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple tracking-widest uppercase">
                  SECURITY VECTOR FEEDS
                </span>
                {systemAlertsCount > 0 && (
                  <button 
                    onClick={() => {
                      onClearAlerts();
                      setAlertsOpen(false);
                    }}
                    className="text-[9px] text-slate-400 hover:text-neon-cyan uppercase font-mono cursor-pointer"
                  >
                    Resolve All
                  </button>
                )}
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {systemAlertsCount === 0 ? (
                  <div className="text-center py-4 text-xs text-slate-500 font-mono uppercase tracking-wider">
                    Zero threats active
                  </div>
                ) : (
                  <div className="text-xs text-slate-300 font-mono space-y-2.5">
                    <div className="p-2 rounded-lg bg-neon-rose/5 border border-neon-rose/20 flex gap-2">
                      <Shield className="h-4 w-4 text-neon-rose shrink-0" />
                      <div>
                        <span className="font-semibold block text-neon-rose text-[10px] uppercase">Brute Force Threat</span>
                        IP 182.42.12.9 flagged for failed attempts.
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-neon-orange/5 border border-neon-orange/20 flex gap-2">
                      <Clock className="h-4 w-4 text-neon-orange shrink-0" />
                      <div>
                        <span className="font-semibold block text-neon-orange text-[10px] uppercase">Inactivity Expire</span>
                        USR-004 session closed automatically.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen(!profileOpen);
              setAlertsOpen(false);
            }}
            className="flex items-center gap-3 p-1.5 rounded-xl border border-white/5 hover:border-white/10 bg-white/3 hover:bg-white/5 transition-all cursor-pointer"
          >
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={userName}
                className="w-7 h-7 rounded-full border border-white/20 object-cover shadow-[0_0_8px_rgba(255,255,255,0.1)]"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-neon-purple/20 border border-neon-purple/40 flex items-center justify-center text-neon-purple text-[10px] font-bold uppercase shadow-[0_0_8px_rgba(189,92,255,0.2)]">
                {userName.charAt(0)}
              </div>
            )}
            <span className="text-xs font-mono font-semibold hidden md:block text-slate-300 max-w-[120px] truncate">
              {userName}
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400 hidden md:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-56 glass-panel rounded-2xl p-2.5 shadow-2xl z-50 border border-white/10">
              <div className="px-3.5 py-2 border-b border-white/5 mb-2">
                <span className="font-futuristic font-bold text-xs block text-slate-200 truncate">{userName}</span>
                <span className="text-[10px] font-mono text-slate-500 block truncate mt-0.5">{userEmail}</span>
              </div>
              <div className="space-y-0.5">
                <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs font-semibold text-slate-300 hover:bg-white/5 hover:text-white transition-all cursor-pointer">
                  <User className="h-4 w-4 text-slate-500" />
                  <span>My Credentials</span>
                </button>
                <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs font-semibold text-slate-300 hover:bg-white/5 hover:text-white transition-all cursor-pointer">
                  <Terminal className="h-4 w-4 text-slate-500" />
                  <span>Terminal Logs</span>
                </button>
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs font-semibold text-neon-rose hover:bg-neon-rose/5 transition-all cursor-pointer"
                >
                  <LogOut className="h-4 w-4 text-neon-rose" />
                  <span>Terminate Key</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
