"use client";

import React, { useState } from "react";
import { Database, Copy, Check, Table, Code, Shield, Sparkles, Server } from "lucide-react";

export const DatabaseSchemaViewer: React.FC = () => {
  const [activeTable, setActiveTable] = useState<string>("market_prices");
  const [copied, setCopied] = useState<boolean>(false);

  const tables = [
    {
      id: "market_prices",
      name: "1. market_prices",
      description: "Daily commodity benchmarks across LME, SHFE, MCX, CME, FX rates, and Indian domestic physical premiums.",
      columns: [
        { name: "id", type: "UUID PRIMARY KEY DEFAULT gen_random_uuid()" },
        { name: "date", type: "DATE NOT NULL" },
        { name: "metal", type: "VARCHAR(50) NOT NULL ('Zinc', 'Lead', 'Silver', 'Cadmium')" },
        { name: "exchange_lme", type: "NUMERIC(12, 2) NOT NULL (USD/MT or USD/oz)" },
        { name: "exchange_shfe", type: "NUMERIC(12, 2) (RMB/MT)" },
        { name: "exchange_mcx", type: "NUMERIC(12, 2) NOT NULL (INR/kg or INR/10g)" },
        { name: "inr_usd_rate", type: "NUMERIC(10, 4) DEFAULT 86.65" },
        { name: "physical_premium_india", type: "NUMERIC(10, 2) NOT NULL (USD/MT over LME)" },
        { name: "shfe_lme_ratio", type: "NUMERIC(8, 4)" },
        { name: "created_at", type: "TIMESTAMPTZ DEFAULT now()" },
      ],
      sampleRows: [
        { date: "2026-10-24", metal: "Zinc", exchange_lme: 2885.50, exchange_shfe: 24350.0, exchange_mcx: 278.40, inr_usd: 86.65, premium: 135.0, ratio: 8.44 },
        { date: "2026-10-24", metal: "Lead", exchange_lme: 2085.00, exchange_shfe: 17200.0, exchange_mcx: 186.20, inr_usd: 86.65, premium: 105.0, ratio: 8.25 },
        { date: "2026-10-24", metal: "Silver", exchange_lme: 33.85, exchange_shfe: 8420.0, exchange_mcx: 96800.0, inr_usd: 86.65, premium: 0.48, ratio: "-" },
        { date: "2026-10-24", metal: "Cadmium", exchange_lme: 7850.00, exchange_shfe: 64500.0, exchange_mcx: 695.0, inr_usd: 86.65, premium: 180.0, ratio: 8.21 }
      ]
    },
    {
      id: "exim_imports",
      name: "2. exim_imports",
      description: "Indian Customs & Bill of Lading data tracking foreign competitor shipments, origin smelters, and duty regimes.",
      columns: [
        { name: "id", type: "UUID PRIMARY KEY DEFAULT gen_random_uuid()" },
        { name: "date", type: "DATE NOT NULL" },
        { name: "metal", type: "VARCHAR(50) NOT NULL" },
        { name: "grade", type: "VARCHAR(100) NOT NULL (e.g. SHG 99.995%, CGG)" },
        { name: "hs_code", type: "VARCHAR(20) NOT NULL (e.g. 79011100, 78011000)" },
        { name: "importer_name", type: "VARCHAR(255) NOT NULL" },
        { name: "origin_country", type: "VARCHAR(100) NOT NULL" },
        { name: "port", type: "VARCHAR(100) NOT NULL (JNPT, Mundra, Chennai)" },
        { name: "volume_mt", type: "NUMERIC(12, 2) NOT NULL" },
        { name: "cif_price_usd", type: "NUMERIC(12, 2) NOT NULL" },
        { name: "landed_cost_inr", type: "NUMERIC(14, 2) NOT NULL" },
        { name: "duty_type", type: "VARCHAR(50) NOT NULL (Korea CEPA, Basic 7.5%, Adv Auth)" },
        { name: "hzl_parity_delta_inr", type: "NUMERIC(12, 2) NOT NULL" },
      ],
      sampleRows: [
        { date: "2026-10-15", importer: "Tata Steel Ltd", metal: "Zinc", volume: 4200, origin: "South Korea (Korea Zinc)", port: "JNPT", duty: "Korea CEPA (0%)", landed_inr: 272500, delta: "+₹4,200" },
        { date: "2026-10-12", importer: "JSW Steel Coated", metal: "Zinc", volume: 3800, origin: "South Korea (Young Poong)", port: "Mundra", duty: "Korea CEPA (0%)", landed_inr: 271900, delta: "+₹4,800" },
        { date: "2026-10-10", importer: "AM/NS India", metal: "Zinc", volume: 2500, origin: "Kazakhstan (Kazzinc)", port: "Mundra", duty: "Basic 7.5% + SWS", landed_inr: 284500, delta: "-₹7,100" },
        { date: "2026-10-14", importer: "Exide Industries", metal: "Lead", volume: 2400, origin: "South Korea", port: "Kolkata", duty: "Korea CEPA (0%)", landed_inr: 199500, delta: "+₹1,900" },
        { date: "2026-10-16", importer: "Adani Solar Mundra", metal: "Silver", volume: 42.5, origin: "China (Yuguang Lead)", port: "Mundra", duty: "Advance Auth (0%)", landed_inr: 95800000, delta: "+₹10,00,000" }
      ]
    },
    {
      id: "internal_sales",
      name: "3. internal_sales",
      description: "HZL Enterprise Commercial sales history across customer segments, smelter origins, and LTC vs Spot auctions.",
      columns: [
        { name: "id", type: "UUID PRIMARY KEY DEFAULT gen_random_uuid()" },
        { name: "date", type: "DATE NOT NULL" },
        { name: "customer_id", type: "VARCHAR(50) NOT NULL" },
        { name: "customer_name", type: "VARCHAR(255) NOT NULL" },
        { name: "customer_segment", type: "VARCHAR(100) (Galvanized Steel, Batteries, Solar PV)" },
        { name: "region", type: "VARCHAR(50) NOT NULL (North, West, South, East)" },
        { name: "smelter_origin", type: "VARCHAR(100) (Chanderiya, Dariba, Debari, Pantnagar)" },
        { name: "metal", type: "VARCHAR(50) NOT NULL" },
        { name: "grade", type: "VARCHAR(100) NOT NULL" },
        { name: "volume_mt", type: "NUMERIC(12, 2) NOT NULL" },
        { name: "realized_premium_usd", type: "NUMERIC(10, 2) NOT NULL" },
        { name: "net_sales_realization_inr", type: "NUMERIC(14, 2) NOT NULL" },
        { name: "sale_type_ltc_or_auction", type: "VARCHAR(20) CHECK ('LTC', 'Spot Auction', 'Export')" },
      ],
      sampleRows: [
        { customer: "Tata Steel Kalinganagar", segment: "Galvanized Steel", region: "East", smelter: "Chanderiya", volume: 6500, premium: "+$138/MT", sale_type: "LTC" },
        { customer: "JSW Steel Vijayanagar", segment: "Galvanized Steel", region: "South", smelter: "Dariba", volume: 8200, premium: "+$142/MT", sale_type: "LTC" },
        { customer: "Bhushan Power & Steel", segment: "Galvanized Steel", region: "East", smelter: "Chanderiya", volume: 2100, premium: "+$155/MT", sale_type: "Spot Auction" },
        { customer: "Exide Industries Hosur", segment: "Auto/EV Batteries", region: "South", smelter: "Chanderiya", volume: 5400, premium: "+$112/MT", sale_type: "LTC" },
        { customer: "Tata Power Solar", segment: "Solar PV", region: "South", smelter: "Pantnagar", volume: 35, premium: "+$0.52/oz", sale_type: "LTC" }
      ]
    },
    {
      id: "market_intelligence",
      name: "4. market_intelligence",
      description: "Unstructured commodity reports, policy rulings, and high-dimensional pgvector semantic embeddings.",
      columns: [
        { name: "id", type: "UUID PRIMARY KEY DEFAULT gen_random_uuid()" },
        { name: "timestamp", type: "TIMESTAMPTZ NOT NULL DEFAULT now()" },
        { name: "source", type: "VARCHAR(100) NOT NULL" },
        { name: "headline", type: "TEXT NOT NULL" },
        { name: "summary", type: "TEXT NOT NULL" },
        { name: "impact_score", type: "NUMERIC(4, 2) NOT NULL (-1.0 to +1.0)" },
        { name: "sentiment", type: "VARCHAR(20) CHECK ('Bullish', 'Bearish', 'Neutral')" },
        { name: "affected_metal", type: "VARCHAR(50) NOT NULL" },
        { name: "affected_sectors", type: "TEXT[] NOT NULL" },
        { name: "recommendation", type: "TEXT" },
        { name: "embedding", type: "vector(1536) (pgvector enabled)" },
      ],
      sampleRows: [
        { source: "Fastmarkets MB", sentiment: "Bullish", metal: "Zinc", score: 0.82, headline: "European Smelter Nyrstar Extends Antwerp Zinc Curtailment Amid Power Tariffs" },
        { source: "DGTR Commerce", sentiment: "Bullish", metal: "Zinc", score: 0.78, headline: "India Initiates Anti-Dumping Probe on Coated Steel Imports from Vietnam/Korea" },
        { source: "MNRE Policy", sentiment: "Bullish", metal: "Silver", score: 0.92, headline: "ALMM Solar Cell Mandate Takes Effect: Requiring 100% Indian Wafer/Cell Sourcing" },
        { source: "Bloomberg", sentiment: "Bearish", metal: "Zinc", score: -0.58, headline: "South Korean Smelter Korea Zinc Reaches Full Output Following Debottlenecking" }
      ]
    }
  ];

  const currentTable = tables.find((t) => t.id === activeTable) || tables[0];

  const handleCopySql = () => {
    navigator.clipboard.writeText(`-- MetalSense AI Supabase Schema
-- Run this in your Supabase SQL Editor:
-- Available at: /supabase/schema.sql in repository`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Database className="w-4 h-4 text-sky-600" />
              <span>Supabase PostgreSQL Schema & pgvector Knowledge Store</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Production schema covering market price tickers, customs EXIM imports, internal HZL sales ledgers, and vector-embedded market intelligence.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>pgvector 1536 Enabled</span>
            </span>
            <button
              onClick={handleCopySql}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-300 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-sky-600" />}
              <span>{copied ? "Copied SQL Path" : "Copy Schema Reference"}</span>
            </button>
          </div>
        </div>

        {/* Table Selector Tabs */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-200 overflow-x-auto">
          {tables.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTable(t.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition ${
                activeTable === t.id
                  ? "bg-sky-600 text-white font-semibold shadow-sm"
                  : "bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>{t.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Table Specifications & Schema Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* DDL Column Schema */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
              Schema Definition ({currentTable.id})
            </h4>
            <span className="text-[10px] text-sky-700 font-mono font-semibold">PostgreSQL 16</span>
          </div>

          <p className="text-xs text-slate-500">{currentTable.description}</p>

          <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
            {currentTable.columns.map((col, idx) => (
              <div
                key={idx}
                className="p-2 rounded bg-slate-50 border border-slate-200 flex items-start justify-between text-xs"
              >
                <span className="font-mono font-bold text-sky-700">{col.name}</span>
                <span className="font-mono text-slate-500 text-[11px] text-right max-w-[240px] truncate">
                  {col.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Seed Data Preview */}
        <div className="lg:col-span-7 p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
              Realistic Indian Market Seed Data Preview
            </h4>
            <span className="text-[10px] text-emerald-700 font-mono font-semibold">Live In-Memory & DB Seeded</span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-mono text-[10px] border-b border-slate-200">
                <tr>
                  {Object.keys(currentTable.sampleRows[0] || {}).map((header, i) => (
                    <th key={i} className="px-3 py-2 capitalize">
                      {header.replace(/_/g, " ")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono text-[11px]">
                {currentTable.sampleRows.map((row: any, i: number) => (
                  <tr key={i} className="hover:bg-slate-50">
                    {Object.values(row).map((val: any, j: number) => (
                      <td key={j} className="px-3 py-2 text-slate-700 font-medium">
                        {String(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-600 space-y-1">
            <div className="font-semibold text-slate-800">Supabase Deployment Instructions:</div>
            <div>
              1. Open Supabase Dashboard → SQL Editor.
            </div>
            <div>
              2. Paste full script from <code className="text-sky-700 font-semibold">supabase/schema.sql</code>.
            </div>
            <div>
              3. Connect backend by configuring <code className="text-sky-700 font-semibold">SUPABASE_URL</code> and <code className="text-sky-700 font-semibold">SUPABASE_KEY</code> in <code className="text-slate-700 font-semibold">backend/.env</code>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
