import React, { useState, useEffect } from 'react';
import CleanBirthdayCake from './components/CleanBirthdayCake';
import LetterDrawer from './components/LetterDrawer';
import FestiveRibbonsCanvas from './components/FestiveRibbonsCanvas';
import EditorialMarqueeStrip from './components/EditorialMarqueeStrip';
import BirthdayCountdown from './components/BirthdayCountdown';
import CursorSparkles from './components/CursorSparkles';
import { sounds } from './utils/soundEffects';
import { fireCandleStardustBurst } from './utils/confettiCannons';

export default function App() {
  const [candleBlown, setCandleBlown] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [name, setName] = useState('Rabbit');
  const [isAudioActive, setIsAudioActive] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlName = params.get('name');
    if (urlName) {
      setName(urlName);
    }
  }, []);

  const handleToggleCandle = () => {
    if (!candleBlown) {
      sounds.playBlow();
      fireCandleStardustBurst();
    } else {
      sounds.playPop();
    }
    setCandleBlown((prev) => !prev);
  };

  const handleOpenLetter = () => {
    sounds.playPop();
    setLetterOpen(true);
  };

  const handleToggleAudio = async () => {
    const isPlaying = await sounds.toggleMute();
    setIsAudioActive(isPlaying);
  };

  return (
    <div className="min-h-[100dvh] w-full bg-[#FFDAB9] flex flex-col justify-between text-center select-none relative overflow-x-hidden pt-1 pb-2 sm:pb-4">
      {/* Interactive Cursor Sparkles & Ambient Starlight Fairy Dust (Zero-Allocation 60 FPS) */}
      <CursorSparkles />

      {/* Authentic Twisting Festive Streamers / Ribbons Physics Canvas (Zero-Allocation 60 FPS) */}
      <FestiveRibbonsCanvas />

      {/* Floating Animated Audio Equalizer Pill (Top-Right) */}
      <div className="fixed top-2.5 right-3 sm:top-3.5 sm:right-6 z-40">
        <button
          onClick={handleToggleAudio}
          className={`relative flex items-center gap-2 px-3.5 py-2 rounded-full border shadow-sm backdrop-blur-md transition-all active:scale-95 cursor-pointer min-h-[44px] ${
            isAudioActive
              ? 'bg-white/95 text-[#C4515C] border-pink-300 shadow-[0_4px_16px_rgba(255,94,126,0.3)] ring-2 ring-pink-300/50'
              : 'bg-white/85 hover:bg-white text-[#7A3614] border-pink-200 hover:shadow'
          }`}
          title={isAudioActive ? 'Mute Music' : 'Play Birthday Music'}
        >
          {isAudioActive ? (
            <>
              {/* Dancing Equalizer Bars */}
              <div className="flex items-end gap-[2.5px] h-4 w-4 px-0.5 justify-center">
                <span className="w-1 bg-[#C4515C] rounded-full animate-eq1" />
                <span className="w-1 bg-[#FFAA64] rounded-full animate-eq2" />
                <span className="w-1 bg-[#C4515C] rounded-full animate-eq3" />
                <span className="w-1 bg-[#FFAA64] rounded-full animate-eq4" />
              </div>
              {/* Floating Note */}
              <span className="absolute -top-3.5 right-2 text-xs text-[#C4515C] animate-floatNote opacity-95 pointer-events-none select-none font-bold">
                ♪
              </span>
            </>
          ) : (
            <span className="text-sm">🔈</span>
          )}
          <span className="text-xs font-extrabold tracking-wide">
            {isAudioActive ? 'MUSIC: ON' : 'MUSIC: OFF'}
          </span>
        </button>
      </div>

      {/* Header Area: Clean Birthday Marquee Banner */}
      <header className="relative z-20 w-full pt-1 sm:pt-2">
        <EditorialMarqueeStrip name={name} />
      </header>

      {/* Main Core Showcase: Countdown Timer, Cake & Action Buttons */}
      <main className="relative z-20 max-w-lg mx-auto w-full flex flex-col items-center my-auto space-y-1.5 sm:space-y-2.5 px-3">
        {/* Multi-Layered Frosted Glass Jewel Countdown Timer */}
        <BirthdayCountdown />

        {/* Authentic Hand-Drawn Animated Birthday Cake with Procedural Smoke & Stardust */}
        <CleanBirthdayCake candleBlown={candleBlown} />

        {/* The Exact 2 Action Buttons with Tactile Micro-Interactions */}
        <div className="flex flex-col items-center justify-center gap-2 sm:gap-2.5 pt-1 w-full max-w-sm sm:max-w-md">
          {/* Top Button: Coral-Pink Gradient with Dark Velvet Border */}
          <button
            onClick={handleToggleCandle}
            className="group relative overflow-hidden w-full sm:w-auto min-w-[260px] xs:min-w-[280px] sm:min-w-[320px] min-h-[46px] sm:min-h-[48px] py-3 sm:py-3.5 px-4 xs:px-6 sm:px-8 rounded-full bg-gradient-to-r from-[#FF5E7E] via-[#FF7D75] to-[#FFAA64] border-[2.5px] border-[#2A161B] text-white font-extrabold text-xs xs:text-sm sm:text-base tracking-wider uppercase shadow-[0_5px_16px_rgba(255,94,126,0.35)] hover:scale-105 active:translate-y-0.5 active:shadow-[0_2px_8px_rgba(255,94,126,0.3)] transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center justify-center"
          >
            {/* Ambient Light Sheen */}
            <div className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg] animate-buttonSheen pointer-events-none" />
            <span className="relative z-10 flex items-center gap-1.5">
              <span className="inline-block transition-transform duration-200 group-hover:scale-125">
                {candleBlown ? '🕯️' : '🌬️'}
              </span>
              <span>
                {candleBlown ? 'RELIGHT CANDLE & WISH AGAIN' : 'BLOW CANDLE & MAKE WISH!'}
              </span>
            </span>
          </button>

          {/* Bottom Button: White Pill with Pink Border & Pink Text */}
          <button
            onClick={handleOpenLetter}
            className="group w-full sm:w-auto min-w-[260px] xs:min-w-[280px] sm:min-w-[320px] min-h-[46px] sm:min-h-[48px] py-2.5 sm:py-3 px-4 xs:px-6 sm:px-8 rounded-full bg-white border-2 border-[#D94F6E] text-[#D94F6E] font-extrabold text-xs xs:text-sm sm:text-base tracking-wider uppercase shadow-sm hover:bg-[#D94F6E] hover:text-white hover:scale-105 active:translate-y-0.5 transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center justify-center"
          >
            <span className="flex items-center gap-1.5">
              <span className="inline-block transition-transform duration-200 group-hover:scale-125">
                💌
              </span>
              <span>READ BIRTHDAY NOTE</span>
            </span>
          </button>
        </div>
      </main>

      {/* Clean Sweet Footer */}
      <footer className="relative z-20 text-[11px] sm:text-xs font-semibold text-[#7A3614]/90 tracking-wide pt-1.5 pb-1">
        Made with love for {name} on November 15 💖
      </footer>

      {/* 10/10 Animated Envelope & Handwritten Greeting Card Modal */}
      <LetterDrawer isOpen={letterOpen} onClose={() => setLetterOpen(false)} />
    </div>
  );
}
