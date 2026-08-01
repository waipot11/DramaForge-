import React, { useState } from 'react';
import { AUTOMATION_WORKFLOW_STEPS } from '../data/dramaData';
import { Zap, CheckCircle2, Film, Sparkles, Volume2, Video, Music, Scissors, Copy, Check, Info } from 'lucide-react';

export const AutomationWorkflowTab: React.FC = () => {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const handleCopyPrompt = (text: string, stepNumber: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepNumber);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const getToolIcon = (toolName: string) => {
    if (toolName.includes('Gemini')) return Sparkles;
    if (toolName.includes('Midjourney')) return Video;
    if (toolName.includes('Runway')) return Film;
    if (toolName.includes('ElevenLabs')) return Volume2;
    if (toolName.includes('Suno')) return Music;
    if (toolName.includes('CapCut')) return Scissors;
    return Zap;
  };

  return (
    <div className="space-y-8 py-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-amber-950/80 border border-red-800/60 p-6 md:p-8 rounded-2xl space-y-3 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Film className="w-64 h-64 text-amber-400" />
        </div>

        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-900/80 border border-red-700/60 text-red-200 text-xs font-bold">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>6 CORE STEPS FOR AI SHORT FILM PRODUCTION</span>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          6 ขั้นตอนหลักในการสร้างหนังสั้นด้วย AI
        </h2>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-3xl">
          คู่มือโปรดักชันหนังสั้นระดับมืออาชีพ ด้วยเครื่องมือ AI ชั้นนำ (Gemini, Midjourney, Runway, ElevenLabs, Suno, CapCut) จากไอเดียสู่คลิปวิดีโอสมบูรณ์แบบ
        </p>
      </div>

      {/* 6 Core Tools Overview Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {[
          { name: "1. Gemini", desc: "เขียนบท & โครงเรื่อง", color: "from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-300" },
          { name: "2. Midjourney", desc: "ออกแบบภาพ & ล็อกหน้า", color: "from-cyan-500/20 to-blue-500/20 border-cyan-500/40 text-cyan-300" },
          { name: "3. Runway", desc: "แปลงภาพนิ่งเป็นวิดีโอ", color: "from-purple-500/20 to-indigo-500/20 border-purple-500/40 text-purple-300" },
          { name: "4. ElevenLabs", desc: "พากย์เสียงอารมณ์มนุษย์", color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-300" },
          { name: "5. Suno", desc: "ดนตรีประกอบไร้ลิขสิทธิ์", color: "from-rose-500/20 to-pink-500/20 border-rose-500/40 text-rose-300" },
          { name: "6. CapCut", desc: "ตัดต่อ & ใส่ซับอัตโนมัติ", color: "from-yellow-500/20 to-amber-500/20 border-yellow-500/40 text-yellow-300" },
        ].map((item, idx) => (
          <div key={idx} className={`bg-gradient-to-b ${item.color} border p-3 rounded-xl text-center space-y-1 shadow-lg`}>
            <span className="text-xs font-bold block">{item.name}</span>
            <span className="text-[10px] text-slate-400 block">{item.desc}</span>
          </div>
        ))}
      </div>

      {/* 6 Steps Timeline */}
      <div className="space-y-6">
        {AUTOMATION_WORKFLOW_STEPS.map((step) => {
          const Icon = getToolIcon(step.tool);
          return (
            <div
              key={step.step}
              className="bg-slate-900/90 border border-slate-800 hover:border-red-800/60 rounded-2xl p-6 relative overflow-hidden shadow-xl transition-all space-y-4"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="flex items-center space-x-3">
                  <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-rose-600 to-amber-600 text-white font-extrabold flex items-center justify-center text-lg shadow-lg shadow-red-950 shrink-0">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                      <span>{step.title}</span>
                    </h3>
                    <span className="text-xs text-rose-300 font-mono">หมวดหมู่: {step.toolCategory}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 bg-slate-950 border border-slate-800 px-3.5 py-1.5 rounded-xl shrink-0">
                  <Icon className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-extrabold text-amber-300">เครื่องมือหลัก: {step.tool}</span>
                </div>
              </div>

              {/* Body Content */}
              <div className="space-y-3 text-xs md:text-sm text-slate-300">
                <p className="leading-relaxed text-slate-200">{step.description}</p>

                {/* Technique Highlight */}
                <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs">
                    <Info className="w-4 h-4 text-amber-400" />
                    <span>เทคนิคสำคัญประจำขั้นตอน (Pro Technique):</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-6">
                    {step.technique}
                  </p>
                </div>

                {/* Result Box */}
                <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/60 flex items-center space-x-2 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold text-xs">ผลลัพธ์ที่ได้: {step.action}</span>
                </div>

                {/* Example Prompt Box */}
                {step.examplePrompt && (
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                        ตัวอย่าง Prompt / คำสั่งงาน ({step.tool}):
                      </span>
                      <button
                        onClick={() => handleCopyPrompt(step.examplePrompt!, step.step)}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-[10px] text-slate-200 flex items-center space-x-1.5 transition-all"
                      >
                        {copiedStep === step.step ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-semibold">คัดลอกเรียบร้อย</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-300" />
                            <span>คัดลอกคำสั่ง</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="font-mono text-[11px] text-amber-200/90 leading-relaxed break-words bg-slate-900 p-2.5 rounded-lg border border-slate-800 select-all">
                      {step.examplePrompt}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Checklist */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>สรุปขั้นตอนการประกอบร่างหนังสั้น AI (AI Short Film Assembly Checklist):</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-amber-300 block">1. ล็อก Character Consistency ใน Midjourney</span>
            <p className="text-slate-400 leading-relaxed">
              ใช้คำสั่ง <code className="text-amber-300 font-mono">--cref [URL ภาพหลัก]</code> เพื่อให้ใบหน้า เสื้อผ้า และทรงผมของตัวละครเหมือนกันในทุกช็อตตลอดทั้งเรื่อง
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-rose-300 block">2. สั่งมุมกล้องชะลออารมณ์ใน Runway</span>
            <p className="text-slate-400 leading-relaxed">
              ใช้ Runway Gen-2 / Gen-3 ปรับ Motion Strength ระดับ 3-5 สั่งการเคลื่อนไหวกล้องช้าๆ (Slow Zoom / Pan) 4-10 วินาทีเพื่อให้ดูสมจริง ไม่กระตุก
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-emerald-300 block">3. ผสานเสียงพากย์ + ดนตรี Suno ใน CapCut</span>
            <p className="text-slate-400 leading-relaxed">
              นำไฟล์เสียง ElevenLabs วางซิงค์กับคลิป Runway ปรับระดับเสียง BGM จาก Suno ลง -15dB เพื่อให้เสียงพากย์ชัดเจน และเปิด Auto Subtitles ภาษาไทย
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

