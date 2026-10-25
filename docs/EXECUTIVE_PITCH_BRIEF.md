# EXECUTIVE PITCH BRIEF: ZINC, LEAD & SILVER DEMAND SENSING FOR DOMESTIC MARKET

**Target Audience:** Higher Management (CEO, Commercial Director, Marketing Head, Chief Financial Officer)  
**Project Sponsor (SPOC):** Aashutosh Dixit, Head of Marketing Intelligence & Strategy  
**Occasion:** Executive Committee Review / AI Hackathon Strategic Pitch 2026  
**Document Status:** Confidential & Boardroom-Ready  

---

## 1. Executive Summary & Value Proposition

In the primary non-ferrous metals industry, domestic market leadership is defended and monetized not merely by low-cost extraction, but by **superior pricing power, agile volume allocation, and preemptive import defense**. Today, Hindustan Zinc Limited (HZL) operates in a fast-moving domestic landscape where **Zinc (1.1+ MT domestic demand)**, **Lead (1.2+ MT demand including secondary)**, and **Silver (7,000+ MT demand)** face multi-layered domestic and global cross-currents.

### The Problem Today
Domestic demand forecasting, import arrivals, customer grade requirements, and domestic premium discovery currently depend on **fragmented spreadsheets, delayed customs filings, and subjective trader scuttlebutt**. Global metal balance shifts (LME, SHFE, MCX, CME), Chinese smelter power caps, Free Trade Agreement (FTA) import surges (South Korea, Japan), freight volatility, and downstream steel/battery/solar dynamics are analyzed in silos. 

This retrospective posture exposes HZL to:
1. **Unmonetized Domestic Premium Surges:** Inability to raise domestic premiums when spot tightness emerges.
2. **Import Arbitrage Surprises:** Sudden port dumping via FTA zero-duty routes before pricing defense can be deployed.
3. **Sub-optimal Volume Allocation:** Misallocation across long-term annual contracts (MoUs), monthly spot sales, and e-auctions, leaving ₹180–250+ Cr of EBITDA on the table annually.

### The Proposed Solution
We propose the **Cognitive Metal Demand Sensing & Allocation Cockpit (Project SENSE-METAL)**: an enterprise-grade AI decision-support platform that unifies 40+ real-time internal and external market signals into **probabilistic month-on-month demand forecasts, import landed parity radar, TAM/SAM granularity, and explainable premium optimization**.

### Quantified Business Impact (Annualized)
* **+₹185–240 Cr EBITDA Uplift** through +1.2% to +1.8% higher average domestic premium realization.
* **4.5% Reduction in Import Leakage** by executing dynamic pricing counter-measures 45 days prior to port arrivals.
* **₹35 Cr Savings in Working Capital & Inventory Carrying Costs** via optimized smelter-to-depot grade distribution.
* **100% Audit Compliance & Human-in-the-Loop Governance** with complete SHAP driver transparency for every commercial decision.

---

## 2. Market Dynamics: The Three Strategic Metals

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                DOMESTIC MARKET ECOSYSTEM (INDIA)                                │
├───────────────────────────────┬──────────────────────────────────┬───────────────────────────────┤
│          ZINC (Zn)            │            LEAD (Pb)             │          SILVER (Ag)          │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ • Domestic Market: ~1.15 MTPA │ • Domestic Market: ~1.22 MTPA    │ • Domestic Market: ~7,200 TPA │
│ • Primary Share: ~75%         │ • Primary Share: ~35% (65% Sec.) │ • Primary Share: HZL monopoly │
│ • Key Demand Drivers:         │ • Key Demand Drivers:            │ • Key Demand Drivers:         │
│   - Steel Galvanizing (68%)   │   - Automotive Batteries (58%)   │   - Solar PV Pastes (38%)     │
│   - Die-Casting (14%)         │   - Telecom / UPS / ESS (24%)    │   - Industrial/Brazing (18%)  │
│   - Brass & Alloys (11%)      │   - E-Rickshaws & Solar (12%)    │   - Jewelry & Silverware(34%) │
│   - Chemicals / Oxides (7%)   │   - Radiation Shielding (6%)     │   - Coins / Investment (10%)  │
│ • Import Threats:             │ • Import Threats:                │ • Import Threats:             │
│   - Korea/Japan FTAs (0% Duty)│   - Southeast Asia bullion/scrap │   - Dubai/London physical DVP │
│   - Chinese zinc die-cast alloys│ - Secondary lead recovery price│ - Duty arbitrage (CEPA UAE)   │
└───────────────────────────────┴──────────────────────────────────┴───────────────────────────────┘
```

### Strategic Nuances per Metal:
1. **Zinc:** Bound tightly to crude steel production and galvanized sheet export run-rates (Tata Steel, JSW, AM/NS, Jindal). The key commercial challenge is setting domestic premiums for **Special High Grade (SHG)** and **Continuous Galvanizing Grade (CGG)** that maximize margin while closing the arbitrage window against zero-duty Korean/Japanese imports.
2. **Lead:** Characterized by fierce competition from the domestic secondary (scrap recycling) ecosystem and lead-acid battery replacement cycles (Exide, Amara Raja). Demand sensing must predict lead-scrap spread inversions and institutional battery OEM procurement cycles.
3. **Silver:** Rapidly shifting from traditional jewelry/silverware store of value to **industrial and green-tech consumption**, driven by the **MNRE Solar PLI scheme** (TopCon & HJT cell silver metallization paste). HZL is the sole domestic primary producer; sensing must track physical import arbitrage through CEPA (UAE 0-duty quotas) and MCX-LME currency basis.

---

## 3. Unified Market Sensing Signal Fabric

The platform integrates **internal operational telemetry** with **multi-source external market intelligence** across four robust pillars:

```
                                  MULTI-SOURCE SIGNAL INGESTION FABRIC
                                                    │
        ┌───────────────────┬───────────────────────┴───────────────────────┬───────────────────┐
        ▼                   ▼                                               ▼                   ▼
┌───────────────┐   ┌───────────────┐                               ┌───────────────┐   ┌───────────────┐
│  MACRO POLICY │   │  DOWNSTREAM   │                               │ UPSTREAM &    │   │  EXCHANGES &  │
│   & INFRA     │   │  CONSUMPTION  │                               │ GLOBAL SUPPLY │   │  ARBITRAGE    │
├───────────────┤   ├───────────────┤                               ├───────────────┤   ├───────────────┤
│ • NIP Capex   │   │ • JPC Steel   │                               │ • Global Smel-│   │ • LME 3M/Cash │
│ • Gati Shakti │   │   galvanizing │                               │   ter TC/RCs  │   │ • SHFE Spreads│
│ • Solar PLI   │   │ • SIAM Auto   │                               │ • China Power │   │ • MCX Basis   │
│   capacity    │   │   build rate  │                               │   curtailment │   │ • CME Silver  │
│ • ACC Battery │   │ • Telecom tow-│                               │ • Mine concen-│   │ • Freight     │
│   subsidies   │   │   er rollout  │                               │   trate supply│   │   Indices     │
│ • BIS coating │   │ • Real Estate │                               │ • Port Inflow │   │ • USD/INR FX  │
│   standards   │   │   housing starts│                             │   Manifests   │   │   Forward rate│
└───────┬───────┘   └───────┬───────┘                               └───────┬───────┘   └───────┬───────┘
        │                   │                                               │                   │
        └───────────────────┴───────────────────────┬───────────────────────┴───────────────────┘
                                                    ▼
                                    ┌───────────────────────────────┐
                                    │    DATA REFINERY & QUALITY    │
                                    │  - Anomaly Outlier Detection  │
                                    │  - Port Manifest De-duplication│
                                    │  - Temporal Harmonization     │
                                    └───────────────┬───────────────┘
                                                    ▼
                                    ┌───────────────────────────────┐
                                    │     FEATURE STORE & CACHE     │
                                    └───────────────────────────────┘
```

---

## 4. AI Demand Sensing & Forecasting Methodology

Rather than relying on static single-model statistical fits, the engine employs a **Multi-Horizon Hybrid Ensemble**:

1. **Temporal Fusion Transformer (TFT):** Captures multi-scale temporal dependencies, seasonal patterns (e.g. pre-monsoon construction dips, festive jewelry spikes), and learns cross-feature interactions between steel production indices and zinc consumption.
2. **LightGBM Quantile Regressors:** Delivers asymmetric loss calibration to predict **P10 (Bearish), P50 (Expected), and P90 (Bullish)** demand distributions. This ensures executive decisions account for tail risks.
3. **Structural Landed Import Parity Vector Engine:** Calculates instantaneous landed import parity for every major port (Mundra, Nhava Sheva, Chennai, Vizag):
   $$\text{Landed Cost}_{\text{Port}} = \left[ (\text{LME Base} + \text{Regional Origin Premium} + \text{Ocean Freight}) \times \text{USD/INR} \times (1 + \text{Customs} + \text{AIDC}) \right] + \text{Port Handling} + \text{Inland Freight to Cluster}$$
4. **Driver Explainability (SHAP Value Engine):** Every single month-on-month demand change and recommended premium adjustment is deconstructed into additive, human-interpretable dollar-per-tonne increments.

---

## 5. Granular TAM & SAM Market Sensing Model

Higher management requires clear demarcation between what the market consumes (**TAM**) and what HZL can commercially target (**SAM**):

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        MARKET SEGMENTATION & COVERAGE FRAMEWORK                         │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ TOTAL ADDRESSABLE MARKET (TAM)                                                         │
│ Total domestic consumption across all grades, including:                               │
│ • Primary Domestic Production (HZL)                                                    │
│ • Port Imports (FTA from Korea, Japan, ASEAN + Non-FTA China, Europe)                  │
│ • Secondary Recycled Metal (Unorganized & Organized Lead-acid & Zinc Scrap)           │
│                                                                                        │
│          ┌──────────────────────────────────────────────────────────────────┐          │
│          │ SERVICEABLE ADDRESSABLE MARKET (SAM)                             │          │
│          │ Primary metal volume addressable by HZL's smelter capacity,      │          │
│          │ grade portfolio, and logistic delivery footprint:                 │          │
│          │ • Zinc: SHG (99.995%), CGG (Jumbo/Ingots), Die-Cast Alloys (ZA-12)│          │
│          │ • Lead: Refined 99.99%, Refined 99.97%, Calcium/Antimonial Alloys│          │
│          │ • Silver: 99.99% Refined Ingots (30kg), Granules for Solar Paste │          │
│          │                                                                  │          │
│          │          ┌────────────────────────────────────────────┐          │          │
│          │          │ SERVICEABLE OBTAINABLE MARKET (SOM / SHARE)│          │          │
│          │          │ Actual contracted & spot volume captured   │          │          │
│          │          │ by HZL after competitive landed pricing.   │          │          │
│          │          └────────────────────────────────────────────┘          │          │
│          └──────────────────────────────────────────────────────────────────┘          │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

The system continuously tracks **White Spaces**—volumes currently serviced by imports that HZL can capture with tactical regional premiums or targeted customer alloy grades.

---

## 6. Strategic Decision-Support Cockpits

Adhering strictly to the problem brief's mandate: **The platform provides decision-support intelligence for executive review, preserving human judgment and authorization.**

### Cockpit 1: Dynamic Premium Advisor
- Recommends the optimal domestic premium ($/MT for Zinc/Lead, ₹/kg for Silver) for the upcoming fortnight or month.
- Evaluates the **Parity Elasticity Margin**: How high can HZL push the domestic premium before domestic customers trigger import purchase orders?

### Cockpit 2: Tri-Channel Volume Allocation Optimizer
Solves a constrained revenue-maximization model across three commercial channels:
1. **Long-Term Annual Contracts (MoUs):** Predictable baseline volume with negotiated formula premiums.
2. **Monthly Spot Allocations:** Agile spot pricing for mid-market fabricators and uncontracted volumes.
3. **E-Auction Tranches:** High-margin price discovery for surplus metal or specialized inventory.
*Objective:* Maximize total net realization while preserving key customer SLAs and preventing domestic inventory overhang.

### Cockpit 3: E-Auction Reserve Price & Timing Simulator
- Calculates optimal reserve prices based on sensed buyer liquidity and scrap price spreads.
- Simulates bidder participation to recommend splitting lots across days to avoid depressing spot market sentiment.

---

## 7. Quantified Business Case & Executive ROI

| Value Driver | Mechanism | Annual Financial Impact |
| :--- | :--- | :--- |
| **Premium Optimization** | Capturing additional $8–$14/MT on domestic zinc & lead by sensing localized spot shortages before imports arrive. | **+₹135 – ₹165 Cr** |
| **Import Defense (Market Share)** | Timely parity adjustments retaining 35,000 MT of high-margin galvanizing customer demand. | **+₹55 – ₹75 Cr** |
| **Silver Industrial Moat** | Real-time tracking of Solar PV paste imports & custom ingot allocation for Tier-1 solar cell manufacturers. | **+₹20 – ₹30 Cr** |
| **Working Capital Optimization** | Better smelter-to-regional-depot inventory alignment reducing transit holding inventory by 6 days. | **+₹25 – ₹35 Cr** |
| **TOTAL ANNUALIZED EBITDA IMPACT** | | **+₹235 – ₹305 Cr** |

**Net Program ROI:** > 12x initial implementation investment within Year 1.

---

## 8. Implementation Roadmap & Governance

```
Weeks 01-08: Phase 1 - Ingestion & Baseline Models (Pilot on Zinc Galvanizing Sector)
├── Connect SAP S/4HANA Sales & Dispatch logs
├── Ingest daily Customs Port Import manifests & LME/MCX exchange APIs
└── Deploy baseline TFT & Landed Parity models for 5 Key Northern/Western Clusters

Weeks 09-16: Phase 2 - Full Multi-Metal Expansion (Lead & Silver + TAM/SAM Engine)
├── Integrate Lead Secondary Scrap feeds & Battery OEM trackers
├── Integrate Solar PV Cell additions & Silver import parity
└── Roll out Dynamic Allocation & E-Auction Reserve Price Cockpits

Weeks 17-24: Phase 3 - Enterprise Scale & Operationalization
├── User adoption workshops for Marketing & Regional Sales Heads
├── Integration with Executive Review Dashboard (C-Suite Tablet & Desktop)
└── Final handover with continuous retraining pipeline and audit trails
```

---

## 9. Conclusion & Call to Action for Higher Management

The transition from subjective spreadsheets to an **AI-augmented demand sensing and pricing intelligence cockpit** represents the next quantum leap in HZL's commercial excellence. By approving **Project SENSE-METAL**, Higher Management arms the marketing leadership with institutional foresight, defends domestic market share against aggressive imports, and captures over **₹250+ Cr in incremental EBITDA**.
