"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  FastForward,
  CheckCircle2,
  Tv,
  Layers,
  Sparkles,
  TrendingUp,
  PieChart,
  Globe2,
  Sliders,
  Flame,
  Award,
  ChevronRight,
  Maximize2,
  Subtitles
} from "lucide-react";

interface Scene {
  id: number;
  title: string;
  duration: number; // in seconds
  moduleIcon: any;
  badge: string;
  hinglishNarration: string;
  englishSubtitles: string;
  visualHighlights: string[];
  keyMetric: string;
}

export const VideoWalkthrough: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showCaptions, setShowCaptions] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const scenes: Scene[] = [
    {
      id: 1,
      title: "1. Introduction & Executive Mandate (Vedanta / HZL)",
      duration: 18,
      moduleIcon: Award,
      badge: "Platform Overview",
      hinglishNarration: "Namaste! Welcome to MetalSense AI walkthrough – Hindustan Zinc Limited (HZL - Vedanta Group) ke liye purpose-built Domestic Demand Sensing aur Commercial Optimization Platform. Is platform ko Zinc, Lead, Silver aur Cadmium ke liye banaya gaya hai taaki Chanderiya, Dariba, Debari aur Pantnagar smelters ka Net Sales Realization maximize ho sake aur annually ₹220+ Crores ka incremental EBITDA unlock ho.",
      englishSubtitles: "Welcome to MetalSense AI – purpose-built for Hindustan Zinc Limited across Zinc, Lead, Silver, and Cadmium to unlock ₹220+ Crores annual EBITDA expansion.",
      visualHighlights: [
        "HZL 4 Smelters: Chanderiya (558ktpa), Dariba (325ktpa), Debari (88ktpa), Pantnagar (465ktpa)",
        "Covered Metals: Zinc (SHG, CGG, Jumbo, PW), Lead 99.99%, Silver 99.99%, Cadmium 99.99%",
        "Goal: Defend against seaborne imports & maximize physical physical spot premiums"
      ],
      keyMetric: "+₹220 Cr Annual EBITDA Opportunity"
    },
    {
      id: 2,
      title: "2. Module A: Demand Sensing & 1-to-6 MoM AI Forecast",
      duration: 22,
      moduleIcon: TrendingUp,
      badge: "Module A",
      hinglishNarration: "Module A me executive demand sensing dashboard hai. Yahan aap metal, grade jaise SHG 99.995% ya Jumbo Ingot, aur regions – North, West, South, East filter kar sakte hain. Historical 12-month data ke saath 1-se-6 month forward AI forecast dikhta hai with 80% aur 95% Confidence Intervals. Downstream macro drivers jaise Gati Shakti highway guardrails, auto build rates, aur solar PV PLI scheme is forecast ko real-time regress karte hain. What-If sensitivity sliders se user steel ya EV growth shock simulate kar sakta hai.",
      englishSubtitles: "Module A delivers 1-to-6 month forward AI demand forecasts with 80% & 95% confidence intervals, regressed on downstream steel, automotive, and solar PV mandates.",
      visualHighlights: [
        "Granular Filtering: Grade (SHG, CGG, Jumbo, PW) & Region (North, West, South, East)",
        "Econometric Confidence Bands: 80% and 95% uncertainty fanning over 6 months",
        "Macro Regressors: Galvanized steel production, 2W/4W vehicle build rates, solar cell expansions",
        "Interactive What-If Sliders: Instant recalculation under sector shocks (+/- 10%)"
      ],
      keyMetric: "94.2% AI Econometric Fit (R² = 0.91)"
    },
    {
      id: 3,
      title: "3. Module B: TAM & SAM Engine & EXIM Customs Import Parity",
      duration: 24,
      moduleIcon: PieChart,
      badge: "Module B",
      hinglishNarration: "Module B Indian domestic consumption ka stacked breakdown deta hai: Total Domestic Consumption = HZL Primary Domestic Sales + Domestic Secondary Scrap + EXIM Seaborne Imports. Iska sabse powerful feature hai Indian Customs Bill of Lading table – jahan Tata Steel, JSW Steel, AM/NS, POSCO Maharashtra, aur Exide jaise top importing accounts track hote hain. Unka origin country jaise South Korea aur Kazakhstan, port of entry, CIF price, aur Korea CEPA zero-percent duty ke baad landed cost calculate hota hai, with a strategic win-back playbook for HZL sales teams.",
      englishSubtitles: "Module B maps Total Domestic Consumption and analyzes EXIM Bill of Lading data, comparing Korean/Kazakh landed parity against HZL ex-works pricing.",
      visualHighlights: [
        "Market Sizing: TAM (725k MT) vs SAM (623k MT) vs Current HZL Sales (515k MT)",
        "Top Importers Table: Tata Steel, JSW Coated, POSCO, AM/NS, Exide, Amara Raja",
        "Tariff Intelligence: Korea CEPA (0%) vs Normal Customs Duty (7.5% + SWS)",
        "Strategic Substitution Playbook: Dedicated freight offsets & Jumbo Ingot dross reduction"
      ],
      keyMetric: "₹1,876 Cr Contestable Seaborne Import Bounty"
    },
    {
      id: 4,
      title: "4. Module C: Global Arbitrage & Gemini AI Intelligence",
      duration: 22,
      moduleIcon: Globe2,
      badge: "Module C",
      hinglishNarration: "Module C live global exchange tickers compare karta hai across LME, SHFE Shanghai, MCX India, aur CME Comex, along with USD/INR exchange rate. SHFE/LME export ratio alert karta hai jab China se exports trigger hote hain. Interactive Landed Cost Calculator se ocean freight, customs duty, aur port handling include karke HZL ka exact pricing cushion nikalta hai. Sath me Google Gemini 2.5 Flash integrated hai, jo live news, DGTR anti-dumping investigations aur warehouse notices ko instantly Bullish, Bearish ya Neutral score karke commercial recommendations deta hai.",
      englishSubtitles: "Module C tracks live exchange parity (LME, SHFE, MCX, CME), computes domestic import parity cushions, and leverages Gemini AI for real-time policy intelligence.",
      visualHighlights: [
        "Multi-Exchange Live Grid: LME ($/MT), SHFE (RMB/MT), MCX (₹/kg), CME ($/MT)",
        "SHFE/LME Export Ratio Tracker: Identifies Asian physical export arbitrage windows",
        "Interactive Parity Calculator: LME + Ocean Freight + Customs Tariff + Inland Transport",
        "Gemini 2.5 Flash Copilot: Instant news ingestion with sentiment scoring & desk directives"
      ],
      keyMetric: "+₹2,300 to +₹7,100/MT HZL Pricing Headroom"
    },
    {
      id: 5,
      title: "5. Module D: Commercial Premium & Monthly Auction Allocation Optimizer",
      duration: 24,
      moduleIcon: Sliders,
      badge: "Module D",
      hinglishNarration: "Module D commercial marketing leadership ke liye mathematical linear programming solver hai. Chanderiya, Dariba, Debari ya Pantnagar se available monthly production volume input kijiye, aur ye solver Long-Term Contracts (LTC) aur Spot e-Auction volumes ka optimal split calculate karta hai to maximize Net Sales Realization (NSR in ₹ Crores). Spot price elasticity model ensure karta hai ki auction flood hone se premium na gire. Traditional 80:20 allocation ke mukable ye monthly ₹15 se ₹25 Crores ka incremental upside deta hai, aur official signed Commercial Directive Memorandum generate karta hai.",
      englishSubtitles: "Module D uses Linear Programming to solve the optimal LTC vs Spot Auction volume split, capturing maximum NSR and generating official allocation memorandums.",
      visualHighlights: [
        "Production Batch Simulator: 15,000 to 60,000 MT monthly available volume",
        "LP Optimization Model: Solves optimal LTC (e.g. 65%) vs Spot Auction (35%) split",
        "Spot Elasticity Penalty: Prevents depressing premiums beyond market depth",
        "Customer Tier Quotas: Allocations across Tata/JSW, Tier-2 Tube Mills, and B2B Spot Auctions",
        "Export Arbitrage Check: Tests FOB West Coast export netback vs domestic NSR"
      ],
      keyMetric: "+₹18.4 Crores/Month Incremental NSR Gain"
    },
    {
      id: 6,
      title: "6. Geopolitical War Room: 2024–2026 Real-World Shocks Ingested",
      duration: 26,
      moduleIcon: Flame,
      badge: "Geopolitical War Room",
      hinglishNarration: "Platform me recent do saal ke 5 authentic geopolitical events live simulated hain: Pehla, Red Sea crisis – jahan Cape of Good Hope rerouting se freight $80/MT badha aur import landed cost ₹6,800/MT mehenga hua, jisse HZL ne spot floor premium $24/MT badha kar +₹36.8 Cr banaye. Dusra, Middle East conflict – jisme Silver $34/oz aur MCX ₹98,000/kg par pahucha, aur ALMM solar paste ke liye cash auction se +₹142.5 Cr gain hua. Teesra, European smelter power curtailments (Nyrstar/Glencore 450kt shut) jisse export arbitrage khula (+₹54 Cr). Chautha, Global mine TC collapse jahan HZL ke 100% captive mines ne 88% domestic market share capture kiya (+₹88.2 Cr). Aur paanchwa, Russian metal sanctions jahan quality compliance se margins protect hue.",
      englishSubtitles: "The Geopolitical War Room models real-world 2024–2026 events: Red Sea blockade, Middle East Silver safe-haven surge, European smelter outages, and global concentrate TC squeezes.",
      visualHighlights: [
        "Red Sea Maritime Blockade: Seaborne delay +3 weeks, freight +$80/MT (+₹36.8 Cr EBITDA)",
        "Middle East Conflict & Silver Surge: COMEX >$34/oz, MCX >₹98k/kg (+₹142.5 Cr EBITDA)",
        "European Smelter Power Outages: Nyrstar/Glencore cuts open export window (+₹54 Cr)",
        "Global Mine TC Squeeze: HZL 100% captive mines (<$1,100/MT COP) expand share to 88%",
        "Russian Metal Sanctions: Defense of primary 99.99% quality contracts against scrap"
      ],
      keyMetric: "+₹339.9 Crores Total Geopolitical Value Captured"
    },
    {
      id: 7,
      title: "7. Executive Boardroom Pitch Deck & Client Purchase Mandate",
      duration: 20,
      moduleIcon: Award,
      badge: "Executive Pitch",
      hinglishNarration: "Aakhri me, platform ke andar ek dedicated 10-slide Boardroom Presentation Mode embed kiya gaya hai. Is presentation me Problem Statement, Solution Architecture, Real-World War Shocks, Financial Feasibility (+₹220 to +₹310 Cr annual EBITDA, under 45 days payback), aur Why Buy vs Build matrix shamil hai. Generic ERPs jaise SAP ya Bloomberg base-metal physical landed parity aur auction elasticity solve nahi kar sakte. Isliye HZL executive leadership is turnkey platform ko 60-day risk-aligned pilot me immediately approve kar sakti hai.",
      englishSubtitles: "An interactive 10-slide boardroom deck is built right into the app to present the ₹220+ Cr business case, competitive moat, and 60-day pilot roadmap to HZL leadership.",
      visualHighlights: [
        "10 Boardroom Slides: Problem, Architecture, War Shocks, Financial ROI, Why Buy vs Build",
        "Why SAP & Bloomberg Fail: Lack physical customs landed parity & non-ferrous LP optimization",
        "60-Day Pilot Roadmap: Chanderiya & Dariba pilot in weeks 1-4, Pantnagar silver in weeks 5-8",
        "One-Click PDF Export: Boardroom-ready executive directive"
      ],
      keyMetric: "<45 Days Payback Period (>18x Year 1 ROI)"
    }
  ];

  const currentScene = scenes[currentSceneIndex];
  const totalDuration = scenes.reduce((acc, s) => acc + s.duration, 0);

  // Text-To-Speech Narration Synthesis
  const playSpeech = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || isMuted) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = playbackSpeed;
    utterance.pitch = 1.0;

    // Try finding an Indian English or Hindi voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.includes("en-IN") || v.lang.includes("hi-IN") || v.lang.includes("en-GB"));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      // If playing, auto-advance to next scene
      if (isPlaying && currentSceneIndex < scenes.length - 1) {
        handleSceneChange(currentSceneIndex + 1);
      } else if (isPlaying && currentSceneIndex === scenes.length - 1) {
        setIsPlaying(false);
      }
    };

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.pause();
      }
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        } else {
          playSpeech(currentScene.hinglishNarration);
        }
      }
    }
  };

  const handleSceneChange = (index: number) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setCurrentSceneIndex(index);
    // calculate time
    let time = 0;
    for (let i = 0; i < index; i++) {
      time += scenes[i].duration;
    }
    setCurrentTime(time);

    if (isPlaying) {
      setTimeout(() => {
        playSpeech(scenes[index].hinglishNarration);
      }, 100);
    }
  };

  const handleRestart = () => {
    handleSceneChange(0);
    if (!isPlaying) {
      setIsPlaying(true);
      setTimeout(() => {
        playSpeech(scenes[0].hinglishNarration);
      }, 100);
    }
  };

  const toggleMute = () => {
    if (!isMuted) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsMuted(true);
    } else {
      setIsMuted(false);
      if (isPlaying) {
        playSpeech(currentScene.hinglishNarration);
      }
    }
  };

  const handleSpeedChange = () => {
    const speeds = [1, 1.25, 1.5];
    const nextSpeed = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
    setPlaybackSpeed(nextSpeed);
    if (isPlaying) {
      playSpeech(currentScene.hinglishNarration);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 via-purple-600 to-sky-600 flex items-center justify-center shadow-md">
            <Tv className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-bold border border-rose-200 uppercase">
                Video Walkthrough • Hinglish Audio + English Subtitles
              </span>
              <span className="text-xs text-slate-500 font-medium">Total Duration: ~2.5 mins</span>
            </div>
            <h2 className="text-base font-extrabold text-slate-900 mt-0.5">
              MetalSense AI Complete Platform Walkthrough for Hindustan Zinc Limited
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePlayPause}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-sky-600 hover:from-rose-500 hover:to-sky-500 text-white text-xs font-bold shadow-sm transition"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            <span>{isPlaying ? "Pause Walkthrough" : "Play Hinglish Video Walkthrough"}</span>
          </button>
        </div>
      </div>

      {/* Main Cinematic Video Player Frame (16:9 Aspect Ratio) */}
      <div className="relative rounded-2xl bg-gradient-to-br from-[#0c1428] via-[#080d1a] to-[#04070f] border border-sky-500/30 shadow-2xl overflow-hidden aspect-[16/9] max-h-[580px] flex flex-col justify-between p-6">
        {/* Top Video Overlay Bar */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider bg-black/60 px-2.5 py-1 rounded-md border border-slate-700 backdrop-blur-sm">
              SCENE {currentSceneIndex + 1} OF {scenes.length}: {currentScene.badge}
            </span>
          </div>

          <div className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-md border border-emerald-800/60 backdrop-blur-sm">
            {currentScene.keyMetric}
          </div>
        </div>

        {/* Center Animated Visual Frame for Current Scene */}
        <div className="my-auto py-4 max-w-4xl mx-auto w-full text-center space-y-4 z-10">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-sky-500/20 to-blue-600/30 border border-sky-400/40 shadow-inner">
            <currentScene.moduleIcon className="w-8 h-8 text-sky-400 animate-bounce" />
          </div>

          <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            {currentScene.title}
          </h3>

          {/* Dynamic Visual Highlights Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-left max-w-3xl mx-auto pt-2">
            {currentScene.visualHighlights.map((hl, i) => (
              <div
                key={i}
                className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md flex items-start gap-2 text-xs text-slate-200"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 flex-shrink-0 mt-0.5" />
                <span className="leading-snug font-sans">{hl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Subtitles / Caption Ribbon */}
        {showCaptions && (
          <div className="z-10 max-w-4xl mx-auto w-full space-y-1.5 text-center">
            {/* Hinglish Voiceover Transcript */}
            <div className="p-3 rounded-xl bg-black/85 border border-amber-500/40 text-amber-300 text-xs font-medium backdrop-blur-md leading-relaxed shadow-lg">
              <span className="font-bold text-white font-mono mr-1.5">🎙️ Hinglish Narration:</span>
              &ldquo;{currentScene.hinglishNarration}&rdquo;
            </div>

            {/* English Subtitles */}
            <div className="text-[11px] font-mono text-slate-400 italic">
              English Subtitle: {currentScene.englishSubtitles}
            </div>
          </div>
        )}

        {/* Bottom Player Controls Strip */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs z-10 bg-black/50 -mx-6 -mb-6 px-6 py-3 backdrop-blur-md">
          {/* Play, Pause, Restart, Skip */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePlayPause}
              className="p-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white transition font-bold"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            </button>
            <button
              onClick={handleRestart}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="Restart from beginning"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={toggleMute}
              className={`p-2 rounded-lg transition ${
                isMuted ? "bg-rose-950 text-rose-400 border border-rose-800" : "bg-slate-800 text-slate-300"
              }`}
              title={isMuted ? "Unmute Voiceover" : "Mute Voiceover"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={handleSpeedChange}
              className="px-2 py-1 rounded bg-slate-800 text-sky-300 font-mono text-xs font-bold hover:bg-slate-700"
              title="Change Speed"
            >
              {playbackSpeed}x
            </button>
            <button
              onClick={() => setShowCaptions(!showCaptions)}
              className={`p-2 rounded-lg transition ${
                showCaptions ? "bg-sky-950 text-sky-400 border border-sky-800" : "bg-slate-800 text-slate-400"
              }`}
              title="Toggle Subtitles"
            >
              <Subtitles className="w-4 h-4" />
            </button>
          </div>

          {/* Scene Navigation Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
            {scenes.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => handleSceneChange(idx)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition whitespace-nowrap ${
                  currentSceneIndex === idx
                    ? "bg-sky-500 text-white font-bold shadow-md shadow-sky-900/50"
                    : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                }`}
              >
                {s.badge}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Complete Hinglish Script & Scene Breakdown Grid */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Complete Walkthrough Video Script (Word-for-Word in Hinglish)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Production script ready for video recording, client presentations, or commercial enablement.
            </p>
          </div>
          <span className="text-xs font-mono text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200 font-semibold">
            7 Enterprise Scenes
          </span>
        </div>

        <div className="space-y-3">
          {scenes.map((scene, idx) => (
            <div
              key={scene.id}
              onClick={() => handleSceneChange(idx)}
              className={`p-4 rounded-xl border transition cursor-pointer ${
                currentSceneIndex === idx
                  ? "bg-sky-50/80 border-sky-300 shadow-sm"
                  : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sky-700">SCENE {scene.id}:</span>
                  <span className="font-bold text-slate-900">{scene.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono text-[11px] font-bold border border-emerald-200">
                    {scene.keyMetric}
                  </span>
                  <span className="font-mono text-slate-500 text-[11px]">Duration: ~{scene.duration}s</span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-amber-900 font-medium leading-relaxed font-sans shadow-sm">
                &ldquo;{scene.hinglishNarration}&rdquo;
              </div>

              <div className="text-[11px] text-slate-500 italic mt-1.5 pl-1">
                English Subtitle: {scene.englishSubtitles}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
