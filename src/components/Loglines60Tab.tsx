import React, { useState } from 'react';
import { EPISODE_LOGLINES_60, EpisodeLogline } from '../data/dramaData';
import { Search, Flame, Zap, Sparkles, Filter, ChevronRight, Award } from 'lucide-react';

interface Loglines60TabProps {
  onSelectEpisodeForScript: (ep: EpisodeLogline) => void;
}

export const Loglines60Tab: React.FC<Loglines60TabProps> = ({ onSelectEpisodeForScript }) => {
  const [selectedArc, setSelectedArc] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyClimax, setOnlyClimax] = useState(false);

  const arcs = [
    { num: 1, title: 'Arc 1 (Ep 1-10): กำเนิดใหม่และแผนแทรกซึม' },
    { num: 2, title: 'Arc 2 (Ep 11-20): ปอกลอกคราบมนุษย์' },
    { num: 3, title: 'Arc 3 (Ep 21-30): สงครามจิตวิทยาและปมลับอดีต' },
    { num: 4, title: 'Arc 4 (Ep 31-40): การโต้กลับของประธานชั่ว' },
    { num: 5, title: 'Arc 5 (Ep 41-50): จุดจบแห่งความโลภ' },
    { num: 6, title: 'Arc 6 (Ep 51-60): บทเรียนคุณธรรมและการพิพากษา' },
  ];

  const filteredEpisodes = EPISODE_LOGLINES_60.filter((ep) => {
    const matchesArc = selectedArc === 'all' || ep.arcNumber === selectedArc;
    const matchesSearch =
      ep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ep.logline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ep.epNumber.toString() === searchQuery;
    const matchesClimax = !onlyClimax || ep.isClimax;

    return matchesArc && matchesSearch && matchesClimax;
  });

  return (
    <div className="space-y-8 py-6">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
            <span className="text-xs font-bold text-red-400 uppercase tracking-widest">Master Outline</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">โครงเรื่องย่อและ Logline ทั้ง 60 ตอน</h2>
          <p className="text-xs text-slate-400 mt-1">
            เรียงลำดับความเข้มข้นจากตอนที่ 1 ถึง 60 โดยมีจุดไคลแมกซ์พลิกผันใหญ่ทุกๆ 10 ตอน
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-xs text-center">
            <span className="text-slate-400 block text-[10px]">ตอนไคลแมกซ์</span>
            <span className="text-amber-400 font-bold text-sm">6 ตอนใหญ่</span>
          </div>
          <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-xs text-center">
            <span className="text-slate-400 block text-[10px]">ความยาวบทรวม</span>
            <span className="text-rose-400 font-bold text-sm">300 นาที (5 ชม.)</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-4 bg-slate-900/60 border border-slate-800/80 p-4 rounded-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาชื่อตอน, คำย่อ หรือ เลขตอน..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-red-600"
            />
          </div>

          {/* Climax Filter Toggle */}
          <button
            onClick={() => setOnlyClimax(!onlyClimax)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              onlyClimax
                ? 'bg-amber-950/80 text-amber-300 border border-amber-600/60 shadow-lg shadow-amber-950/50'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            <Flame className={`w-4 h-4 ${onlyClimax ? 'text-amber-400' : 'text-slate-500'}`} />
            <span>แสดงเฉพาะตอนไคลแมกซ์ (ทุก 10 ตอน)</span>
          </button>
        </div>

        {/* Arc Tabs */}
        <div className="flex space-x-2 overflow-x-auto pb-1 no-scrollbar pt-1 border-t border-slate-800/50">
          <button
            onClick={() => setSelectedArc('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedArc === 'all'
                ? 'bg-red-900/70 text-red-200 border border-red-700/50'
                : 'bg-slate-950 text-slate-400 border border-slate-800/80 hover:text-slate-200'
            }`}
          >
            ทั้งหมด (60 ตอน)
          </button>
          {arcs.map((arc) => (
            <button
              key={arc.num}
              onClick={() => setSelectedArc(arc.num)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedArc === arc.num
                  ? 'bg-red-900/70 text-red-200 border border-red-700/50'
                  : 'bg-slate-950 text-slate-400 border border-slate-800/80 hover:text-slate-200'
              }`}
            >
              {arc.title}
            </button>
          ))}
        </div>
      </div>

      {/* Episodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEpisodes.map((ep) => (
          <div
            key={ep.epNumber}
            className={`relative rounded-xl p-5 border transition-all duration-200 flex flex-col justify-between space-y-3 ${
              ep.isClimax
                ? 'bg-gradient-to-br from-amber-950/40 via-slate-900 to-red-950/40 border-amber-600/60 shadow-xl shadow-amber-950/20'
                : 'bg-slate-900/80 border-slate-800/80 hover:border-slate-700'
            }`}
          >
            {/* Climax Ribbon */}
            {ep.isClimax && (
              <div className="absolute top-3 right-3 flex items-center space-x-1 bg-amber-500/20 border border-amber-500/50 text-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full animate-pulse">
                <Flame className="w-3 h-3 text-amber-400" />
                <span>CLIMAX ตอนที่ {ep.epNumber}</span>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  ep.isClimax ? 'bg-amber-500 text-slate-950' : 'bg-red-950 text-red-400 border border-red-800/40'
                }`}>
                  EP. {ep.epNumber}
                </span>
                <span className="text-[10px] text-slate-400 font-mono uppercase truncate max-w-[150px]">
                  Arc {ep.arcNumber}
                </span>
              </div>

              <h3 className="text-base font-bold text-white leading-snug">
                {ep.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                {ep.logline}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-1 text-slate-400 text-[11px]">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>ความเข้มข้น:</span>
                <span className="font-bold text-slate-200">{ep.intensityScore}/10</span>
              </div>

              <button
                onClick={() => onSelectEpisodeForScript(ep)}
                className="flex items-center space-x-1 text-red-400 hover:text-red-300 font-semibold text-[11px] group transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                <span>เจนบทเต็ม (AI)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredEpisodes.length === 0 && (
        <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-400">
          <p>ไม่พบตอนที่ตรงกับเงื่อนไขการค้นหา</p>
        </div>
      )}
    </div>
  );
};
