"use client";

import React, { useState } from "react";
import { MetalType, ArbitrageMetalData, MarketIntelligenceItem } from "@/types";
import {
  Globe2,
  ArrowRightLeft,
  Sparkles,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Scale,
  Send,
  Cpu,
  Layers,
  CheckCircle2,
  Filter,
  DollarSign
} from "lucide-react";
import { synthesizeIntelligenceWithGemini } from "@/lib/api";

interface ModuleCProps {
  metal: MetalType;
  metalData?: ArbitrageMetalData;
  intelligenceFeed: MarketIntelligenceItem[];
  onAddIntelligence: (item: MarketIntelligenceItem) => void;
  arbitrageAlerts: any[];
}

export const ModuleC_ArbitrageTracker: React.FC<ModuleCProps> = ({
  metal,
  metalData,
  intelligenceFeed,
  onAddIntelligence,
  arbitrageAlerts
}) => {
  // Parity Calculator User-Adjustable Inputs
  const [cifOceanFreightUsd, setCifOceanFreightUsd] = useState<number>(45.0); // $/MT
  const [dutyType, setDutyType] = useState<string>("Normal 7.5%"); // 'Normal 7.5%' or 'Korea CEPA 0%' or 'Advance Auth 0%'
  const [portHandlingInr, setPortHandlingInr] = useState<number>(1800.0); // INR/MT
  const [inlandFreightInr, setInlandFreightInr] = useState<number>(3200.0); // INR/MT to consuming cluster

  // Custom AI Intelligence Input
  const [customHeadline, setCustomHeadline] = useState<string>("");
  const [customBody, setCustomBody] = useState<string>("");
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [filterSentiment, setFilterSentiment] = useState<string>("All");

  if (!metalData) {
    return (
      <div className="p-8 text-center text-slate-500 bg-white rounded-xl border border-slate-200 shadow-sm">
        Loading Global Exchange Parity and Intelligence Feed...
      </div>
    );
  }

  // Calculate live import parity in INR/MT
  const lmePrice = metalData.lme.price;
  const fxRate = metalData.fx_usd_inr;
  const cash3mSpread = 4.50; // Contango/backwardation spread

  const cifPriceUsd = lmePrice + cash3mSpread + cifOceanFreightUsd;
  const bcdRate = dutyType === "Normal 7.5%" ? 0.075 : 0.0;
  const swsRate = dutyType === "Normal 7.5%" ? 0.10 * bcdRate : 0.0; // 10% of BCD
  const totalDutyMultiplier = 1.0 + bcdRate + swsRate;

  const assessableValueInr = cifPriceUsd * fxRate;
  const dutyAmountInr = assessableValueInr * (bcdRate + swsRate);
  const customsLandedInr = assessableValueInr + dutyAmountInr;
  const finalImportLandedInr = Math.round(customsLandedInr + portHandlingInr + inlandFreightInr);

  const hzlDomesticLandedInr = Math.round(metalData.hzl_ex_works_inr_mt + 2500); // Ex-works + domestic rail/truck freight
  const calculatedParityCushion = finalImportLandedInr - hzlDomesticLandedInr;

  const handleSynthesizeGemini = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customHeadline.trim()) return;

    setIsSynthesizing(true);
    try {
      const synthesized = await synthesizeIntelligenceWithGemini({
        headline: customHeadline,
        body: customBody,
        affected_metal: metal
      });
      onAddIntelligence(synthesized);
      setCustomHeadline("");
      setCustomBody("");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSynthesizing(false);
    }
  };

  const filteredFeed = intelligenceFeed.filter((item) => {
    if (filterSentiment === "All") return true;
    return item.sentiment === filterSentiment;
  });

  return (
    <div className="space-y-6">
      {/* Live Exchange Parity Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* LME Card */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-sky-700">London Metal Exchange (LME)</span>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
              Cash Official
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-slate-900">
            ${metalData.lme.price.toLocaleString()}
            <span className="text-xs font-normal text-slate-500 ml-1">{metalData.lme.unit}</span>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
            <span>Daily Move:</span>
            <span className={`font-mono font-bold ${metalData.lme.change_pct >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
              {metalData.lme.change_pct >= 0 ? "+" : ""}{metalData.lme.change_pct}%
            </span>
          </div>
        </div>

        {/* SHFE Card */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-rose-600">Shanghai Futures (SHFE)</span>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
              Active Month
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-slate-900">
            ¥{metalData.shfe.price.toLocaleString()}
            <span className="text-xs font-normal text-slate-500 ml-1">{metalData.shfe.unit}</span>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
            <span>SHFE/LME Ratio:</span>
            <span className="font-mono font-bold text-amber-700">
              {metalData.shfe.ratio || "N/A"}
            </span>
          </div>
        </div>

        {/* MCX Domestic India */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-emerald-700">Multi Commodity (MCX)</span>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
              India Spot
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-emerald-600">
            ₹{metalData.mcx.price.toLocaleString()}
            <span className="text-xs font-normal text-slate-500 ml-1">{metalData.mcx.unit}</span>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
            <span>INR Benchmark:</span>
            <span className="font-mono font-bold text-slate-800">USD/INR ₹{fxRate.toFixed(2)}</span>
          </div>
        </div>

        {/* CME / COMEX */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-sky-700">Chicago / COMEX (CME)</span>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
              Front Month
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-slate-900">
            ${metalData.cme.price.toLocaleString()}
            <span className="text-xs font-normal text-slate-500 ml-1">{metalData.cme.unit}</span>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
            <span>Spot Premium:</span>
            <span className="font-mono font-bold text-sky-700">+{metalData.physical_premium.range}</span>
          </div>
        </div>
      </div>

      {/* Global Arbitrage Alerts */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>Cross-Exchange Arbitrage & Import Parity Alerts</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {arbitrageAlerts.map((alert: any) => (
            <div
              key={alert.id}
              className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1.5"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">{alert.metal}: {alert.type}</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  alert.severity === "High" ? "bg-rose-50 text-rose-700 border border-rose-200" : "bg-amber-50 text-amber-700 border border-amber-200"
                }`}>
                  {alert.severity} Impact
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">{alert.description}</p>
              <div className="text-[11px] text-sky-700 font-medium pt-1 border-t border-slate-100">
                Action: {alert.action}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Landed Cost & Parity Calculator */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-sky-600" />
              <span>Domestic Import Parity vs. HZL Ex-Smelter Benchmark Calculator</span>
            </h3>
            <p className="text-xs text-slate-500">
              Computes actual landed cost of imported metal into Indian industrial consuming clusters vs. HZL domestic supply.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-500">LME Base:</span>
            <span className="font-bold text-slate-900">${lmePrice}</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">USD/INR:</span>
            <span className="font-bold text-amber-700">₹{fxRate}</span>
          </div>
        </div>

        {/* Interactive Controls & Formula Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 mb-4">
          {/* Duty Type */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600">Customs Tariff Regime:</label>
            <select
              value={dutyType}
              onChange={(e) => setDutyType(e.target.value)}
              className="w-full bg-white border border-slate-300 text-slate-800 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-sky-500 font-medium"
            >
              <option value="Normal 7.5%">Normal Tariff (7.5% BCD + 10% SWS)</option>
              <option value="Korea CEPA 0%">India-Korea CEPA (0% Duty)</option>
              <option value="Advance Auth 0%">Advance Authorization (0% Export Bias)</option>
            </select>
          </div>

          {/* CIF Ocean Freight */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600">Ocean Freight ($/MT):</span>
              <span className="font-mono font-bold text-slate-900">${cifOceanFreightUsd}</span>
            </div>
            <input
              type="range"
              min={20}
              max={100}
              step={5}
              value={cifOceanFreightUsd}
              onChange={(e) => setCifOceanFreightUsd(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
          </div>

          {/* Port Clearance & Wharfage */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600">Port Handling (INR/MT):</span>
              <span className="font-mono font-bold text-slate-900">₹{portHandlingInr}</span>
            </div>
            <input
              type="range"
              min={1000}
              max={3500}
              step={100}
              value={portHandlingInr}
              onChange={(e) => setPortHandlingInr(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
          </div>

          {/* Inland Freight to Plant */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600">Inland Rail/Truck Freight:</span>
              <span className="font-mono font-bold text-slate-900">₹{inlandFreightInr}</span>
            </div>
            <input
              type="range"
              min={1500}
              max={6000}
              step={200}
              value={inlandFreightInr}
              onChange={(e) => setInlandFreightInr(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
          </div>
        </div>

        {/* Parity Ledger Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Seaborne Import Parity */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
              Seaborne Import Landed Cost
            </div>
            <div className="text-2xl font-black font-mono text-slate-900">
              ₹{finalImportLandedInr.toLocaleString()} <span className="text-xs font-normal text-slate-500">/ MT</span>
            </div>
            <div className="space-y-1 pt-2 border-t border-slate-200 text-[11px] text-slate-600">
              <div className="flex justify-between">
                <span>CIF Price ($/MT):</span>
                <span className="font-mono text-slate-800 font-medium">${cifPriceUsd.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Customs Duty + SWS:</span>
                <span className="font-mono text-slate-800 font-medium">₹{Math.round(dutyAmountInr).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Port + Domestic Freight:</span>
                <span className="font-mono text-slate-800 font-medium">₹{(portHandlingInr + inlandFreightInr).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* HZL Domestic Landed Price */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
              HZL Domestic Landed Price
            </div>
            <div className="text-2xl font-black font-mono text-sky-600">
              ₹{hzlDomesticLandedInr.toLocaleString()} <span className="text-xs font-normal text-slate-500">/ MT</span>
            </div>
            <div className="space-y-1 pt-2 border-t border-slate-200 text-[11px] text-slate-600">
              <div className="flex justify-between">
                <span>Ex-Smelter Benchmark:</span>
                <span className="font-mono text-slate-800 font-medium">₹{Math.round(metalData.hzl_ex_works_inr_mt).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Direct Rake Logistics:</span>
                <span className="font-mono text-slate-800 font-medium">₹2,500</span>
              </div>
              <div className="flex justify-between">
                <span>Physical Premium ($/MT):</span>
                <span className="font-mono text-emerald-600 font-bold">+${metalData.physical_premium.current}</span>
              </div>
            </div>
          </div>

          {/* Parity Cushion / Strategic Headroom */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50/70 border border-emerald-200 space-y-2">
            <div className="text-emerald-800 font-semibold uppercase text-[10px] tracking-wider">
              HZL Competitive Pricing Cushion
            </div>
            <div className={`text-2xl font-black font-mono ${calculatedParityCushion >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
              {calculatedParityCushion >= 0 ? "+" : ""}₹{calculatedParityCushion.toLocaleString()} <span className="text-xs font-normal text-slate-500">/ MT</span>
            </div>
            <p className="text-[11px] text-slate-700 leading-relaxed pt-2 border-t border-emerald-200">
              {calculatedParityCushion >= 0
                ? `HZL has ₹${calculatedParityCushion.toLocaleString()}/MT headroom before imports become price-competitive under ${dutyType}.`
                : `Import landed cost is ₹${Math.abs(calculatedParityCushion).toLocaleString()}/MT cheaper. Recommend selective freight rebates to maintain volume.`}
            </p>
          </div>
        </div>
      </div>

      {/* AI Market Intelligence & Policy Feed powered by Gemini API */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>Real-Time Market Intelligence & Policy Feed (Gemini AI Orchestrated)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Ingests global smelter curtailments, DGTR anti-dumping findings, LME warehouse drawdowns, and power tariff developments.
            </p>
          </div>

          {/* Sentiment Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            {["All", "Bullish", "Bearish", "Neutral"].map((s) => (
              <button
                key={s}
                onClick={() => setFilterSentiment(s)}
                className={`px-2 py-1 rounded transition font-medium ${
                  filterSentiment === s
                    ? "bg-sky-600 text-white font-semibold shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Gemini AI Live Ingestion Input */}
        <form onSubmit={handleSynthesizeGemini} className="p-3.5 rounded-xl bg-slate-50 border border-sky-200 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-700">
            <Cpu className="w-4 h-4 text-sky-600" />
            <span>Gemini Intelligence Copilot: Ingest Breaking Trade Event or Policy Notice</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="e.g. DGTR proposes 15% safeguard duty on foreign coated steel imports..."
                value={customHeadline}
                onChange={(e) => setCustomHeadline(e.target.value)}
                className="w-full bg-white border border-slate-300 text-slate-800 placeholder:text-slate-400 text-xs rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isSynthesizing || !customHeadline.trim()}
                className="w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-lg shadow-sm transition"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isSynthesizing ? "Synthesizing with Gemini..." : "Analyze with Gemini"}</span>
              </button>
            </div>
          </div>
        </form>

        {/* Intelligence Feed Cards */}
        <div className="space-y-3">
          {filteredFeed.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-slate-300 shadow-sm transition space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase font-mono ${
                      item.sentiment === "Bullish"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : item.sentiment === "Bearish"
                        ? "bg-rose-50 text-rose-700 border border-rose-200"
                        : "bg-slate-100 text-slate-700 border border-slate-200"
                    }`}
                  >
                    {item.sentiment} (Impact: {item.impact_score > 0 ? "+" : ""}{item.impact_score})
                  </span>
                  <span className="font-semibold text-slate-600">{item.source}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500">{item.time_ago}</span>
                </div>
                <div className="flex items-center gap-1">
                  {item.affected_sectors.map((sec, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600 text-[10px] font-medium">
                      {sec}
                    </span>
                  ))}
                </div>
              </div>

              <h4 className="text-sm font-bold text-slate-900">{item.headline}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{item.summary}</p>

              <div className="p-2.5 rounded-lg bg-sky-50 border border-sky-200 text-xs text-slate-700 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-sky-900">HZL Commercial Desk Directive: </span>
                  <span>{item.recommendation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
