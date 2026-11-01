// ==========================================================================
// VINTAGE MECHANICAL POCKET-WATCH TIME INSTRUMENT
// Antique Steampunk Exposed Clockwork & Precision Timeline Chronometer
// ==========================================================================

import { ERAS } from '../data/culinaryData.js';
import { audioEngine } from './AudioEngine.js';

export class PocketWatch {
  constructor(containerId, onEraChangeCallback) {
    this.container = document.getElementById(containerId);
    this.onEraChange = onEraChangeCallback;
    this.currentEraIndex = 0; // Starts at 1700
    this.currentAngle = 0; // Degrees (0 at 12 o'clock, clockwise)
    this.isDragging = false;
    this.animFrameId = null;

    this.render();
    this.attachEventListeners();
  }

  // Helper to generate SVG path for mechanical cog gears
  static createGearPath(cx, cy, rOuter, rInner, teeth, cutouts = []) {
    let d = '';
    const step = (Math.PI * 2) / teeth;
    
    // Outer perimeter with gear teeth
    for (let i = 0; i < teeth; i++) {
      const a0 = i * step;
      const a1 = a0 + step * 0.22;
      const a2 = a0 + step * 0.42;
      const a3 = a0 + step * 0.58;
      const a4 = a0 + step * 0.78;
      const a5 = a0 + step;

      const p0 = [cx + rInner * Math.cos(a0), cy + rInner * Math.sin(a0)];
      const p1 = [cx + rInner * Math.cos(a1), cy + rInner * Math.sin(a1)];
      const p2 = [cx + rOuter * Math.cos(a2), cy + rOuter * Math.sin(a2)];
      const p3 = [cx + rOuter * Math.cos(a3), cy + rOuter * Math.sin(a3)];
      const p4 = [cx + rInner * Math.cos(a4), cy + rInner * Math.sin(a4)];
      const p5 = [cx + rInner * Math.cos(a5), cy + rInner * Math.sin(a5)];

      if (i === 0) d += `M ${p0[0].toFixed(1)} ${p0[1].toFixed(1)} `;
      d += `L ${p1[0].toFixed(1)} ${p1[1].toFixed(1)} `;
      d += `L ${p2[0].toFixed(1)} ${p2[1].toFixed(1)} `;
      d += `L ${p3[0].toFixed(1)} ${p3[1].toFixed(1)} `;
      d += `L ${p4[0].toFixed(1)} ${p4[1].toFixed(1)} `;
      d += `L ${p5[0].toFixed(1)} ${p5[1].toFixed(1)} `;
    }
    d += 'Z ';

    // Circular holes/cutouts inside gear body (using evenodd fill-rule)
    cutouts.forEach(c => {
      d += `M ${c.x + c.r} ${c.y} A ${c.r} ${c.r} 0 1 0 ${c.x - c.r} ${c.y} A ${c.r} ${c.r} 0 1 0 ${c.x + c.r} ${c.y} Z `;
    });

    return d;
  }

  render() {
    this.container.innerHTML = `
      <!-- Antique Hanging Watch Chain -->
      <svg class="watch-chain-svg" viewBox="0 0 140 80" fill="none">
        <path d="M 130 5 C 90 20, 50 60, 20 72" stroke="url(#chainGoldGrad)" stroke-width="3" stroke-linecap="round" stroke-dasharray="4, 3" />
        <path d="M 130 5 C 90 20, 50 60, 20 72" stroke="#5a3d08" stroke-width="1" stroke-dasharray="2, 5" />
        <defs>
          <linearGradient id="chainGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fae79b" />
            <stop offset="50%" stop-color="#c99f32" />
            <stop offset="100%" stop-color="#644309" />
          </linearGradient>
        </defs>
      </svg>

      <!-- Antique Top Crown & Winding Bow Loop -->
      <div class="watch-crown-wrap" id="watch-crown-btn" title="Tactile Antique Winding Crown (Click to Advance Century)">
        <div class="watch-crown-bow"></div>
        <div class="watch-crown-knob"></div>
      </div>

      <!-- Pocket Watch Circular Beveled Casing -->
      <div class="watch-case" id="watch-dial-drag-target" title="Drag watch hand or click historical year to travel through time">
        <div class="watch-inner-bezel">
          <div class="watch-dial">
            
            <svg class="watch-dial-svg" viewBox="0 0 300 300" id="dial-svg">
              <defs>
                <!-- Antique Bronze Outer Casing Gradients -->
                <radialGradient id="caseBronzeRim" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#120e0a" />
                  <stop offset="82%" stop-color="#241a12" />
                  <stop offset="92%" stop-color="#4a3622" />
                  <stop offset="96%" stop-color="#846538" />
                  <stop offset="100%" stop-color="#1f160e" />
                </radialGradient>

                <!-- Dark Aged-Metal Dial Face (Mottled Patina & Vignette) -->
                <radialGradient id="agedDialDark" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#221e1a" />
                  <stop offset="45%" stop-color="#181512" />
                  <stop offset="80%" stop-color="#100e0b" />
                  <stop offset="100%" stop-color="#070605" />
                </radialGradient>

                <!-- Intricate Golden Mechanical Gear Gradients -->
                <linearGradient id="goldMetalGear" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#fae89f" />
                  <stop offset="25%" stop-color="#dfb746" />
                  <stop offset="50%" stop-color="#947019" />
                  <stop offset="75%" stop-color="#dcb241" />
                  <stop offset="100%" stop-color="#5a4009" />
                </linearGradient>

                <linearGradient id="goldGearDarker" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#e9ce75" />
                  <stop offset="35%" stop-color="#ba922b" />
                  <stop offset="70%" stop-color="#694e10" />
                  <stop offset="100%" stop-color="#3c2a05" />
                </linearGradient>

                <!-- Center Brass Cap Radial -->
                <radialGradient id="goldCapGrad" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stop-color="#fff8d1" />
                  <stop offset="45%" stop-color="#dcb241" />
                  <stop offset="85%" stop-color="#856114" />
                  <stop offset="100%" stop-color="#3b2605" />
                </radialGradient>

                <!-- Blued Steel Mechanical Hand Gradient -->
                <linearGradient id="bluedSteelHand" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#374b63" />
                  <stop offset="45%" stop-color="#1b2839" />
                  <stop offset="100%" stop-color="#0b131d" />
                </linearGradient>

                <!-- Glass Curved Reflection Layer -->
                <linearGradient id="glassReflection" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#ffffff" stop-opacity="0.28" />
                  <stop offset="30%" stop-color="#ffffff" stop-opacity="0.06" />
                  <stop offset="65%" stop-color="#ffffff" stop-opacity="0" />
                </linearGradient>

                <!-- Shadow Filters for Realistic Clockwork Depth -->
                <filter id="gearShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="1" dy="2.5" stdDeviation="2.5" flood-color="#000000" flood-opacity="0.9" />
                </filter>

                <filter id="handShadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="1.5" dy="3" stdDeviation="3" flood-color="#000000" flood-opacity="0.85" />
                </filter>
              </defs>

              <!-- Layer 1: Outer Stepped Antique Bronze & Brass Case -->
              <circle cx="150" cy="150" r="148" fill="url(#caseBronzeRim)" stroke="#3e2e1a" stroke-width="1.5" />
              <circle cx="150" cy="150" r="142" fill="none" stroke="#6f5228" stroke-width="1.8" />
              <circle cx="150" cy="150" r="139" fill="none" stroke="#d4af37" stroke-width="0.8" opacity="0.65" />
              <circle cx="150" cy="150" r="134" fill="none" stroke="#1f1810" stroke-width="2.5" />

              <!-- Outer Bezel Screws/Rivets at 12 Clock Positions -->
              ${this.renderBezelScrews()}

              <!-- Layer 2: Dark Aged-Metal Dial Face -->
              <circle cx="150" cy="150" r="131" fill="url(#agedDialDark)" stroke="#523e1b" stroke-width="1.2" />

              <!-- Outer Engraved Graduation Tracks (Roman Dial Ticks & Divisions) -->
              <circle cx="150" cy="150" r="126" fill="none" stroke="#7e6027" stroke-width="0.8" />
              <circle cx="150" cy="150" r="123" fill="none" stroke="#4a3715" stroke-width="0.5" stroke-dasharray="1.5, 3" />
              <circle cx="150" cy="150" r="95" fill="none" stroke="#8e6d2e" stroke-width="1.2" />
              <circle cx="150" cy="150" r="92" fill="none" stroke="#4a3715" stroke-width="0.7" stroke-dasharray="2, 3" />

              <!-- Decorative Radial Engraving Lines Between Tracks -->
              ${this.renderDialTicks()}

              <!-- Layer 3: Exposed Skeletal Clockwork & Intricate Golden Mechanical Gears -->
              <g id="exposed-gears-group" class="exposed-gears">
                ${this.renderMechanicalGears()}
              </g>

              <!-- Inner Dial Circular Bezel Framing the Clockwork -->
              <circle cx="150" cy="150" r="93" fill="none" stroke="url(#goldMetalGear)" stroke-width="1.5" filter="url(#gearShadow)" />
              <circle cx="150" cy="150" r="91" fill="none" stroke="#1c160e" stroke-width="1" />

              <!-- Layer 4: The 7 Historical Year Markers on Perimeter (NOT conventional hours!) -->
              <g id="dial-stations-group">
                ${this.renderDialStations()}
              </g>

              <!-- Layer 5: Traditional Mechanical Watch Hand (Rotates around EXACT center 150, 150) -->
              <g id="watch-hand" class="watch-hand-group" transform="rotate(0, 150, 150)" filter="url(#handShadow)">
                <!-- Pierced Breguet Spade Pointer & Tail -->
                <!-- Counterweight Tail -->
                <path d="M 148 150 L 148.5 168 C 148.5 174, 144 176, 144 180 C 144 185, 156 185, 156 180 C 156 176, 151.5 174, 151.5 168 L 152 150 Z" 
                      fill="url(#bluedSteelHand)" stroke="#06090e" stroke-width="0.7" />
                <circle cx="150" cy="180" r="2.8" fill="#120e0a" stroke="#d4af37" stroke-width="0.6" />

                <!-- Hand Shaft -->
                <path d="M 148.2 150 L 148.6 84 L 151.4 84 L 151.8 150 Z" 
                      fill="url(#bluedSteelHand)" stroke="#06090e" stroke-width="0.7" />
                <!-- Center Gold Spine Inlay -->
                <line x1="150" y1="145" x2="150" y2="82" stroke="url(#goldMetalGear)" stroke-width="0.9" stroke-linecap="round" />

                <!-- Pierced Antique Spade Head Aperture -->
                <path d="M 150 48 C 143 62, 142 76, 148.5 84 L 151.5 84 C 158 76, 157 62, 150 48 Z" 
                      fill="url(#bluedSteelHand)" stroke="#06090e" stroke-width="0.8" />
                <!-- Heart/Diamond Pierced Window in Spade Head -->
                <circle cx="150" cy="68" r="4.2" fill="#181512" stroke="url(#goldMetalGear)" stroke-width="1.2" />

                <!-- Needle Pointer Tip (Points directly to Historical Year at perimeter) -->
                <polygon points="150,34 148,48 152,48" fill="url(#bluedSteelHand)" stroke="#06090e" stroke-width="0.7" />
                <line x1="150" y1="34" x2="150" y2="28" stroke="url(#goldMetalGear)" stroke-width="1.4" stroke-linecap="round" />

                <!-- Hand Center Collar -->
                <circle cx="150" cy="150" r="8" fill="url(#bluedSteelHand)" stroke="#06090e" stroke-width="0.8" />
              </g>

              <!-- Layer 6: Center Hub & Prominent Active Historical Year Display (Stationary) -->
              <g id="center-hub-display" class="center-hub-stationary">
                <!-- Center Medallion Outer Bezel -->
                <circle cx="150" cy="150" r="43" fill="#16120e" stroke="#423117" stroke-width="2" filter="url(#gearShadow)" />
                <circle cx="150" cy="150" r="40" fill="url(#agedDialDark)" stroke="url(#goldMetalGear)" stroke-width="1.6" />
                <circle cx="150" cy="150" r="36" fill="none" stroke="#7e6027" stroke-width="0.6" stroke-dasharray="2, 3" />

                <!-- Active Year Display (Prominent at Centre of Watch) -->
                <text id="watch-center-year" x="150" y="145" class="watch-center-year">1700</text>
                <!-- Active Era Subtitle / Roman Anno -->
                <text id="watch-center-subtitle" x="150" y="161" class="watch-center-subtitle">MDCC • ERA</text>

                <!-- Center Fixed Axle Pin & Ruby Arbor (Mathematically Anchored at 150, 150) -->
                <circle cx="150" cy="150" r="5.2" fill="url(#goldCapGrad)" stroke="#2b1f07" stroke-width="0.8" />
                <circle cx="150" cy="150" r="2.2" class="watch-ruby-pivot" />
              </g>

              <!-- Layer 7: Antique Glass Crystal Highlight Arc -->
              <path d="M 22 150 A 128 128 0 0 1 278 150 A 128 100 0 0 0 22 150 Z" 
                    fill="url(#glassReflection)" pointer-events="none" />
            </svg>

          </div>
        </div>
      </div>

      <!-- Tactile Era Navigation Stepper Controls (Preserved Underneath Watch) -->
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

  // 12 Screws/Rivets around the outer bronze case
  renderBezelScrews() {
    let screws = '';
    const r = 142;
    for (let i = 0; i < 12; i++) {
      const rad = (i * 30) * (Math.PI / 180);
      const x = 150 + r * Math.cos(rad);
      const y = 150 + r * Math.sin(rad);
      screws += `
        <g transform="translate(${x.toFixed(1)}, ${y.toFixed(1)})">
          <circle cx="0" cy="0" r="2.8" fill="url(#goldCapGrad)" stroke="#221808" stroke-width="0.5" />
          <line x1="-1.6" y1="0" x2="1.6" y2="0" stroke="#221808" stroke-width="0.6" transform="rotate(${i * 30})" />
        </g>
      `;
    }
    return screws;
  }

  // Radial tick marks around dial rim
  renderDialTicks() {
    let ticks = '';
    const r1 = 120;
    const r2Major = 114;
    const r2Minor = 117;
    for (let i = 0; i < 60; i++) {
      const angle = i * 6;
      const isMajor = i % 5 === 0;
      const rInner = isMajor ? r2Major : r2Minor;
      const strokeW = isMajor ? 1.0 : 0.45;
      const strokeColor = isMajor ? '#a88337' : '#5c451b';

      const rad = (angle - 90) * (Math.PI / 180);
      const x1 = 150 + r1 * Math.cos(rad);
      const y1 = 150 + r1 * Math.sin(rad);
      const x2 = 150 + rInner * Math.cos(rad);
      const y2 = 150 + rInner * Math.sin(rad);

      ticks += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${strokeColor}" stroke-width="${strokeW}" />`;
    }
    return ticks;
  }

  // Exposed Clockwork Gears (Directly inspired by reference image 6)
  renderMechanicalGears() {
    // 1. Center Spoke Framework Gear (large 12-spoke wheel centered at 150, 150)
    let centerWheel = `
      <g id="gear-center-spokes" transform="rotate(0, 150, 150)" filter="url(#gearShadow)">
        <circle cx="150" cy="150" r="74" fill="none" stroke="url(#goldMetalGear)" stroke-width="3" />
        <circle cx="150" cy="150" r="70" fill="none" stroke="#251a09" stroke-width="1" />
        <circle cx="150" cy="150" r="44" fill="none" stroke="url(#goldMetalGear)" stroke-width="2.5" />
    `;
    for (let s = 0; s < 12; s++) {
      const a = s * 30;
      const rad = (a - 90) * (Math.PI / 180);
      const x1 = 150 + 44 * Math.cos(rad);
      const y1 = 150 + 44 * Math.sin(rad);
      const x2 = 150 + 72 * Math.cos(rad);
      const y2 = 150 + 72 * Math.sin(rad);
      centerWheel += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="url(#goldMetalGear)" stroke-width="2.2" stroke-linecap="round" />`;
    }
    centerWheel += '</g>';

    // 2. Upper-Left Gear (cx: 106, cy: 96, rOuter: 28, rInner: 22, 12 teeth, 5 cutouts)
    const gear1Cutouts = [];
    for (let i = 0; i < 5; i++) {
      const rad = (i * (360 / 5)) * (Math.PI / 180);
      gear1Cutouts.push({ x: 106 + 12 * Math.cos(rad), y: 96 + 12 * Math.sin(rad), r: 4.2 });
    }
    const gear1Path = PocketWatch.createGearPath(106, 96, 28, 22, 12, gear1Cutouts);

    // 3. Upper-Right Gear (cx: 194, cy: 94, rOuter: 35, rInner: 28, 16 teeth, 4 cutouts)
    const gear2Cutouts = [];
    for (let i = 0; i < 4; i++) {
      const rad = (i * 90 + 45) * (Math.PI / 180);
      gear2Cutouts.push({ x: 194 + 16 * Math.cos(rad), y: 94 + 16 * Math.sin(rad), r: 6.0 });
    }
    const gear2Path = PocketWatch.createGearPath(194, 94, 35, 28, 16, gear2Cutouts);

    // 4. Lower-Left Gear (cx: 100, cy: 196, rOuter: 33, rInner: 26, 14 teeth, 5 cutouts)
    const gear3Cutouts = [];
    for (let i = 0; i < 5; i++) {
      const rad = (i * 72) * (Math.PI / 180);
      gear3Cutouts.push({ x: 100 + 14 * Math.cos(rad), y: 196 + 14 * Math.sin(rad), r: 4.8 });
    }
    const gear3Path = PocketWatch.createGearPath(100, 196, 33, 26, 14, gear3Cutouts);

    // 5. Lower-Right Gear (cx: 196, cy: 190, rOuter: 30, rInner: 24, 12 teeth, 4 cutouts)
    const gear4Cutouts = [];
    for (let i = 0; i < 4; i++) {
      const rad = (i * 90) * (Math.PI / 180);
      gear4Cutouts.push({ x: 196 + 13 * Math.cos(rad), y: 190 + 13 * Math.sin(rad), r: 5.0 });
    }
    const gear4Path = PocketWatch.createGearPath(196, 190, 30, 24, 12, gear4Cutouts);

    // 6. Bottom Escapement Pinion (cx: 150, cy: 226, rOuter: 18, rInner: 14, 8 teeth)
    const gear5Cutouts = [{ x: 150, y: 226, r: 4.5 }];
    const gear5Path = PocketWatch.createGearPath(150, 226, 18, 14, 8, gear5Cutouts);

    return `
      <!-- Clockwork Base Texture & Plates -->
      <path d="M 85 90 L 140 70 L 210 85 L 215 150 L 160 230 L 90 210 Z" fill="#14110d" opacity="0.6" />
      
      <!-- Center Spoke Wheel -->
      ${centerWheel}

      <!-- Upper-Left Gear -->
      <g id="gear-top-left" transform="rotate(0, 106, 96)" filter="url(#gearShadow)">
        <path d="${gear1Path}" fill="url(#goldMetalGear)" fill-rule="evenodd" stroke="#3b2b08" stroke-width="0.7" />
        <circle cx="106" cy="96" r="6" fill="url(#goldCapGrad)" stroke="#1a1205" stroke-width="0.8" />
        <circle cx="106" cy="96" r="2" fill="#1a1205" />
      </g>

      <!-- Upper-Right Gear -->
      <g id="gear-top-right" transform="rotate(0, 194, 94)" filter="url(#gearShadow)">
        <path d="${gear2Path}" fill="url(#goldGearDarker)" fill-rule="evenodd" stroke="#3b2b08" stroke-width="0.7" />
        <circle cx="194" cy="94" r="8" fill="url(#goldCapGrad)" stroke="#1a1205" stroke-width="0.8" />
        <circle cx="194" cy="94" r="2.5" fill="#1a1205" />
      </g>

      <!-- Lower-Left Gear -->
      <g id="gear-bottom-left" transform="rotate(0, 100, 196)" filter="url(#gearShadow)">
        <path d="${gear3Path}" fill="url(#goldMetalGear)" fill-rule="evenodd" stroke="#3b2b08" stroke-width="0.7" />
        <circle cx="100" cy="196" r="7" fill="url(#goldCapGrad)" stroke="#1a1205" stroke-width="0.8" />
        <circle cx="100" cy="196" r="2.2" fill="#1a1205" />
      </g>

      <!-- Lower-Right Gear -->
      <g id="gear-bottom-right" transform="rotate(0, 196, 190)" filter="url(#gearShadow)">
        <path d="${gear4Path}" fill="url(#goldGearDarker)" fill-rule="evenodd" stroke="#3b2b08" stroke-width="0.7" />
        <circle cx="196" cy="190" r="7" fill="url(#goldCapGrad)" stroke="#1a1205" stroke-width="0.8" />
        <circle cx="196" cy="190" r="2.2" fill="#1a1205" />
      </g>

      <!-- Bottom Escape Pinion -->
      <g id="gear-bottom-pinion" transform="rotate(0, 150, 226)" filter="url(#gearShadow)">
        <path d="${gear5Path}" fill="url(#goldMetalGear)" fill-rule="evenodd" stroke="#3b2b08" stroke-width="0.7" />
        <circle cx="150" cy="226" r="4.5" fill="url(#goldCapGrad)" stroke="#1a1205" stroke-width="0.7" />
      </g>

      <!-- Antique Slotted Screws Holding Clockwork Plates -->
      <g transform="translate(130, 80)">
        <circle cx="0" cy="0" r="3.2" fill="url(#goldCapGrad)" stroke="#241a08" stroke-width="0.6" />
        <line x1="-1.8" y1="0" x2="1.8" y2="0" stroke="#1f1406" stroke-width="0.7" />
      </g>
      <g transform="translate(170, 225)">
        <circle cx="0" cy="0" r="3.2" fill="url(#goldCapGrad)" stroke="#241a08" stroke-width="0.6" />
        <line x1="-1.3" y1="-1.3" x2="1.3" y2="1.3" stroke="#1f1406" stroke-width="0.7" />
      </g>
      <g transform="translate(85, 145)">
        <circle cx="0" cy="0" r="3.2" fill="url(#goldCapGrad)" stroke="#241a08" stroke-width="0.6" />
        <line x1="0" y1="-1.8" x2="0" y2="1.8" stroke="#1f1406" stroke-width="0.7" />
      </g>
    `;
  }

  // Render the 7 Historical Year Markers on perimeter (NOT clock numbers!)
  renderDialStations() {
    return ERAS.map((era, index) => {
      // Angle: 0 at 12 o'clock (top), clockwise
      const rad = (era.angle - 90) * (Math.PI / 180);
      const rRivet = 124;
      const rText = 108;

      const xRivet = 150 + rRivet * Math.cos(rad);
      const yRivet = 150 + rRivet * Math.sin(rad);
      const xText = 150 + rText * Math.cos(rad);
      const yText = 150 + rText * Math.sin(rad) + 4.5; // Baseline offset for visual optical centering

      const isActive = index === 0 ? 'active' : '';

      return `
        <g class="dial-station ${isActive}" data-era-id="${era.id}" data-index="${index}" role="button" aria-label="Select Year ${era.label}">
          <!-- Invisible generous touch/click hit area -->
          <circle cx="${xText.toFixed(1)}" cy="${(yText - 4.5).toFixed(1)}" r="18" fill="transparent" class="dial-station-hitarea" />
          
          <!-- Outer Ruby/Gold Rivet Indicator -->
          <circle cx="${xRivet.toFixed(1)}" cy="${yRivet.toFixed(1)}" r="3.5" class="dial-station-rivet" />
          <circle cx="${xRivet.toFixed(1)}" cy="${yRivet.toFixed(1)}" r="1.5" class="dial-station-rivet-center" />

          <!-- Historical Year Label (Antique Golden Engraved Serif) -->
          <text x="${xText.toFixed(1)}" y="${yText.toFixed(1)}" class="dial-station-label">${era.label}</text>
        </g>
      `;
    }).join('');
  }

  attachEventListeners() {
    const dragTarget = document.getElementById('watch-dial-drag-target');
    const stations = document.querySelectorAll('.dial-station');
    const prevBtn = document.getElementById('btn-prev-era');
    const nextBtn = document.getElementById('btn-next-era');
    const crownBtn = document.getElementById('watch-crown-btn');

    // 1. Direct station clicks
    stations.forEach(station => {
      station.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = parseInt(station.getAttribute('data-index'), 10);
        this.selectEraByIndex(index);
      });
    });

    // 2. Stepper buttons beneath the watch
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const nextIdx = this.currentEraIndex > 0 ? this.currentEraIndex - 1 : ERAS.length - 1;
        this.selectEraByIndex(nextIdx);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const nextIdx = this.currentEraIndex < ERAS.length - 1 ? this.currentEraIndex + 1 : 0;
        this.selectEraByIndex(nextIdx);
      });
    }

    // 3. Antique top crown click cycles forward
    if (crownBtn) {
      crownBtn.addEventListener('click', () => {
        if (nextBtn) nextBtn.click();
      });
    }

    // 4. Smooth Pointer Dragging to Rotate Watch Hand
    const onPointerDown = (e) => {
      // Don't drag if clicking directly on a station button or stepper
      if (e.target.closest('.dial-station') || e.target.closest('.watch-stepper-btn')) return;

      this.isDragging = true;
      if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
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

    if (dragTarget) {
      dragTarget.addEventListener('pointerdown', onPointerDown);
    }

    // 5. Keyboard Navigation (Arrow Keys)
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (nextBtn) nextBtn.click();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (prevBtn) prevBtn.click();
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

    // Angle in degrees from 12 o'clock (clockwise, 0 at top)
    let deg = Math.atan2(dx, -dy) * (180 / Math.PI);
    if (deg < 0) deg += 360;

    this.currentAngle = deg;
    this.setHandAngle(deg);
  }

  // Mathematical rotation strictly anchored to center (150, 150)
  setHandAngle(angle) {
    const hand = document.getElementById('watch-hand');
    if (hand) {
      // SVG rotate(deg, cx, cy) guarantees exact center pivot with zero offset
      hand.setAttribute('transform', `rotate(${angle.toFixed(2)}, 150, 150)`);
    }

    // Subtly rotate exposed mechanical clockwork gears
    this.updateClockworkGears(angle);
  }

  // Realistic gear meshing animations tied to the watch hand angle
  updateClockworkGears(angle) {
    const gSpokes = document.getElementById('gear-center-spokes');
    const g1 = document.getElementById('gear-top-left');
    const g2 = document.getElementById('gear-top-right');
    const g3 = document.getElementById('gear-bottom-left');
    const g4 = document.getElementById('gear-bottom-right');
    const gPinion = document.getElementById('gear-bottom-pinion');

    if (gSpokes) gSpokes.setAttribute('transform', `rotate(${(-angle * 0.4).toFixed(2)}, 150, 150)`);
    if (g1) g1.setAttribute('transform', `rotate(${(-angle * 1.25).toFixed(2)}, 106, 96)`);
    if (g2) g2.setAttribute('transform', `rotate(${(angle * 0.95).toFixed(2)}, 194, 94)`);
    if (g3) g3.setAttribute('transform', `rotate(${(-angle * 1.1).toFixed(2)}, 100, 196)`);
    if (g4) g4.setAttribute('transform', `rotate(${(angle * 1.3).toFixed(2)}, 196, 190)`);
    if (gPinion) gPinion.setAttribute('transform', `rotate(${(-angle * 2.2).toFixed(2)}, 150, 226)`);
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

  // Smooth mechanical animation to target historical year marker
  animateHandToAngle(targetAngle) {
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);

    const startAngle = this.currentAngle;
    let delta = (targetAngle - startAngle) % 360;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    const duration = 450; // ms
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Authentic mechanical ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const angle = startAngle + delta * ease;

      this.setHandAngle(angle);

      if (progress < 1) {
        this.animFrameId = requestAnimationFrame(tick);
      } else {
        this.currentAngle = (targetAngle % 360 + 360) % 360;
        this.setHandAngle(this.currentAngle);
        this.animFrameId = null;
      }
    };

    this.animFrameId = requestAnimationFrame(tick);
  }

  selectEraByIndex(index) {
    if (index < 0 || index >= ERAS.length) return;
    this.currentEraIndex = index;
    const era = ERAS[index];

    // Play mechanical escapement audio click
    audioEngine.playTick();

    // Smooth mechanical hand rotation to the exact historical marker angle
    this.animateHandToAngle(era.angle);

    // Update active highlight styling on perimeter dial stations
    document.querySelectorAll('.dial-station').forEach(station => {
      const sIndex = parseInt(station.getAttribute('data-index'), 10);
      if (sIndex === index) {
        station.classList.add('active');
      } else {
        station.classList.remove('active');
      }
    });

    // Update Prominent Center Year Display
    const yearText = document.getElementById('watch-center-year');
    const subText = document.getElementById('watch-center-subtitle');
    if (yearText) yearText.textContent = era.label;
    if (subText) subText.textContent = `${era.roman} • ERA`;

    // Invoke global callback to update main era theme, descriptions, and active state canvas
    if (this.onEraChange) {
      this.onEraChange(era);
    }
  }

  getYear() {
    return ERAS[this.currentEraIndex].year;
  }
}
