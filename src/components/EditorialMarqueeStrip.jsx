import React from 'react';

export default function EditorialMarqueeStrip({ name = 'Rabbit' }) {
  const segment = `HAPPY BIRTHDAY ✦ ${name.toUpperCase()} ✦ `;
  // Repeat segment to fill width and create seamless infinite scroll
  const fullContent = segment.repeat(6);

  return (
    <div className="w-full flex flex-col items-center select-none z-20 my-2">
      {/* Poetic Subtitle matching user photo */}
      <p className="font-sans text-xs sm:text-sm text-[#8B4513]/85 text-center max-w-md px-4 mb-2 leading-relaxed font-medium">
        If I had to design love as a website, this is how it would feel: dramatic, soft, a little chaotic, completely obsessed with you.
      </p>

      {/* The Wide Marquee Strip matching media_1794747148232_a97af287.jpg */}
      <div className="w-full bg-[#2A2326] text-[#FDE2E4] border-y border-[#E8A598]/40 py-3 sm:py-4 overflow-hidden shadow-md relative">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          <span className="font-display font-black text-xl sm:text-3xl tracking-[0.22em] uppercase text-[#FDE2E4] px-6">
            {fullContent}
          </span>
          <span className="font-display font-black text-xl sm:text-3xl tracking-[0.22em] uppercase text-[#FDE2E4] px-6">
            {fullContent}
          </span>
        </div>
      </div>
    </div>
  );
}
