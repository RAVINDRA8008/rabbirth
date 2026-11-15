import React, { useState } from 'react';

export default function KeepsakeVault() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="vault" className="py-24 px-6 sm:px-12 lg:px-20 border-b border-ink-border bg-ink-light/30 bg-grain relative">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Folio Tag */}
        <div className="flex items-center space-x-3 text-gold text-xs tracking-widest-plus uppercase mb-4">
          <span className="h-px w-8 bg-gold/40 inline-block" />
          <span>Folio No. 03 — The Keepsake Vault</span>
          <span className="h-px w-8 bg-gold/40 inline-block" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-title tracking-wide text-bone-pure mb-3">
          The Archival Casket
        </h2>
        <p className="font-editorial italic text-xl sm:text-2xl text-bone-muted max-w-lg mb-12">
          "A private heirloom crafted in silence, opened only on the fifteenth of November."
        </p>

        {/* The Vault Box Container */}
        <div className="w-full max-w-lg mx-auto perspective-1000">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className={`cursor-pointer relative transition-all duration-700 ease-out border border-gold/30 bg-neutral-950 p-8 sm:p-12 shadow-luxury-depth ${
              isOpen ? 'ring-1 ring-gold/40' : 'hover:border-gold/60'
            }`}
          >
            {/* Corner Brass Brackets */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gold" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gold" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gold" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gold" />

            {!isOpen ? (
              /* Closed Vault State */
              <div className="py-10 flex flex-col items-center justify-center space-y-6">
                {/* Latch Insignia */}
                <div className="w-20 h-20 rounded-full border border-gold/40 flex items-center justify-center bg-neutral-900 shadow-inner group">
                  <div className="w-14 h-14 rounded-full border border-dashed border-gold/30 flex items-center justify-center">
                    <span className="text-gold text-2xl font-serif">R</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs tracking-super-wide text-gold uppercase font-mono">
                    ✦ CLICK TO UNLATCH ✦
                  </div>
                  <div className="text-[11px] text-bone-dark tracking-widest uppercase">
                    SEALED FOR RABBIT · NO. 1511
                  </div>
                </div>
              </div>
            ) : (
              /* Open Vault State: Engraved Gold Plaque */
              <div className="py-4 flex flex-col items-center justify-center animate-fadeIn">
                {/* 24K Antique Bullion Plaque */}
                <div className="w-full bg-gradient-to-br from-[#E2CEB4] via-[#C5A880] to-[#8B6D3F] p-8 text-neutral-950 shadow-2xl border border-yellow-100/50 relative overflow-hidden">
                  {/* Subtle Diagonal Sheen line */}
                  <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-45 pointer-events-none" />

                  {/* Plaque Header */}
                  <div className="flex justify-between items-center text-[10px] tracking-super-wide uppercase font-mono text-neutral-900 border-b border-neutral-800/30 pb-3 mb-6">
                    <span>ARCHIVAL TOKEN</span>
                    <span>15 · XI · 2026</span>
                  </div>

                  {/* Plaque Inscription */}
                  <div className="space-y-4 my-4">
                    <h3 className="font-serif text-2xl sm:text-3xl tracking-widest text-neutral-950 uppercase font-bold">
                      FOR RABBIT
                    </h3>
                    <p className="font-editorial italic text-lg sm:text-xl text-neutral-900 leading-relaxed font-medium">
                      "In a world often loud and ordinary, you exist with an effortless spark, a sharp wit, and an undeniable warmth. May this fifteenth of November and every chapter ahead bring you the extraordinary happiness you so naturally deserve."
                    </p>
                  </div>

                  {/* Plaque Footer Hallmark */}
                  <div className="border-t border-neutral-800/30 pt-3 mt-6 flex justify-between items-center text-[10px] tracking-widest font-mono text-neutral-800">
                    <span>HALLMARK: PURE EXCELLENCE</span>
                    <span>✦ ✦ ✦</span>
                  </div>
                </div>

                <p className="text-[11px] text-bone-muted tracking-widest uppercase mt-6">
                  (Click box again to close latch)
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
