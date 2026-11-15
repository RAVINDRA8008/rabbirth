import React, { useState } from 'react';

export default function BirthdayCake2D({ candleBlown, onBlowCandle, onRelightCandle, onSliceCut }) {
  const [isSliced, setIsSliced] = useState(false);

  const handleCutSlice = () => {
    const next = !isSliced;
    setIsSliced(next);
    if (onSliceCut) onSliceCut(next);
  };

  return (
    <div className="relative flex flex-col items-center select-none py-2">
      {/* 2D Refined Patisserie Cake SVG / CSS Illustration */}
      <div className="relative w-72 sm:w-80 h-72 flex flex-col items-center justify-end">
        {/* Candle Flame & Wick */}
        <div className="absolute top-4 flex flex-col items-center z-30">
          {!candleBlown ? (
            <div
              onClick={onBlowCandle}
              className="cursor-pointer group flex flex-col items-center transition-transform hover:scale-110 active:scale-95"
              title="Click to blow candle!"
            >
              {/* Outer Golden Glow Halo */}
              <div className="absolute -top-3 w-14 h-14 rounded-full bg-amber-400/35 blur-lg animate-pulse" />

              {/* Flame Body */}
              <div className="w-5 h-9 rounded-full bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-100 animate-flame shadow-[0_0_20px_rgba(255,165,0,0.9)] relative">
                {/* Blue Core at base of flame */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2.5 bg-blue-500/90 rounded-full blur-[0.5px]" />
              </div>

              {/* Candle Wick */}
              <div className="w-1 h-3 bg-neutral-900 rounded-t" />
            </div>
          ) : (
            <div className="flex flex-col items-center animate-fadeIn">
              {/* Extinguished Wick with smoke puff */}
              <div className="text-2xl animate-bounce">💨</div>
              <div className="w-1 h-3 bg-neutral-800 rounded-t relative">
                <div className="w-1 h-1 bg-red-500/80 rounded-full absolute -top-0.5 animate-ping" />
              </div>
            </div>
          )}

          {/* Candle Body */}
          <div className="w-6 h-18 rounded-t-md bg-gradient-to-r from-pink-200 via-white to-pink-300 border-2 border-pink-400 relative overflow-hidden shadow-md">
            {/* Elegant Spiral Gold Foil Stripe */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#F5D77F,#F5D77F_6px,#EE6055_6px,#EE6055_12px)] opacity-85" />
          </div>
        </div>

        {/* Fresh Glazed Fruit Topping (Strawberries & Cherries) */}
        <div className="absolute top-22 z-20 flex items-center justify-center space-x-6 w-full pointer-events-none">
          <span className="text-2xl drop-shadow-md animate-bounce" style={{ animationDuration: '3s' }}>🍓</span>
          <span className="text-xl drop-shadow-md">🍒</span>
          <span className="text-2xl drop-shadow-md animate-bounce" style={{ animationDuration: '3.5s' }}>🍓</span>
          <span className="text-xl drop-shadow-md">🍒</span>
        </div>

        {/* Top Cake Tier (Strawberry Chantilly Cream) */}
        <div className="relative w-48 sm:w-52 h-22 rounded-t-3xl bg-gradient-to-b from-[#FFF0F3] via-[#FAD2E1] to-[#F7CAD0] border-2 border-[#F4ACB7] shadow-lg z-10 flex flex-col justify-between overflow-hidden">
          {/* Luscious Strawberry Icing Drips */}
          <div className="flex justify-between w-full px-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="w-4 h-5 rounded-b-full bg-gradient-to-b from-white to-[#FDE2E4] shadow-sm -mt-1"
                style={{ height: `${12 + (i % 4) * 5}px` }}
              />
            ))}
          </div>

          {/* Colorful Gourmet Sprinkles */}
          <div className="flex justify-around items-center px-4 mb-2">
            <span className="w-3 h-1 rounded-full bg-pink-500 rotate-45 inline-block shadow-sm" />
            <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block shadow-sm" />
            <span className="w-3 h-1 rounded-full bg-sky-400 -rotate-12 inline-block shadow-sm" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block shadow-sm" />
            <span className="w-3 h-1 rounded-full bg-purple-400 rotate-90 inline-block shadow-sm" />
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block shadow-sm" />
          </div>
        </div>

        {/* Whipped Cream Rosettes Ring Between Tiers */}
        <div className="w-58 sm:w-62 h-4 bg-white rounded-full shadow-md z-10 -my-1 border-2 border-pink-200 flex justify-around items-center px-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-full bg-gradient-to-tr from-pink-300 to-white shadow-inner" />
          ))}
        </div>

        {/* Bottom Cake Tier (Velvet Vanilla Sponge & Chocolate Drips) */}
        <div className="relative w-64 sm:w-72 h-26 rounded-t-2xl bg-gradient-to-b from-[#FFFDF9] via-[#FFF3F5] to-[#FDE2E4] border-2 border-[#F4ACB7] shadow-xl flex flex-col justify-between overflow-hidden">
          {/* Belgian Chocolate Ganache Drips */}
          <div className="flex justify-between w-full px-1">
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                className="w-4.5 h-6 rounded-b-full bg-gradient-to-b from-[#8B4513] to-[#5C2C16] shadow-sm -mt-1"
                style={{ height: `${12 + ((i * 5) % 12)}px` }}
              />
            ))}
          </div>

          {/* Gold & Sugar Confetti Sprinkles */}
          <div className="flex justify-around items-center px-6 mb-3">
            <span className="w-3.5 h-1.5 rounded-full bg-yellow-400 rotate-12 inline-block shadow-sm" />
            <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block shadow-sm" />
            <span className="w-3.5 h-1.5 rounded-full bg-pink-500 -rotate-45 inline-block shadow-sm" />
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 inline-block shadow-sm" />
            <span className="w-3.5 h-1.5 rounded-full bg-emerald-400 rotate-45 inline-block shadow-sm" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block shadow-sm" />
          </div>
        </div>

        {/* Scalloped Gold Platter Stand */}
        <div className="w-76 sm:w-84 h-5 rounded-full bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-400 border-2 border-yellow-500 shadow-2xl flex items-center justify-around px-4">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-yellow-600/50" />
          ))}
        </div>
        <div className="w-40 sm:w-48 h-3.5 rounded-b-xl bg-gradient-to-r from-amber-400 to-amber-500 shadow-md" />
      </div>

      {/* Sliced Cake Plate Reveal (when cut) */}
      {isSliced && (
        <div className="mt-4 p-4 rounded-2xl bg-white/95 border-2 border-pink-300 shadow-lg text-center animate-fadeIn max-w-sm">
          <div className="text-3xl mb-1">🍰✨</div>
          <div className="font-display font-bold text-sm text-[#C4515C]">
            A Sweet Slice For Rabbit!
          </div>
          <p className="font-sans text-xs text-neutral-600 mt-1">
            Fluffy vanilla sponge layered with fresh strawberry compote & whipped cream! Enjoy! 💖
          </p>
        </div>
      )}

      {/* Interactive Controls & Wish Feedback */}
      <div className="mt-4 flex flex-wrap justify-center gap-2.5">
        {!candleBlown ? (
          <button
            onClick={onBlowCandle}
            className="px-7 py-3 rounded-full bg-gradient-to-r from-[#FF5E7E] via-[#FF8E71] to-[#FFAA64] text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
          >
            🌬️ Blow Candle & Make Wish!
          </button>
        ) : (
          <button
            onClick={onRelightCandle}
            className="px-5 py-2.5 rounded-full border-2 border-pink-400 bg-white/90 text-xs font-bold text-pink-600 hover:bg-pink-50 transition-colors shadow-sm"
          >
            🕯️ Relight Candle
          </button>
        )}

        <button
          onClick={handleCutSlice}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-[#783205] font-bold text-xs sm:text-sm tracking-wider uppercase shadow-md hover:scale-105 active:scale-95 transition-all"
        >
          {isSliced ? '🍰 Finish Slice' : '🍰 Cut A Slice!'}
        </button>
      </div>
    </div>
  );
}
