import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Activity, 
  ShieldAlert, 
  Globe, 
  ShieldCheck, 
  TrendingUp, 
  Terminal, 
  Server,
  Lock,
  Unlock
} from 'lucide-react';

// Subcomponents and Pages
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { StatCard } from './components/StatCard';
import { ActivityTable } from './components/ActivityTable';
import type { ActivityRecord } from './components/ActivityTable';
import { LiveFeed } from './components/LiveFeed';
import type { FeedEvent } from './components/LiveFeed';
import { AnalyticsCharts } from './components/AnalyticsCharts';
import { SecurityPanel } from './components/SecurityPanel';
import { Modal } from './components/Modal';
import { Toast } from './components/Toast';
import type { ToastMessage } from './components/Toast';

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';

// Primary Mock Data Sets representing initial states
const initialActivityRecords: ActivityRecord[] = [
  {
    id: 'rec-001',
    userName: 'Moinuddin Sumra',
    userEmail: 'mnddnsumra1@gmail.com',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=256&auto=format&fit=crop',
    loginTime: '2026-05-26 14:12:05',
    logoutTime: null,
    ipAddress: '127.0.0.1:8000',
    device: 'MacBook Pro',
    browser: 'Chrome 125',
    status: 'Active',
    duration: '01h 18m'
  },
  {
    id: 'rec-002',
    userName: 'Agent Admin',
    userEmail: 'admin@aether.io',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop',
    loginTime: '2026-05-26 13:42:10',
    logoutTime: null,
    ipAddress: '192.168.1.105',
    device: 'IMac 24',
    browser: 'Safari 17.4',
    status: 'Active',
    duration: '01h 48m'
  },
  {
    id: 'rec-003',
    userName: 'operator_alpha',
    userEmail: 'alpha@core.sys',
    userAvatar: null,
    loginTime: '2026-05-26 14:28:10',
    logoutTime: null,
    ipAddress: '198.51.100.42',
    device: 'Linux Workstation',
    browser: 'Firefox Developer Edition',
    status: 'Suspicious',
    duration: '00h 02m'
  },
  {
    id: 'rec-004',
    userName: 'guest_user',
    userEmail: 'guest@aether.io',
    userAvatar: null,
    loginTime: '2026-05-26 13:50:12',
    logoutTime: '2026-05-26 13:58:33',
    ipAddress: '192.0.2.14',
    device: 'iPad Pro',
    browser: 'Safari Mobile',
    status: 'Logged Out',
    duration: '00h 08m'
  },
  {
    id: 'rec-005',
    userName: 'brute_force_bot',
    userEmail: 'hacker@darkweb.org',
    userAvatar: null,
    loginTime: '2026-05-26 14:02:11',
    logoutTime: '2026-05-26 14:02:12',
    ipAddress: '203.0.113.88',
    device: 'Unknown Server',
    browser: 'Curl Protocol',
    status: 'Hijack Prevented',
    duration: '00h 00m'
  }
];

const initialLiveFeedEvents: FeedEvent[] = [
  { id: '1', type: 'LOGIN', userName: 'Moinuddin Sumra', timestamp: '14:12:05', ip: '127.0.0.1' },
  { id: '2', type: 'LOGIN', userName: 'Agent Admin', timestamp: '13:42:10', ip: '192.168.1.105' },
  { id: '3', type: 'LOGIN', userName: 'operator_alpha', timestamp: '14:28:10', ip: '198.51.100.42' },
  { id: '4', type: 'LOGOUT', userName: 'guest_user', timestamp: '13:58:33', ip: '192.0.2.14' },
  { id: '5', type: 'HIJACK_BLOCKED', userName: 'brute_force_bot', timestamp: '14:02:12', ip: '203.0.113.88' }
];

export default function App() {
  // Page view routing state
  const [currentPage, setCurrentPage] = useState<'login' | 'register' | 'forgot-password' | 'dashboard'>('login');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  
  // Auth state
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
    avatar: string | null;
  } | null>(null);

  // App core state
  const [records, setRecords] = useState<ActivityRecord[]>(initialActivityRecords);
  const [feedEvents, setFeedEvents] = useState<FeedEvent[]>(initialLiveFeedEvents);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [alertsCount, setAlertsCount] = useState<number>(3);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Auto Logout Timers (inactivity triggers)
  const [activeSessionTime, setActiveSessionTime] = useState<number>(120);
  const [isSystemLoading, setIsSystemLoading] = useState<boolean>(false);
  const [revokeTarget, setRevokeTarget] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // Statistics calculation helpers
  const totalUsers = records.filter(r => r.status !== 'Hijack Prevented').length;
  const totalAttempts = records.length + 8; // Including initial failures
  const activeSessions = records.filter(r => r.status === 'Active' || r.status === 'Suspicious').length;
  const failedLogins = records.filter(r => r.status === 'Hijack Prevented').length + 3;
  const uniqueIPs = new Set(records.map(r => r.ipAddress.split(':')[0])).size;
  const oauthUsers = records.filter(r => r.userName.includes('Moinuddin') || r.userName.includes('Google')).length;
  const todayLogins = records.filter(r => r.loginTime.includes('2026-05-26')).length;
  const autoLogouts = records.filter(r => r.status === 'Logged Out').length;

  // Handle successful login verification
  const handleLoginSuccess = (name: string, email: string, avatar: string | null) => {
    setIsSystemLoading(true);
    
    // Smooth cold-boot animation transition
    setTimeout(() => {
      setCurrentUser({ name, email, avatar });
      setCurrentPage('dashboard');
      setIsSystemLoading(false);
      
      // Inject greeting toast
      pushToast('SUCCESS', 'Handshake Confirmed', `Clearance Level: LEVEL_5. Welcome back, Agent ${name}.`);
      
      // Reset inactivity counter
      setActiveSessionTime(120);
    }, 1200);
  };

  // Terminate active operator session
  const handleLogout = useCallback(() => {
    setCurrentPage('login');
    setCurrentUser(null);
    setActiveTab('dashboard');
    setToasts([]);
  }, []);

  // Dispatch toasts alerts
  const pushToast = useCallback((type: ToastMessage['type'], title: string, message: string) => {
    const newToast: ToastMessage = {
      id: Math.random().toString(),
      type,
      title,
      message
    };
    setToasts((prev) => [newToast, ...prev].slice(0, 3)); // Max 3 toasts
    if (type === 'ALERT' || type === 'WARNING') {
      setAlertsCount((c) => c + 1);
    }
  }, []);

  const handleCloseToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Revoke target active connection
  const handleRevokeSession = (id: string) => {
    setRevokeTarget(id);
    setModalOpen(true);
  };

  const confirmRevokeSession = () => {
    if (!revokeTarget) return;

    setRecords((prev) =>
      prev.map((rec) =>
        rec.id === revokeTarget
          ? {
              ...rec,
              status: 'Logged Out',
              logoutTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
              duration: '01h 50m'
            }
          : rec
      )
    );

    const revokedUser = records.find(r => r.id === revokeTarget);
    pushToast('WARNING', 'Connection Revoked', `Operator key revoked for: ${revokedUser?.userName || 'Active Node'}`);
    setModalOpen(false);
    setRevokeTarget(null);
  };

  // Clear pending top alerts
  const handleClearAlerts = () => {
    setAlertsCount(0);
    pushToast('INFO', 'Vector Logs Cleared', 'Active warning matrix has been successfully cataloged.');
  };

  // Monitor screen clicks/keys to reset automatic logout countdown
  useEffect(() => {
    if (currentPage !== 'dashboard') return;

    const resetTimer = () => {
      setActiveSessionTime(120);
    };

    const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(name => {
      window.addEventListener(name, resetTimer, { passive: true });
    });

    const interval = setInterval(() => {
      setActiveSessionTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleLogout();
          return 120;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      events.forEach(name => {
        window.removeEventListener(name, resetTimer);
      });
      clearInterval(interval);
    };
  }, [currentPage, handleLogout]);

  // Simulate real-time security events telemetry
  useEffect(() => {
    if (currentPage !== 'dashboard') return;

    const interval = setInterval(() => {
      const mockNames = ['Agent Smith', 'Security Bot', 'root_shell', 'Google User 8', 'Guest Node 3'];
      const mockEmails = ['smith@aether.io', 'sec-bot@nodes.sys', 'root@localhost', 'oauth8@gmail.com', 'guest3@aether.io'];
      const mockIPs = ['192.168.1.42', '10.0.0.8', '127.0.0.1', '198.51.100.99', '203.0.113.111'];
      const mockBrowsers = ['Chrome 125', 'Firefox 126', 'Safari 17.5', 'Curl 8.2', 'Wget 1.2'];
      
      const randIdx = Math.floor(Math.random() * mockNames.length);
      const isGoogle = randIdx === 3;
      
      // Randomly trigger standard logins or threat blockages
      const triggerType = Math.random();
      
      if (triggerType > 0.6) {
        // Successful login
        const newRecord: ActivityRecord = {
          id: `rec-${Math.random().toString().slice(2, 5)}`,
          userName: mockNames[randIdx],
          userEmail: mockEmails[randIdx],
          userAvatar: isGoogle ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop' : null,
          loginTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
          logoutTime: null,
          ipAddress: mockIPs[randIdx],
          device: Math.random() > 0.5 ? 'Windows Workstation' : 'MacBook Pro',
          browser: mockBrowsers[randIdx],
          status: 'Active',
          duration: '00h 01m'
        };

        setRecords(prev => [newRecord, ...prev]);
        setFeedEvents(prev => [
          {
            id: Math.random().toString(),
            type: 'LOGIN' as const,
            userName: mockNames[randIdx],
            timestamp: new Date().toLocaleTimeString(),
            ip: mockIPs[randIdx]
          },
          ...prev
        ].slice(0, 8));

        pushToast('SUCCESS', 'Handshake OK', `Authorized login index generated for ${mockNames[randIdx]}.`);
      } else if (triggerType > 0.3) {
        // Threat Alert Blocked
        const newRecord: ActivityRecord = {
          id: `rec-${Math.random().toString().slice(2, 5)}`,
          userName: 'INTRUDER_BOT',
          userEmail: 'unknown@threat.net',
          userAvatar: null,
          loginTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
          logoutTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
          ipAddress: '198.51.100.222',
          device: 'Botnet Cluster',
          browser: 'Raw Socket API',
          status: 'Hijack Prevented',
          duration: '00h 00m'
        };

        setRecords(prev => [newRecord, ...prev]);
        setFeedEvents(prev => [
          {
            id: Math.random().toString(),
            type: 'HIJACK_BLOCKED' as const,
            userName: 'INTRUDER_BOT',
            timestamp: new Date().toLocaleTimeString(),
            ip: '198.51.100.222'
          },
          ...prev
        ].slice(0, 8));

        pushToast('ALERT', 'Threat Shield Triggered', 'Unauthorized hijack attempt blocked from Shenzhen subnet.');
      } else {
        // Auto-logout event
        setRecords(prev => {
          const activeOnes = prev.filter(r => r.status === 'Active');
          if (activeOnes.length === 0) return prev;
          const target = activeOnes[Math.floor(Math.random() * activeOnes.length)];
          return prev.map(r => r.id === target.id ? {
            ...r,
            status: 'Logged Out',
            logoutTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
            duration: '00h 05m'
          } : r);
        });

        setFeedEvents(prev => [
          {
            id: Math.random().toString(),
            type: 'LOGOUT' as const,
            userName: 'System Daemon',
            timestamp: new Date().toLocaleTimeString(),
            ip: '127.0.0.1'
          },
          ...prev
        ].slice(0, 8));

        pushToast('WARNING', 'Inactivity Logout', 'Terminal boundary limit crossed. Connection terminated.');
      }

    }, 8000);

    return () => clearInterval(interval);
  }, [currentPage, pushToast, records]);

  // Navigate routing gate
  const handleNavigate = (page: 'login' | 'register' | 'forgot-password' | 'dashboard') => {
    setCurrentPage(page);
  };

  return (
    <div className="relative min-h-screen bg-cyber-dark text-slate-100 overflow-x-hidden">
      
      {/* Skeletons and boot sequences loading screen */}
      {isSystemLoading && (
        <div className="fixed inset-0 bg-cyber-dark z-50 flex flex-col items-center justify-center font-mono">
          <div className="absolute inset-0 cyber-grid z-0 opacity-20"></div>
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, 90, 180, 270, 360] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-12 h-12 border-2 border-neon-cyan border-t-transparent rounded-full shadow-[0_0_15px_#00e5ff]"
          ></motion.div>
          <span className="block mt-6 text-xs uppercase tracking-widest text-neon-cyan neon-text-cyan animate-pulse">
            LOADING SECURITY INFRASTRUCTURE DATABASE...
          </span>
          <span className="block text-[10px] text-slate-500 mt-2">
            STITCH MCP SYSTEM INITIALIZED • AETHER OS SECURE GATEWAY
          </span>
        </div>
      )}

      {/* Pages switcher Routing Gate */}
      {currentPage === 'login' && (
        <Login onLoginSuccess={handleLoginSuccess} onNavigate={handleNavigate} />
      )}
      {currentPage === 'register' && (
        <Register onNavigate={handleNavigate} />
      )}
      {currentPage === 'forgot-password' && (
        <ForgotPassword onNavigate={handleNavigate} />
      )}

      {currentPage === 'dashboard' && currentUser && (
        <div className="relative z-10 flex flex-col min-h-screen bg-cyber-blue/20">
          {/* Laser grids ambient overlays */}
          <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none z-0"></div>
          <div className="absolute inset-0 cyber-grid-dense opacity-10 pointer-events-none z-0"></div>
          <div className="absolute top-[20%] left-[20%] w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
          <div className="absolute bottom-[20%] right-[20%] w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

          {/* Components Layout */}
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
          
          <div className="flex-1 flex flex-col pt-24 pb-12 md:pl-72 pr-8 pl-8 z-10">
            <Navbar 
              userName={currentUser.name}
              userEmail={currentUser.email}
              userAvatar={currentUser.avatar}
              activeSessionTime={activeSessionTime}
              onLogout={handleLogout}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              systemAlertsCount={alertsCount}
              onClearAlerts={handleClearAlerts}
            />

            {/* Dashboard Content routing tab switch */}
            {activeTab === 'dashboard' ? (
              <main className="flex-col flex gap-8">
                
                {/* Dashboard Metrics Widget Cards */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard
                    title="Total Operators"
                    value={totalUsers}
                    icon={Users}
                    trend="+12%"
                    trendType="positive"
                    description="Clearance Verified Users"
                    colorType="cyan"
                  />
                  <StatCard
                    title="Handshake Hits"
                    value={totalAttempts}
                    icon={Activity}
                    trend="+42.4%"
                    trendType="positive"
                    description="Login Handshake Attempts"
                    colorType="purple"
                  />
                  <StatCard
                    title="Active Gateways"
                    value={activeSessions}
                    icon={Unlock}
                    trend="Stable"
                    trendType="neutral"
                    description="Current Open Connections"
                    colorType="green"
                  />
                  <StatCard
                    title="Hijacks Shielded"
                    value={failedLogins}
                    icon={ShieldAlert}
                    trend="+5.4%"
                    trendType="negative"
                    description="Brute Force Lockouts"
                    colorType="rose"
                  />
                  <StatCard
                    title="Unique IPS"
                    value={uniqueIPs}
                    icon={Globe}
                    trend="+2.1%"
                    trendType="positive"
                    description="Verified Gateway Nodes"
                    colorType="cyan"
                  />
                  <StatCard
                    title="Google OAuth Logins"
                    value={oauthUsers}
                    icon={ShieldCheck}
                    trend="+18%"
                    trendType="positive"
                    description="Verified Google Tokens"
                    colorType="purple"
                  />
                  <StatCard
                    title="Logins Today"
                    value={todayLogins}
                    icon={TrendingUp}
                    trend="+14.5%"
                    trendType="positive"
                    description="Temporal Cycle Access"
                    colorType="orange"
                  />
                  <StatCard
                    title="Auto close Logs"
                    value={autoLogouts}
                    icon={Server}
                    trend="+8%"
                    trendType="neutral"
                    description="Inactivity closures"
                    colorType="rose"
                  />
                </section>

                {/* Analytical Charts and vectors */}
                <section>
                  <AnalyticsCharts />
                </section>

                {/* Database logs & scrolling feed grid */}
                <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
                  <div className="xl:col-span-2 h-[350px]">
                    <ActivityTable
                      records={records}
                      onRevokeSession={handleRevokeSession}
                      isLoading={false}
                    />
                  </div>
                  <div>
                    <LiveFeed events={feedEvents} />
                  </div>
                </section>

                {/* Threat monitor warning desk */}
                <section>
                  <SecurityPanel />
                </section>

              </main>
            ) : (
              // Empty State for non-dashboard tabs to maintain front-end visual completeness
              <div className="flex-1 flex flex-col items-center justify-center py-20 border border-white/5 bg-white/2 rounded-2xl glass-panel relative overflow-hidden">
                <div className="scanner-line"></div>
                <div className="inline-flex items-center justify-center p-4 bg-neon-cyan/5 border border-neon-cyan/20 rounded-2xl text-neon-cyan mb-4 shadow-[0_0_15px_rgba(0,229,255,0.15)] animate-pulse">
                  <Terminal className="h-8 w-8" />
                </div>
                <h3 className="font-futuristic font-bold text-lg text-white uppercase tracking-wider">
                  NODE SEGMENT INDEXING: {activeTab.replace('-', ' ').toUpperCase()}
                </h3>
                <p className="text-xs text-slate-500 font-mono tracking-widest uppercase mt-2">
                  SOC Central Command Terminal Blocked
                </p>
                <div className="mt-6 flex gap-4 text-[10px] font-mono uppercase tracking-widest text-slate-400">
                  <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" /> SECURE HANDSHAKE OK</span>
                  <span className="flex items-center gap-1.5"><Server className="h-3.5 w-3.5" /> AGENT SEGMENT PROTECTED</span>
                </div>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="cyber-btn bg-neon-cyan hover:bg-neon-cyan/90 text-slate-950 px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-[10px] mt-8 cursor-pointer shadow-[0_0_15px_rgba(0,229,255,0.3)] active:scale-95 transition-transform"
                >
                  Return to System Monitor
                </button>
              </div>
            )}
          </div>

          {/* Secure modals logic */}
          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title="CONFIRM SESSION REVOCATION"
            onConfirm={confirmRevokeSession}
            confirmText="Revoke Operator Access"
            type="danger"
          >
            <p className="mb-2">
              WARNING: You are about to initiate a terminal disconnection protocol.
            </p>
            <p className="text-slate-400">
              Revoking this credential signature will instantly terminate the active session and invalidate all secure session cookies. The target operator will be returned to the logon portal immediately.
            </p>
          </Modal>

          {/* Floating real-time sliding Toast container */}
          <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50 pointer-events-none">
            <AnimatePresence>
              {toasts.map((toast) => (
                <Toast key={toast.id} toast={toast} onClose={handleCloseToast} />
              ))}
            </AnimatePresence>
          </div>

        </div>
      )}
    </div>
  );
}
