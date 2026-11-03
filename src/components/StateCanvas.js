// ==========================================================================
// STATE IMMERSIVE CANVAS (Expanded Silhouette & Dedicated Culinary Realm)
// ==========================================================================

import { renderRecipeLinks } from '../data/sources.js';
import { getStateData, getStateEraContent } from '../data/culinaryData.js';
import { getFoodCultureFactors, getFoodCultureSources } from '../data/foodCultureFactors.js';
import { STATES_MAP } from '../data/mapData.js';

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
}

function previewText(value, max = 118) {
  const clean = String(value || '').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const boundary = cut.lastIndexOf(' ');
  return `${cut.slice(0, boundary > 65 ? boundary : max).replace(/[,:;\s-]+$/, '')}…`;
}

function renderFoodCultureSection(stateId, eraId) {
  const context = getFoodCultureFactors(stateId, eraId);
  if (!context) return '';

  const cards = [
    {
      number: '01',
      label: 'LAND & INGREDIENTS',
      title: 'What the region could grow or source',
      preview: previewText(context.regionalBaseline),
      full: context.regionalBaseline,
      icon: '✧'
    },
    {
      number: '02',
      label: 'HISTORICAL INFLUENCE',
      title: context.periodFrame,
      preview: previewText(context.regionalPeriodNote),
      full: context.regionalPeriodNote,
      icon: '⌖'
    },
    {
      number: '03',
      label: 'FROM CAUSE TO CUISINE',
      title: 'How conditions shape the plate',
      preview: previewText(context.foodSystemMechanism),
      full: context.foodSystemMechanism,
      icon: '◇'
    }
  ];

  const refs = getFoodCultureSources(context.sourceIds);
  const caution = [context.regionalCaution, context.periodCaution]
    .filter(Boolean).join(' ');
  const dishes = context.dishExamples || 'No named dish examples recorded';
  const relevance = context.periodRelevance || 'Contextual relationship';

  return `
    <section class="food-culture-section" aria-labelledby="food-culture-heading">
      <div class="food-culture-heading-row">
        <div>
          <span class="food-culture-eyebrow">REGIONAL FOOD HISTORY</span>
          <h2 id="food-culture-heading">Why did this food culture develop?</h2>
        </div>
        <span class="food-culture-period">${escapeHtml(eraId)} CE</span>
      </div>

      <div class="food-culture-grid">
        ${cards.map(card => `
          <details class="food-culture-card">
            <summary>
              <span class="food-culture-card-icon" aria-hidden="true">${card.icon}</span>
              <span class="food-culture-card-number">${card.number}</span>
              <span class="food-culture-card-label">${escapeHtml(card.label)}</span>
              <span class="food-culture-card-title">${escapeHtml(card.title)}</span>
              <span class="food-culture-card-preview">${escapeHtml(card.preview)}</span>
              <span class="food-culture-expand">Read context <span aria-hidden="true">＋</span></span>
            </summary>
            <div class="food-culture-card-detail">${escapeHtml(card.full)}</div>
          </details>
        `).join('')}
      </div>

      <div class="food-culture-dish-bridge">
        <span class="food-culture-bridge-label">CONNECTION TO THIS ERA'S DISHES</span>
        <p><strong>${escapeHtml(relevance)}.</strong> ${escapeHtml(dishes)}.</p>
        <p class="food-culture-interpretation">These are contextual food examples, not claims that each dish was invented in ${escapeHtml(eraId)}.</p>
      </div>

      <details class="food-culture-evidence">
        <summary>Research notes & sources <span aria-hidden="true">＋</span></summary>
        ${caution ? `<p class="food-culture-caution">${escapeHtml(caution)}</p>` : ''}
        <div class="food-culture-source-list">
          ${refs.map(source => `
            <a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer" title="${escapeHtml(source.limitations)}">
              ${escapeHtml(source.id)} · ${escapeHtml(source.reference)}
            </a>
          `).join('')}
        </div>
      </details>
    </section>
  `;
}

export class StateCanvas {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.onReturn = options.onReturn || (() => {});
    this.currentStateId = null;
    this.currentEraId = 1700;
    this.activeDishIndex = 0;
    this.mapEngine = options.mapEngine || null;

    this.attachGlobalListeners();
  }

  attachGlobalListeners() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.currentStateId) {
        this.close();
      }
    });
  }

  open(stateId, eraId) {
    this.currentStateId = stateId;
    this.currentEraId = eraId;
    this.activeDishIndex = 0;

    this.render();
    this.container.classList.add('is-active');
    this.container.setAttribute('aria-hidden', 'false');
  }

  close() {
    this.currentStateId = null;
    this.container.classList.remove('is-active');
    this.container.setAttribute('aria-hidden', 'true');
    this.container.innerHTML = '';
    this.onReturn();
  }

  updateEra(newEraId) {
    if (!this.currentStateId) return;
    this.currentEraId = newEraId;
    this.activeDishIndex = 0;
    this.render();
  }

  render() {
    if (!this.currentStateId) return;

    const state = getStateData(this.currentStateId);
    if (!state) return;

    const stateGeo = STATES_MAP.find(s => s.id === this.currentStateId);
    const eraContent = getStateEraContent(this.currentStateId, this.currentEraId);
    if (!eraContent) return;

    const dishes = eraContent.dishes && eraContent.dishes.length > 0
      ? eraContent.dishes
      : [{
          name: eraContent.signatureDish,
          regionalOrigin: state.name,
          image: eraContent.signatureImage,
          tag: 'Regional Specialty',
          description: eraContent.eraStory,
          ingredients: state.indigenousIngredients,
          culturalAnecdote: 'Generations of culinary heritage preserved in regional hearths.'
        }];

    const activeDish = dishes[this.activeDishIndex] || dishes[0];

    // Calculate normalized bounding box for the expanded silhouette watermark
    let watermarkViewBox = '0 0 1000 1100';
    let stateSvgPath = '';
    if (stateGeo) {
      stateSvgPath = stateGeo.path;
      const [[x0, y0], [x1, y1]] = stateGeo.bounds;
      const w = x1 - x0;
      const h = y1 - y0;
      const pad = Math.max(w, h) * 0.15 + 10;
      watermarkViewBox = `${(x0 - pad).toFixed(1)} ${(y0 - pad).toFixed(1)} ${(w + pad * 2).toFixed(1)} ${(h + pad * 2).toFixed(1)}`;
    }

    this.container.innerHTML = `
      <div class="state-canvas-backdrop"></div>

      <button id="btn-return-atlas" class="return-seal-btn" title="Return to All-India Map (Esc)" aria-label="Return to All-India Atlas">
        <svg class="return-seal-compass" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
          <polygon points="12,2 15,10 12,12 9,10" fill="currentColor"/>
          <polygon points="12,22 9,14 12,12 15,14" fill="none" stroke="currentColor"/>
        </svg>
        <span>← Return to Imperial Atlas</span>
      </button>

      <div class="state-stage-wrapper">
        <svg class="state-watermark-svg" viewBox="${watermarkViewBox}" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="silhouetteGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="var(--gold-primary)" stop-opacity="0.3" />
              <stop offset="100%" stop-color="var(--gold-primary)" stop-opacity="0.05" />
            </linearGradient>
          </defs>
          <path d="${stateSvgPath}" fill="url(#silhouetteGlow)" stroke="var(--gold-primary)" stroke-width="2.5" stroke-dasharray="8, 4" />
        </svg>

        <div class="state-story-column">
          <span class="state-meta-tag">${escapeHtml(state.region)} INDIA · GASTRONOMIC ARCHIVE</span>
          <h1 class="state-hero-title">${escapeHtml(state.name)}</h1>
          <p class="state-culinary-tagline">${escapeHtml(state.culinaryTitle)}</p>

          <div class="state-era-banner">
            <span class="state-era-heading">ANNO ${escapeHtml(this.currentEraId)}: ${escapeHtml(eraContent.eraTitle)}</span>
            <p class="state-era-prose">${escapeHtml(eraContent.eraStory)}</p>
          </div>

          <div class="state-pantry-wrap">
            <span class="pantry-label">Indigenous Spices & Endemic Botanicals</span>
            <div class="pantry-tags">
              ${state.indigenousIngredients.map(item => `<span class="pantry-tag-chip">${escapeHtml(item)}</span>`).join('')}
            </div>
          </div>

          <div class="state-era-banner" style="margin-top: -10px; background: rgba(30, 24, 18, 0.65);">
            <span class="pantry-label" style="margin-bottom: 2px;">Historic Cooking Method</span>
            <p style="font-family: var(--font-narrative); font-size: 15px; color: var(--gold-light);">
              ${escapeHtml(eraContent.cookingMethod)}
            </p>
          </div>

          ${renderFoodCultureSection(this.currentStateId, this.currentEraId)}
        </div>

        <div class="state-dish-column">
          <div class="dish-showcase-card">
            <div class="dish-image-hero">
              <img
                src="${escapeHtml(activeDish.image || eraContent.signatureImage)}"
                alt="${escapeHtml(activeDish.name)}"
                onerror="this.src='/assets/awadhi_dum_biryani.jpg'"
              />
              <span class="dish-tag-badge">${escapeHtml(activeDish.tag || 'Imperial Heritage')}</span>
            </div>

            <div class="dish-title-row">
              <h2 class="dish-name">${escapeHtml(activeDish.name)}</h2>
              <span class="dish-origin">${escapeHtml(activeDish.regionalOrigin || state.name)}</span>
            </div>

            <span class="dish-flavor-badge">Flavor Notes: ${escapeHtml(eraContent.signatureFlavor || '')}</span>
            <p class="dish-description">${escapeHtml(activeDish.description || '')}</p>

            ${activeDish.culturalAnecdote ? `
              <div class="dish-anecdote">
                <strong>Documented Chronicle:</strong> ${escapeHtml(activeDish.culturalAnecdote)}
              </div>
            ` : ''}

            ${dishes.length > 1 ? `
              <div class="dish-selector-tabs">
                ${dishes.map((d, idx) => `
                  <button class="dish-tab-btn ${idx === this.activeDishIndex ? 'active' : ''}" data-dish-index="${idx}">
                    ${escapeHtml(d.name)}
                  </button>
                `).join('')}
              </div>
            ` : ''}

            ${renderRecipeLinks(activeDish, state.name)}
          </div>
        </div>
      </div>
    `;

    const returnBtn = document.getElementById('btn-return-atlas');
    if (returnBtn) returnBtn.addEventListener('click', () => this.close());

    const tabs = this.container.querySelectorAll('.dish-tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const idx = parseInt(tab.getAttribute('data-dish-index'), 10);
        this.activeDishIndex = idx;
        this.render();
      });
    });
  }
}
