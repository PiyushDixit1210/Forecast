export type MetalType = "Zinc" | "Lead" | "Silver" | "Cadmium";
export type RegionType = "North" | "West" | "South" | "East";

export interface TimelineDataPoint {
  month: string;
  period_type: "Historical" | "AI Forecast";
  demand_mt: number;
  month_offset?: number;
  lower_ci_95?: number | null;
  upper_ci_95?: number | null;
  lower_ci_80?: number | null;
  upper_ci_80?: number | null;
  confidence_pct?: number;
}

export interface MacroDriver {
  id: string;
  sector: string;
  metric_name: string;
  current_value: number;
  unit: string;
  mom_change_pct: number;
  yoy_change_pct: number;
  impact_on_zinc: string;
  impact_on_lead: string;
  impact_on_silver: string;
  impact_on_cadmium: string;
  commentary: string;
}

export interface CausalChainStep {
  step: string;
  detail: string;
}

export interface GeopoliticalScenario {
  id: string;
  name: string;
  category: string;
  period: string;
  headline: string;
  summary: string;
  affected_metals: string[];
  shocks: {
    freight_rate_usd_delta?: number;
    import_landed_cost_delta_inr?: number;
    hzl_parity_cushion_delta_inr?: number;
    spot_premium_usd_delta?: number;
    demand_growth_delta_pct?: number;
    recommended_ltc_share_pct?: number;
    recommended_spot_share_pct?: number;
    recommended_export_share_pct?: number;
    ebitda_impact_crores?: number;
    lme_silver_usd_oz?: number;
    mcx_silver_inr_kg?: number;
    lme_price_delta_pct?: number;
    export_arbitrage_viable?: boolean;
    custom_smelter_cost_inr_delta?: number;
    captive_mine_self_sufficiency?: string;
    secondary_scrap_discount_pct?: number;
  };
  causal_chain: CausalChainStep[];
  desk_directive: string;
}

export interface DemandSensingResponse {
  metal: string;
  grade: string;
  region: string;
  active_geopolitical_scenario?: GeopoliticalScenario | null;
  baseline_monthly_demand: number;
  current_month_demand: number;
  next_month_forecast: number;
  mom_projected_growth_pct: number;
  six_month_cagr_pct: number;
  historical_series: TimelineDataPoint[];
  forecast_series: TimelineDataPoint[];
  combined_timeline: TimelineDataPoint[];
  active_macro_drivers: MacroDriver[];
}

export interface TopImporter {
  importer: string;
  plant_location: string;
  metal: string;
  grade: string;
  volume_mt: number;
  origin_country: string;
  origin_smelter: string;
  port: string;
  cif_usd: number;
  duty_type: string;
  landed_cost_inr: number;
  hzl_ex_works_inr: number;
  parity_delta_inr: number;
  substitution_feasibility: "Immediate Win" | "High" | "Medium" | "Low";
  strategy: string;
}

export interface TamSamResponse {
  metal: string;
  tam_mt: number;
  sam_mt: number;
  som_mt: number;
  market_breakdown: {
    hzl_sales: { volume_mt: number; share_pct: number; label: string };
    secondary_scrap: { volume_mt: number; share_pct: number; label: string };
    imports: { volume_mt: number; share_pct: number; label: string };
  };
  regional_distribution: Record<string, { share_pct: number; volume_mt: number; major_cluster: string }>;
  top_importers: TopImporter[];
  import_substitution_opportunity_mt: number;
  import_substitution_value_cr: number;
}

export interface ArbitrageMetalData {
  lme: { price: number; unit: string; change_pct: number; status: string };
  shfe: { price: number; unit: string; change_pct: number; ratio?: number | null };
  mcx: { price: number; unit: string; change_pct: number };
  cme: { price: number; unit: string; change_pct: number };
  fx_usd_inr: number;
  physical_premium: { range: string; current: number; mom_change: string };
  shfe_lme_arb: string;
  import_parity_inr_mt: number;
  hzl_ex_works_inr_mt: number;
  parity_cushion_inr: number;
}

export interface MarketIntelligenceItem {
  id: string;
  timestamp: string;
  time_ago: string;
  source: string;
  headline: string;
  summary: string;
  impact_score: number;
  sentiment: "Bullish" | "Bearish" | "Neutral";
  affected_metal: string;
  affected_sectors: string[];
  recommendation: string;
}

export interface OptimizationScenario {
  ltc_share_pct: number;
  spot_share_pct: number;
  ltc_volume_mt: number;
  spot_volume_mt: number;
  realized_ltc_premium_usd: number;
  realized_spot_premium_usd: number;
  blended_premium_usd: number;
  nsr_crores: number;
  nsr_per_mt_inr: number;
}

export interface CustomerTierAllocation {
  tier: string;
  accounts: string[];
  allocation_type: string;
  volume_mt: number;
  pricing_basis: string;
  payment_terms: string;
  strategic_rationale: string;
}

export interface OptimizationResult {
  metal: string;
  grade: string;
  total_available_volume_mt: number;
  smelter_origin: string;
  benchmark_lme_usd: number;
  fx_usd_inr: number;
  optimal_plan: OptimizationScenario;
  baseline_comparison: {
    baseline_80_20_nsr_crores: number;
    optimal_nsr_crores: number;
    incremental_gain_crores: number;
    incremental_gain_pct: number;
  };
  simulation_scenarios: OptimizationScenario[];
  tier_allocation_breakdown: CustomerTierAllocation[];
  export_arbitrage_analysis: {
    export_viable: boolean;
    fob_netback_usd_mt: number;
    domestic_netback_usd_mt: number;
    commentary: string;
  };
}
