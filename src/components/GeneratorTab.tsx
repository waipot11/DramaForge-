import React, { useState } from 'react';
import { EPISODE_LOGLINES_60, EpisodeLogline, EpisodeScript } from '../data/dramaData';
import { Sparkles, Film, Loader2, Play, Copy, Check, Volume2, ShieldAlert, Sliders } from 'lucide-react';

interface GeneratorTabProps {
  initialEpisode?: EpisodeLogline | null;
}

export const GeneratorTab: React.FC<GeneratorTabProps> = ({ initialEpisode }) => {
  const [selectedEpNumber, setSelectedEpNumber] = useState<number>(initialEpisode?.epNumber || 2);
  const [customTitle, setCustomTitle] = useState<string>(initialEpisode?.title || 'ฟื้นจากความตาย');
  const [customLogline, setCustomLogline] = useState<string>(
    initialEpisode?.logline || 'ปาฏิหาริย์ใต้สายฝน! คิริณส่งทีมแพทย์ช่วยชีวิตกวินตราและยื่นข้อเสนอเปลี่ยนตัวตน'
  );
  const [customArcTitle, setCustomArcTitle] = useState<string>(
    initialEpisode?.arcTitle || 'Arc 1: กำเนิดใหม่และแผนแทรกซึม'
  );

  const [isLoading, setIsLoading] = useState(false);
  const [generatedScript, setGeneratedScript] = useState<EpisodeScript | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSelectPrebuilt = (epNum: number) => {
    const ep = EPISODE_LOGLINES_60.find((item) => item.epNumber === epNum);
    if (ep) {
      setSelectedEpNumber(ep.epNumber);
      setCustomTitle(ep.title);
      setCustomLogline(ep.logline);
      setCustomArcTitle(ep.arcTitle);
    }
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setGeneratedScript(null);

    try {
      const response = await fetch('/api/generate-episode-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          epNumber: selectedEpNumber,
          title: customTitle,
          logline: customLogline,
          arcTitle: customArcTitle,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'เกิดข้อผิดพลาดในการเจนบทด้วย Gemini AI');
      }

      setGeneratedScript(data.script);
    } catch (err: any) {
      setErrorMessage(err.message || 'ไม่สามารถติดต่อ AI Server ได้');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 py-6 max-w-5xl mx-auto">
      {/* Title */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-2">
        <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Gemini AI Scriptwriting Engine</span>
        </div>
        <h2 className="text-2xl font-bold text-white">
          เครื่องมือเขียนบทละครสั้น AI (เลือกตอน 1 - 60)
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          เลือกตอนที่ต้องการจาก 60 ตอน หรือพิมพ์ปรับแต่งเรื่องย่อเอง เพื่อให้ Gemini 3.6 Flash สร้างบทละครความยาว 5 นาที (~650 คำ) พร้อมมุมกล้องและ Prompt ภาพ/วิดีโอทันที!
        </p>
      </div>

      {/* Selector & Custom Form */}
      <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Quick Select Episode dropdown */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              เลือกตอนล่วงหน้า (1 - 60):
            </label>
            <select
              value={selectedEpNumber}
              onChange={(e) => handleSelectPrebuilt(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-red-600"
            >
              {EPISODE_LOGLINES_60.map((ep) => (
                <option key={ep.epNumber} value={ep.epNumber}>
                  ตอนที่ {ep.epNumber}: {ep.title} {ep.isClimax ? '🔥 [CLIMAX]' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Title input */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              ชื่อตอน (Title):
            </label>
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-red-600"
            />
          </div>
        </div>

        {/* Logline Textarea */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            เนื้อเรื่องย่อ (Logline):
          </label>
          <textarea
            rows={3}
            value={customLogline}
            onChange={(e) => setCustomLogline(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-red-600 resize-none"
          />
        </div>

        {/* Action Button */}
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-sm shadow-xl shadow-red-950/50 flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Gemini กำลังร่างบทละคร 5 นาที ความยาว ~650 คำ...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>สั่ง AI เขียนบทละครสั้นเต็ม ตอนที่ {selectedEpNumber}</span>
            </>
          )}
        </button>
      </div>

      {/* Error Display */}
      {errorMessage && (
        <div className="bg-red-950/80 border border-red-800 text-red-200 p-4 rounded-xl text-xs space-y-1">
          <span className="font-bold block">เกิดข้อผิดพลาด:</span>
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Generated Script Display */}
      {generatedScript && (
        <div className="space-y-8 animate-fade-in">
          <div className="bg-gradient-to-r from-red-950 via-slate-900 to-slate-950 border border-red-800/60 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-red-900/80 text-red-200 text-xs font-bold rounded-full">
                ผลลัพธ์บทละคร AI Generated (EP. {generatedScript.epNumber})
              </span>
              <button
                onClick={() =>
                  handleCopyText(JSON.stringify(generatedScript, null, 2), 'script-json')
                }
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs border border-slate-800"
              >
                {copiedId === 'script-json' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">คัดลอก JSON แล้ว</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>คัดลอกบททั้งหมด</span>
                  </>
                )}
              </button>
            </div>

            <h2 className="text-2xl font-bold text-white">
              ตอนที่ {generatedScript.epNumber}: {generatedScript.title}
            </h2>

            {/* Hook Opening */}
            <div className="bg-red-950/80 border-l-4 border-amber-500 p-4 rounded-r-xl space-y-1">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                5-Second Hook Opening (ประโยคเปิดดึงดูด):
              </span>
              <p className="text-base font-bold text-white italic">
                "{generatedScript.hookOpening}"
              </p>
            </div>
          </div>

          {/* Generated Scenes */}
          <div className="space-y-6">
            {generatedScript.scenes?.map((scene, idx) => (
              <div
                key={idx}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden p-6 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="font-bold text-sm text-red-400">
                    ฉากที่ {scene.sceneNumber || idx + 1}: {scene.location} ({scene.timeOfDay})
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl space-y-1">
                  <span className="text-amber-400 text-xs font-semibold block">บรรยายภาพมุมกล้อง:</span>
                  <p className="text-xs text-slate-200">{scene.visual}</p>
                </div>

                <div className="space-y-3">
                  <span className="text-slate-400 text-xs font-semibold block">บทสนทนา:</span>
                  {scene.dialogue?.map((d, dIdx) => (
                    <div key={dIdx} className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs space-y-1">
                      <span className="font-bold text-amber-300">{d.character} {d.action && `(${d.action})`}</span>
                      <p className="text-slate-200">"{d.text}"</p>
                    </div>
                  ))}
                </div>

                {/* 6 Steps AI Production Output Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
                  {/* Step 2: Midjourney */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-cyan-900/60 space-y-1">
                    <span className="text-cyan-400 font-bold flex items-center gap-1">
                      <span>🎨 2. Midjourney (Image & Face Lock):</span>
                    </span>
                    <p className="font-mono text-[10px] text-slate-300 select-all leading-snug">
                      {scene.midjourneyPrompt}
                    </p>
                  </div>

                  {/* Step 3: Runway Video */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-purple-900/60 space-y-1">
                    <span className="text-purple-400 font-bold flex items-center gap-1">
                      <span>🎥 3. Runway Gen-2/3 (Video Motion):</span>
                    </span>
                    <p className="font-mono text-[10px] text-slate-300 select-all leading-snug">
                      {scene.klingVideoPrompt}
                    </p>
                  </div>

                  {/* Step 4: ElevenLabs */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-emerald-900/60 space-y-1">
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <span>🎙️ 4. ElevenLabs (Voice Style & Emotion):</span>
                    </span>
                    <p className="font-mono text-[10px] text-slate-300 select-all leading-snug">
                      {scene.elevenLabsSettings || "Voice: Multilingual v2, Emotion: Dramatic Revenge, Stability: 55%"}
                    </p>
                  </div>

                  {/* Step 5: Suno BGM */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-rose-900/60 space-y-1 md:col-span-2">
                    <span className="text-rose-400 font-bold flex items-center gap-1">
                      <span>🎵 5. Suno AI (BGM & SFX Prompt):</span>
                    </span>
                    <p className="font-mono text-[10px] text-slate-300 select-all leading-snug">
                      {scene.sunoMusicPrompt || "Cinematic dark revenge suspense theme, orchestral crescendo, no copyright"}
                    </p>
                  </div>

                  {/* Step 6: CapCut */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-yellow-900/60 space-y-1">
                    <span className="text-yellow-400 font-bold flex items-center gap-1">
                      <span>✂️ 6. CapCut Edit Cue:</span>
                    </span>
                    <p className="font-mono text-[10px] text-slate-300 select-all leading-snug">
                      Timeline: Video + VO + BGM (-15dB) | Transition: Glitch/Fade | Auto Subtitle: Kanit Font
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Moral Lesson */}
          {generatedScript.moralLesson && (
            <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-6 text-center space-y-1">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider block">
                บทเรียนคุณธรรมประจำตอน
              </span>
              <p className="text-base font-bold text-white italic">
                "{generatedScript.moralLesson}"
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
