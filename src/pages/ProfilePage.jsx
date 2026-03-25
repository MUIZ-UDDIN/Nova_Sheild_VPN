import { motion } from 'framer-motion';
import { User, Shield, Clock, Database, MapPin, Sparkles, ExternalLink } from 'lucide-react';
import { useVpn } from '../context/VpnContext';
import { useNavigate } from 'react-router-dom';
import AdBanner from '../components/AdBanner';

export default function ProfilePage() {
  const { isConnected, selectedServer, dataUsed, connectionTime } = useVpn();
  const navigate = useNavigate();

  const stats = [
    { label: 'Data Used', value: dataUsed > 0 ? `${dataUsed.toFixed(1)} MB` : '0 MB', icon: Database, color: 'text-cyan-400 bg-cyan-500/15' },
    { label: 'Current Server', value: isConnected ? selectedServer.city : 'None', icon: MapPin, color: 'text-purple-400 bg-purple-500/15' },
    { label: 'Sessions Today', value: '1', icon: Clock, color: 'text-yellow-400 bg-yellow-500/15' },
    { label: 'Security Level', value: 'Maximum', icon: Shield, color: 'text-emerald-400 bg-emerald-500/15' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-white text-xl font-bold mb-1">Profile</h1>
        <p className="text-slate-400 text-xs">Your VPN activity</p>
      </div>

      {/* User Card */}
      <div className="px-5 mb-6">
        <div className="bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-slate-900/50 border border-white/10 rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
          <div className="relative flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <User size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Free User</h2>
              <div className="flex items-center gap-1.5 mt-1">
                <Sparkles size={12} className="text-cyan-400" />
                <span className="text-cyan-400 text-xs font-semibold">Unlimited Access</span>
              </div>
            </div>
          </div>

          {/* Plan Badge */}
          <div className="mt-4 bg-white/5 rounded-xl p-3.5 flex items-center justify-between">
            <div>
              <p className="text-white text-sm font-semibold">Free Plan</p>
              <p className="text-slate-400 text-xs">All servers • Unlimited bandwidth</p>
            </div>
            <div className="bg-emerald-500/15 text-emerald-400 px-3 py-1 rounded-lg text-xs font-bold">
              ACTIVE
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-5 mb-6">
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-3 px-1">Activity</p>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white/[0.03] border border-white/5 rounded-2xl p-4"
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
                <stat.icon size={16} />
              </div>
              <p className="text-white font-bold text-base">{stat.value}</p>
              <p className="text-slate-500 text-xs mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="px-5">
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-3 px-1">Your Features</p>
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl divide-y divide-white/5">
          {[
            { emoji: '🔒', label: 'AES-256 Encryption', desc: 'Military-grade security' },
            { emoji: '🌍', label: '20+ Server Locations', desc: 'Worldwide coverage' },
            { emoji: '⚡', label: 'No Speed Limits', desc: 'Full bandwidth always' },
            { emoji: '🛡️', label: 'No-Log Policy', desc: 'Your data stays private' },
            { emoji: '📱', label: 'All Devices', desc: 'Use on any platform' },
          ].map((feature) => (
            <div key={feature.label} className="flex items-center gap-3.5 px-4 py-3.5">
              <span className="text-lg">{feature.emoji}</span>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{feature.label}</p>
                <p className="text-slate-500 text-xs">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ad Placement */}
      <div className="px-5 mt-6">
        <AdBanner slot="YOUR_AD_SLOT_2" format="auto" className="rounded-2xl" />
      </div>

      {/* Legal Links */}
      <div className="px-5 mt-6">
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-3 px-1">Legal</p>
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl divide-y divide-white/5">
          <button onClick={() => navigate('/privacy')} className="w-full flex items-center justify-between px-4 py-3.5 text-left">
            <span className="text-white text-sm font-medium">Privacy Policy</span>
            <ExternalLink size={14} className="text-slate-500" />
          </button>
          <button onClick={() => navigate('/terms')} className="w-full flex items-center justify-between px-4 py-3.5 text-left">
            <span className="text-white text-sm font-medium">Terms of Service</span>
            <ExternalLink size={14} className="text-slate-500" />
          </button>
        </div>
      </div>

      {/* Version */}
      <div className="text-center mt-8 px-5">
        <p className="text-slate-600 text-xs">NovaSHIELD VPN v1.0.0</p>
        <p className="text-slate-700 text-[10px] mt-1">Made with ❤️ for a secure internet</p>
      </div>
    </div>
  );
}
