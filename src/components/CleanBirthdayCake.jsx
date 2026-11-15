import React from 'react';

function CleanBirthdayCake({ candleBlown }) {
  // Precise flame coordinates on cake.gif (1000x1000)
  const flames = [
    { left: '38.2%', top: '27.2%', width: '20px', height: '28px', delay: '0s' },
    { left: '42.9%', top: '25.2%', width: '20px', height: '28px', delay: '0.08s' },
    { left: '48.0%', top: '21.2%', width: '22px', height: '32px', delay: '0.04s' },
    { left: '53.6%', top: '25.2%', width: '20px', height: '28px', delay: '0.12s' },
    { left: '59.0%', top: '25.2%', width: '20px', height: '28px', delay: '0.06s' },
    { left: '62.6%', top: '30.2%', width: '18px', height: '26px', delay: '0.14s' },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      {/* Grounding Pedestal Radial Shadow */}
      <div className="absolute -bottom-1.5 w-48 sm:w-56 h-4 bg-amber-950/15 rounded-[100%] blur-md pointer-events-none" />

      {/* Hand-Drawn Animated Birthday Cake Container */}
      <div className="relative w-56 sm:w-64 max-w-full flex flex-col items-center">
        {/* Ambient Candle Glow Halo when lit */}
        {!candleBlown && (
          <div className="absolute top-6 w-36 h-20 bg-amber-300/35 rounded-full blur-2xl pointer-events-none animate-pulse" />
        )}

        <img
          src="./cake.gif"
          alt="Birthday Cake for Rabbit"
          className={`w-full h-auto pointer-events-none transform-gpu ${
            candleBlown ? 'cake-blow-reaction' : ''
          }`}
        />

        {/* When candles are blown out: Mask out the flames and show realistic rising procedural smoke & embers */}
        {candleBlown && (
          <div className="absolute inset-0 pointer-events-none animate-fadeIn transform-gpu">
            {flames.map((flame, idx) => (
              <div
                key={idx}
                style={{ left: flame.left, top: flame.top }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transform-gpu"
              >
                {/* Procedural Delicate Wispy Smoke Plume - 100% GPU Composited without expensive filter drop-shadow */}
                <div
                  className="animate-smokeWisp pointer-events-none transform-gpu will-change-transform"
                  style={{ animationDelay: flame.delay }}
                >
                  <svg
                    width="20"
                    height="32"
                    viewBox="0 0 24 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="opacity-75"
                  >
                    <path
                      d="M12 38C10 32 14 26 11 20C8 14 15 8 12 2"
                      stroke="rgba(255, 255, 255, 0.95)"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                    <path
                      d="M13 36C15 30 11 24 13 18C15 12 11 6 13 3"
                      stroke="rgba(230, 220, 215, 0.7)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* Flame Mask matching the #FFDAB9 background perfectly */}
                <div
                  style={{ width: flame.width, height: flame.height }}
                  className="rounded-full bg-[#FFDAB9] flex items-end justify-center -mt-2"
                >
                  {/* Extinguished candle wick with incandescent glowing ember tip (GPU accelerated, zero repaints) */}
                  <div className="relative flex flex-col items-center">
                    {/* Glowing Ember Halo - animates transform & opacity, never box-shadow */}
                    <div className="w-[4px] h-[4px] rounded-full bg-[#FF4500] animate-emberGlow transform-gpu" />
                    {/* Charcoal wick */}
                    <div className="w-[2px] h-2.5 bg-neutral-900 rounded-b-sm -mt-0.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sweet Birthday Wish Confirmation Box with Spring Overshoot */}
      {candleBlown && (
        <div className="mt-1 px-4 py-1.5 rounded-2xl bg-white/95 border-2 border-pink-300 shadow-md text-center max-w-sm animate-wishCardSpring transform-gpu">
          <div className="font-display font-bold text-xs sm:text-sm text-[#C4515C] flex items-center justify-center gap-1.5">
            <span>✨</span>
            <span>Your Birthday Wish Has Been Made!</span>
            <span>✨</span>
          </div>
          <p className="font-sans text-[10.5px] sm:text-xs text-neutral-600 font-medium">
            May every single dream in your heart come true this year, Rabbit! 💖
          </p>
        </div>
      )}
    </div>
  );
}

export default React.memo(CleanBirthdayCake);
