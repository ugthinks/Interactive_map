// ==========================================================================
// STATE IMMERSIVE CANVAS (Expanded Silhouette & Dedicated Culinary Realm)
// ==========================================================================

import { renderRecipeLinks } from '../data/sources.js';
import { getStateData, getStateEraContent } from '../data/culinaryData.js';
import { STATES_MAP } from '../data/mapData.js';

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
    let watermarkViewBox = "0 0 1000 1100";
    let stateSvgPath = "";
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

      <!-- Subtle Antique Return Seal -->
      <button id="btn-return-atlas" class="return-seal-btn" title="Return to All-India Map (Esc)" aria-label="Return to All-India Atlas">
        <svg class="return-seal-compass" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
          <polygon points="12,2 15,10 12,12 9,10" fill="currentColor"/>
          <polygon points="12,22 9,14 12,12 15,14" fill="none" stroke="currentColor"/>
        </svg>
        <span>← Return to Imperial Atlas</span>
      </button>

      <div class="state-stage-wrapper">
        
        <!-- Enlarged State Silhouette Watermark Backdrop (Scaled to fill the canvas) -->
        <svg class="state-watermark-svg" viewBox="${watermarkViewBox}" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="silhouetteGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="var(--gold-primary)" stop-opacity="0.3" />
              <stop offset="100%" stop-color="var(--gold-primary)" stop-opacity="0.05" />
            </linearGradient>
          </defs>
          <path d="${stateSvgPath}" fill="url(#silhouetteGlow)" stroke="var(--gold-primary)" stroke-width="2.5" stroke-dasharray="8, 4" />
        </svg>

        <!-- Left Column: State Soul, History & Indigenous Pantry -->
        <div class="state-story-column">
          <span class="state-meta-tag">${state.region} INDIA · GASTRONOMIC ARCHIVE</span>
          <h1 class="state-hero-title">${state.name}</h1>
          <p class="state-culinary-tagline">${state.culinaryTitle}</p>

          <div class="state-era-banner">
            <span class="state-era-heading">ANNO ${this.currentEraId}: ${eraContent.eraTitle}</span>
            <p class="state-era-prose">${eraContent.eraStory}</p>
          </div>

          <!-- Indigenous Spices & Produce Pantry -->
          <div class="state-pantry-wrap">
            <span class="pantry-label">Indigenous Spices & Endemic Botanicals</span>
            <div class="pantry-tags">
              ${state.indigenousIngredients.map(item => `<span class="pantry-tag-chip">${item}</span>`).join('')}
            </div>
          </div>

          <!-- Cooking Method of the Era -->
          <div class="state-era-banner" style="margin-top: -10px; background: rgba(30, 24, 18, 0.65);">
            <span class="pantry-label" style="margin-bottom: 2px;">Historic Cooking Method</span>
            <p style="font-family: var(--font-narrative); font-size: 15px; color: var(--gold-light);">
              ${eraContent.cookingMethod}
            </p>
          </div>
        </div>

        <!-- Center-Right Column: Hero Culinary Exhibition Card -->
        <div class="state-dish-column">
          <div class="dish-showcase-card">
            
            <div class="dish-image-hero">
              <img 
                src="${activeDish.image || eraContent.signatureImage}" 
                alt="${activeDish.name}" 
                onerror="this.src='/assets/awadhi_dum_biryani.jpg'"
              />
              <span class="dish-tag-badge">${activeDish.tag || 'Imperial Heritage'}</span>
            </div>

            <div class="dish-title-row">
              <h2 class="dish-name">${activeDish.name}</h2>
              <span class="dish-origin">${activeDish.regionalOrigin}</span>
            </div>

            <span class="dish-flavor-badge">Flavor Notes: ${eraContent.signatureFlavor}</span>

            <p class="dish-description">${activeDish.description}</p>

            ${activeDish.culturalAnecdote ? `
              <div class="dish-anecdote">
                <strong>Documented Chronicle:</strong> ${activeDish.culturalAnecdote}
              </div>
            ` : ''}

            <!-- Multi-Dish Navigation Tabs -->
            ${dishes.length > 1 ? `
              <div class="dish-selector-tabs">
                ${dishes.map((d, idx) => `
                  <button 
                    class="dish-tab-btn ${idx === this.activeDishIndex ? 'active' : ''}" 
                    data-dish-index="${idx}"
                  >
                    ${d.name}
                  </button>
                `).join('')}
              </div>
            ` : ''}

            <!-- Recipe search links -->
            ${renderRecipeLinks(activeDish, state.name)}

          </div>
        </div>

      </div>
    `;

    // Attach Return Click
    const returnBtn = document.getElementById('btn-return-atlas');
    if (returnBtn) {
      returnBtn.addEventListener('click', () => {
        this.close();
      });
    }

    // Attach Dish Tab Click
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
