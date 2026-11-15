import React from 'react';

export default function EditorialMarqueeStrip({ name = 'Rabbit' }) {
  // Repeating segment with golden diamond stars matching reference photo
  const items = Array.from({ length: 8 });

  return (
    <div className="w-full max-w-full flex flex-col items-center select-none z-20 my-0.5 sm:my-1.5 overflow-hidden">
      {/* Editorial Kicker Tag */}
      <div className="text-[9px] sm:text-[10px] font-sans tracking-[0.28em] uppercase text-[#7A3614] font-semibold mb-0.5 opacity-90">
        ✦ AN EDITORIAL ODE ✦
      </div>

      {/* Poetic Subtitle matching user reference */}
      <p className="font-sans text-xs sm:text-sm text-[#4A2010] text-center max-w-xs sm:max-w-md px-4 mb-1.5 leading-snug sm:leading-relaxed font-semibold">
        If I had to design love as a website, this is how it would feel: dramatic, soft, a little chaotic, completely obsessed with you.
      </p>

      {/* The Wide Marquee Strip - Hardware Accelerated 60 FPS on Mobile with Edge Fade Mask */}
      <div 
        className="w-full bg-[#2A2326] text-[#FDE2E4] border-y border-[#E8A598]/40 py-2 sm:py-3.5 overflow-hidden shadow-md relative"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
        }}
      >
        <div className="animate-marquee whitespace-nowrap flex items-center transform-gpu will-change-transform">
          {items.map((_, i) => (
            <div key={i} className="flex items-center px-3 sm:px-6">
              <span className="font-display font-black text-lg xs:text-xl sm:text-3xl tracking-[0.16em] sm:tracking-[0.22em] uppercase text-[#FDE2E4]">
                HAPPY BIRTHDAY
              </span>
              <span className="mx-3 sm:mx-5 text-[#F5D77F] drop-shadow-[0_0_8px_rgba(245,215,127,0.7)] text-base xs:text-lg sm:text-2xl animate-pulse">
                ✦
              </span>
              <span className="font-display font-black text-lg xs:text-xl sm:text-3xl tracking-[0.16em] sm:tracking-[0.22em] uppercase text-[#FDE2E4]">
                {name.toUpperCase()}
              </span>
              <span className="mx-3 sm:mx-5 text-[#F5D77F] drop-shadow-[0_0_8px_rgba(245,215,127,0.7)] text-base xs:text-lg sm:text-2xl animate-pulse">
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
