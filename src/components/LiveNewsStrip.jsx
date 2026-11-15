import React from 'react';

export default function LiveNewsStrip({ name = 'Rabbit' }) {
  const tickerText = `HAPPY BIRTHDAY ${name.toUpperCase()} ✦ NOVEMBER 15 SPECIAL LIVE BROADCAST ✦ CELEBRATING THE ONE AND ONLY ${name.toUpperCase()} ✦ WISHING YOU INFINITE JOY AND SUCCESS ✦ BORN TO SHINE ✦ MAY ALL YOUR DREAMS COME TRUE ✦ `;

  return (
    <div className="w-full bg-[#1F191B] text-[#FFF0F3] border-b border-pink-400/30 flex items-center overflow-hidden shadow-sm select-none z-30 relative">
      {/* Live Badge On The Left */}
      <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#E6396E] text-white font-sans font-black text-[11px] tracking-widest uppercase z-20 shadow-md flex-shrink-0">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
        </span>
        <span>LIVE</span>
      </div>

      {/* Scrolling News Ticker Track */}
      <div className="flex-1 overflow-hidden relative">
        <div className="animate-marquee whitespace-nowrap py-1">
          <span className="font-sans font-extrabold text-xs tracking-widest uppercase text-pink-100 px-4">
            {tickerText}
          </span>
          <span className="font-sans font-extrabold text-xs tracking-widest uppercase text-pink-100 px-4">
            {tickerText}
          </span>
        </div>
      </div>
    </div>
  );
}
