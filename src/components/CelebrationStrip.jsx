import React, { useState } from 'react';

export default function CelebrationStrip({ name = 'Rabbit' }) {
  // Cycle symbols on click: Star + Love, Pure Heart, Pure Star, Sparkle Heart
  const symbolOptions = [
    { label: '⭐ 💖 ⭐', id: 'star-love' },
    { label: '💖', id: 'love' },
    { label: '⭐', id: 'star' },
    { label: '✨ 💖 ✨', id: 'sparkle-love' },
  ];

  const [symbolIndex, setSymbolIndex] = useState(0);

  const handleCycleSymbol = () => {
    setSymbolIndex((prev) => (prev + 1) % symbolOptions.length);
  };

  const currentSymbol = symbolOptions[symbolIndex].label;

  return (
    <div className="relative inline-flex items-center justify-center my-1 select-none animate-fadeIn group">
      {/* Decorative Ribbon Fold Tails (Desktop/Tablet) */}
      <div className="hidden sm:block absolute -left-4 w-7 h-8 bg-[#F4ACB7] rounded-l-md rotate-[-6deg] -z-10 shadow-sm" />
      <div className="hidden sm:block absolute -right-4 w-7 h-8 bg-[#F4ACB7] rounded-r-md rotate-[6deg] -z-10 shadow-sm" />

      {/* Main Celebratory Strip */}
      <div
        onClick={handleCycleSymbol}
        title="Tap to change middle star / love symbol!"
        className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 py-2 sm:py-2.5 rounded-full bg-white/95 border-2 border-[#F4ACB7] shadow-[0_4px_16px_rgba(244,172,183,0.35)] cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200"
      >
        {/* Left: Happy Birthday */}
        <span className="font-display font-black text-base sm:text-xl text-[#C4515C] tracking-wider uppercase whitespace-nowrap drop-shadow-sm">
          Happy Birthday
        </span>

        {/* Middle: Star or Love Symbol with gentle heartbeat pulse */}
        <span className="inline-flex items-center text-base sm:text-xl animate-pulse text-[#E6396E] drop-shadow-sm transition-transform duration-200 group-hover:scale-125">
          {currentSymbol}
        </span>

        {/* Right: Name (Rabbit) */}
        <span className="font-display font-black text-base sm:text-xl text-[#C4515C] tracking-wider uppercase whitespace-nowrap drop-shadow-sm">
          {name}
        </span>
      </div>
    </div>
  );
}
