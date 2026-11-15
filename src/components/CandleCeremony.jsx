import React, { useState, useRef, useEffect } from 'react';

export default function CandleCeremony() {
  const [isExtinguished, setIsExtinguished] = useState(false);
  const [wishMade, setWishMade] = useState(false);
  const canvasRef = useRef(null);
  const smokeParticlesRef = useRef([]);

  // Organic Canvas Smoke & Ember physics when extinguished
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    let width = (canvas.width = 300);
    let height = (canvas.height = 360);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (isExtinguished) {
        // Spawn gentle wispy smoke particles
        if (smokeParticlesRef.current.length < 50 && Math.random() < 0.35) {
          smokeParticlesRef.current.push({
            x: width / 2 + (Math.random() - 0.5) * 6,
            y: height / 2 - 25,
            radius: Math.random() * 3 + 2,
            speedY: -Math.random() * 0.9 - 0.4,
            speedX: (Math.random() - 0.5) * 0.6,
            opacity: 0.5,
            grow: Math.random() * 0.12 + 0.05,
          });
        }

        // Render & update smoke
        smokeParticlesRef.current.forEach((p, index) => {
          p.y += p.speedY;
          p.x += p.speedX;
          p.radius += p.grow;
          p.opacity -= 0.006;

          if (p.opacity <= 0) {
            smokeParticlesRef.current.splice(index, 1);
          } else {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(180, 170, 155, ${p.opacity * 0.5})`;
            ctx.fill();
          }
        });
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [isExtinguished]);

  const handleExtinguish = () => {
    if (!isExtinguished) {
      setIsExtinguished(true);
      setTimeout(() => setWishMade(true), 600);
    }
  };

  const handleRelight = () => {
    setIsExtinguished(false);
    setWishMade(false);
    smokeParticlesRef.current = [];
  };

  return (
    <section id="ceremony" className="py-24 px-6 sm:px-12 lg:px-20 border-b border-ink-border bg-ink relative">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Folio Tag */}
        <div className="flex items-center space-x-3 text-gold text-xs tracking-widest-plus uppercase mb-4">
          <span className="h-px w-8 bg-gold/40 inline-block" />
          <span>Folio No. 02 — The Ceremony</span>
          <span className="h-px w-8 bg-gold/40 inline-block" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-title tracking-wide text-bone-pure mb-3">
          The Sculpted Flame
        </h2>
        <p className="font-editorial italic text-xl sm:text-2xl text-bone-muted max-w-lg mb-12">
          "A quiet tradition. Make a wish, Rabbit, and release it into the year ahead."
        </p>

        {/* Candle Visual Stage */}
        <div className="relative w-72 h-80 flex flex-col items-center justify-end pb-6 my-2">
          {/* Canvas for Smoke Simulation */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
          />

          {/* Flame (Organically flickers when lit) */}
          {!isExtinguished ? (
            <div className="relative z-10 flex flex-col items-center cursor-pointer group" onClick={handleExtinguish}>
              {/* Outer Glow Halo */}
              <div className="absolute -top-12 w-24 h-24 rounded-full bg-amber-400/10 blur-xl pointer-events-none" />

              {/* Flame Body */}
              <div className="w-4 h-9 rounded-full bg-gradient-to-t from-amber-600 via-amber-300 to-yellow-100 animate-flame shadow-[0_0_20px_rgba(235,160,50,0.6)] relative">
                {/* Blue Flame Core */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2.5 bg-blue-400/80 rounded-full blur-[0.5px]" />
              </div>

              {/* Wick */}
              <div className="w-0.5 h-3 bg-neutral-900 mx-auto" />
            </div>
          ) : (
            <div className="relative z-10 flex flex-col items-center">
              {/* Burnt Wick */}
              <div className="w-0.5 h-3 bg-neutral-800 mx-auto rounded-t relative">
                {/* Faint Red Ember dot right after blow */}
                <div className="w-1 h-1 bg-amber-600/70 rounded-full -top-0.5 -left-[1px] absolute animate-ping" />
              </div>
            </div>
          )}

          {/* Candle Stem (Minimalist Beeswax Taper) */}
          <div className="w-7 h-36 bg-gradient-to-r from-[#DFD6C6] via-[#F2EDE2] to-[#D5C9B3] rounded-t-sm shadow-md border-t border-white/40 relative">
            {/* Subtle Wax Drip Line */}
            <div className="absolute top-2 left-1.5 w-1 h-8 rounded-full bg-white/40" />
            <div className="absolute top-6 right-2 w-0.5 h-12 rounded-full bg-black/5" />
          </div>

          {/* Antique Brass Dish / Candlestick Base */}
          <div className="w-32 h-3.5 bg-gradient-to-r from-gold-dark via-gold to-gold-dark rounded-full shadow-lg border-t border-gold-light/40 relative">
            <div className="w-24 h-1.5 bg-ink/30 mx-auto rounded-full mt-0.5" />
          </div>
          {/* Base Plate Footing */}
          <div className="w-44 h-1 bg-gold-dark/60 rounded-full shadow-sm mt-0.5" />
        </div>

        {/* Interaction Controls & Wish Outcome */}
        <div className="mt-8">
          {!isExtinguished ? (
            <button
              onClick={handleExtinguish}
              className="px-8 py-3.5 bg-gold text-ink font-semibold text-xs tracking-super-wide uppercase hover:bg-gold-light active:scale-95 transition-all duration-300 shadow-gold-subtle"
            >
              Blow The Candle & Make A Wish
            </button>
          ) : (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-6 border border-gold/30 bg-ink-light/80 max-w-lg mx-auto gold-border-glow">
                <span className="text-[10px] tracking-super-wide text-gold uppercase block mb-2 font-mono">
                  ✦ THE WISH HAS BEEN RECORDED ✦
                </span>
                <p className="font-editorial italic text-xl text-bone-pure leading-relaxed">
                  "For Rabbit: May whatever you wished for in this quiet second find its way to you in ways that leave you breathless and smiling."
                </p>
                <div className="mt-4 pt-3 border-t border-ink-border text-[11px] text-bone-muted tracking-widest uppercase">
                  15 November · Sealed in Starlight
                </div>
              </div>

              <div>
                <button
                  onClick={handleRelight}
                  className="text-xs tracking-super-wide text-bone-muted hover:text-gold uppercase underline decoration-gold/40 underline-offset-4 transition-colors"
                >
                  Relight The Candle
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
