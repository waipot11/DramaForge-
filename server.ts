import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing. Please configure it in Settings > Secrets.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Endpoint 1: Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API Endpoint 1.5: Sample Video Proxy (bypasses CDN 403 Forbidden blocks in n8n / Make)
app.get("/api/sample-video.mp4", async (req, res) => {
  try {
    const videoUrl = "https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/person-bicycle-car-detection.mp4";
    const response = await fetch(videoUrl);
    if (!response.ok) {
      return res.status(500).send("Failed to fetch sample video");
    }
    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "public, max-age=86400");
    const arrayBuffer = await response.arrayBuffer();
    return res.send(Buffer.from(arrayBuffer));
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
});

// API Endpoint 1.6: Free Thai Text-To-Speech Proxy (Google TTS - Zero Cost)
app.get("/api/tts", async (req, res) => {
  try {
    const text = (req.query.text as string) || "ทดสอบระบบเสียงพากย์ละครอัตโนมัติ";
    const cleanText = text.slice(0, 200);
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(cleanText)}&tl=th&client=tw-ob`;
    const response = await fetch(ttsUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      }
    });
    if (!response.ok) {
      return res.status(500).send("TTS generation failed");
    }
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Access-Control-Allow-Origin", "*");
    const arrayBuffer = await response.arrayBuffer();
    return res.send(Buffer.from(arrayBuffer));
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
});

// API Endpoint 1.7: Free Pollinations.ai 9:16 AI Image Generator Proxy (Zero Cost)
app.get("/api/ai-image", async (req, res) => {
  try {
    const prompt = (req.query.prompt as string) || "Cinematic 9:16 shot of Asian female CEO in crimson suit, hyperrealistic 8k";
    const seed = req.query.seed || "42";
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=720&height=1280&nologo=true&seed=${seed}`;
    const response = await fetch(imageUrl);
    if (!response.ok) {
      return res.status(500).send("Image generation failed");
    }
    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader("Access-Control-Allow-Origin", "*");
    const arrayBuffer = await response.arrayBuffer();
    return res.send(Buffer.from(arrayBuffer));
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
});

// API Endpoint 2: Generate Full Episode Script via Gemini API
app.post("/api/generate-episode-script", async (req, res) => {
  try {
    const { epNumber, title, logline, arcTitle } = req.body;

    if (!epNumber || !title || !logline) {
      return res.status(400).json({ error: "Missing required parameters: epNumber, title, or logline" });
    }

    const ai = getAiClient();

    const systemInstruction = `คุณเป็นนักเขียนบทละครสั้นและหนังสั้นระดับพรีเมียม (Short-Form Drama & AI Film Screenwriter) สำหรับ TikTok, Shorts, Reels
การสร้างหนังสั้นด้วย AI จะแบ่งออกเป็น 6 ขั้นตอนหลัก:
1. เขียนบทและโครงเรื่อง (Gemini): คิดพล็อต บทพูด High Conflict แบ่งฉาก Scene by Scene ความยาว 5 นาที (600-700 คำ) พร้อม Hook 5 วินาทีแรก
2. ออกแบบตัวละครและฉากภาพนิ่ง (Midjourney): สร้าง Midjourney Prompt 9:16 ที่มีคำสั่งล็อกใบหน้าตัวละคร (--cref / Character Reference)
3. แปลงภาพนิ่งให้เคลื่อนไหว (Runway Gen-2 / Gen-3): สร้าง Runway Prompt ควบคุมการขยับมุมกล้องและตัวละคร 4-10 วินาที
4. สร้างเสียงพากย์และบทบรรยาย (ElevenLabs): คำสั่งสไตล์เสียงพากย์ อารมณ์ (Revenge, Suspense) และอารมณ์ร่วม
5. สร้างเพลงประกอบและเอฟเฟกต์เสียง (Suno): Suno Music Prompt แนว Cinematic Horror / Dark Revenge ไร้ลิขสิทธิ์
6. ตัดต่อและรวมไฟล์ (CapCut): คำแนะนำการวาง Layer ไทม์ไลน์, Transition และ Auto Subtitle`;

    const prompt = `เขียนบทหนังสั้นละครสั้นดราม่าล้างแค้นฉบับเต็ม ตอนที่ ${epNumber}: "${title}" (${arcTitle || 'เงาเพลิงแค้น ล้างบาประธานซาตาน'})
เรื่องย่อประจำตอน (Logline): "${logline}"

ตอบกลับในรูปแบบ JSON ตาม Schema นี้เท่านั้น:
{
  "epNumber": ${epNumber},
  "title": "${title}",
  "wordCount": 650,
  "estimatedDuration": "5 นาที",
  "hookOpening": "ประโยคเปิดตัวกระชากอารมณ์ใน 5 วินาทีแรก",
  "sixStepsGuide": {
    "step1Scripting": "บทละครสั้นแบ่งฉาก Scene by Scene ความยาว 5 นาที",
    "step2Midjourney": "Midjourney Prompts ที่มี --cref ล็อกใบหน้าตัวละคร",
    "step3Runway": "Runway Gen-2/Gen-3 Motion Prompts ความยาว 4-10 วินาที",
    "step4ElevenLabs": "ElevenLabs Voice Settings & Emotion Tags",
    "step5SunoMusic": "Suno AI BGM Prompt แนว Cinematic Horror/Revenge",
    "step6CapCut": "CapCut Timeline Setup & Auto Subtitle Guide"
  },
  "scenes": [
    {
      "sceneNumber": 1,
      "location": "สถานที่ฉาก",
      "timeOfDay": "กลางวัน/กลางคืน ฝนตก/ในห้องประชุม",
      "visual": "การบรรยายภาพ บรรยากาศ และมุมกล้องอย่างละเอียด",
      "cameraDirection": "Slow push-in on Madame Eva's confident smile, dramatic low-angle shot",
      "dialogue": [
        { "character": "มาดามเอวา", "action": "ยิ้มเย็นชา ก้าวขาเข้ามาพร้อมเอกสารสัญญา", "text": "บทพูดเชือดเฉือน" },
        { "character": "ภพธรรม", "action": "หน้าเสีย เหงื่อตก สายตาตระหนก", "text": "บทพูดตื่นตระหนก" }
      ],
      "midjourneyPrompt": "Cinematic 9:16 shot of a confident Asian female CEO in crimson suit, hyperrealistic 8k --ar 9:16 --style raw --cref [character_id]",
      "klingVideoPrompt": "Runway Gen-3: Dynamic camera zoom in on Asian female CEO holding legal documents, atmospheric lighting, 4-10sec duration, 9:16 ratio",
      "elevenLabsSettings": "Voice: Female Calm Revenge, Emotion: Confident & Sharp, Stability: 50%, Clarity: 75%",
      "sunoMusicPrompt": "Cinematic dark suspense horror soundtrack, heavy orchestral brass, dramatic revenge tension"
    }
  ],
  "moralLesson": "บทเรียนคุณธรรมประจำตอนที่กินใจ"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text || "";
    const parsedData = JSON.parse(responseText);

    return res.json({ success: true, script: parsedData });
  } catch (error: any) {
    console.error("Error generating script:", error);
    return res.status(500).json({ error: error.message || "Failed to generate script" });
  }
});

// API Endpoint 3: Generate Visual Prompts for Custom Scene
app.post("/api/generate-prompts", async (req, res) => {
  try {
    const { sceneDescription, characterName } = req.body;
    const ai = getAiClient();

    const prompt = `จากฉากนี้: "${sceneDescription}" (ตัวละครหลัก: ${characterName || 'มาดามเอวา'})
โปรดสร้าง Prompt ภาษาอังกฤษสำหรับ:
1. Midjourney Image Prompt (Cinematic, dramatic lighting, 9:16 aspect ratio, 8k)
2. Kling AI / Runway Gen-3 Video Prompt (Camera motion, atmospheric action)

ส่งผลลัพธ์กลับในรูปแบบ JSON:
{
  "midjourneyPrompt": "...",
  "klingVideoPrompt": "...",
  "lumaPrompt": "..."
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsedData = JSON.parse(response.text || "{}");
    return res.json({ success: true, prompts: parsedData });
  } catch (error: any) {
    console.error("Error generating prompts:", error);
    return res.status(500).json({ error: error.message || "Failed to generate prompts" });
  }
});

// API Endpoint 4: Proxy Webhook Trigger to bypass browser CORS constraints
app.post("/api/trigger-webhook", async (req, res) => {
  try {
    const { webhookUrl, payload } = req.body;
    if (!webhookUrl || !webhookUrl.startsWith("http")) {
      return res.status(400).json({ success: false, error: "Invalid or missing Webhook URL" });
    }

    console.log(`[Webhook Proxy] Triggering ${webhookUrl}`);

    const response = await fetch(webhookUrl.trim(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload || {}),
    });

    const responseText = await response.text();
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = responseText;
    }

    return res.json({
      success: response.ok,
      status: response.status,
      statusText: response.statusText,
      data: responseData,
    });
  } catch (error: any) {
    console.error("Webhook Proxy Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to trigger webhook",
    });
  }
});

// Mount Vite middleware or Static Server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
