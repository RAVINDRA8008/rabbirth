import React, { useState, useEffect } from 'react';
import CleanBirthdayCake from './components/CleanBirthdayCake';
import TypewriterText from './components/TypewriterText';
import LetterDrawer from './components/LetterDrawer';
import FestiveRibbonsCanvas from './components/FestiveRibbonsCanvas';

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
    <div className="min-h-screen w-full bg-[#FFDAB9] flex flex-col justify-between py-4 px-4 sm:px-6 text-center select-none relative overflow-hidden">
      {/* Authentic Twisting Festive Streamers / Ribbons Physics Canvas */}
      <FestiveRibbonsCanvas />

      {/* Top Festive Header Bar */}
      <header className="relative z-20 w-full max-w-xl mx-auto flex flex-col items-center pt-2">
        {/* Date Tag */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-white/90 border border-pink-300 text-[#C4515C] text-xs font-bold uppercase tracking-wider shadow-sm">
          <span>🎈</span>
          <span>15th November · Born To Shine</span>
          <span>🎈</span>
        </div>

        {/* Decorative Festive Bunting Pennants Banner */}
        <div className="w-full flex justify-between items-start px-2 overflow-hidden pointer-events-none mt-2 max-w-md">
          {['#FF477E', '#FFD166', '#06D6A0', '#118AB2', '#9D4EDD', '#EF476F', '#FFD166', '#06D6A0', '#FF477E'].map((color, i) => (
            <div
              key={i}
              style={{ borderTopColor: color }}
              className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[24px] drop-shadow-sm animate-festive"
            />
          ))}
        </div>
      </header>

      {/* Main Core Showcase: Name, Cake & The 2 Requested Buttons */}
      <main className="relative z-20 max-w-lg mx-auto w-full flex flex-col items-center my-auto space-y-2">
        {/* Joyful Festive Name */}
        <div className="space-y-1">
          <h1 className="text-5xl sm:text-6xl font-display font-black text-[#C4515C] tracking-tight uppercase animate-festive drop-shadow-[0_2px_10px_rgba(255,255,255,0.9)]">
            {name}
          </h1>

          {/* Smooth Warm Typewriter Greeting */}
          <TypewriterText />
        </div>

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
      <footer className="relative z-20 text-xs font-semibold text-[#8B4513]/90 tracking-wide pb-1">
        Made with love for {name} on November 15 💖
      </footer>

      {/* Birthday Greeting Card Modal */}
      <LetterDrawer isOpen={letterOpen} onClose={() => setLetterOpen(false)} />
    </div>
  );
}
