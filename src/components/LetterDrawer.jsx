import React from 'react';

export default function LetterDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/45 backdrop-blur-sm animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-[#FAD2E1] text-[#2D2424] max-h-[88vh] overflow-y-auto select-text"
      >
        {/* Washi Tape Accent at Top */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-gradient-to-r from-pink-300 to-yellow-200 opacity-80 rotate-[-2deg] rounded-sm shadow-sm" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close note"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center hover:bg-pink-200 font-bold text-sm transition-colors shadow-sm"
        >
          ✕
        </button>

        {/* Header Tag */}
        <div className="flex items-center space-x-2 text-xs font-bold text-[#C4515C] uppercase tracking-wider mb-4">
          <span>💌</span>
          <span>A Private Birthday Note for Rabbit</span>
        </div>

        {/* Salutation */}
        <h2 className="font-display text-2xl sm:text-3xl text-[#C4515C] font-bold mb-4">
          Dear Rabbit, 🐰✨
        </h2>

        {/* Letter Body in simple, warm, sweet English */}
        <div className="font-sans text-sm sm:text-base text-neutral-700 leading-relaxed space-y-4">
          <p>
            Happy, happy birthday! 🎉🎂
          </p>
          <p>
            I didn't have any of your photos to build this website, but honestly? You don't need a single photo to stand out. Your bright personality, your effortless charm, your witty remarks, and the genuine warmth you bring everywhere say everything about who you are.
          </p>
          <p>
            Today is the 15th of November — your day! I hope you get to celebrate in grand style, feast on the sweetest desserts, laugh until your cheeks hurt, and surround yourself with everything that makes you happiest.
          </p>
          <p>
            May this brand new chapter of your life be filled with boundless joy, wonderful surprises, good health, and all the success you richly deserve.
          </p>
          <p className="font-semibold text-[#EE6055] pt-1">
            Stay awesome, stay wonderful, and keep being the radiant Rabbit you are! 💖
          </p>
        </div>

        {/* Cute Birthday Badges */}
        <div className="mt-6 pt-4 border-t-2 border-dashed border-pink-200 flex flex-wrap gap-2 text-xs font-semibold text-pink-700">
          <span className="px-3 py-1 bg-pink-50 rounded-full border border-pink-200">#BornToShine ✨</span>
          <span className="px-3 py-1 bg-yellow-50 rounded-full border border-yellow-200">#RabbitDay2026 🐰</span>
          <span className="px-3 py-1 bg-rose-50 rounded-full border border-rose-200">#InfiniteSmiles 💖</span>
        </div>

        {/* Signature */}
        <div className="mt-6 pt-4 border-t border-pink-100 flex justify-between items-center text-xs text-neutral-500">
          <div>
            <div className="font-display font-bold text-lg text-[#C4515C]">Happy Birthday!</div>
            <div className="font-sans font-medium text-neutral-600 mt-0.5">Always rooting for you ✨</div>
          </div>
          <div className="text-3xl">
            🎂🎁🎈
          </div>
        </div>
      </div>
    </div>
  );
}
