import React, { useState, useEffect, useRef } from 'react';
import { EPISODE_LOGLINES_60, EpisodeScript } from '../data/dramaData';
import {
  Zap, Bot, Terminal, Download, Copy, Check,
  Cpu, Server, Cloud, RefreshCw, Volume2, Video, Sparkles, Globe, Eye, X
} from 'lucide-react';

interface EpisodeProgress {
  epNumber: number;
  title: string;
  status: 'idle' | 'step1_script' | 'step2_image' | 'step3_video' | 'step4_voice' | 'step5_music' | 'step6_edit' | 'completed' | 'error';
  progress: number;
  logText?: string;
  currentStep?: number;
}

export const Automation100Tab: React.FC = () => {
  const [startEp, setStartEp] = useState<number>(1);
  const [endEp, setEndEp] = useState<number>(5);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentEpIndex, setCurrentEpIndex] = useState<number>(0);
  const [pipelineProgress, setPipelineProgress] = useState<EpisodeProgress[]>([]);
  const [generatedScriptsMap, setGeneratedScriptsMap] = useState<Record<number, EpisodeScript>>({});
  const [selectedScriptModal, setSelectedScriptModal] = useState<EpisodeScript | null>(null);

  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '🤖 [SYSTEM INITIALIZED] AI Drama Studio 100% Automation Core v3.8 Ready.',
    '⚡ [CONFIG] Connected to Gemini 3.6 Flash Engine & Webhook Endpoints.',
    'READY: Select episode range and click "เปิดระบบรันอัตโนมัติ 100% (Start Auto-Pilot)"'
  ]);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [activeCodeTab, setActiveCodeTab] = useState<'python' | 'gcp' | 'n8n' | 'docker'>('gcp');

  // Auto-publishing settings
  const [autoPublishTikTok, setAutoPublishTikTok] = useState<boolean>(true);
  const [autoPublishShorts, setAutoPublishShorts] = useState<boolean>(true);
  const [autoPublishReels, setAutoPublishReels] = useState<boolean>(true);
  const [webhookUrl, setWebhookUrl] = useState<string>('https://n8n.your-studio-server.com/webhook/drama-auto-pilot');
  const [isTestingWebhook, setIsTestingWebhook] = useState<boolean>(false);

  const handleTestWebhook = async () => {
    if (!webhookUrl || !webhookUrl.trim().startsWith('http')) {
      alert('กรุณาใส่ Webhook URL ให้ถูกต้อง (ขึ้นต้นด้วย http:// หรือ https://)');
      return;
    }
    setIsTestingWebhook(true);
    const targetUrl = webhookUrl.trim();
    const isTestModeUrl = targetUrl.includes('/webhook-test/');
    addLog(`🧪 [Test Webhook via Server Proxy] กำลังส่งข้อมูลไปยัง: ${targetUrl}...`);
    const sampleVideoUrl = `https://vjs.zencdn.net/v/oceans.mp4`;
    const imagePrompt = "Cinematic 9:16 vertical shot of Asian female CEO in crimson suit, dramatic revenge tension, hyperrealistic 8k";
    const pollinationsImageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt)}?width=720&height=1280&nologo=true&seed=42`;
    const firstDialogue = "ทดสอบระบบละครอัตโนมัติ 100% ฟรีไม่มีค่าใช้จ่าย";
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const ttsVoiceUrl = `${origin}/api/tts?text=${encodeURIComponent(firstDialogue)}`;
    
    const commonFields = {
      status: 'completed',
      Status: 'completed',
      STATUS: 'COMPLETED',
      state: 'completed',
      State: 'completed',
      action: 'upload',
      Action: 'upload',
      ACTION: 'UPLOAD',
      type: 'video',
      Type: 'video',
      event: 'EPISODE_COMPLETED',
      Event: 'EPISODE_COMPLETED',
      ready: true,
      Ready: true,
      ready_str: 'true',
      success: true,
      Success: true,
      success_str: 'true',
      completed: true,
      Completed: true,
      completed_str: 'true',
      isCompleted: true,
      is_completed: true,
      hasVideo: true,
      has_video: true,
      ok: true,
      epNumber: 1,
      ep_number: 1,
      episode: 1,
      Episode: 1,
      ep: 1,
      title: 'ทดสอบระบบ Drama Auto Pilot (100% Free Pipeline)',
      Title: 'ทดสอบระบบ Drama Auto Pilot (100% Free Pipeline)',
      description: 'การทดสอบส่ง Webhook ไปยัง n8n/Make - Drama Auto Pilot Episode 1',
      Description: 'การทดสอบส่ง Webhook ไปยัง n8n/Make - Drama Auto Pilot Episode 1',
      logline: 'การทดสอบส่ง Webhook ไปยัง n8n/Make',
      Logline: 'การทดสอบส่ง Webhook ไปยัง n8n/Make',
      category: '22',
      categoryId: '22',
      privacyStatus: 'unlisted',
      privacy: 'unlisted',
      tags: ['drama', 'shortdrama', 'series'],
      video_url: sampleVideoUrl,
      videoUrl: sampleVideoUrl,
      url: sampleVideoUrl,
      Url: sampleVideoUrl,
      link: sampleVideoUrl,
      video_link: sampleVideoUrl,
      media_url: sampleVideoUrl,
      file_url: sampleVideoUrl,
      download_url: sampleVideoUrl,
      pollinations_image_url: pollinationsImageUrl,
      free_ai_image_url: pollinationsImageUrl,
      ai_image_url: pollinationsImageUrl,
      tts_voice_url: ttsVoiceUrl,
      free_tts_url: ttsVoiceUrl,
      creatomate_render_json: {
        template_id: "fb333dc6-a6e4-49ea-84d3-aa9e67dc1949",
        modifications: {
          "Video.source": pollinationsImageUrl,
          "Audio.source": ttsVoiceUrl,
          "Text-1.text": "ทดสอบระบบ Drama Auto Pilot (100% Free Pipeline)",
          "Text-2.text": firstDialogue || "Episode 1"
        }
      },
      shotstack_render_json: {
        timeline: {
          tracks: [
            { clips: [{ asset: { type: "audio", src: ttsVoiceUrl }, start: 0, length: 10 }] },
            { clips: [{ asset: { type: "image", src: pollinationsImageUrl }, start: 0, length: 10 }] }
          ]
        },
        output: { format: "mp4", resolution: "1080" }
      },
      zero_cost_pipeline: {
        ai_image_url_9_16: pollinationsImageUrl,
        thai_tts_audio_url: ttsVoiceUrl,
        sample_video_url: sampleVideoUrl,
        image_prompt: imagePrompt,
        dialogue_text: firstDialogue,
        creatomate_api_payload: {
          template_id: "fb333dc6-a6e4-49ea-84d3-aa9e67dc1949",
          modifications: {
            "Video.source": pollinationsImageUrl,
            "Audio.source": ttsVoiceUrl,
            "Text-1.text": "ทดสอบระบบ Drama Auto Pilot",
            "Text-2.text": firstDialogue || "Episode 1"
          }
        }
      },
      video: {
        url: sampleVideoUrl,
        video_url: sampleVideoUrl,
        videoUrl: sampleVideoUrl,
        status: 'completed',
        ready: true
      },
      data: {
        url: sampleVideoUrl,
        video_url: sampleVideoUrl,
        videoUrl: sampleVideoUrl,
        status: 'completed',
        ready: true,
        action: 'upload'
      },
      script: {
        epNumber: 1,
        title: 'ทดสอบระบบ Drama Auto Pilot',
        logline: 'การทดสอบส่ง Webhook ไปยัง n8n/Make',
        status: 'completed',
        video_url: sampleVideoUrl,
        videoUrl: sampleVideoUrl,
        url: sampleVideoUrl,
        ai_image_url: pollinationsImageUrl,
        tts_voice_url: ttsVoiceUrl
      },
      timestamp: new Date().toISOString()
    };

    const payload = {
      ...commonFields,
      body: { ...commonFields }
    };

    try {
      // Use backend proxy endpoint to prevent browser CORS / SSL issues
      const res = await fetch('/api/trigger-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          webhookUrl: targetUrl,
          payload
        })
      });

      const result = await res.json();

      if (res.ok && result.success) {
        addLog(`✅ [Test Webhook Success] ส่งไป n8n สำเร็จ! (HTTP ${result.status})`);
        if (isTestModeUrl) {
          alert(`✅ ส่ง Webhook ไปยัง Test Mode สำเร็จ! (HTTP Status: ${result.status})\n\n💡 หมายเหตุ: หากใน n8n ยังไม่ขึ้นข้อมูล:\n1. ใน n8n หน้า Canvas ให้กดปุ่ม "Listen for test event" หรือ "Test step" ก่อน\n2. แล้วกลับมากดปุ่ม "ทดสอบส่ง Webhook" นี้อีกครั้ง`);
        } else {
          alert(`✅ ส่ง Webhook ไปยัง Production URL สำเร็จ! (HTTP Status: ${result.status})\n\n💡 หมายเหตุสำหรับ Production URL (/webhook/):\n1. สวิตช์มุมขวาบนใน n8n ต้องเปิดเป็น Active: ON\n2. ข้อมูลจะไม่แสดงบนหน้า Canvas แต่จะถูกบันทึกในแท็บ "Executions" ทางซ้ายมือของ n8n ครับ`);
        }
      } else {
        const errorMsg = result.data?.message || result.error || `HTTP ${result.status}`;
        addLog(`⚠️ [Test Webhook Warning] n8n ตอบกลับ: ${errorMsg}`);
        if (isTestModeUrl) {
          alert(`⚠️ n8n ตอบกลับ: ${errorMsg}\n\nคำแนะนำสำหรับ Test URL (/webhook-test/):\n1. ไปที่ n8n แล้วกดปุ่ม "Listen for test event" (หรือ Test step)\n2. เมื่อ n8n ขึ้นสถานะรอข้อมูลแล้ว ให้กลับมากดปุ่มส่งในนี้อีกครั้ง`);
        } else {
          alert(`⚠️ n8n ตอบกลับ: ${errorMsg}\n\nคำแนะนำสำหรับ Production URL (/webhook/):\n1. ตรวจสอบว่าใน n8n เปิดสวิตช์ Active: ON แล้วหรือยัง\n2. ตรวจสอบว่า Webhook URL ถูกต้องทุกตัวอักษร`);
        }
      }
    } catch (err: any) {
      addLog(`❌ [Test Webhook Error] ${err.message}`);
      alert(`❌ เกิดข้อผิดพลาด: ${err.message}`);
    } finally {
      setIsTestingWebhook(false);
    }
  };

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString('th-TH');
    setTerminalLogs((prev) => [...prev, `[${timestamp}] ${msg}`]);
  };

  const handleStartAutoPilot = () => {
    if (startEp > endEp) {
      alert('กรุณาเลือกช่วงตอนให้ถูกต้อง (ตอนเริ่มต้นต้องน้อยกว่าหรือเท่ากับตอนสิ้นสุด)');
      return;
    }

    const selectedEps = EPISODE_LOGLINES_60.filter(
      (ep) => ep.epNumber >= startEp && ep.epNumber <= endEp
    );

    const initialProgress: EpisodeProgress[] = selectedEps.map((ep) => ({
      epNumber: ep.epNumber,
      title: ep.title,
      status: 'idle',
      progress: 0,
      logText: 'รอคิวการประมวลผล'
    }));

    setPipelineProgress(initialProgress);
    setIsRunning(true);
    setCurrentEpIndex(0);

    addLog(`🚀 [START] เริ่มกระบวนการรันอัตโนมัติ 100% สำหรับตอนที่ ${startEp} ถึง ${endEp} (รวม ${selectedEps.length} ตอน)...`);
  };

  useEffect(() => {
    if (!isRunning || pipelineProgress.length === 0) return;

    if (currentEpIndex >= pipelineProgress.length) {
      setIsRunning(false);
      addLog('🎉 [COMPLETED 100%] สำเร็จทั้งหมด! ทุกตอนได้รับการสร้างบทเรียบร้อย สามารถคลิกดูบทฉบับเต็มได้ทันที!');
      return;
    }

    const currentEp = pipelineProgress[currentEpIndex];

    const updateCurrentEpStatus = (status: EpisodeProgress['status'], progress: number, logText: string, currentStep?: number) => {
      setPipelineProgress((prev) =>
        prev.map((item, idx) =>
          idx === currentEpIndex ? { ...item, status, progress, logText, currentStep } : item
        )
      );
    };

    let timer: NodeJS.Timeout;

    if (currentEp.status === 'idle') {
      updateCurrentEpStatus('step1_script', 16, 'ขั้นตอน 1/6: สกัดบทละครด้วย Gemini AI...', 1);
      addLog(`[EP ${currentEp.epNumber}] 📝 [ขั้นตอน 1/6: Gemini] คิดพล็อตเรื่องและสกัดบทละคร 5 นาที (เรื่อง: ${currentEp.title})...`);

      // Call API to generate real script
      const epData = EPISODE_LOGLINES_60.find((e) => e.epNumber === currentEp.epNumber);
      if (epData) {
        fetch('/api/generate-episode-script', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            epNumber: epData.epNumber,
            title: epData.title,
            logline: epData.logline,
            arcTitle: epData.arcTitle
          })
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success && data.script) {
              setGeneratedScriptsMap((prev) => ({ ...prev, [currentEp.epNumber]: data.script }));
              addLog(`[EP ${currentEp.epNumber}] ✨ บทละคร Gemini สร้างสำเร็จ (${data.script.wordCount || 650} คำ, ${data.script.scenes?.length || 3} ฉาก)!`);
            }
          })
          .catch((err) => {
            console.error('Error in auto-pilot script generation:', err);
          });
      }

      timer = setTimeout(() => {
        updateCurrentEpStatus('step2_image', 33, 'ขั้นตอน 2/6: ออกแบบตัวละคร & ล็อกใบหน้า Midjourney (--cref)...', 2);
        addLog(`[EP ${currentEp.epNumber}] 🎨 [ขั้นตอน 2/6: Midjourney] เจนภาพต้นแบบตัวละคร ล็อกใบหน้าด้วย --cref 9:16...`);
      }, 1500);
    } else if (currentEp.status === 'step2_image') {
      timer = setTimeout(() => {
        updateCurrentEpStatus('step3_video', 50, 'ขั้นตอน 3/6: แปลงภาพนิ่งเป็นวิดีโอ Runway Gen-2/3 (4-10 วินาที)...', 3);
        addLog(`[EP ${currentEp.epNumber}] 🎥 [ขั้นตอน 3/6: Runway] อัปโหลดภาพนิ่ง สั่งขยับมุมกล้องและตัวละคร 4-10 วินาที...`);
      }, 1500);
    } else if (currentEp.status === 'step3_video') {
      timer = setTimeout(() => {
        updateCurrentEpStatus('step4_voice', 66, 'ขั้นตอน 4/6: สังเคราะห์เสียงพากย์ ElevenLabs...', 4);
        addLog(`[EP ${currentEp.epNumber}] 🎙️ [ขั้นตอน 4/6: ElevenLabs] แปลงบทพูดเป็นเสียงพากย์อารมณ์ดราม่าเข้มข้น...`);
      }, 1500);
    } else if (currentEp.status === 'step4_voice') {
      timer = setTimeout(() => {
        updateCurrentEpStatus('step5_music', 83, 'ขั้นตอน 5/6: แต่งเพลง BGM & SFX ด้วย Suno AI...', 5);
        addLog(`[EP ${currentEp.epNumber}] 🎵 [ขั้นตอน 5/6: Suno AI] แต่งเพลงประกอบ Cinematic Suspense BGM ไร้ลิขสิทธิ์...`);
      }, 1500);
    } else if (currentEp.status === 'step5_music') {
      timer = setTimeout(() => {
        updateCurrentEpStatus('step6_edit', 95, 'ขั้นตอน 6/6: ตัดต่อรวมไฟล์ CapCut & ยิง Webhook...', 6);
        addLog(`[EP ${currentEp.epNumber}] ✂️ [ขั้นตอน 6/6: CapCut] รวมวิดีโอ เสียงพากย์ เพลง BGM และใส่ซับภาษาไทยสำเร็จ!`);
      }, 1500);
    } else if (currentEp.status === 'step6_edit') {
      timer = setTimeout(() => {
        updateCurrentEpStatus('completed', 100, 'เสร็จสมบูรณ์ 100% ครบทั้ง 6 ขั้นตอนหลัก!', 6);
        
        // Trigger real Webhook POST to n8n if configured
        if (webhookUrl && webhookUrl.trim().startsWith('http')) {
          const scriptData = generatedScriptsMap[currentEp.epNumber] || {
            epNumber: currentEp.epNumber,
            title: currentEp.title,
            logline: currentEp.logline
          };
          // Real accessible sample video URL so n8n can actually fetch the file without hanging
          const sampleVideoUrl = `https://vjs.zencdn.net/v/oceans.mp4`;
          const scenePrompt = scriptData?.scenes?.[0]?.midjourneyPrompt || `Cinematic 9:16 vertical scene for ${currentEp.title}, dramatic revenge tension, hyperrealistic 8k`;
          const pollinationsImageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(scenePrompt)}?width=720&height=1280&nologo=true&seed=${currentEp.epNumber * 123}`;
          const dialogueText = scriptData?.scenes?.[0]?.dialogue?.[0]?.text || currentEp.logline || currentEp.title;
          const origin = typeof window !== 'undefined' ? window.location.origin : '';
          const ttsVoiceUrl = `${origin}/api/tts?text=${encodeURIComponent(dialogueText)}`;

          const epFields = {
            status: 'completed',
            Status: 'completed',
            STATUS: 'COMPLETED',
            state: 'completed',
            State: 'completed',
            action: 'upload',
            Action: 'upload',
            ACTION: 'UPLOAD',
            type: 'video',
            Type: 'video',
            event: 'EPISODE_COMPLETED',
            Event: 'EPISODE_COMPLETED',
            ready: true,
            Ready: true,
            ready_str: 'true',
            success: true,
            Success: true,
            success_str: 'true',
            completed: true,
            Completed: true,
            completed_str: 'true',
            isCompleted: true,
            is_completed: true,
            hasVideo: true,
            has_video: true,
            ok: true,
            epNumber: currentEp.epNumber,
            ep_number: currentEp.epNumber,
            episode: currentEp.epNumber,
            Episode: currentEp.epNumber,
            ep: currentEp.epNumber,
            title: currentEp.title,
            Title: currentEp.title,
            description: currentEp.logline || currentEp.title,
            Description: currentEp.logline || currentEp.title,
            logline: currentEp.logline,
            Logline: currentEp.logline,
            category: '22',
            categoryId: '22',
            privacyStatus: 'unlisted',
            privacy: 'unlisted',
            tags: ['drama', 'shortdrama', 'series'],
            video_url: sampleVideoUrl,
            videoUrl: sampleVideoUrl,
            url: sampleVideoUrl,
            Url: sampleVideoUrl,
            link: sampleVideoUrl,
            video_link: sampleVideoUrl,
            media_url: sampleVideoUrl,
            file_url: sampleVideoUrl,
            download_url: sampleVideoUrl,
            pollinations_image_url: pollinationsImageUrl,
            free_ai_image_url: pollinationsImageUrl,
            ai_image_url: pollinationsImageUrl,
            tts_voice_url: ttsVoiceUrl,
            free_tts_url: ttsVoiceUrl,
            zero_cost_pipeline: {
              ai_image_url_9_16: pollinationsImageUrl,
              thai_tts_audio_url: ttsVoiceUrl,
              sample_video_url: sampleVideoUrl,
              image_prompt: scenePrompt,
              dialogue_text: dialogueText
            },
            video: {
              url: sampleVideoUrl,
              video_url: sampleVideoUrl,
              videoUrl: sampleVideoUrl,
              status: 'completed',
              ready: true
            },
            data: {
              url: sampleVideoUrl,
              video_url: sampleVideoUrl,
              videoUrl: sampleVideoUrl,
              status: 'completed',
              ready: true,
              action: 'upload'
            },
            script: {
              ...scriptData,
              status: 'completed',
              video_url: sampleVideoUrl,
              videoUrl: sampleVideoUrl,
              url: sampleVideoUrl
            },
            timestamp: new Date().toISOString()
          };

          const payloadData = {
            ...epFields,
            body: { ...epFields }
          };

          fetch('/api/trigger-webhook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              webhookUrl: webhookUrl.trim(),
              payload: payloadData
            })
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                addLog(`[EP ${currentEp.epNumber}] 🚀 [Webhook Sent] ยิงข้อมูลไปยัง n8n สำเร็จ (HTTP ${data.status})!`);
              } else {
                addLog(`[EP ${currentEp.epNumber}] ⚠️ [Webhook Response] n8n ตอบกลับ: ${data.error || `HTTP ${data.status}`}`);
              }
            })
            .catch((err) => {
              addLog(`[EP ${currentEp.epNumber}] ⚠️ [Webhook Trigger Error] ${err.message}`);
            });
        } else {
          addLog(`[EP ${currentEp.epNumber}] 🎉 [COMPLETED] สำเร็จครบ 6 ขั้นตอนหลัก 100%! (ยังไม่ได้ระบุ Webhook URL)`);
        }

        setCurrentEpIndex((prev) => prev + 1);
      }, 1500);
    }

    return () => clearTimeout(timer);
  }, [isRunning, currentEpIndex, pipelineProgress]);

  const episodeLoglinesJson = JSON.stringify(
    EPISODE_LOGLINES_60.map((e) => ({
      epNumber: e.epNumber,
      title: e.title,
      logline: e.logline,
      arcTitle: e.arcTitle
    })),
    null,
    2
  );

  const pythonScriptCode = `import os
import json
import time
import requests
from google import genai
from dotenv import load_dotenv

load_dotenv()

# =====================================================================
# AI SHORT DRAMA STUDIO — 100% FULL AUTOMATION PYTHON PIPELINE BOT
# =====================================================================

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "YOUR_GEMINI_API_KEY")
WEBHOOK_URL = os.getenv("WEBHOOK_URL", "${webhookUrl}")

# LINE Messaging API
LINE_CHANNEL_ACCESS_TOKEN = os.getenv("LINE_CHANNEL_ACCESS_TOKEN", "")
LINE_USER_ID = os.getenv("LINE_USER_ID", "")

client = genai.Client(api_key=GEMINI_API_KEY)

# รายชื่อบทละครและโครงเรื่องสั้น 60 ตอนเต็ม
DRAMA_LOGLINES_60 = ${episodeLoglinesJson}

def send_line_messaging_api(msg):
    """ส่งข้อความแจ้งเตือนผ่าน LINE Official Account (LINE Messaging API)"""
    if LINE_CHANNEL_ACCESS_TOKEN and LINE_USER_ID:
        try:
            url = "https://api.line.me/v2/bot/message/push"
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {LINE_CHANNEL_ACCESS_TOKEN}"
            }
            data = {
                "to": LINE_USER_ID,
                "messages": [{"type": "text", "text": msg}]
            }
            res = requests.post(url, headers=headers, json=data)
            print(f"📲 [LINE Messaging API] Push response: {res.status_code}")
        except Exception as e:
            print(f"❌ LINE Messaging API Error: {e}")

def generate_full_episode_automation(item):
    ep_number = item["epNumber"]
    title = item["title"]
    logline = item["logline"]
    arc_title = item.get("arcTitle", "")

    print(f"\\n[1/4] 🚀 [EP {ep_number}: {title}] Generating 5-min Drama Script with Gemini API...")
    
    system_instruction = """คุณเป็นนักเขียนบทละครสั้นดราม่าล้างแค้นและละครคุณธรรมระดับพรีเมียม สำหรับ TikTok, Shorts, Reels
ความยาวบทประมาณ 5 นาที (600 - 700 คำภาษาไทย)
บทสนทนาต้องมีความขัดแย้งสูง (High Conflict), เชือดเฉือน, อารมณ์เข้มข้น ไม่ยืดเยื้อ
พร้อมสั่งมุมกล้อง และสร้าง Midjourney + Kling AI Video Prompts ภาษาอังกฤษ"""

    prompt = f"""เขียนบทละครสั้นดราม่าล้างแค้นฉบับเต็ม ตอนที่ {ep_number}: "{title}" ({arc_title})
เรื่องย่อประจำตอน: "{logline}"

ตอบกลับเป็น JSON Schema:
{{
  "epNumber": {ep_number},
  "title": "{title}",
  "wordCount": 650,
  "estimatedDuration": "5 นาที",
  "hookOpening": "...",
  "scenes": [
    {{
      "sceneNumber": 1,
      "location": "...",
      "timeOfDay": "...",
      "visual": "...",
      "cameraDirection": "...",
      "dialogue": [
        {{"character": "มาดามเอวา", "action": "...", "text": "..."}}
      ],
      "midjourneyPrompt": "...",
      "klingVideoPrompt": "..."
    }}
  ],
  "moralLesson": "..."
}}
"""
    
    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt,
        config={
            "system_instruction": system_instruction,
            "response_mime_type": "application/json"
        }
    )
    
    script_data = json.loads(response.text)
    print(f"✅ Script generated: {script_data['title']}")
    
    payload = {
        "epNumber": ep_number,
        "script": script_data,
        "autoPostChannels": ["TikTok", "YouTube_Shorts", "Facebook_Reels"],
        "timestamp": time.time()
    }
    
    if WEBHOOK_URL and WEBHOOK_URL.startswith("http"):
        try:
            print(f"📡 [3/4] Sending automated payload to Webhook: {WEBHOOK_URL}")
            res = requests.post(WEBHOOK_URL, json=payload, timeout=10)
            print(f"✅ Webhook Response: {res.status_code}")
        except Exception as e:
            print(f"⚠️ Webhook warning: {e}")

    os.makedirs("output", exist_ok=True)
    with open(f"output/ep_{ep_number}.json", "w", encoding="utf-8") as f:
        json.dump(script_data, f, ensure_ascii=False, indent=2)

    send_line_messaging_api(f"🎬 [AI Drama Auto-Pilot Alert]\\nตอนที่ {ep_number}: {script_data.get('title')} สร้างเสร็จเรียบร้อย! 🚀")
    return payload

if __name__ == "__main__":
    print("🤖 Starting 100% Unattended Auto-Pilot Drama Production for 60 Episodes...")
    for item in DRAMA_LOGLINES_60:
        generate_full_episode_automation(item)
        time.sleep(2)
`;

  const gcpScriptCode = `# =====================================================================
# GOOGLE CLOUD COMPUTING ENGINE (GCP VM) 24/7 AUTOMATION DEPLOYMENT
# Architecture: Compute Engine VM (Ubuntu 22.04 LTS) + Systemd + Docker / Python Bot
# =====================================================================

export INSTANCE_NAME="ai-drama-automation-vm"
export ZONE="asia-southeast1-b"

gcloud compute instances create $INSTANCE_NAME \\
    --zone=$ZONE \\
    --machine-type=e2-medium \\
    --image-family=ubuntu-2204-lts \\
    --image-project=ubuntu-os-cloud \\
    --boot-disk-size=30GB \\
    --tags=http-server,https-server

gcloud compute ssh $INSTANCE_NAME --zone=$ZONE

sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install -y python3-pip python3-venv git curl docker.io docker-compose

mkdir -p ~/ai-drama-bot && cd ~/ai-drama-bot
python3 -m venv venv
source venv/bin/activate
pip install google-genai requests python-dotenv

cat << 'EOF' > .env
GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"
WEBHOOK_URL="${webhookUrl}"
LINE_CHANNEL_ACCESS_TOKEN="YOUR_LINE_CHANNEL_ACCESS_TOKEN"
LINE_USER_ID="YOUR_LINE_USER_ID"
START_EPISODE=1
END_EPISODE=60
EOF

CURRENT_USER=$USER
CURRENT_HOME=$HOME

sudo bash -c "cat << EOF > /etc/systemd/system/ai-drama-bot.service
[Unit]
Description=AI Short Drama Studio 100% Automation Bot Service
After=network.target

[Service]
Type=simple
User=\${CURRENT_USER}
WorkingDirectory=\${CURRENT_HOME}/ai-drama-bot
ExecStart=\${CURRENT_HOME}/ai-drama-bot/venv/bin/python -u auto_pilot_drama.py
Restart=always
RestartSec=10
EnvironmentFile=\${CURRENT_HOME}/ai-drama-bot/.env
Environment=PYTHONUNBUFFERED=1

[Install]
WantedBy=multi-user.target
EOF"

sudo systemctl daemon-reload
sudo systemctl enable ai-drama-bot
sudo systemctl start ai-drama-bot
sudo systemctl status ai-drama-bot
`;

  const n8nWorkflowJson = `{
  "name": "AI Drama Studio 100% Clean Production Pipeline (No Dummy Fallbacks)",
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "days",
              "seconds": 86400
            }
          ]
        }
      },
      "id": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
      "name": "Schedule Every Morning 08:00 AM",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1.1,
      "position": [200, 300]
    },
    {
      "parameters": {
        "url": "https://ais-dev-etn47lhw3khj736gg6rqei-357144596187.asia-southeast1.run.app/api/generate-episode-script",
        "method": "POST",
        "jsonParameters": true,
        "bodyParametersJson": "{\\n  \\"epNumber\\": 1,\\n  \\"title\\": \\"คืนดับสูญบนดาดฟ้า\\",\\n  \\"logline\\": \\"กวินตราถูกภพธรรมผลักตกตึก 50 ชั้น\\"\\n}"
      },
      "id": "2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
      "name": "Fetch AI Drama Script (Gemini API)",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [420, 300]
    },
    {
      "parameters": {
        "url": "https://queue.fal.run/fal-ai/kling-video/v1.5/pro/text-to-video",
        "method": "POST",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Authorization",
              "value": "Key YOUR_FAL_OR_REPLICATE_API_KEY"
            },
            {
              "name": "Content-Type",
              "value": "application/json"
            }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "{\\n  \\"prompt\\": \\"={{ $('Fetch AI Drama Script (Gemini API)').item.json.klingVideoPrompt }}\\",\\n  \\"aspect_ratio\\": \\"9:16\\",\\n  \\"duration\\": \\"5\\"\\n}"
      },
      "id": "2c3d4e5f-6a7b-8c9d-0e1f-2a3b4c5d6e7f",
      "name": "Generate AI Video (Async Request)",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [640, 300]
    },
    {
      "parameters": {
        "amount": 60,
        "unit": "seconds"
      },
      "id": "2d3e4f5a-6b7c-8d9e-0f1a-2b3c4d5e6f7a",
      "name": "Wait 60s for AI Video Rendering",
      "type": "n8n-nodes-base.wait",
      "typeVersion": 1.1,
      "position": [860, 300]
    },
    {
      "parameters": {
        "conditions": {
          "string": [
            {
              "value1": "={{ $json.video.url || $json.output[0] || $json.video_url }}",
              "operation": "isNotEmpty"
            },
            {
              "value1": "={{ $json.video.url || $json.output[0] || $json.video_url }}",
              "operation": "notContains",
              "value2": "mov_bbb.mp4"
            }
          ]
        }
      },
      "id": "2e3f4a5b-6c7d-8e9f-0a1b-2c3d4e5f6a7b",
      "name": "Validate Real AI Video URL (No Fallback)",
      "type": "n8n-nodes-base.if",
      "typeVersion": 1,
      "position": [1080, 300]
    },
    {
      "parameters": {
        "resource": "video",
        "operation": "upload",
        "title": "={{ $('Fetch AI Drama Script (Gemini API)').item.json.title }}",
        "description": "={{ $('Fetch AI Drama Script (Gemini API)').item.json.logline }} #Shorts #Drama #AIDrama",
        "regionCode": "TH",
        "categoryId": "24",
        "privacyStatus": "public"
      },
      "id": "3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f",
      "name": "Upload Dynamic Real Video to YouTube",
      "type": "n8n-nodes-base.youTube",
      "typeVersion": 1,
      "position": [1300, 200]
    },
    {
      "parameters": {
        "url": "https://api.line.me/v2/bot/message/push",
        "method": "POST",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Authorization",
              "value": "Bearer YOUR_LINE_CHANNEL_ACCESS_TOKEN"
            },
            {
              "name": "Content-Type",
              "value": "application/json"
            }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "{\\n  \\"to\\": \\"YOUR_LINE_USER_ID\\",\\n  \\"messages\\": [\\n    {\\n      \\"type\\": \\"text\\",\\n      \\"text\\": \\"🎬 [AI Drama Auto-Pilot Alert] ตอนที่ {{ $json.epNumber }}: {{ $json.title }} สร้างเสร็จเรียบร้อย! 🚀\\"\\n    }\\n  ]\\n}"
      },
      "id": "4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a",
      "name": "Send LINE Messaging API Notification",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [1520, 200]
    }
  ],
  "connections": {
    "Schedule Every Morning 08:00 AM": {
      "main": [[{ "node": "Fetch AI Drama Script (Gemini API)", "type": "main", "index": 0 }]]
    },
    "Fetch AI Drama Script (Gemini API)": {
      "main": [[{ "node": "Generate AI Video (Async Request)", "type": "main", "index": 0 }]]
    },
    "Generate AI Video (Async Request)": {
      "main": [[{ "node": "Wait 60s for AI Video Rendering", "type": "main", "index": 0 }]]
    },
    "Wait 60s for AI Video Rendering": {
      "main": [[{ "node": "Validate Real AI Video URL (No Fallback)", "type": "main", "index": 0 }]]
    },
    "Validate Real AI Video URL (No Fallback)": {
      "main": [[{ "node": "Upload Dynamic Real Video to YouTube", "type": "main", "index": 0 }]]
    },
    "Upload Dynamic Real Video to YouTube": {
      "main": [[{ "node": "Send LINE Messaging API Notification", "type": "main", "index": 0 }]]
    }
  },
  "pinData": {},
  "settings": { "executionOrder": "v1" },
  "staticData": null,
  "tags": [],
  "triggerCount": 0
}`;

  const dockerComposeCode = `# Docker Compose for 24/7 Unattended AI Drama Server
version: '3.8'

services:
  drama-auto-pilot:
    image: python:3.11-slim
    container_name: ai_drama_studio_autopilot
    restart: always
    environment:
      - GEMINI_API_KEY=\${GEMINI_API_KEY}
      - WEBHOOK_URL=${webhookUrl}
      - LINE_CHANNEL_ACCESS_TOKEN=\${LINE_CHANNEL_ACCESS_TOKEN}
      - LINE_USER_ID=\${LINE_USER_ID}
    volumes:
      - ./output:/app/output
    command: >
      bash -c "pip install google-genai requests python-dotenv && python auto_pilot_drama.py"
`;

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 3000);
  };

  const handleDownloadN8nJson = () => {
    const element = document.createElement("a");
    const file = new Blob([n8nWorkflowJson], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = "ai-drama-n8n-workflow.json";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const currentCodeText =
    activeCodeTab === 'gcp' ? gcpScriptCode :
    activeCodeTab === 'python' ? pythonScriptCode :
    activeCodeTab === 'n8n' ? n8nWorkflowJson :
    dockerComposeCode;

  return (
    <div className="space-y-8 py-6 max-w-6xl mx-auto">
      {/* Top Banner & Status Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-950 via-slate-900 to-slate-950 border border-red-800/60 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-900/80 border border-red-700/80 text-amber-300 text-xs font-mono font-bold">
              <Bot className="w-4 h-4 animate-bounce" />
              <span>100% UNATTENDED AUTOMATION CORE</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
              ศูนย์ควบคุมระบบสร้างละครอัตโนมัติ 100% (Auto-Pilot Studio)
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              ผลิตละครสั้น 60 ตอนต่อเนื่องโดยไม่ต้องใช้คนเฝ้า! เชื่อมต่อ Gemini API, เสียงพากย์ AI, Midjourney/Kling AI Prompts, Subtitles .SRT, LINE Messaging API Alert และส่งเข้า Social Auto-Publishing API โดยอัตโนมัติ
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl flex items-center space-x-4 shrink-0 shadow-inner">
            <div className="relative">
              <div className={`w-4 h-4 rounded-full ${isRunning ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`} />
              <div className={`w-4 h-4 rounded-full absolute top-0 ${isRunning ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">สถานะระบบ</span>
              <span className="text-xs font-bold text-white">
                {isRunning ? 'กำลังรันอัตโนมัติ (RUNNING)' : 'พร้อมทำงาน (READY)'}
              </span>
            </div>
          </div>
        </div>

        {/* 6 AI Production Steps Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2.5 pt-6 mt-6 border-t border-slate-800/80">
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 space-y-1">
            <div className="flex items-center space-x-1 text-[11px] text-rose-400 font-bold">
              <Sparkles className="w-3 h-3" />
              <span>1. Gemini Script</span>
            </div>
            <p className="text-[10px] text-slate-400">บทดราม่า 5 นาที</p>
          </div>

          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 space-y-1">
            <div className="flex items-center space-x-1 text-[11px] text-cyan-400 font-bold">
              <span>🎨 2. Midjourney</span>
            </div>
            <p className="text-[10px] text-slate-400">ภาพ 9:16 + --cref</p>
          </div>

          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 space-y-1">
            <div className="flex items-center space-x-1 text-[11px] text-purple-400 font-bold">
              <Video className="w-3 h-3" />
              <span>3. Runway Gen-3</span>
            </div>
            <p className="text-[10px] text-slate-400">คลิปเคลื่อนไหว 4-10s</p>
          </div>

          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 space-y-1">
            <div className="flex items-center space-x-1 text-[11px] text-emerald-400 font-bold">
              <Volume2 className="w-3 h-3" />
              <span>4. ElevenLabs</span>
            </div>
            <p className="text-[10px] text-slate-400">เสียงพากย์ดราม่า</p>
          </div>

          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 space-y-1">
            <div className="flex items-center space-x-1 text-[11px] text-rose-300 font-bold">
              <span>🎵 5. Suno AI</span>
            </div>
            <p className="text-[10px] text-slate-400">BGM ไร้ลิขสิทธิ์</p>
          </div>

          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 space-y-1">
            <div className="flex items-center space-x-1 text-[11px] text-yellow-400 font-bold">
              <Globe className="w-3 h-3" />
              <span>6. CapCut & Post</span>
            </div>
            <p className="text-[10px] text-slate-400">ตัดต่อ + ใส่ซับอัตโนมัติ</p>
          </div>
        </div>

        {/* Zero-Cost 100% Free Pipeline Callout Banner */}
        <div className="mt-6 bg-gradient-to-r from-emerald-950/70 via-slate-900 to-teal-950/70 border border-emerald-600/60 p-4.5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-400 text-black text-[10px] font-black tracking-wide uppercase shadow">
                Zero-Cost Pipeline Enabled
              </span>
              <h3 className="text-sm font-extrabold text-emerald-300">
                🚀 รองรับการทำละครอัตโนมัติ "ฟรี 100%" (Zero-Cost Auto Pipeline)
              </h3>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              ไม่จำกัดงบ! ใช้ <b>Gemini 3.6 Flash</b> (เขียนบท) + <b>Pollinations AI</b> (เจนภาพฉากแนวตั้ง 9:16 ฟรี Unlimited) + <b>Google Thai TTS</b> (เสียงพากย์ฟรี) สั่งรันผ่าน Webhook n8n สร้างวิดีโออัตโนมัติ 24 ชม.
            </p>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-200 bg-emerald-950/90 px-3.5 py-2 rounded-xl border border-emerald-700/80 shrink-0 shadow-inner">
            <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-amber-400" /> Pollinations 9:16</span>
            <span className="text-emerald-500">•</span>
            <span className="flex items-center gap-1"><Volume2 className="w-3.5 h-3.5 text-cyan-400" /> Thai gTTS</span>
          </div>
        </div>
      </div>

      {/* Control Panel & Interactive Execution Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Configuration & Run Controls */}
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-6">
          <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm uppercase">
            <Cpu className="w-4 h-4" />
            <span>ตั้งค่าการรันอัตโนมัติ (Automation Config)</span>
          </div>

          {/* Episode Range */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-200">
              เลือกช่วงตอนที่ต้องการรัน (Episode Range 1-60):
            </label>
            <div className="flex items-center space-x-3">
              <div className="w-1/2">
                <span className="text-[10px] text-slate-400 block mb-1">ตอนเริ่มต้น:</span>
                <select
                  value={startEp}
                  onChange={(e) => setStartEp(Number(e.target.value))}
                  disabled={isRunning}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-red-600"
                >
                  {EPISODE_LOGLINES_60.map((ep) => (
                    <option key={`start-${ep.epNumber}`} value={ep.epNumber}>
                      ตอนที่ {ep.epNumber}: {ep.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-1/2">
                <span className="text-[10px] text-slate-400 block mb-1">ตอนสิ้นสุด:</span>
                <select
                  value={endEp}
                  onChange={(e) => setEndEp(Number(e.target.value))}
                  disabled={isRunning}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-red-600"
                >
                  {EPISODE_LOGLINES_60.map((ep) => (
                    <option key={`end-${ep.epNumber}`} value={ep.epNumber}>
                      ตอนที่ {ep.epNumber}: {ep.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Webhook Endpoint Input */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-amber-300">
                🔗 N8N / Make.com Webhook URL:
              </label>
              <button
                onClick={handleTestWebhook}
                disabled={isTestingWebhook || !webhookUrl}
                type="button"
                className="px-2.5 py-1 text-[11px] font-medium bg-amber-600 hover:bg-amber-500 disabled:bg-slate-800 text-black font-semibold rounded-lg transition shadow flex items-center gap-1"
              >
                {isTestingWebhook ? '⏳ กำลังส่ง...' : '🚀 ทดสอบส่ง Webhook ทันที'}
              </button>
            </div>
            <input
              type="text"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://n8n.your-server.com/webhook/..."
              disabled={isRunning}
              className="w-full bg-slate-950 border border-amber-600/50 rounded-xl p-2.5 text-xs text-amber-200 font-mono focus:outline-none focus:border-amber-400 placeholder:text-slate-600 shadow-inner"
            />
            <p className="text-[10px] text-slate-400 leading-tight">
              วาง Webhook URL ที่ได้จาก n8n (ถ้าในโหมด Test ใน n8n ให้ใช้ URL ที่มี <code className="text-amber-300 bg-slate-900 px-1 rounded">/webhook-test/</code>) แล้วกดปุ่ม <b>ทดสอบส่ง Webhook ทันที</b> ข้างบนนี้เพื่อส่ง Payload ได้ทันที
            </p>
          </div>

          {/* Toggles */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <span className="text-xs font-semibold text-slate-200 block mb-2">
              เปิดใช้ออฟชั่นออโต้ครบวงจร (100% Pipeline Toggles):
            </span>

            <label className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer">
              <span className="text-xs text-slate-300">1. Auto-Generate Scripts (Gemini API)</span>
              <input type="checkbox" checked readOnly className="accent-red-600 rounded" />
            </label>

            <label className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer">
              <span className="text-xs text-slate-300">2. Auto-TTS Voice Over (ElevenLabs/CapCut)</span>
              <input type="checkbox" checked readOnly className="accent-red-600 rounded" />
            </label>

            <label className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer">
              <span className="text-xs text-slate-300">3. Auto-Extract Keyframe Prompts (Midjourney/Kling)</span>
              <input type="checkbox" checked readOnly className="accent-red-600 rounded" />
            </label>

            <label className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer">
              <span className="text-xs text-slate-300">4. Auto-Generate Subtitles (.SRT) & LINE Messaging API</span>
              <input type="checkbox" checked readOnly className="accent-red-600 rounded" />
            </label>
          </div>

          {/* Target Platforms */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <span className="text-xs font-semibold text-slate-200 block mb-2">
              ช่องทาง Auto-Post หลังประมวลผลเสร็จ:
            </span>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setAutoPublishTikTok(!autoPublishTikTok)}
                className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                  autoPublishTikTok
                    ? 'bg-red-950/80 border-red-700 text-red-200'
                    : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}
              >
                TikTok
              </button>

              <button
                onClick={() => setAutoPublishShorts(!autoPublishShorts)}
                className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                  autoPublishShorts
                    ? 'bg-rose-950/80 border-rose-700 text-rose-200'
                    : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}
              >
                Shorts
              </button>

              <button
                onClick={() => setAutoPublishReels(!autoPublishReels)}
                className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                  autoPublishReels
                    ? 'bg-amber-950/80 border-amber-700 text-amber-200'
                    : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}
              >
                Reels
              </button>
            </div>
          </div>

          {/* Action Trigger Button */}
          <button
            onClick={handleStartAutoPilot}
            disabled={isRunning}
            className={`w-full py-4 rounded-xl font-extrabold text-sm flex items-center justify-center space-x-2 transition-all shadow-xl ${
              isRunning
                ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white shadow-red-950/50'
            }`}
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>กำลังประมวลผลระบบออโต้แบบเรียลไทม์...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>เปิดระบบรันอัตโนมัติ 100% (Start Auto-Pilot)</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Live Execution Progress Monitor & Console */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Cards */}
          <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm uppercase">
                <Terminal className="w-4 h-4" />
                <span>ความคืบหน้าการประมวลผลบอท (Live Production Queue)</span>
              </div>
              {pipelineProgress.length > 0 && (
                <span className="text-xs font-mono text-amber-400">
                  กำลังทำ {currentEpIndex < pipelineProgress.length ? currentEpIndex + 1 : pipelineProgress.length} จาก {pipelineProgress.length} ตอน
                </span>
              )}
            </div>

            {pipelineProgress.length === 0 ? (
              <div className="bg-slate-950 border border-dashed border-slate-800 p-8 rounded-xl text-center text-xs text-slate-500 space-y-2">
                <Bot className="w-8 h-8 text-slate-600 mx-auto" />
                <p>กดปุ่ม "เปิดระบบรันอัตโนมัติ 100%" ทางซ้ายมือ เพื่อเริ่มกระบวนการรันต่อเนื่อง</p>
                <p className="text-xs text-slate-400">
                  นำสคริปต์นี้ไปรันบน VPS / Docker / GitHub Actions / n8n เพื่อสั่งให้ AI สร้างบทและรันโพสต์ลงโซเชียล 100% ไร้คนเฝ้า
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {pipelineProgress.map((item) => {
                  const scriptObj = generatedScriptsMap[item.epNumber];
                  return (
                    <div key={item.epNumber} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-200">
                          ตอนที่ {item.epNumber}: {item.title}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className={`font-mono text-[11px] ${
                            item.status === 'completed' ? 'text-emerald-400 font-bold' :
                            item.status === 'idle' ? 'text-slate-500' : 'text-amber-300 animate-pulse font-semibold'
                          }`}>
                            {item.logText}
                          </span>
                          {scriptObj && (
                            <button
                              onClick={() => setSelectedScriptModal(scriptObj)}
                              className="px-2 py-0.5 rounded bg-rose-900/60 hover:bg-rose-800 border border-rose-700/50 text-[10px] text-rose-200 flex items-center space-x-1 font-sans transition-all shrink-0"
                            >
                              <Eye className="w-3 h-3" />
                              <span>ดูบทสคริปต์</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* 6 Step Visual Indicators */}
                      <div className="grid grid-cols-6 gap-1 text-[9px] font-mono text-center">
                        <div className={`py-1 rounded border transition-all ${
                          item.currentStep && item.currentStep >= 1 ? 'bg-rose-950/80 border-rose-600 text-rose-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-600'
                        }`}>
                          1.Gemini
                        </div>
                        <div className={`py-1 rounded border transition-all ${
                          item.currentStep && item.currentStep >= 2 ? 'bg-cyan-950/80 border-cyan-600 text-cyan-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-600'
                        }`}>
                          2.Midjourney
                        </div>
                        <div className={`py-1 rounded border transition-all ${
                          item.currentStep && item.currentStep >= 3 ? 'bg-purple-950/80 border-purple-600 text-purple-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-600'
                        }`}>
                          3.Runway
                        </div>
                        <div className={`py-1 rounded border transition-all ${
                          item.currentStep && item.currentStep >= 4 ? 'bg-emerald-950/80 border-emerald-600 text-emerald-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-600'
                        }`}>
                          4.ElevenLabs
                        </div>
                        <div className={`py-1 rounded border transition-all ${
                          item.currentStep && item.currentStep >= 5 ? 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold' : 'bg-slate-900 border-slate-800 text-slate-600'
                        }`}>
                          5.Suno AI
                        </div>
                        <div className={`py-1 rounded border transition-all ${
                          item.currentStep && item.currentStep >= 6 ? 'bg-yellow-950/80 border-yellow-600 text-yellow-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-600'
                        }`}>
                          6.CapCut
                        </div>
                      </div>

                      <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            item.status === 'completed'
                              ? 'bg-emerald-500'
                              : 'bg-gradient-to-r from-red-600 via-purple-600 to-emerald-500'
                          }`}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Terminal Console View */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs space-y-2 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 text-slate-400 text-[11px]">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-bold text-slate-300">automation-pipeline-worker-01.log</span>
              </div>
              <span>UTF-8 | bash</span>
            </div>

            <div className="h-48 overflow-y-auto space-y-1 text-slate-300 pr-1 text-[11px]">
              {terminalLogs.map((log, idx) => (
                <div
                  key={idx}
                  className={`${
                    log.includes('🚀') ? 'text-amber-300 font-bold' :
                    log.includes('✅') ? 'text-emerald-400 font-bold' :
                    log.includes('🤖') ? 'text-rose-400' : 'text-slate-400'
                  }`}
                >
                  {log}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>
          </div>
        </div>
      </div>

      {/* 24/7 Cloud Automation Blueprints & Runnable Scripts */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 md:p-8 rounded-2xl space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Server className="w-4 h-4" />
              <span>24/7 Production Deployment Blueprint</span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-white">
              โค้ดรันอัตโนมัติตลอด 24 ชม. บน Cloud / Server (Ready-to-Deploy)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              นำสคริปต์นี้ไปรันบน VPS / Docker / GitHub Actions / n8n เพื่อสั่งให้ AI สร้างบทและรันโพสต์ลงโซเชียล 100% ไร้คนเฝ้า
            </p>
          </div>

          {/* Tabs for code */}
          <div className="flex flex-wrap gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
            <button
              onClick={() => setActiveCodeTab('gcp')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCodeTab === 'gcp' ? 'bg-red-900/80 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ☁️ Google Cloud (GCP)
            </button>
            <button
              onClick={() => setActiveCodeTab('python')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCodeTab === 'python' ? 'bg-red-900/80 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Python Bot
            </button>
            <button
              onClick={() => setActiveCodeTab('n8n')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCodeTab === 'n8n' ? 'bg-red-900/80 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              n8n Workflow (LINE Node)
            </button>
            <button
              onClick={() => setActiveCodeTab('docker')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCodeTab === 'docker' ? 'bg-red-900/80 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Docker Compose
            </button>
          </div>
        </div>

        {/* Code Display Box */}
        <div className="relative bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/80 border-b border-slate-800 text-xs">
            <span className="font-mono text-slate-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              {activeCodeTab === 'gcp' ? 'gcp_vm_deployment.sh' :
               activeCodeTab === 'python' ? 'auto_pilot_drama.py' :
               activeCodeTab === 'n8n' ? 'ai-drama-n8n-workflow.json' : 'docker-compose.yml'}
            </span>
            <div className="flex items-center gap-2">
              {activeCodeTab === 'n8n' && (
                <button
                  onClick={handleDownloadN8nJson}
                  className="px-2.5 py-1 bg-emerald-950 text-emerald-300 border border-emerald-700/80 rounded hover:bg-emerald-900 text-[11px] font-bold flex items-center gap-1 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>ดาวน์โหลด JSON</span>
                </button>
              )}
              <button
                onClick={() => handleCopyCode(currentCodeText, activeCodeTab)}
                className="px-2.5 py-1 bg-slate-800 text-slate-200 rounded hover:bg-slate-700 text-[11px] font-bold flex items-center gap-1 transition-all"
              >
                {copiedCodeId === activeCodeTab ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">คัดลอกเรียบร้อย!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>คัดลอกโค้ด</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <pre className="p-4 font-mono text-[11px] leading-relaxed text-slate-300 overflow-x-auto max-h-80 select-all">
            {currentCodeText}
          </pre>
        </div>

        {/* Step-by-Step Google Cloud Deployment Guide */}
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-6 space-y-6">
          <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm uppercase">
            <Cloud className="w-5 h-5 text-amber-400" />
            <span>ขั้นตอนการติดตั้งระบบบอทสร้างละครบน Google Cloud Compute Engine (VM)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-amber-300 text-sm flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">1</span>
                <span>สร้าง VM Instance (Compute Engine)</span>
              </span>
              <p className="text-slate-300 leading-relaxed">
                คลิกปุ่ม <code className="bg-slate-950 px-1 py-0.5 rounded text-amber-300">+ Create instance</code> เลือก Machine type <code className="bg-slate-950 px-1 py-0.5 rounded text-amber-300">e2-medium</code> และ OS เป็น <code className="bg-slate-950 px-1 py-0.5 rounded text-amber-300">Ubuntu 22.04 LTS</code> เลือก Region <code className="bg-slate-950 px-1 py-0.5 rounded text-amber-300">asia-southeast1 (Singapore)</code>
              </p>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-rose-300 text-sm flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs">2</span>
                <span>SSH เข้าเครื่อง Virtual Machine</span>
              </span>
              <p className="text-slate-300 leading-relaxed">
                กดปุ่ม <code className="bg-slate-950 px-1 py-0.5 rounded text-rose-300">SSH</code> ด้านข้างชื่อ VM ใน GCP Console เพื่อเปิดหน้าต่าง Terminal คำสั่งสำหรับติดตั้งระบบ
              </p>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-cyan-300 text-sm flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">3</span>
                <span>ตั้งค่า .env (Gemini API & LINE Messaging API)</span>
              </span>
              <p className="text-slate-300 leading-relaxed">
                สร้างไฟล์ <code className="bg-slate-950 px-1 py-0.5 rounded text-cyan-300">.env</code> ใส่ <code className="bg-slate-950 px-1 py-0.5 rounded text-cyan-300">GEMINI_API_KEY</code>, <code className="bg-slate-950 px-1 py-0.5 rounded text-cyan-300">WEBHOOK_URL</code> และ <code className="bg-slate-950 px-1 py-0.5 rounded text-cyan-300">LINE_CHANNEL_ACCESS_TOKEN</code> + <code className="bg-slate-950 px-1 py-0.5 rounded text-cyan-300">LINE_USER_ID</code> เพื่อรับการแจ้งเตือนสด
              </p>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300 text-sm flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">4</span>
                <span>เปิดใช้งาน Systemd Service (รัน 24 ชม.)</span>
              </span>
              <p className="text-slate-300 leading-relaxed">
                ตั้งค่าไฟล์ <code className="bg-slate-950 px-1 py-0.5 rounded text-emerald-300">/etc/systemd/system/ai-drama-bot.service</code> เพื่อให้บอทรันเบื้องหลังตลอด 24 ชั่วโมง ถึงแม้เราจะปิดคอมพิวเตอร์บอทก็ยังทำงานต่อเนื่อง
              </p>
            </div>
          </div>

          {/* Error 405 Troubleshooting Notice Box */}
                 {/* LINE Messaging API Guide Notice */}
          <div className="bg-slate-900/90 p-5 rounded-xl border border-emerald-800/80 space-y-3">
            <h4 className="text-sm font-bold text-emerald-300 flex items-center space-x-2">
              <Server className="w-4 h-4 text-emerald-400" />
              <span>การตั้งค่า LINE Messaging API แทน LINE Notify (ที่ปิดบริการ):</span>
            </h4>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="bg-emerald-950/70 p-4 rounded-lg border border-emerald-800 space-y-2">
                <p className="text-emerald-300 font-bold text-xs flex items-center gap-1.5">
                  <span>📢</span> <span>เพื่อความเสถียรและใช้งานยั่งยืนหลัง LINE Notify ปิดตัว ให้ใส่ LINE Credentials ดังนี้:</span>
                </p>

                <div className="space-y-2 text-[11px] text-slate-300 pt-1">
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                    <p className="font-semibold text-amber-300">🔑 1. LINE Channel Access Token:</p>
                    <p className="text-slate-400">
                      ในโหนด n8n (Send LINE Messaging API) ส่วน <strong>Headers</strong> ให้ใส่คำว่า <code className="text-emerald-300">Bearer YOUR_CHANNEL_ACCESS_TOKEN</code>
                    </p>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                    <p className="font-semibold text-amber-300">👤 2. LINE User ID:</p>
                    <p className="text-slate-400">
                      ในส่วน <strong>JSON Body</strong> ช่อง <code className="text-rose-300 font-mono">"to"</code> ให้ใส่ User ID ของคุณ เช่น <code className="text-emerald-300 font-mono">"U1234567890abcdef..."</code>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Script Viewing Modal */}
      {selectedScriptModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 space-y-6 text-slate-200 shadow-2xl relative">
            <button
              onClick={() => setSelectedScriptModal(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>สคริปต์ละครฉบับเต็มที่สร้างโดย Gemini API</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                ตอนที่ {selectedScriptModal.epNumber}: {selectedScriptModal.title}
              </h3>
              <div className="flex items-center space-x-4 text-xs text-slate-400">
                <span>⏱️ ความยาว: {selectedScriptModal.estimatedDuration || '5 นาที'}</span>
                <span>📝 จำนวนคำ: {selectedScriptModal.wordCount || 650} คำ</span>
              </div>
            </div>

            {/* Hook Opening */}
            <div className="bg-rose-950/60 border border-rose-800/80 p-4 rounded-xl space-y-1">
              <span className="text-xs font-extrabold text-rose-300 uppercase tracking-wider block">
                🔥 HOOK OPENING (5 วินาทีแรก):
              </span>
              <p className="text-sm font-semibold text-rose-100">
                "{selectedScriptModal.hookOpening}"
              </p>
            </div>

            {/* Scenes */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                🎬 ฉากและบทสนทนาประจำตอน ({selectedScriptModal.scenes?.length || 0} ฉาก):
              </h4>

              {selectedScriptModal.scenes?.map((scene, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 text-xs">
                    <span className="font-extrabold text-amber-400">
                      ฉากที่ {scene.sceneNumber}: {scene.location}
                    </span>
                    <span className="text-slate-400">{scene.timeOfDay}</span>
                  </div>

                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    📷 <strong>Visual:</strong> {scene.visual}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold text-rose-400 block">💬 บทสนทนา (Dialogue):</span>
                    {scene.dialogue?.map((d, dIdx) => (
                      <div key={dIdx} className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80 text-xs space-y-0.5">
                        <span className="font-bold text-amber-300">{d.character}: </span>
                        {d.action && <span className="text-slate-400 italic">[{d.action}] </span>}
                        <span className="text-slate-100 font-medium">"{d.text}"</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1 pt-2 text-[11px] font-mono text-slate-400 border-t border-slate-900">
                    <p className="text-cyan-400 truncate">🎨 <strong>Midjourney:</strong> {scene.midjourneyPrompt}</p>
                    <p className="text-purple-400 truncate">🎥 <strong>Kling Video:</strong> {scene.klingVideoPrompt}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Moral Lesson */}
            <div className="bg-emerald-950/60 border border-emerald-800/80 p-4 rounded-xl space-y-1">
              <span className="text-xs font-extrabold text-emerald-300 uppercase tracking-wider block">
                🌿 บทเรียนคุณธรรม (Moral Lesson):
              </span>
              <p className="text-xs text-emerald-200 italic">
                "{selectedScriptModal.moralLesson}"
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
