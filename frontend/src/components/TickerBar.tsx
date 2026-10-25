"use client";

import React from "react";
import { MetalType, ArbitrageMetalData } from "@/types";
import { TrendingUp, TrendingDown, AlertCircle, ArrowRightLeft, DollarSign } from "lucide-react";

interface TickerBarProps {
  selectedMetal: MetalType;
  metalData?: ArbitrageMetalData;
  fxUsdInr: number;
}

export const TickerBar: React.FC<TickerBarProps> = ({
  selectedMetal,
  metalData,
  fxUsdInr
}) => {
  if (!metalData) {
    return (
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 text-xs text-slate-500">
        Loading live exchange arbitrations...
      </div>
    );
  }

  const { lme, shfe, mcx, cme, physical_premium, shfe_lme_arb, parity_cushion_inr, import_parity_inr_mt } = metalData;

  const isLmeUp = lme.change_pct >= 0;
  const isMcxUp = mcx.change_pct >= 0;

  return (
    <div className="bg-white border-b border-slate-200 px-4 py-2 overflow-x-auto shadow-sm">
      <div className="flex items-center gap-4 min-w-[1100px] text-xs">
        {/* Metal Focus Indicator */}
        <div className="flex items-center gap-2 pr-3 border-r border-slate-200 font-mono font-bold text-sky-700">
          <span className="w-2 h-2 rounded-full bg-sky-600 animate-ping" />
          <span>{selectedMetal.toUpperCase()} DESK TICKER</span>
        </div>

        {/* LME Cash */}
        <div className="flex items-center gap-2 pr-3 border-r border-slate-200">
          <span className="text-slate-500 font-medium">LME Cash:</span>
          <span className="font-mono font-bold text-slate-900">
            ${lme.price.toLocaleString()} {lme.unit}
          </span>
          <span
            className={`flex items-center text-[11px] font-mono font-bold ${
              isLmeUp ? "text-emerald-700 bg-emerald-50 px-1 rounded" : "text-rose-700 bg-rose-50 px-1 rounded"
            }`}
          >
            {isLmeUp ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
            {isLmeUp ? "+" : ""}{lme.change_pct}%
          </span>
          <span className="text-[10px] text-slate-500 font-mono">({lme.status})</span>
        </div>

        {/* SHFE & Ratio */}
        <div className="flex items-center gap-2 pr-3 border-r border-slate-200">
          <span className="text-slate-500 font-medium">SHFE:</span>
          <span className="font-mono font-bold text-slate-900">
            ¥{shfe.price.toLocaleString()} {shfe.unit}
          </span>
          {shfe.ratio && (
            <span className="text-[11px] font-mono bg-slate-100 text-sky-800 px-1.5 py-0.5 rounded border border-slate-300 font-bold">
              Ratio: {shfe.ratio}
            </span>
          )}
        </div>

        {/* MCX Domestic India */}
        <div className="flex items-center gap-2 pr-3 border-r border-slate-200">
          <span className="text-slate-500 font-medium">MCX India:</span>
          <span className="font-mono font-bold text-emerald-800">
            ₹{mcx.price.toLocaleString()} {mcx.unit}
          </span>
          <span
            className={`flex items-center text-[11px] font-mono font-bold ${
              isMcxUp ? "text-emerald-700" : "text-rose-700"
            }`}
          >
            {isMcxUp ? "+" : ""}{mcx.change_pct}%
          </span>
        </div>

        {/* CME / COMEX */}
        <div className="flex items-center gap-2 pr-3 border-r border-slate-200">
          <span className="text-slate-500 font-medium">CME:</span>
          <span className="font-mono font-bold text-slate-900">
            ${cme.price.toLocaleString()} {cme.unit}
          </span>
        </div>

        {/* USD / INR Benchmark */}
        <div className="flex items-center gap-2 pr-3 border-r border-slate-200">
          <span className="text-slate-500 font-medium">USD/INR:</span>
          <span className="font-mono font-bold text-amber-700">₹{fxUsdInr.toFixed(2)}</span>
        </div>

        {/* Indian Physical Premium */}
        <div className="flex items-center gap-2 pr-3 border-r border-slate-200">
          <span className="text-slate-500 font-medium">India Spot Premium:</span>
          <span className="font-mono font-bold text-sky-800">
            +{physical_premium.range}
          </span>
          <span className="text-[10px] text-emerald-800 font-mono font-bold bg-emerald-50 px-1 rounded border border-emerald-200">
            {physical_premium.mom_change}
          </span>
        </div>

        {/* Landed Parity Cushion Badge */}
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">Import Parity Gap:</span>
          <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300 flex items-center gap-1 shadow-sm">
            <ArrowRightLeft className="w-3 h-3 text-emerald-700" />
            +₹{parity_cushion_inr.toLocaleString()}/MT
          </span>
          <span className="text-[10px] text-slate-500">
            (HZL is ₹{parity_cushion_inr.toLocaleString()} below import landed)
          </span>
        </div>
      </div>
    </div>
  );
};
