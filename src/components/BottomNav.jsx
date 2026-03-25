import { Home, Globe, Settings, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const tabs = [
  { path: '/home', icon: Home, label: 'Home' },
  { path: '/servers', icon: Globe, label: 'Servers' },
  { path: '/settings', icon: Settings, label: 'Settings' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-md mx-auto">
        <div className="mx-3 mb-3 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50">
          <div className="flex items-center justify-around px-2 py-2">
            {tabs.map(({ path, icon: Icon, label }) => {
              const isActive = location.pathname === path;
              return (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-t from-cyan-500/20 to-purple-500/20 text-cyan-400'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                  <span className={`text-[10px] font-semibold ${isActive ? 'text-cyan-400' : ''}`}>
                    {label}
                  </span>
                  {isActive && (
                    <div className="absolute -bottom-0 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
