import {
  DemandSensingResponse,
  TamSamResponse,
  ArbitrageMetalData,
  MarketIntelligenceItem,
  OptimizationResult,
  GeopoliticalScenario,
  MetalType
} from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function fetchDemandForecast(
  metal: MetalType,
  grade?: string,
  region: string = "North",
  scenarioId?: string | null
): Promise<DemandSensingResponse> {
  try {
    const params = new URLSearchParams({ metal, region });
    if (grade) params.append("grade", grade);
    if (scenarioId) params.append("scenario_id", scenarioId);
    const res = await fetch(`${API_BASE}/api/demand-forecast?${params.toString()}`);
    if (!res.ok) throw new Error("Backend response error");
    return await res.json();
  } catch (err) {
    console.warn("Falling back to client-side demand computation", err);
    // Dynamic fallback
    return getFallbackDemand(metal, grade, region);
  }
}

export async function fetchGeopoliticalScenarios(): Promise<GeopoliticalScenario[]> {
  try {
    const res = await fetch(`${API_BASE}/api/geopolitical-scenarios`);
    if (!res.ok) throw new Error("Backend response error");
    const data = await res.json();
    return data.scenarios;
  } catch (err) {
    console.warn("Falling back to client-side scenarios", err);
    return getFallbackScenarios();
  }
}

export async function simulateGeopoliticalShock(payload: {
  scenario_id: string;
  metal: string;
  grade?: string;
  region: string;
}) {
  try {
    const res = await fetch(`${API_BASE}/api/simulate-geopolitical-shock`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error("Simulation failed");
    return await res.json();
  } catch (err) {
    console.warn("Falling back to simulation defaults", err);
    return null;
  }
}

export async function fetchTamSam(metal: MetalType): Promise<TamSamResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/tam-sam?metal=${metal}`);
    if (!res.ok) throw new Error("Backend response error");
    return await res.json();
  } catch (err) {
    console.warn("Falling back to client-side TAM/SAM", err);
    return getFallbackTamSam(metal);
  }
}

export async function fetchArbitrageData(): Promise<{
  timestamp: string;
  metals: Record<string, ArbitrageMetalData>;
  fx_usd_inr: number;
  arbitrage_alerts: any[];
}> {
  try {
    const res = await fetch(`${API_BASE}/api/arbitrage-tracker`);
    if (!res.ok) throw new Error("Backend response error");
    return await res.json();
  } catch (err) {
    console.warn("Falling back to client-side Arbitrage data", err);
    return getFallbackArbitrage();
  }
}

export async function fetchMarketIntelligence(metal?: MetalType): Promise<{
  total_reports: number;
  intelligence_feed: MarketIntelligenceItem[];
}> {
  try {
    const url = metal ? `${API_BASE}/api/market-intelligence?metal=${metal}` : `${API_BASE}/api/market-intelligence`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Backend response error");
    return await res.json();
  } catch (err) {
    console.warn("Falling back to client-side Market Intel", err);
    return getFallbackIntel(metal);
  }
}

export async function runCommercialOptimization(payload: any): Promise<OptimizationResult> {
  try {
    const res = await fetch(`${API_BASE}/api/optimize-allocation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Backend optimization failed");
    return await res.json();
  } catch (err) {
    console.warn("Falling back to client-side optimization solver", err);
    return getFallbackOptimization(payload);
  }
}

export async function synthesizeIntelligenceWithGemini(payload: { headline: string; body?: string; affected_metal: string }) {
  const res = await fetch(`${API_BASE}/api/generate-intelligence`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Intelligence synthesis failed");
  return await res.json();
}

// -----------------------------------------------------------------------------
// CLIENT-SIDE DETERMINISTIC FALLBACKS (Zero UI failure guarantee)
// -----------------------------------------------------------------------------

function getFallbackDemand(metal: MetalType, grade?: string, region: string = "North"): DemandSensingResponse {
  const base = metal === "Zinc" ? 14500 : metal === "Lead" ? 6200 : metal === "Silver" ? 32 : 25;
  const history = ["Nov 25", "Dec 25", "Jan 26", "Feb 26", "Mar 26", "Apr 26", "May 26", "Jun 26", "Jul 26", "Aug 26", "Sep 26", "Oct 26"].map((m, i) => ({
    month: m,
    period_type: "Historical" as const,
    demand_mt: Math.round(base * (1 + i * 0.008) * (1 + 0.04 * Math.sin(i * 0.6))),
  }));
  const last = history[history.length - 1].demand_mt;
  const forecast = ["Nov 26", "Dec 26", "Jan 27", "Feb 27", "Mar 27", "Apr 27"].map((m, idx) => {
    const offset = idx + 1;
    const pred = Math.round(last * (1 + offset * 0.03));
    const std = pred * (0.04 * Math.sqrt(offset));
    return {
      month: m,
      period_type: "AI Forecast" as const,
      month_offset: offset,
      demand_mt: pred,
      lower_ci_95: Math.round(pred - 1.96 * std),
      upper_ci_95: Math.round(pred + 1.96 * std),
      lower_ci_80: Math.round(pred - 1.28 * std),
      upper_ci_80: Math.round(pred + 1.28 * std),
      confidence_pct: Math.round(95.0 - offset * 2.1),
    };
  });

  return {
    metal,
    grade: grade || "SHG Ingot 99.995%",
    region,
    baseline_monthly_demand: base,
    current_month_demand: last,
    next_month_forecast: forecast[0].demand_mt,
    mom_projected_growth_pct: 4.8,
    six_month_cagr_pct: 8.4,
    historical_series: history,
    forecast_series: forecast,
    combined_timeline: [...history, ...forecast],
    active_macro_drivers: [
      {
        id: "md-1",
        sector: "Galvanized Steel",
        metric_name: "Indian Finished Steel Production (Galvanized)",
        current_value: 1320.0,
        unit: "kMT / Month",
        mom_change_pct: 5.4,
        yoy_change_pct: 11.2,
        impact_on_zinc: "High Positive",
        impact_on_lead: "Neutral",
        impact_on_silver: "Neutral",
        impact_on_cadmium: "Neutral",
        commentary: "Infrastructure Gati Shakti guardrail and transmission towers boosting coating volumes."
      }
    ]
  };
}

function getFallbackTamSam(metal: MetalType): TamSamResponse {
  return {
    metal,
    tam_mt: metal === "Zinc" ? 725000 : metal === "Lead" ? 1150000 : 4800,
    sam_mt: metal === "Zinc" ? 623500 : metal === "Lead" ? 598000 : 3550,
    som_mt: metal === "Zinc" ? 562000 : metal === "Lead" ? 307500 : 2310,
    market_breakdown: {
      hzl_sales: { volume_mt: 515000, share_pct: 71.0, label: "HZL Primary Domestic Sales" },
      secondary_scrap: { volume_mt: 105000, share_pct: 14.5, label: "Domestic Recycled Scrap / Secondary" },
      imports: { volume_mt: 105000, share_pct: 14.5, label: "EXIM Imports (Bill of Lading)" }
    },
    regional_distribution: {
      North: { share_pct: 28, volume_mt: 203000, major_cluster: "NCR / Punjab / Haryana" },
      West: { share_pct: 38, volume_mt: 275500, major_cluster: "Gujarat & Maharashtra" },
      South: { share_pct: 22, volume_mt: 159500, major_cluster: "Karnataka & Tamil Nadu" },
      East: { share_pct: 12, volume_mt: 87000, major_cluster: "Odisha & Bengal Primary Steel" }
    },
    top_importers: [
      {
        importer: "Tata Steel Limited",
        plant_location: "Jamshedpur & Kalinganagar",
        metal: "Zinc",
        grade: "SHG Ingot 99.995%",
        volume_mt: 4200.0,
        origin_country: "South Korea",
        origin_smelter: "Korea Zinc (Onsan)",
        port: "JNPT Nhava Sheva",
        cif_usd: 2980.0,
        duty_type: "Korea CEPA (0%)",
        landed_cost_inr: 272500.0,
        hzl_ex_works_inr: 276700.0,
        parity_delta_inr: 4200.0,
        substitution_feasibility: "High",
        strategy: "Match CEPA landed parity with ₹3,500/MT freight rebate on annual tie-up."
      }
    ],
    import_substitution_opportunity_mt: 68250,
    import_substitution_value_cr: 1876.8
  };
}

function getFallbackArbitrage() {
  return {
    timestamp: new Date().toISOString(),
    metals: {
      Zinc: {
        lme: { price: 2885.50, unit: "$/MT", change_pct: 1.42, status: "Contango ($4.50)" },
        shfe: { price: 24350.00, unit: "RMB/MT", change_pct: 0.85, ratio: 8.44 },
        mcx: { price: 278.40, unit: "₹/kg", change_pct: 1.15 },
        cme: { price: 2892.00, unit: "$/MT", change_pct: 1.38 },
        fx_usd_inr: 86.65,
        physical_premium: { range: "$125 - $145/MT", current: 135.0, mom_change: "+$8/MT" },
        shfe_lme_arb: "Export Window Closed (Domestic China Inflow Neutral)",
        import_parity_inr_mt: 276800.0,
        hzl_ex_works_inr_mt: 274500.0,
        parity_cushion_inr: 2300.0
      }
    } as any,
    fx_usd_inr: 86.65,
    arbitrage_alerts: []
  };
}

function getFallbackIntel(metal?: string) {
  return {
    total_reports: 1,
    intelligence_feed: [
      {
        id: "mi-1",
        timestamp: new Date().toISOString(),
        time_ago: "2 hours ago",
        source: "Fastmarkets MB",
        headline: "European Smelter Nyrstar Extends Antwerp Zinc Curtailment Amid High Winter Power Tariffs",
        summary: "Balen facility maintains 50% cap through Q1 2027. Spot Rotterdam premiums jumped to $190/MT.",
        impact_score: 0.82,
        sentiment: "Bullish",
        affected_metal: "Zinc",
        affected_sectors: ["Galvanized Steel"],
        recommendation: "Raise spot auction floor premium by $8-10/MT."
      }
    ] as any
  };
}

function getFallbackOptimization(payload: any): OptimizationResult {
  const vol = payload.available_volume_mt || 35000;
  return {
    metal: payload.metal || "Zinc",
    grade: payload.grade || "SHG Ingot 99.995%",
    total_available_volume_mt: vol,
    smelter_origin: payload.smelter_origin || "Chanderiya Hydro-Smelter",
    benchmark_lme_usd: 2885.5,
    fx_usd_inr: 86.65,
    optimal_plan: {
      ltc_share_pct: 65,
      spot_share_pct: 35,
      ltc_volume_mt: vol * 0.65,
      spot_volume_mt: vol * 0.35,
      realized_ltc_premium_usd: 135.0,
      realized_spot_premium_usd: 154.2,
      blended_premium_usd: 141.72,
      nsr_crores: 928.45,
      nsr_per_mt_inr: 265271.4
    },
    baseline_comparison: {
      baseline_80_20_nsr_crores: 914.80,
      optimal_nsr_crores: 928.45,
      incremental_gain_crores: 13.65,
      incremental_gain_pct: 1.49
    },
    simulation_scenarios: [],
    tier_allocation_breakdown: [],
    export_arbitrage_analysis: {
      export_viable: false,
      fob_netback_usd_mt: 2970.5,
      domestic_netback_usd_mt: 2983.8,
      commentary: "Domestic NSR exceeds export netback by $13.3/MT."
    }
  };
}


function getFallbackScenarios(): GeopoliticalScenario[] {
  return [
    {
      id: "scenario-red-sea",
      name: "Red Sea Crisis & Houthi Maritime Blockade",
      category: "War & Maritime Disruption",
      period: "2024 - 2026",
      headline: "Houthi Attacks Force Cape Rerouting: Ocean Freight Jumps 240%, Delaying Seaborne Metal Imports into Indian Ports",
      summary: "Attacks on commercial vessels transiting the Bab el-Mandeb strait forced major shipping lines to reroute around Africa (+14 to 21 transit days). Container freight from Asia/Europe to Indian West Coast ports jumped from $45/MT to $125/MT.",
      affected_metals: ["Zinc", "Lead"],
      shocks: {
        freight_rate_usd_delta: 80.0,
        import_landed_cost_delta_inr: 6800.0,
        hzl_parity_cushion_delta_inr: 4800.0,
        spot_premium_usd_delta: 24.0,
        demand_growth_delta_pct: 3.8,
        recommended_ltc_share_pct: 55,
        recommended_spot_share_pct: 45,
        ebitda_impact_crores: 36.8
      },
      causal_chain: [
        { step: "1. Geopolitical Trigger", detail: "Houthi missile attacks on Red Sea shipping routes in Bab el-Mandeb." },
        { step: "2. Maritime Shock", detail: "Vessel bypass around Cape of Good Hope adds 18 days & $80/MT freight surcharge." },
        { step: "3. Indian Port Impact", detail: "Seaborne imports of Korean & Kazakh zinc/lead delayed by 3 weeks at JNPT/Mundra." },
        { step: "4. Landed Parity Expansion", detail: "Seaborne landed cost surges by ₹6,800/MT, granting HZL massive domestic pricing power." },
        { step: "5. HZL Tactical Action", detail: "Lift spot auction reserve premiums by $24/MT; divert 10% volume to prompt B2B auctions." }
      ],
      desk_directive: "Seaborne import parity has deteriorated for foreign competitors. Increase domestic spot auction volume allocation to 45% and raise reserve premium floor by $22-$25/MT."
    }
  ];
}
