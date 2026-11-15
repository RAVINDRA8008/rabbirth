import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';

const INITIAL_BALLOONS = [
  { id: 1, color: '#FF477E', left: '6%', duration: '9s', delay: '0s', size: 'w-12 h-16', msg: '👑 Queen Rabbit!' },
  { id: 2, color: '#FFD166', left: '18%', duration: '11s', delay: '2s', size: 'w-14 h-18', msg: '✨ +10,000 Aura!' },
  { id: 3, color: '#06D6A0', left: '28%', duration: '8.5s', delay: '1s', size: 'w-11 h-15', msg: '💖 Cutest Laugh!' },
  { id: 4, color: '#118AB2', left: '70%', duration: '10s', delay: '0.5s', size: 'w-13 h-17', msg: '🌟 Pure Magic!' },
  { id: 5, color: '#9D4EDD', left: '82%', duration: '12s', delay: '3s', size: 'w-12 h-16', msg: '🎉 Party Queen!' },
  { id: 6, color: '#EF476F', left: '92%', duration: '9.5s', delay: '1.5s', size: 'w-14 h-18', msg: '💫 100% Genuine!' },
];

export default function FloatingBalloons2D() {
  const [balloons, setBalloons] = useState(INITIAL_BALLOONS);
  const [popToast, setPopToast] = useState(null);

  const handlePop = (b, e) => {
    sounds.playPop();

    // Spawn localized mini confetti
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 25,
      spread: 50,
      origin: { x, y },
      colors: [b.color, '#FFFFFF', '#FFD166'],
      gravity: 0.8,
      scalar: 0.8,
      ticks: 150,
    });

    // Remove balloon temporarily
    setBalloons((prev) => prev.filter((item) => item.id !== b.id));

    // Show floating cute toast
    setPopToast({ id: Date.now(), text: b.msg, x: rect.left, y: Math.max(20, rect.top - 20) });

    // Respawn balloon after 6 seconds so screen is never empty!
    setTimeout(() => {
      setBalloons((prev) => [...prev, b]);
    }, 6000);
  };

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-20 select-none">
      {/* Floating Balloons */}
      {balloons.map((b) => (
        <div
          key={b.id}
          onClick={(e) => handlePop(b, e)}
          style={{
            left: b.left,
            animation: `floatUp ${b.duration} ease-in-out infinite`,
            animationDelay: b.delay,
            bottom: '-120px',
          }}
          className="pointer-events-auto absolute flex flex-col items-center cursor-pointer group hover:scale-110 active:scale-90 transition-transform"
          title="Tap to pop balloon!"
        >
          {/* Balloon Body */}
          <div
            style={{ backgroundColor: b.color }}
            className={`${b.size} rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] shadow-md opacity-90 relative flex items-center justify-center`}
          >
            {/* Glossy specular reflection */}
            <div className="absolute top-2 left-2 w-3 h-5 rounded-full bg-white/45 rotate-[-20deg]" />
            <span className="text-[9px] font-black text-white uppercase drop-shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
              POP!
            </span>
          </div>

          {/* Knot */}
          <div
            style={{ backgroundColor: b.color }}
            className="w-2.5 h-2 -mt-0.5 rounded-b-sm"
          />

          {/* String */}
          <svg className="w-2 h-16 -mt-0.5" viewBox="0 0 10 50">
            <path
              d="M 5,0 Q 8,15 3,30 T 5,50"
              fill="none"
              stroke="rgba(120, 100, 100, 0.4)"
              strokeWidth="1.2"
            />
          </svg>
        </div>
      ))}

      {/* Pop Toast Message */}
      {popToast && (
        <div
          key={popToast.id}
          style={{ left: Math.min(window.innerWidth - 160, Math.max(20, popToast.x)), top: popToast.y }}
          className="pointer-events-none fixed px-3.5 py-1.5 rounded-full bg-white/95 border-2 border-pink-400 text-pink-700 text-xs font-bold shadow-lg animate-bounce z-50"
        >
          {popToast.text}
        </div>
      )}
    </div>
  );
}
