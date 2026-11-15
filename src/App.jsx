import React, { useState, useEffect } from 'react';
import CleanBirthdayCake from './components/CleanBirthdayCake';
import LetterDrawer from './components/LetterDrawer';
import FestiveRibbonsCanvas from './components/FestiveRibbonsCanvas';
import EditorialMarqueeStrip from './components/EditorialMarqueeStrip';
import BirthdayCountdown from './components/BirthdayCountdown';

export default function App() {
  const [candleBlown, setCandleBlown] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [name, setName] = useState('Rabbit');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlName = params.get('name');
    if (urlName) {
      setName(urlName);
    }
  }, []);

  const handleToggleCandle = () => {
    setCandleBlown((prev) => !prev);
  };

  return (
    <div className="min-h-screen w-full bg-[#FFDAB9] flex flex-col justify-between text-center select-none relative overflow-x-hidden pb-6">
      {/* Authentic Twisting Festive Streamers / Ribbons Physics Canvas */}
      <FestiveRibbonsCanvas />

      {/* Header Area: Editorial Marquee Strip with Poetic Quote */}
      <header className="relative z-20 w-full pt-4">
        <EditorialMarqueeStrip name={name} />
      </header>

      {/* Main Core Showcase: Countdown Timer, Cake & Action Buttons */}
      <main className="relative z-20 max-w-lg mx-auto w-full flex flex-col items-center my-auto space-y-3 px-4">
        {/* Cinematic Countdown Timer: Awaiting the Moment */}
        <BirthdayCountdown />

        {/* Authentic Hand-Drawn Animated Birthday Cake */}
        <CleanBirthdayCake candleBlown={candleBlown} />

        {/* The Exact 2 Action Buttons Matching User Reference */}
        <div className="flex flex-col items-center justify-center gap-3 pt-2 w-full max-w-sm sm:max-w-md">
          {/* Top Button: Coral-Pink Gradient with Dark Border */}
          <button
            onClick={handleToggleCandle}
            className="w-full sm:w-auto min-w-[280px] sm:min-w-[320px] py-3.5 px-8 rounded-full bg-gradient-to-r from-[#FF5E7E] via-[#FF7D75] to-[#FFAA64] border-[2.5px] border-black text-white font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-[0_6px_16px_rgba(255,94,126,0.35)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            {candleBlown ? '🕯️ RELIGHT CANDLE & WISH AGAIN' : '🌬️ BLOW CANDLE & MAKE WISH!'}
          </button>

          {/* Bottom Button: White Pill with Pink Border & Pink Text */}
          <button
            onClick={() => setLetterOpen(true)}
            className="w-full sm:w-auto min-w-[280px] sm:min-w-[320px] py-3 px-8 rounded-full bg-white border-2 border-[#D94F6E] text-[#D94F6E] font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-sm hover:bg-[#D94F6E] hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            💌 READ BIRTHDAY NOTE
          </button>
        </div>
      </main>

      {/* Clean Sweet Footer */}
      <footer className="relative z-20 text-xs font-semibold text-[#8B4513]/90 tracking-wide pt-4">
        Made with love for {name} on November 15 💖
      </footer>

      {/* 10/10 Animated Envelope & Handwritten Greeting Card Modal */}
      <LetterDrawer isOpen={letterOpen} onClose={() => setLetterOpen(false)} />
    </div>
  );
}
