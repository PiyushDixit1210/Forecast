"use client";

import React, { useState } from "react";
import { MetalType, OptimizationResult, OptimizationScenario } from "@/types";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  LineChart,
  Line
} from "recharts";
import {
  Sliders,
  DollarSign,
  TrendingUp,
  FileCheck,
  Building2,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Printer
} from "lucide-react";
import { runCommercialOptimization } from "@/lib/api";

interface ModuleDProps {
  metal: MetalType;
  selectedGrade: string;
  optimizationResult: OptimizationResult | null;
  onUpdateOptimization: (result: OptimizationResult) => void;
}

export const ModuleD_AuctionOptimizer: React.FC<ModuleDProps> = ({
  metal,
  selectedGrade,
  optimizationResult,
  onUpdateOptimization
}) => {
  // Simulator Controls
  const [availableVolume, setAvailableVolume] = useState<number>(35000); // MT
  const [smelterOrigin, setSmelterOrigin] = useState<string>("Chanderiya Hydro-Smelter");
  const [lmeBenchmark, setLmeBenchmark] = useState<number>(2885.50);
  const [fxRate, setFxRate] = useState<number>(86.65);
  const [targetLtcShare, setTargetLtcShare] = useState<number>(65); // %
  const [marketSentiment, setMarketSentiment] = useState<string>("Bullish");
  const [isSolving, setIsSolving] = useState<boolean>(false);
  const [showMemoModal, setShowMemoModal] = useState<boolean>(false);

  const handleRunOptimizer = async () => {
    setIsSolving(true);
    try {
      const res = await runCommercialOptimization({
        metal,
        grade: selectedGrade,
        available_volume_mt: availableVolume,
        smelter_origin: smelterOrigin,
        base_lme_price_usd: lmeBenchmark,
        fx_rate_inr_usd: fxRate,
        ltc_target_share_pct: targetLtcShare,
        spot_market_sentiment: marketSentiment,
        allow_export_arbitrage: true
      });
      onUpdateOptimization(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSolving(false);
    }
  };

  const plan = optimizationResult?.optimal_plan;
  const baseline = optimizationResult?.baseline_comparison;
  const scenarios = optimizationResult?.simulation_scenarios || [];

  return (
    <div className="space-y-6">
      {/* Control Panel: Simulator Inputs */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-sky-600" />
              <span>Commercial Premium & Monthly Auction Allocation Optimizer</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Simulate production batches to maximize Net Sales Realization (NSR) across Long-Term Contracts (LTC) vs Spot E-Auctions.
            </p>
          </div>

          <button
            onClick={handleRunOptimizer}
            disabled={isSolving}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition disabled:opacity-50"
          >
            <Zap className={`w-3.5 h-3.5 ${isSolving ? "animate-spin" : ""}`} />
            <span>{isSolving ? "Solving LP Model..." : "Recalculate Optimal Split"}</span>
          </button>
        </div>

        {/* Input Sliders & Selectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
          {/* Available Monthly Production Volume */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 font-medium">Available Production (MT):</span>
              <span className="font-mono font-bold text-slate-900">{availableVolume.toLocaleString()} MT</span>
            </div>
            <input
              type="range"
              min={15000}
              max={60000}
              step={1000}
              value={availableVolume}
              onChange={(e) => setAvailableVolume(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>15k MT</span>
              <span>35k MT</span>
              <span>60k MT</span>
            </div>
          </div>

          {/* Smelter Origin Facility */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600">Smelter Origin Facility:</label>
            <select
              value={smelterOrigin}
              onChange={(e) => setSmelterOrigin(e.target.value)}
              className="w-full bg-white border border-slate-300 text-slate-800 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-sky-500 font-medium"
            >
              <option value="Chanderiya Hydro-Smelter">Chanderiya Hydro-Smelter (Rajasthan)</option>
              <option value="Dariba Smelting Complex">Dariba Smelting Complex (Rajasthan)</option>
              <option value="Debari Zinc Smelter">Debari Zinc Smelter (Rajasthan)</option>
              <option value="Pantnagar Metal Plant">Pantnagar Metal Plant (Uttarakhand)</option>
            </select>
          </div>

          {/* Baseline LTC Target Share */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 font-medium">Target LTC Share (%):</span>
              <span className="font-mono font-bold text-sky-600">{targetLtcShare}%</span>
            </div>
            <input
              type="range"
              min={40}
              max={90}
              step={5}
              value={targetLtcShare}
              onChange={(e) => setTargetLtcShare(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>40% (High Spot)</span>
              <span>65% (Balanced)</span>
              <span>90% (Max Lock)</span>
            </div>
          </div>

          {/* Spot Market Sentiment */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600">Spot Market Sentiment:</label>
            <select
              value={marketSentiment}
              onChange={(e) => setMarketSentiment(e.target.value)}
              className="w-full bg-white border border-slate-300 text-slate-800 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-sky-500 font-medium"
            >
              <option value="Bullish">Bullish (+Scarcity Premium)</option>
              <option value="Neutral">Neutral (Balanced)</option>
              <option value="Bearish">Bearish (-Elasticity Discount)</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPI Optimization Output Cards */}
      {plan && baseline && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Optimal Split */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-500 mb-1">Recommended Volume Split</div>
            <div className="text-xl font-black font-mono text-slate-900 flex items-center gap-2">
              <span className="text-sky-600">{plan.ltc_share_pct}% LTC</span>
              <span className="text-slate-400">:</span>
              <span className="text-emerald-600">{plan.spot_share_pct}% Spot</span>
            </div>
            <div className="flex justify-between text-xs text-slate-600 mt-2 font-mono">
              <span>LTC: {plan.ltc_volume_mt.toLocaleString()} MT</span>
              <span>Spot: {plan.spot_volume_mt.toLocaleString()} MT</span>
            </div>
          </div>

          {/* Total Net Sales Realization */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-500 mb-1">Total Net Sales Realization (NSR)</div>
            <div className="text-2xl font-black font-mono text-slate-900">
              ₹{plan.nsr_crores.toLocaleString()} <span className="text-xs font-normal text-slate-500">Crores</span>
            </div>
            <div className="text-xs text-slate-600 mt-2 font-mono">
              Realized NSR: ₹{plan.nsr_per_mt_inr.toLocaleString()} / MT
            </div>
          </div>

          {/* Blended Physical Premium */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-500 mb-1">Blended Realized Physical Premium</div>
            <div className="text-2xl font-black font-mono text-sky-600">
              +${plan.blended_premium_usd} <span className="text-xs font-normal text-slate-500">/ MT over LME</span>
            </div>
            <div className="flex justify-between text-[11px] text-slate-600 mt-2 font-mono">
              <span>LTC: +${plan.realized_ltc_premium_usd}</span>
              <span className="text-emerald-600 font-bold">Spot: +${plan.realized_spot_premium_usd}</span>
            </div>
          </div>

          {/* Incremental Upside over Standard 80/20 */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50/70 border border-emerald-200 shadow-sm">
            <div className="text-xs text-emerald-800 mb-1 flex items-center justify-between font-semibold">
              <span>NSR Optimization Upside</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[10px] border border-emerald-300 font-bold">
                +{baseline.incremental_gain_pct}%
              </span>
            </div>
            <div className="text-2xl font-black font-mono text-emerald-700">
              +₹{baseline.incremental_gain_crores.toLocaleString()} <span className="text-xs font-normal text-slate-600">Cr</span>
            </div>
            <div className="text-xs text-slate-600 mt-2">
              Incremental gain achieved vs. default 80% LTC / 20% spot allocation.
            </div>
          </div>
        </div>
      )}

      {/* Scenario Curves: NSR vs LTC Share % Curve */}
      {scenarios.length > 0 && (
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-sky-600" />
                <span>NSR Realization Frontier: LTC Commitment Share Sensitivity Curve</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Simulates trade-off between price volatility risk (LTC guarantee) vs. capturing prompt spot premiums on the HZL B2B e-Auction portal.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-3 h-0.5 bg-emerald-500 rounded" />
              <span className="text-slate-700 font-medium">Net Sales Realization (₹ Cr)</span>
            </div>
          </div>

          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scenarios} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey="ltc_share_pct"
                  stroke="#64748b"
                  fontSize={11}
                  tickFormatter={(val) => `${val}% LTC`}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={11}
                  domain={["auto", "auto"]}
                  tickFormatter={(val) => `₹${val} Cr`}
                />
                <Tooltip
                  formatter={(val: any) => [`₹${val} Crores`, "NSR Realization"]}
                  labelFormatter={(val) => `LTC Share: ${val}% (Spot: ${100 - Number(val)}%)`}
                  contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "8px", fontSize: "11px", color: "#0f172a" }}
                />
                <Line
                  type="monotone"
                  dataKey="nsr_crores"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#10b981" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Recommended Customer Tier Allocation Table */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-sky-600" />
              <span>Recommended Customer Tier Quota Allocation</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Specific volume distribution across strategic accounts, tube mills, and prompt spot e-auction pools.
            </p>
          </div>

          <button
            onClick={() => setShowMemoModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-300 transition"
          >
            <FileCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>Generate Commercial Allocation Memo</span>
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-mono text-[10px] border-b border-slate-200">
              <tr>
                <th className="px-3.5 py-2.5">Customer Tier</th>
                <th className="px-3 py-2.5">Key Account Examples</th>
                <th className="px-3 py-2.5">Contract Basis</th>
                <th className="px-3 py-2.5">Allocated Volume (MT)</th>
                <th className="px-3 py-2.5">Pricing Formula</th>
                <th className="px-3 py-2.5">Payment Terms</th>
                <th className="px-3 py-2.5">Strategic Objective</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {optimizationResult?.tier_allocation_breakdown.map((tier, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition">
                  <td className="px-3.5 py-3 font-bold text-slate-900">{tier.tier}</td>
                  <td className="px-3 py-3 text-slate-700 font-medium">
                    {tier.accounts.join(", ")}
                  </td>
                  <td className="px-3 py-3">
                    <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200 font-mono text-[10px] font-semibold">
                      {tier.allocation_type}
                    </span>
                  </td>
                  <td className="px-3 py-3 font-mono font-bold text-emerald-600">
                    {tier.volume_mt.toLocaleString()} MT
                  </td>
                  <td className="px-3 py-3 font-mono text-slate-800">{tier.pricing_basis}</td>
                  <td className="px-3 py-3 text-slate-500">{tier.payment_terms}</td>
                  <td className="px-3 py-3 text-slate-600 text-[11px] leading-relaxed">
                    {tier.strategic_rationale}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Arbitrage Check Callout */}
      {optimizationResult?.export_arbitrage_analysis && (
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <span>Seaborne Export Arbitrage Test (FOB West Coast vs Domestic NSR)</span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[10px] font-semibold">
                {optimizationResult.export_arbitrage_analysis.export_viable ? "Export Viable" : "Domestic Priority"}
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {optimizationResult.export_arbitrage_analysis.commentary}
            </p>
          </div>
        </div>
      )}

      {/* Allocation Directive Memo Modal */}
      {showMemoModal && plan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white border border-slate-300 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] font-mono text-sky-700 uppercase tracking-widest font-bold">
                  COMMERCIAL DIRECTIVE MEMORANDUM
                </span>
                <h3 className="text-base font-extrabold text-slate-900">
                  Hindustan Zinc Limited • Monthly Allocation Approval
                </h3>
              </div>
              <button
                onClick={() => setShowMemoModal(false)}
                className="text-xs text-slate-500 hover:text-slate-900 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 font-medium"
              >
                ✕ Close
              </button>
            </div>

            <div className="text-xs space-y-3 font-sans">
              <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-slate-800">
                <div>Metal Batch: {metal} ({selectedGrade})</div>
                <div>Smelter: {smelterOrigin}</div>
                <div>Available Batch: {availableVolume.toLocaleString()} MT</div>
                <div>Target Month: November 2026</div>
              </div>

              <div className="p-3 bg-sky-50 rounded-lg border border-sky-200 space-y-2">
                <div className="font-bold text-sky-900">Executive Commercial Split:</div>
                <div className="grid grid-cols-2 gap-2 text-slate-800 font-mono text-xs">
                  <div>• LTC Allocation: {plan.ltc_volume_mt.toLocaleString()} MT ({plan.ltc_share_pct}%)</div>
                  <div>• Spot E-Auction Pool: {plan.spot_volume_mt.toLocaleString()} MT ({plan.spot_share_pct}%)</div>
                  <div>• Anticipated Gross NSR: ₹{plan.nsr_crores.toLocaleString()} Crores</div>
                  <div>• Blended Premium: +${plan.blended_premium_usd}/MT over LME</div>
                </div>
              </div>

              <p className="text-slate-600 text-[11px] leading-relaxed">
                Directive approved by MetalSense AI Engine. Dispatches from {smelterOrigin} must respect customer tier allocations to guard domestic market share against Korean/Kazakh imports while capturing prompt physical premium upside.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-300"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Directive</span>
              </button>
              <button
                onClick={() => setShowMemoModal(false)}
                className="px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-sm"
              >
                Confirm & Seal Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
