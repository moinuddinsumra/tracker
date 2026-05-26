import React, { useState } from 'react';
import { Monitor, Globe, Clock, Search, AlertOctagon } from 'lucide-react';

export interface ActivityRecord {
  id: string;
  userName: string;
  userEmail: string;
  userAvatar: string | null;
  loginTime: string;
  logoutTime: string | null;
  ipAddress: string;
  device: string;
  browser: string;
  status: 'Active' | 'Logged Out' | 'Suspicious' | 'Hijack Prevented';
  duration: string;
}

interface ActivityTableProps {
  records: ActivityRecord[];
  onRevokeSession: (id: string) => void;
  isLoading?: boolean;
}

export const ActivityTable: React.FC<ActivityTableProps> = ({
  records,
  onRevokeSession,
  isLoading = false,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [tableSearch, setTableSearch] = useState<string>('');

  // Filtering records based on selection & search query
  const filteredRecords = records.filter((rec) => {
    const matchesStatus = filterStatus === 'ALL' || rec.status.toUpperCase() === filterStatus;
    const matchesSearch = 
      rec.userName.toLowerCase().includes(tableSearch.toLowerCase()) ||
      rec.userEmail.toLowerCase().includes(tableSearch.toLowerCase()) ||
      rec.ipAddress.includes(tableSearch) ||
      rec.device.toLowerCase().includes(tableSearch.toLowerCase()) ||
      rec.browser.toLowerCase().includes(tableSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: ActivityRecord['status']) => {
    switch (status) {
      case 'Active':
        return (
          <span className="bg-neon-green/10 text-neon-green border border-neon-green/30 px-2 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-widest shadow-[0_0_8px_rgba(0,240,154,0.1)]">
            Active
          </span>
        );
      case 'Suspicious':
        return (
          <span className="bg-neon-orange/10 text-neon-orange border border-neon-orange/30 px-2 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-widest animate-pulse shadow-[0_0_8px_rgba(255,155,38,0.1)]">
            Suspicious
          </span>
        );
      case 'Hijack Prevented':
        return (
          <span className="bg-neon-rose/10 text-neon-rose border border-neon-rose/30 px-2 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-widest shadow-[0_0_8px_rgba(255,70,102,0.1)]">
            Hijack Blocked
          </span>
        );
      default:
        return (
          <span className="bg-white/5 text-slate-400 border border-white/10 px-2 py-0.5 rounded-full text-[9px] uppercase font-semibold">
            Terminated
          </span>
        );
    }
  };

  return (
    <div className="glass-panel rounded-2xl overflow-hidden border border-white/5 flex flex-col h-full">
      {/* Table Filtering Controls */}
      <div className="p-5 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/2">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-neon-cyan/10 border border-neon-cyan/20 rounded-lg text-neon-cyan shadow-[0_0_8px_rgba(0,229,255,0.15)]">
            <TerminalIcon className="h-4.5 w-4.5" />
          </div>
          <h3 className="font-futuristic font-bold text-sm tracking-wider text-white uppercase">
            OPERATOR AUDIT REGISTRY
          </h3>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Internal search */}
          <div className="relative">
            <input
              type="text"
              value={tableSearch}
              onChange={(e) => setTableSearch(e.target.value)}
              placeholder="Filter list..."
              className="glass-input rounded-xl py-1.5 pl-8 pr-3 text-[10px] font-mono tracking-wider focus:outline-none w-40 placeholder-slate-600"
            />
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
          </div>

          <div className="flex border border-white/5 rounded-xl p-0.5 bg-slate-950/40">
            {['ALL', 'ACTIVE', 'SUSPICIOUS', 'TERMINATED'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-[9px] font-mono font-bold uppercase tracking-widest transition-all cursor-pointer ${
                  filterStatus === status
                    ? 'bg-neon-cyan/10 text-neon-cyan shadow-[inset_0_0_5px_rgba(0,229,255,0.1)]'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Table View */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="text-slate-400 font-mono text-[9px] border-b border-white/5 uppercase tracking-widest bg-slate-950/20">
              <th className="p-4 font-normal">Operator</th>
              <th className="p-4 font-normal">Temporal Timestamp</th>
              <th className="p-4 font-normal">Status</th>
              <th className="p-4 font-normal">Network Address</th>
              <th className="p-4 font-normal">Operating Environment</th>
              <th className="p-4 font-normal">Clearance Term</th>
              <th className="p-4 font-normal text-right">Mainframe Operations</th>
            </tr>
          </thead>
          <tbody className="text-xs text-slate-300 divide-y divide-white/2">
            {isLoading ? (
              // Loading skeletons
              Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  <td className="p-4"><div className="h-6 w-32 bg-white/5 rounded-lg"></div></td>
                  <td className="p-4"><div className="h-4 w-28 bg-white/5 rounded-lg"></div></td>
                  <td className="p-4"><div className="h-5 w-16 bg-white/5 rounded-full"></div></td>
                  <td className="p-4"><div className="h-4 w-24 bg-white/5 rounded-lg"></div></td>
                  <td className="p-4"><div className="h-4 w-20 bg-white/5 rounded-lg"></div></td>
                  <td className="p-4"><div className="h-4 w-12 bg-white/5 rounded-lg"></div></td>
                  <td className="p-4 text-right"><div className="h-6 w-16 bg-white/5 rounded-lg ml-auto"></div></td>
                </tr>
              ))
            ) : filteredRecords.length === 0 ? (
              // Empty State
              <tr>
                <td colSpan={7} className="p-12 text-center">
                  <div className="inline-flex items-center justify-center p-3 bg-neon-cyan/5 border border-neon-cyan/10 rounded-2xl mb-3 text-slate-500">
                    <AlertOctagon className="h-6 w-6" />
                  </div>
                  <span className="block text-xs font-mono uppercase tracking-widest text-slate-400">Zero entries indexed</span>
                  <span className="text-[10px] text-slate-500 font-mono block mt-1">Adjust audit search params to capture events</span>
                </td>
              </tr>
            ) : (
              filteredRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-white/2 transition-colors duration-200">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {rec.userAvatar ? (
                        <img
                          src={rec.userAvatar}
                          alt={rec.userName}
                          className="w-7 h-7 rounded-full border border-white/10 object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-neon-purple/20 border border-neon-purple/40 flex items-center justify-center text-neon-purple text-[10px] font-mono font-bold uppercase">
                          {rec.userName.charAt(0)}
                        </div>
                      )}
                      <div>
                        <span className="font-semibold block text-white text-[11px] uppercase tracking-wider">{rec.userName}</span>
                        <span className="text-[10px] font-mono text-slate-500 block truncate max-w-[160px]">{rec.userEmail}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-[10px] text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-slate-600" />
                      <div>
                        <span className="block">IN: {rec.loginTime}</span>
                        <span className="block text-slate-600">OUT: {rec.logoutTime || 'ACTIVE'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">{getStatusBadge(rec.status)}</td>
                  <td className="p-4 font-mono text-[10px] text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Globe className="h-3.5 w-3.5 text-slate-600" />
                      <span>{rec.ipAddress}</span>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-[10px] text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Monitor className="h-3.5 w-3.5 text-slate-600" />
                      <div>
                        <span className="block uppercase tracking-wider">{rec.device}</span>
                        <span className="block text-slate-600">{rec.browser}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-[10px] text-slate-400">{rec.duration}</td>
                  <td className="p-4 text-right">
                    {rec.status === 'Active' ? (
                      <button
                        onClick={() => onRevokeSession(rec.id)}
                        className="p-1.5 rounded-lg border border-neon-rose/30 bg-neon-rose/5 text-neon-rose hover:bg-neon-rose hover:text-white transition-all cursor-pointer group text-[10px] font-mono uppercase font-bold tracking-widest shadow-[0_0_10px_rgba(255,70,102,0.1)] active:scale-95"
                      >
                        Revoke Key
                      </button>
                    ) : (
                      <button
                        disabled
                        className="p-1.5 rounded-lg border border-white/5 bg-white/2 text-slate-600 text-[10px] font-mono uppercase tracking-widest cursor-not-allowed"
                      >
                        Archived
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Internal icon component for style
const TerminalIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);
