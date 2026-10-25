"use client";

import React, { useState } from "react";
import { GeopoliticalScenario, MetalType } from "@/types";
import {
  Flame,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Ship,
  Zap,
  Globe2,
  CheckCircle2,
  X,
  ExternalLink,
  Info
} from "lucide-react";

interface WarRoomProps {
  scenarios: GeopoliticalScenario[];
  activeScenarioId: string | null;
  onSelectScenario: (id: string | null) => void;
  selectedMetal: MetalType;
}

export const GeopoliticalWarRoom: React.FC<WarRoomProps> = ({
  scenarios,
  activeScenarioId,
  onSelectScenario,
  selectedMetal
}) => {
  const [isOpenDetails, setIsOpenDetails] = useState<boolean>(false);

  const activeScenario = scenarios.find((s) => s.id === activeScenarioId) || null;

  return (
    <div className="bg-amber-50/80 border-b border-amber-200/80 px-4 py-2.5 transition">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        {/* Left: War Room Status & Title */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-100 border border-amber-300 text-amber-900 font-mono font-bold uppercase tracking-wider shadow-sm">
            <Flame className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>Geopolitical War Room (2024–2026 Shocks)</span>
          </div>
          <span className="text-slate-600 hidden lg:inline">
            Real-world conflict & supply disruptions affecting Indian physical premiums:
          </span>
        </div>

        {/* Middle: Scenario Preset Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => onSelectScenario(null)}
            className={`px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap transition border ${
              activeScenarioId === null
                ? "bg-slate-800 text-white border-slate-700 shadow-sm font-bold"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
            }`}
          >
            Baseline (Normalized)
          </button>

          {scenarios.map((sc) => {
            const isSelected = activeScenarioId === sc.id;
            const isRelevant = sc.affected_metals.includes(selectedMetal);
            return (
              <button
                key={sc.id}
                onClick={() => onSelectScenario(sc.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap transition border ${
                  isSelected
                    ? "bg-amber-600 text-white border-amber-500 shadow-sm font-bold"
                    : isRelevant
                    ? "bg-white text-amber-900 border-amber-300 hover:bg-amber-100/70"
                    : "bg-white text-slate-600 border-slate-200 hover:text-slate-900"
                }`}
              >
                <span>{sc.name}</span>
                {sc.shocks.ebitda_impact_crores && (
                  <span className={`text-[10px] px-1 py-0.2 rounded font-mono ${isSelected ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-800 font-bold"}`}>
                    +₹{sc.shocks.ebitda_impact_crores}Cr
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Active Shock Insight Trigger */}
        <div className="flex items-center gap-2">
          {activeScenario ? (
            <button
              onClick={() => setIsOpenDetails(true)}
              className="flex items-center gap-1 text-xs font-semibold text-amber-900 hover:text-amber-950 bg-amber-200/70 px-2.5 py-1 rounded border border-amber-300 hover:bg-amber-200 transition"
            >
              <Info className="w-3.5 h-3.5 text-amber-700" />
              <span>Inspect Causal Transmission</span>
            </button>
          ) : (
            <span className="text-[11px] text-slate-500 italic">Select an event to simulate shockwaves</span>
          )}
        </div>
      </div>

      {/* Expanded Shockwave Transmission Banner when a scenario is active */}
      {activeScenario && (
        <div className="mt-2.5 pt-2.5 border-t border-amber-200 flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-amber-200 text-amber-900 font-mono text-[10px] uppercase font-bold border border-amber-300">
              {activeScenario.category}
            </span>
            <span className="text-slate-900 font-bold">{activeScenario.headline}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            {activeScenario.shocks.freight_rate_usd_delta && (
              <div className="text-slate-700">
                Ocean Freight: <span className="font-bold text-rose-700">+${activeScenario.shocks.freight_rate_usd_delta}/MT</span>
              </div>
            )}
            {activeScenario.shocks.hzl_parity_cushion_delta_inr && (
              <div className="text-slate-700">
                HZL Parity Cushion: <span className="font-bold text-emerald-700">+₹{activeScenario.shocks.hzl_parity_cushion_delta_inr.toLocaleString()}/MT</span>
              </div>
            )}
            {activeScenario.shocks.spot_premium_usd_delta && (
              <div className="text-slate-700">
                Spot Premium Floor: <span className="font-bold text-sky-700">+${activeScenario.shocks.spot_premium_usd_delta}/MT</span>
              </div>
            )}
            {activeScenario.shocks.ebitda_impact_crores && (
              <div className="text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 shadow-sm">
                Net EBITDA Upside: +₹{activeScenario.shocks.ebitda_impact_crores} Crores
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal: Full Causal Transmission Chain and Tactical Playbook in Light Theme */}
      {isOpenDetails && activeScenario && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-slate-300 rounded-2xl max-w-3xl w-full p-6 space-y-4 shadow-2xl overflow-y-auto max-h-[90vh]">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-200 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300 uppercase font-bold">
                    {activeScenario.category} ({activeScenario.period})
                  </span>
                  <span className="text-slate-500 text-xs">
                    Affects: {activeScenario.affected_metals.join(", ")}
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  {activeScenario.name}
                </h3>
              </div>
              <button
                onClick={() => setIsOpenDetails(false)}
                className="text-slate-500 hover:text-slate-800 p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Narrative Overview */}
            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              {activeScenario.summary}
            </p>

            {/* Step-by-Step Causal Transmission Chain */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider flex items-center gap-1.5 text-sky-700">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Causal Transmission Mechanism into Indian Physical Market</span>
              </h4>
              <div className="space-y-1.5">
                {activeScenario.causal_chain.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs"
                  >
                    <div className="font-mono font-bold text-amber-800 whitespace-nowrap min-w-[170px]">
                      {step.step}:
                    </div>
                    <div className="text-slate-700 leading-normal">{step.detail}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tactical Desk Directive */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-sky-50 border border-amber-300 space-y-1.5">
              <div className="font-bold text-amber-900 flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-4 h-4 text-amber-700" />
                <span>HZL Commercial Leadership Tactical Directive:</span>
              </div>
              <p className="text-xs text-slate-800 leading-relaxed font-sans font-medium">
                {activeScenario.desk_directive}
              </p>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
              <span className="text-emerald-700 font-mono font-bold">
                Estimated Commercial Value Creation: +₹{activeScenario.shocks.ebitda_impact_crores} Crores
              </span>
              <button
                onClick={() => setIsOpenDetails(false)}
                className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold shadow-sm transition"
              >
                Apply & Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
