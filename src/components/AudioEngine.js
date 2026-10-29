// ==========================================================================
// AUDIO ENGINE (Web Audio API Synthesizer for Antique Tactile Feedback)
// ==========================================================================

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true; // muted by default for respectful UX
    this.ambientGain = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.init();
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.playTick();
    }
    return this.isMuted;
  }

  // Mechanical Pocket Watch Escapement Tick
  playTick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      
      // High click oscillator (metal pawl striking ratchet)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2400, t);
      osc.frequency.exponentialRampToValueAtTime(300, t + 0.04);
      
      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(t);
      osc.stop(t + 0.045);

      // Low brass resonant body click
      const oscLow = this.ctx.createOscillator();
      const gainLow = this.ctx.createGain();
      
      oscLow.type = 'sine';
      oscLow.frequency.setValueAtTime(800, t);
      oscLow.frequency.exponentialRampToValueAtTime(120, t + 0.035);
      
      gainLow.gain.setValueAtTime(0.12, t);
      gainLow.gain.exponentialRampToValueAtTime(0.001, t + 0.035);
      
      oscLow.connect(gainLow);
      gainLow.connect(this.ctx.destination);
      
      oscLow.start(t);
      oscLow.stop(t + 0.04);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // Resonant Antique Brass Chime for State Selection
  playStateSelect() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, t); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, t + 0.15); // E5

      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.85);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // Subtle Return Chime
  playReturn() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, t); // E5
      osc.frequency.exponentialRampToValueAtTime(440.00, t + 0.2); // A4

      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.65);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }
}

export const audioEngine = new AudioEngine();
