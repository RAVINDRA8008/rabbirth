import React, { useState, useEffect } from 'react';
import { fireBalloonPopBurst } from '../utils/confettiCannons';

const BALLOON_PRESETS = [
  { id: 1, color: '#FF6B8B', highlight: '#FFA8BA', xPercent: 6, speed: 0.7, scale: 1.05, swayAmp: 18, swaySpeed: 1.2, delay: 0 },
  { id: 2, color: '#FFD700', highlight: '#FFF099', xPercent: 14, speed: 0.85, scale: 0.95, swayAmp: 22, swaySpeed: 1.5, delay: 1.2 },
  { id: 3, color: '#F4A261', highlight: '#FAD2B0', xPercent: 22, speed: 0.65, scale: 1.15, swayAmp: 16, swaySpeed: 1.0, delay: 0.5 },
  { id: 4, color: '#E07A5F', highlight: '#F4B5A5', xPercent: 78, speed: 0.75, scale: 1.0, swayAmp: 20, swaySpeed: 1.3, delay: 0.8 },
  { id: 5, color: '#FFD700', highlight: '#FFF5B8', xPercent: 86, speed: 0.9, scale: 1.1, swayAmp: 25, swaySpeed: 1.6, delay: 1.8 },
  { id: 6, color: '#FF85A1', highlight: '#FFC2D1', xPercent: 93, speed: 0.68, scale: 0.9, swayAmp: 17, swaySpeed: 1.1, delay: 2.2 },
];

export default function FloatingBalloons({ onPop }) {
  const [balloons, setBalloons] = useState(
    BALLOON_PRESETS.map((b) => ({
      ...b,
      y: 110 + b.delay * 20, // start below viewport
      popped: false,
      swayOffset: Math.random() * Math.PI * 2,
    }))
  );

  useEffect(() => {
    let animId;
    let lastTime = performance.now();

    const updateLoop = () => {
      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      const t = now * 0.001;

      setBalloons((prev) =>
        prev.map((b) => {
          if (b.popped) return b;

          // Buoyant upward translation
          let nextY = b.y - b.speed * 18 * dt;

          // Wrap around if floated off top of screen
          if (nextY < -25) {
            nextY = 105;
          }

          return {
            ...b,
            y: nextY,
          };
        })
      );

      animId = requestAnimationFrame(updateLoop);
    };

    animId = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handlePop = (e, balloon) => {
    e.stopPropagation();
    if (balloon.popped) return;

    // Trigger explosive confetti burst at exact click position
    fireBalloonPopBurst(e.clientX, e.clientY, balloon.color);

    // Mark as popped with pop sound feedback
    setBalloons((prev) =>
      prev.map((b) => (b.id === balloon.id ? { ...b, popped: true } : b))
    );

    if (onPop) {
      onPop(balloon);
    }

    // Respawn after 4 seconds
    setTimeout(() => {
      setBalloons((prev) =>
        prev.map((b) =>
          b.id === balloon.id ? { ...b, y: 110, popped: false } : b
        )
      );
    }, 4000);
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden select-none">
      {balloons.map((b) => {
        if (b.popped) return null;

        const now = performance.now() * 0.001;
        const sway = Math.sin(now * b.swaySpeed + b.swayOffset) * b.swayAmp;
        const tilt = Math.sin(now * b.swaySpeed + b.swayOffset) * 6;

        return (
          <div
            key={b.id}
            onClick={(e) => handlePop(e, b)}
            className="pointer-events-auto absolute cursor-pointer transition-transform duration-75 hover:scale-110 active:scale-95 group"
            style={{
              left: `calc(${b.xPercent}% + ${sway}px)`,
              top: `${b.y}%`,
              transform: `scale(${b.scale}) rotate(${tilt}deg)`,
            }}
            title="Pop me! 🎉"
          >
            {/* Balloon Body */}
            <div
              className="relative w-16 h-20 sm:w-20 sm:h-24 rounded-full shadow-lg transition-shadow group-hover:shadow-2xl"
              style={{
                background: `radial-gradient(circle at 35% 30%, ${b.highlight} 0%, ${b.color} 70%, #2A1015 100%)`,
                boxShadow: `0 10px 25px -5px ${b.color}66, inset 0 -6px 12px rgba(0,0,0,0.25)`,
              }}
            >
              {/* Glossy Specular Sheen */}
              <div className="absolute top-2 left-3 w-5 h-7 bg-white/55 rounded-full transform -rotate-25 blur-[1px]" />
              <div className="absolute top-3 left-4 w-2 h-3 bg-white/80 rounded-full transform -rotate-25" />

              {/* Balloon Knot */}
              <div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3.5 h-2.5 rounded-sm"
                style={{ backgroundColor: b.color, filter: 'brightness(0.8)' }}
              />

              {/* Dangling Satin Ribbon String */}
              <svg
                className="absolute top-full left-1/2 -translate-x-1/2 w-8 h-24 overflow-visible"
                viewBox="0 0 32 96"
                fill="none"
              >
                <path
                  d="M16 0 Q 24 24, 12 48 T 20 96"
                  stroke={b.color}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  opacity="0.75"
                />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}
