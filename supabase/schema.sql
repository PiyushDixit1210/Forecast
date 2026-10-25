-- ========================================================================
-- MetalSense AI: Domestic Demand Sensing & Commercial Optimization Platform
-- Tailored for Hindustan Zinc Limited (HZL - Vedanta Group)
-- Core Database Schema & Realistic Indian Market Seed Data
-- Metals: Zinc, Lead, Silver, Cadmium
-- ========================================================================

-- Enable pgvector for market intelligence semantic search
CREATE EXTENSION IF NOT EXISTS vector;

-- Drop existing tables if re-running
DROP TABLE IF EXISTS market_intelligence CASCADE;
DROP TABLE IF EXISTS internal_sales CASCADE;
DROP TABLE IF EXISTS exim_imports CASCADE;
DROP TABLE IF EXISTS market_prices CASCADE;
DROP TABLE IF EXISTS macro_drivers CASCADE;
DROP TABLE IF EXISTS demand_forecasts CASCADE;

-- 1. Market Prices Table (LME, SHFE, MCX, CME, FX & Domestic Physical Premiums)
CREATE TABLE market_prices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    metal VARCHAR(50) NOT NULL, -- 'Zinc', 'Lead', 'Silver', 'Cadmium'
    exchange_lme NUMERIC(12, 2) NOT NULL, -- USD/MT (or USD/troy oz for Silver)
    exchange_shfe NUMERIC(12, 2), -- RMB/MT
    exchange_mcx NUMERIC(12, 2) NOT NULL, -- INR/kg (Zinc/Lead/Cadmium) or INR/10g or INR/kg (Silver)
    exchange_cme NUMERIC(12, 2), -- USD/troy oz (Silver) or USD/MT (Zinc)
    inr_usd_rate NUMERIC(10, 4) NOT NULL DEFAULT 86.50,
    physical_premium_india NUMERIC(10, 2) NOT NULL, -- USD/MT premium over LME (e.g. +$125/MT for SHG Zinc)
    shfe_lme_ratio NUMERIC(8, 4),
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_market_prices_metal_date ON market_prices(metal, date DESC);

-- 2. EXIM Imports Table (Indian Customs & Bill of Lading Data)
CREATE TABLE exim_imports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    metal VARCHAR(50) NOT NULL,
    grade VARCHAR(100) NOT NULL,
    hs_code VARCHAR(20) NOT NULL,
    importer_name VARCHAR(255) NOT NULL,
    origin_country VARCHAR(100) NOT NULL,
    port VARCHAR(100) NOT NULL,
    volume_mt NUMERIC(12, 2) NOT NULL,
    cif_price_usd NUMERIC(12, 2) NOT NULL,
    landed_cost_inr NUMERIC(14, 2) NOT NULL,
    duty_type VARCHAR(50) NOT NULL, -- 'Korea CEPA (0%)', 'Basic 7.5% + SWS', 'Advance Authorization (0%)', 'ASEAN FTA'
    hzl_parity_delta_inr NUMERIC(12, 2) NOT NULL, -- Positive means Import is cheaper than HZL (threat), Negative means HZL is cheaper
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_exim_metal_importer ON exim_imports(metal, importer_name);
CREATE INDEX idx_exim_date ON exim_imports(date DESC);

-- 3. Internal Sales Table (HZL ERP Enterprise Commercial History)
CREATE TABLE internal_sales (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    customer_id VARCHAR(50) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_segment VARCHAR(100) NOT NULL, -- 'Galvanized Steel', 'Auto/EV Batteries', 'Solar PV', 'Die-Casting/Zamak', 'Industrial/Chemicals'
    region VARCHAR(50) NOT NULL, -- 'North', 'West', 'South', 'East'
    smelter_origin VARCHAR(100) NOT NULL, -- 'Chanderiya Hydro-Smelter', 'Dariba Smelting Complex', 'Debari Smelter', 'Pantnagar Metal Plant'
    metal VARCHAR(50) NOT NULL,
    grade VARCHAR(100) NOT NULL, -- 'SHG 99.995%', 'HG 99.95%', 'Jumbo Ingot (1 MT)', 'Prime Western', 'Refined Lead 99.99%', 'Silver 99.99% Bar', 'Cadmium 99.99%'
    volume_mt NUMERIC(12, 2) NOT NULL,
    realized_premium_usd NUMERIC(10, 2) NOT NULL, -- Physical premium realized over LME ($/MT)
    net_sales_realization_inr NUMERIC(14, 2) NOT NULL,
    sale_type_ltc_or_auction VARCHAR(20) NOT NULL CHECK (sale_type_ltc_or_auction IN ('LTC', 'Spot Auction', 'Export')),
    contract_ref VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_internal_sales_segment ON internal_sales(customer_segment, metal);
CREATE INDEX idx_internal_sales_region ON internal_sales(region, metal);

-- 4. Market Intelligence Table (Unstructured Market News, Regulatory Filings & Embeddings)
CREATE TABLE market_intelligence (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
    source VARCHAR(100) NOT NULL,
    headline TEXT NOT NULL,
    summary TEXT NOT NULL,
    impact_score NUMERIC(4, 2) NOT NULL, -- -1.0 to +1.0
    sentiment VARCHAR(20) NOT NULL CHECK (sentiment IN ('Bullish', 'Bearish', 'Neutral')),
    affected_metal VARCHAR(50) NOT NULL,
    affected_sectors TEXT[] NOT NULL DEFAULT '{}',
    recommendation TEXT,
    embedding vector(1536),
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_market_intel_metal_date ON market_intelligence(affected_metal, timestamp DESC);

-- 5. Macro Drivers Table (Indian Downstream Econometric Indicators)
CREATE TABLE macro_drivers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    sector VARCHAR(100) NOT NULL,
    metric_name VARCHAR(150) NOT NULL,
    current_value NUMERIC(14, 2) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    mom_change_pct NUMERIC(6, 2) NOT NULL,
    yoy_change_pct NUMERIC(6, 2) NOT NULL,
    impact_on_zinc VARCHAR(20) NOT NULL, -- 'High Positive', 'Moderate Positive', 'Neutral', 'Negative'
    impact_on_lead VARCHAR(20) NOT NULL,
    impact_on_silver VARCHAR(20) NOT NULL,
    impact_on_cadmium VARCHAR(20) NOT NULL,
    commentary TEXT
);

-- 6. AI Demand Forecasts Table (MoM Sensing with 80% and 95% Confidence Intervals)
CREATE TABLE demand_forecasts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    metal VARCHAR(50) NOT NULL,
    grade VARCHAR(100) NOT NULL,
    region VARCHAR(50) NOT NULL,
    forecast_month VARCHAR(20) NOT NULL, -- e.g. 'Nov 2026', 'Dec 2026'
    month_offset INT NOT NULL, -- 1 to 6
    baseline_mt NUMERIC(12, 2) NOT NULL,
    ai_forecast_mt NUMERIC(12, 2) NOT NULL,
    lower_ci_95 NUMERIC(12, 2) NOT NULL,
    upper_ci_95 NUMERIC(12, 2) NOT NULL,
    lower_ci_80 NUMERIC(12, 2) NOT NULL,
    upper_ci_80 NUMERIC(12, 2) NOT NULL,
    confidence_pct NUMERIC(5, 2) NOT NULL DEFAULT 91.5,
    key_drivers TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ========================================================================
-- SEED DATA: Realistic Indian Commodity Ecosystem for HZL
-- ========================================================================

-- Market Prices (Historical & Current Spot)
INSERT INTO market_prices (date, metal, exchange_lme, exchange_shfe, exchange_mcx, exchange_cme, inr_usd_rate, physical_premium_india, shfe_lme_ratio) VALUES
('2026-10-24', 'Zinc', 2885.50, 24350.00, 278.40, 2890.00, 86.65, 135.00, 8.44),
('2026-10-23', 'Zinc', 2862.00, 24180.00, 276.10, 2868.00, 86.58, 132.00, 8.45),
('2026-10-22', 'Zinc', 2840.00, 23990.00, 273.80, 2845.00, 86.50, 130.00, 8.45),
('2026-10-21', 'Zinc', 2815.00, 23820.00, 271.50, 2820.00, 86.48, 128.00, 8.46),
('2026-10-20', 'Zinc', 2790.00, 23650.00, 269.20, 2795.00, 86.42, 125.00, 8.48),

('2026-10-24', 'Lead', 2085.00, 17200.00, 186.20, 2090.00, 86.65, 105.00, 8.25),
('2026-10-23', 'Lead', 2070.00, 17050.00, 184.80, 2075.00, 86.58, 102.00, 8.24),
('2026-10-22', 'Lead', 2055.00, 16920.00, 183.40, 2060.00, 86.50, 100.00, 8.23),

('2026-10-24', 'Silver', 33.85, 8420.00, 96800.00, 33.95, 86.65, 0.48, NULL),
('2026-10-23', 'Silver', 33.40, 8310.00, 95400.00, 33.50, 86.58, 0.45, NULL),
('2026-10-22', 'Silver', 32.90, 8190.00, 94100.00, 33.00, 86.50, 0.42, NULL),

('2026-10-24', 'Cadmium', 7850.00, NULL, 695.00, NULL, 86.65, 180.00, NULL),
('2026-10-23', 'Cadmium', 7780.00, NULL, 688.00, NULL, 86.58, 175.00, NULL);

-- EXIM Imports (Bill of Lading Indian Customs Records)
INSERT INTO exim_imports (date, metal, grade, hs_code, importer_name, origin_country, port, volume_mt, cif_price_usd, landed_cost_inr, duty_type, hzl_parity_delta_inr) VALUES
('2026-10-15', 'Zinc', 'SHG Ingot 99.995%', '79011100', 'Tata Steel Limited', 'South Korea', 'JNPT Nhava Sheva', 4200.00, 2980.00, 272500.00, 'Korea CEPA (0%)', 4200.00),
('2026-10-12', 'Zinc', 'SHG Ingot 99.995%', '79011100', 'JSW Steel Coated Products', 'South Korea', 'Mundra Port', 3800.00, 2975.00, 271900.00, 'Korea CEPA (0%)', 4800.00),
('2026-10-10', 'Zinc', 'Continuous Galvanizing Grade', '79011200', 'AM/NS India Hazira', 'Kazakhstan', 'Mundra Port', 2500.00, 2910.00, 284500.00, 'Basic 7.5% + SWS', -3200.00),
('2026-10-08', 'Zinc', 'Prime Western Ingot', '79011900', 'National Galvanizers Ltd', 'Australia', 'Kolkata/Haldia', 1200.00, 2890.00, 282100.00, 'Basic 7.5% + SWS', -1800.00),
('2026-10-05', 'Zinc', 'Zinc Die-Casting Alloy (Zamak 3)', '79012000', 'Uno Minda Automotive', 'China', 'Chennai Port', 850.00, 3150.00, 289000.00, 'Advance Authorization (0%)', 3100.00),
('2026-10-02', 'Zinc', 'SHG Ingot 99.995%', '79011100', 'POSCO Maharashtra Steel', 'South Korea', 'JNPT Nhava Sheva', 3100.00, 2970.00, 271400.00, 'Korea CEPA (0%)', 5300.00),

('2026-10-14', 'Lead', 'Refined Lead 99.99%', '78011000', 'Exide Industries Ltd', 'South Korea', 'Kolkata/Haldia', 2400.00, 2180.00, 199500.00, 'Korea CEPA (0%)', 2800.00),
('2026-10-11', 'Lead', 'Refined Lead 99.97%', '78011000', 'Amara Raja Energy & Mobility', 'UAE', 'Chennai Port', 2900.00, 2150.00, 208200.00, 'Basic 7.5% + SWS', -2100.00),
('2026-10-06', 'Lead', 'Antimonial Lead Alloy (3% Sb)', '78019100', 'Luminous Power Tech', 'Kazakhstan', 'JNPT Nhava Sheva', 1100.00, 2260.00, 219400.00, 'Basic 7.5% + SWS', -1400.00),

('2026-10-16', 'Silver', 'Silver Grains 99.99%', '71069100', 'Adani Solar (Mundra)', 'China', 'Mundra Port', 42.50, 1085000.00, 95800000.00, 'Advance Authorization (0%)', 1250000.00),
('2026-10-09', 'Silver', 'Silver Bars 99.9%', '71069100', 'Goldi Solar Pvt Ltd', 'Japan', 'JNPT Nhava Sheva', 18.20, 1092000.00, 96450000.00, 'Basic 7.5% + SWS', -850000.00),

('2026-10-13', 'Cadmium', 'Cadmium Metal Sticks 99.99%', '81072000', 'HBL Power Systems', 'China', 'Chennai Port', 85.00, 8100.00, 785000.00, 'Basic 7.5% + SWS', 12000.00),
('2026-10-04', 'Cadmium', 'Cadmium Balls 99.9%', '81072000', 'Modi Electroplating Works', 'Kazakhstan', 'Mundra Port', 45.00, 7950.00, 772000.00, 'Basic 7.5% + SWS', 8500.00);

-- Internal Sales (HZL Historical Sales Ledger across North, West, South, East)
INSERT INTO internal_sales (date, customer_id, customer_name, customer_segment, region, smelter_origin, metal, grade, volume_mt, realized_premium_usd, net_sales_realization_inr, sale_type_ltc_or_auction, contract_ref) VALUES
('2026-10-20', 'CUST-HZL-101', 'Tata Steel Kalinganagar', 'Galvanized Steel', 'East', 'Chanderiya Hydro-Smelter', 'Zinc', 'SHG 99.995%', 6500.00, 138.00, 276800.00, 'LTC', 'LTC-2026-ZNC-001'),
('2026-10-19', 'CUST-HZL-102', 'JSW Steel Vijayanagar', 'Galvanized Steel', 'South', 'Dariba Smelting Complex', 'Zinc', 'Continuous Galvanizing Grade', 8200.00, 142.00, 277400.00, 'LTC', 'LTC-2026-ZNC-002'),
('2026-10-18', 'CUST-HZL-103', 'Jindal Steel & Power Angul', 'Galvanized Steel', 'East', 'Debari Smelter', 'Zinc', 'Jumbo Ingot (1 MT)', 3400.00, 132.00, 275500.00, 'LTC', 'LTC-2026-ZNC-003'),
('2026-10-17', 'CUST-HZL-104', 'Bhushan Power & Steel', 'Galvanized Steel', 'East', 'Chanderiya Hydro-Smelter', 'Zinc', 'SHG 99.995%', 2100.00, 155.00, 279200.00, 'Spot Auction', 'AUC-OCT26-088'),
('2026-10-16', 'CUST-HZL-105', 'APL Apollo Tubes Ltd', 'Galvanized Steel', 'North', 'Pantnagar Metal Plant', 'Zinc', 'Prime Western', 4500.00, 126.00, 274100.00, 'LTC', 'LTC-2026-ZNC-004'),
('2026-10-15', 'CUST-HZL-106', 'Surya Roshni Ltd', 'Galvanized Steel', 'North', 'Debari Smelter', 'Zinc', 'SHG 99.995%', 1800.00, 148.00, 278100.00, 'Spot Auction', 'AUC-OCT26-092'),
('2026-10-14', 'CUST-HZL-107', 'Uno Minda Automotive', 'Die-Casting/Zamak', 'North', 'Pantnagar Metal Plant', 'Zinc', 'Zinc Die-Casting Alloy (Zamak 3)', 1600.00, 165.00, 282400.00, 'LTC', 'LTC-2026-ZNC-005'),

('2026-10-21', 'CUST-HZL-201', 'Exide Industries Hosur', 'Auto/EV Batteries', 'South', 'Chanderiya Hydro-Smelter', 'Lead', 'Refined Lead 99.99%', 5400.00, 112.00, 201400.00, 'LTC', 'LTC-2026-LED-001'),
('2026-10-19', 'CUST-HZL-202', 'Amara Raja Batteries Tirupati', 'Auto/EV Batteries', 'South', 'Dariba Smelting Complex', 'Lead', 'Refined Lead 99.99%', 4900.00, 115.00, 201900.00, 'LTC', 'LTC-2026-LED-002'),
('2026-10-17', 'CUST-HZL-203', 'Luminous Power Baddi', 'Auto/EV Batteries', 'North', 'Pantnagar Metal Plant', 'Lead', 'Refined Lead 99.97%', 2200.00, 125.00, 203800.00, 'Spot Auction', 'AUC-OCT26-041'),

('2026-10-20', 'CUST-HZL-301', 'Tata Power Solar Bangalore', 'Solar PV', 'South', 'Pantnagar Metal Plant', 'Silver', 'Silver 99.99% Bar', 35.00, 0.52, 97200000.00, 'LTC', 'LTC-2026-SLV-001'),
('2026-10-18', 'CUST-HZL-302', 'Vikram Solar Falta SEZ', 'Solar PV', 'East', 'Pantnagar Metal Plant', 'Silver', 'Silver 99.99% Bar', 28.00, 0.55, 97500000.00, 'Spot Auction', 'AUC-OCT26-014'),
('2026-10-15', 'CUST-HZL-303', 'Premier Energies Hyderabad', 'Solar PV', 'South', 'Pantnagar Metal Plant', 'Silver', 'Silver Grains 99.99%', 22.00, 0.50, 97000000.00, 'LTC', 'LTC-2026-SLV-002'),

('2026-10-19', 'CUST-HZL-401', 'HBL Power Systems', 'Auto/EV Batteries', 'South', 'Debari Smelter', 'Cadmium', 'Cadmium 99.99%', 65.00, 185.00, 786000.00, 'LTC', 'LTC-2026-CAD-001'),
('2026-10-16', 'CUST-HZL-402', 'Grauer & Weil India', 'Industrial/Chemicals', 'West', 'Chanderiya Hydro-Smelter', 'Cadmium', 'Cadmium 99.99%', 40.00, 195.00, 789000.00, 'Spot Auction', 'AUC-OCT26-009');

-- Market Intelligence (News, Policy Dispatches & Sentiment)
INSERT INTO market_intelligence (timestamp, source, headline, summary, impact_score, sentiment, affected_metal, affected_sectors, recommendation) VALUES
(NOW() - INTERVAL '2 hours', 'Fastmarkets MB', 'European Smelter Nyrstar Extends Antwerp Zinc Curtailment Amid High Winter Power Tariffs', 'Nyrstar confirmed its 315ktpa Balen-Overpelt zinc facility in Belgium will maintain 50% capacity cap through Q1 2027 due to European grid spark spreads. Spot physical premiums in Rotterdam jumped $15 to $190/MT.', 0.82, 'Bullish', 'Zinc', ARRAY['Galvanized Steel', 'Global Smelting'], 'Raise domestic spot auction floor premium by $8-10/MT; European export arbitrage window is opening for HZL West Coast shipments.'),

(NOW() - INTERVAL '5 hours', 'DGTR Ministry of Commerce', 'India Initiates Anti-Dumping Probe on Coated Steel Imports from Vietnam and Korea', 'The Directorate General of Trade Remedies accepted petition from Indian primary steel producers alleging dumping of galvanized/galvalume coils. Potential 12-18% duties would bolster domestic steel line utilization.', 0.78, 'Bullish', 'Zinc', ARRAY['Galvanized Steel', 'Infrastructure PLI'], 'Domestic zinc consumption in Western & Eastern steel belts expected to surge +7% over next quarter. Lock in LTC commitments with Tata Steel & JSW before secondary market tightens.'),

(NOW() - INTERVAL '14 hours', 'LME Warehouse Notice', 'LME Port Klang & Singapore Zinc On-Warrant Stocks Drop 18,500 MT in Single Session', 'Canceled warrants surged to 34% of total inventory, signaling aggressive metal drawdowns destined for Southeast Asian and South Asian infrastructure consumers. Spreads widened into $14 backwardation.', 0.65, 'Bullish', 'Zinc', ARRAY['Galvanized Steel', 'Die-Casting/Zamak'], 'Recommend holding 15% of November production in prompt spot auction pool to capture backwardation spike.'),

(NOW() - INTERVAL '1 day', 'Ministry of New & Renewable Energy (MNRE)', 'ALMM Solar Cell Mandate Takes Effect: Domestic Module Makers Required 100% Indian Wafer/Cell Sourcing', 'The ALMM list revision mandates 18GW of domestic TOPCon/HJT cell assembly, requiring high-purity silver metallization paste formulated from certified domestic 99.99% silver grain.', 0.92, 'Bullish', 'Silver', ARRAY['Solar PV', 'Green Hydrogen'], 'Direct Pantnagar refinery output towards certified high-purity silver grain for solar paste formulators (Heraeus India, Solamet); premium realization potential +$0.15/oz above MCX parity.'),

(NOW() - INTERVAL '1 day 8 hours', 'Bloomberg Commodity', 'South Korean Smelter Korea Zinc Reaches Full Output at Onsan Following Debottlenecking', 'Korea Zinc lifted output guidance by 45,000 MT/year. Shipments under India-Korea CEPA (zero duty) to Nhava Sheva and Mundra ports slated to increase in Nov-Dec.', -0.58, 'Bearish', 'Zinc', ARRAY['Galvanized Steel', 'Automotive'], 'Defensive pricing required in West India (Mumbai/Pune/Gujarat). Expand regional freight discount for JSW Vasind and POSCO Maharashtra to maintain 85%+ wallet share.'),

(NOW() - INTERVAL '2 days', 'Battery Review Asia', 'Lead-Acid Telecom Tower Backup Replacement Cycles Accelerate Across Tier-2/3 Indian 5G Rollout', 'Indus Towers and ATC announce ₹1,800 Cr capex for 2V industrial lead-acid cell replacements. Exide and Amara Raja report 14% uptick in stationary battery order books.', 0.71, 'Bullish', 'Lead', ARRAY['Auto/EV Batteries', 'Telecom Infrastructure'], 'Prioritize refined lead 99.99% allocation to Hosur and Tirupati plants; tighten payment credit terms from 45 to 30 days.'),

(NOW() - INTERVAL '2 days 12 hours', 'Fastmarkets Minor Metals', 'Global Cadmium Ingot Inventories Tighten as Ni-Cd Aviation and Defense Battery Demand Rises', 'Airbus and defense aviation suppliers increase long-term procurement of high-density sintered plate nickel-cadmium batteries. Cadmium 99.99% sticks benchmark reaches $3.60/lb in Rotterdam.', 0.64, 'Bullish', 'Cadmium', ARRAY['Auto/EV Batteries', 'Defense & Aerospace'], 'Debari cadmium by-product yields can be fully monetized through dedicated B2B auctions for defense vendors at ₹710/kg.');

-- Macro Drivers (Downstream Indian Demand Indicators)
INSERT INTO macro_drivers (date, sector, metric_name, current_value, unit, mom_change_pct, yoy_change_pct, impact_on_zinc, impact_on_lead, impact_on_silver, impact_on_cadmium, commentary) VALUES
('2026-10-01', 'Galvanized Steel', 'Indian Finished Steel Production (Galvanized / Coated)', 1320.00, 'Thousand MT', 5.40, 11.20, 'High Positive', 'Neutral', 'Neutral', 'Neutral', 'Infrastructure Capex under Gati Shakti and National Highway crash barrier mandates driving record zinc coating volume.'),
('2026-10-01', 'Automotive & EV', 'Automobile Production (Passenger Vehicles & 2W)', 2480.00, 'Thousand Units', 4.10, 8.60, 'Moderate Positive', 'High Positive', 'Neutral', 'Neutral', 'Festive inventory buildup and steady EV auxiliary 12V battery integration supporting lead demand across OEM battery lines.'),
('2026-10-01', 'Solar Photovoltaics', 'Domestic Solar PV Cell & Module Manufacturing Capacity', 38.50, 'GW Annualized', 8.20, 44.00, 'Neutral', 'Neutral', 'High Positive', 'Moderate Positive', 'TOPCon n-type cell transition consumes 18-22mg silver per watt compared to 10mg in older PERC technology.'),
('2026-10-01', 'Infrastructure & Power', 'Power Transmission Lines & Substation Towers Added', 4200.00, 'Circuit KM', 6.80, 15.30, 'High Positive', 'Neutral', 'Neutral', 'Neutral', 'Green Energy Corridor tenders mandate 86-micron heavy hot-dip galvanization using HZL Prime Western / SHG grades.'),
('2026-10-01', 'Die-Casting & Hardware', 'Zamak Die-Casting Alloy Demand (Appliances & Sanitaryware)', 34.20, 'Thousand MT', 2.90, 6.40, 'Moderate Positive', 'Neutral', 'Neutral', 'Neutral', 'Urban housing completions and export hardware driving continuous foundry consumption.');

-- AI Demand Forecasts (1-to-6 Month MoM Projections)
INSERT INTO demand_forecasts (metal, grade, region, forecast_month, month_offset, baseline_mt, ai_forecast_mt, lower_ci_95, upper_ci_95, lower_ci_80, upper_ci_80, confidence_pct, key_drivers) VALUES
('Zinc', 'SHG 99.995%', 'North', 'Nov 2026', 1, 14200, 15150, 14500, 15800, 14750, 15500, 93.4, ARRAY['National Highway guard rail tenders', 'Auto OEM pre-winter inventory build', 'APL Apollo tube mill expansion']),
('Zinc', 'SHG 99.995%', 'North', 'Dec 2026', 2, 14500, 15800, 14900, 16600, 15250, 16250, 91.8, ARRAY['Pre-budget construction push', 'Transmission tower dispatches', 'Secondary scrap supply tightness']),
('Zinc', 'SHG 99.995%', 'North', 'Jan 2027', 3, 14600, 16200, 15100, 17200, 15500, 16800, 89.2, ARRAY['Post-harvest rural roofing demand', 'Railway electrification milestones']),
('Zinc', 'SHG 99.995%', 'North', 'Feb 2027', 4, 14800, 16500, 15200, 17700, 15700, 17200, 87.5, ARRAY['Union Budget infrastructure capex release', 'Commercial vehicle build rates']),
('Zinc', 'SHG 99.995%', 'North', 'Mar 2027', 5, 15200, 17400, 15900, 18800, 16400, 18200, 86.0, ARRAY['Fiscal year-end project closing', 'Smelter maintenance shutdown buffering']),
('Zinc', 'SHG 99.995%', 'North', 'Apr 2027', 6, 14400, 15600, 14000, 17100, 14600, 16400, 83.5, ARRAY['Q1 monsoon prep stocking', 'Pipes & tubes export orders']),

('Zinc', 'SHG 99.995%', 'West', 'Nov 2026', 1, 18500, 19400, 18600, 20200, 18900, 19850, 94.1, ARRAY['JSW Vasind line ramping', 'POSCO Maharashtra demand', 'Port container congestion deterring imports']),
('Zinc', 'SHG 99.995%', 'West', 'Dec 2026', 2, 18800, 20100, 19100, 21000, 19500, 20600, 92.0, ARRAY['AM/NS Hazira galvanized coil export commitments', 'Gujarat transmission line tenders']),
('Zinc', 'SHG 99.995%', 'West', 'Jan 2027', 3, 19000, 20600, 19400, 21700, 19900, 21200, 88.7, ARRAY['Auto stamping plant ramp', 'Industrial PEB construction surge']),
('Zinc', 'SHG 99.995%', 'West', 'Feb 2027', 4, 19200, 21100, 19600, 22400, 20200, 21850, 86.4, ARRAY['Western DFC freight corridor spur lines', 'Renewable solar racking hot-dip demand']),
('Zinc', 'SHG 99.995%', 'West', 'Mar 2027', 5, 19800, 22300, 20500, 23900, 21200, 23200, 85.0, ARRAY['Fiscal year-end target clearing', 'Steel mill maintenance scheduling']),
('Zinc', 'SHG 99.995%', 'West', 'Apr 2027', 6, 18600, 19900, 18100, 21600, 18800, 20800, 82.8, ARRAY['Seasonal construction moderation', 'Monsoon dock prep']),

('Lead', 'Refined Lead 99.99%', 'South', 'Nov 2026', 1, 8800, 9450, 9000, 9850, 9200, 9680, 93.0, ARRAY['Amara Raja Tirupati plant expansion', 'Exide Hosur 5G telecom battery dispatch', 'UPS battery backup replacement cycle']),
('Lead', 'Refined Lead 99.99%', 'South', 'Dec 2026', 2, 9000, 9800, 9250, 10300, 9500, 10050, 91.2, ARRAY['Data center power backup tenders', 'Two-wheeler replacement battery wave']),
('Lead', 'Refined Lead 99.99%', 'South', 'Jan 2027', 3, 9100, 10100, 9400, 10750, 9700, 10400, 88.5, ARRAY['Solar inverter battery commercial installations', 'Secondary lead smelting curbs']),

('Silver', 'Silver 99.99% Bar', 'South', 'Nov 2026', 1, 52.0, 58.5, 54.0, 62.5, 56.0, 60.5, 95.0, ARRAY['Adani Mundra & Premier Energies cell line expansions', 'TOPCon cell high-silver paste recipe transition', 'Import duty parity favor']),
('Silver', 'Silver 99.99% Bar', 'South', 'Dec 2026', 2, 54.0, 62.0, 56.5, 67.0, 59.0, 64.5, 92.5, ARRAY['MNRE PLI Tranche-II module integration deadlines', 'Industrial electrical contactor orders']),
('Silver', 'Silver 99.99% Bar', 'South', 'Jan 2027', 3, 55.0, 65.2, 58.0, 71.5, 61.0, 68.0, 89.8, ARRAY['HJT high efficiency pilot lines', 'Defense radar avionics assemblies']),

('Cadmium', 'Cadmium 99.99%', 'South', 'Nov 2026', 1, 75.0, 84.0, 78.0, 89.5, 80.5, 87.0, 91.5, ARRAY['HBL Power aviation defense contracts', 'Industrial battery sub-assemblies', 'Electroplating chemicals growth']),
('Cadmium', 'Cadmium 99.99%', 'South', 'Dec 2026', 2, 78.0, 88.5, 81.0, 95.0, 84.0, 91.8, 89.0, ARRAY['Railway signaling backup battery installations', 'Naval submarine auxiliary cell maintenance']);
