// ==========================================================================
// INDIA MAP ENGINE — monument and state-label layout
// ==========================================================================

import { STATES_MAP } from '../data/mapData.js';
import { audioEngine } from './AudioEngine.js';
import { MONUMENTS } from '../data/monuments.js';

/*
 * Layout values are SVG map units, not CSS pixels.
 * `scale` adjusts the automatically calculated icon size. `iconSize` is an
 * absolute override for tiny territories. dx/dy move the icon anchor.
 * labelDx/labelDy move only the state name. `lines` controls line wrapping.
 */
const MARKER_LAYOUT = {
  // Northern cluster. These offsets are small cartographic nudges from each
  // state's visual centroid, used only where neighbouring shapes are crowded.
  'ladakh':            { scale: 0.96, centerDx: 4, fontSize: 13.2 },
  'jammu-and-kashmir': { scale: 0.90, centerDx: -10, fontSize: 10.8, lines: ['JAMMU &', 'KASHMIR'], labelGap: 2 },
  'himachal-pradesh':  { scale: 0.92, centerDx: -10, fontSize: 10.2, lines: ['HIMACHAL', 'PRADESH'], labelGap: 2 },
  'punjab':            { scale: 0.94, centerDx: -9, fontSize: 11.5 },
  'chandigarh':        { iconSize: 30, centerDx: 20, centerDy: 20, fontSize: 9.0, label: 'CHD.', labelGap: 2 },
  'uttarakhand':       { scale: 0.94, centerDx: 28, fontSize: 10.8 },
  'haryana':           { scale: 0.86, centerDx: -20, fontSize: 10.8 },
  'delhi':             { iconSize: 30, fontSize: 9.6, label: 'DELHI', labelGap: 2 },

  // North-central and eastern belt.
  'uttar-pradesh':     { scale: 0.98, fontSize: 12.8, lines: ['UTTAR PRADESH'] },
  'rajasthan':         { scale: 0.98, centerDx: 3, centerDy: -4, fontSize: 17.4 },
  'bihar':             { scale: 0.92, centerDy: -4, fontSize: 12.5 },
  'jharkhand':         { scale: 0.90, centerDx: -5, fontSize: 11.8 },
  'west-bengal':       { scale: 0.92, centerDx: 6, fontSize: 12.5 },
  'sikkim':            { iconSize: 36, centerDx: -4, fontSize: 9.5, labelGap: 2 },
  'arunachal-pradesh': { scale: 0.88, centerDx: -5, fontSize: 10.8, lines: ['ARUNACHAL', 'PRADESH'], labelGap: 2 },
  'assam':             { scale: 0.91, centerDy: 10, fontSize: 12.8 },
  'nagaland':          { iconSize: 35, centerDx: 13, fontSize: 9.2, labelGap: 2 },
  'meghalaya':         { iconSize: 36, centerDx: -20, fontSize: 9.2, labelGap: 2 },
  'manipur':           { iconSize: 34, centerDx: 18, fontSize: 9.2, labelGap: 2 },
  'tripura':            { iconSize: 33, centerDx: -8, fontSize: 9.2, labelGap: 2 },
  'mizoram':            { iconSize: 33, centerDx: 10, fontSize: 9.2, labelGap: 2 },

  // Central, western and eastern states.
  'madhya-pradesh':    { scale: 0.96, centerDx: -18, fontSize: 15.5 },
  'gujarat':           { scale: 0.96, fontSize: 14.2 },
  'maharashtra':       { scale: 0.95, centerDx: -5, centerDy: 13, fontSize: 14.5 },
  'chhattisgarh':      { scale: 0.92, centerDx: -8, fontSize: 12.5 },
  'odisha':            { scale: 0.96, centerDx: 12, fontSize: 14.0 },

  // Southern cluster. Andhra is nudged east; Telangana is nudged west so
  // the visible artwork and its label do not collide at their shared border.
  'telangana':         { scale: 0.78, centerDx: -12, centerDy: 8, labelDx: -8, fontSize: 11.8 },
  'andhra-pradesh':    { scale: 0.72, centerDx: 30, fontSize: 12.8, labelGap: 2, lines: ['ANDHRA', 'PRADESH'] },
  'karnataka':         { scale: 0.91, fontSize: 13.2 },
  'goa':               { iconSize: 32, fontSize: 9.6, labelGap: 2 },
  'kerala':            { scale: 0.90, centerDx: -5, fontSize: 10.8 },
  'tamil-nadu':        { scale: 0.94, centerDx: 10, centerDy: 25, fontSize: 13.2 },
  'puducherry':        { iconSize: 34, centerDx: 8, centerDy: -5, fontSize: 8.7, label: 'PUDUCHERRY', labelDx: 25, labelGap: 2 },

  // Union territories and islands.
  'dadra-and-nagar-haveli-and-daman-and-diu': { iconSize: 34, centerDx: -4, fontSize: 8.8, label: 'DNH & DD', labelGap: 2 },
  'lakshadweep':       { iconSize: 30, centerDx: -10, fontSize: 8.8, labelGap: 2 },
  'andaman-and-nicobar-islands': { iconSize: 40, centerDx: 5, fontSize: 8.8, lines: ['ANDAMAN &', 'NICOBAR ISLANDS'], labelGap: 2 },
};

const MONUMENT_ART_BOUNDS = {
  'andaman-and-nicobar-islands': [46, 113, 466, 399],
  'andhra-pradesh': [46, 63, 466, 448],
  'arunachal-pradesh': [46, 106, 466, 406],
  'assam': [46, 105, 466, 407],
  'bihar': [52, 46, 459, 466],
  'chandigarh': [76, 46, 435, 466],
  'chhattisgarh': [46, 94, 466, 417],
  'dadra-and-nagar-haveli-and-daman-and-diu': [46, 76, 466, 436],
  'delhi': [46, 97, 466, 415],
  'goa': [46, 48, 466, 463],
  'gujarat': [46, 93, 466, 418],
  'haryana': [46, 96, 466, 415],
  'himachal-pradesh': [46, 65, 466, 446],
  'jammu-and-kashmir': [46, 91, 466, 428],
  'jharkhand': [46, 79, 466, 435],
  'karnataka': [46, 75, 466, 436],
  'kerala': [46, 72, 466, 439],
  'ladakh': [46, 99, 466, 412],
  'lakshadweep': [46, 107, 466, 404],
  'madhya-pradesh': [46, 102, 466, 410],
  'maharashtra': [46, 84, 466, 427],
  'manipur': [46, 91, 466, 420],
  'meghalaya': [46, 116, 466, 396],
  'mizoram': [46, 92, 466, 419],
  'nagaland': [46, 105, 466, 402],
  'odisha': [46, 110, 466, 402],
  'puducherry': [46, 63, 466, 448],
  'punjab': [46, 76, 466, 436],
  'rajasthan': [46, 107, 466, 404],
  'sikkim': [46, 88, 466, 423],
  'tamil-nadu': [46, 62, 466, 449],
  'telangana': [69, 46, 442, 466],
  'tripura': [46, 82, 466, 429],
  'uttar-pradesh': [46, 127, 466, 385],
  'uttarakhand': [46, 49, 466, 463],
  'west-bengal': [46, 98, 466, 414],
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function escapeXml(value = '') {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', "'": '&apos;'
  }[char]));
}

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
        <g id="state-labels-group" aria-hidden="true">${this.renderStateLabels()}</g>
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
    // Territory pins removed: small states are selected from the Atlas Index dropdown
    return '';
  }

  renderStateLabels() {
    return STATES_MAP.map(state => {
      const monument = MONUMENTS[state.id];
      if (!monument) return '';

      const layout = MARKER_LAYOUT[state.id] || {};
      const [[x0, y0], [x1, y1]] = state.bounds;
      const shortSide = Math.min(x1 - x0, y1 - y0);

      // Preserve the existing marker sizes. The visual-centre correction below
      // changes placement only; it does not enlarge or shrink the PNG artwork.
      const automaticSize = clamp(shortSide * 0.68, 34, 145);
      const iconSize = layout.iconSize ?? automaticSize * (layout.scale ?? 1);
      const fontSize = layout.fontSize ?? clamp(iconSize * 0.20, 10.5, 18.5);

      // PNG canvas has transparent padding. Anchor the *non-transparent artwork*
      // at the state centroid, not the centre/bottom of the 512x512 canvas.
      const [ax0, ay0, ax1, ay1] = MONUMENT_ART_BOUNDS[state.id] || [46, 64, 466, 448];
      const artCenterX = (ax0 + ax1) / (2 * 512);
      const artCenterY = (ay0 + ay1) / (2 * 512);

      const [cx, cy] = state.centroid;
      const markerX = cx + (layout.centerDx ?? 0);
      const markerY = cy + (layout.centerDy ?? 0);
      const imageX = -artCenterX * iconSize;
      const imageY = -artCenterY * iconSize;

      // Put the first line immediately below the visible PNG base. The SVG
      // text baseline accounts for the font ascender so the glyph top begins
      // just below the alpha edge, not below the transparent canvas edge.
      const visibleBottom = (ay1 / 512 - artCenterY) * iconSize;
      const labelGap = layout.labelGap ?? 2;
      const labelY = visibleBottom + labelGap + fontSize * 0.78 + (layout.labelDy ?? 0);
      const labelX = layout.labelDx ?? 0;

      const label = (layout.label || state.name).toUpperCase();
      const lines = layout.lines || [label];
      const lineHeight = fontSize * 1.08;
      const imagePath = `/assets/monuments/${state.id}.png`;
      const ariaLabel = escapeXml(`${state.name}: ${monument.name || 'monument marker'}`);
      const tspans = lines.map((line, index) => `
            <tspan x="${labelX.toFixed(2)}" dy="${index === 0 ? 0 : lineHeight.toFixed(2)}">${escapeXml(line)}</tspan>
          `).join('');

      return `
        <g class="state-label" data-state-id="${escapeXml(state.id)}"
           transform="translate(${markerX.toFixed(2)}, ${markerY.toFixed(2)})"
           pointer-events="none" aria-hidden="true">
          <title>${ariaLabel}</title>
          <image class="monument-art"
                 href="${imagePath}"
                 x="${imageX.toFixed(2)}"
                 y="${imageY.toFixed(2)}"
                 width="${iconSize.toFixed(2)}"
                 height="${iconSize.toFixed(2)}"
                 preserveAspectRatio="xMidYMid meet" />
          <text class="state-name"
                x="${labelX.toFixed(2)}"
                y="${labelY.toFixed(2)}"
                font-size="${fontSize.toFixed(2)}">${tspans}
          </text>
        </g>
      `;
    }).join('');
  }

  attachEventListeners() {
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
