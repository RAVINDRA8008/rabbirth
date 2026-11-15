import React, { useState, useEffect } from 'react';

export default function BirthdayCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      // November 15th (month index 10)
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
    <div className="relative flex flex-col items-center justify-center my-3 select-none animate-fadeIn">
      {/* Header Tag matching reference: AWAITING THE MOMENT */}
      <div className="text-[10px] sm:text-xs font-sans tracking-[0.35em] uppercase text-[#8B4513]/70 border-b border-pink-300/60 pb-1 mb-3">
        AWAITING THE MOMENT
      </div>

      {/* Digits Display */}
      <div className="flex items-center justify-center gap-3 sm:gap-6 text-center">
        {/* Days */}
        <div className="flex flex-col items-center min-w-[50px] sm:min-w-[70px]">
          <span className="font-display text-4xl sm:text-6xl font-black text-[#C4515C] tracking-tight drop-shadow-sm">
            {timeLeft.days}
          </span>
          <span className="text-[9px] sm:text-[11px] font-sans font-bold tracking-[0.25em] text-[#8B4513]/70 uppercase mt-1">
            DAYS
          </span>
        </div>

        {/* Separator dot */}
        <span className="font-display text-3xl sm:text-5xl font-light text-[#C4515C]/40 -mt-4">
          :
        </span>

        {/* Hours */}
        <div className="flex flex-col items-center min-w-[50px] sm:min-w-[70px]">
          <span className="font-display text-4xl sm:text-6xl font-black text-[#C4515C] tracking-tight drop-shadow-sm">
            {timeLeft.hours}
          </span>
          <span className="text-[9px] sm:text-[11px] font-sans font-bold tracking-[0.25em] text-[#8B4513]/70 uppercase mt-1">
            HOURS
          </span>
        </div>

        {/* Separator dot */}
        <span className="font-display text-3xl sm:text-5xl font-light text-[#C4515C]/40 -mt-4">
          :
        </span>

        {/* Minutes */}
        <div className="flex flex-col items-center min-w-[50px] sm:min-w-[70px]">
          <span className="font-display text-4xl sm:text-6xl font-black text-[#C4515C] tracking-tight drop-shadow-sm">
            {timeLeft.minutes}
          </span>
          <span className="text-[9px] sm:text-[11px] font-sans font-bold tracking-[0.25em] text-[#8B4513]/70 uppercase mt-1">
            MINUTES
          </span>
        </div>

        {/* Separator dot */}
        <span className="font-display text-3xl sm:text-5xl font-light text-[#C4515C]/40 -mt-4">
          :
        </span>

        {/* Seconds */}
        <div className="flex flex-col items-center min-w-[50px] sm:min-w-[70px]">
          <span className="font-display text-4xl sm:text-6xl font-black text-[#C4515C] tracking-tight drop-shadow-sm tabular-nums">
            {timeLeft.seconds}
          </span>
          <span className="text-[9px] sm:text-[11px] font-sans font-bold tracking-[0.25em] text-[#8B4513]/70 uppercase mt-1">
            SECONDS
          </span>
        </div>
      </div>

      {/* Quote matching reference: Time holds its breath until the calendar turns to you. */}
      <div className="mt-3 text-center">
        <p className="font-display italic text-sm sm:text-base text-[#8B4513]/90 tracking-wide drop-shadow-sm">
          Time holds its breath until the calendar turns to you.
        </p>
      </div>
    </div>
  );
}
