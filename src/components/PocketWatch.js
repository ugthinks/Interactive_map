// ==========================================================================
// VINTAGE POCKET-WATCH TIME INSTRUMENT (Interactive Historical Chronometer)
// ==========================================================================

import { ERAS } from '../data/culinaryData.js';
import { audioEngine } from './AudioEngine.js';

export class PocketWatch {
  constructor(containerId, onEraChangeCallback) {
    this.container = document.getElementById(containerId);
    this.onEraChange = onEraChangeCallback;
    this.currentEraIndex = 0; // starts at 1700
    this.isDragging = false;
    this.currentAngle = 0;

    this.render();
    this.attachEventListeners();
  }

  render() {
    this.container.innerHTML = `
      <!-- Delicate Hanging Gold Watch Chain -->
      <svg class="watch-chain-svg" viewBox="0 0 140 80" fill="none">
        <path d="M 130 5 C 90 20, 50 60, 20 72" stroke="url(#chainGoldGrad)" stroke-width="3" stroke-linecap="round" stroke-dasharray="4, 3" />
        <path d="M 130 5 C 90 20, 50 60, 20 72" stroke="#684a0d" stroke-width="1" stroke-dasharray="2, 5" />
        <defs>
          <linearGradient id="chainGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f5e08c" />
            <stop offset="50%" stop-color="#c99f32" />
            <stop offset="100%" stop-color="#7a5814" />
          </linearGradient>
        </defs>
      </svg>

      <!-- Antique Top Crown & Winding Bow Loop -->
      <div class="watch-crown-wrap" id="watch-crown-btn" title="Tactile Antique Winding Crown (Click to Advance Century)">
        <div class="watch-crown-bow"></div>
        <div class="watch-crown-knob"></div>
      </div>

      <!-- Pocket Watch Circular Beveled Casing -->
      <div class="watch-case" id="watch-dial-drag-target" title="Drag watch hand or click era to travel through time">
        <div class="watch-inner-bezel">
          <div class="watch-dial">
            
            <svg class="watch-dial-svg" viewBox="0 0 200 200" id="dial-svg">
              <defs>
                <!-- Radial Dial Gradients -->
                <radialGradient id="ivoryEnamel" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#fffef8" />
                  <stop offset="65%" stop-color="#f5eed6" />
                  <stop offset="90%" stop-color="#e2d4af" />
                  <stop offset="100%" stop-color="#c5b286" />
                </radialGradient>
                <radialGradient id="goldCapGrad" cx="40%" cy="35%" r="60%">
                  <stop offset="0%" stop-color="#fff1b5" />
                  <stop offset="50%" stop-color="#d4af37" />
                  <stop offset="100%" stop-color="#5a410d" />
                </radialGradient>
                <!-- Glass Specular Reflection Highlight -->
                <linearGradient id="glassReflection" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#ffffff" stop-opacity="0.35" />
                  <stop offset="35%" stop-color="#ffffff" stop-opacity="0.08" />
                  <stop offset="60%" stop-color="#ffffff" stop-opacity="0" />
                </linearGradient>
              </defs>

              <!-- Ivory Dial Background -->
              <circle cx="100" cy="100" r="96" fill="url(#ivoryEnamel)" stroke="#745618" stroke-width="1.2" />

              <!-- Outer Minute Track & Fine Radial Ticks -->
              <circle cx="100" cy="100" r="91" fill="none" stroke="#8d6e27" stroke-width="0.8" />
              <circle cx="100" cy="100" r="85" fill="none" stroke="#8d6e27" stroke-width="0.5" stroke-dasharray="1.5, 3" />
              
              <!-- Subtle Ornamental Compass Star in Dial Face -->
              <g opacity="0.14">
                <circle cx="100" cy="100" r="38" fill="none" stroke="#684a0d" stroke-width="0.8" stroke-dasharray="2, 4" />
                <path d="M 100 68 L 100 132 M 68 100 L 132 100" stroke="#684a0d" stroke-width="0.5" />
              </g>

              <!-- Sub-Dial / Era Complication Display (Stationary at bottom) -->
              <g transform="translate(100, 138)">
                <circle cx="0" cy="0" r="21" fill="#ede1c1" stroke="#8d6e27" stroke-width="0.8" />
                <circle cx="0" cy="0" r="19" fill="none" stroke="#aa8c40" stroke-width="0.4" stroke-dasharray="1, 2" />
                <text x="0" y="-7" font-family="'Cinzel Decorative', serif" font-size="5" font-weight="700" fill="#684a0d" text-anchor="middle" letter-spacing="1">ANNO</text>
                <text id="subdial-year-text" x="0" y="5" font-family="'Cinzel Decorative', serif" font-size="11" font-weight="900" fill="#9b2226" text-anchor="middle">1700</text>
                <text id="subdial-roman-text" x="0" y="13" font-family="'Cinzel', serif" font-size="4.8" font-weight="600" fill="#4a3717" text-anchor="middle">MDCC</text>
              </g>

              <!-- Radial Era Stations (Roman Numerals & Rivets) -->
              <g id="dial-stations-group">
                ${this.renderDialStations()}
              </g>

              <!-- Antique Blued-Steel Breguet Mechanical Clock Hand -->
              <g id="watch-hand" class="watch-hand-group" transform="rotate(0, 100, 100)">
                <!-- Compact Counterweight Tail (Won't overlap the sub-dial) -->
                <path d="M 97.5 100 L 98 114 C 98 118, 95 120, 95 123 C 95 127, 105 127, 105 123 C 105 120, 102 118, 102 114 L 102.5 100 Z" fill="#1b2839" stroke="#0a1017" stroke-width="0.6" />
                <!-- Center Moon Aperture in Hand -->
                <circle cx="100" cy="48" r="5.5" fill="#f5eed6" stroke="#1b2839" stroke-width="2" />
                <!-- Long Sleek Hand Shaft & Pointer -->
                <path d="M 98.8 100 L 98.6 54 C 98.6 54, 98 48, 100 42 C 102 48, 101.4 54, 101.4 54 L 101.2 100 Z" fill="#1b2839" stroke="#0a1017" stroke-width="0.5" />
                <polygon points="100,22 97.5,42 102.5,42" fill="#1b2839" stroke="#0a1017" stroke-width="0.5" />
                <line x1="100" y1="22" x2="100" y2="16" stroke="#1b2839" stroke-width="1.3" stroke-linecap="round" />
                
                <!-- Center Brass Cap & Ruby Pivot Pin -->
                <circle cx="100" cy="100" r="7.5" fill="url(#goldCapGrad)" stroke="#45310a" stroke-width="0.8" />
                <circle cx="100" cy="100" r="3" class="watch-ruby-pivot" />
              </g>

              <!-- Glass Curved Reflection Layer -->
              <path d="M 12 100 A 88 88 0 0 1 188 100 A 88 70 0 0 0 12 100 Z" fill="url(#glassReflection)" pointer-events="none" />
            </svg>

          </div>
        </div>
      </div>

      <!-- Tactile Era Navigation Stepper Controls -->
      <nav class="watch-controls-bar" aria-label="Era Stepper Navigation">
        <button id="btn-prev-era" class="watch-stepper-btn" title="Previous Era" aria-label="Previous Era">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          <span>Prev</span>
        </button>
        <button id="btn-next-era" class="watch-stepper-btn" title="Next Era" aria-label="Next Era">
          <span>Next</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </nav>
    `;
  }

  renderDialStations() {
    return ERAS.map((era, index) => {
      // Angles arranged radially from 0 to 308.4 degrees (clockwise starting at 12 o'clock)
      const rad = (era.angle - 90) * (Math.PI / 180);
      const rRivet = 75;
      const rText = 61;
      const xRivet = 100 + rRivet * Math.cos(rad);
      const yRivet = 100 + rRivet * Math.sin(rad);
      const xText = 100 + rText * Math.cos(rad);
      const yText = 100 + rText * Math.sin(rad) + 2.5;

      const isActive = index === 0 ? 'active' : '';

      return `
        <g class="dial-station ${isActive}" data-era-id="${era.id}" data-index="${index}">
          <circle cx="${xRivet}" cy="${yRivet}" r="3.2" class="dial-station-rivet" />
          <text x="${xText}" y="${yText}" class="dial-station-label">${era.label}</text>
        </g>
      `;
    }).join('');
  }

  attachEventListeners() {
    const dialSvg = document.getElementById('dial-svg');
    const dragTarget = document.getElementById('watch-dial-drag-target');
    const stations = document.querySelectorAll('.dial-station');
    const prevBtn = document.getElementById('btn-prev-era');
    const nextBtn = document.getElementById('btn-next-era');
    const crownBtn = document.getElementById('watch-crown-btn');

    // Direct station clicks
    stations.forEach(station => {
      station.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = parseInt(station.getAttribute('data-index'), 10);
        this.selectEraByIndex(index);
      });
    });

    // Stepper buttons
    prevBtn.addEventListener('click', () => {
      if (this.currentEraIndex > 0) {
        this.selectEraByIndex(this.currentEraIndex - 1);
      } else {
        this.selectEraByIndex(ERAS.length - 1);
      }
    });

    nextBtn.addEventListener('click', () => {
      if (this.currentEraIndex < ERAS.length - 1) {
        this.selectEraByIndex(this.currentEraIndex + 1);
      } else {
        this.selectEraByIndex(0);
      }
    });

    // Crown click cycles forward
    crownBtn.addEventListener('click', () => {
      nextBtn.click();
    });

    // Drag to rotate watch hand
    const onPointerDown = (e) => {
      this.isDragging = true;
      audioEngine.playTick();
      this.handlePointerMove(e);
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
    };

    const onPointerMove = (e) => {
      if (!this.isDragging) return;
      this.handlePointerMove(e);
    };

    const onPointerUp = () => {
      if (!this.isDragging) return;
      this.isDragging = false;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      this.snapToNearestEra();
    };

    dragTarget.addEventListener('pointerdown', onPointerDown);

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextBtn.click();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        prevBtn.click();
      }
    });
  }

  handlePointerMove(e) {
    const dialSvg = document.getElementById('dial-svg');
    if (!dialSvg) return;
    const rect = dialSvg.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = e.clientX - cx;
    const dy = e.clientY - cy;

    // Angle in degrees from 12 o'clock (0 at top, positive clockwise)
    let deg = Math.atan2(dx, -dy) * (180 / Math.PI);
    if (deg < 0) deg += 360;

    this.currentAngle = deg;
    const hand = document.getElementById('watch-hand');
    if (hand) {
      hand.setAttribute('transform', `rotate(${deg}, 100, 100)`);
    }
  }

  snapToNearestEra() {
    let closestIndex = 0;
    let minDiff = Infinity;

    ERAS.forEach((era, idx) => {
      let diff = Math.abs(this.currentAngle - era.angle);
      if (diff > 180) diff = 360 - diff;
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });

    this.selectEraByIndex(closestIndex);
  }

  selectEraByIndex(index) {
    if (index < 0 || index >= ERAS.length) return;
    this.currentEraIndex = index;
    const era = ERAS[index];

    // Play mechanical tick
    audioEngine.playTick();

    // Rotate hand smoothly
    const hand = document.getElementById('watch-hand');
    if (hand) {
      hand.setAttribute('transform', `rotate(${era.angle}, 100, 100)`);
    }

    // Update active class on stations
    document.querySelectorAll('.dial-station').forEach(station => {
      const sIndex = parseInt(station.getAttribute('data-index'), 10);
      if (sIndex === index) {
        station.classList.add('active');
      } else {
        station.classList.remove('active');
      }
    });

    // Update Sub-Dial Texts
    const yearText = document.getElementById('subdial-year-text');
    const romanText = document.getElementById('subdial-roman-text');
    if (yearText) yearText.textContent = era.label;
    if (romanText) romanText.textContent = era.roman;

    // Invoke callback
    if (this.onEraChange) {
      this.onEraChange(era);
    }
  }

  getYear() {
    return ERAS[this.currentEraIndex].year;
  }
}
