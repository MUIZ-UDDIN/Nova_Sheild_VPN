import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Signal, Zap, Check } from 'lucide-react';
import { useVpn } from '../context/VpnContext';
import { useNavigate } from 'react-router-dom';
import AdBanner from '../components/AdBanner';

function getPingColor(ping) {
  if (ping < 30) return 'text-emerald-400';
  if (ping < 60) return 'text-yellow-400';
  if (ping < 100) return 'text-orange-400';
  return 'text-red-400';
}

function getLoadColor(load) {
  if (load < 30) return 'bg-emerald-400';
  if (load < 60) return 'bg-yellow-400';
  return 'bg-red-400';
}

export default function ServersPage() {
  const { servers, selectedServer, selectServer, isConnected, disconnect, connect } = useVpn();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const navigate = useNavigate();

  const filtered = servers
    .filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'ping') return a.ping - b.ping;
      if (sortBy === 'load') return a.load - b.load;
      return a.name.localeCompare(b.name);
    });

  const handleSelect = async (server) => {
    if (isConnected) {
      await disconnect();
    }
    selectServer(server);
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-white text-xl font-bold mb-1">Server Locations</h1>
        <p className="text-slate-400 text-xs">{servers.length} servers available worldwide</p>
      </div>

      {/* Search */}
      <div className="px-5 mb-4">
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search country, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all text-sm"
          />
        </div>
      </div>

      {/* Sort Tabs */}
      <div className="px-5 mb-4 flex gap-2">
        {[
          { key: 'name', label: 'A-Z', icon: null },
          { key: 'ping', label: 'Fastest', icon: Zap },
          { key: 'load', label: 'Least Load', icon: Signal },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setSortBy(key)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              sortBy === key
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                : 'bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10'
            }`}
          >
            {Icon && <Icon size={12} />}
            {label}
          </button>
        ))}
      </div>

      {/* Server List */}
      <div className="px-5 space-y-2">
        {filtered.map((server, i) => {
          const isSelected = selectedServer.id === server.id;
          return (
            <motion.button
              key={server.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => handleSelect(server)}
              className={`w-full flex items-center gap-3.5 p-3.5 rounded-2xl transition-all text-left ${
                isSelected
                  ? 'bg-cyan-500/10 border border-cyan-500/30'
                  : 'bg-white/[0.03] border border-white/5 hover:bg-white/[0.06]'
              }`}
            >
              <span className="text-2xl w-8 text-center">{server.flag}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-white font-semibold text-sm truncate">{server.name}</p>
                  {isSelected && <Check size={14} className="text-cyan-400 shrink-0" />}
                </div>
                <p className="text-slate-500 text-xs">{server.city}</p>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <span className={`text-xs font-mono font-bold ${getPingColor(server.ping)}`}>
                  {server.ping}ms
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${getLoadColor(server.load)}`}
                      style={{ width: `${server.load}%` }}
                    />
                  </div>
                  <span className="text-slate-500 text-[10px]">{server.load}%</span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-500 text-sm">No servers found</p>
        </div>
      )}

      {/* Ad Placement */}
      <div className="px-5 mt-4">
        <AdBanner slot="YOUR_AD_SLOT_1" format="auto" className="rounded-2xl" />
      </div>
    </div>
  );
}
