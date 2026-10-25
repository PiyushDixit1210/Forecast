"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  TrendingUp,
  ShieldAlert,
  Flame,
  CheckCircle2,
  DollarSign,
  Building2,
  Layers,
  Cpu,
  ArrowRight,
  Database,
  BarChart3,
  Scale,
  Award,
  Sparkles,
  Printer
} from "lucide-react";

export const ExecutivePresentation: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const totalSlides = 10;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        setCurrentSlide((prev) => Math.min(prev + 1, totalSlides));
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        setCurrentSlide((prev) => Math.max(prev - 1, 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, totalSlides));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 1));

  return (
    <div className={`space-y-4 ${isFullscreen ? "fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-md p-6 overflow-y-auto" : ""}`}>
      {/* Presentation Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-sky-600 flex items-center justify-center shadow-md">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest font-mono">
                Executive Boardroom Presentation
              </span>
              <span className="text-xs text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-medium">Commercial Leadership Deck</span>
            </div>
            <h2 className="text-sm font-extrabold text-slate-900">
              MetalSense AI: Transforming HZL Commercial Realization & Import Defense
            </h2>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs font-mono bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700">
            <span>Slide</span>
            <span className="font-bold text-sky-600">{currentSlide}</span>
            <span className="text-slate-400">/</span>
            <span>{totalSlides}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 1}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 border border-slate-200 transition"
              title="Previous Slide (Left Arrow)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides}
              className="p-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white transition font-bold shadow-sm"
              title="Next Slide (Right Arrow)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition"
            title="Toggle Fullscreen Presentation"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Slide Viewport (High-Impact Enterprise Aesthetic) */}
      <div className="min-h-[580px] rounded-2xl bg-gradient-to-br from-[#0c1428] via-[#090f1e] to-[#060a14] border border-slate-800/90 shadow-2xl p-8 relative flex flex-col justify-between overflow-hidden">
        {/* Subtle Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* ---------------- SLIDE 1: Title & Executive Mandate ---------------- */}
        {currentSlide === 1 && (
          <div className="my-auto space-y-6 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Strategic Commercial Transformation Platform
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              MetalSense AI: Domestic Demand Sensing & Commercial Optimization
            </h1>

            <p className="text-xl font-medium text-slate-300">
              Tailored for <span className="text-white font-bold">Hindustan Zinc Limited (HZL – Vedanta Group)</span>
            </p>

            <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Unlocking <span className="text-emerald-400 font-bold">₹220+ Crores ($26M+) Annual EBITDA</span> by transforming physical premium pricing, defending against seaborne foreign imports, and dynamically navigating global war & supply shocks.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 max-w-3xl mx-auto text-left">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Covered Metals</div>
                <div className="text-sm font-bold text-white mt-0.5">Zn, Pb, Ag, Cd</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Smelter Facilities</div>
                <div className="text-sm font-bold text-white mt-0.5">4 Strategic Hubs</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Annual EBITDA ROI</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">+₹220 – ₹310 Cr</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Time-to-Value</div>
                <div className="text-sm font-bold text-sky-400 mt-0.5">60-Day Pilot</div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- SLIDE 2: The Burning Platform & Pain Points ---------------- */}
        {currentSlide === 2 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
                Problem Statement & Revenue Leakage
              </span>
              <h2 className="text-2xl font-black text-white mt-1">
                The Burning Platform: Why HZL Currently Leaves ₹250+ Cr on the Table
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Despite holding lowest-decile captive mining costs, HZL faces commercial blindspots that reduce Net Sales Realization (NSR).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-900/40 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <ShieldAlert className="w-4 h-4" />
                  <span>1. Seaborne Foreign Import Incursions</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Over <strong className="text-white">105,000 MT of foreign zinc</strong> enters Indian ports annually from South Korea (under 0% India-Korea CEPA) and Kazakhstan. Sales teams lack real-time visibility into competitors' landed cost parity down to port handling and rail freight netting.
                </p>
                <div className="text-[11px] font-mono text-rose-300 bg-rose-950/60 p-2 rounded">
                  Annual Margin Opportunity Lost: ₹75+ Crores
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-900/40 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <Scale className="w-4 h-4" />
                  <span>2. Rigid 80:20 LTC Allocation Inertia</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  HZL traditionally locks ~80% of volume into Long-Term Contracts (LTC) based on static annual formulas. When market backwardation spikes spot premiums by +$25/MT, HZL cannot capture the upside because production is pre-committed on discounted terms.
                </p>
                <div className="text-[11px] font-mono text-rose-300 bg-rose-950/60 p-2 rounded">
                  Annual NSR Optimization Forgone: ₹85+ Crores
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-900/40 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <Flame className="w-4 h-4" />
                  <span>3. Reactive Lag to Geopolitical & War Shocks</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  When the Red Sea was blocked or Middle East tensions surged, ocean container rates jumped 240% overnight. It took manual sales teams 4–6 weeks to recognize that foreign import costs had surged by ₹6,800/MT, missing the window to raise prompt auction reserve prices.
                </p>
                <div className="text-[11px] font-mono text-rose-300 bg-rose-950/60 p-2 rounded">
                  Pricing Headroom Unrealized: ₹50+ Crores
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-900/40 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <BarChart3 className="w-4 h-4" />
                  <span>4. Disconnected Macro & Downstream Visibility</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Downstream shifts (ALMM solar mandates, Gati Shakti crash barrier tenders, EV auxiliary battery changes) are tracked in siloed PDF reports rather than mathematically regressed into forward production quotas.
                </p>
                <div className="text-[11px] font-mono text-rose-300 bg-rose-950/60 p-2 rounded">
                  Working Capital & Inventory Misalignment: ₹40+ Crores
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- SLIDE 3: The Solution Architecture ---------------- */}
        {currentSlide === 3 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                Platform Architecture
              </span>
              <h2 className="text-2xl font-black text-white mt-1">
                The MetalSense AI Tri-Layered Intelligence Architecture
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                An end-to-end commercial operating system bridging global macroeconomic signals with HZL smelter dispatches.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-slate-900/90 border border-sky-500/40 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                  01
                </div>
                <h3 className="text-base font-bold text-white">Macro Demand Sensing</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Ingests Indian downstream economic regressors (steel production, auto OEM builds, MNRE ALMM solar cell installations) to forecast 1-to-6 month MoM demand with 80% & 95% confidence intervals.
                </p>
                <div className="pt-2 text-[11px] font-mono text-sky-300">
                  Feature: Instant What-If sensitivity sliders for steel and battery shocks.
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/90 border border-sky-500/40 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  02
                </div>
                <h3 className="text-base font-bold text-white">EXIM Landed Parity Engine</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Parses Indian Customs Bill of Lading data to track seaborne imports (Tata, JSW, POSCO, Exide). Computes precise landed cost in ₹/MT including BCD (7.5%), Korea CEPA (0%), freight, and port wharfage.
                </p>
                <div className="pt-2 text-[11px] font-mono text-emerald-300">
                  Feature: Reveals exact pricing headroom vs Korean/Kazakh shipments.
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/90 border border-sky-500/40 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  03
                </div>
                <h3 className="text-base font-bold text-white">LP Commercial NSR Optimizer</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Mathematical solver that inputs available production by smelter and outputs optimal LTC vs Spot Auction split. Incorporates spot price elasticity and customer tier quotas to maximize total Net Sales Realization.
                </p>
                <div className="pt-2 text-[11px] font-mono text-amber-300">
                  Feature: Generates official Commercial Allocation Directive Memorandum.
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs text-slate-300 font-mono">
              <span>Backed by Supabase PostgreSQL 16 + pgvector (1536-dim semantic intelligence)</span>
              <span className="text-emerald-400">● Google Gemini 2.5 Flash Connected</span>
            </div>
          </div>
        )}

        {/* ---------------- SLIDE 4: Real-World Geopolitical War Scenarios ---------------- */}
        {currentSlide === 4 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                Geopolitical War Room (2024–2026 Grounding)
              </span>
              <h2 className="text-2xl font-black text-white mt-1">
                Real-World Geopolitical & War Scenarios Ingested by the Platform
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Demonstrating how MetalSense AI turns global chaos and maritime blockades into HZL EBITDA expansions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950/90 border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">1. Red Sea Maritime Blockade (2024–2026)</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono font-bold">+₹36.8 Cr</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Houthi missile attacks forced seaborne carriers around Cape of Good Hope (+18 days, freight +$80/MT). Seaborne zinc/lead into JNPT surged by ₹6,800/MT.
                </p>
                <div className="p-2 bg-slate-900 rounded font-mono text-[11px] text-amber-300">
                  Platform Action: Lifted spot auction floor by +$24/MT; shifted 10% volume to prompt e-auction pool.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/90 border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">2. Middle East Conflict & Silver Run (2024–2026)</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono font-bold">+₹142.5 Cr</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Regional conflict triggered massive institutional safe-haven allocation. Silver surged above $34/oz and MCX broke ₹98,000/kg.
                </p>
                <div className="p-2 bg-slate-900 rounded font-mono text-[11px] text-amber-300">
                  Platform Action: Shifted Pantnagar silver to 60% prompt cash auctions, eliminating 60-day credit risk.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/90 border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">3. European Smelter Power Curtailments</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono font-bold">+₹54.0 Cr</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Nyrstar and Glencore throttled 450ktpa of zinc capacity due to power spark spreads. Rotterdam physical premiums leaped to +$220/MT.
                </p>
                <div className="p-2 bg-slate-900 rounded font-mono text-[11px] text-amber-300">
                  Platform Action: Export arbitrage opened; routed 20% of Chanderiya output to Kandla/Mundra for Antwerp delivery.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/90 border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">4. Global Zinc Concentrate TC Squeeze</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono font-bold">+₹88.2 Cr</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Tara mine and Cobre Panama shutdowns plunged treatment charges (TCs) below $10/dmt. Non-integrated foreign smelters operated at severe losses.
                </p>
                <div className="p-2 bg-slate-900 rounded font-mono text-[11px] text-amber-300">
                  Platform Action: Leveraged HZL&apos;s 100% captive mines (under $1,100/MT COP) to lock in 88% domestic wallet share across JSW &amp; AM/NS.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- SLIDE 5: Module-by-Module Walkthrough ---------------- */}
        {currentSlide === 5 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                Product Functionality
              </span>
              <h2 className="text-2xl font-black text-white mt-1">
                Integrated Commercial Command Center: The 4 Core Modules
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="text-sky-400 font-bold font-mono">Module A</div>
                <div className="font-bold text-white text-sm">Demand Sensing</div>
                <ul className="text-slate-400 space-y-1 text-[11px]">
                  <li>• 1–6 MoM AI Forecast</li>
                  <li>• 80% & 95% Confidence Bands</li>
                  <li>• Gati Shakti & Auto Regressors</li>
                  <li>• What-If Sensitivity Modeler</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="text-emerald-400 font-bold font-mono">Module B</div>
                <div className="font-bold text-white text-sm">TAM & SAM Engine</div>
                <ul className="text-slate-400 space-y-1 text-[11px]">
                  <li>• TDC Breakdown (HZL+Scrap+Imports)</li>
                  <li>• EXIM Bill of Lading Ledger</li>
                  <li>• Duty Analysis (CEPA vs 7.5%)</li>
                  <li>• Win-back Commercial Playbook</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="text-amber-400 font-bold font-mono">Module C</div>
                <div className="font-bold text-white text-sm">Arbitrage Tracker</div>
                <ul className="text-slate-400 space-y-1 text-[11px]">
                  <li>• LME/SHFE/MCX/CME Tickers</li>
                  <li>• SHFE/LME Export Ratio Alerts</li>
                  <li>• Landed Cost Parity Calculator</li>
                  <li>• Gemini AI Policy Copilot</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="text-purple-400 font-bold font-mono">Module D</div>
                <div className="font-bold text-white text-sm">NSR Optimizer</div>
                <ul className="text-slate-400 space-y-1 text-[11px]">
                  <li>• LTC vs Spot Split Solver</li>
                  <li>• Spot Elasticity Penalty Model</li>
                  <li>• Customer Tier Quota Slicing</li>
                  <li>• Printable Directive Memo</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
              <strong className="text-white">Live Enterprise Integration:</strong> The platform synchronizes with HZL SAP S/4HANA ERP sales histories across all 4 smelters and matches real-time Indian port customs declarations.
            </div>
          </div>
        )}

        {/* ---------------- SLIDE 6: Quantified Business Value & ROI ---------------- */}
        {currentSlide === 6 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Financial Feasibility & Business Case
              </span>
              <h2 className="text-2xl font-black text-white mt-1">
                Quantified Value Creation: +₹220 Cr to +₹310 Cr Annual EBITDA Expansion
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Rigorous financial modeling grounded in HZL's 1.1 million MT annual sales base.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2">
                <div className="text-emerald-400 font-bold text-lg font-mono">+₹85 Crores</div>
                <div className="font-bold text-white text-sm">Spot Premium Harvesting</div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Shifting from rigid 80:20 to dynamic 65:35 allocation during backwardation captures +$18/MT premium on 55,000 MT of prompt e-auction volume.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2">
                <div className="text-emerald-400 font-bold text-lg font-mono">+₹95 Crores</div>
                <div className="font-bold text-white text-sm">Parity Headroom Defense</div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Real-time visibility into competitors' landed cost prevents unneeded ₹3,000/MT price discounts in regions where foreign imports face severe rail freight penalties.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2">
                <div className="text-emerald-400 font-bold text-lg font-mono">+₹75 Crores</div>
                <div className="font-bold text-white text-sm">Import Substitution Capture</div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Winning back 35,000 MT of seaborne imports (Tata, AM/NS, Exide) using Jumbo Ingots (saving 2.5% dross loss) and certified ALMM silver grain.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2">
                <div className="text-emerald-400 font-bold text-lg font-mono">+₹35 Crores</div>
                <div className="font-bold text-white text-sm">Working Capital Velocity</div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Replacing 45-day clean credit with 100% advance RTGS for prompt spot auction batches frees up ₹450 Cr in working capital at 8.2% borrowing cost.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/40 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-white text-sm">Project Payback Horizon: </span>
                <span className="text-emerald-300">Under 45 Days Post Full Deployment</span>
              </div>
              <div className="font-mono text-emerald-400 font-bold text-sm">
                Projected ROI: &gt;18x Year 1
              </div>
            </div>
          </div>
        )}

        {/* ---------------- SLIDE 7: Why Buy vs Build ---------------- */}
        {currentSlide === 7 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                Competitive Moat & Buy vs Build
              </span>
              <h2 className="text-2xl font-black text-white mt-1">
                Why Buy From Us? Why Generic ERPs & Generic BI Tools Fail
              </h2>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0f172a] text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
                  <tr>
                    <th className="p-3">Capability Dimension</th>
                    <th className="p-3">Generic ERP (SAP / Salesforce)</th>
                    <th className="p-3">Financial Terminal (Bloomberg / Reuters)</th>
                    <th className="p-3 text-sky-400 font-bold">MetalSense AI Platform</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-xs">
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 font-semibold text-white">Indian Customs Landed Parity</td>
                    <td className="p-3 text-rose-400">❌ None (Accounting only)</td>
                    <td className="p-3 text-rose-400">❌ None (Macro prices only)</td>
                    <td className="p-3 text-emerald-400 font-bold">✅ Bill of Lading + BCD + SWS + Inland Freight</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 font-semibold text-white">Non-Ferrous Elasticity Optimization</td>
                    <td className="p-3 text-rose-400">❌ No LP Optimization Solver</td>
                    <td className="p-3 text-rose-400">❌ No internal allocation logic</td>
                    <td className="p-3 text-emerald-400 font-bold">✅ Solves optimal LTC vs Spot Auction split</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 font-semibold text-white">Geopolitical War Shock Engine</td>
                    <td className="p-3 text-rose-400">❌ Zero causal modeling</td>
                    <td className="p-3 text-amber-400">⚠️ News alerts without HZL netbacks</td>
                    <td className="p-3 text-emerald-400 font-bold">✅ Dynamic shock transmission into NSR</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 font-semibold text-white">Time-to-Value & Deployment</td>
                    <td className="p-3 text-slate-400">12 – 18 Months ($2M+ implementation)</td>
                    <td className="p-3 text-slate-400">Ongoing seat licenses without customization</td>
                    <td className="p-3 text-emerald-400 font-bold">60-Day Turnkey Pilot</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-slate-400">
              <strong className="text-slate-200">The Core Moat:</strong> Generic tools cannot model non-ferrous metallurgical nuances (Jumbo ingot dross reduction, zinc zamak foundry formulas, ALMM silver paste purity tiers). MetalSense AI is tailored directly to HZL's commercial reality.
            </p>
          </div>
        )}

        {/* ---------------- SLIDE 8: Enterprise Security & Data Isolation ---------------- */}
        {currentSlide === 8 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                Enterprise Readiness & Security
              </span>
              <h2 className="text-2xl font-black text-white mt-1">
                Bank-Grade Data Security & ERP Integration
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Zero data leakage. HZL internal sales pricing and customer margins remain strictly confidential.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-sky-400 font-bold text-sm flex items-center gap-1.5">
                  <Database className="w-4 h-4" />
                  <span>Single-Tenant / Private VPC</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Deployed directly inside HZL's Microsoft Azure / AWS India sovereign cloud tenant or on-premise datacenter. Multi-tenant isolation guarantees proprietary pricing formulas never leave HZL boundary.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" />
                  <span>Read-Only SAP ERP Connector</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Safe, non-intrusive read-only synchronization with HZL SAP S/4HANA via secure REST/RFC. MetalSense AI never mutates ERP core financial ledgers without explicit commercial director sign-off.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-amber-400 font-bold text-sm flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Private Gemini AI Guardrails</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Enterprise Google GenAI agreement guarantees that HZL customer queries and intelligence embeddings are never used to train external public models.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- SLIDE 9: 60-Day Pilot Roadmap ---------------- */}
        {currentSlide === 9 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Execution & Rollout Plan
              </span>
              <h2 className="text-2xl font-black text-white mt-1">
                60-Day Phased Pilot to Enterprise Value Realization
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-mono text-sky-400 font-bold">WEEKS 1 – 2</div>
                <div className="font-bold text-white text-sm">Data Ingestion & Baseline</div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Connect historical SAP ERP sales batches, configure Indian customs bill of lading scraper, calibrate LME/SHFE tickers.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-mono text-sky-400 font-bold">WEEKS 3 – 4</div>
                <div className="font-bold text-white text-sm">Smelter Pilot (Chanderiya)</div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Deploy Demand Sensing & Landed Parity engine for Chanderiya Zinc SHG dispatches. Validate predictions against real spot auction bids.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-mono text-sky-400 font-bold">WEEKS 5 – 6</div>
                <div className="font-bold text-white text-sm">Silver & Lead Integration</div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Bring Pantnagar Silver refinery (solar PV paste fabricators) and Dariba Lead smelters live. Activate War Room shock simulators.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-mono text-emerald-400 font-bold">WEEKS 7 – 8</div>
                <div className="font-bold text-white text-sm">Commercial Handover & Signoff</div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Executive boardroom audit of realized NSR incremental gain. Full training for regional sales managers (North, West, South, East).
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono flex items-center justify-between">
              <span>Success Gate: Minimum verified +₹15 Crores NSR expansion demonstrated in the 60-day pilot.</span>
              <span className="text-emerald-400">Zero Risk Commitment</span>
            </div>
          </div>
        )}

        {/* ---------------- SLIDE 10: Executive Summary & Call to Action ---------------- */}
        {currentSlide === 10 && (
          <div className="my-auto space-y-6 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-wider uppercase">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Strategic Decision Mandate
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              From Reactive Price Taker to Predictive Profit Maximizer
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              In an era of Red Sea maritime blockades, Middle East energy volatility, and aggressive foreign dumping under Korea CEPA, HZL cannot afford manual spreadsheets and static 80:20 allocation inertia.
            </p>

            <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-950/60 via-[#0c1830] to-emerald-950/60 border border-sky-500/40 text-left space-y-2">
              <div className="text-xs font-mono text-sky-400 uppercase font-bold">The Proposed Partnership</div>
              <div className="text-base font-bold text-white">
                Authorize the 60-Day Turnkey Operational Pilot at Chanderiya & Dariba
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                We will deploy MetalSense AI on a risk-aligned structure. If the platform does not demonstrate at least 5x its implementation value in verified incremental NSR within 60 days, HZL owes nothing.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
              >
                <Printer className="w-4 h-4" />
                <span>Export Presentation as PDF</span>
              </button>
              <button
                onClick={() => setCurrentSlide(1)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white text-xs font-bold shadow-lg shadow-sky-900/40 transition"
              >
                Restart Presentation
              </button>
            </div>
          </div>
        )}

        {/* Slide Footer Navigation Strip */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-mono font-semibold text-slate-300">Hindustan Zinc Limited (Vedanta)</span>
            <span>•</span>
            <span>Commercial Strategy & Optimization</span>
          </div>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalSlides }, (_, i) => i + 1).map((s) => (
              <button
                key={s}
                onClick={() => setCurrentSlide(s)}
                className={`w-2.5 h-2.5 rounded-full transition ${
                  currentSlide === s ? "bg-sky-400 w-6" : "bg-slate-700 hover:bg-slate-500"
                }`}
                title={`Jump to Slide ${s}`}
              />
            ))}
          </div>

          <div className="text-slate-400 font-mono text-[11px]">
            Use Left/Right arrow keys to navigate
          </div>
        </div>
      </div>
    </div>
  );
};
