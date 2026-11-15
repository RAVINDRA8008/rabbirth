import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export default function GoldFoilCelebration() {
  const [toasted, setToasted] = useState(false);

  const triggerToast = () => {
    setToasted(true);

    // High-end 24K gold foil flake shower (luxury physics)
    const goldColors = ['#C5A880', '#E2CEB4', '#FAF8F5', '#8B6D3F', '#5E1B24'];

    confetti({
      particleCount: 80,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.7 },
      colors: goldColors,
      gravity: 0.7,
      scalar: 1.1,
      drift: 0.1,
      ticks: 300,
    });

    confetti({
      particleCount: 80,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.7 },
      colors: goldColors,
      gravity: 0.7,
      scalar: 1.1,
      drift: -0.1,
      ticks: 300,
    });

    // Central ceiling release of fluttering leaf
    setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 120,
        origin: { x: 0.5, y: 0.2 },
        colors: goldColors,
        gravity: 0.55,
        decay: 0.93,
        scalar: 1.3,
        ticks: 350,
      });
    }, 400);
  };

  return (
    <section className="py-24 px-6 sm:px-12 lg:px-20 border-b border-ink-border bg-ink text-center relative overflow-hidden">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Folio Tag */}
        <div className="flex items-center space-x-3 text-gold text-xs tracking-widest-plus uppercase mb-4">
          <span className="h-px w-8 bg-gold/40 inline-block" />
          <span>Folio No. 06 — The Celebration</span>
          <span className="h-px w-8 bg-gold/40 inline-block" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-title tracking-wide text-bone-pure mb-4">
          Raise The Golden Toast
        </h2>
        <p className="font-editorial italic text-xl sm:text-2xl text-bone-muted max-w-xl mb-10">
          "For the laughter you bring, the days you brighten, and the legend you are becoming."
        </p>

        <button
          onClick={triggerToast}
          className="group relative px-10 py-4 bg-gold text-ink font-semibold text-xs tracking-super-wide uppercase overflow-hidden shadow-gold-subtle hover:bg-gold-light active:scale-95 transition-all duration-300"
        >
          <span className="relative z-10 flex items-center space-x-2">
            <span>✦</span>
            <span>Raise A Toast To Rabbit</span>
            <span>✦</span>
          </span>
        </button>

        {toasted && (
          <div className="mt-8 animate-fadeIn text-gold font-editorial italic text-2xl tracking-wide">
            "Here’s to Rabbit — the brightest light of November 15th."
          </div>
        )}
      </div>
    </section>
  );
}
