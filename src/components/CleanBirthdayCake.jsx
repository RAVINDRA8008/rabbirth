import React from 'react';

export default function CleanBirthdayCake({ candleBlown }) {
  // Precise flame coordinates on cake.gif (1000x1000)
  const flames = [
    { left: '38.2%', top: '27.2%', width: '24px', height: '34px' },
    { left: '42.9%', top: '25.2%', width: '24px', height: '34px' },
    { left: '48.0%', top: '21.2%', width: '26px', height: '38px' },
    { left: '53.6%', top: '25.2%', width: '24px', height: '34px' },
    { left: '59.0%', top: '25.2%', width: '24px', height: '34px' },
    { left: '62.6%', top: '30.2%', width: '22px', height: '32px' },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center my-1 select-none">
      {/* Authentic Hand-Drawn Animated Birthday Cake */}
      <div className="relative w-72 sm:w-84 max-w-full flex flex-col items-center">
        <img
          src="./cake.gif"
          alt="Birthday Cake for Rabbit"
          className="w-full h-auto drop-shadow-md pointer-events-none transition-transform duration-500"
        />

        {/* When candles are blown out: Mask out the flames and show realistic rising smoke */}
        {candleBlown && (
          <div className="absolute inset-0 pointer-events-none animate-fadeIn">
            {flames.map((flame, idx) => (
              <div
                key={idx}
                style={{ left: flame.left, top: flame.top }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              >
                {/* Gentle rising smoke wisp */}
                <div
                  className="animate-bounce -mb-2"
                  style={{ animationDelay: `${idx * 0.12}s`, animationDuration: '2.2s' }}
                >
                  <span className="text-xl opacity-85">💨</span>
                </div>

                {/* Flame Mask matching the #FFDAB9 background perfectly */}
                <div
                  style={{ width: flame.width, height: flame.height }}
                  className="rounded-full bg-[#FFDAB9] flex items-end justify-center"
                >
                  {/* Extinguished little black candle wick */}
                  <div className="w-[2.5px] h-3.5 bg-neutral-900 rounded-t-sm" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sweet Birthday Wish Confirmation Box */}
      {candleBlown && (
        <div className="mt-2 px-6 py-2.5 rounded-2xl bg-white/95 border-2 border-pink-300 shadow-md text-center max-w-sm animate-fadeIn">
          <div className="font-display font-bold text-sm text-[#C4515C] flex items-center justify-center gap-1.5">
            <span>✨</span>
            <span>Your Birthday Wish Has Been Made!</span>
            <span>✨</span>
          </div>
          <p className="font-sans text-xs text-neutral-600 mt-0.5 font-medium">
            May every single dream in your heart come true this year, Rabbit! 💖
          </p>
        </div>
      )}
    </div>
  );
}
