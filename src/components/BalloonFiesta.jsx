import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';

const INITIAL_BALLOONS = [
  { id: 1, color: 'from-rose-400 to-pink-500', border: 'border-pink-300', perk: '✨ +1,000 Cosmic Aura', x: 12, y: 35, scale: 1.05, speed: 2.2 },
  { id: 2, color: 'from-amber-300 to-yellow-500', border: 'border-yellow-200', perk: '👑 Crown of Infinite Charm', x: 22, y: 55, scale: 0.95, speed: 2.6 },
  { id: 3, color: 'from-purple-400 to-indigo-500', border: 'border-purple-300', perk: '🌸 Perpetual Good Vibes', x: 78, y: 32, scale: 1.1, speed: 1.9 },
  { id: 4, color: 'from-pink-300 to-rose-400', border: 'border-rose-200', perk: '🍓 Lifetime Delicious Treats', x: 86, y: 58, scale: 1.0, speed: 2.4 },
  { id: 5, color: 'from-emerald-300 to-teal-400', border: 'border-teal-200', perk: '🚀 Unstoppable Radiant Energy', x: 50, y: 22, scale: 1.15, speed: 2.1 },
];

export default function BalloonFiesta({ onAllPopped }) {
  const [balloons, setBalloons] = useState(INITIAL_BALLOONS);
  const [poppedCount, setPoppedCount] = useState(0);
  const [floatingPerks, setFloatingPerks] = useState([]);

  const popBalloon = (balloon, e) => {
    e.stopPropagation();
    sounds.playPop();

    // Trigger localized mini confetti burst at balloon position
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { x, y },
      colors: ['#FAD2E1', '#F7CAD0', '#D4AF37', '#EE6055', '#FFFFFF'],
      ticks: 180,
      gravity: 0.8,
      scalar: 0.9,
    });

    // Add floating perk badge
    const newPerk = {
      id: Date.now() + Math.random(),
      text: balloon.perk,
      x: balloon.x,
      y: balloon.y,
    };
    setFloatingPerks((prev) => [...prev, newPerk]);

    // Remove balloon
    setBalloons((prev) => prev.filter((b) => b.id !== balloon.id));
    const newCount = poppedCount + 1;
    setPoppedCount(newCount);

    if (newCount >= INITIAL_BALLOONS.length && onAllPopped) {
      setTimeout(() => {
        sounds.playChime('grand');
        onAllPopped();
      }, 700);
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-25">
      {/* Balloon counter badge */}
      <div className="absolute top-20 right-6 pointer-events-auto">
        <div className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-gold/40 shadow-soft-float flex items-center space-x-2 text-xs font-bold text-espresso">
          <span className="text-base animate-bounce">🎈</span>
          <span>Pop the Party Balloons:</span>
          <span className="text-rose-deep font-extrabold text-sm">{poppedCount}/{INITIAL_BALLOONS.length}</span>
        </div>
      </div>

      {/* Floating balloons */}
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          onClick={(e) => popBalloon(balloon, e)}
          style={{
            left: `${balloon.x}%`,
            top: `${balloon.y}%`,
            animation: `floatGentle ${balloon.speed * 2}s ease-in-out infinite alternate`,
            transform: `scale(${balloon.scale})`,
          }}
          className="pointer-events-auto absolute cursor-pointer group transition-transform active:scale-90"
        >
          {/* Balloon Body */}
          <div className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-full bg-gradient-to-tr ${balloon.color} shadow-lg border ${balloon.border} flex items-center justify-center transition-all group-hover:scale-110 group-hover:brightness-110`}>
            {/* Gloss shine highlight */}
            <div className="absolute top-2 left-3 w-4 h-6 bg-white/40 rounded-full blur-[1px] rotate-[-25deg]" />
            <span className="text-white/90 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              POP!
            </span>
          </div>

          {/* Balloon Knot & Dangling Ribbon */}
          <div className="w-2.5 h-2 bg-rose-500/80 mx-auto -mt-0.5 rounded-b-sm" />
          <svg className="w-6 h-14 mx-auto text-amber-300/80 -mt-0.5 animate-pulse" viewBox="0 0 24 60" fill="none">
            <path
              d="M12 0 C 6 15, 18 30, 12 45 C 9 52, 14 58, 12 60"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ))}

      {/* Floating unlocked perks */}
      {floatingPerks.map((perk) => (
        <div
          key={perk.id}
          style={{ left: `${perk.x}%`, top: `${perk.y}%` }}
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-2xl bg-white/95 border border-gold/50 text-rose-deep font-bold text-xs sm:text-sm shadow-2xl animate-bounce"
        >
          {perk.text}
        </div>
      ))}
    </div>
  );
}
