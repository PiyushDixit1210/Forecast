"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  MetalType,
  RegionType,
  DemandSensingResponse,
  TamSamResponse,
  ArbitrageMetalData,
  MarketIntelligenceItem,
  OptimizationResult
} from "@/types";
import { Navbar } from "@/components/Navbar";
import { TickerBar } from "@/components/TickerBar";
import { ModuleA_DemandSensing } from "@/components/ModuleA_DemandSensing";
import { ModuleB_TamSamEngine } from "@/components/ModuleB_TamSamEngine";
import { ModuleC_ArbitrageTracker } from "@/components/ModuleC_ArbitrageTracker";
import { ModuleD_AuctionOptimizer } from "@/components/ModuleD_AuctionOptimizer";
import { DatabaseSchemaViewer } from "@/components/DatabaseSchemaViewer";
import {
  fetchDemandForecast,
  fetchTamSam,
  fetchArbitrageData,
  fetchMarketIntelligence,
  runCommercialOptimization,
  fetchGeopoliticalScenarios,
  simulateGeopoliticalShock
} from "@/lib/api";
import { GeopoliticalWarRoom } from "@/components/GeopoliticalWarRoom";
import { GeopoliticalScenario } from "@/types";

const GRADES_MAP: Record<MetalType, string[]> = {
  Zinc: [
    "SHG Ingot 99.995%",
    "Continuous Galvanizing Grade (CGG)",
    "Jumbo Ingot (1 MT)",
    "Prime Western (PW)",
    "Zinc Die-Casting Alloy (Zamak 3)"
  ],
  Lead: [
    "Refined Lead 99.99%",
    "Refined Lead 99.97%",
    "Antimonial Lead Alloy (3% Sb)",
    "Lead Sheet / Calcium Alloy"
  ],
  Silver: [
    "Silver 99.99% Bar (30 kg)",
    "Silver 99.99% Grains (Photovoltaic Grade)",
    "Silver 99.9% Industrial Ingot"
  ],
  Cadmium: [
    "Cadmium Metal Sticks 99.99%",
    "Cadmium Balls 99.9%",
    "Cadmium Oxide Grade"
  ]
};

export default function Home() {
  const [selectedMetal, setSelectedMetal] = useState<MetalType>("Zinc");
  const [selectedRegion, setSelectedRegion] = useState<RegionType>("North");
  const [selectedGrade, setSelectedGrade] = useState<string>("SHG Ingot 99.995%");
  const [activeTab, setActiveTab] = useState<string>("moduleA");

  // Loaded Data States
  const [demandData, setDemandData] = useState<DemandSensingResponse | null>(null);
  const [tamSamData, setTamSamData] = useState<TamSamResponse | null>(null);
  const [arbitrageData, setArbitrageData] = useState<{
    timestamp: string;
    metals: Record<string, ArbitrageMetalData>;
    fx_usd_inr: number;
    arbitrage_alerts: any[];
  } | null>(null);
  const [intelligenceFeed, setIntelligenceFeed] = useState<MarketIntelligenceItem[]>([]);
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null);
  const [geopoliticalScenarios, setGeopoliticalScenarios] = useState<GeopoliticalScenario[]>([]);
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Update selected grade when metal changes
  const handleSelectMetal = (metal: MetalType) => {
    setSelectedMetal(metal);
    setSelectedGrade(GRADES_MAP[metal][0]);
  };

  const loadData = useCallback(async (scenarioOverride?: string | null) => {
    try {
      setIsRefreshing(true);
      const effectiveScenario = scenarioOverride !== undefined ? scenarioOverride : activeScenarioId;
      const [demand, tamsam, arb, intel, opt, scenarios] = await Promise.all([
        fetchDemandForecast(selectedMetal, selectedGrade, selectedRegion, effectiveScenario),
        fetchTamSam(selectedMetal),
        fetchArbitrageData(),
        fetchMarketIntelligence(selectedMetal),
        runCommercialOptimization({
          metal: selectedMetal,
          grade: selectedGrade,
          available_volume_mt: selectedMetal === "Zinc" ? 35000 : selectedMetal === "Lead" ? 18000 : selectedMetal === "Silver" ? 65 : 120,
          smelter_origin: selectedRegion === "North" ? "Pantnagar Metal Plant" : "Chanderiya Hydro-Smelter",
          base_lme_price_usd: selectedMetal === "Zinc" ? 2885.50 : selectedMetal === "Lead" ? 2085.00 : selectedMetal === "Silver" ? 33.85 : 7850.00,
          fx_rate_inr_usd: 86.65,
          ltc_target_share_pct: 65.0,
          spot_market_sentiment: "Bullish",
          allow_export_arbitrage: true
        }),
        fetchGeopoliticalScenarios()
      ]);

      setDemandData(demand);
      setTamSamData(tamsam);
      setArbitrageData(arb);
      setIntelligenceFeed(intel.intelligence_feed);
      setOptimizationResult(opt);
      setGeopoliticalScenarios(scenarios);
    } catch (err) {
      console.error("Error loading MetalSense data:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [selectedMetal, selectedGrade, selectedRegion, activeScenarioId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSelectScenario = async (id: string | null) => {
    setActiveScenarioId(id);
    if (!id) {
      // Revert to baseline
      loadData(null);
      return;
    }

    try {
      setIsRefreshing(true);
      const simResult = await simulateGeopoliticalShock({
        scenario_id: id,
        metal: selectedMetal,
        grade: selectedGrade,
        region: selectedRegion
      });

      if (simResult) {
        setDemandData(simResult.demand_forecast);
        setOptimizationResult(simResult.commercial_optimization);
      } else {
        loadData(id);
      }
    } catch (err) {
      console.error(err);
      loadData(id);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleAddCustomIntelligence = (newItem: MarketIntelligenceItem) => {
    setIntelligenceFeed((prev) => [newItem, ...prev]);
  };

  const currentMetalArbitrage = arbitrageData?.metals[selectedMetal];
  const fxUsdInr = arbitrageData?.fx_usd_inr || 86.65;
  const arbitrageAlerts = arbitrageData?.arbitrage_alerts || [];
  const activeScenarioObj = geopoliticalScenarios.find((s) => s.id === activeScenarioId);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Navbar with Brand, Metal Tabs & Module Nav */}
      <Navbar
        selectedMetal={selectedMetal}
        onSelectMetal={handleSelectMetal}
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        onRefreshAll={() => loadData()}
        isRefreshing={isRefreshing}
        activeScenarioName={activeScenarioObj?.name}
      />

      {/* Real-time Ticker Ribbon */}
      <TickerBar
        selectedMetal={selectedMetal}
        metalData={currentMetalArbitrage}
        fxUsdInr={fxUsdInr}
      />

      {/* Geopolitical War Room Scenario Selector (Recent 2-Year Shocks) */}
      <GeopoliticalWarRoom
        scenarios={geopoliticalScenarios}
        activeScenarioId={activeScenarioId}
        onSelectScenario={handleSelectScenario}
        selectedMetal={selectedMetal}
      />

      {/* Main Dashboard Screen Viewport */}
      <main className="flex-1 p-4 lg:p-6 max-w-[1600px] w-full mx-auto">
        {activeTab === "moduleA" && (
          <ModuleA_DemandSensing
            metal={selectedMetal}
            demandData={demandData}
            selectedRegion={selectedRegion}
            onChangeRegion={setSelectedRegion}
            selectedGrade={selectedGrade}
            onChangeGrade={setSelectedGrade}
            gradesList={GRADES_MAP[selectedMetal]}
          />
        )}

        {activeTab === "moduleB" && (
          <ModuleB_TamSamEngine
            metal={selectedMetal}
            tamSamData={tamSamData}
          />
        )}

        {activeTab === "moduleC" && (
          <ModuleC_ArbitrageTracker
            metal={selectedMetal}
            metalData={currentMetalArbitrage}
            intelligenceFeed={intelligenceFeed}
            onAddIntelligence={handleAddCustomIntelligence}
            arbitrageAlerts={arbitrageAlerts}
          />
        )}

        {activeTab === "moduleD" && (
          <ModuleD_AuctionOptimizer
            metal={selectedMetal}
            selectedGrade={selectedGrade}
            optimizationResult={optimizationResult}
            onUpdateOptimization={setOptimizationResult}
          />
        )}

        {activeTab === "schema" && (
          <DatabaseSchemaViewer />
        )}
      </main>

      {/* Enterprise Commodity Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white px-4 py-3 text-xs text-slate-500">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">MetalSense AI Commercial Platform</span>
            <span>•</span>
            <span>Tailored for Hindustan Zinc Limited (HZL - Vedanta Group)</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500 font-mono text-[11px]">
            <span>Smelters: Chanderiya | Dariba | Debari | Pantnagar</span>
            <span className="text-emerald-600 font-semibold">● All 4 Metals Synced</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
