import React, { useState } from 'react';
import confetti from 'canvas-confetti';

const INITIAL_BALLOONS = [
  { id: 1, color: 'from-[#FAD2E1] to-[#EE6055]', border: 'border-rose-300', text: '👑 Queen Rabbit', left: '8%', delay: '0s', sway: '3.5s' },
  { id: 2, color: 'from-[#FDF6E2] to-[#D4AF37]', border: 'border-yellow-300', text: '✨ +10,000 Aura', left: '18%', delay: '1.2s', sway: '4.2s' },
  { id: 3, color: 'from-[#FFF0F3] to-[#F7CAD0]', border: 'border-pink-300', text: '💖 Cutest Laugh', left: '78%', delay: '0.6s', sway: '3.8s' },
  { id: 4, color: 'from-[#FEE440] to-[#E07A5F]', border: 'border-amber-300', text: '🌟 100% Genuine', left: '88%', delay: '1.8s', sway: '4.5s' },
];

export default function InteractiveBalloons({ onPopReward }) {
  const [balloons, setBalloons] = useState(INITIAL_BALLOONS);
  const [poppedMessages, setPoppedMessages] = useState([]);

  const handlePop = (balloon, e) => {
    // Pop particle explosion at balloon coordinates
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { x, y },
      colors: ['#FAD2E1', '#D4AF37', '#EE6055', '#FFFFFF'],
      gravity: 0.9,
      scalar: 0.9,
      ticks: 180,
    });

    setBalloons((prev) => prev.filter((b) => b.id !== balloon.id));
    setPoppedMessages((prev) => [...prev, { id: Date.now(), text: balloon.text, x: rect.left, y: rect.top }]);

    if (onPopReward) onPopReward(balloon.text);
  };

  const resetBalloons = () => {
    setBalloons(INITIAL_BALLOONS);
    setPoppedMessages([]);
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {/* Floating Balloons */}
      {balloons.map((b) => (
        <div
          key={b.id}
          onClick={(e) => handlePop(b, e)}
          style={{
            left: b.left,
            animationDelay: b.delay,
            animationDuration: b.sway,
          }}
          className="pointer-events-auto absolute bottom-24 sm:bottom-32 cursor-pointer group animate-float select-none transition-transform hover:scale-110 active:scale-90"
        >
          {/* Balloon Body */}
          <div
            className={`w-14 sm:w-16 h-18 sm:h-20 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] bg-gradient-to-tr ${b.color} shadow-lg border ${b.border} flex items-center justify-center relative overflow-hidden`}
          >
            {/* Glossy Specular Highlight */}
            <div className="absolute top-2 left-2.5 w-3.5 h-6 rounded-full bg-white/50 blur-[1px] rotate-[-25deg]" />
            <span className="text-[10px] font-bold text-white tracking-wider uppercase text-center px-1 drop-shadow-sm">
              Tap!
            </span>
          </div>

          {/* Knot */}
          <div className="w-2.5 h-2 bg-rose-400 mx-auto -mt-0.5 rounded-b-sm" />

          {/* Swaying String */}
          <svg className="w-4 h-14 mx-auto -mt-0.5 overflow-visible" viewBox="0 0 10 50">
            <path
              d="M 5,0 Q 8,15 3,30 T 5,50"
              fill="none"
              stroke="rgba(180, 140, 140, 0.4)"
              strokeWidth="1.2"
            />
          </svg>
        </div>
      ))}

      {/* Floating Pop-Up Badges from Popped Balloons */}
      {poppedMessages.map((msg) => (
        <div
          key={msg.id}
          style={{ left: msg.x, top: msg.y }}
          className="pointer-events-none fixed px-3.5 py-1.5 rounded-full bg-white/95 border border-gold/40 text-espresso text-xs font-bold shadow-lg animate-bounce"
        >
          {msg.text}
        </div>
      ))}

      {/* Regenerate Balloons Button if all popped */}
      {balloons.length === 0 && (
        <div className="pointer-events-auto fixed bottom-28 left-6 z-40">
          <button
            onClick={resetBalloons}
            className="px-3.5 py-1.5 rounded-full bg-white/90 border border-rose-gold text-xs font-semibold text-rose-deep shadow-sm hover:bg-white hover:scale-105 transition-all"
          >
            🎈 Inflate More Balloons
          </button>
        </div>
      )}
    </div>
  );
}
