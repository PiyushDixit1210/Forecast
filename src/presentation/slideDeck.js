/**
 * Executive Pitch Deck Slides Content and Metadata
 * Designed for C-Suite Presentation (Higher Management & SPOC Aashutosh Dixit)
 */

export const SLIDES_DATA = [
  {
    id: 1,
    title: "Zinc, Lead & Silver Demand Sensing for Domestic Market",
    subtitle: "AI-Augmented Commercial Intelligence, Preemptive Import Defense & Dynamic Pricing Cockpit",
    tag: "EXECUTIVE STRATEGY PITCH | AI HACKATHON 2026",
    presenter: "Sponsor / SPOC: Aashutosh Dixit (Marketing Intelligence) | For: Executive Committee & Higher Management",
    layout: "title",
    kpis: [
      { label: "Target EBITDA Uplift", value: "+₹235–305 Cr", sub: "Annualized across 3 metals" },
      { label: "Domestic Premium Lift", value: "+1.2% to 1.8%", sub: "Sensed elasticity capture" },
      { label: "Import Leakage Defense", value: "38,000+ MT", sub: "Retained high-margin volume" },
      { label: "Payback Period", value: "< 3 Months", sub: "> 12x 1st-Year ROI" }
    ],
    speakerNotes: "Welcome, Board members and Commercial Leadership. Today we present Project SENSE-METAL: an enterprise-grade AI Demand Sensing platform designed specifically for Hindustan Zinc's domestic market dominance across Zinc, Lead, and Silver. By replacing retrospective spreadsheets with real-time multi-signal intelligence, this solution unlocks over ₹250 Crores in annualized EBITDA while defending our domestic market share against aggressive zero-duty imports."
  },
  {
    id: 2,
    title: "The Strategic Dilemma: Why Current Methods Leave Value Behind",
    subtitle: "Fragmented Data, Retrospective Adjustments & The High Cost of Commercial Latency",
    tag: "THE PROBLEM STATEMENT",
    layout: "split-comparison",
    leftHeader: "What Happens Today (The Fragmented Reality)",
    leftPoints: [
      "Fragmented Data Silos: Sales, import customs manifests, customer grade orders, and LME/MCX feeds reside in separate disconnected trackers.",
      "Retrospective Pricing: Domestic premiums are benchmarked and reset fortnightly using backward-looking trader scuttlebutt, missing localized spot shortages.",
      "Import Parity Surprises: Zero-duty FTA imports from South Korea & Japan enter Nhava Sheva/Mundra before marketing teams can deploy tactical pricing defenses.",
      "Arbitrary Channel Allocation: Split between annual MoUs, spot sales, and e-auctions is dictated by static habit rather than market liquidity sensing."
    ],
    rightHeader: "Strategic Consequences & Financial Drag",
    rightPoints: [
      "₹180–250+ Cr Unmonetized Margin: Domestic premium increases missed during unexpected domestic steel galvanizing or solar surges.",
      "Market Share Erosion: Customers substitute domestic primary metal with imports due to delayed parity price adjustments.",
      "E-Auction Sentiment Risks: Auctions executed during low spot liquidity crash spot premiums across entire regional depots.",
      "Working Capital Inefficiencies: Excess inventory stuck in transit from Chanderiya/Dariba to regional depots without forward demand sensing."
    ],
    speakerNotes: "Today, our commercial marketing teams face a fragmented operational battlefield. Import manifests arrive late; customer requirements by grade are tracked manually; and our domestic premium adjustments are often retrospective. When South Korean zinc lands at Nhava Sheva with zero duty under the FTA, we often react after customer purchase orders have already been placed. Our solution transforms this posture from reactive defense to predictive offense."
  },
  {
    id: 3,
    title: "The Unified Market Sensing Signal Fabric",
    subtitle: "Ingesting 40+ Internal & External Real-Time Signals Across 4 Critical Pillars",
    tag: "DATA FOUNDATION",
    layout: "pillars",
    pillars: [
      {
        name: "Pillar 1: Macro & Government",
        icon: "landmark",
        badge: "Policy Vectors",
        signals: [
          "National Infrastructure Pipeline (NIP) & Gati Shakti Capex",
          "MNRE Solar PLI Module Capacity Additions (Silver Metallization)",
          "National Mission on ACC Batteries & EV Subsidies (Lead)",
          "BIS Mandatory Coating Thickness Norms for Steel Sheets"
        ]
      },
      {
        name: "Pillar 2: Downstream Demand",
        icon: "factory",
        badge: "Consumption Signals",
        signals: [
          "JPC Steel Galvanizing run-rates (Tata, JSW, AM/NS, Jindal)",
          "SIAM Automotive Vehicle Production (PV, CV & 2W battery cycles)",
          "Telecom Tower Infrastructure (Inverter & Backup Battery off-take)",
          "Real Estate & Industrial Housing Starts (General Galvanizing)"
        ]
      },
      {
        name: "Pillar 3: Upstream & Supply",
        icon: "layers",
        badge: "Global Smelting",
        signals: [
          "Global Smelter Benchmark Treatment & Refining Charges (TC/RCs)",
          "Chinese Smelter Power Curtailments (Yunnan, Inner Mongolia)",
          "Daily Port Bill-of-Lading Customs Inflow Manifests",
          "Secondary Lead & Zinc Scrap Spreads vs. Primary Bullion"
        ]
      },
      {
        name: "Pillar 4: Exchanges & Arbitrage",
        icon: "trending-up",
        badge: "Financial & Logistics",
        signals: [
          "LME 3-Month, Cash, & Warehouse Cancelled Warrants",
          "MCX Domestic Basis Spreads & CME Silver Futures Spreads",
          "SHFE-LME Import Arbitrage Ratio (China Inflow/Outflow)",
          "Shanghai Containerized Freight Index (SCFI) & Baltic Dry"
        ]
      }
    ],
    speakerNotes: "The core strength of our AI engine is its unified ingestion fabric. We synthesize data across four distinct operational dimensions: Macro and government infrastructure capex; downstream real consumption from steel, auto, and solar; upstream smelting bottlenecks including Chinese power curbs and TC/RC charges; and multi-exchange financial spreads across LME, MCX, and freight routes."
  },
  {
    id: 4,
    title: "End-to-End AI Demand Sensing Architecture",
    subtitle: "Multi-Horizon Hybrid Ensemble with Strict Human-in-the-Loop Governance",
    tag: "TECHNOLOGY & ML PIPELINE",
    layout: "architecture",
    steps: [
      {
        phase: "01. Signal Ingestion",
        desc: "Automated ETL connectors to SAP S/4HANA, Customs Port EDI, ICEGATE, Fastmarkets, Platts, LME, & MCX APIs."
      },
      {
        phase: "02. Feature Engineering",
        desc: "Lead-lag cross-correlations, seasonal decomposition (monsoon dips, Diwali jewelry peaks), and landed parity vectors."
      },
      {
        phase: "03. Hybrid AI Models",
        desc: "Temporal Fusion Transformers (TFT) for time-series forecasting + LightGBM Quantile Regressors for P10/P50/P90 probability bands."
      },
      {
        phase: "04. Optimization Engine",
        desc: "Linear programming allocation optimizer & dynamic premium recommender balancing revenue vs. customer retention."
      },
      {
        phase: "05. Executive Cockpit",
        desc: "Human-in-the-loop decision cockpit: commercial leaders review, simulate scenarios, and approve with logged rationale."
      }
    ],
    callout: "COMPLIANCE WITH CLIENT MANDATE: The solution provides decision support, simulation, and predictive clarity. It strictly preserves human authority—zero automated order execution without executive authorization.",
    speakerNotes: "Here is our technological blueprint. We do not use a single simplistic statistical model. We deploy an ensemble of Temporal Fusion Transformers and Quantile Regressors that yield not just a single forecast number, but probabilistic bounds (P10 Bearish, P50 Base, P90 Bullish). Crucially, adhering strictly to the problem brief: the system supports human decision-making and does not automate final commercial execution."
  },
  {
    id: 5,
    title: "TAM vs. SAM Granular Market Framework",
    subtitle: "Precise Market Sizing & White Space Identification Across Grades & Customer Tiers",
    tag: "MARKET SEGMENTATION",
    layout: "tam-sam",
    metalsBreakdown: [
      {
        name: "Zinc (Zn)",
        tam: "1,150,000 MT/Yr",
        sam: "940,000 MT/Yr",
        hzlCapture: "734,000 MT/Yr (78% of SAM)",
        whiteSpace: "206,000 MT/Yr (Imported FTA Galvanizing Grades & Die-Casting)",
        grades: "SHG (99.995%), CGG Jumbo, Prime Western, ZA-12/27 Alloys"
      },
      {
        name: "Lead (Pb)",
        tam: "1,220,000 MT/Yr",
        sam: "504,000 MT/Yr (Primary)",
        hzlCapture: "378,000 MT/Yr (75% of SAM)",
        whiteSpace: "126,000 MT/Yr (Lost to secondary scrap recycling & regional imports)",
        grades: "Refined 99.99%, Refined 99.97%, Antimonial & Calcium Alloys"
      },
      {
        name: "Silver (Ag)",
        tam: "7,300,000 kg/Yr",
        sam: "3,360,000 kg/Yr (Industrial)",
        hzlCapture: "864,000 kg/Yr (100% of Dom. Prim.)",
        whiteSpace: "2,496,000 kg/Yr (Imported via CEPA UAE 0-duty & London Good Delivery)",
        grades: "30kg 99.99% Ingots, High-Purity Granules, Sub-micron Pastes"
      }
    ],
    speakerNotes: "A critical executive requirement from the brief is establishing crystal-clear TAM and SAM visibility. In Zinc, our TAM is 1.15 million tonnes, but our SAM focuses on primary grades where we can command premiums. In Lead, we differentiate between secondary scrap competition and premium OEM battery requirements. In Silver, where HZL is India's sole primary producer, our primary target is capturing the surging solar PV metallization paste sector which is currently dominated by imported silver."
  },
  {
    id: 6,
    title: "Import Radar & Landed Parity Early-Warning System",
    subtitle: "Predicting Landed Costs & Port Arbitrage 45–60 Days Ahead of Vessel Discharge",
    tag: "COMPETITIVE ARBITRAGE DEFENSE",
    layout: "import-radar",
    keyInsights: [
      {
        port: "Nhava Sheva (JNPT)",
        status: "CRITICAL RISK",
        issue: "South Korean FTA (0% Duty) landed cost is $18/t below HZL delivered price in Pune/Maharashtra clusters.",
        action: "Model triggers tactical regional freight incentive to preserve 8,500 MT monthly anchor off-take."
      },
      {
        port: "Mundra Port",
        status: "ELEVATED RISK",
        issue: "Japanese CEPA imports landing at parity with Chanderiya ex-works + freight in North-West industrial zones.",
        action: "Recommend maintaining premium hold at $145/t; monitor vessel booking manifests."
      },
      {
        port: "Ahmedabad / GIFT City (Silver)",
        status: "ARBITRAGE ALERT",
        issue: "UAE CEPA quota silver entering with 1% tariff concession (₹1,200/kg cheaper than MCX parity).",
        action: "Allocate customized 99.99% granule tranches directly to solar cell makers to negate bullion arbitrage."
      }
    ],
    speakerNotes: "Our Import Radar is HZL's early warning shield. Because shipping transit from East Asia takes 20 to 30 days, and customs filings occur days prior to discharge, our model ingests bill-of-lading tracking to predict port landed costs 45 to 60 days ahead. When South Korean metal approaches Nhava Sheva with zero duty, the system alerts the marketing head immediately, recommending targeted freight discounts to keep customer orders at HZL."
  },
  {
    id: 7,
    title: "Explainable AI (XAI): Transparent SHAP Driver Attribution",
    subtitle: "Eliminating 'Black Box' AI with Transparent Mathematical Driver Breakdown",
    tag: "EXPLAINABLE INTELLIGENCE",
    layout: "explainability",
    driversBreakdown: [
      { factor: "Domestic Steel Galvanizing Run-rate", delta: "+$14.2 / MT", rationale: "Surge in automotive galvanizing line capacity utilization (JPC Data)." },
      { factor: "National Infra & Highway Capex (NIP)", delta: "+$8.5 / MT", rationale: "Fast-tracked crash barrier and transmission tower procurement orders." },
      { factor: "China Smelter Power Caps & Low TC/RCs", delta: "+$6.3 / MT", rationale: "Tight concentrate market curbs Chinese export surplus on SHFE." },
      { factor: "Container Ocean Freight Spikes", delta: "+$4.8 / MT", rationale: "Higher shipping rates increase landed costs of foreign competitors." },
      { factor: "Korean FTA Zero-Duty Inflow Threat", delta: "-$11.6 / MT", rationale: "Increased vessel bookings identified entering Nhava Sheva." },
      { factor: "Secondary Scrap Spread Compression", delta: "-$4.2 / MT", rationale: "Local scrap recyclers discounting secondary ingots in northern clusters." }
    ],
    netResult: "Net Recommended Premium Shift: +$18.0 / MT (Recommended Benchmark: $163/MT)",
    speakerNotes: "Leadership will rightly ask: 'Why should we trust this model's pricing advice?' Here is our answer: complete explainability. For every dollar of recommended premium change, the model provides an exact SHAP-value attribution waterfall. As shown here, commercial managers can see exactly how much of the adjustment is driven by steel run-rates, how much by freight rates, and the mitigating impact of Korean import threats."
  },
  {
    id: 8,
    title: "The Three Commercial Decision Cockpits",
    subtitle: "Optimizing Allocation, Auction Timing & Dynamic Pricing for Sales Leadership",
    tag: "DECISION SUPPORT COCKPITS",
    layout: "cockpits",
    cockpits: [
      {
        title: "Cockpit 1: Dynamic Premium Advisor",
        focus: "Fortnightly & Monthly Price Setting",
        description: "Calculates the Parity Elasticity Margin for each customer cluster and product grade (SHG, CGG, PW). Recommends the exact domestic premium that captures maximum margin without triggering import substitution."
      },
      {
        title: "Cockpit 2: Tri-Channel Volume Allocation",
        focus: "MoU vs. Spot vs. E-Auction Optimization",
        description: "Dynamically distributes available monthly production across Annual Contracts (guaranteed cashflow & high SLA), Monthly Spot (high elasticity capture), and E-Auctions, maximizing blended average realization."
      },
      {
        title: "Cockpit 3: E-Auction Reserve Price & Timing",
        focus: "Liquidity Sensing & Lot Size Optimization",
        description: "Senses spot market liquidity before launching auction tranches. Recommends floor prices, optimal auction dates (e.g., avoiding post-LME settlement dips), and tranche sizes to prevent crashing spot sentiment."
      }
    ],
    speakerNotes: "The model translates intelligence into three operational cockpits for the marketing team. Cockpit 1 sets the optimal domestic premium by cluster. Cockpit 2 optimizes channel allocation—ensuring we do not over-commit to low-premium contracts when spot demand is booming. Cockpit 3 governs our e-auctions, advising the exact reserve price and timing so our auctions enhance realization rather than cannibalizing baseline sales."
  },
  {
    id: 9,
    title: "Quantified Business Case & Executive ROI",
    subtitle: "Delivering +₹235 to ₹305 Cr in Incremental Annualized EBITDA to HZL",
    tag: "FINANCIAL IMPACT & VALUE CREATION",
    layout: "financial-roi",
    impactItems: [
      {
        stream: "Dynamic Premium Optimization",
        value: "+₹150 Cr / Year",
        basis: "Capturing an average incremental $11/MT on 1.1M MT domestic zinc & lead volume through predictive spot pricing."
      },
      {
        stream: "Preemptive Import Defense",
        value: "+₹65 Cr / Year",
        basis: "Retaining 38,000 MT of high-margin galvanizing customer volume via early parity adjustments."
      },
      {
        stream: "Silver High-Tech Solar Moat",
        value: "+₹25 Cr / Year",
        basis: "Capturing 25% of India's surging solar PV metallization paste silver demand with customized granule pricing."
      },
      {
        stream: "Working Capital & Transit Savings",
        value: "+₹30 Cr / Year",
        basis: "Reducing regional depot holding inventory by 6.2 days via accurate forward demand sensing."
      }
    ],
    totalEbitda: "+₹270 Cr / Year (Mid-point Estimate)",
    payback: "Payback Period: 2.8 Months | Year-1 Net ROI: 12.4x",
    speakerNotes: "Let us examine the financial returns. On a conservative basis, capturing an additional 1.2% to 1.5% in premium realization yields ₹150 Crores annually. Defending 38,000 tonnes of galvanizing customer volume against foreign dumping delivers another ₹65 Crores. Securing the high-growth solar silver market adds ₹25 Crores, and optimizing depot inventory saves ₹30 Crores in carrying costs. In total, this represents a ₹270 Crore annual EBITDA uplift against a modest implementation cost, delivering full payback in under three months."
  },
  {
    id: 10,
    title: "Enterprise Delivery Roadmap & Executive Action Plan",
    subtitle: "24-Week Rapid Implementation Plan with Milestone-Gated Governance",
    tag: "EXECUTION & ROADMAP",
    layout: "roadmap",
    milestones: [
      {
        phase: "Phase 1: Pilot Sprint (Weeks 1–8)",
        focus: "Zinc Galvanizing Sector & Western Ports",
        deliverables: "Ingest SAP S/4HANA & ICEGATE customs feeds. Deploy baseline TFT model for Zinc SHG/CGG across 5 key steel clusters. Validate against historical actuals."
      },
      {
        phase: "Phase 2: Full Scale (Weeks 9–16)",
        focus: "Lead, Silver & Channel Allocation",
        deliverables: "Integrate secondary battery scrap feeds and solar PV cell trackers. Deploy Tri-Channel Allocation and E-Auction Reserve Optimizer."
      },
      {
        phase: "Phase 3: Operationalization (Weeks 17–24)",
        focus: "Enterprise Integration & Change Management",
        deliverables: "Marketing team enablement, executive tablet dashboards, automated retrain pipeline, and governance audit trail sign-off."
      }
    ],
    nextSteps: "Immediate Next Step: Approval for Phase 1 (8-week pilot sprint) under SPOC Aashutosh Dixit with zero disruption to daily commercial operations.",
    speakerNotes: "Our execution roadmap is disciplined and milestone-gated. Phase 1 delivers a working pilot on our largest volume sector—Zinc Galvanizing in Western India—within 8 weeks. Phase 2 rolls out Lead and Silver along with the Allocation Cockpits by week 16. Full enterprise operationalization across our sales desks is completed by week 24. We ask the Executive Committee today for approval to commence the Phase 1 pilot sprint."
  }
];
