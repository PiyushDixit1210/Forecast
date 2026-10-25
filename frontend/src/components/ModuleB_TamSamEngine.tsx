"use client";

import React, { useState } from "react";
import { MetalType, TamSamResponse, TopImporter } from "@/types";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
  PieChart as RePieChart,
  Pie
} from "recharts";
import {
  PieChart,
  ArrowRight,
  ShieldAlert,
  Ship,
  TrendingDown,
  Building,
  CheckCircle,
  FileText,
  DollarSign,
  Compass,
  Download
} from "lucide-react";

interface ModuleBProps {
  metal: MetalType;
  tamSamData: TamSamResponse | null;
}

export const ModuleB_TamSamEngine: React.FC<ModuleBProps> = ({
  metal,
  tamSamData
}) => {
  const [selectedImporter, setSelectedImporter] = useState<TopImporter | null>(null);
  const [filterFeasibility, setFilterFeasibility] = useState<string>("All");

  if (!tamSamData) {
    return (
      <div className="p-8 text-center text-slate-500 bg-white rounded-xl border border-slate-200 shadow-sm">
        Loading TAM & SAM Market Segmentation Data...
      </div>
    );
  }

  const {
    tam_mt,
    sam_mt,
    som_mt,
    market_breakdown,
    regional_distribution,
    top_importers,
    import_substitution_opportunity_mt,
    import_substitution_value_cr
  } = tamSamData;

  // Pie chart data for Market Shares
  const shareChartData = [
    { name: market_breakdown.hzl_sales.label, value: market_breakdown.hzl_sales.volume_mt, fill: "#0284c7" },
    { name: market_breakdown.secondary_scrap.label, value: market_breakdown.secondary_scrap.volume_mt, fill: "#94a3b8" },
    { name: market_breakdown.imports.label, value: market_breakdown.imports.volume_mt, fill: "#f59e0b" },
  ];

  // Regional breakdown data
  const regionalData = Object.entries(regional_distribution).map(([region, info]) => ({
    region: `${region} India`,
    volume_mt: info.volume_mt,
    share_pct: info.share_pct,
    cluster: info.major_cluster
  }));

  const filteredImporters = top_importers.filter((imp) => {
    if (filterFeasibility === "All") return true;
    return imp.substitution_feasibility === filterFeasibility;
  });

  return (
    <div className="space-y-6">
      {/* Sizing Overview: TAM vs SAM vs SOM Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* TAM */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>TAM (Total Addressable Market)</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] font-medium">
              Annual Consumption
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-slate-900">
            {tam_mt.toLocaleString()} <span className="text-xs font-normal text-slate-500">MT/year</span>
          </div>
          <div className="text-xs text-slate-500 mt-2">
            Total Indian domestic consumption across primary & secondary.
          </div>
        </div>

        {/* SAM */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>SAM (Serviceable Addressable)</span>
            <span className="px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 font-mono text-[10px] border border-sky-200 font-semibold">
              Primary High Grade
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-sky-600">
            {sam_mt.toLocaleString()} <span className="text-xs font-normal text-slate-500">MT</span>
          </div>
          <div className="text-xs text-slate-500 mt-2">
            Target segments requiring HZL high-purity smelter grades.
          </div>
        </div>

        {/* SOM / Target */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>HZL Current Primary Sales</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono text-[10px] border border-emerald-200 font-semibold">
              Market Leader
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-emerald-600">
            {market_breakdown.hzl_sales.volume_mt.toLocaleString()}{" "}
            <span className="text-xs font-normal text-slate-500">MT ({market_breakdown.hzl_sales.share_pct}%)</span>
          </div>
          <div className="text-xs text-slate-500 mt-2">
            Dominant domestic market share supplied from Rajasthan & Uttarakhand.
          </div>
        </div>

        {/* Import Substitution Bounty */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50/60 border border-amber-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-amber-700 mb-1">
            <span className="font-semibold">Import Substitution Prize</span>
            <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-mono text-[10px] border border-amber-300 font-semibold">
              Commercial Upside
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-slate-900">
            ₹{import_substitution_value_cr.toLocaleString()} <span className="text-xs font-normal text-amber-700">Cr</span>
          </div>
          <div className="text-xs text-slate-600 mt-2">
            {import_substitution_opportunity_mt.toLocaleString()} MT contestable volume currently entering Indian ports.
          </div>
        </div>
      </div>

      {/* Visual Market Segmentation Breakdown & Regional Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Total Domestic Consumption Stacked Share */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-1">
            Total Domestic Consumption (TDC) Stack
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            TDC = HZL Sales ({market_breakdown.hzl_sales.share_pct}%) + Recycled Scrap ({market_breakdown.secondary_scrap.share_pct}%) + EXIM Imports ({market_breakdown.imports.share_pct}%)
          </p>

          <div className="h-[220px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={shareChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {shareChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [`${val.toLocaleString()} MT`, "Volume"]}
                  contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "8px", fontSize: "11px", color: "#0f172a" }}
                />
              </RePieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-200 text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
                HZL Domestic Sales
              </span>
              <span className="font-mono font-bold text-slate-900">
                {market_breakdown.hzl_sales.volume_mt.toLocaleString()} MT ({market_breakdown.hzl_sales.share_pct}%)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                Secondary Scrap / Recyclers
              </span>
              <span className="font-mono font-semibold text-slate-700">
                {market_breakdown.secondary_scrap.volume_mt.toLocaleString()} MT ({market_breakdown.secondary_scrap.share_pct}%)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-amber-700 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                EXIM Seaborne Imports
              </span>
              <span className="font-mono font-bold text-amber-600">
                {market_breakdown.imports.volume_mt.toLocaleString()} MT ({market_breakdown.imports.share_pct}%)
              </span>
            </div>
          </div>
        </div>

        {/* Regional Consumption Density Breakdown */}
        <div className="lg:col-span-7 p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-bold text-slate-900">Regional Demand Clustering in India</h3>
            <span className="text-xs text-slate-500 font-mono">Consuming Hubs</span>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Industrial concentration of downstream galvanizers, battery plants, solar parks, and tube mills.
          </p>

          <div className="h-[210px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionalData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <XAxis type="number" stroke="#64748b" fontSize={11} tickFormatter={(val) => `${(val / 1000).toFixed(0)}k MT`} />
                <YAxis dataKey="region" type="category" stroke="#475569" fontSize={11} />
                <Tooltip
                  formatter={(val: any) => [`${val.toLocaleString()} MT`, "Demand Volume"]}
                  contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "8px", fontSize: "11px", color: "#0f172a" }}
                />
                <Bar dataKey="volume_mt" fill="#0284c7" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-200 text-[11px] text-slate-600">
            <div>
              <span className="font-semibold text-slate-800">West India (38%):</span> JSW Vasind, AM/NS Hazira, POSCO
            </div>
            <div>
              <span className="font-semibold text-slate-800">North India (28%):</span> APL Apollo, Surya Roshni, Pantnagar lines
            </div>
            <div>
              <span className="font-semibold text-slate-800">South India (22%):</span> Exide Hosur, Amara Raja Tirupati, Solar PV
            </div>
            <div>
              <span className="font-semibold text-slate-800">East India (12%):</span> Tata Steel Kalinganagar, JSPL Angul
            </div>
          </div>
        </div>
      </div>

      {/* High-Density EXIM Trade Intelligence: Top Importing Customers */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Ship className="w-4 h-4 text-amber-600" />
              <span>Indian Customs EXIM Bill of Lading Intelligence & Landed Cost Parity</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Identifies top enterprise consumers importing seaborne metal, landed prices at Indian ports, and actionable HZL win-back strategies.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Filter Strategy:</span>
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
              {["All", "Immediate Win", "High", "Medium"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterFeasibility(f)}
                  className={`px-2 py-1 rounded transition font-medium ${
                    filterFeasibility === f
                      ? "bg-sky-600 text-white font-semibold shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-mono text-[10px] border-b border-slate-200">
              <tr>
                <th className="px-3.5 py-2.5">Importer Name & Location</th>
                <th className="px-3 py-2.5">Imported Grade</th>
                <th className="px-3 py-2.5">Volume (MT)</th>
                <th className="px-3 py-2.5">Origin & Smelter</th>
                <th className="px-3 py-2.5">Port & Duty Regime</th>
                <th className="px-3 py-2.5">Landed Cost (INR/MT)</th>
                <th className="px-3 py-2.5">HZL Parity Gap</th>
                <th className="px-3 py-2.5">Win Feasibility</th>
                <th className="px-3 py-2.5 text-right">Action Plan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredImporters.map((row, idx) => {
                const isImportCheaper = row.parity_delta_inr > 0;
                return (
                  <tr
                    key={idx}
                    className="hover:bg-slate-50 transition cursor-pointer"
                    onClick={() => setSelectedImporter(row)}
                  >
                    <td className="px-3.5 py-3 font-semibold text-slate-900">
                      <div className="flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-slate-500" />
                        <span>{row.importer}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 pl-5">{row.plant_location}</div>
                    </td>
                    <td className="px-3 py-3 font-mono text-slate-700">{row.grade}</td>
                    <td className="px-3 py-3 font-mono font-bold text-slate-900">
                      {row.volume_mt.toLocaleString()} MT
                    </td>
                    <td className="px-3 py-3">
                      <div className="text-slate-800 font-medium">{row.origin_country}</div>
                      <div className="text-[10px] text-slate-500">{row.origin_smelter}</div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="text-slate-800 font-medium">{row.port}</div>
                      <div className="text-[10px] text-amber-700 font-mono font-semibold">{row.duty_type}</div>
                    </td>
                    <td className="px-3 py-3 font-mono text-slate-800 font-medium">
                      ₹{row.landed_cost_inr.toLocaleString()}
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                          isImportCheaper
                            ? "bg-rose-50 text-rose-700 border border-rose-200"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}
                      >
                        {isImportCheaper ? "+" : ""}
                        ₹{row.parity_delta_inr.toLocaleString()}/MT
                      </span>
                      <div className="text-[9px] text-slate-500 mt-0.5 font-medium">
                        {isImportCheaper ? "Import cheaper by delta" : "HZL cheaper by delta"}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold ${
                          row.substitution_feasibility === "Immediate Win"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : row.substitution_feasibility === "High"
                            ? "bg-sky-50 text-sky-700 border border-sky-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {row.substitution_feasibility}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImporter(row);
                        }}
                        className="px-2.5 py-1 rounded bg-sky-600 hover:bg-sky-700 text-white text-[11px] font-semibold transition shadow-sm"
                      >
                        View Playbook
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Strategic Playbook Flyout / Modal */}
      {selectedImporter && (
        <div className="p-4 rounded-xl bg-white border border-sky-300 shadow-xl space-y-3">
          <div className="flex items-start justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-sky-600" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  HZL Strategic Substitution Playbook: {selectedImporter.importer}
                </h4>
                <p className="text-xs text-slate-500">
                  Target: {selectedImporter.volume_mt} MT {selectedImporter.grade} imported via {selectedImporter.port}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedImporter(null)}
              className="text-xs text-slate-600 hover:text-slate-900 px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 font-medium"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-slate-500">Current Import Landed Cost:</div>
              <div className="text-base font-mono font-bold text-slate-900 mt-0.5">
                ₹{selectedImporter.landed_cost_inr.toLocaleString()} / MT
              </div>
              <div className="text-[10px] text-amber-700 font-medium mt-1">Origin: {selectedImporter.origin_country} ({selectedImporter.duty_type})</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-slate-500">HZL Ex-Works Benchmark:</div>
              <div className="text-base font-mono font-bold text-slate-900 mt-0.5">
                ₹{selectedImporter.hzl_ex_works_inr.toLocaleString()} / MT
              </div>
              <div className="text-[10px] text-sky-700 font-medium mt-1">Supply from Dariba / Chanderiya</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-slate-500">Parity Difference:</div>
              <div className={`text-base font-mono font-bold mt-0.5 ${selectedImporter.parity_delta_inr > 0 ? "text-rose-600" : "text-emerald-600"}`}>
                {selectedImporter.parity_delta_inr > 0 ? "+" : ""}₹{selectedImporter.parity_delta_inr.toLocaleString()} / MT
              </div>
              <div className="text-[10px] text-slate-500 mt-1 font-medium">
                {selectedImporter.parity_delta_inr > 0 ? "Import price advantage" : "HZL price advantage"}
              </div>
            </div>
          </div>

          <div className="p-3 bg-sky-50 rounded-lg border border-sky-200 text-xs">
            <div className="font-semibold text-sky-900 flex items-center gap-1.5 mb-1">
              <CheckCircle className="w-3.5 h-3.5 text-sky-600" />
              <span>Recommended Commercial Negotiation Strategy:</span>
            </div>
            <p className="text-slate-700 leading-relaxed font-sans">{selectedImporter.strategy}</p>
          </div>
        </div>
      )}
    </div>
  );
};
