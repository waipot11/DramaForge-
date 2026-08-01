import React from 'react';
import { Film, Clapperboard, BookOpen, Sparkles, Video, Zap, Users, Bot } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'overview', label: 'ภาพรวม & คาแรคเตอร์', icon: Users },
    { id: 'loglines', label: 'โครงเรื่อง 60 ตอน', icon: BookOpen },
    { id: 'ep1', label: 'บทละคร ตอนที่ 1 (เต็ม)', icon: Clapperboard },
    { id: 'generator', label: 'AI เขียนบท (ตอน 1-60)', icon: Sparkles },
    { id: 'prompts', label: 'Midjourney & AI Prompts', icon: Video },
    { id: 'workflow', label: '🎬 6 ขั้นตอนหลักสร้างหนังสั้น', icon: Zap },
    { id: 'auto100', label: '⚡ ระบบ Automation 100%', icon: Bot, highlight: true },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-red-900/30 text-slate-100 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-rose-600 to-amber-600 flex items-center justify-center shadow-lg shadow-red-900/40">
              <Film className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg bg-gradient-to-r from-red-400 via-rose-300 to-amber-200 bg-clip-text text-transparent">
                  AI DRAMA STUDIO
                </span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-red-950/80 text-red-400 border border-red-800/40">
                  60 Episodes
                </span>
              </div>
              <p className="text-xs text-slate-400">ซีรีส์ละครคุณธรรม / ดราม่าล้างแค้น 5 นาที</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-red-900/60 to-rose-900/60 text-red-200 border border-red-700/50 shadow-md shadow-red-950/50'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/80 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-red-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile Horizontal Scroll Nav */}
        <div className="md:hidden flex space-x-2 overflow-x-auto pb-2 pt-1 no-scrollbar border-t border-slate-800/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium transition-all ${
                  isActive
                    ? 'bg-red-900/70 text-red-200 border border-red-700/50'
                    : 'text-slate-400 bg-slate-900/40 border border-slate-800/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-red-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
