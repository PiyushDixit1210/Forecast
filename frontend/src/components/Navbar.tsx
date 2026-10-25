"use client";

import React from "react";
import { MetalType } from "@/types";
import {
  Layers,
  TrendingUp,
  PieChart,
  Globe2,
  Sliders,
  Database,
  Cpu,
  ShieldCheck,
  Building2,
  RefreshCw,
  Flame
} from "lucide-react";

interface NavbarProps {
  selectedMetal: MetalType;
  onSelectMetal: (metal: MetalType) => void;
  activeTab: string;
  onChangeTab: (tab: string) => void;
  onRefreshAll: () => void;
  isRefreshing: boolean;
  activeScenarioName?: string | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedMetal,
  onSelectMetal,
  activeTab,
  onChangeTab,
  onRefreshAll,
  isRefreshing,
  activeScenarioName
}) => {
  const metals: { key: MetalType; label: string; formula: string }[] = [
    { key: "Zinc", label: "Zinc (Zn)", formula: "SHG 99.995%" },
    { key: "Lead", label: "Lead (Pb)", formula: "Refined 99.99%" },
    { key: "Silver", label: "Silver (Ag)", formula: "LBMA 99.99%" },
    { key: "Cadmium", label: "Cadmium (Cd)", formula: "Sticks 99.99%" },
  ];

  const navItems = [
    { id: "moduleA", label: "Demand Sensing", sub: "MoM AI Forecast", icon: TrendingUp },
    { id: "moduleB", label: "TAM & SAM Engine", sub: "EXIM & Import Parity", icon: PieChart },
    { id: "moduleC", label: "Arbitrage & Intelligence", sub: "LME/SHFE/MCX & Gemini", icon: Globe2 },
    { id: "moduleD", label: "Commercial Optimizer", sub: "NSR & Auction Split", icon: Sliders },
    { id: "schema", label: "Supabase & Data", sub: "Postgres + pgvector", icon: Database },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
      {/* Top Corporate Strip */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2 text-xs border-b border-slate-200 bg-slate-50 text-slate-600">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold tracking-wider text-sky-800 uppercase">
            <Building2 className="w-3.5 h-3.5 text-sky-700" />
            <span>Vedanta Group</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-900">Hindustan Zinc Limited (HZL)</span>
          </div>
          <div className="hidden md:flex items-center gap-2 pl-3 border-l border-slate-300 text-slate-500">
            <span>Smelters:</span>
            <span className="text-slate-700 font-mono font-medium">Chanderiya</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-700 font-mono font-medium">Dariba</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-700 font-mono font-medium">Debari</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-700 font-mono font-medium">Pantnagar</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {activeScenarioName && (
            <div className="flex items-center gap-1.5 text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-300 font-mono text-[11px] font-bold">
              <Flame className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>War Room Active: {activeScenarioName}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>FastAPI Engine Live</span>
          </div>
          <div className="flex items-center gap-1.5 text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-300 font-medium">
            <Cpu className="w-3 h-3 text-sky-600" />
            <span>Gemini 2.5 Flash Connected</span>
          </div>
          <button
            onClick={onRefreshAll}
            disabled={isRefreshing}
            className="flex items-center gap-1 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 px-2 py-0.5 rounded transition"
            title="Refresh market data & forecasts"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? "animate-spin text-sky-600" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between px-4 py-3 gap-3">
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-900 flex items-center justify-center shadow-md shadow-sky-600/20">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight text-slate-900 flex items-center gap-2">
                <span>MetalSense</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-sky-100 text-sky-700 font-mono font-bold border border-sky-300">
                  AI v2.4 (Enterprise)
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Domestic Demand Sensing & Commercial Optimization Platform
            </p>
          </div>
        </div>

        {/* Metal Category Switcher */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 shadow-inner overflow-x-auto">
          {metals.map((m) => {
            const isSelected = selectedMetal === m.key;
            return (
              <button
                key={m.key}
                onClick={() => onSelectMetal(m.key)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                  isSelected
                    ? "bg-white text-sky-700 shadow-sm border border-slate-200 font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                }`}
              >
                <span>{m.label}</span>
                <span className={`text-[10px] px-1 rounded ${isSelected ? "bg-sky-100 text-sky-800 font-bold" : "bg-slate-200 text-slate-500 font-mono"}`}>
                  {m.formula}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Modules */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChangeTab(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 whitespace-nowrap border ${
                  isActive
                    ? "bg-sky-50 text-sky-700 border-sky-300 font-bold shadow-sm"
                    : "text-slate-600 border-transparent hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-sky-600" : "text-slate-400"}`} />
                <div className="text-left">
                  <div className="leading-tight">{item.label}</div>
                  <div className="text-[10px] text-slate-500 leading-none">{item.sub}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
