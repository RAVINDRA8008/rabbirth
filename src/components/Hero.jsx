import React, { useEffect, useRef } from 'react';

export default function Hero({ onExplore }) {
  const canvasRef = useRef(null);

  // Subtle floating stardust particle canvas (pure ambient gold motes)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.6 + 0.4,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: -Math.random() * 0.35 - 0.1,
      alpha: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * 0.02 + 0.005,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha += Math.sin(Date.now() * p.pulse) * 0.008;

        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(197, 168, 128, ${Math.max(0.1, Math.min(0.85, p.alpha))})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center px-6 sm:px-12 lg:px-20 border-b border-ink-border overflow-hidden bg-grain">
      {/* Background Stardust Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-0"
      />

      {/* Decorative Architectural Corner Coordinates */}
      <div className="absolute top-10 left-10 hidden lg:block text-[10px] tracking-super-wide text-bone-dark font-mono uppercase">
        REF: ARCHIVE-2026-1511<br />
        LAT: 28°36'N · LONG: 77°12'E
      </div>
      <div className="absolute top-10 right-10 hidden lg:block text-[10px] tracking-super-wide text-bone-dark font-mono text-right uppercase">
        SUBJECT: RABBIT<br />
        OCCASION: NATAL COMMEMORATION
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Monumental Typography */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6">
          <div className="flex items-center space-x-3 text-gold text-xs tracking-widest-plus uppercase">
            <span className="h-px w-8 bg-gold/50 inline-block" />
            <span>Folio No. 01 — November 15</span>
          </div>

          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-title font-medium tracking-tight text-bone-pure leading-none">
            RABBIT<span className="text-gold">.</span>
          </h1>

          <p className="font-editorial text-2xl sm:text-3xl text-bone-muted italic max-w-xl leading-relaxed">
            "Some presences do not demand attention; they simply hold the entire room in quiet, luminous grace."
          </p>

          <p className="text-sm tracking-wide text-bone-dark max-w-lg leading-relaxed pt-2">
            Today marks the fifteenth of November. An unrepeatable day dedicated entirely to you — your laughter, your quiet brilliance, and the effortless magic you bring to the universe.
          </p>

          {/* Direct Action Anchors */}
          <div className="pt-6 flex flex-wrap gap-4 items-center">
            <a
              href="#ceremony"
              className="px-8 py-3.5 bg-gold text-ink font-semibold text-xs tracking-super-wide uppercase transition-all duration-300 hover:bg-gold-light hover:shadow-gold-subtle active:scale-95"
            >
              The Candle Ceremony
            </a>
            <a
              href="#vault"
              className="px-8 py-3.5 border border-ink-border text-bone hover:border-gold/60 hover:text-gold text-xs tracking-super-wide uppercase transition-all duration-300"
            >
              Open The Vault
            </a>
          </div>
        </div>

        {/* Right Column: Architectural Medallion & Date Seal */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-72 sm:w-80 h-96 p-8 border border-ink-border bg-ink-light/50 backdrop-blur-sm gold-border-glow flex flex-col justify-between group transition-all duration-500 hover:border-gold/40">
            {/* Top Tag */}
            <div className="flex justify-between items-center text-[10px] tracking-super-wide text-bone-muted uppercase font-mono">
              <span>SOLAR RETURN</span>
              <span className="text-gold">XV · XI</span>
            </div>

            {/* Center Monogram Insignia */}
            <div className="flex flex-col items-center justify-center my-auto text-center space-y-4">
              <div className="w-24 h-24 rounded-full border border-gold/30 flex items-center justify-center relative transition-transform duration-700 group-hover:scale-105">
                <div className="absolute inset-1.5 rounded-full border border-dashed border-gold/20 animate-spin" style={{ animationDuration: '40s' }} />
                <span className="font-title text-4xl text-gold">R</span>
              </div>
              <div className="space-y-1">
                <div className="font-title text-xs tracking-widest text-bone uppercase">Dedicated to Rabbit</div>
                <div className="font-editorial italic text-bone-muted text-sm">Fifteenth of November</div>
              </div>
            </div>

            {/* Bottom Coordinates */}
            <div className="border-t border-ink-border/80 pt-4 text-center">
              <span className="text-[10px] tracking-super-wide text-gold/80 uppercase">
                ✦ No images needed when the soul is rare ✦
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Downward Scroll Indicator */}
      <div className="w-full pb-8 flex flex-col items-center justify-center text-center space-y-2 text-bone-dark">
        <span className="text-[10px] tracking-super-wide uppercase">Explore Folios</span>
        <div className="w-px h-8 bg-gradient-to-b from-gold/40 to-transparent" />
      </div>
    </section>
  );
}
