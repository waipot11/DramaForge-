import React, { useState } from 'react';
import { EPISODE_1_FULL_SCRIPT } from '../data/dramaData';
import { Film, Play, Pause, Copy, Check, Sparkles, Video, Volume2, ShieldAlert, Award } from 'lucide-react';

export const Episode1ScriptTab: React.FC = () => {
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [speakingSceneIndex, setSpeakingSceneIndex] = useState<number | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptId(id);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  const handleSpeakScene = (index: number, textToSpeak: string) => {
    if ('speechSynthesis' in window) {
      if (speakingSceneIndex === index) {
        window.speechSynthesis.cancel();
        setSpeakingSceneIndex(null);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'th-TH';
      utterance.rate = 0.95;
      utterance.onend = () => setSpeakingSceneIndex(null);
      utterance.onerror = () => setSpeakingSceneIndex(null);

      setSpeakingSceneIndex(index);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('เบราว์เซอร์ของคุณไม่รองรับ Speech Synthesis เสียงพากย์ตัวอย่าง');
    }
  };

  return (
    <div className="space-y-8 py-6 max-w-5xl mx-auto">
      {/* Header Badge */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-slate-950 border border-red-800/60 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="px-3 py-1 bg-red-900/80 border border-red-700/60 text-red-200 text-xs font-bold rounded-full">
              EPISODE 1 FULL SCRIPT (บทสคริปต์เต็ม 5 นาที)
            </span>
            <div className="flex items-center space-x-3 text-xs text-slate-300">
              <span className="bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 font-mono">
                ~{EPISODE_1_FULL_SCRIPT.wordCount} คำภาษาไทย
              </span>
              <span className="bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 font-mono text-rose-300">
                {EPISODE_1_FULL_SCRIPT.estimatedDuration}
              </span>
            </div>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
            ตอนที่ {EPISODE_1_FULL_SCRIPT.epNumber}: {EPISODE_1_FULL_SCRIPT.title}
          </h1>

          {/* Hook Opening Banner */}
          <div className="bg-red-950/80 border-l-4 border-red-500 p-4 rounded-r-xl space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>5-Second Hook Opening (ประโยคดึงดูด 5 วินาทีแรก):</span>
            </span>
            <p className="text-base md:text-lg font-bold text-white italic">
              "{EPISODE_1_FULL_SCRIPT.hookOpening}"
            </p>
          </div>
        </div>
      </div>

      {/* Script Scenes */}
      <div className="space-y-8">
        {EPISODE_1_FULL_SCRIPT.scenes.map((scene, idx) => {
          const sceneDialogueText = scene.dialogue
            .map((d) => `${d.character}: ${d.text}`)
            .join(' ');

          return (
            <div
              key={scene.sceneNumber}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-0"
            >
              {/* Scene Header */}
              <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-lg bg-red-900/80 text-red-200 border border-red-700/60 flex items-center justify-center font-bold text-sm">
                    {scene.sceneNumber}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">{scene.location}</h3>
                    <p className="text-xs text-rose-400/90 font-mono">{scene.timeOfDay}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleSpeakScene(idx, sceneDialogueText)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium transition-colors"
                >
                  <Volume2 className="w-4 h-4 text-amber-400" />
                  <span>{speakingSceneIndex === idx ? 'หยุดพากย์เสียง' : 'ลองฟังเสียงพากย์ AI'}</span>
                </button>
              </div>

              {/* Scene Content */}
              <div className="p-6 space-y-6">
                {/* Visual & Camera Direction */}
                <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 space-y-2">
                  <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                    <Film className="w-4 h-4" />
                    <span>บรรยายภาพมุมกล้อง (Visual & Camera Direction)</span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-sans">
                    {scene.visual}
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono italic">
                    Camera Direction: {scene.cameraDirection}
                  </p>
                </div>

                {/* Dialogues */}
                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    บทสนทนาตัวละคร (Dialogues):
                  </span>

                  <div className="space-y-3">
                    {scene.dialogue.map((d, dIdx) => (
                      <div
                        key={dIdx}
                        className={`p-4 rounded-xl border space-y-1.5 ${
                          d.character === 'กวินตรา' || d.character === 'มาดามเอวา'
                            ? 'bg-rose-950/20 border-rose-900/40 text-rose-100'
                            : d.character === 'ภพธรรม'
                            ? 'bg-red-950/30 border-red-900/50 text-red-100'
                            : 'bg-slate-950 border-slate-800 text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs uppercase tracking-wide text-amber-300">
                            {d.character}
                          </span>
                          {d.action && (
                            <span className="text-[11px] text-slate-400 italic">
                              ({d.action})
                            </span>
                          )}
                        </div>
                        <p className="text-sm md:text-base font-medium leading-relaxed pl-2 border-l-2 border-amber-500/40">
                          "{d.text}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6 Core Steps Prompts for Scene */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  {/* Step 2: Midjourney */}
                  <div className="bg-slate-950 border border-cyan-900/60 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-cyan-400 font-bold flex items-center space-x-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>🎨 2. Midjourney (Image & --cref)</span>
                      </span>
                      <button
                        onClick={() => handleCopy(scene.midjourneyPrompt, `mj-${idx}`)}
                        className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 text-[10px] flex items-center space-x-1"
                      >
                        {copiedPromptId === `mj-${idx}` ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">คัดลอกแล้ว</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>คัดลอก</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-[11px] font-mono text-slate-300 leading-tight select-all break-all">
                      {scene.midjourneyPrompt}
                    </p>
                  </div>

                  {/* Step 3: Runway Video */}
                  <div className="bg-slate-950 border border-purple-900/60 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-purple-400 font-bold flex items-center space-x-1">
                        <Video className="w-3.5 h-3.5" />
                        <span>🎥 3. Runway Gen-2/3 (Motion)</span>
                      </span>
                      <button
                        onClick={() => handleCopy(scene.klingVideoPrompt, `kling-${idx}`)}
                        className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 text-[10px] flex items-center space-x-1"
                      >
                        {copiedPromptId === `kling-${idx}` ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">คัดลอกแล้ว</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>คัดลอก</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-[11px] font-mono text-slate-300 leading-tight select-all break-all">
                      {scene.klingVideoPrompt}
                    </p>
                  </div>

                  {/* Step 4: ElevenLabs Voice */}
                  <div className="bg-slate-950 border border-emerald-900/60 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-emerald-400 font-bold flex items-center space-x-1">
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>🎙️ 4. ElevenLabs Voice Settings</span>
                      </span>
                      <button
                        onClick={() => handleCopy("Multilingual v2 | Emotion: High Drama, Anger & Sadness | Stability: 50%", `vo-${idx}`)}
                        className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 text-[10px] flex items-center space-x-1"
                      >
                        {copiedPromptId === `vo-${idx}` ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">คัดลอกแล้ว</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>คัดลอก</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-[11px] font-mono text-slate-300 leading-tight select-all break-all">
                      Multilingual v2 | Emotion: High Drama, Revenge & Conflict | Stability: 50% | Style Exaggeration: 25%
                    </p>
                  </div>

                  {/* Step 5: Suno AI BGM */}
                  <div className="bg-slate-950 border border-rose-900/60 rounded-xl p-3.5 space-y-2 md:col-span-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-rose-400 font-bold flex items-center space-x-1">
                        <span>🎵 5. Suno AI BGM & Sound Effect Prompt</span>
                      </span>
                      <button
                        onClick={() => handleCopy("Cinematic dark revenge suspense theme, heavy orchestral brass, dramatic crescendo", `suno-${idx}`)}
                        className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 text-[10px] flex items-center space-x-1"
                      >
                        {copiedPromptId === `suno-${idx}` ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">คัดลอกแล้ว</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>คัดลอก</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-[11px] font-mono text-slate-300 leading-tight select-all break-all">
                      Cinematic dark revenge suspense theme, heavy orchestral brass, dramatic revenge tension, 80bpm
                    </p>
                  </div>

                  {/* Step 6: CapCut Cue */}
                  <div className="bg-slate-950 border border-yellow-900/60 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-yellow-400 font-bold">✂️ 6. CapCut Edit Cue</span>
                    </div>
                    <p className="text-[11px] font-mono text-slate-300 leading-tight">
                      Layer 1: Runway Video | Layer 2: ElevenLabs VO | BGM: -15dB | Subtitle: Highlight Key Keywords
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Moral Lesson Footer */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 border border-amber-500/40 rounded-2xl p-6 text-center space-y-2 shadow-2xl">
        <Award className="w-8 h-8 text-amber-400 mx-auto" />
        <h3 className="text-sm font-bold text-amber-300 uppercase tracking-widest">
          {EPISODE_1_FULL_SCRIPT.moralLesson}
        </h3>
      </div>
    </div>
  );
};
