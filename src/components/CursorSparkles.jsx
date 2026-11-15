import React, { useEffect, useRef } from 'react';

export default function CursorSparkles() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = [
      '#FFD700', // 24K Gold
      '#F5D77F', // Champagne Gold
      '#FAD2E1', // Pastel Rose
      '#FF6B8B', // Vibrant Rose
      '#FFFFFF', // Starlight White
      '#FFBE0B', // Amber Spark
      '#FB5607', // Warm Ruby
    ];

    let lastX = 0;
    let lastY = 0;

    const spawnSparkle = (x, y, count = 3, forceSpread = 1) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 2 + 0.5) * forceSpread;
        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          size: Math.random() * 4 + 2,
          speedX: Math.cos(angle) * speed,
          speedY: Math.sin(angle) * speed - 0.4,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: Math.random() * 0.02 + 0.015,
          rotation: Math.random() * Math.PI,
          rotationSpeed: (Math.random() - 0.5) * 0.12,
          isDiamond: Math.random() > 0.4,
        });
      }
    };

    const handlePointerMove = (e) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      lastX = e.clientX;
      lastY = e.clientY;

      // Emit more sparkles if moving fast
      const count = Math.min(6, Math.max(2, Math.floor(dist / 12)));
      spawnSparkle(e.clientX, e.clientY, count, 1);
    };

    const handleClick = (e) => {
      // Magical burst of 20 sparkles on click
      spawnSparkle(e.clientX, e.clientY, 18, 3.2);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('click', handleClick);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += 0.03; // Soft gravity
        p.alpha -= p.decay;
        p.rotation += p.rotationSpeed;
        p.size *= 0.975;

        if (p.alpha <= 0 || p.size <= 0.4) {
          particlesRef.current.splice(i, 1);
        } else {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;

          const s = p.size;
          ctx.beginPath();
          if (p.isDiamond) {
            // 4-point faceted star
            ctx.moveTo(0, -s * 1.3);
            ctx.quadraticCurveTo(0, 0, s * 1.3, 0);
            ctx.quadraticCurveTo(0, 0, 0, s * 1.3);
            ctx.quadraticCurveTo(0, 0, -s * 1.3, 0);
            ctx.quadraticCurveTo(0, 0, 0, -s * 1.3);
          } else {
            // 8-point tiny sparkle
            ctx.arc(0, 0, s * 0.6, 0, Math.PI * 2);
          }
          ctx.fill();
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 w-full h-full"
    />
  );
}
