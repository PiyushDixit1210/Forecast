/**
 * Application Entry & UI Controller
 * Manages dual-mode interface: Executive Pitch Deck & Live Decision Support Cockpit
 */

import { SLIDES_DATA } from './presentation/slideDeck.js';
import { METALS_DATA, MACRO_SCENARIOS } from './data/mockData.js';
import { DemandEngine } from './models/demandEngine.js';
import { ImportParityEngine } from './models/importParityEngine.js';
import { AllocationEngine } from './models/allocationEngine.js';
import { ExplainabilityEngine } from './models/explainabilityEngine.js';
import Chart from 'chart.js/auto';

class AppController {
  constructor() {
    this.currentMode = 'presentation'; // 'presentation' or 'cockpit'
    this.currentSlideIndex = 0;
    this.activeMetalKey = 'zinc';
    this.activeScenarioId = 'base';
    this.showSpeakerNotes = false;

    // Engines
    this.demandEngine = new DemandEngine(this.activeMetalKey, this.activeScenarioId);
    this.parityEngine = new ImportParityEngine(this.activeMetalKey);
    this.allocationEngine = new AllocationEngine(this.activeMetalKey);
    this.explainEngine = new ExplainabilityEngine(this.activeMetalKey);

    // Chart Instance
    this.forecastChart = null;

    // Audit Trail
    this.auditLog = [
      { timestamp: "2026-03-28 14:10", user: "Aashutosh Dixit", action: "Approved Baseline Zn Premium", detail: "$145/MT for April Fortnight 1" }
    ];

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.renderCurrentSlide();
    this.updateCockpit();
  }

  setupEventListeners() {
    // Mode Switcher
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const mode = e.currentTarget.dataset.mode;
        this.switchMode(mode);
      });
    });

    // Presentation Slide Navigation
    document.getElementById('prev-slide-btn')?.addEventListener('click', () => this.prevSlide());
    document.getElementById('next-slide-btn')?.addEventListener('click', () => this.nextSlide());
    document.getElementById('toggle-notes-btn')?.addEventListener('click', () => this.toggleSpeakerNotes());

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      if (this.currentMode === 'presentation') {
        if (e.key === 'ArrowRight' || e.key === ' ') {
          this.nextSlide();
        } else if (e.key === 'ArrowLeft') {
          this.prevSlide();
        } else if (e.key.toLowerCase() === 'p') {
          this.toggleSpeakerNotes();
        }
      }
      if (e.key.toLowerCase() === 'm') {
        this.switchMode(this.currentMode === 'presentation' ? 'cockpit' : 'presentation');
      }
    });

    // Metal Selector
    document.querySelectorAll('.metal-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.metal-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.activeMetalKey = e.currentTarget.dataset.metal;
        this.onMetalChange();
      });
    });

    // Scenario Dropdown
    const scenarioSelect = document.getElementById('scenario-select');
    if (scenarioSelect) {
      scenarioSelect.addEventListener('change', (e) => {
        this.activeScenarioId = e.target.value;
        this.onScenarioChange();
      });
    }

    // Allocation Sliders
    const mouSlider = document.getElementById('slider-mou');
    const spotSlider = document.getElementById('slider-spot');
    const auctionSlider = document.getElementById('slider-auction');

    const handleSliderChange = () => {
      let mouVal = parseInt(mouSlider.value);
      let spotVal = parseInt(spotSlider.value);
      let auctionVal = parseInt(auctionSlider.value);

      const total = mouVal + spotVal + auctionVal;
      if (total !== 100) {
        // Adjust auction to balance to 100
        auctionVal = Math.max(0, 100 - mouVal - spotVal);
        auctionSlider.value = auctionVal;
      }

      document.getElementById('mou-pct-label').textContent = `${mouVal}%`;
      document.getElementById('spot-pct-label').textContent = `${spotVal}%`;
      document.getElementById('auction-pct-label').textContent = `${auctionVal}%`;

      this.allocationEngine.setSplit(mouVal, spotVal, auctionVal);
      this.updateAllocationResults();
    };

    mouSlider?.addEventListener('input', handleSliderChange);
    spotSlider?.addEventListener('input', handleSliderChange);
    auctionSlider?.addEventListener('input', handleSliderChange);

    // Decision Approval Actions
    document.getElementById('btn-approve-decision')?.addEventListener('click', () => {
      this.openApprovalModal(true);
    });

    document.getElementById('btn-override-decision')?.addEventListener('click', () => {
      this.openApprovalModal(false);
    });

    document.getElementById('modal-cancel-btn')?.addEventListener('click', () => {
      document.getElementById('approval-modal').classList.remove('active');
    });

    document.getElementById('modal-submit-btn')?.addEventListener('click', () => {
      this.submitDecisionLog();
    });
  }

  switchMode(mode) {
    this.currentMode = mode;
    document.querySelectorAll('.mode-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.mode === mode);
    });

    const presView = document.getElementById('presentation-view');
    const cockpitView = document.getElementById('cockpit-view');

    if (mode === 'presentation') {
      presView.style.display = 'flex';
      cockpitView.style.display = 'none';
      this.renderCurrentSlide();
    } else {
      presView.style.display = 'none';
      cockpitView.style.display = 'block';
      this.updateCockpit();
    }
  }

  /* ==========================================================================
     PRESENTATION ENGINE
     ========================================================================== */
  renderCurrentSlide() {
    const slide = SLIDES_DATA[this.currentSlideIndex];
    if (!slide) return;

    // Update Counter & Controls
    const counter = document.getElementById('slide-counter');
    if (counter) {
      counter.textContent = `Slide ${this.currentSlideIndex + 1} of ${SLIDES_DATA.length}`;
    }

    const prevBtn = document.getElementById('prev-slide-btn');
    const nextBtn = document.getElementById('next-slide-btn');
    if (prevBtn) prevBtn.disabled = this.currentSlideIndex === 0;
    if (nextBtn) nextBtn.disabled = this.currentSlideIndex === SLIDES_DATA.length - 1;

    // Render Speaker Notes
    const notesContent = document.getElementById('notes-content');
    if (notesContent) {
      notesContent.textContent = slide.speakerNotes || "No specific speaker notes for this slide.";
    }

    const container = document.getElementById('slide-content-area');
    if (!container) return;

    // Render Slide HTML based on Layout
    container.innerHTML = `
      <div class="slide-tag">${slide.tag}</div>
      <h1 class="slide-title">${slide.title}</h1>
      <p class="slide-subtitle">${slide.subtitle}</p>
      ${this.buildSlideBody(slide)}
      ${slide.presenter ? `<div class="slide-presenter">${slide.presenter}</div>` : ''}
    `;
  }

  buildSlideBody(slide) {
    switch (slide.layout) {
      case 'title':
        return `
          <div class="slide-kpi-grid">
            ${slide.kpis.map(k => `
              <div class="slide-kpi-card">
                <div class="slide-kpi-val">${k.value}</div>
                <div class="slide-kpi-label">${k.label}</div>
                <div class="slide-kpi-sub">${k.sub}</div>
              </div>
            `).join('')}
          </div>
        `;

      case 'split-comparison':
        return `
          <div class="comparison-grid">
            <div class="comparison-box negative">
              <div class="comparison-header">
                <span>⚠️</span>
                <span>${slide.leftHeader}</span>
              </div>
              <ul class="point-list">
                ${slide.leftPoints.map(p => `
                  <li><span class="point-bullet">✕</span><span>${p}</span></li>
                `).join('')}
              </ul>
            </div>
            <div class="comparison-box positive">
              <div class="comparison-header">
                <span>🎯</span>
                <span>${slide.rightHeader}</span>
              </div>
              <ul class="point-list">
                ${slide.rightPoints.map(p => `
                  <li><span class="point-bullet">!</span><span>${p}</span></li>
                `).join('')}
              </ul>
            </div>
          </div>
        `;

      case 'pillars':
        return `
          <div class="pillars-grid">
            ${slide.pillars.map(p => `
              <div class="pillar-card">
                <div class="pillar-badge">${p.badge}</div>
                <div class="pillar-title">${p.name}</div>
                <ul class="pillar-signals">
                  ${p.signals.map(s => `<li>${s}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>
        `;

      case 'architecture':
        return `
          <div class="arch-timeline">
            ${slide.steps.map(s => `
              <div class="arch-card">
                <div class="arch-phase">${s.phase}</div>
                <div class="arch-desc">${s.desc}</div>
              </div>
            `).join('')}
          </div>
          <div class="arch-governance-callout">
            <span style="font-size:20px;">🛡️</span>
            <div>${slide.callout}</div>
          </div>
        `;

      case 'tam-sam':
        return `
          <div class="tamsam-grid">
            ${slide.metalsBreakdown.map(m => `
              <div class="tamsam-card">
                <div class="tamsam-header">${m.name}</div>
                <div class="metric-row">
                  <span class="label">Total Addressable (TAM):</span>
                  <span class="value">${m.tam}</span>
                </div>
                <div class="metric-row">
                  <span class="label">Serviceable Addressable (SAM):</span>
                  <span class="value">${m.sam}</span>
                </div>
                <div class="metric-row highlight">
                  <span class="label">HZL Captured (SOM):</span>
                  <span class="value">${m.hzlCapture}</span>
                </div>
                <div class="metric-row whitespace">
                  <span class="label">Target White Space:</span>
                  <span class="value">${m.whiteSpace}</span>
                </div>
                <div style="font-size:12px; color:var(--text-muted); border-top:1px solid var(--border-subtle); padding-top:8px;">
                  <strong>Key Target Grades:</strong> ${m.grades}
                </div>
              </div>
            `).join('')}
          </div>
        `;

      case 'import-radar':
        return `
          <div class="port-cards-list" style="max-width:960px;">
            ${slide.keyInsights.map(k => `
              <div class="port-item" style="padding:18px;">
                <div class="port-info">
                  <div style="display:flex; align-items:center; gap:10px;">
                    <span class="port-name" style="font-size:16px;">${k.port}</span>
                    <span class="kpi-badge badge-${k.status.includes('CRITICAL') ? 'negative' : 'warning'}">${k.status}</span>
                  </div>
                  <div style="font-size:13px; color:var(--text-muted); margin-top:4px;">${k.issue}</div>
                  <div style="font-size:12.5px; color:var(--accent-cyan); margin-top:4px;"><strong>AI Action:</strong> ${k.action}</div>
                </div>
              </div>
            `).join('')}
          </div>
        `;

      case 'explainability':
        return `
          <div style="max-width:960px;">
            <div class="shap-list" style="margin-bottom:16px;">
              ${slide.driversBreakdown.map(d => `
                <div class="shap-item" style="padding:12px 16px;">
                  <div>
                    <div style="font-weight:700; color:#FFFFFF;">${d.factor}</div>
                    <div style="font-size:12px; color:var(--text-dim);">${d.rationale}</div>
                  </div>
                  <div class="shap-impact ${d.delta.startsWith('+') ? 'positive' : 'negative'}" style="font-size:15px;">
                    ${d.delta}
                  </div>
                </div>
              `).join('')}
            </div>
            <div style="background:rgba(0,240,255,0.1); border:1px solid var(--accent-cyan); border-radius:8px; padding:14px 20px; font-weight:800; color:var(--accent-cyan);">
              ${slide.netResult}
            </div>
          </div>
        `;

      case 'cockpits':
        return `
          <div class="slide-kpi-grid" style="grid-template-columns: repeat(3, 1fr);">
            ${slide.cockpits.map(c => `
              <div class="slide-kpi-card" style="padding:24px;">
                <div style="font-size:11px; text-transform:uppercase; color:var(--accent-gold); font-weight:700;">${c.focus}</div>
                <div style="font-size:18px; font-weight:800; color:#FFFFFF; margin:8px 0 12px 0;">${c.title}</div>
                <div style="font-size:13px; color:var(--text-muted); line-height:1.5;">${c.description}</div>
              </div>
            `).join('')}
          </div>
        `;

      case 'financial-roi':
        return `
          <div style="display:grid; grid-template-columns: 2fr 1fr; gap:24px;">
            <div class="port-cards-list">
              ${slide.impactItems.map(item => `
                <div class="port-item" style="padding:16px;">
                  <div>
                    <div style="font-size:15px; font-weight:700; color:#FFFFFF;">${item.stream}</div>
                    <div style="font-size:12.5px; color:var(--text-muted);">${item.basis}</div>
                  </div>
                  <div style="font-size:18px; font-weight:800; color:var(--accent-emerald); font-family:var(--font-mono);">${item.value}</div>
                </div>
              `).join('')}
            </div>
            <div class="glass-panel" style="padding:24px; display:flex; flex-direction:column; justify-content:center; gap:16px; border-color:var(--border-active);">
              <div style="font-size:13px; text-transform:uppercase; color:var(--text-muted); font-weight:700;">Total Net Value</div>
              <div style="font-size:34px; font-weight:900; color:var(--accent-cyan); font-family:var(--font-mono);">${slide.totalEbitda}</div>
              <div style="font-size:14px; color:var(--text-main); font-weight:600;">${slide.payback}</div>
            </div>
          </div>
        `;

      case 'roadmap':
        return `
          <div style="display:flex; flex-direction:column; gap:16px; max-width:960px;">
            ${slide.milestones.map(m => `
              <div class="port-item" style="padding:16px 20px;">
                <div>
                  <div style="font-size:15px; font-weight:800; color:var(--accent-cyan);">${m.phase}</div>
                  <div style="font-size:13px; font-weight:700; color:#FFFFFF; margin:2px 0;">${m.focus}</div>
                  <div style="font-size:12.5px; color:var(--text-muted);">${m.deliverables}</div>
                </div>
              </div>
            `).join('')}
            <div style="background:rgba(245,158,11,0.1); border:1px solid var(--accent-gold); border-radius:8px; padding:14px 20px; font-weight:700; color:var(--accent-gold);">
              ${slide.nextSteps}
            </div>
          </div>
        `;

      default:
        return ``;
    }
  }

  nextSlide() {
    if (this.currentSlideIndex < SLIDES_DATA.length - 1) {
      this.currentSlideIndex++;
      this.renderCurrentSlide();
    }
  }

  prevSlide() {
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
      this.renderCurrentSlide();
    }
  }

  toggleSpeakerNotes() {
    this.showSpeakerNotes = !this.showSpeakerNotes;
    const panel = document.getElementById('speaker-notes-panel');
    if (panel) {
      panel.classList.toggle('active', this.showSpeakerNotes);
    }
  }

  /* ==========================================================================
     COCKPIT & DECISION SIMULATOR ENGINE
     ========================================================================== */
  onMetalChange() {
    this.demandEngine.setMetal(this.activeMetalKey);
    this.parityEngine.setMetal(this.activeMetalKey);
    this.allocationEngine.setMetal(this.activeMetalKey);
    this.explainEngine.setMetal(this.activeMetalKey);
    this.updateCockpit();
  }

  onScenarioChange() {
    this.demandEngine.setScenario(this.activeScenarioId);
    this.updateCockpit();
  }

  updateCockpit() {
    const kpis = this.demandEngine.getKpiMetrics();

    // 1. Update KPI Deck
    document.getElementById('kpi-demand-val').textContent = kpis.projectedDemand.toLocaleString();
    document.getElementById('kpi-demand-unit').textContent = kpis.unit + "/mo";
    const demandBadge = document.getElementById('kpi-demand-badge');
    demandBadge.textContent = `${kpis.momChangePct > 0 ? '+' : ''}${kpis.momChangePct}% MoM`;
    demandBadge.className = `kpi-badge ${kpis.momChangePct > 0 ? 'badge-positive' : 'badge-negative'}`;

    document.getElementById('kpi-premium-val').textContent = `${kpis.currency.includes('USD') ? '$' : '₹'}${kpis.recommendedPremium}`;
    document.getElementById('kpi-premium-unit').textContent = kpis.domesticCurrency;
    const premBadge = document.getElementById('kpi-premium-badge');
    premBadge.textContent = `${kpis.premiumChange > 0 ? '+' : ''}${kpis.premiumChange} vs Current`;
    premBadge.className = `kpi-badge ${kpis.premiumChange >= 0 ? 'badge-positive' : 'badge-negative'}`;

    const threatBadge = document.getElementById('kpi-import-threat');
    threatBadge.textContent = kpis.importThreatLevel;
    threatBadge.className = `kpi-badge badge-${kpis.importThreatLevel === 'CRITICAL' ? 'negative' : (kpis.importThreatLevel === 'HIGH' ? 'negative' : 'warning')}`;
    document.getElementById('kpi-arbitrage-sub').textContent = `Arbitrage: ${kpis.arbitrageMargin > 0 ? '+' : ''}${kpis.arbitrageMargin} vs HZL Ex-works`;

    document.getElementById('kpi-share-val').textContent = `${kpis.marketSharePct}%`;
    document.getElementById('kpi-share-sub').textContent = `SOM: ${kpis.som.toLocaleString()} / SAM: ${kpis.sam.toLocaleString()} ${kpis.unit}`;

    // 2. Render Forecast Chart
    this.renderForecastChart();

    // 3. Render Port Radar
    this.renderPortRadar();

    // 4. Render TAM / SAM breakdown
    this.renderTamSamBreakdown();

    // 5. Render SHAP Waterfall
    this.renderShapWaterfall();

    // 6. Update Allocation Model
    this.updateAllocationResults();
  }

  renderForecastChart() {
    const ctx = document.getElementById('forecast-chart-canvas')?.getContext('2d');
    if (!ctx) return;

    const forecast = this.demandEngine.getAdjustedForecast();
    const metal = this.demandEngine.getMetalData();

    const labels = [
      ...metal.history.map(h => h.month),
      ...forecast.map(f => f.month)
    ];

    const historicalData = metal.history.map(h => h.demand);
    const p50Data = [
      ...new Array(metal.history.length - 1).fill(null),
      metal.history[metal.history.length - 1].demand,
      ...forecast.map(f => f.p50)
    ];

    const p90Data = [
      ...new Array(metal.history.length - 1).fill(null),
      metal.history[metal.history.length - 1].demand,
      ...forecast.map(f => f.p90)
    ];

    const p10Data = [
      ...new Array(metal.history.length - 1).fill(null),
      metal.history[metal.history.length - 1].demand,
      ...forecast.map(f => f.p10)
    ];

    if (this.forecastChart) {
      this.forecastChart.destroy();
    }

    this.forecastChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Historical Actual Demand',
            data: historicalData,
            borderColor: '#94A3B8',
            backgroundColor: '#94A3B8',
            borderWidth: 2,
            pointRadius: 4,
            tension: 0.2
          },
          {
            label: 'AI Sensed Demand (P50 Expected)',
            data: p50Data,
            borderColor: '#00F0FF',
            backgroundColor: 'rgba(0, 240, 255, 0.15)',
            borderWidth: 3,
            pointRadius: 4,
            tension: 0.25
          },
          {
            label: 'P90 Upper Confidence Bound',
            data: p90Data,
            borderColor: 'rgba(16, 185, 129, 0.4)',
            borderDash: [5, 5],
            borderWidth: 1.5,
            pointRadius: 0,
            tension: 0.25,
            fill: false
          },
          {
            label: 'P10 Lower Confidence Bound',
            data: p10Data,
            borderColor: 'rgba(239, 68, 68, 0.4)',
            borderDash: [5, 5],
            borderWidth: 1.5,
            pointRadius: 0,
            tension: 0.25,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: { color: '#94A3B8', font: { size: 11, family: 'Inter' } }
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          x: {
            ticks: { color: '#64748B', font: { size: 11 } },
            grid: { color: 'rgba(255, 255, 255, 0.05)' }
          },
          y: {
            ticks: { color: '#64748B', font: { size: 11 } },
            grid: { color: 'rgba(255, 255, 255, 0.05)' }
          }
        }
      }
    });
  }

  renderPortRadar() {
    const container = document.getElementById('port-radar-list');
    if (!container) return;

    const ports = this.parityEngine.getAllPortsParity();
    container.innerHTML = ports.map(p => `
      <div class="port-item">
        <div class="port-info">
          <div class="port-name">${p.portName}</div>
          <div class="port-origin">Origin: ${p.origin} | Inflow: ${p.importsMT.toLocaleString()} MT/mo</div>
        </div>
        <div class="port-metric">
          <div class="arbitrage-val ${p.arbitrage < 0 ? 'threat' : 'advantage'}">
            ${p.arbitrage < 0 ? 'Arbitrage: ' : 'Margin: '}${p.arbitrage > 0 ? '+' : ''}${p.arbitrage}
          </div>
          <div style="font-size:11px; color:var(--text-dim);">Landed: ${p.landedCost} vs HZL: ${p.hzlDelivered}</div>
        </div>
      </div>
    `).join('');
  }

  renderTamSamBreakdown() {
    const kpis = this.demandEngine.getKpiMetrics();
    const container = document.getElementById('tamsam-breakdown-container');
    if (!container) return;

    const hzlPct = ((kpis.som / kpis.tam) * 100).toFixed(1);
    const importPct = (((kpis.tam - kpis.sam) / kpis.tam) * 100).toFixed(1);
    const secondaryOrWhiteSpacePct = (100 - hzlPct - importPct).toFixed(1);

    container.innerHTML = `
      <div class="tam-bar-wrapper">
        <div class="tam-bar-labels">
          <span style="color:var(--text-muted);">Total Addressable Market (TAM):</span>
          <span style="font-weight:700; color:#FFFFFF;">${kpis.tam.toLocaleString()} ${kpis.unit}</span>
        </div>
        <div class="tam-progress-track">
          <div class="tam-fill-hzl" style="width:${hzlPct}%;" title="HZL Share: ${hzlPct}%"></div>
          <div class="tam-fill-import" style="width:${importPct}%;" title="Port Imports: ${importPct}%"></div>
          <div class="tam-fill-secondary" style="width:${secondaryOrWhiteSpacePct}%;" title="White Space / Secondary: ${secondaryOrWhiteSpacePct}%"></div>
        </div>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:12px; margin-top:10px;">
        <span style="color:var(--accent-cyan);">■ HZL SOM (${hzlPct}%)</span>
        <span style="color:var(--accent-crimson);">■ Port Imports (${importPct}%)</span>
        <span style="color:var(--accent-gold);">■ White Space (${secondaryOrWhiteSpacePct}%)</span>
      </div>
    `;
  }

  renderShapWaterfall() {
    const container = document.getElementById('shap-waterfall-container');
    if (!container) return;

    const data = this.explainEngine.getWaterfallData();
    const drivers = data.waterfallSteps.filter(s => s.type === 'positive' || s.type === 'negative');

    container.innerHTML = drivers.map(d => `
      <div class="shap-item">
        <div class="shap-name" title="${d.name}">${d.name}</div>
        <div class="shap-impact ${d.delta > 0 ? 'positive' : 'negative'}">
          ${d.delta > 0 ? '+' : ''}${d.delta} ${data.unit}
        </div>
      </div>
    `).join('');
  }

  updateAllocationResults() {
    const alloc = this.allocationEngine.optimizeAllocation();

    document.getElementById('alloc-mou-vol').textContent = `${alloc.channels.mou.volume.toLocaleString()} ${alloc.unit}`;
    document.getElementById('alloc-spot-vol').textContent = `${alloc.channels.spot.volume.toLocaleString()} ${alloc.unit}`;
    document.getElementById('alloc-auction-vol').textContent = `${alloc.channels.auction.volume.toLocaleString()} ${alloc.unit}`;

    document.getElementById('alloc-blended-premium').textContent = `${alloc.currency === 'USD' ? '$' : '₹'}${alloc.blendedAveragePremium} / ${alloc.premiumUnit}`;
    document.getElementById('alloc-auction-floor').textContent = `${alloc.currency === 'USD' ? '$' : '₹'}${alloc.recommendedAuctionReservePrice.toLocaleString()}`;
    document.getElementById('alloc-incremental-ebitda').textContent = `+${alloc.currency === 'USD' ? '$' : '₹'}${Math.round(alloc.incrementalEbitda / 1000).toLocaleString()}k`;
  }

  openApprovalModal(isApproval) {
    const modal = document.getElementById('approval-modal');
    const title = document.getElementById('modal-action-title');
    const textarea = document.getElementById('modal-rationale-input');

    if (isApproval) {
      title.textContent = `Executive Approval: Sensed ${this.demandEngine.getMetalData().name} Commercial Policy`;
      textarea.value = `Approved recommended benchmark premium of ${document.getElementById('kpi-premium-val').textContent} and channel allocation split. Forwarded to Sales Operations for dispatch scheduling.`;
    } else {
      title.textContent = `Executive Override: Manual Adjustment Rationale`;
      textarea.value = `Override Reason: Regional spot tightness in Pune/NCR allows an additional +$5/t premium beyond AI model recommendation due to delayed Korean shipment.`;
    }

    modal.classList.add('active');
  }

  submitDecisionLog() {
    const rationale = document.getElementById('modal-rationale-input').value;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    this.auditLog.unshift({
      timestamp: now,
      user: "Aashutosh Dixit (SPOC)",
      action: "Policy Authorization / Audit",
      detail: rationale
    });

    document.getElementById('approval-modal').classList.remove('active');
    alert(`Decision logged to Governance Audit Trail successfully!\n\nAuthorized by: Aashutosh Dixit\nTimestamp: ${now}`);
  }
}

// Instantiate on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.senseApp = new AppController();
});
