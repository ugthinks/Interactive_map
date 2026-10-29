// ==========================================================================
// INDIA, SERVED THROUGH TIME — MAIN ORCHESTRATION ENGINE
// ==========================================================================

import { ERAS, getEra, getStateData } from './data/culinaryData.js';
import { STATES_MAP } from './data/mapData.js';
import { audioEngine } from './components/AudioEngine.js';
import { PocketWatch } from './components/PocketWatch.js';
import { IndiaMap } from './components/IndiaMap.js';
import { StateCanvas } from './components/StateCanvas.js';
import { FloatingPreview } from './components/FloatingPreview.js';

class CulinaryAtlasApp {
  constructor() {
    this.currentEra = ERAS[0]; // 1700
    this.selectedStateId = null;

    this.init();
  }

  init() {
    // 1. Initialize Floating Preview
    this.preview = new FloatingPreview('hover-preview', {
      onClick: (stateId) => {
        this.map.selectState(stateId);
      }
    });

    // 2. Initialize India Map
    this.map = new IndiaMap('map-container', {
      onStateHover: (stateId, e) => {
        if (!this.selectedStateId) {
          this.preview.show(stateId, this.currentEra.id, e);
        }
      },
      onStateLeave: () => {
        this.preview.hide();
      },
      onStateSelect: (stateId) => {
        this.selectState(stateId);
      }
    });

    // 3. Initialize State Canvas (Expanded Immersive Experience)
    this.stateCanvas = new StateCanvas('state-canvas', {
      mapEngine: this.map,
      onReturn: () => {
        this.selectedStateId = null;
        this.map.resetZoom();
      }
    });

    // 4. Initialize Pocket Watch Time Wheel
    this.watch = new PocketWatch('pocket-watch-container', (newEra) => {
      this.handleEraChange(newEra);
    });

    // 5. Populate Territories & Islands Accessibility Dock
    this.setupIslandsDock();

    // 6. Setup Audio Toggle
    this.setupAudioToggle();

    // 7. Apply Initial Era Theme
    this.applyEraTheme(this.currentEra);
  }

  handleEraChange(newEra) {
    this.currentEra = newEra;
    this.applyEraTheme(newEra);

    // If a state is currently selected, morph its culinary stories live
    if (this.selectedStateId) {
      this.stateCanvas.updateEra(newEra.id);
    }
  }

  applyEraTheme(era) {
    // 1. Update Body Theme Class
    document.body.className = era.theme.bgClass;

    // 2. Update Masthead Info
    const yearEl = document.getElementById('masthead-year');
    const eraNameEl = document.getElementById('masthead-era-name');
    const chronicleEl = document.getElementById('masthead-chronicle');

    if (yearEl) yearEl.textContent = era.label;
    if (eraNameEl) eraNameEl.textContent = era.title;
    if (chronicleEl) chronicleEl.textContent = era.theme.chronicle;
  }

  selectState(stateId) {
    this.selectedStateId = stateId;
    this.preview.hide();
    this.stateCanvas.open(stateId, this.currentEra.id);
  }

  setupIslandsDock() {
    const dropdown = document.getElementById('state-select-dropdown');
    const dockChips = document.getElementById('islands-chips');

    // Populate all 36 states sorted alphabetically in dropdown
    if (dropdown) {
      const allStates = [...STATES_MAP].sort((a, b) => a.name.localeCompare(b.name));
      dropdown.innerHTML = '<option value="">Jump to Any State (36)...</option>' + 
        allStates.map(s => `<option value="${s.id}">${s.name}</option>`).join('');

      dropdown.addEventListener('change', (e) => {
        const id = e.target.value;
        if (id) {
          this.map.selectState(id);
          dropdown.value = '';
        }
      });
    }

    if (!dockChips) return;

    // Filter small territories and islands for quick accessible selection
    const smallTerritories = STATES_MAP.filter(s => s.isIslandOrSmall);

    dockChips.innerHTML = smallTerritories.map(st => `
      <button class="dock-chip" data-id="${st.id}">
        ${st.name}
      </button>
    `).join('');

    dockChips.querySelectorAll('.dock-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        this.map.selectState(id);
      });
    });
  }

  setupAudioToggle() {
    const soundBtn = document.getElementById('sound-toggle');
    const statusText = document.getElementById('sound-status');
    const icon = soundBtn ? soundBtn.querySelector('.sound-icon') : null;

    if (!soundBtn) return;

    soundBtn.addEventListener('click', () => {
      const isMuted = audioEngine.toggleMute();
      if (statusText) {
        statusText.textContent = isMuted ? 'Off' : 'On';
      }
      if (icon) {
        if (isMuted) {
          icon.innerHTML = `
            <path d="M11 5L6 9H2v6h4l5 4V5z"/>
            <line x1="23" y1="9" x2="17" y2="15"/>
            <line x1="17" y1="9" x2="23" y2="15"/>
          `;
        } else {
          icon.innerHTML = `
            <path d="M11 5L6 9H2v6h4l5 4V5z"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
          `;
        }
      }
    });
  }
}

// Bootstrap on DOM Ready
window.addEventListener('DOMContentLoaded', () => {
  const app = new CulinaryAtlasApp();
  window.atlasApp = app;
  window.selectState = (id) => app.map.selectState(id);

  // Check URL params for initial state selection
  const params = new URLSearchParams(window.location.search);
  const initialState = params.get('state');
  if (initialState) {
    setTimeout(() => {
      app.map.selectState(initialState);
    }, 400);
  }

  console.log('✦ INDIA, SERVED THROUGH TIME initialized successfully.');
});
