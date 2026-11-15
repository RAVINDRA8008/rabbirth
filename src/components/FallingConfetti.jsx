import React, { useEffect, useRef } from 'react';

export default function FallingConfetti({ active = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
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
      ['#df0049', '#660671'],
      ['#00e857', '#005291'],
      ['#2bebbc', '#05798a'],
      ['#ffd200', '#b06c00'],
      ['#ff6b6b', '#f06595'],
      ['#cc5de8', '#845ef7']
    ];

    // Create 60 lightweight confetti pieces
    const confettiCount = 55;
    const pieces = Array.from({ length: confettiCount }, () => {
      const colorPair = colors[Math.floor(Math.random() * colors.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * -height,
        size: Math.random() * 8 + 6,
        color1: colorPair[0],
        color2: colorPair[1],
        speedY: Math.random() * 2.5 + 1.8,
        speedX: Math.random() * 1.5 - 0.75,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
        isRibbon: Math.random() > 0.6,
        ribbonLength: Math.random() * 18 + 12,
        oscillationSpeed: Math.random() * 0.05 + 0.02,
        oscillationDistance: Math.random() * 2.0 + 1.0,
        time: Math.random() * 100,
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      pieces.forEach((p) => {
        p.time += p.oscillationSpeed;
        p.y += p.speedY;
        p.x += Math.sin(p.time) * p.oscillationDistance + p.speedX;
        p.rotation += p.rotationSpeed;

        // Reset to top when off screen
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        if (p.isRibbon) {
          // Draw curled ribbon
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.quadraticCurveTo(p.size, p.ribbonLength / 2, 0, p.ribbonLength);
          ctx.strokeStyle = p.color1;
          ctx.lineWidth = 3.5;
          ctx.stroke();
        } else {
          // Draw paper confetti rectangle
          ctx.fillStyle = p.rotation % 360 > 180 ? p.color1 : p.color2;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        }

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 w-full h-full"
    />
  );
}
