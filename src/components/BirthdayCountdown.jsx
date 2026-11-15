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
    <div className="relative flex flex-col items-center justify-center my-1 sm:my-2 select-none animate-fadeIn w-full max-w-md px-1 sm:px-2">
      {/* Frosted Glass Container Plate */}
      <div className="w-full bg-white/45 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-white/75 shadow-[0_8px_30px_rgba(180,80,60,0.07)] py-2 sm:py-3 px-3 sm:px-6 flex flex-col items-center">
        {/* Header Tag matching reference: AWAITING THE MOMENT */}
        <div className="text-[9px] sm:text-xs font-sans tracking-[0.25em] sm:tracking-[0.35em] uppercase text-[#7A3614] border-b border-pink-300/60 pb-0.5 mb-1.5 sm:mb-2.5 font-bold">
          AWAITING THE MOMENT
        </div>

        {/* Digits Display - Calibrated for 320px - 414px Mobile Viewports */}
        <div className="flex items-center justify-center gap-1.5 xs:gap-2.5 sm:gap-5 text-center max-w-full">
          {/* Days */}
          <div className="flex flex-col items-center min-w-[42px] xs:min-w-[50px] sm:min-w-[68px]">
            <span className="font-display text-2xl xs:text-3xl sm:text-5xl font-black text-[#C4515C] tracking-tight drop-shadow-sm tabular-nums">
              {timeLeft.days}
            </span>
            <span className="text-[7.5px] xs:text-[8.5px] sm:text-[10px] font-sans font-bold tracking-[0.14em] sm:tracking-[0.22em] text-[#7A3614] uppercase mt-0.5">
              DAYS
            </span>
          </div>

          {/* Separator dot */}
          <span className="font-display text-xl xs:text-2xl sm:text-4xl font-light text-[#C4515C]/50 -mt-2 sm:-mt-3 select-none animate-pulse">
            :
          </span>

          {/* Hours */}
          <div className="flex flex-col items-center min-w-[42px] xs:min-w-[50px] sm:min-w-[68px]">
            <span className="font-display text-2xl xs:text-3xl sm:text-5xl font-black text-[#C4515C] tracking-tight drop-shadow-sm tabular-nums">
              {timeLeft.hours}
            </span>
            <span className="text-[7.5px] xs:text-[8.5px] sm:text-[10px] font-sans font-bold tracking-[0.14em] sm:tracking-[0.22em] text-[#7A3614] uppercase mt-0.5">
              HOURS
            </span>
          </div>

          {/* Separator dot */}
          <span className="font-display text-xl xs:text-2xl sm:text-4xl font-light text-[#C4515C]/50 -mt-2 sm:-mt-3 select-none animate-pulse">
            :
          </span>

          {/* Minutes */}
          <div className="flex flex-col items-center min-w-[42px] xs:min-w-[50px] sm:min-w-[68px]">
            <span className="font-display text-2xl xs:text-3xl sm:text-5xl font-black text-[#C4515C] tracking-tight drop-shadow-sm tabular-nums">
              {timeLeft.minutes}
            </span>
            <span className="text-[7.5px] xs:text-[8.5px] sm:text-[10px] font-sans font-bold tracking-[0.14em] sm:tracking-[0.22em] text-[#7A3614] uppercase mt-0.5">
              MINUTES
            </span>
          </div>

          {/* Separator dot */}
          <span className="font-display text-xl xs:text-2xl sm:text-4xl font-light text-[#C4515C]/50 -mt-2 sm:-mt-3 select-none animate-pulse">
            :
          </span>

          {/* Seconds */}
          <div className="flex flex-col items-center min-w-[42px] xs:min-w-[50px] sm:min-w-[68px]">
            <span className="font-display text-2xl xs:text-3xl sm:text-5xl font-black text-[#C4515C] tracking-tight drop-shadow-sm tabular-nums">
              {timeLeft.seconds}
            </span>
            <span className="text-[7.5px] xs:text-[8.5px] sm:text-[10px] font-sans font-bold tracking-[0.14em] sm:tracking-[0.22em] text-[#7A3614] uppercase mt-0.5">
              SECONDS
            </span>
          </div>
        </div>

        {/* Quote matching reference: Time holds its breath until the calendar turns to you. */}
        <div className="mt-1.5 sm:mt-2 text-center px-2">
          <p className="font-display italic text-xs xs:text-sm sm:text-base text-[#5C2B10] tracking-wide drop-shadow-sm leading-snug sm:leading-relaxed font-medium">
            Time holds its breath until the calendar turns to you.
          </p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(BirthdayCountdown);
