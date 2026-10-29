// ==========================================================================
// FLOATING HOVER PREVIEW (Lightweight, Non-Obstructive Tooltip)
// ==========================================================================

import { getStateData, getStateEraContent } from '../data/culinaryData.js';

export class FloatingPreview {
  constructor(previewId, options = {}) {
    this.el = document.getElementById(previewId);
    this.imgEl = document.getElementById('preview-img');
    this.eraTagEl = document.getElementById('preview-era-tag');
    this.regionEl = document.getElementById('preview-region');
    this.titleEl = document.getElementById('preview-title');
    this.dishEl = document.getElementById('preview-dish');
    this.flavorEl = document.getElementById('preview-flavor');
    this.onClick = options.onClick || (() => {});
    this.currentStateId = null;

    if (this.el) {
      this.el.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.currentStateId) {
          this.onClick(this.currentStateId);
        }
      });
    }
  }

  show(stateId, eraId, mouseEvent) {
    if (!this.el) return;

    this.currentStateId = stateId;
    const state = getStateData(stateId);
    if (!state) return;

    const eraContent = getStateEraContent(stateId, eraId);
    if (!eraContent) return;

    // Populate data
    this.regionEl.textContent = `${state.region} INDIA`;
    this.titleEl.textContent = state.name;
    this.eraTagEl.textContent = String(eraId);
    this.dishEl.textContent = eraContent.signatureDish;
    this.flavorEl.textContent = eraContent.signatureFlavor;

    if (this.imgEl) {
      this.imgEl.src = eraContent.signatureImage;
      this.imgEl.onerror = () => {
        this.imgEl.src = '/assets/awadhi_dum_biryani.jpg';
      };
    }

    this.updatePosition(mouseEvent);
    this.el.classList.add('is-visible');
    this.el.setAttribute('aria-hidden', 'false');
  }

  updatePosition(e) {
    if (!this.el || !e) return;

    const cardWidth = 260;
    const cardHeight = 220;
    const padding = 20;

    let x = e.clientX;
    let y = e.clientY - 20;

    // Boundary check right edge
    if (x + cardWidth / 2 > window.innerWidth - padding) {
      x = window.innerWidth - cardWidth / 2 - padding;
    }
    // Boundary check left edge
    if (x - cardWidth / 2 < padding) {
      x = cardWidth / 2 + padding;
    }
    // Boundary check top edge
    if (y - cardHeight < padding) {
      y = e.clientY + cardHeight + 20;
    }

    this.el.style.left = `${x}px`;
    this.el.style.top = `${y}px`;
  }

  hide() {
    if (!this.el) return;
    this.currentStateId = null;
    this.el.classList.remove('is-visible');
    this.el.setAttribute('aria-hidden', 'true');
  }
}
