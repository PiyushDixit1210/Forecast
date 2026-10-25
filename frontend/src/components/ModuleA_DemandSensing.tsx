"use client";

import React, { useState, useMemo } from "react";
import { MetalType, RegionType, DemandSensingResponse } from "@/types";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ReferenceLine
} from "recharts";
import {
  TrendingUp,
  Activity,
  Sliders,
  Sparkles,
  Calendar,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Info
} from "lucide-react";

interface ModuleAProps {
  metal: MetalType;
  demandData: DemandSensingResponse | null;
  selectedRegion: RegionType;
  onChangeRegion: (r: RegionType) => void;
  selectedGrade: string;
  onChangeGrade: (g: string) => void;
  gradesList: string[];
}

export const ModuleA_DemandSensing: React.FC<ModuleAProps> = ({
  metal,
  demandData,
  selectedRegion,
  onChangeRegion,
  selectedGrade,
  onChangeGrade,
  gradesList
}) => {
  // Sensitivity multipliers for What-If scenario modeling
  const [steelGrowthDelta, setSteelGrowthDelta] = useState<number>(0); // -10% to +10%
  const [batteryDelta, setBatteryDelta] = useState<number>(0);
  const [solarDelta, setSolarDelta] = useState<number>(0);

  // Compute simulated chart data when sliders change
  const chartData = useMemo(() => {
    if (!demandData?.combined_timeline) return [];

    // Calculate elasticity impact factor
    let sensitivityFactor = 0;
    if (metal === "Zinc") {
      sensitivityFactor = (steelGrowthDelta * 0.65 + solarDelta * 0.15) / 100;
    } else if (metal === "Lead") {
      sensitivityFactor = (batteryDelta * 0.85 + steelGrowthDelta * 0.1) / 100;
    } else if (metal === "Silver") {
      sensitivityFactor = (solarDelta * 0.9 + batteryDelta * 0.1) / 100;
    } else {
      sensitivityFactor = (batteryDelta * 0.5 + solarDelta * 0.3) / 100;
    }

    return demandData.combined_timeline.map((pt) => {
      if (pt.period_type === "Historical") {
        return {
          month: pt.month,
          period_type: pt.period_type,
          actual: pt.demand_mt,
          forecast: null,
          lower_95: null,
          upper_95: null,
          lower_80: null,
          upper_80: null,
          confidence_pct: null,
        };
      }

      // For AI Forecast, apply sensitivity delta
      const adjForecast = Math.round(pt.demand_mt * (1 + sensitivityFactor));
      const adjLower95 = pt.lower_ci_95 ? Math.round(pt.lower_ci_95 * (1 + sensitivityFactor)) : null;
      const adjUpper95 = pt.upper_ci_95 ? Math.round(pt.upper_ci_95 * (1 + sensitivityFactor)) : null;
      const adjLower80 = pt.lower_ci_80 ? Math.round(pt.lower_ci_80 * (1 + sensitivityFactor)) : null;
      const adjUpper80 = pt.upper_ci_80 ? Math.round(pt.upper_ci_80 * (1 + sensitivityFactor)) : null;

      return {
        month: pt.month,
        period_type: pt.period_type,
        actual: null,
        forecast: adjForecast,
        lower_95: adjLower95,
        upper_95: adjUpper95,
        lower_80: adjLower80,
        upper_80: adjUpper80,
        confidence_pct: pt.confidence_pct,
      };
    });
  }, [demandData, steelGrowthDelta, batteryDelta, solarDelta, metal]);

  const currentMonth = demandData?.current_month_demand || 0;
  const nextMonthForecast = chartData.find(d => d.period_type === "AI Forecast")?.forecast || demandData?.next_month_forecast || 0;
  const momGrowth = currentMonth > 0 ? (((nextMonthForecast - currentMonth) / currentMonth) * 100).toFixed(2) : "0.0";

  const regions: RegionType[] = ["North", "West", "South", "East"];

  return (
    <div className="space-y-6">
      {/* Control Bar: Metal, Grade & Regional Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          {/* Grade Selector */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-600">Metal Grade:</label>
            <select
              value={selectedGrade}
              onChange={(e) => onChangeGrade(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-sky-500 font-medium"
            >
              {gradesList.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Regional Segmentation */}
          <div className="flex items-center gap-1.5 pl-3 border-l border-slate-200">
            <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-sky-600" />
              Region:
            </span>
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              {regions.map((r) => (
                <button
                  key={r}
                  onClick={() => onChangeRegion(r)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                    selectedRegion === r
                      ? "bg-sky-600 text-white shadow-sm font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                  }`}
                >
                  {r} India
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Smelter Lead Sourcing Status */}
        <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Primary Supply Smelter:</span>
          <span className="font-semibold text-slate-800">
            {selectedRegion === "North"
              ? "Pantnagar Metal Plant (Uttarakhand)"
              : selectedRegion === "West"
              ? "Debari & Chanderiya (Rajasthan)"
              : selectedRegion === "East"
              ? "Chanderiya & Dariba Dedicated Rakes"
              : "Dariba Smelting Complex (Direct Logistics)"}
          </span>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Current Demand */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Oct 2026 Actual Demand</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] font-medium">Actual</span>
          </div>
          <div className="text-2xl font-black font-mono text-slate-900">
            {currentMonth.toLocaleString()} <span className="text-xs font-normal text-slate-500">MT</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
            <span>Baseline Run-Rate:</span>
            <span className="font-mono text-slate-700 font-semibold">
              {demandData?.baseline_monthly_demand.toLocaleString()} MT
            </span>
          </div>
        </div>

        {/* Next Month AI Forecast */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-sky-50 via-blue-50/60 to-white border border-sky-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-sky-700 mb-1">
            <span className="flex items-center gap-1 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              Nov 2026 AI Sensing
            </span>
            <span className="px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 font-mono text-[10px] border border-sky-200 font-semibold">
              MoM Prediction
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-slate-900 flex items-baseline gap-2">
            <span>{nextMonthForecast.toLocaleString()}</span>
            <span className="text-xs font-normal text-slate-500">MT</span>
            <span className="text-xs font-mono font-bold text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +{momGrowth}%
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Downstream demand expansion in {selectedRegion} India</span>
          </div>
        </div>

        {/* Forecast Confidence */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>AI Sensing Confidence</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[10px] font-semibold">
              Econometric Fit
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-emerald-600">
            94.2% <span className="text-xs font-normal text-slate-500">R² = 0.91</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
            <span>Confidence Interval:</span>
            <span className="font-mono text-slate-700 font-semibold">±3.5% Standard Error</span>
          </div>
        </div>

        {/* 6-Month Projected CAGR */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>6-Month Demand Horizon</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] font-medium">
              FY27 Q1
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-sky-600">
            +{demandData?.six_month_cagr_pct}% <span className="text-xs font-normal text-slate-500">CAGR</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
            <span>Peak Demand Month:</span>
            <span className="font-mono text-slate-700 font-semibold">March 2027 (Capex Close)</span>
          </div>
        </div>
      </div>

      {/* Main Chart: Historical Demand vs AI Forecast with 80% & 95% Confidence Intervals */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-sky-600" />
              <span>Historical Domestic Offtake vs. 1-to-6 Month AI Econometric Forecast</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono font-medium">
                {metal} • {selectedGrade} • {selectedRegion} India
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Trained on 7 years of Indian industrial production (IIP), automotive build rates, steel capacity utilization, and EXIM trade flows.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-slate-400 rounded" />
              <span className="text-slate-600">Historical Actuals</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-sky-600 rounded" />
              <span className="text-sky-700 font-semibold">AI Central Forecast</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-2 bg-sky-500/25 rounded border border-sky-400" />
              <span className="text-slate-600">80% CI</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-2 bg-sky-500/10 rounded border border-sky-300" />
              <span className="text-slate-600">95% CI</span>
            </div>
          </div>
        </div>

        {/* Time-Series Chart */}
        <div className="h-[360px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 20, bottom: 10, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                tickFormatter={(val) => `${val >= 1000 ? (val / 1000).toFixed(0) + "k" : val}`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const row = payload[0].payload;
                    const isForecast = row.period_type === "AI Forecast";
                    return (
                      <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-xl text-xs space-y-1">
                        <div className="font-bold text-slate-900 flex items-center justify-between border-b border-slate-200 pb-1">
                          <span>{label}</span>
                          <span
                            className={`px-1.5 py-0.2 rounded font-mono text-[10px] ${
                              isForecast ? "bg-sky-50 text-sky-700 border border-sky-200 font-semibold" : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {row.period_type}
                          </span>
                        </div>
                        {row.actual !== null && (
                          <div className="text-slate-700">
                            Actual Demand: <span className="font-mono font-bold text-slate-900">{row.actual} MT</span>
                          </div>
                        )}
                        {row.forecast !== null && (
                          <>
                            <div className="text-sky-700 font-medium">
                              AI Forecast: <span className="font-mono font-bold text-sky-600">{row.forecast} MT</span>
                            </div>
                            <div className="text-slate-500 text-[11px]">
                              80% Range: <span className="font-mono text-slate-700">{row.lower_80} - {row.upper_80} MT</span>
                            </div>
                            <div className="text-slate-500 text-[11px]">
                              95% Range: <span className="font-mono text-slate-700">{row.lower_95} - {row.upper_95} MT</span>
                            </div>
                            <div className="text-emerald-600 font-medium text-[11px] pt-1">
                              Confidence Score: {row.confidence_pct}%
                            </div>
                          </>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />

              {/* 95% Confidence Band (Upper and Lower) */}
              <Area
                type="monotone"
                dataKey="upper_95"
                stroke="transparent"
                fill="#0284c7"
                fillOpacity={0.12}
                name="95% CI Upper"
              />
              <Area
                type="monotone"
                dataKey="lower_95"
                stroke="transparent"
                fill="#ffffff"
                fillOpacity={1.0}
                name="95% CI Lower"
              />

              {/* 80% Confidence Band */}
              <Area
                type="monotone"
                dataKey="upper_80"
                stroke="transparent"
                fill="#0284c7"
                fillOpacity={0.22}
                name="80% CI Upper"
              />
              <Area
                type="monotone"
                dataKey="lower_80"
                stroke="transparent"
                fill="#ffffff"
                fillOpacity={1.0}
                name="80% CI Lower"
              />

              {/* Historical Line */}
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#64748b"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "#64748b" }}
                activeDot={{ r: 5 }}
                name="Historical Actual"
              />

              {/* AI Forecast Line */}
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="#0284c7"
                strokeWidth={3}
                strokeDasharray="4 4"
                dot={{ r: 4, fill: "#0284c7" }}
                activeDot={{ r: 6 }}
                name="AI Forecast"
              />

              {/* Divider between Actual and Forecast */}
              <ReferenceLine x="Oct 26" stroke="#d97706" strokeDasharray="3 3" label={{ value: "Forecast Horizon", fill: "#d97706", fontSize: 10, position: "top" }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Macro Driver Impact & Downstream Sensitivity Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Downstream Macro Drivers Cards */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Downstream Sector Demand Drivers (Indian Economy)</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">Correlated Regressors</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {demandData?.active_macro_drivers.map((driver) => (
              <div
                key={driver.id}
                className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 shadow-sm transition"
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-sky-700">{driver.sector}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[11px] font-bold">
                    +{driver.mom_change_pct}% MoM
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-900 line-clamp-1">{driver.metric_name}</div>
                <div className="flex items-center gap-2 mt-1 text-xs">
                  <span className="text-slate-500">Current Run-rate:</span>
                  <span className="font-mono font-semibold text-slate-900">
                    {driver.current_value.toLocaleString()} {driver.unit}
                  </span>
                  <span className="text-[10px] text-slate-500">({driver.yoy_change_pct}% YoY)</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                  {driver.commentary}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time What-If Sensitivity Modeler */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-sky-600" />
              <span>Sensitivity Simulator</span>
            </h3>
            <button
              onClick={() => {
                setSteelGrowthDelta(0);
                setBatteryDelta(0);
                setSolarDelta(0);
              }}
              className="text-[10px] text-sky-600 hover:text-sky-800 font-semibold hover:underline"
            >
              Reset Scenarios
            </button>
          </div>
          <p className="text-xs text-slate-500">
            Stress-test next month demand against shocks in key downstream manufacturing sectors.
          </p>

          {/* Slider 1: Galvanized Steel */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-700 font-medium">Coated Steel Capacity Run-Rate:</span>
              <span className={`font-mono font-bold ${steelGrowthDelta >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                {steelGrowthDelta >= 0 ? "+" : ""}{steelGrowthDelta}%
              </span>
            </div>
            <input
              type="range"
              min={-10}
              max={10}
              step={1}
              value={steelGrowthDelta}
              onChange={(e) => setSteelGrowthDelta(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>-10%</span>
              <span>Baseline</span>
              <span>+10%</span>
            </div>
          </div>

          {/* Slider 2: Auto / EV Batteries */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-700 font-medium">Auto & Battery OEM Build Rates:</span>
              <span className={`font-mono font-bold ${batteryDelta >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                {batteryDelta >= 0 ? "+" : ""}{batteryDelta}%
              </span>
            </div>
            <input
              type="range"
              min={-10}
              max={10}
              step={1}
              value={batteryDelta}
              onChange={(e) => setBatteryDelta(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>-10%</span>
              <span>Baseline</span>
              <span>+10%</span>
            </div>
          </div>

          {/* Slider 3: Solar PV Cell Additions */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-700 font-medium">Solar PV Cell PLI Line Utilization:</span>
              <span className={`font-mono font-bold ${solarDelta >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                {solarDelta >= 0 ? "+" : ""}{solarDelta}%
              </span>
            </div>
            <input
              type="range"
              min={-20}
              max={20}
              step={2}
              value={solarDelta}
              onChange={(e) => setSolarDelta(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>-20%</span>
              <span>Baseline</span>
              <span>+20%</span>
            </div>
          </div>

          {/* Dynamic Impact Summary Callout */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1.5">
            <div className="text-slate-600">Simulated Nov 2026 Shift:</div>
            <div className="flex items-baseline justify-between font-mono">
              <span className="text-slate-900 font-bold">{nextMonthForecast.toLocaleString()} MT</span>
              <span
                className={`font-bold ${
                  nextMonthForecast >= (demandData?.next_month_forecast || 0)
                    ? "text-emerald-600"
                    : "text-rose-600"
                }`}
              >
                {nextMonthForecast >= (demandData?.next_month_forecast || 0) ? "+" : ""}
                {(nextMonthForecast - (demandData?.next_month_forecast || 0)).toLocaleString()} MT
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
