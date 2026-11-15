import confetti from 'canvas-confetti';

/**
 * Ultra-Luxury Celebratory Fireworks & Confetti Suite for Rabbit's Birthday
 * 
 * Provides calibrated 60FPS particle choreographies:
 * 1. grandCelebrationSalvo: Multi-stage stadium fireworks + golden rain
 * 2. goldLeafCascade: Floating 24K gold foil flakes with natural air drift
 * 3. balloonPopBurst: Instant high-velocity radial micro-explosion at exact screen coordinates
 * 4. cakeSliceFanfare: Sparkling starburst volley when cake is cut
 * 5. candleStardustBurst: Gentle rising starlight & golden stars when candles are blown
 */

// Haute Party Palettes
export const PALETTES = {
  luxuryGold: ['#FFD700', '#FFE57F', '#D4AF37', '#FFF8DC', '#F5A623', '#C5A880'],
  roseVelvet: ['#FF6B8B', '#F7CAD0', '#FF85A1', '#C9184A', '#FFF0F5', '#FF4D6D'],
  champagneRoyale: ['#FFD700', '#F4A261', '#E07A5F', '#FFFDF9', '#FAD2E1', '#E29578'],
  rainbowParty: ['#FF4D6D', '#FFD166', '#06D6A0', '#118AB2', '#9B5DE5', '#F15BB5'],
};

/**
 * 1. Grand Stadium Salvo: 3-wave celebratory explosion
 */
export function fireGrandCelebration() {
  const colors = PALETTES.champagneRoyale;

  // Wave 1: Twin Stadium Cross-fire Cannons (Immediate)
  confetti({
    particleCount: 75,
    angle: 60,
    spread: 65,
    startVelocity: 55,
    origin: { x: 0.02, y: 0.85 },
    colors,
    gravity: 0.8,
    scalar: 1.15,
    drift: 0.2,
    ticks: 350,
  });

  confetti({
    particleCount: 75,
    angle: 120,
    spread: 65,
    startVelocity: 55,
    origin: { x: 0.98, y: 0.85 },
    colors,
    gravity: 0.8,
    scalar: 1.15,
    drift: -0.2,
    ticks: 350,
  });

  // Wave 2: Central Starlight Burst (t + 250ms)
  setTimeout(() => {
    confetti({
      particleCount: 110,
      spread: 120,
      startVelocity: 42,
      origin: { x: 0.5, y: 0.38 },
      colors: PALETTES.luxuryGold,
      gravity: 0.65,
      decay: 0.92,
      scalar: 1.35,
      ticks: 400,
    });
  }, 250);

  // Wave 3: Ceiling Gold Leaf Drift (t + 600ms)
  setTimeout(() => {
    confetti({
      particleCount: 90,
      angle: 90,
      spread: 160,
      startVelocity: 25,
      origin: { x: 0.5, y: 0.05 },
      colors: PALETTES.roseVelvet,
      gravity: 0.5,
      decay: 0.94,
      scalar: 1.2,
      drift: 0.05,
      ticks: 450,
    });
  }, 600);
}

/**
 * 2. Floating Gold Foil Flake Cascade: Slow romantic flutter
 */
export function fireGoldLeafShower() {
  const count = 70;
  confetti({
    particleCount: count,
    spread: 140,
    startVelocity: 18,
    origin: { x: 0.5, y: 0.08 },
    colors: PALETTES.luxuryGold,
    gravity: 0.42,
    decay: 0.95,
    scalar: 1.4,
    drift: 0.15,
    ticks: 500,
  });
}

/**
 * 3. Balloon Pop Micro-Burst: Localized explosive dispersal
 * @param {number} clientX - Screen X
 * @param {number} clientY - Screen Y
 * @param {string} balloonColor - Primary burst color
 */
export function fireBalloonPopBurst(clientX, clientY, balloonColor = '#FFD700') {
  const x = clientX / window.innerWidth;
  const y = clientY / window.innerHeight;

  confetti({
    particleCount: 45,
    spread: 360,
    startVelocity: 30,
    origin: { x, y },
    colors: [balloonColor, '#FFFFFF', '#FFD700', '#F7CAD0'],
    gravity: 0.85,
    decay: 0.91,
    scalar: 1.1,
    ticks: 220,
  });
}

/**
 * 4. Cake Cutting Fanfare: Golden sparkler celebration
 */
export function fireCakeCutFanfare() {
  const end = Date.now() + 1200;

  const interval = setInterval(() => {
    if (Date.now() > end) {
      return clearInterval(interval);
    }

    confetti({
      startVelocity: 32,
      spread: 360,
      ticks: 120,
      origin: {
        x: Math.random() * 0.4 + 0.3,
        y: Math.random() * 0.3 + 0.35,
      },
      colors: PALETTES.luxuryGold,
      gravity: 0.75,
      scalar: 0.9,
      shapes: ['circle'],
    });
  }, 180);
}

/**
 * 5. Candle Stardust Burst: Rising golden stars and sparkles upon candle blow
 */
export function fireCandleStardustBurst() {
  // Wave 1: Golden Stars shooting upwards from the cake
  confetti({
    particleCount: 38,
    spread: 75,
    angle: 90,
    startVelocity: 32,
    origin: { x: 0.5, y: 0.52 },
    colors: ['#FFD700', '#FFE57F', '#FFAA00', '#FFFDF9', '#FF85A1'],
    shapes: ['star'],
    scalar: 1.25,
    gravity: 0.62,
    decay: 0.92,
    ticks: 200,
  });

  // Wave 2: Micro champagne glitter flutter
  setTimeout(() => {
    confetti({
      particleCount: 26,
      spread: 90,
      angle: 90,
      startVelocity: 24,
      origin: { x: 0.5, y: 0.48 },
      colors: PALETTES.champagneRoyale,
      gravity: 0.58,
      decay: 0.93,
      scalar: 0.95,
      ticks: 180,
    });
  }, 140);
}
