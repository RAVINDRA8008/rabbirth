// Zero-dependency, lightweight Web Audio API procedural sound engine
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isMuted = true; // start muted by default so it respects user preference
    this.musicTimer = null;
    this.isPlayingMusic = false;
    this.activeOscillators = [];
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.85, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.init();
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopMusic();
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
        this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      }
    } else {
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
        this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
      }
      this.stopMusic();
      this.playBirthdayMelody();
    }
    return !this.isMuted;
  }

  stopMusic() {
    this.isPlayingMusic = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
    // Instantly stop and disconnect all scheduled oscillators
    while (this.activeOscillators.length > 0) {
      const osc = this.activeOscillators.pop();
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {}
    }
  }

  // Cute Pop Sound for Balloons
  playPop() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain || this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {}
  }

  // Breathy whoosh for blowing candle
  playBlow() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // Soft chime after blow
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0.15, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.6);

        osc.connect(gain);
        gain.connect(this.masterGain || this.ctx.destination);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.6);
      });
    } catch (e) {}
  }

  // Celebratory party chime
  playFanfare() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const chord = [523.25, 659.25, 783.99, 987.77, 1046.5];
      chord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.12, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.8);

        osc.connect(gain);
        gain.connect(this.masterGain || this.ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.8);
      });
    } catch (e) {}
  }

  // Procedural music box "Happy Birthday" melody (calm, gentle, sweet)
  playBirthdayMelody() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().then(() => {
        if (!this.isMuted) this.playBirthdayMelody();
      });
      return;
    }

    this.isPlayingMusic = true;
    this.stopMusic();
    this.isPlayingMusic = true;

    // Melody in sweet music-box octave (C5 - C6): [frequency, duration in seconds]
    const notes = [
      [523.25, 0.38], [523.25, 0.28], [587.33, 0.65], [523.25, 0.65], [698.46, 0.65], [659.25, 1.1],
      [523.25, 0.38], [523.25, 0.28], [587.33, 0.65], [523.25, 0.65], [783.99, 0.65], [698.46, 1.1],
      [523.25, 0.38], [523.25, 0.28], [1046.50, 0.65], [880.00, 0.65], [698.46, 0.65], [659.25, 0.65], [587.33, 0.85],
      [932.33, 0.38], [932.33, 0.28], [880.00, 0.65], [698.46, 0.65], [783.99, 0.65], [698.46, 1.3],
    ];

    let timeOffset = 0.04;
    const now = this.ctx.currentTime;

    notes.forEach(([freq, dur]) => {
      if (this.isMuted) return;

      // 1. Primary Music Box Tine (Triangle)
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, now + timeOffset);

      gain1.gain.setValueAtTime(0.0001, now + timeOffset);
      gain1.gain.linearRampToValueAtTime(0.28, now + timeOffset + 0.015);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + timeOffset + dur);

      osc1.connect(gain1);
      gain1.connect(this.masterGain || this.ctx.destination);

      osc1.start(now + timeOffset);
      osc1.stop(now + timeOffset + dur);
      this.activeOscillators.push(osc1);

      // 2. Sparkling Overtone Shimmer (Sine Harmonic)
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2, now + timeOffset);

      gain2.gain.setValueAtTime(0.0001, now + timeOffset);
      gain2.gain.linearRampToValueAtTime(0.08, now + timeOffset + 0.01);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + timeOffset + dur * 0.7);

      osc2.connect(gain2);
      gain2.connect(this.masterGain || this.ctx.destination);

      osc2.start(now + timeOffset);
      osc2.stop(now + timeOffset + dur * 0.7);
      this.activeOscillators.push(osc2);

      timeOffset += dur;
    });

    // Loop the melody gently
    this.musicTimer = setTimeout(() => {
      if (!this.isMuted && this.isPlayingMusic) {
        this.playBirthdayMelody();
      }
    }, timeOffset * 1000 + 1200);
  }
}

export const sounds = new SoundEngine();
