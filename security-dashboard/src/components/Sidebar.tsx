import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  ShieldAlert, 
  KeyRound, 
  MonitorSmartphone, 
  Globe, 
  BarChart3, 
  Settings, 
  LogOut,
  ShieldCheck
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'login-activity', name: 'Login Activity', icon: Activity },
    { id: 'security-logs', name: 'Security Logs', icon: ShieldAlert },
    { id: 'sessions', name: 'Sessions', icon: KeyRound },
    { id: 'devices', name: 'Devices', icon: MonitorSmartphone },
    { id: 'ip-tracking', name: 'IP Tracking', icon: Globe },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-cyber-blue/70 backdrop-blur-2xl border-r border-white/5 flex flex-col pt-24 pb-6 z-40">
      {/* Brand logo & scanlines */}
      <div className="absolute top-6 left-6 flex items-center gap-3">
        <div className="p-1.5 bg-neon-cyan/10 border border-neon-cyan/20 rounded-lg text-neon-cyan shadow-[0_0_10px_rgba(0,229,255,0.2)]">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <span className="font-futuristic font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple tracking-widest text-sm uppercase">
          AETHER_OS
        </span>
      </div>

      {/* Navigation menu list */}
      <nav className="flex-1 flex flex-col gap-1 px-4 mt-6 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                isActive 
                  ? 'bg-neon-cyan/10 text-neon-cyan border-l-2 border-neon-cyan shadow-[inset_0_0_10px_rgba(0,229,255,0.05)]' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
              }`}
            >
              {/* Glow backdrop on active item */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 to-transparent pointer-events-none"></div>
              )}
              
              <Icon className={`h-4.5 w-4.5 transition-all duration-300 ${
                isActive ? 'text-neon-cyan scale-110 filter drop-shadow-[0_0_4px_#00e5ff]' : 'text-slate-500 group-hover:text-white'
              }`} />
              
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                {item.name}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Session Logout Section */}
      <div className="px-4 pt-4 border-t border-white/5">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-neon-rose hover:bg-neon-rose/5 border border-transparent hover:border-neon-rose/20 transition-all duration-300 cursor-pointer group"
        >
          <LogOut className="h-4.5 w-4.5 text-neon-rose group-hover:scale-110 filter drop-shadow-[0_0_3px_#ff4666] transition-transform duration-200" />
          <span>Terminate Clearance</span>
        </button>
      </div>
    </aside>
  );
};
