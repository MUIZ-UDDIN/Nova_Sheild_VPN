import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Wifi, Bell, Moon, Globe, Lock, Zap, Info, ChevronRight, ToggleLeft, ToggleRight, FileText, Scale } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdBanner from '../components/AdBanner';

function Toggle({ enabled, onToggle }) {
  return (
    <button onClick={onToggle} className="relative">
      {enabled ? (
        <ToggleRight size={36} className="text-cyan-400" />
      ) : (
        <ToggleLeft size={36} className="text-slate-600" />
      )}
    </button>
  );
}

function SettingItem({ icon: Icon, iconColor, label, description, children }) {
  return (
    <div className="flex items-center gap-3.5 py-3.5">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconColor}`}>
        <Icon size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium">{label}</p>
        {description && <p className="text-slate-500 text-xs mt-0.5">{description}</p>}
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const [killSwitch, setKillSwitch] = useState(true);
  const [autoConnect, setAutoConnect] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [dns, setDns] = useState('cloudflare');
  const [protocol, setProtocol] = useState('auto');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-2">
        <h1 className="text-white text-xl font-bold mb-1">Settings</h1>
        <p className="text-slate-400 text-xs">Configure your VPN experience</p>
      </div>

      {/* Security Section */}
      <div className="px-5 mt-4">
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2 px-1">Security</p>
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl px-4 divide-y divide-white/5">
          <SettingItem
            icon={Shield}
            iconColor="bg-emerald-500/15 text-emerald-400"
            label="Kill Switch"
            description="Block internet if VPN drops"
          >
            <Toggle enabled={killSwitch} onToggle={() => setKillSwitch(!killSwitch)} />
          </SettingItem>
          <SettingItem
            icon={Lock}
            iconColor="bg-purple-500/15 text-purple-400"
            label="Encryption"
            description="AES-256 Military Grade"
          >
            <span className="text-cyan-400 text-xs font-semibold">AES-256</span>
          </SettingItem>
          <SettingItem
            icon={Globe}
            iconColor="bg-blue-500/15 text-blue-400"
            label="DNS Protection"
            description="Prevent DNS leaks"
          >
            <select
              value={dns}
              onChange={(e) => setDns(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500/50"
            >
              <option value="cloudflare" className="bg-slate-900">Cloudflare</option>
              <option value="google" className="bg-slate-900">Google</option>
              <option value="custom" className="bg-slate-900">Custom</option>
            </select>
          </SettingItem>
        </div>
      </div>

      {/* Connection Section */}
      <div className="px-5 mt-6">
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2 px-1">Connection</p>
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl px-4 divide-y divide-white/5">
          <SettingItem
            icon={Wifi}
            iconColor="bg-cyan-500/15 text-cyan-400"
            label="Auto-Connect"
            description="Connect on app launch"
          >
            <Toggle enabled={autoConnect} onToggle={() => setAutoConnect(!autoConnect)} />
          </SettingItem>
          <SettingItem
            icon={Zap}
            iconColor="bg-yellow-500/15 text-yellow-400"
            label="Protocol"
            description="Connection protocol"
          >
            <select
              value={protocol}
              onChange={(e) => setProtocol(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500/50"
            >
              <option value="auto" className="bg-slate-900">Auto</option>
              <option value="wireguard" className="bg-slate-900">WireGuard</option>
              <option value="openvpn" className="bg-slate-900">OpenVPN</option>
              <option value="ikev2" className="bg-slate-900">IKEv2</option>
            </select>
          </SettingItem>
        </div>
      </div>

      {/* General Section */}
      <div className="px-5 mt-6">
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2 px-1">General</p>
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl px-4 divide-y divide-white/5">
          <SettingItem
            icon={Bell}
            iconColor="bg-orange-500/15 text-orange-400"
            label="Notifications"
            description="Connection alerts"
          >
            <Toggle enabled={notifications} onToggle={() => setNotifications(!notifications)} />
          </SettingItem>
          <SettingItem
            icon={Moon}
            iconColor="bg-indigo-500/15 text-indigo-400"
            label="Dark Mode"
            description="Always on"
          >
            <Toggle enabled={darkMode} onToggle={() => setDarkMode(!darkMode)} />
          </SettingItem>
          <SettingItem
            icon={Info}
            iconColor="bg-slate-500/15 text-slate-400"
            label="About"
            description="NovaSHIELD VPN v1.0.0"
          >
            <ChevronRight size={16} className="text-slate-600" />
          </SettingItem>
        </div>
      </div>

      {/* Legal Section */}
      <div className="px-5 mt-6">
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2 px-1">Legal</p>
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl px-4 divide-y divide-white/5">
          <button onClick={() => navigate('/privacy')} className="w-full">
            <SettingItem
              icon={FileText}
              iconColor="bg-cyan-500/15 text-cyan-400"
              label="Privacy Policy"
              description="How we handle your data"
            >
              <ChevronRight size={16} className="text-slate-600" />
            </SettingItem>
          </button>
          <button onClick={() => navigate('/terms')} className="w-full">
            <SettingItem
              icon={Scale}
              iconColor="bg-purple-500/15 text-purple-400"
              label="Terms of Service"
              description="Usage terms and conditions"
            >
              <ChevronRight size={16} className="text-slate-600" />
            </SettingItem>
          </button>
        </div>
      </div>

      {/* Ad Placement */}
      <div className="px-5 mt-6">
        <AdBanner slot="YOUR_AD_SLOT_3" format="auto" className="rounded-2xl" />
      </div>
    </div>
  );
}
