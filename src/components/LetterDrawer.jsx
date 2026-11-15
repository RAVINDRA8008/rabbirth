import React, { useState, useEffect } from 'react';
import { sounds } from '../utils/soundEffects';

export default function LetterDrawer({ isOpen, onClose }) {
  // States: 'sealed' -> 'opening' -> 'opened'
  const [envelopeState, setEnvelopeState] = useState('sealed');

  useEffect(() => {
    if (isOpen) {
      setEnvelopeState('sealed');
      // Automatically trigger open transition after 500ms
      const timer = setTimeout(() => {
        handleOpen();
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setEnvelopeState('sealed');
    }
  }, [isOpen]);

  const handleOpen = () => {
    sounds.playPop();
    setEnvelopeState('opening');
    setTimeout(() => {
      setEnvelopeState('opened');
    }, 650);
  };

  if (!isOpen) return null;

  // Subtle floating hearts
  const floatingHearts = [
    { left: '8%', delay: '0s', duration: '5s', size: 'text-lg sm:text-xl' },
    { left: '20%', delay: '1.2s', duration: '6s', size: 'text-xl sm:text-2xl' },
    { left: '35%', delay: '0.4s', duration: '5.5s', size: 'text-base sm:text-lg' },
    { left: '65%', delay: '1.8s', duration: '5.8s', size: 'text-lg sm:text-xl' },
    { left: '80%', delay: '0.9s', duration: '6.2s', size: 'text-xl sm:text-2xl' },
    { left: '92%', delay: '2.1s', duration: '5.2s', size: 'text-base sm:text-lg' },
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn select-none overflow-y-auto overscroll-contain"
      style={{ WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain' }}
    >
      {/* Gentle Floating Hearts In Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingHearts.map((h, i) => (
          <div
            key={i}
            style={{
              left: h.left,
              animationDelay: h.delay,
              animationDuration: h.duration,
            }}
            className={`absolute -bottom-10 ${h.size} text-pink-400/75 animate-float-heart`}
          >
            {i % 2 === 0 ? '💖' : '💕'}
          </div>
        ))}
      </div>

      {/* Main Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg my-auto flex flex-col items-center justify-center"
      >
        {/* Close Button Top Right - Meets Min 44px Touch Target Size */}
        <button
          onClick={onClose}
          aria-label="Close letter"
          className="absolute -top-3 -right-1 sm:-right-3 z-40 w-11 h-11 rounded-full bg-white text-[#C4515C] border-2 border-pink-200 flex items-center justify-center font-bold text-base shadow-lg hover:bg-pink-50 hover:scale-110 active:scale-90 transition-all cursor-pointer"
        >
          ✕
        </button>

        {/* ============================================================== */}
        {/* PHASE 1 & 2: ANIMATED ENVELOPE (Sealed & Opening)               */}
        {/* ============================================================== */}
        {envelopeState !== 'opened' && (
          <div
            onClick={handleOpen}
            className="relative w-72 sm:w-84 max-w-[calc(100vw-2.5rem)] h-52 sm:h-60 flex items-center justify-center cursor-pointer group transition-transform duration-300 hover:scale-105 active:scale-95"
            style={{ perspective: '1000px' }}
          >
            {/* Envelope Base */}
            <div className="relative w-full h-full bg-[#F59EB7] rounded-2xl shadow-2xl border-2 border-[#E982A7] overflow-hidden flex items-end">
              {/* Letter Peek sliding up */}
              <div
                className={`absolute left-5 right-5 bg-[#FFFDF9] rounded-t-xl shadow-md border border-pink-200 flex flex-col items-center justify-center p-4 transition-all duration-700 ease-out ${
                  envelopeState === 'opening'
                    ? '-translate-y-36 opacity-100 scale-105 z-20'
                    : 'translate-y-4 opacity-75 z-10'
                }`}
                style={{ height: '75%' }}
              >
                <div className="font-handwriting text-2xl sm:text-3xl font-bold text-[#2B2024] tracking-wide text-center">
                  Happy Birthday To You
                </div>
                <div className="w-16 h-0.5 bg-pink-300 mt-2 rounded-full" />
              </div>

              {/* Envelope Folds (Left, Right, Bottom) */}
              <div className="absolute inset-0 pointer-events-none z-15">
                {/* Left Triangle Fold */}
                <div
                  className="absolute top-0 bottom-0 left-0 w-0 h-0"
                  style={{
                    borderTop: '110px solid transparent',
                    borderBottom: '110px solid transparent',
                    borderLeft: '144px solid #F8AEC6',
                  }}
                />
                {/* Right Triangle Fold */}
                <div
                  className="absolute top-0 bottom-0 right-0 w-0 h-0"
                  style={{
                    borderTop: '110px solid transparent',
                    borderBottom: '110px solid transparent',
                    borderRight: '144px solid #F8AEC6',
                  }}
                />
                {/* Bottom Triangle Fold */}
                <div
                  className="absolute bottom-0 left-0 right-0 w-0 h-0 mx-auto"
                  style={{
                    borderLeft: '144px solid transparent',
                    borderRight: '144px solid transparent',
                    borderBottom: '125px solid #F28EAE',
                  }}
                />
              </div>

              {/* Top Flap (Flips open upwards with true 3D rotation) */}
              <div
                className="absolute top-0 left-0 right-0 h-0 mx-auto transition-transform duration-600 ease-in-out pointer-events-none z-25"
                style={{
                  borderLeft: '144px solid transparent',
                  borderRight: '144px solid transparent',
                  borderTop: '120px solid #EA7FA4',
                  transformOrigin: 'top center',
                  transformStyle: 'preserve-3d',
                  transform: envelopeState === 'opening' ? 'rotateX(180deg)' : 'rotateX(0deg)',
                }}
              />

              {/* Royal Carmine Wax Seal with Gold-rimmed border */}
              <div
                className={`absolute top-22 sm:top-25 left-1/2 -translate-x-1/2 -translate-y-1/2 z-35 transition-all duration-300 ${
                  envelopeState === 'opening' ? 'scale-0 opacity-0' : 'scale-100 opacity-100 animate-pulse'
                }`}
              >
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#E6396E] to-[#B31942] border-2 border-[#F5D77F] shadow-[0_4px_12px_rgba(179,25,66,0.5)] flex items-center justify-center text-xl text-white">
                  ♥
                </div>
              </div>
            </div>

            {/* Hint */}
            <div className="absolute -bottom-9 text-xs font-bold text-white bg-pink-600/90 px-4 py-1.5 rounded-full shadow-md animate-bounce">
              💌 Unfolding your birthday letter...
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* PHASE 3: REVEALED HANDWRITTEN LINED LETTER                       */}
        {/* ============================================================== */}
        {envelopeState === 'opened' && (
          <div
            className="relative w-full bg-[#FFFDF9] rounded-3xl p-4 xs:p-6 sm:p-10 shadow-2xl border-4 border-[#FAD2E1] max-h-[85dvh] overflow-y-auto select-text animate-slideUp overscroll-contain"
            style={{ WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain' }}
          >
            {/* Washi Tape Strip at Top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 sm:w-32 h-5 sm:h-6 bg-gradient-to-r from-pink-300 via-rose-200 to-yellow-200 opacity-85 rotate-[-1.5deg] rounded-sm shadow-sm pointer-events-none" />

            {/* Delicate Horizontal Notebook Ruling Lines */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none opacity-25"
              style={{
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 34px, #D8A4B3 34px, #D8A4B3 35px)',
                backgroundPosition: '0 4rem',
              }}
            />

            {/* Top Date & Tag */}
            <div className="relative z-10 flex items-center justify-between text-xs font-bold text-[#C4515C] uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5 font-sans">
                <span>💌</span>
                <span className="text-[11px] sm:text-xs">A Birthday Note For Rabbit</span>
              </span>
              <span className="text-[10px] sm:text-[11px] bg-pink-100 text-pink-700 px-2.5 py-0.5 rounded-full font-bold font-sans">
                15th November ✨
              </span>
            </div>

            {/* Iconic Handwritten Headline */}
            <div className="relative z-10 text-center my-3 sm:my-4">
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                <span className="font-handwriting text-2xl sm:text-3xl text-[#2B2024]">❥</span>
                <h2 className="font-handwriting text-4xl sm:text-5xl md:text-6xl font-bold text-[#2B2024] tracking-wide leading-tight drop-shadow-sm break-words">
                  Happy Birthday To You.
                </h2>
                <span className="font-handwriting text-2xl sm:text-3xl text-[#2B2024]">❥</span>
              </div>
              <div className="font-handwriting text-2xl sm:text-4xl font-bold text-[#C4515C] mt-1">
                Dearest Rabbit, 🐰💖
              </div>
            </div>

            {/* Handwritten Letter Body - Highly Legible on Small Screens */}
            <div className="relative z-10 font-handwriting text-xl sm:text-2xl md:text-3xl text-[#2B2024] leading-relaxed space-y-3.5 sm:space-y-4 pt-1">
              <p>
                Wishing you the most extraordinary, joyful, and sweetest birthday today! 🎉🎂
              </p>

              <p>
                I didn’t have any of your pictures to put on this website, but the truth is you don’t need photos to stand out. Your bright personality, your effortless wit, and the genuine warmth you bring everywhere speak louder than anything else.
              </p>

              <p>
                November 15th belongs completely to you. I hope you get to eat the biggest slice of delicious cake, laugh until your cheeks hurt, and celebrate surrounded by pure happiness and good vibes.
              </p>

              <p>
                May this brand new year bring you exciting new adventures, good health, boundless confidence, and every single dream you’ve been quietly wishing for.
              </p>

              <p className="font-bold text-[#C4515C] text-2xl sm:text-3xl pt-1">
                Stay radiant, stay unforgettable, and keep being the wonderful Rabbit you are! 💖🐰
              </p>
            </div>

            {/* Cute Birthday Badges */}
            <div className="relative z-10 mt-5 sm:mt-6 pt-3 sm:pt-4 border-t-2 border-dashed border-pink-200 flex flex-wrap gap-1.5 sm:gap-2 text-sm sm:text-base font-handwriting font-bold text-pink-800">
              <span className="px-3 py-0.5 bg-pink-50 rounded-full border border-pink-200 shadow-sm">#BornToShine ✨</span>
              <span className="px-3 py-0.5 bg-yellow-50 rounded-full border border-yellow-200 shadow-sm">#RabbitDay2026 🐰</span>
              <span className="px-3 py-0.5 bg-rose-50 rounded-full border border-rose-200 shadow-sm">#InfiniteSmiles 💕</span>
            </div>

            {/* Signature & Bottom Fold Button - Meets Min 44px Touch Target */}
            <div className="relative z-10 mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-pink-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-center sm:text-left">
                <div className="font-handwriting text-2xl sm:text-3xl font-bold text-[#C4515C]">
                  Always rooting for you ✨
                </div>
                <div className="text-xs text-neutral-500 font-sans mt-0.5">
                  Made with love for Rabbit · November 15
                </div>
              </div>

              {/* Fold & Close Button - 44px min tap target */}
              <button
                onClick={onClose}
                className="min-h-[44px] py-3 px-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
              >
                Fold & Close 💌
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
