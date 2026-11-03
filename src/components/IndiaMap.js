// ==========================================================================
// INDIA MAP ENGINE (Edge-to-Edge Geographically Accurate Interactive Canvas)
// ==========================================================================

import { STATES_MAP } from '../data/mapData.js';
import { audioEngine } from './AudioEngine.js';

export class IndiaMap {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.onStateHover = options.onStateHover || (() => {});
    this.onStateLeave = options.onStateLeave || (() => {});
    this.onStateSelect = options.onStateSelect || (() => {});
    
    this.defaultViewBox = { x: 0, y: 0, w: 1000, h: 1100 };
    this.currentViewBox = { ...this.defaultViewBox };
    this.selectedStateId = null;
    this.hoveredStateId = null;

    this.render();
    this.attachEventListeners();
  }

  render() {
    this.container.innerHTML = `
      <svg 
        id="india-svg" 
        class="india-svg-map" 
        viewBox="${this.defaultViewBox.x} ${this.defaultViewBox.y} ${this.defaultViewBox.w} ${this.defaultViewBox.h}"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Interactive Map of India States and Territories"
      >
        <defs>
          <!-- Maritime & Parchment Gradients -->
          <linearGradient id="bayGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#141920" stop-opacity="0.2" />
            <stop offset="100%" stop-color="#0e1217" stop-opacity="0.6" />
          </linearGradient>

          <!-- Shadow Filter for State Elevation -->
          <filter id="stateShadow" x="-10%" y="-10%" width="125%" height="125%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.6" />
          </filter>
        </defs>

        <!-- Graticule Navigation Coordinates (Latitude & Longitude) -->
        <g class="graticules" opacity="0.35">
          <line x1="100" y1="200" x2="900" y2="200" class="graticule-line" />
          <line x1="100" y1="400" x2="900" y2="400" class="graticule-line" />
          <line x1="100" y1="600" x2="900" y2="600" class="graticule-line" />
          <line x1="100" y1="800" x2="900" y2="800" class="graticule-line" />
          <line x1="100" y1="1000" x2="900" y2="1000" class="graticule-line" />
          
          <line x1="300" y1="50" x2="300" y2="1050" class="graticule-line" />
          <line x1="500" y1="50" x2="500" y2="1050" class="graticule-line" />
          <line x1="700" y1="50" x2="700" y2="1050" class="graticule-line" />
        </g>

        <!-- Antique Compass Rose in the Bay of Bengal -->
        <g class="compass-rose" transform="translate(730, 800)">
          <circle cx="0" cy="0" r="42" fill="none" stroke="#d4af37" stroke-width="0.8" stroke-dasharray="2, 4" />
          <circle cx="0" cy="0" r="34" fill="none" stroke="#d4af37" stroke-width="0.5" />
          
          <!-- Cardinal Star Points -->
          <polygon points="0,-38 5,-8 0,0 -5,-8" fill="#d4af37" stroke="#45320c" stroke-width="0.5" />
          <polygon points="0,38 5,8 0,0 -5,8" fill="#a07a1b" stroke="#45320c" stroke-width="0.5" />
          <polygon points="-38,0 -8,-5 0,0 -8,5" fill="#a07a1b" stroke="#45320c" stroke-width="0.5" />
          <polygon points="38,0 8,-5 0,0 8,5" fill="#d4af37" stroke="#45320c" stroke-width="0.5" />

          <!-- Cardinal Labels -->
          <text x="0" y="-42" font-family="'Cinzel Decorative', serif" font-size="8" font-weight="900" fill="#d4af37" text-anchor="middle">N</text>
          <text x="0" y="49" font-family="'Cinzel', serif" font-size="6" font-weight="700" fill="#a07a1b" text-anchor="middle">S</text>
          <text x="47" y="2" font-family="'Cinzel', serif" font-size="6" font-weight="700" fill="#d4af37" text-anchor="middle">E</text>
          <text x="-47" y="2" font-family="'Cinzel', serif" font-size="6" font-weight="700" fill="#a07a1b" text-anchor="middle">W</text>
          <text x="0" y="2" font-family="'Cinzel', serif" font-size="4" font-weight="600" fill="#684e1b" text-anchor="middle">ORIENS</text>
        </g>

        <!-- Ocean Cartographic Inscriptions -->
        <g opacity="0.28" font-family="'Cinzel Decorative', serif" font-size="11" font-weight="700" letter-spacing="4" fill="#d4af37">
          <text x="180" y="780" transform="rotate(-30, 180, 780)">MARE ARABICUM</text>
          <text x="700" y="650" transform="rotate(25, 700, 650)">SINUS GANGETICUS</text>
          <text x="360" y="1060">OCEANUS INDICUS</text>
        </g>

        <!-- Master States Group -->
        <g id="states-group">
          ${this.renderStates()}
        </g>

        <!-- Territory Callouts for Small Territories & Islands -->
        <g id="territory-pins-group">
          ${this.renderTerritoryPins()}
        </g>
      </svg>
    `;
  }

  renderStates() {
    return STATES_MAP.map(state => {
      return `
        <path
          id="state-${state.id}"
          class="state-path"
          d="${state.path}"
          data-id="${state.id}"
          data-name="${state.name}"
          role="button"
          tabindex="0"
          aria-label="${state.name}"
        />
      `;
    }).join('');
  }

  renderTerritoryPins() {
    // Generate accessible pins for smaller regions & islands
    const smallTerritories = STATES_MAP.filter(s => s.isIslandOrSmall);
    return smallTerritories.map(st => {
      const [cx, cy] = st.centroid;
      return `
        <g class="territory-pin" data-id="${st.id}" data-name="${st.name}" transform="translate(${cx}, ${cy})">
          <circle cx="0" cy="0" r="4.5" />
          <circle cx="0" cy="0" r="1.8" fill="#14110e" />
          <text y="-8" class="territory-label">${st.name}</text>
        </g>
      `;
    }).join('');
  }

  attachEventListeners() {
    const statesGroup = document.getElementById('states-group');
    const pinsGroup = document.getElementById('territory-pins-group');

    // State Paths Hover & Click
    const setupElement = (el) => {
      const stateId = el.getAttribute('data-id');

      el.addEventListener('pointerenter', (e) => {
        if (this.selectedStateId) return;
        this.hoveredStateId = stateId;
        this.highlightState(stateId);
        this.onStateHover(stateId, e);
      });

      el.addEventListener('pointermove', (e) => {
        if (this.selectedStateId) return;
        this.onStateHover(stateId, e);
      });

      el.addEventListener('pointerleave', () => {
        if (this.selectedStateId) return;
        this.hoveredStateId = null;
        this.unhighlightState(stateId);
        this.onStateLeave();
      });

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectState(stateId);
      });

      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.selectState(stateId);
        }
      });
    };

    document.querySelectorAll('.state-path').forEach(setupElement);
    document.querySelectorAll('.territory-pin').forEach(setupElement);
  }

  highlightState(stateId) {
    const path = document.getElementById(`state-${stateId}`);
    if (path) path.classList.add('is-hovered');
  }

  unhighlightState(stateId) {
    const path = document.getElementById(`state-${stateId}`);
    if (path) path.classList.remove('is-hovered');
  }

  // Smoothly Zoom into State Silhouette
  selectState(stateId) {
    const state = STATES_MAP.find(s => s.id === stateId);
    if (!state) return;

    this.selectedStateId = stateId;
    audioEngine.playStateSelect();

    // Dim other states and highlight selected
    document.querySelectorAll('.state-path').forEach(path => {
      const id = path.getAttribute('data-id');
      if (id === stateId) {
        path.classList.add('is-selected');
        path.classList.remove('is-dimmed');
      } else {
        path.classList.add('is-dimmed');
        path.classList.remove('is-selected');
      }
    });

    // Compute bounding box with padding for cinematic state view
    const [[x0, y0], [x1, y1]] = state.bounds;
    const w = x1 - x0;
    const h = y1 - y0;
    const pad = Math.max(w, h) * 0.35 + 20;

    const targetX = Math.max(0, x0 - pad);
    const targetY = Math.max(0, y0 - pad);
    const targetW = w + pad * 2;
    const targetH = h + pad * 2;

    this.animateViewBox(targetX, targetY, targetW, targetH, 800);

    // Notify state selection callback
    this.onStateSelect(stateId);
  }

  // Smoothly Zoom Out to All-India View
  resetZoom() {
    this.selectedStateId = null;
    audioEngine.playReturn();

    document.querySelectorAll('.state-path').forEach(path => {
      path.classList.remove('is-selected');
      path.classList.remove('is-dimmed');
    });

    this.animateViewBox(
      this.defaultViewBox.x,
      this.defaultViewBox.y,
      this.defaultViewBox.w,
      this.defaultViewBox.h,
      700
    );
  }

  // Smooth ViewBox Animation Engine using requestAnimationFrame
  animateViewBox(tx, ty, tw, th, duration = 600) {
    const svg = document.getElementById('india-svg');
    if (!svg) return;

    const startX = this.currentViewBox.x;
    const startY = this.currentViewBox.y;
    const startW = this.currentViewBox.w;
    const startH = this.currentViewBox.h;

    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth cubic ease out
      const ease = 1 - Math.pow(1 - progress, 3);

      const x = startX + (tx - startX) * ease;
      const y = startY + (ty - startY) * ease;
      const w = startW + (tw - startW) * ease;
      const h = startH + (th - startH) * ease;

      this.currentViewBox = { x, y, w, h };
      svg.setAttribute('viewBox', `${x.toFixed(1)} ${y.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}`);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  getStateSvgPath(stateId) {
    const state = STATES_MAP.find(s => s.id === stateId);
    return state ? state.path : '';
  }
}
