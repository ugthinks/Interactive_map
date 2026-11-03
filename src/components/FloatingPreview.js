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
        const firstDish = eraContent.dishes && eraContent.dishes[0];
    const heroImage = (firstDish && firstDish.image) || eraContent.signatureImage;
    this.dishEl.textContent = (firstDish && firstDish.name) || eraContent.signatureDish;
    this.flavorEl.textContent = eraContent.signatureFlavor;

    if (this.imgEl) {
        this.imgEl.src = heroImage;
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

    const cardWidth = 280;
    const cardHeight = 240;
    const padding = 20;

    let x = e.clientX;

    // Horizontal boundary checking
    if (x + cardWidth / 2 > window.innerWidth - padding) {
      x = window.innerWidth - cardWidth / 2 - padding;
    }
    if (x - cardWidth / 2 < padding) {
      x = cardWidth / 2 + padding;
    }

    // Vertical placement:
    // When hovering over northern states near the top of the map (Jammu & Kashmir,
    // Punjab, Haryana, Himachal Pradesh, Uttarakhand), comfortably display the card
    // BELOW the pointer so it never collides with the cursor or the top boundary.
    let y;
    if (e.clientY < cardHeight + 45) {
      y = e.clientY + 22; // Margin below cursor
    } else {
      y = e.clientY - cardHeight - 16; // Margin above cursor
    }

    // Viewport vertical clamping
    if (y < padding) y = padding;
    if (y + cardHeight > window.innerHeight - padding) {
      y = window.innerHeight - cardHeight - padding;
    }

    this.el.style.left = `${Math.round(x)}px`;
    this.el.style.top = `${Math.round(y)}px`;
  }

  hide() {
    if (!this.el) return;
    this.currentStateId = null;
    this.el.classList.remove('is-visible');
    this.el.setAttribute('aria-hidden', 'true');
  }
}
