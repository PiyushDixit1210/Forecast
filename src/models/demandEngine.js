/**
 * Demand Forecasting & Simulation Engine
 * Computes scenario-adjusted demand, import flows, and confidence intervals.
 */

import { METALS_DATA, MACRO_SCENARIOS } from '../data/mockData.js';

export class DemandEngine {
  constructor(metalKey = 'zinc', scenarioId = 'base') {
    this.metalKey = metalKey;
    this.scenarioId = scenarioId;
  }

  setMetal(metalKey) {
    if (METALS_DATA[metalKey]) {
      this.metalKey = metalKey;
    }
  }

  setScenario(scenarioId) {
    this.scenarioId = scenarioId;
  }

  getScenario() {
    return MACRO_SCENARIOS.find(s => s.id === this.scenarioId) || MACRO_SCENARIOS[0];
  }

  getMetalData() {
    return METALS_DATA[this.metalKey];
  }

  getAdjustedForecast() {
    const metal = this.getMetalData();
    const scenario = this.getScenario();

    return metal.forecast.map(item => {
      const p50 = Math.round(item.p50 * scenario.demandMultiplier);
      const p10 = Math.round(item.p10 * (scenario.demandMultiplier * 0.985));
      const p90 = Math.round(item.p90 * (scenario.demandMultiplier * 1.015));
      const importsExpected = Math.round(item.importsExpected + scenario.importShift);
      const recommendedPremium = Math.max(0, Math.round(item.recommendedPremium + scenario.premiumShift));

      return {
        ...item,
        p50,
        p10,
        p90,
        importsExpected,
        recommendedPremium
      };
    });
  }

  getKpiMetrics() {
    const metal = this.getMetalData();
    const scenario = this.getScenario();
    const forecast = this.getAdjustedForecast();
    const nextMonth = forecast[0];

    const currentDemand = metal.currentDomesticDemandMonthly;
    const projectedDemand = nextMonth.p50;
    const momChangePct = (((projectedDemand - currentDemand) / currentDemand) * 100).toFixed(1);

    const recommendedPremium = nextMonth.recommendedPremium;
    const premiumChange = recommendedPremium - metal.currentDomesticPremium;

    // Sensed SAM & SOM capture
    const totalTam = Math.round(metal.tamMonthly * scenario.demandMultiplier);
    const sam = Math.round(metal.samMonthly * scenario.demandMultiplier);
    const som = Math.round(metal.somMonthly * (scenario.demandMultiplier > 1 ? scenario.demandMultiplier * 1.02 : scenario.demandMultiplier));
    const marketSharePct = ((som / totalTam) * 100).toFixed(1);

    return {
      metalName: metal.name,
      metalSymbol: metal.symbol,
      unit: metal.baseUnit,
      currency: metal.currency,
      domesticCurrency: metal.domesticCurrency,
      currentDemand,
      projectedDemand,
      momChangePct,
      currentPremium: metal.currentDomesticPremium,
      recommendedPremium,
      premiumChange,
      importThreatLevel: scenario.id === 'fta_surge' ? 'CRITICAL' : metal.importThreatLevel,
      arbitrageMargin: metal.arbitrageMargin + (scenario.id === 'fta_surge' ? -15 : 0),
      tam: totalTam,
      sam,
      som,
      marketSharePct,
      confidenceScore: nextMonth.confidence
    };
  }
}
