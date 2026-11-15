import React, { useState } from 'react';

export default function MonogramEpistle() {
  const [isBroken, setIsBroken] = useState(false);

  return (
    <section className="py-24 px-6 sm:px-12 lg:px-20 border-b border-ink-border bg-ink-light/20 bg-grain relative">
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
        {/* Folio Tag */}
        <div className="flex items-center space-x-3 text-gold text-xs tracking-widest-plus uppercase mb-4">
          <span className="h-px w-8 bg-gold/40 inline-block" />
          <span>Folio No. 05 — The Sealed Epistle</span>
          <span className="h-px w-8 bg-gold/40 inline-block" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-title tracking-wide text-bone-pure mb-3">
          The Archival Letter
        </h2>
        <p className="font-editorial italic text-xl sm:text-2xl text-bone-muted max-w-lg mb-12">
          "Hand-inscribed, sealed in bordeaux wax, addressed strictly to Rabbit."
        </p>

        {/* Envelope & Letter Container */}
        <div className="w-full relative">
          {!isBroken ? (
            /* Sealed Envelope */
            <div
              onClick={() => setIsBroken(true)}
              className="group cursor-pointer border border-ink-border bg-ink-light/80 p-8 sm:p-14 relative gold-border-glow shadow-luxury-depth transition-all duration-500 hover:border-gold/40 max-w-xl mx-auto"
            >
              {/* Envelope Flap Lines */}
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M 0,0 L 50,45 L 100,0" fill="none" stroke="rgba(197, 168, 128, 0.15)" strokeWidth="0.8" />
                </svg>
              </div>

              {/* Envelope Address */}
              <div className="pt-6 pb-16 flex flex-col items-center space-y-2">
                <span className="text-[10px] tracking-super-wide text-gold uppercase font-mono">CONFIDENTIAL & EXCLUSIVE</span>
                <div className="font-serif text-2xl sm:text-3xl tracking-widest text-bone-pure uppercase font-medium">
                  RABBIT
                </div>
                <div className="font-editorial italic text-bone-muted text-base">
                  Fifteenth Day of November · Present Year
                </div>
              </div>

              {/* 3D Wax Seal Stamp (Centered) */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center group-hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 rounded-full wax-seal flex items-center justify-center relative cursor-pointer">
                  <div className="w-12 h-12 rounded-full border border-red-300/20 flex items-center justify-center">
                    <span className="font-title text-xl text-yellow-100/90 font-bold">R</span>
                  </div>
                </div>
                <span className="text-[10px] tracking-widest text-gold uppercase font-mono mt-3">
                  ✦ BREAK SEAL TO READ ✦
                </span>
              </div>
            </div>
          ) : (
            /* Unfolded Parchment Letter */
            <div className="bg-[#FAF8F5] text-neutral-900 p-8 sm:p-14 shadow-2xl border border-[#D5C9B3] text-left max-w-2xl mx-auto animate-fadeIn relative">
              {/* Paper Watermark / Header */}
              <div className="flex justify-between items-center border-b border-neutral-300 pb-4 mb-8 font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
                <span>EPISTLE NO. 1511</span>
                <span>NOVEMBER 15, 2026</span>
              </div>

              {/* Letter Salutation */}
              <div className="font-title text-xl sm:text-2xl text-neutral-950 uppercase tracking-widest mb-6 font-semibold">
                Dear Rabbit,
              </div>

              {/* Letter Body in Editorial Garamond */}
              <div className="font-editorial text-xl sm:text-2xl leading-relaxed text-neutral-800 space-y-6">
                <p>
                  They say that rare people in this world rarely need advertising. They announce themselves simply by existing with unmistakable warmth, genuine wit, and complete authenticity.
                </p>
                <p>
                  Today is the fifteenth of November — an unrepeatable calendar date that belongs entirely to you. We may not have a gallery of photographs on display, but you don’t need pictures when your presence, your laughter, and the way you make moments memorable linger far longer than any photograph ever could.
                </p>
                <p>
                  On this birthday, I hope you know how valued you are. May the year ahead be profoundly kind to you: may it give you adventures that thrill you, peace when you crave quiet, friendships that cherish you unconditionally, and triumphs that match your intelligence and spirit.
                </p>
                <p className="pt-2">
                  Happy Birthday, Rabbit. May today be only the prelude to the finest year you’ve ever lived.
                </p>
              </div>

              {/* Letter Signature */}
              <div className="mt-10 pt-6 border-t border-neutral-300 flex justify-between items-end">
                <div>
                  <div className="font-editorial italic text-lg text-neutral-600">With utmost admiration,</div>
                  <div className="font-title text-base text-neutral-900 tracking-widest uppercase mt-1">Always In Your Corner</div>
                </div>
                <div className="w-10 h-10 rounded-full border border-neutral-400 flex items-center justify-center font-title text-xs text-neutral-700">
                  R · 15
                </div>
              </div>

              {/* Fold Letter Back Option */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => setIsBroken(false)}
                  className="text-[11px] font-mono tracking-widest text-neutral-500 hover:text-neutral-900 uppercase underline decoration-neutral-400"
                >
                  Reseal Epistle
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
