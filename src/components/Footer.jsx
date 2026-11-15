import React from 'react';

export default function Footer() {
  return (
    <footer className="py-16 px-6 sm:px-12 lg:px-20 bg-ink-light/50 border-t border-ink-border text-center text-xs tracking-super-wide text-bone-muted uppercase font-mono">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-center space-x-3 text-gold">
          <span>✦</span>
          <span className="text-bone-pure tracking-widest-plus font-serif text-sm font-semibold">
            RABBIT · XV.XI
          </span>
          <span>✦</span>
        </div>

        <p className="text-bone-dark max-w-md mx-auto normal-case font-editorial italic text-base">
          "Some people are chapters; you are an entire volume bound in gold."
        </p>

        <div className="pt-6 border-t border-ink-border/50 flex flex-col sm:flex-row justify-between items-center text-[10px] text-bone-dark space-y-2 sm:space-y-0">
          <span>PRIVATE COMMEMORATION · 15 NOVEMBER 2026</span>
          <span className="text-gold/80">NO IMAGES REQUIRED · THE AURA SPEAKS FOR ITSELF</span>
        </div>
      </div>
    </footer>
  );
}
