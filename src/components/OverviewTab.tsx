import React, { useState } from 'react';
import { MAIN_PLOT, CHARACTERS } from '../data/dramaData';
import { Users, Film, Award, ShieldAlert, Sparkles, Copy, Check, ChevronRight } from 'lucide-react';

interface OverviewTabProps {
  onSelectTab: (tab: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ onSelectTab }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-10 py-6">
      {/* Hero Banner Section */}
      <div className="relative rounded-2xl overflow-hidden border border-red-900/40 bg-gradient-to-br from-slate-950 via-slate-900 to-red-950/40 p-6 md:p-10 shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/50 text-red-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>โครงเรื่องซีรีส์ละครสั้น 60 ตอน (ตอนละ 5 นาที)</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {MAIN_PLOT.title}
          </h1>
          <p className="text-sm md:text-base text-rose-300/80 font-mono tracking-wide">
            {MAIN_PLOT.englishTitle}
          </p>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed pt-2">
            {MAIN_PLOT.synopsis}
          </p>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80 text-xs">
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
              <span className="text-slate-400 block">จำนวนตอนทั้งหมด</span>
              <span className="text-lg font-bold text-red-400">{MAIN_PLOT.totalEpisodes} ตอน (จบในตอน)</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
              <span className="text-slate-400 block">ความยาวต่อตอน</span>
              <span className="text-lg font-bold text-rose-300">{MAIN_PLOT.episodeDuration}</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
              <span className="text-slate-400 block">แนวเรื่องหลัก</span>
              <span className="text-sm font-semibold text-amber-300">{MAIN_PLOT.genre}</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
              <span className="text-slate-400 block">จุดไคลแมกซ์</span>
              <span className="text-sm font-semibold text-emerald-400">ทุกๆ 10 ตอน (6 ไคลแมกซ์ใหญ่)</span>
            </div>
          </div>

          {/* Quick Nav Actions */}
          <div className="flex flex-wrap gap-3 pt-4">
            <button
              onClick={() => onSelectTab('ep1')}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-medium text-xs shadow-lg shadow-red-900/40 transition-all transform hover:-translate-y-0.5"
            >
              <Film className="w-4 h-4" />
              <span>อ่านบทละครสั้น ตอนที่ 1 (เต็ม)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectTab('loglines')}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-medium text-xs transition-all"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>ดูโครงเรื่องย่อ 60 ตอน</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Moral Lesson Box */}
      <div className="bg-gradient-to-r from-red-950/60 via-slate-900 to-amber-950/40 border border-red-800/40 rounded-xl p-5 flex items-start space-x-4 shadow-lg">
        <div className="p-3 bg-red-900/50 rounded-lg text-amber-300 border border-red-700/50 shrink-0">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-amber-200 uppercase tracking-wider">แก่นความคิดละครคุณธรรม (Moral Core Theme)</h3>
          <p className="text-slate-200 font-serif italic text-base md:text-lg mt-1">
            "{MAIN_PLOT.moralTheme}"
          </p>
        </div>
      </div>

      {/* 3 Main Characters Cards */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-red-900/50 border border-red-700/50 flex items-center justify-center text-red-400">
            <Users className="w-4 h-4" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-wide">
            ตัวละครหลัก 3 คนที่มีบุคลิกชัดเจน (Character Profiles)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CHARACTERS.map((char) => (
            <div
              key={char.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-red-800/60 transition-all duration-300 flex flex-col shadow-xl"
            >
              {/* Character Image Header */}
              <div className="relative h-64 overflow-hidden group">
                <img
                  src={char.imagePlaceholder}
                  alt={char.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute top-3 left-3 bg-red-950/90 text-red-300 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-red-800/60">
                  {char.role}
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-lg font-bold text-white leading-tight">{char.name}</h3>
                  <p className="text-xs text-rose-300 font-mono">อายุ {char.age} ปี</p>
                </div>
              </div>

              {/* Character Details */}
              <div className="p-5 space-y-4 text-xs flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div>
                    <span className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider">รูปลักษณ์ & บุคลิก</span>
                    <p className="text-slate-200 mt-0.5 leading-relaxed">{char.appearance}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider">นิสัย & จุดเด่น</span>
                    <p className="text-slate-300 mt-0.5 leading-relaxed">{char.personality}</p>
                  </div>
                  <div>
                    <span className="text-amber-400/90 font-semibold block text-[11px] uppercase tracking-wider">แรงจูงใจหลัก (Motive)</span>
                    <p className="text-slate-200 mt-0.5 leading-relaxed">{char.motive}</p>
                  </div>
                </div>

                {/* Character AI Prompt Copy */}
                <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 space-y-2 mt-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-rose-400 font-semibold flex items-center space-x-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Midjourney Character Prompt</span>
                    </span>
                    <button
                      onClick={() => handleCopy(char.avatarPrompt, char.id)}
                      className="flex items-center space-x-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    >
                      {copiedId === char.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">คัดลอกแล้ว</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>คัดลอก Prompt</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono leading-tight break-all line-clamp-3 select-all">
                    {char.avatarPrompt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
