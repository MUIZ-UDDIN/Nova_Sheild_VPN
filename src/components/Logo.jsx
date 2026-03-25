import { Shield } from 'lucide-react';

export default function Logo({ size = 'md', showText = true }) {
  const sizes = {
    sm: { icon: 20, text: 'text-lg' },
    md: { icon: 28, text: 'text-2xl' },
    lg: { icon: 40, text: 'text-4xl' },
    xl: { icon: 56, text: 'text-5xl' },
  };

  const s = sizes[size] || sizes.md;

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl blur-md opacity-60" />
        <div className="relative bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl p-2 shadow-lg">
          <Shield size={s.icon} className="text-white" strokeWidth={2.5} />
        </div>
      </div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`${s.text} font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent`}>
            Nova<span className="font-black">SHIELD</span>
          </span>
          {size !== 'sm' && (
            <span className="text-[10px] font-semibold tracking-[0.3em] text-slate-400 uppercase">
              Secure VPN
            </span>
          )}
        </div>
      )}
    </div>
  );
}
