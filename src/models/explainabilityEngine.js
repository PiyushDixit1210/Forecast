/**
 * Explainable AI (XAI) Driver Engine
 * Decomposes model predictions into interpretable driver contributions (SHAP-style attribution)
 * for commercial marketing managers and leadership review.
 */

import { METALS_DATA } from '../data/mockData.js';

export class ExplainabilityEngine {
  constructor(metalKey = 'zinc') {
    this.metalKey = metalKey;
  }

  setMetal(metalKey) {
    if (METALS_DATA[metalKey]) {
      this.metalKey = metalKey;
    }
  }

  getWaterfallData() {
    const metal = METALS_DATA[this.metalKey];
    const basePremium = metal.currentDomesticPremium;
    const isSilver = this.metalKey === 'silver';
    const unit = isSilver ? 'INR/kg' : 'USD/MT';

    let runningTotal = basePremium;
    const waterfallSteps = [
      {
        name: "Baseline Reference Premium",
        delta: basePremium,
        runningTotal: basePremium,
        type: "base",
        category: "Baseline",
        description: `Starting domestic benchmark premium for ${metal.name} before monthly signal updates.`
      }
    ];

    metal.shapDrivers.forEach(driver => {
      runningTotal += driver.impact;
      waterfallSteps.push({
        name: driver.name,
        delta: driver.impact,
        runningTotal: Math.round(runningTotal * 10) / 10,
        type: driver.type,
        category: driver.category,
        description: `Attributed influence from ${driver.category.toLowerCase()} signal monitoring.`
      });
    });

    waterfallSteps.push({
      name: "Final Recommended Premium",
      delta: 0,
      runningTotal: Math.round(runningTotal * 10) / 10,
      type: "total",
      category: "Recommendation",
      description: `Optimized benchmark premium recommendation for commercial approval.`
    });

    return {
      metalName: metal.name,
      basePremium,
      recommendedPremium: Math.round(runningTotal),
      unit,
      waterfallSteps,
      positiveSum: metal.shapDrivers.filter(d => d.impact > 0).reduce((acc, d) => acc + d.impact, 0),
      negativeSum: metal.shapDrivers.filter(d => d.impact < 0).reduce((acc, d) => acc + d.impact, 0)
    };
  }
}
