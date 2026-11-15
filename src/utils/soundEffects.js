// Zero-dependency, lightweight Web Audio API procedural sound engine
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true; // start muted by default so it respects user preference
    this.musicTimer = null;
    this.isPlayingMusic = false;
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
    if (this.isMuted) {
      this.stopMusic();
    } else {
      this.playBirthdayMelody();
    }
    return !this.isMuted;
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
      gain.connect(this.ctx.destination);

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
        gain.connect(this.ctx.destination);

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
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.8);
      });
    } catch (e) {}
  }

  // Procedural music box "Happy Birthday" melody (calm, gentle, sweet)
  playBirthdayMelody() {
    if (this.isMuted || !this.ctx) return;
    this.isPlayingMusic = true;

    // Melody: [frequency, duration in seconds]
    const notes = [
      [261.63, 0.4], [261.63, 0.3], [293.66, 0.7], [261.63, 0.7], [349.23, 0.7], [329.63, 1.2],
      [261.63, 0.4], [261.63, 0.3], [293.66, 0.7], [261.63, 0.7], [392.00, 0.7], [349.23, 1.2],
      [261.63, 0.4], [261.63, 0.3], [523.25, 0.7], [440.00, 0.7], [349.23, 0.7], [329.63, 0.7], [293.66, 0.9],
      [466.16, 0.4], [466.16, 0.3], [440.00, 0.7], [349.23, 0.7], [392.00, 0.7], [349.23, 1.4],
    ];

    let timeOffset = 0.1;
    const now = this.ctx.currentTime;

    notes.forEach(([freq, dur]) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle'; // sweet music box timbre
      osc.frequency.setValueAtTime(freq, now + timeOffset);

      gain.gain.setValueAtTime(0.12, now + timeOffset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + dur);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + timeOffset);
      osc.stop(now + timeOffset + dur);

      timeOffset += dur;
    });

    // Loop the melody gently
    this.musicTimer = setTimeout(() => {
      if (!this.isMuted) {
        this.playBirthdayMelody();
      }
    }, timeOffset * 1000 + 1500);
  }

  stopMusic() {
    this.isPlayingMusic = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
    }
  }
}

export const sounds = new SoundEngine();
