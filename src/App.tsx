import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { OverviewTab } from './components/OverviewTab';
import { Loglines60Tab } from './components/Loglines60Tab';
import { Episode1ScriptTab } from './components/Episode1ScriptTab';
import { GeneratorTab } from './components/GeneratorTab';
import { PromptStudioTab } from './components/PromptStudioTab';
import { AutomationWorkflowTab } from './components/AutomationWorkflowTab';
import { Automation100Tab } from './components/Automation100Tab';
import { EpisodeLogline } from './data/dramaData';
import { Film, Heart, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('auto100');
  const [selectedEpisodeForGenerator, setSelectedEpisodeForGenerator] = useState<EpisodeLogline | null>(null);

  const handleSelectEpisodeForScript = (ep: EpisodeLogline) => {
    setSelectedEpisodeForGenerator(ep);
    setActiveTab('generator');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-red-900 selection:text-white flex flex-col justify-between">
      <div>
        {/* Navigation Bar */}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {activeTab === 'overview' && <OverviewTab onSelectTab={setActiveTab} />}
          {activeTab === 'loglines' && (
            <Loglines60Tab onSelectEpisodeForScript={handleSelectEpisodeForScript} />
          )}
          {activeTab === 'ep1' && <Episode1ScriptTab />}
          {activeTab === 'generator' && (
            <GeneratorTab initialEpisode={selectedEpisodeForGenerator} />
          )}
          {activeTab === 'prompts' && <PromptStudioTab />}
          {activeTab === 'workflow' && <AutomationWorkflowTab />}
          {activeTab === 'auto100' && <Automation100Tab />}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500 space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Film className="w-4 h-4 text-red-500" />
          <span className="font-semibold text-slate-400">
            AI Short Drama Studio — ซีรีส์ละครคุณธรรม 60 ตอน
          </span>
        </div>
        <p className="text-[11px] text-slate-600">
          ขับเคลื่อนด้วย Gemini 3.6 Flash API & Midjourney / Kling AI Visual Prompts
        </p>
      </footer>
    </div>
  );
}
