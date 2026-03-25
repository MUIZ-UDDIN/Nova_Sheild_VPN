import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldCheck, ArrowDown, ArrowUp, Clock, Zap, ChevronRight } from 'lucide-react';
import { useVpn } from '../context/VpnContext';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export default function HomePage() {
  const {
    isConnected,
    isConnecting,
    selectedServer,
    connectionTime,
    downloadSpeed,
    uploadSpeed,
    connect,
    disconnect,
  } = useVpn();
  const navigate = useNavigate();

  const handleToggle = () => {
    if (isConnecting) return;
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col relative overflow-hidden pb-24">
      {/* Background glows */}
      <div className={`absolute top-[-200px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-3xl transition-all duration-1000 ${
        isConnected ? 'bg-cyan-500/15' : 'bg-purple-500/10'
      }`} />
      <div className={`absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full blur-3xl transition-all duration-1000 ${
        isConnected ? 'bg-green-500/10' : 'bg-slate-800/20'
      }`} />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-6 pb-4">
        <Logo size="sm" />
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
          isConnected
            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
            : 'bg-slate-800/50 text-slate-400 border border-white/5'
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
          {isConnected ? 'Protected' : 'Not Protected'}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
        {/* Server Selector */}
        <button
          onClick={() => navigate('/servers')}
          className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl px-5 py-3.5 mb-10 transition-all w-full max-w-xs"
        >
          <span className="text-2xl">{selectedServer.flag}</span>
          <div className="flex-1 text-left">
            <p className="text-white font-semibold text-sm">{selectedServer.name}</p>
            <p className="text-slate-400 text-xs">{selectedServer.city} • {selectedServer.ping}ms</p>
          </div>
          <ChevronRight size={18} className="text-slate-500" />
        </button>

        {/* Power Button */}
        <div className="relative mb-10">
          {/* Outer ring animations */}
          <AnimatePresence>
            {isConnected && (
              <>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.4, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
                />
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.6, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="absolute inset-0 rounded-full border-2 border-cyan-400/20"
                />
              </>
            )}
          </AnimatePresence>

          {/* Glow behind button */}
          <div className={`absolute inset-0 rounded-full blur-2xl transition-all duration-700 ${
            isConnected ? 'bg-cyan-500/30 scale-125' : isConnecting ? 'bg-yellow-500/20 scale-110' : 'bg-purple-500/10 scale-100'
          }`} />

          {/* The button */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleToggle}
            disabled={isConnecting}
            className={`relative w-40 h-40 rounded-full flex flex-col items-center justify-center transition-all duration-500 border-2 shadow-2xl ${
              isConnected
                ? 'bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border-cyan-400/40 shadow-cyan-500/20'
                : isConnecting
                ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-400/40 shadow-yellow-500/20'
                : 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-white/10 shadow-black/30 hover:border-purple-500/30 hover:shadow-purple-500/10'
            }`}
          >
            {isConnecting ? (
              <div className="w-10 h-10 border-[3px] border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin" />
            ) : isConnected ? (
              <ShieldCheck size={44} className="text-cyan-400 mb-1" strokeWidth={1.5} />
            ) : (
              <Shield size={44} className="text-slate-400 mb-1" strokeWidth={1.5} />
            )}
            <span className={`text-xs font-bold mt-1 ${
              isConnected ? 'text-cyan-400' : isConnecting ? 'text-yellow-400' : 'text-slate-400'
            }`}>
              {isConnecting ? 'CONNECTING...' : isConnected ? 'CONNECTED' : 'TAP TO CONNECT'}
            </span>
          </motion.button>
        </div>

        {/* Connection Timer */}
        <AnimatePresence>
          {isConnected && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 mb-8"
            >
              <Clock size={14} className="text-slate-500" />
              <span className="text-slate-300 font-mono text-lg tracking-wider">{formatTime(connectionTime)}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Speed Stats */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <ArrowDown size={14} className="text-cyan-400" />
              <span className="text-slate-500 text-xs font-medium">Download</span>
            </div>
            <p className="text-white text-2xl font-bold">{isConnected ? downloadSpeed : '—'}</p>
            <p className="text-slate-500 text-xs">Mbps</p>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <ArrowUp size={14} className="text-purple-400" />
              <span className="text-slate-500 text-xs font-medium">Upload</span>
            </div>
            <p className="text-white text-2xl font-bold">{isConnected ? uploadSpeed : '—'}</p>
            <p className="text-slate-500 text-xs">Mbps</p>
          </div>
        </div>

        {/* Quick Info */}
        {isConnected && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2.5"
          >
            <Zap size={14} className="text-emerald-400" />
            <span className="text-emerald-300 text-xs font-medium">AES-256 Encryption Active</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
