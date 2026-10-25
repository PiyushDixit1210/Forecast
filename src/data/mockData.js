/**
 * Comprehensive Market Data for Zinc, Lead & Silver Domestic Market (India)
 * Grounded in HZL commercial reality, JPC steel, SIAM auto, MNRE solar, and port manifests.
 */

export const METALS_DATA = {
  zinc: {
    name: "Zinc",
    symbol: "Zn",
    tagline: "Primary Galvanizing & Infrastructure Foundation",
    baseUnit: "Metric Tonnes (MT)",
    currency: "USD / MT",
    domesticCurrency: "INR / MT",
    currentLMEPrice: 2840, // USD/MT
    currentDomesticPremium: 145, // USD/MT over LME
    domesticExchangePriceINR: 258500, // INR/MT (MCX Basis)
    currentDomesticDemandMonthly: 96500, // MT/month
    importVolumeMonthly: 21400, // MT/month
    tamMonthly: 96500, // Total domestic consumption
    samMonthly: 78500, // Addressable primary demand
    somMonthly: 61200, // HZL Current monthly capture
    importThreatLevel: "HIGH",
    arbitrageMargin: -18, // USD/MT (Import landed is $18 cheaper at Nhava Sheva)
    grades: [
      { id: "shg", name: "Special High Grade (SHG 99.995%)", share: 48, defaultPremium: 155, primaryApp: "High-spec continuous galvanizing, brass & die casting" },
      { id: "cgg", name: "Continuous Galvanizing Grade (CGG Jumbo)", share: 34, defaultPremium: 135, primaryApp: "Automotive & structural steel sheet galvanizing" },
      { id: "pw", name: "Prime Western (PW 98.5%)", share: 11, defaultPremium: 110, primaryApp: "General jobbing galvanizing, wire drawing" },
      { id: "za", name: "Zinc Die-Cast Alloys (ZA-12 / ZA-27)", share: 7, defaultPremium: 210, primaryApp: "Precision automotive & electrical components" }
    ],
    sectors: [
      { name: "Steel Galvanizing (Auto & Structural)", share: 68, trend: "+7.4% YoY", keyClients: ["Tata Steel", "JSW Steel", "AM/NS India", "Jindal Stainless"] },
      { name: "Die-Casting Components", share: 14, trend: "+4.8% YoY", keyClients: ["Minda Corp", "Sundram Fasteners", "Rockman"] },
      { name: "Brass & Extrusions", share: 11, trend: "+3.2% YoY", keyClients: ["Orient Brass", "Rajesh Extrusions"] },
      { name: "Chemicals & Zinc Oxide", share: 7, trend: "+5.1% YoY", keyClients: ["Rubamin", "Transpek-Silox"] }
    ],
    ports: [
      { name: "Nhava Sheva (JNPT)", importsMT: 9200, landedCostUSD: 2967, hzlDeliveredUSD: 2985, arbitrageUSD: -18, origin: "South Korea (FTA 0% Duty)", risk: "CRITICAL" },
      { name: "Mundra Port", importsMT: 6800, landedCostUSD: 2975, hzlDeliveredUSD: 2980, arbitrageUSD: -5, origin: "Japan (CEPA 0% Duty)", risk: "ELEVATED" },
      { name: "Chennai Port", importsMT: 3400, landedCostUSD: 2990, hzlDeliveredUSD: 2985, arbitrageUSD: +5, origin: "SE Asia / Vietnam", risk: "MODERATE" },
      { name: "Vizag Port", importsMT: 2000, landedCostUSD: 3005, hzlDeliveredUSD: 2985, arbitrageUSD: +20, origin: "China (5% Basic Duty)", risk: "LOW" }
    ],
    history: [
      { month: "Nov 2025", demand: 91200, imports: 18500, premium: 138, lme: 2780, steelOutput: 11.2 },
      { month: "Dec 2025", demand: 93400, imports: 19200, premium: 140, lme: 2810, steelOutput: 11.4 },
      { month: "Jan 2026", demand: 94800, imports: 20100, premium: 142, lme: 2825, steelOutput: 11.6 },
      { month: "Feb 2026", demand: 95500, imports: 20800, premium: 144, lme: 2830, steelOutput: 11.7 },
      { month: "Mar 2026", demand: 96500, imports: 21400, premium: 145, lme: 2840, steelOutput: 11.9 }
    ],
    forecast: [
      { month: "Apr 2026", p50: 98200, p10: 95100, p90: 101300, importsExpected: 22100, recommendedPremium: 152, confidence: 91 },
      { month: "May 2026", p50: 99800, p10: 96200, p90: 103400, importsExpected: 22800, recommendedPremium: 156, confidence: 89 },
      { month: "Jun 2026", p50: 97400, p10: 93500, p90: 101000, importsExpected: 20500, recommendedPremium: 148, confidence: 87 }, // Monsoon dip
      { month: "Jul 2026", p50: 96200, p10: 92100, p90: 100200, importsExpected: 19800, recommendedPremium: 144, confidence: 86 },
      { month: "Aug 2026", p50: 98600, p10: 94500, p90: 102800, importsExpected: 21000, recommendedPremium: 150, confidence: 88 },
      { month: "Sep 2026", p50: 102100, p10: 98000, p90: 106200, importsExpected: 23200, recommendedPremium: 160, confidence: 90 }, // Post-monsoon infra push
      { month: "Oct 2026", p50: 104500, p10: 100200, p90: 108900, importsExpected: 24100, recommendedPremium: 165, confidence: 92 },
      { month: "Nov 2026", p50: 106000, p10: 101500, p90: 110500, importsExpected: 24500, recommendedPremium: 168, confidence: 91 },
      { month: "Dec 2026", p50: 107200, p10: 102400, p90: 112000, importsExpected: 25000, recommendedPremium: 170, confidence: 89 },
      { month: "Jan 2027", p50: 108500, p10: 103500, p90: 113500, importsExpected: 25500, recommendedPremium: 172, confidence: 88 },
      { month: "Feb 2027", p50: 109200, p10: 104100, p90: 114300, importsExpected: 25800, recommendedPremium: 173, confidence: 87 },
      { month: "Mar 2027", p50: 111500, p10: 106000, p90: 117000, importsExpected: 26500, recommendedPremium: 178, confidence: 89 }
    ],
    shapDrivers: [
      { name: "Domestic Steel Galvanizing Run-Rate (JPC)", impact: +14.2, type: "positive", category: "Downstream" },
      { name: "National Highway & Railway Capex (NIP)", impact: +8.5, type: "positive", category: "Macro/Policy" },
      { name: "China Smelter Power Curtailment & TC/RCs", impact: +6.3, type: "positive", category: "Global Supply" },
      { name: "Container Freight Rate Spike (SCFI)", impact: +4.8, type: "positive", category: "Arbitrage Barrier" },
      { name: "Korean FTA Zero-Duty Inflow Threat", impact: -11.6, type: "negative", category: "Import Pressure" },
      { name: "Secondary Zinc Scrap Spread Softening", impact: -4.2, type: "negative", category: "Domestic Competition" },
      { name: "Auto Die-Casting Inventory Build", impact: -3.0, type: "negative", category: "Downstream" }
    ]
  },

  lead: {
    name: "Lead",
    symbol: "Pb",
    tagline: "Automotive Storage, Renewable ESS & Industrial Backup",
    baseUnit: "Metric Tonnes (MT)",
    currency: "USD / MT",
    domesticCurrency: "INR / MT",
    currentLMEPrice: 2110,
    currentDomesticPremium: 110,
    domesticExchangePriceINR: 192000,
    currentDomesticDemandMonthly: 102000,
    importVolumeMonthly: 16500,
    tamMonthly: 102000,
    samMonthly: 42000, // High secondary recycled market presence (~60%)
    somMonthly: 31500, // HZL share of primary
    importThreatLevel: "MODERATE",
    arbitrageMargin: +12, // HZL is slightly competitive vs imports
    grades: [
      { id: "ref9999", name: "Refined Pure Lead (99.99%)", share: 54, defaultPremium: 120, primaryApp: "High-performance automotive SLI & tubular inverter batteries" },
      { id: "ref9997", name: "Refined Lead (99.97%)", share: 22, defaultPremium: 100, primaryApp: "Standard industrial batteries & radiation shielding" },
      { id: "antimonial", name: "Lead Antimonial Alloys", share: 16, defaultPremium: 140, primaryApp: "Deep-cycle battery grids & motive power" },
      { id: "calcium", name: "Lead Calcium Alloys", share: 8, defaultPremium: 160, primaryApp: "Maintenance-free sealed VRLA batteries" }
    ],
    sectors: [
      { name: "Automotive Batteries (OEM & Aftermarket)", share: 58, trend: "+6.1% YoY", keyClients: ["Exide Industries", "Amara Raja (Amaron)", "Tata AutoComp"] },
      { name: "Telecom, UPS & Solar Inverters", share: 24, trend: "+8.9% YoY", keyClients: ["Luminous", "Microtek", "Indus Towers"] },
      { name: "E-Rickshaws & Micro-Mobility", share: 12, trend: "+11.4% YoY", keyClients: ["Okaya Power", "Eastman Auto"] },
      { name: "Radiation Shielding & Pigments", share: 6, trend: "+2.5% YoY", keyClients: ["Gravita India", "Associated Pigments"] }
    ],
    ports: [
      { name: "Nhava Sheva (JNPT)", importsMT: 6200, landedCostUSD: 2235, hzlDeliveredUSD: 2220, arbitrageUSD: +15, origin: "Malaysia / Vietnam", risk: "MODERATE" },
      { name: "Mundra Port", importsMT: 5100, landedCostUSD: 2240, hzlDeliveredUSD: 2220, arbitrageUSD: +20, origin: "Australia / Korea", risk: "LOW" },
      { name: "Kolkata Port", importsMT: 3100, landedCostUSD: 2215, hzlDeliveredUSD: 2220, arbitrageUSD: -5, origin: "Bangladesh / Middle East", risk: "ELEVATED" },
      { name: "Chennai Port", importsMT: 2100, landedCostUSD: 2230, hzlDeliveredUSD: 2220, arbitrageUSD: +10, origin: "Singapore Bullion", risk: "MODERATE" }
    ],
    history: [
      { month: "Nov 2025", demand: 98500, imports: 15200, premium: 102, lme: 2060, autoSales: 3.4 },
      { month: "Dec 2025", demand: 99800, imports: 15600, premium: 105, lme: 2080, autoSales: 3.6 },
      { month: "Jan 2026", demand: 100500, imports: 16000, premium: 107, lme: 2095, autoSales: 3.7 },
      { month: "Feb 2026", demand: 101200, imports: 16200, premium: 108, lme: 2100, autoSales: 3.8 },
      { month: "Mar 2026", demand: 102000, imports: 16500, premium: 110, lme: 2110, autoSales: 3.9 }
    ],
    forecast: [
      { month: "Apr 2026", p50: 103800, p10: 100800, p90: 106800, importsExpected: 16900, recommendedPremium: 114, confidence: 90 },
      { month: "May 2026", p50: 105500, p10: 102100, p90: 108900, importsExpected: 17400, recommendedPremium: 118, confidence: 89 },
      { month: "Jun 2026", p50: 106800, p10: 103200, p90: 110400, importsExpected: 17800, recommendedPremium: 120, confidence: 88 },
      { month: "Jul 2026", p50: 104500, p10: 101000, p90: 108000, importsExpected: 17000, recommendedPremium: 116, confidence: 86 },
      { month: "Aug 2026", p50: 105900, p10: 102300, p90: 109500, importsExpected: 17300, recommendedPremium: 118, confidence: 88 },
      { month: "Sep 2026", p50: 108400, p10: 104600, p90: 112200, importsExpected: 18100, recommendedPremium: 124, confidence: 91 },
      { month: "Oct 2026", p50: 110200, p10: 106200, p90: 114200, importsExpected: 18600, recommendedPremium: 128, confidence: 92 },
      { month: "Nov 2026", p50: 111500, p10: 107300, p90: 115700, importsExpected: 19000, recommendedPremium: 130, confidence: 90 },
      { month: "Dec 2026", p50: 112800, p10: 108500, p90: 117100, importsExpected: 19400, recommendedPremium: 132, confidence: 89 },
      { month: "Jan 2027", p50: 114100, p10: 109600, p90: 118600, importsExpected: 19800, recommendedPremium: 135, confidence: 88 },
      { month: "Feb 2027", p50: 115000, p10: 110400, p90: 119600, importsExpected: 20100, recommendedPremium: 136, confidence: 87 },
      { month: "Mar 2027", p50: 117200, p10: 112400, p90: 122000, importsExpected: 20800, recommendedPremium: 140, confidence: 89 }
    ],
    shapDrivers: [
      { name: "Automobile OEM Build Rate & Fleet Expansion", impact: +9.8, type: "positive", category: "Downstream" },
      { name: "Summer Inverter & Telecom Backup Spike", impact: +7.2, type: "positive", category: "Seasonal/Macro" },
      { name: "E-Rickshaw Fast Charge Battery Conversion", impact: +5.1, type: "positive", category: "Downstream" },
      { name: "Secondary Battery Recycling Scrap Availability", impact: -12.4, type: "negative", category: "Domestic Competition" },
      { name: "Chinese Remelted Lead Bullion Inflows", impact: -4.5, type: "negative", category: "Import Pressure" },
      { name: "LME Lead Stock Buildup in Asian Warehouses", impact: -3.2, type: "negative", category: "Exchange/Global" }
    ]
  },

  silver: {
    name: "Silver",
    symbol: "Ag",
    tagline: "High-Value Industrial Metal, Solar PV Driver & Store of Value",
    baseUnit: "Kilograms (kg)",
    currency: "USD / Troy Oz",
    domesticCurrency: "INR / kg",
    currentLMEPrice: 32.50, // USD/oz
    currentDomesticPremium: 1850, // INR/kg over MCX/LME converted parity
    domesticExchangePriceINR: 98500, // INR/kg (MCX)
    currentDomesticDemandMonthly: 610000, // kg/month (~7,300 MT/year)
    importVolumeMonthly: 420000, // kg/month (~70% imported historically via CEPA/London)
    tamMonthly: 610000,
    samMonthly: 280000, // Industrial + High-purity institutional
    somMonthly: 72000, // HZL Current monthly production (~800 MTPA capacity)
    importThreatLevel: "CRITICAL",
    arbitrageMargin: -1200, // INR/kg (CEPA UAE quota imports entering with tariff advantage)
    grades: [
      { id: "ingot30k", name: "Silver Ingots (30kg 99.99%)", share: 52, defaultPremium: 1600, primaryApp: "Institutional bullion, large industrial converters, banking" },
      { id: "granules", name: "Silver Granules / Grains (99.99%)", share: 32, defaultPremium: 2200, primaryApp: "Solar PV metallization paste, electrical contacts & brazing" },
      { id: "bars1k", name: "Silver Bars (1kg 99.99%)", share: 12, defaultPremium: 2600, primaryApp: "Retail investment & high-end jewelry manufacturing" },
      { id: "powder", name: "Sub-micron Silver Powder", share: 4, defaultPremium: 4500, primaryApp: "High-efficiency TopCon & HJT solar cell pastes" }
    ],
    sectors: [
      { name: "Solar PV Metallization Paste", share: 38, trend: "+28.4% YoY", keyClients: ["Adani Solar", "Tata Power Solar", "Waaree Energies", "Vikram Solar"] },
      { name: "Jewelry & Silverware", share: 34, trend: "+4.2% YoY", keyClients: ["Tanishq / Titan", "Malabar Gold", "Kalyan Jewellers"] },
      { name: "Electrical Contacts & Electronics", share: 18, trend: "+9.1% YoY", keyClients: ["Schneider Electric", "Havells", "Siemens India"] },
      { name: "Investment Bars & Medallions", share: 10, trend: "+12.0% YoY", keyClients: ["MMTC-PAMP", "Augmont", "HDFC Bank"] }
    ],
    ports: [
      { name: "Ahmedabad / GIFT City Air Cargo", importsMT: 190000, landedCostUSD: 97800, hzlDeliveredUSD: 99000, arbitrageUSD: -1200, origin: "UAE (CEPA 1% Concession)", risk: "CRITICAL" },
      { name: "Mumbai Air Cargo (BOM)", importsMT: 140000, landedCostUSD: 98100, hzlDeliveredUSD: 99000, arbitrageUSD: -900, origin: "UK / London Good Delivery", risk: "CRITICAL" },
      { name: "Delhi Air Cargo (DEL)", importsMT: 65000, landedCostUSD: 98400, hzlDeliveredUSD: 99000, arbitrageUSD: -600, origin: "Switzerland / Valcambi", risk: "ELEVATED" },
      { name: "Chennai Air Cargo", importsMT: 25000, landedCostUSD: 98600, hzlDeliveredUSD: 99000, arbitrageUSD: -400, origin: "Singapore Refineries", risk: "MODERATE" }
    ],
    history: [
      { month: "Nov 2025", demand: 575000, imports: 390000, premium: 1650, lme: 30.8, solarInstallsGW: 2.1 },
      { month: "Dec 2025", demand: 590000, imports: 405000, premium: 1720, lme: 31.4, solarInstallsGW: 2.3 },
      { month: "Jan 2026", demand: 598000, imports: 412000, premium: 1780, lme: 31.9, solarInstallsGW: 2.4 },
      { month: "Feb 2026", demand: 604000, imports: 416000, premium: 1810, lme: 32.2, solarInstallsGW: 2.5 },
      { month: "Mar 2026", demand: 610000, imports: 420000, premium: 1850, lme: 32.5, solarInstallsGW: 2.7 }
    ],
    forecast: [
      { month: "Apr 2026", p50: 628000, p10: 598000, p90: 658000, importsExpected: 432000, recommendedPremium: 1950, confidence: 91 },
      { month: "May 2026", p50: 645000, p10: 612000, p90: 678000, importsExpected: 445000, recommendedPremium: 2050, confidence: 89 },
      { month: "Jun 2026", p50: 630000, p10: 595000, p90: 665000, importsExpected: 430000, recommendedPremium: 1920, confidence: 87 },
      { month: "Jul 2026", p50: 618000, p10: 582000, p90: 654000, importsExpected: 420000, recommendedPremium: 1880, confidence: 86 },
      { month: "Aug 2026", p50: 642000, p10: 605000, p90: 679000, importsExpected: 438000, recommendedPremium: 2000, confidence: 88 },
      { month: "Sep 2026", p50: 675000, p10: 635000, p90: 715000, importsExpected: 462000, recommendedPremium: 2200, confidence: 91 }, // Festive jewelry ramp
      { month: "Oct 2026", p50: 710000, p10: 665000, p90: 755000, importsExpected: 488000, recommendedPremium: 2450, confidence: 93 }, // Diwali / Dhanteras peak
      { month: "Nov 2026", p50: 690000, p10: 648000, p90: 732000, importsExpected: 472000, recommendedPremium: 2300, confidence: 91 },
      { month: "Dec 2026", p50: 665000, p10: 625000, p90: 705000, importsExpected: 455000, recommendedPremium: 2150, confidence: 89 },
      { month: "Jan 2027", p50: 678000, p10: 636000, p90: 720000, importsExpected: 464000, recommendedPremium: 2220, confidence: 88 },
      { month: "Feb 2027", p50: 692000, p10: 649000, p90: 735000, importsExpected: 474000, recommendedPremium: 2290, confidence: 87 },
      { month: "Mar 2027", p50: 715000, p10: 670000, p90: 760000, importsExpected: 490000, recommendedPremium: 2400, confidence: 89 }
    ],
    shapDrivers: [
      { name: "Solar PV PLI Module Capacity Additions (GW)", impact: +280, type: "positive", category: "Green Tech Demand" },
      { name: "Festive & Wedding Season Bullion Accumulation", impact: +210, type: "positive", category: "Consumer Seasonal" },
      { name: "Electronics & EV Contact Silver Ingestion", impact: +120, type: "positive", category: "Industrial" },
      { name: "UAE CEPA Tariff Quota Inflow Spread", impact: -340, type: "negative", category: "Import Threat" },
      { name: "CME & Comex Silver Warehouse Inflow", impact: -90, type: "negative", category: "Global Inventory" },
      { name: "High Base MCX Price Retail Elasticity", impact: -65, type: "negative", category: "Price Resistance" }
    ]
  }
};

export const MACRO_SCENARIOS = [
  {
    id: "base",
    name: "Baseline Plan (Budget 2026-27)",
    description: "Current government capex (+11%), steel production at 12.2 MT/mo, solar addition at 32 GW/yr.",
    demandMultiplier: 1.0,
    importShift: 0,
    premiumShift: 0
  },
  {
    id: "infra_boom",
    name: "Aggressive Infrastructure Push (+18% Capex)",
    description: "Accelerated highway, railway electrification, and transmission line galvanizing.",
    demandMultiplier: 1.072,
    importShift: +1500,
    premiumShift: +14
  },
  {
    id: "china_curb",
    name: "China Smelter Winter Production Curbs",
    description: "Power restrictions in Yunnan/Inner Mongolia slash Chinese zinc/lead exports; LME spikes.",
    demandMultiplier: 1.035,
    importShift: -3800,
    premiumShift: +22
  },
  {
    id: "fta_surge",
    name: "Zero-Duty FTA Import Surge (Korea & Japan)",
    description: "Aggressive port dumping at Nhava Sheva and Mundra; landed import parity drops $25/t.",
    demandMultiplier: 0.985,
    importShift: +6200,
    premiumShift: -16
  },
  {
    id: "solar_surge",
    name: "National Solar Mission 50GW Sprint (Silver Focus)",
    description: "Surge in TopCon solar cell metallization paste demand across Gujarat and Tamil Nadu hubs.",
    demandMultiplier: 1.115,
    importShift: +4500,
    premiumShift: +320
  }
];

export const EXECUTIVE_ROI_SUMMARY = {
  annualEbitdaUpliftINR: 248.5, // Crores INR
  premiumRealizationLiftPct: 1.45, // %
  importLeakageDefendedMT: 38200, // MT retained
  workingCapitalSavedINR: 32.4, // Crores INR
  paybackPeriodMonths: 2.8,
  implementationWeeks: 16
};
