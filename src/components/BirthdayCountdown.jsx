import React, { useState, useEffect } from 'react';

function BirthdayCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      let target = new Date(now.getFullYear(), 10, 15, 23, 59, 59);
      if (now.getTime() > target.getTime()) {
        target = new Date(now.getFullYear() + 1, 10, 15, 0, 0, 0);
      }

      const diff = Math.max(0, target.getTime() - now.getTime());
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days: String(d).padStart(2, '0'),
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0'),
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center my-1 sm:my-2 select-none animate-fadeIn w-full max-w-md px-1 sm:px-2">
      {/* Ambient Rose-Gold Halo Backlight */}
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-300/20 via-amber-200/25 to-pink-300/20 rounded-3xl blur-xl -z-10 pointer-events-none" />

      {/* Multi-Layered Frosted Glass Jewel Container */}
      <div className="w-full bg-gradient-to-b from-white/70 to-white/45 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-white/90 ring-1 ring-[#D4AF37]/30 shadow-[0_12px_36px_-6px_rgba(200,80,90,0.12),inset_0_1px_3px_rgba(255,255,255,0.9)] py-2 sm:py-3 px-3 sm:px-6 flex flex-col items-center">
        {/* Header Tag with Sparkling Diamond Accents */}
        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/75 border border-pink-200/60 shadow-2xs mb-2">
          <span className="text-[10px] text-amber-500 animate-pulse">✧</span>
          <span className="text-[9px] sm:text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-[#7A3614]">
            AWAITING THE MOMENT
          </span>
          <span className="text-[10px] text-amber-500 animate-pulse">✧</span>
        </div>

        {/* Digits Display in Soft Ivory Pods */}
        <div className="flex items-center justify-center gap-1.5 xs:gap-2.5 sm:gap-4 text-center max-w-full">
          {/* Days */}
          <div className="flex flex-col items-center bg-white/85 rounded-xl sm:rounded-2xl py-1.5 sm:py-2 px-2.5 sm:px-3 min-w-[46px] xs:min-w-[52px] sm:min-w-[66px] border border-white/95 shadow-[0_2px_8px_rgba(180,80,60,0.06),inset_0_1px_2px_rgba(255,255,255,0.85)]">
            <span className="font-display text-2xl xs:text-3xl sm:text-5xl font-bold bg-gradient-to-b from-[#A82B3E] to-[#C93B52] bg-clip-text text-transparent tracking-tight tabular-nums">
              {timeLeft.days}
            </span>
            <span className="text-[7.5px] xs:text-[8.5px] sm:text-[10px] font-sans font-bold tracking-[0.16em] text-[#7A3614] uppercase mt-0.5">
              DAYS
            </span>
          </div>

          <span className="font-display text-xl xs:text-2xl sm:text-4xl font-light text-[#C4515C]/50 -mt-2 sm:-mt-3 select-none animate-pulse">:</span>

          {/* Hours */}
          <div className="flex flex-col items-center bg-white/85 rounded-xl sm:rounded-2xl py-1.5 sm:py-2 px-2.5 sm:px-3 min-w-[46px] xs:min-w-[52px] sm:min-w-[66px] border border-white/95 shadow-[0_2px_8px_rgba(180,80,60,0.06),inset_0_1px_2px_rgba(255,255,255,0.85)]">
            <span className="font-display text-2xl xs:text-3xl sm:text-5xl font-bold bg-gradient-to-b from-[#A82B3E] to-[#C93B52] bg-clip-text text-transparent tracking-tight tabular-nums">
              {timeLeft.hours}
            </span>
            <span className="text-[7.5px] xs:text-[8.5px] sm:text-[10px] font-sans font-bold tracking-[0.16em] text-[#7A3614] uppercase mt-0.5">
              HOURS
            </span>
          </div>

          <span className="font-display text-xl xs:text-2xl sm:text-4xl font-light text-[#C4515C]/50 -mt-2 sm:-mt-3 select-none animate-pulse">:</span>

          {/* Minutes */}
          <div className="flex flex-col items-center bg-white/85 rounded-xl sm:rounded-2xl py-1.5 sm:py-2 px-2.5 sm:px-3 min-w-[46px] xs:min-w-[52px] sm:min-w-[66px] border border-white/95 shadow-[0_2px_8px_rgba(180,80,60,0.06),inset_0_1px_2px_rgba(255,255,255,0.85)]">
            <span className="font-display text-2xl xs:text-3xl sm:text-5xl font-bold bg-gradient-to-b from-[#A82B3E] to-[#C93B52] bg-clip-text text-transparent tracking-tight tabular-nums">
              {timeLeft.minutes}
            </span>
            <span className="text-[7.5px] xs:text-[8.5px] sm:text-[10px] font-sans font-bold tracking-[0.16em] text-[#7A3614] uppercase mt-0.5">
              MINUTES
            </span>
          </div>

          <span className="font-display text-xl xs:text-2xl sm:text-4xl font-light text-[#C4515C]/50 -mt-2 sm:-mt-3 select-none animate-pulse">:</span>

          {/* Seconds */}
          <div className="flex flex-col items-center bg-white/85 rounded-xl sm:rounded-2xl py-1.5 sm:py-2 px-2.5 sm:px-3 min-w-[46px] xs:min-w-[52px] sm:min-w-[66px] border border-white/95 shadow-[0_2px_8px_rgba(180,80,60,0.06),inset_0_1px_2px_rgba(255,255,255,0.85)]">
            <span className="font-display text-2xl xs:text-3xl sm:text-5xl font-bold bg-gradient-to-b from-[#A82B3E] to-[#C93B52] bg-clip-text text-transparent tracking-tight tabular-nums">
              {timeLeft.seconds}
            </span>
            <span className="text-[7.5px] xs:text-[8.5px] sm:text-[10px] font-sans font-bold tracking-[0.16em] text-[#7A3614] uppercase mt-0.5">
              SECONDS
            </span>
          </div>
        </div>

        {/* Poetic Line */}
        <div className="mt-1.5 sm:mt-2 text-center px-2">
          <p className="font-display italic text-xs xs:text-sm sm:text-base text-[#4E2730]/90 tracking-wide leading-snug sm:leading-relaxed font-medium">
            Time holds its breath until the calendar turns to you.
          </p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(BirthdayCountdown);
