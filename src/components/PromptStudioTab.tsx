import React, { useState } from 'react';
import { CHARACTERS } from '../data/dramaData';
import { Video, Sparkles, Copy, Check, Film, Loader2, RefreshCw } from 'lucide-react';

export const PromptStudioTab: React.FC = () => {
  const [sceneInput, setSceneInput] = useState('ฉากมาดามเอวายืนกลางสายฝนหน้าคฤหาสน์หรู ชะลอมมองภพธรรมที่กำลังโดนตำรวจจับใส่กุญแจมือ');
  const [selectedChar, setSelectedChar] = useState('มาดามเอวา');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPrompts, setGeneratedPrompts] = useState<{
    midjourneyPrompt?: string;
    klingVideoPrompt?: string;
  } | null>(null);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleGeneratePrompts = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sceneDescription: sceneInput,
          characterName: selectedChar,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedPrompts(data.prompts);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 py-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-2">
        <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Video className="w-4 h-4" />
          <span>Cinematic Visual Prompt Generator</span>
        </div>
        <h2 className="text-2xl font-bold text-white">
          สตูดิโอคุมโทนภาพ & วิดีโอ AI (Midjourney / Kling / Runway / Luma)
        </h2>
        <p className="text-xs text-slate-400">
          คำสั่ง Prompt ภาษาอังกฤษ คุมโทนภาพแนว Cinematic, Cinematic lighting, Dramatic mood และรองรับคำสั่งคุมตัวละครคงที่ (Character Reference)
        </p>
      </div>

      {/* Character Ref Keyframes */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-200 tracking-wide uppercase">
          1. Character Consistency Prompts (คำสั่งคุมหน้าตัวละครหลัก):
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CHARACTERS.map((char) => (
            <div key={char.id} className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-white">{char.name}</span>
                <button
                  onClick={() => handleCopy(char.avatarPrompt, `char-${char.id}`)}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[10px] text-slate-300 flex items-center space-x-1"
                >
                  {copiedId === `char-${char.id}` ? (
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
              <p className="font-mono text-[10px] text-slate-400 leading-snug break-all bg-slate-950 p-2.5 rounded-lg border border-slate-800 select-all">
                {char.avatarPrompt}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 6 AI Tools Presets Studio */}
      <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-white tracking-wide uppercase flex items-center justify-between">
          <span>2. สร้าง Prompt ครอบคลุม 6 เครื่องมือ AI ทันที:</span>
          <span className="text-[11px] text-amber-400 font-mono font-normal">Gemini ➔ Midjourney ➔ Runway ➔ ElevenLabs ➔ Suno ➔ CapCut</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">ตัวละครหลักในฉาก:</label>
            <select
              value={selectedChar}
              onChange={(e) => setSelectedChar(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-red-600"
            >
              <option value="มาดามเอวา">มาดามเอวา (Madame Eva)</option>
              <option value="ภพธรรม">ภพธรรม (Master Phob)</option>
              <option value="คิริณ">คิริณ (Kirin)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1">รายละเอียดบรรยายฉาก:</label>
            <input
              type="text"
              value={sceneInput}
              onChange={(e) => setSceneInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-red-600"
              placeholder="เช่น ฉากกวินตราคุกเข่ากลางฝน..."
            />
          </div>
        </div>

        <button
          onClick={handleGeneratePrompts}
          disabled={isGenerating}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-lg shadow-red-950/40"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>กำลังสกัด Prompts สำหรับทั้ง 6 เครื่องมือ AI...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>สกัด Prompts สำหรับ Midjourney, Runway, ElevenLabs & Suno</span>
            </>
          )}
        </button>

        {generatedPrompts && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            {/* Step 2: Midjourney */}
            <div className="bg-slate-950 p-4 rounded-xl border border-cyan-900/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-cyan-400">🎨 2. Midjourney Image Prompt (Face Lock):</span>
                <button
                  onClick={() => handleCopy(generatedPrompts.midjourneyPrompt || '', 'gen-mj')}
                  className="text-[10px] text-slate-300 flex items-center space-x-1 hover:text-white"
                >
                  <Copy className="w-3 h-3" />
                  <span>คัดลอก</span>
                </button>
              </div>
              <p className="font-mono text-xs text-slate-300 select-all leading-relaxed">
                {generatedPrompts.midjourneyPrompt}
              </p>
            </div>

            {/* Step 3: Runway Video */}
            <div className="bg-slate-950 p-4 rounded-xl border border-purple-900/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-purple-400">🎥 3. Runway Gen-2 / Gen-3 Motion Prompt:</span>
                <button
                  onClick={() => handleCopy(generatedPrompts.klingVideoPrompt || '', 'gen-kling')}
                  className="text-[10px] text-slate-300 flex items-center space-x-1 hover:text-white"
                >
                  <Copy className="w-3 h-3" />
                  <span>คัดลอก</span>
                </button>
              </div>
              <p className="font-mono text-xs text-slate-300 select-all leading-relaxed">
                {generatedPrompts.klingVideoPrompt}
              </p>
            </div>

            {/* Step 4: ElevenLabs */}
            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-900/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-400">🎙️ 4. ElevenLabs Voice & Emotion Setting:</span>
                <button
                  onClick={() => handleCopy("Multilingual v2 | Character: " + selectedChar + " | Emotion: High Conflict, Dramatic Revenge", 'gen-vo')}
                  className="text-[10px] text-slate-300 flex items-center space-x-1 hover:text-white"
                >
                  <Copy className="w-3 h-3" />
                  <span>คัดลอก</span>
                </button>
              </div>
              <p className="font-mono text-xs text-slate-300 select-all leading-relaxed">
                Multilingual v2 | Character: {selectedChar} | Emotion: High Conflict, Dramatic Revenge, Intense Tone
              </p>
            </div>

            {/* Step 5: Suno AI BGM */}
            <div className="bg-slate-950 p-4 rounded-xl border border-rose-900/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-rose-400">🎵 5. Suno AI BGM Music Prompt:</span>
                <button
                  onClick={() => handleCopy("Cinematic dark revenge suspense theme, heavy orchestral brass, intense crescendo, 80bpm", 'gen-suno')}
                  className="text-[10px] text-slate-300 flex items-center space-x-1 hover:text-white"
                >
                  <Copy className="w-3 h-3" />
                  <span>คัดลอก</span>
                </button>
              </div>
              <p className="font-mono text-xs text-slate-300 select-all leading-relaxed">
                Cinematic dark revenge suspense theme, heavy orchestral brass, intense crescendo, 80bpm, non-copyrighted
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
