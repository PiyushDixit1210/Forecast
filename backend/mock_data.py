"""
Mock and Seed Data for MetalSense AI
Domestic Demand Sensing & Commercial Optimization Platform for Hindustan Zinc Limited (HZL)
Covering Zinc, Lead, Silver, and Cadmium.
"""

from typing import Dict, List, Any
from datetime import datetime, timedelta

METALS = ["Zinc", "Lead", "Silver", "Cadmium"]

GRADES: Dict[str, List[str]] = {
    "Zinc": [
        "SHG Ingot 99.995%",
        "Continuous Galvanizing Grade (CGG)",
        "Jumbo Ingot (1 MT)",
        "Prime Western (PW)",
        "Zinc Die-Casting Alloy (Zamak 3)"
    ],
    "Lead": [
        "Refined Lead 99.99%",
        "Refined Lead 99.97%",
        "Antimonial Lead Alloy (3% Sb)",
        "Lead Sheet / Calcium Alloy"
    ],
    "Silver": [
        "Silver 99.99% Bar (30 kg)",
        "Silver 99.99% Grains (Photovoltaic Grade)",
        "Silver 99.9% Industrial Ingot"
    ],
    "Cadmium": [
        "Cadmium Metal Sticks 99.99%",
        "Cadmium Balls 99.9%",
        "Cadmium Oxide Grade"
    ]
}

REGIONS = ["North", "West", "South", "East"]

SMELTERS = [
    {"name": "Chanderiya Hydro-Smelter", "state": "Rajasthan", "capacity_mtpa": 558000, "metals": ["Zinc", "Lead", "Silver", "Cadmium"]},
    {"name": "Dariba Smelting Complex", "state": "Rajasthan", "capacity_mtpa": 325000, "metals": ["Zinc", "Lead", "Silver"]},
    {"name": "Debari Zinc Smelter", "state": "Rajasthan", "capacity_mtpa": 88000, "metals": ["Zinc", "Cadmium"]},
    {"name": "Pantnagar Metal Plant", "state": "Uttarakhand", "capacity_mtpa": 465000, "metals": ["Zinc", "Lead", "Silver"]}
]

# Real-time exchange prices and benchmarks (Current baseline)
EXCHANGE_TICKERS = {
    "Zinc": {
        "lme": {"price": 2885.50, "unit": "$/MT", "change_pct": 1.42, "status": "Contango ($4.50)"},
        "shfe": {"price": 24350.00, "unit": "RMB/MT", "change_pct": 0.85, "ratio": 8.44},
        "mcx": {"price": 278.40, "unit": "₹/kg", "change_pct": 1.15},
        "cme": {"price": 2892.00, "unit": "$/MT", "change_pct": 1.38},
        "fx_usd_inr": 86.65,
        "physical_premium": {"range": "$125 - $145/MT", "current": 135.0, "mom_change": "+$8/MT"},
        "shfe_lme_arb": "Export Window Closed (Domestic China Neutral to Slight Inflow)",
        "import_parity_inr_mt": 276800.0,
        "hzl_ex_works_inr_mt": 274500.0,
        "parity_cushion_inr": 2300.0 # HZL is ₹2,300/MT cheaper than import
    },
    "Lead": {
        "lme": {"price": 2085.00, "unit": "$/MT", "change_pct": 0.65, "status": "Backwardation ($12.00)"},
        "shfe": {"price": 17200.00, "unit": "RMB/MT", "change_pct": 0.40, "ratio": 8.25},
        "mcx": {"price": 186.20, "unit": "₹/kg", "change_pct": 0.72},
        "cme": {"price": 2090.00, "unit": "$/MT", "change_pct": 0.60},
        "fx_usd_inr": 86.65,
        "physical_premium": {"range": "$95 - $115/MT", "current": 105.0, "mom_change": "+$5/MT"},
        "shfe_lme_arb": "Balanced Arbitrage Window",
        "import_parity_inr_mt": 202500.0,
        "hzl_ex_works_inr_mt": 201000.0,
        "parity_cushion_inr": 1500.0
    },
    "Silver": {
        "lme": {"price": 33.85, "unit": "$/troy oz", "change_pct": 2.15, "status": "Bullish Momentum"},
        "shfe": {"price": 8420.00, "unit": "RMB/kg", "change_pct": 1.90, "ratio": None},
        "mcx": {"price": 96800.00, "unit": "₹/kg", "change_pct": 2.05},
        "cme": {"price": 33.95, "unit": "$/troy oz", "change_pct": 2.20},
        "fx_usd_inr": 86.65,
        "physical_premium": {"range": "$0.40 - $0.55/oz", "current": 0.48, "mom_change": "+$0.06/oz"},
        "shfe_lme_arb": "Solar Paste Inflow Driven by Domestic Mandates",
        "import_parity_inr_mt": 97400000.0, # ~₹97,400/kg
        "hzl_ex_works_inr_mt": 96800000.0,
        "parity_cushion_inr": 600000.0
    },
    "Cadmium": {
        "lme": {"price": 7850.00, "unit": "$/MT", "change_pct": 0.90, "status": "Tight Physical Supply"},
        "shfe": {"price": 64500.00, "unit": "RMB/MT", "change_pct": 0.50, "ratio": 8.21},
        "mcx": {"price": 695.00, "unit": "₹/kg", "change_pct": 0.88},
        "cme": {"price": 7860.00, "unit": "$/MT", "change_pct": 0.92},
        "fx_usd_inr": 86.65,
        "physical_premium": {"range": "$160 - $190/MT", "current": 180.0, "mom_change": "+$12/MT"},
        "shfe_lme_arb": "Tight Scrap Inflows Supporting High Physicals",
        "import_parity_inr_mt": 786500.0,
        "hzl_ex_works_inr_mt": 781000.0,
        "parity_cushion_inr": 5500.0
    }
}

MACRO_DRIVERS = [
    {
        "id": "md-1",
        "sector": "Galvanized Steel",
        "metric_name": "Indian Finished Galvanized/Coated Steel Production",
        "current_value": 1320.0,
        "unit": "kMT / Month",
        "mom_change_pct": 5.4,
        "yoy_change_pct": 11.2,
        "impact_on_zinc": "High Positive",
        "impact_on_lead": "Neutral",
        "impact_on_silver": "Neutral",
        "impact_on_cadmium": "Neutral",
        "commentary": "Mega highway guardrails (Gati Shakti) and railway crash barrier mandates driving record zinc coating usage across Tata Steel, JSW and Jindal lines."
    },
    {
        "id": "md-2",
        "sector": "Auto & EV Batteries",
        "metric_name": "Indian 2W & 4W Automobile Build Rates + EV Auxiliary",
        "current_value": 2480.0,
        "unit": "kUnits / Month",
        "mom_change_pct": 4.1,
        "yoy_change_pct": 8.6,
        "impact_on_zinc": "Moderate Positive",
        "impact_on_lead": "High Positive",
        "impact_on_silver": "Neutral",
        "impact_on_cadmium": "Neutral",
        "commentary": "Festive season replacement demand and telecom tower 5G backup battery upgrades driving steady lead-acid offtake by Exide and Amara Raja."
    },
    {
        "id": "md-3",
        "sector": "Solar Photovoltaics",
        "metric_name": "Domestic Solar PV Cell & Module Manufacturing Run-Rate",
        "current_value": 38.5,
        "unit": "GW Annualized",
        "mom_change_pct": 8.2,
        "yoy_change_pct": 44.0,
        "impact_on_zinc": "Neutral",
        "impact_on_lead": "Neutral",
        "impact_on_silver": "High Positive",
        "impact_on_cadmium": "Moderate Positive",
        "commentary": "Transition from PERC to n-type TOPCon/HJT cells increases silver metallization paste consumption per watt from 10mg to 20mg."
    },
    {
        "id": "md-4",
        "sector": "Infrastructure PLI Schemes",
        "metric_name": "Power Transmission Lines & Green Energy Corridors Built",
        "current_value": 4200.0,
        "unit": "Circuit KM",
        "mom_change_pct": 6.8,
        "yoy_change_pct": 15.3,
        "impact_on_zinc": "High Positive",
        "impact_on_lead": "Neutral",
        "impact_on_silver": "Neutral",
        "impact_on_cadmium": "Neutral",
        "commentary": "TBCB interstate transmission line tenders enforce stringent 86-micron minimum coating thickness, favoring HZL SHG and PW ingots."
    },
    {
        "id": "md-5",
        "sector": "Die-Casting & Hardware",
        "metric_name": "Zamak Alloy Foundry Consumption (Auto & Sanitaryware)",
        "current_value": 34.2,
        "unit": "kMT / Month",
        "mom_change_pct": 2.9,
        "yoy_change_pct": 6.4,
        "impact_on_zinc": "Moderate Positive",
        "impact_on_lead": "Neutral",
        "impact_on_silver": "Neutral",
        "impact_on_cadmium": "Neutral",
        "commentary": "Precision die-casting foundries in Pune and NCR running at 88% capacity for export automotive handles and bathroom fixtures."
    }
]

TOP_IMPORTERS_DATA = [
    {
        "importer": "Tata Steel Limited",
        "plant_location": "Jamshedpur & Kalinganagar",
        "metal": "Zinc",
        "grade": "SHG Ingot 99.995%",
        "volume_mt": 4200.0,
        "origin_country": "South Korea",
        "origin_smelter": "Korea Zinc (Onsan)",
        "port": "JNPT Nhava Sheva",
        "cif_usd": 2980.0,
        "duty_type": "Korea CEPA (0%)",
        "landed_cost_inr": 272500.0,
        "hzl_ex_works_inr": 276700.0,
        "parity_delta_inr": 4200.0, # Import cheaper by 4200 INR/MT
        "substitution_feasibility": "High",
        "strategy": "Match CEPA landed parity with ₹3,500/MT freight rebate from Dariba to Kalinganagar on 12-month volume tie-up."
    },
    {
        "importer": "JSW Steel Coated Products",
        "plant_location": "Vasind, Tarapur & Vijayanagar",
        "metal": "Zinc",
        "grade": "SHG Ingot 99.995%",
        "volume_mt": 3800.0,
        "origin_country": "South Korea",
        "origin_smelter": "Young Poong",
        "port": "Mundra Port",
        "cif_usd": 2975.0,
        "duty_type": "Korea CEPA (0%)",
        "landed_cost_inr": 271900.0,
        "hzl_ex_works_inr": 276700.0,
        "parity_delta_inr": 4800.0,
        "substitution_feasibility": "High",
        "strategy": "Offer Jumbo Ingot format (saves 2.5% melting dross loss) to neutralize price difference."
    },
    {
        "importer": "AM/NS India",
        "plant_location": "Hazira, Gujarat",
        "metal": "Zinc",
        "grade": "Continuous Galvanizing Grade",
        "volume_mt": 2500.0,
        "origin_country": "Kazakhstan",
        "origin_smelter": "Kazzinc",
        "port": "Mundra Port",
        "cif_usd": 2910.0,
        "duty_type": "Basic 7.5% + SWS",
        "landed_cost_inr": 284500.0,
        "hzl_ex_works_inr": 277400.0,
        "parity_delta_inr": -7100.0, # HZL is CHEAPER by 7100 INR/MT
        "substitution_feasibility": "Immediate Win",
        "strategy": "HZL already holds ₹7,100/MT landed advantage due to 7.5% BCD; push spot auction allocation."
    },
    {
        "importer": "POSCO Maharashtra Steel",
        "plant_location": "Vile Bhagad, Mangaon",
        "metal": "Zinc",
        "grade": "SHG Ingot 99.995%",
        "volume_mt": 3100.0,
        "origin_country": "South Korea",
        "origin_smelter": "Korea Zinc",
        "port": "JNPT Nhava Sheva",
        "cif_usd": 2970.0,
        "duty_type": "Korea CEPA (0%)",
        "landed_cost_inr": 271400.0,
        "hzl_ex_works_inr": 276700.0,
        "parity_delta_inr": 5300.0,
        "substitution_feasibility": "Medium",
        "strategy": "Provide just-in-time delivery from HZL Panvel depot with zero port demurrage risk."
    },
    {
        "importer": "Exide Industries Ltd",
        "plant_location": "Hosur & Haldia",
        "metal": "Lead",
        "grade": "Refined Lead 99.99%",
        "volume_mt": 2400.0,
        "origin_country": "South Korea",
        "origin_smelter": "Korea Zinc",
        "port": "Kolkata/Haldia",
        "cif_usd": 2180.0,
        "duty_type": "Korea CEPA (0%)",
        "landed_cost_inr": 199500.0,
        "hzl_ex_works_inr": 201400.0,
        "parity_delta_inr": 1900.0,
        "substitution_feasibility": "High",
        "strategy": "Deploy HZL high-purity 99.995% refined lead with customized bi-monthly consignment stocking."
    },
    {
        "importer": "Amara Raja Energy & Mobility",
        "plant_location": "Tirupati & Divitipally",
        "metal": "Lead",
        "grade": "Refined Lead 99.97%",
        "volume_mt": 2900.0,
        "origin_country": "UAE",
        "origin_smelter": "Gulf Lead Refineries",
        "port": "Chennai Port",
        "cif_usd": 2150.0,
        "duty_type": "Basic 7.5% + SWS",
        "landed_cost_inr": 208200.0,
        "hzl_ex_works_inr": 201900.0,
        "parity_delta_inr": -6300.0,
        "substitution_feasibility": "Immediate Win",
        "strategy": "Capture 100% volume by expanding Dariba dedicated rake logistics direct to Tirupati siding."
    },
    {
        "importer": "Adani Solar (Mundra)",
        "plant_location": "Mundra SEZ, Gujarat",
        "metal": "Silver",
        "grade": "Silver 99.99% Grains",
        "volume_mt": 42.5,
        "origin_country": "China",
        "origin_smelter": "Jiangxi Copper / Yuguang Gold & Lead",
        "port": "Mundra Port",
        "cif_usd": 1085000.0, # ~$1,085/kg or $33.75/oz
        "duty_type": "Advance Authorization (0%)",
        "landed_cost_inr": 95800000.0,
        "hzl_ex_works_inr": 96800000.0,
        "parity_delta_inr": 1000000.0,
        "substitution_feasibility": "High",
        "strategy": "Provide Pantnagar certified low-oxygen silver powder/grain batch trace for ALMM compliance."
    },
    {
        "importer": "HBL Power Systems",
        "plant_location": "Hyderabad / VSEZ",
        "metal": "Cadmium",
        "grade": "Cadmium Metal Sticks 99.99%",
        "volume_mt": 85.0,
        "origin_country": "China",
        "origin_smelter": "Huludao Zinc",
        "port": "Chennai Port",
        "cif_usd": 8100.0,
        "duty_type": "Basic 7.5% + SWS",
        "landed_cost_inr": 785000.0,
        "hzl_ex_works_inr": 781000.0,
        "parity_delta_inr": -4000.0,
        "substitution_feasibility": "Immediate Win",
        "strategy": "HZL Debari by-product has local purity certification advantage for defense aviation cell certification."
    }
]

MARKET_INTELLIGENCE_FEED = [
    {
        "id": "mi-1",
        "timestamp": "2026-10-24T18:30:00Z",
        "time_ago": "2 hours ago",
        "source": "Fastmarkets MB",
        "headline": "European Smelter Nyrstar Extends Antwerp Zinc Curtailment Amid High Winter Power Tariffs",
        "summary": "Nyrstar confirmed its 315ktpa Balen-Overpelt zinc facility in Belgium will maintain a 50% capacity cap through Q1 2027 due to European grid spark spreads. Spot physical premiums in Rotterdam jumped $15 to $190/MT.",
        "impact_score": 0.82,
        "sentiment": "Bullish",
        "affected_metal": "Zinc",
        "affected_sectors": ["Galvanized Steel", "Global Smelting"],
        "recommendation": "Raise domestic spot auction floor premium by $8-10/MT; European export arbitrage window is opening for HZL West Coast shipments."
    },
    {
        "id": "mi-2",
        "timestamp": "2026-10-24T15:00:00Z",
        "time_ago": "5 hours ago",
        "source": "DGTR Ministry of Commerce",
        "headline": "India Initiates Anti-Dumping Probe on Coated Steel Imports from Vietnam and Korea",
        "summary": "The Directorate General of Trade Remedies accepted petition from Indian primary steel producers alleging dumping of galvanized/galvalume coils. Potential 12-18% duties would bolster domestic steel line utilization.",
        "impact_score": 0.78,
        "sentiment": "Bullish",
        "affected_metal": "Zinc",
        "affected_sectors": ["Galvanized Steel", "Infrastructure PLI"],
        "recommendation": "Domestic zinc consumption in Western & Eastern steel belts expected to surge +7% over next quarter. Lock in LTC commitments with Tata Steel & JSW before secondary market tightens."
    },
    {
        "id": "mi-3",
        "timestamp": "2026-10-24T06:15:00Z",
        "time_ago": "14 hours ago",
        "source": "LME Warehouse Notice",
        "headline": "LME Port Klang & Singapore Zinc On-Warrant Stocks Drop 18,500 MT in Single Session",
        "summary": "Canceled warrants surged to 34% of total inventory, signaling aggressive metal drawdowns destined for Southeast Asian and South Asian infrastructure consumers. Spreads widened into $14 backwardation.",
        "impact_score": 0.65,
        "sentiment": "Bullish",
        "affected_metal": "Zinc",
        "affected_sectors": ["Galvanized Steel", "Die-Casting/Zamak"],
        "recommendation": "Recommend holding 15% of November production in prompt spot auction pool to capture backwardation spike."
    },
    {
        "id": "mi-4",
        "timestamp": "2026-10-23T19:40:00Z",
        "time_ago": "1 day ago",
        "source": "Ministry of New & Renewable Energy (MNRE)",
        "headline": "ALMM Solar Cell Mandate Takes Effect: Domestic Module Makers Required 100% Indian Wafer/Cell Sourcing",
        "summary": "The ALMM list revision mandates 18GW of domestic TOPCon/HJT cell assembly, requiring high-purity silver metallization paste formulated from certified domestic 99.99% silver grain.",
        "impact_score": 0.92,
        "sentiment": "Bullish",
        "affected_metal": "Silver",
        "affected_sectors": ["Solar PV", "Green Hydrogen"],
        "recommendation": "Direct Pantnagar refinery output towards certified high-purity silver grain for solar paste formulators (Heraeus India, Solamet); premium realization potential +$0.15/oz above MCX parity."
    },
    {
        "id": "mi-5",
        "timestamp": "2026-10-23T11:20:00Z",
        "time_ago": "1 day ago",
        "source": "Bloomberg Commodity",
        "headline": "South Korean Smelter Korea Zinc Reaches Full Output at Onsan Following Debottlenecking",
        "summary": "Korea Zinc lifted output guidance by 45,000 MT/year. Shipments under India-Korea CEPA (zero duty) to Nhava Sheva and Mundra ports slated to increase in Nov-Dec.",
        "impact_score": -0.58,
        "sentiment": "Bearish",
        "affected_metal": "Zinc",
        "affected_sectors": ["Galvanized Steel", "Automotive"],
        "recommendation": "Defensive pricing required in West India (Mumbai/Pune/Gujarat). Expand regional freight discount for JSW Vasind and POSCO Maharashtra to maintain 85%+ wallet share."
    },
    {
        "id": "mi-6",
        "timestamp": "2026-10-22T14:10:00Z",
        "time_ago": "2 days ago",
        "source": "Battery Review Asia",
        "headline": "Lead-Acid Telecom Tower Backup Replacement Cycles Accelerate Across Tier-2/3 Indian 5G Rollout",
        "summary": "Indus Towers and ATC announce ₹1,800 Cr capex for 2V industrial lead-acid cell replacements. Exide and Amara Raja report 14% uptick in stationary battery order books.",
        "impact_score": 0.71,
        "sentiment": "Bullish",
        "affected_metal": "Lead",
        "affected_sectors": ["Auto/EV Batteries", "Telecom Infrastructure"],
        "recommendation": "Prioritize refined lead 99.99% allocation to Hosur and Tirupati plants; tighten payment credit terms from 45 to 30 days."
    },
    {
        "id": "mi-7",
        "timestamp": "2026-10-22T08:00:00Z",
        "time_ago": "2 days ago",
        "source": "Fastmarkets Minor Metals",
        "headline": "Global Cadmium Ingot Inventories Tighten as Ni-Cd Aviation and Defense Battery Demand Rises",
        "summary": "Airbus and defense aviation suppliers increase long-term procurement of high-density sintered plate nickel-cadmium batteries. Cadmium 99.99% sticks benchmark reaches $3.60/lb in Rotterdam.",
        "impact_score": 0.64,
        "sentiment": "Bullish",
        "affected_metal": "Cadmium",
        "affected_sectors": ["Auto/EV Batteries", "Defense & Aerospace"],
        "recommendation": "Debari cadmium by-product yields can be fully monetized through dedicated B2B auctions for defense vendors at ₹710/kg."
    }
]


# =============================================================================
# RECENT GEOPOLITICAL, WAR & SUPPLY-SHOCK SCENARIOS (2024-2026)
# =============================================================================

GEOPOLITICAL_SCENARIOS = [
    {
        "id": "scenario-red-sea",
        "name": "Red Sea Crisis & Houthi Maritime Blockade",
        "category": "War & Maritime Disruption",
        "period": "2024 - 2026",
        "headline": "Houthi Attacks Force Cape Rerouting: Ocean Freight Jumps 240%, Delaying Seaborne Metal Imports into Indian Ports",
        "summary": "Attacks on commercial vessels transiting the Bab el-Mandeb strait forced major shipping lines to reroute around Africa's Cape of Good Hope (+14 to 21 transit days). Container and breakbulk freight from Asia/Europe to Indian West Coast ports (JNPT, Mundra) jumped from $45/MT to $125/MT with severe bunker surcharges.",
        "affected_metals": ["Zinc", "Lead"],
        "shocks": {
            "freight_rate_usd_delta": 80.0,
            "import_landed_cost_delta_inr": 6800.0,
            "hzl_parity_cushion_delta_inr": 4800.0,
            "spot_premium_usd_delta": 24.0,
            "demand_growth_delta_pct": 3.8,
            "recommended_ltc_share_pct": 55, # Shift to 45% Spot to harvest high premiums
            "recommended_spot_share_pct": 45,
            "ebitda_impact_crores": 36.8
        },
        "causal_chain": [
            {"step": "1. Geopolitical Trigger", "detail": "Houthi missile attacks on Red Sea shipping routes in Bab el-Mandeb."},
            {"step": "2. Maritime Shock", "detail": "Vessel bypass around Cape of Good Hope adds 18 days & $80/MT freight surcharge."},
            {"step": "3. Indian Port Impact", "detail": "Seaborne imports of Korean & Kazakh zinc/lead delayed by 3 weeks at JNPT/Mundra."},
            {"step": "4. Landed Parity Expansion", "detail": "Seaborne landed cost surges by ₹6,800/MT, granting HZL massive domestic pricing power."},
            {"step": "5. HZL Tactical Action", "detail": "Lift spot auction reserve premiums by $24/MT; divert 10% volume from LTC to prompt B2B auctions."}
        ],
        "desk_directive": "Seaborne import parity has deteriorated for foreign competitors. Increase domestic spot auction volume allocation to 45% and raise reserve premium floor by $22-$25/MT. Steel mills (JSW, Tata) cannot risk production halts and will pay prompt premium for direct rake dispatches from Chanderiya/Dariba."
    },
    {
        "id": "scenario-middle-east-silver",
        "name": "Middle East Escalation & Safe-Haven Flight to Silver",
        "category": "Geopolitical War & Precious Metal Surge",
        "period": "2024 - 2026",
        "headline": "Regional War Escalation Triggers Safe-Haven Bullion Flight: Silver Surges Above $34/oz, MCX Crosses ₹98,000/kg",
        "summary": "Direct missile exchanges and tensions over Persian Gulf energy lifelines triggered aggressive institutional and central bank safe-haven allocation into precious metals. Silver dramatically outperformed gold as the Gold-to-Silver ratio compressed from 88:1 to 72:1, driven simultaneously by military electronics and solar TOPCon paste consumption.",
        "affected_metals": ["Silver"],
        "shocks": {
            "lme_silver_usd_oz": 34.20,
            "mcx_silver_inr_kg": 98500.0,
            "physical_premium_usd_oz_delta": 0.18,
            "import_duty_disincentive": "High",
            "demand_growth_delta_pct": 7.4,
            "recommended_ltc_share_pct": 40,
            "recommended_spot_share_pct": 60,
            "ebitda_impact_crores": 142.5
        },
        "causal_chain": [
            {"step": "1. Geopolitical Trigger", "detail": "Middle East conflict escalation & threat to Persian Gulf maritime chokepoints."},
            {"step": "2. Market Flight", "detail": "Macro investors & sovereign funds buy COMEX/LBMA physical silver bars for hedging."},
            {"step": "3. Indian Currency / Duty Impact", "detail": "Importing bullion becomes exorbitant under standard customs tariff."},
            {"step": "4. Downstream Surge", "detail": "Indian solar module fabricators under ALMM face urgent need for domestic certified 99.99% silver grain."},
            {"step": "5. HZL Tactical Action", "detail": "Maximize Pantnagar silver refinery throughput; sell 60% on weekly spot e-auctions at premium +$0.65/oz."}
        ],
        "desk_directive": "With MCX Silver sustaining above ₹98,000/kg, industrial silver buyers (solar cell fabricators, electrical contactor makers) face extreme working capital stress. Shift from 60-day credit to 100% advance B2B e-auctions with ₹500/kg prompt cash discount to secure instantaneous liquidity and lock in peak NSR."
    },
    {
        "id": "scenario-smelter-energy-shock",
        "name": "European Winter Power Crisis & Smelter Curtailments",
        "category": "Energy Crisis & Supply Destruction",
        "period": "2024 - 2025",
        "headline": "European Power Spark Spreads Force Nyrstar & Glencore Curtailments: 450ktpa Refined Zinc Capacity Throttled",
        "summary": "Winter natural gas volatility and elevated grid power tariffs forced Nyrstar (Balen & Budel) and Glencore (Nordenham) to idle 45-50% of European zinc smelting capacity. Rotterdam physical premiums escalated to +$220/MT, tightening LME global on-warrant inventories and blowing out cash-to-three-month spreads.",
        "affected_metals": ["Zinc", "Cadmium"],
        "shocks": {
            "lme_price_delta_pct": 8.5,
            "rotterdam_premium_usd": 220.0,
            "fob_export_netback_usd_delta": 45.0,
            "export_arbitrage_viable": True,
            "recommended_ltc_share_pct": 60,
            "recommended_spot_share_pct": 20,
            "recommended_export_share_pct": 20,
            "ebitda_impact_crores": 54.0
        },
        "causal_chain": [
            {"step": "1. Energy Trigger", "detail": "European wholesale power peaks above €180/MWh, making electrolytic zinc refining uneconomic."},
            {"step": "2. European Smelter Idling", "detail": "Nyrstar and Glencore halt lines, wiping out ~450,000 MT of European refined slab supply."},
            {"step": "3. Global Inventory Drawdown", "detail": "LME registered warehouse warrants drop to historical lows in Antwerp & Rotterdam."},
            {"step": "4. Arbitrage Window Opens", "detail": "European delivered premiums (+ $220/MT) exceed Indian domestic netbacks for the first time in 18 months."},
            {"step": "5. HZL Tactical Action", "detail": "Route 20% of Chanderiya production to Kandla/Mundra ports for breakbulk export to Antwerp/Rotterdam."}
        ],
        "desk_directive": "Export arbitrage window is open for West Coast dispatches. Book 7,000 MT/month for export to Northern Europe capturing FOB netback of $2,985/MT, while maintaining domestic LTC commitments in North and West India at +$145/MT physical premium."
    },
    {
        "id": "scenario-tc-squeeze-mine-closure",
        "name": "Global Zinc Mine Squeeze & Negative Concentrate TCs",
        "category": "Raw Material Deficit & Captive Mine Advantage",
        "period": "2024 - 2026",
        "headline": "Tara & Cobre Panama Shuts Plunge Spot Treatment Charges (TCs) Below $10/dmt: Non-Integrated Smelters Bleed",
        "summary": "Unprecedented global zinc concentrate deficit caused by mine suspensions (Tara mine in Ireland on care & maintenance, Cobre Panama shutdown, Almina delays) plunged benchmark spot Treatment Charges (TCs) from $250/dmt down to single digits ($0 to $10/dmt). Custom smelters in China and Europe without captive mines operate at negative cash margins and throttle production.",
        "affected_metals": ["Zinc", "Lead", "Silver"],
        "shocks": {
            "custom_smelter_cost_inr_delta": 9500.0,
            "hzl_cost_advantage_rank": "Lowest Decile Globally (<$1,100/MT COP)",
            "captive_mine_self_sufficiency": "100%",
            "spot_premium_usd_delta": 18.0,
            "market_share_gain_pct": 4.5,
            "ebitda_impact_crores": 88.2
        },
        "causal_chain": [
            {"step": "1. Mining Shock", "detail": "Global mine suspensions take 600kt of contained zinc concentrate offline."},
            {"step": "2. TC Collapse", "detail": "Spot treatment charges collapse to zero; custom smelters lose $120 on every ton of metal processed."},
            {"step": "3. Foreign Competitor Retraction", "detail": "Chinese & South Korean custom smelters cut export quotas to conserve cash."},
            {"step": "4. HZL Captive Mine Leverage", "detail": "HZL's Rampura Agucha & Sindesar Khurd mines feed 100% captive ore at lowest decile cash cost."},
            {"step": "5. HZL Commercial Capture", "detail": "Expand domestic wallet share across JSW and AM/NS from 70% to 88% on guaranteed supply security."}
        ],
        "desk_directive": "HZL's 100% captive mine integration is the ultimate competitive moat. Pitch long-term 24-month supply certainty to top domestic galvanizers who fear foreign smelter contract defaults. Lock in 80% LTC commitments with zero price concession."
    },
    {
        "id": "scenario-russian-sanctions",
        "name": "Russian Metal Sanctions & Bilateral Trade Rerouting",
        "category": "Sanctions & Trade Diversion",
        "period": "2024 - 2026",
        "headline": "US/UK Ban on Russian Metal Deliveries to LME & CME Reroutes Secondary Scrap & Lead Flows to Asia",
        "summary": "US Treasury and UK Government banned deliveries of Russian-origin metals produced after April 13, 2024 to LME and CME warehouses. Russian secondary lead, silver, and zinc were diverted into non-aligned Asian markets including India, creating localized price distortion in unorganized secondary battery scrap.",
        "affected_metals": ["Lead", "Silver", "Zinc"],
        "shocks": {
            "secondary_scrap_discount_pct": 6.5,
            "primary_metal_premium_protection": "High Purity 99.99% Mandatory",
            "demand_growth_delta_pct": -1.2, # Pressure on secondary grades
            "recommended_ltc_share_pct": 75,
            "recommended_spot_share_pct": 25,
            "ebitda_impact_crores": 18.5
        },
        "causal_chain": [
            {"step": "1. Sanction Enforcement", "detail": "LME/CME delists warranting of Russian-origin base and precious metals."},
            {"step": "2. Trade Flow Diversion", "detail": "Russian secondary lead and bullion ingots enter Indian merchant traders via UAE/Central Asia."},
            {"step": "3. Price Distortion", "detail": "Secondary recycled battery lead price dips by 6.5%, enticing cost-conscious battery makers."},
            {"step": "4. Quality Counter-Offensive", "detail": "HZL deploys BIS purity compliance and battery-grade low-antimony certifications."},
            {"step": "5. HZL Tactical Action", "detail": "Tie up Exide & Amara Raja on primary 99.99% pure refined lead contracts with guaranteed dross-free warranties."}
        ],
        "desk_directive": "Do not compete on price with discounted Russian secondary lead ingots. Position HZL 99.99% refined lead as mandatory for EV auxiliary and 5G telecom warranties where secondary lead failure causes catastrophic battery plate sulfation."
    }
]
