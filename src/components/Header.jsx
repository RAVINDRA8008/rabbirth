import React, { useState, useEffect } from 'react';

export default function Header() {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-ink-border bg-ink/80 backdrop-blur-md px-6 sm:px-12 py-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-xs tracking-super-wide text-bone-muted uppercase">
        {/* Left Folio Meta */}
        <div className="flex items-center space-x-3">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse inline-block" />
          <span className="hidden sm:inline text-gold">EDITION XV.XI</span>
          <span className="hidden sm:inline text-bone-dark">/</span>
          <span className="tracking-widest">FOR RABBIT</span>
        </div>

        {/* Center Monogram Emblem */}
        <div className="flex items-center space-x-2 text-gold tracking-widest-plus font-title font-semibold text-sm">
          <span>✦</span>
          <span className="text-bone-pure tracking-super-wide">R · XV</span>
          <span>✦</span>
        </div>

        {/* Right Observance & Time */}
        <div className="flex items-center space-x-3 font-mono text-[11px] text-bone-muted">
          <span className="hidden md:inline tracking-widest text-gold-light">15 NOV 2026</span>
          <span className="hidden md:inline text-bone-dark">|</span>
          <span className="text-gold tracking-widest">{timeString || '00:00:00'}</span>
        </div>
      </div>
    </header>
  );
}
