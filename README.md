# MetalSense AI: Domestic Demand Sensing & Commercial Optimization Platform
### Tailored for Hindustan Zinc Limited (HZL - Vedanta Group)
**Covering Zinc, Lead, Silver, and Cadmium across Indian Smelters (Chanderiya, Dariba, Debari, Pantnagar)**

---

## 1. System Architecture & Tech Stack

```
                                  ┌──────────────────────────────────────────────┐
                                  │      MetalSense AI Executive Frontend        │
                                  │ Next.js 15 (React 19) + Tailwind CSS +       │
                                  │ Recharts High-Density Commodity Dashboards   │
                                  └──────────────────────┬───────────────────────┘
                                                         │ REST / JSON
                                                         ▼
                                  ┌──────────────────────────────────────────────┐
                                  │          FastAPI Econometric Backend         │
                                  │  - Demand Sensing & Macro Regressors         │
                                  │  - Linear Programming NSR Optimizer          │
                                  │  - Import Parity & Arbitrage Engine          │
                                  │  - Gemini 2.5 Flash News Synthesis           │
                                  └──────────────────────┬───────────────────────┘
                                                         │ PostgreSQL / pgvector
                                                         ▼
                                  ┌──────────────────────────────────────────────┐
                                  │           Supabase Cloud Database            │
                                  │  - market_prices (LME, SHFE, MCX, CME)       │
                                  │  - exim_imports (Bill of Lading Trade Data)  │
                                  │  - internal_sales (HZL ERP Sales History)    │
                                  │  - market_intelligence (vector 1536)         │
                                  └──────────────────────────────────────────────┘
```

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS, Lucide React, Recharts.
- **Backend**: Python 3.12, FastAPI, Uvicorn, Pandas, NumPy, SciPy, Google GenAI SDK (`google-genai`), Pydantic.
- **Database**: Supabase (PostgreSQL 16) with `pgvector` extension for semantic commodity news and policy embeddings.

---

## 2. Core Modules Implemented

### Module A: Executive Demand Sensing Dashboard (MoM Forecast)
- **Filters**: Metal (`Zinc`, `Lead`, `Silver`, `Cadmium`), Grade (`SHG 99.995%`, `CGG`, `Jumbo Ingot`, `PW`, `Refined Lead 99.99%`, `Silver 99.99% Grains`, `Cadmium 99.99%`), and Region (`North`, `West`, `South`, `East`).
- **Time-Series Chart**: 12-month historical demand curve combined with 1-to-6 month MoM AI Forecast with **80% and 95% econometric confidence intervals**.
- **Macro Driver Impact Cards**:
  - *Galvanized Steel Production*: Gati Shakti national highway crash barriers, railway electrification, transmission towers.
  - *Auto / EV Batteries*: 2W/4W vehicle build rates, industrial UPS, telecom 5G tower battery replacements.
  - *Solar Photovoltaics (PV)*: ALMM domestic module mandate, TOPCon/HJT cell silver paste consumption surge.
  - *Infrastructure PLI & Die-Casting*: Zamak foundry offtake in auto & hardware.
- **Interactive What-If Sensitivity Modeler**: Real-time sliders allowing commercial desks to stress-test demand under downstream shocks (+/- 10% steel growth, +/- 10% EV build rates, +/- 20% solar capacity).

### Module B: TAM & SAM Market Segmentation Engine
- **Total Domestic Consumption (TDC) Stack**:
  $$\text{TDC} = \text{HZL Primary Domestic Sales} + \text{Domestic Secondary Scrap} + \text{EXIM Seaborne Imports}$$
- **Market Sizing**:
  - TAM: Total domestic consumption across all grades and scrap.
  - SAM: Serviceable Addressable Market (high-purity primary smelter demand).
  - SOM: Obtainable target including contestable import volume substitution.
- **EXIM Bill of Lading Intelligence Table**:
  - Importer names (Tata Steel, JSW Steel, AM/NS India, POSCO Maharashtra, Exide, Amara Raja, Adani Solar, HBL Power).
  - Origin country and foreign smelters (Korea Zinc Onsan, Young Poong, Kazzinc, Jiangxi Copper, etc.).
  - Ports of entry (JNPT Nhava Sheva, Mundra, Chennai, Kolkata/Haldia).
  - Customs tariff regimes (India-Korea CEPA 0%, Basic Customs Duty 7.5% + SWS, Advance Authorization 0%).
  - Import landed cost vs HZL ex-works comparison with **Substitution Feasibility badge** and **tactical negotiation playbook**.

### Module C: Global Intelligence & Exchange Arbitrage Tracker
- **Live Tickers**: LME Cash & 3M ($/MT or $/oz), SHFE (RMB/MT), MCX India (₹/kg or ₹/10g), CME Comex ($/MT or $/oz), USD/INR FX Rate.
- **Arbitrage Alerts**: SHFE/LME export ratio triggers, LME warrant cancellations in Southeast Asia, Red Sea freight surcharges.
- **Interactive Import Parity Calculator**:
  - Calculates seaborne import landed cost: $\text{CIF} + \text{BCD} + \text{SWS} + \text{Port Handling} + \text{Inland Freight}$
  - Compares with HZL domestic landed price to determine HZL's exact competitive pricing headroom/cushion.
- **Gemini AI Market Intelligence Copilot**:
  - Pre-seeded with real-world news on smelter curtailments (Nyrstar Balen), DGTR anti-dumping investigations, and MNRE ALMM rules.
  - Live interactive ingestion box: Enter any breaking news headline to trigger instant Gemini AI sentiment scoring (Bullish/Bearish/Neutral), physical premium impact score (-1.0 to +1.0), and tactical sales directives.

### Module D: Commercial Premium & Auction Allocation Optimizer
- **Production Batch Simulator**: Marketing teams select smelter origin and available monthly production volume (MT).
- **Optimization Model**:
  - Calculates optimal split between Long-Term Contractual (LTC) allocation and Spot E-Auction volumes to maximize Net Sales Realization (NSR in INR Crores and $/MT).
  - Incorporates spot price elasticity (simulates spot premium decay if auction volume exceeds market absorption depth).
  - Compares results with traditional 80/20 baseline allocation, showing exact incremental revenue gains (+₹10 to +₹25 Crores/month).
- **Customer Tier Quotas**: Allocates volume across Tier-1 Strategic Key Accounts (Tata/JSW), Tier-2 Tube Mills, and prompt B2B e-Auctions.
- **Export Arbitrage Check**: Tests whether FOB West Coast export netback exceeds domestic NSR.
- **Commercial Directive Memorandum**: Generates an official, printable allocation authorization memo.

---

## 3. Database Schema (`supabase/schema.sql`)

The repository includes a ready-to-run Supabase PostgreSQL migration file at `supabase/schema.sql` defining:
1. `market_prices`: Historical & spot tickers, SHFE/LME ratio, FX rates, physical premiums.
2. `exim_imports`: Bill of Lading records with HS codes, importers, origin smelters, CIF prices, duties, and landed costs.
3. `internal_sales`: HZL ERP sales ledgers across customer segments, regions, smelter origins, and realized NSR.
4. `market_intelligence`: News headlines, impact scores, sentiments, and 1536-dimensional `pgvector` embeddings.
5. `macro_drivers`: Regressors for steel production, EV builds, solar capacity, and transmission lines.
6. `demand_forecasts`: 1-to-6 month MoM AI projections with 80% and 95% confidence intervals.

---

## 4. Running the Platform Locally

### Backend (FastAPI):
```bash
cd backend
# With uv (recommended)
uv run uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
API Docs: `http://127.0.0.1:8000/docs`

### Frontend (Next.js):
```bash
cd frontend
npm run dev
# or production mode:
npm run build && npm run start
```
Web App: `http://localhost:3000`
