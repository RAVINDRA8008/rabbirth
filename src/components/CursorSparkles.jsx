import React, { useEffect, useRef } from 'react';

function CursorSparkles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const colors = [
      '#FFD700', // 24K Gold
      '#F5D77F', // Champagne Gold
      '#FAD2E1', // Pastel Rose
      '#FF6B8B', // Vibrant Rose
      '#FFFFFF', // Starlight White
      '#FFBE0B', // Amber Spark
    ];

    // ==============================================================
    // 1. OBJECT POOLING: Pre-allocated particles (Zero-Allocation Loop)
    // ==============================================================
    const POOL_SIZE = 80;
    const pool = new Array(POOL_SIZE);
    for (let i = 0; i < POOL_SIZE; i++) {
      pool[i] = {
        active: false,
        x: 0,
        y: 0,
        size: 0,
        speedX: 0,
        speedY: 0,
        color: colors[0],
        alpha: 0,
        decay: 0,
        rotation: 0,
        rotationSpeed: 0,
        isDiamond: true,
      };
    }

    let poolIndex = 0;

    const spawnSparkle = (x, y, count = 2, forceSpread = 1) => {
      for (let k = 0; k < count; k++) {
        const p = pool[poolIndex];
        poolIndex = (poolIndex + 1) % POOL_SIZE;

        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 2 + 0.5) * forceSpread;

        p.active = true;
        p.x = x + (Math.random() - 0.5) * 10;
        p.y = y + (Math.random() - 0.5) * 10;
        p.size = Math.random() * 3.5 + 2;
        p.speedX = Math.cos(angle) * speed;
        p.speedY = Math.sin(angle) * speed - 0.3;
        p.color = colors[Math.floor(Math.random() * colors.length)];
        p.alpha = 1.0;
        p.decay = Math.random() * 0.025 + 0.018;
        p.rotation = Math.random() * Math.PI;
        p.rotationSpeed = (Math.random() - 0.5) * 0.15;
        p.isDiamond = Math.random() > 0.35;
      }
    };

    // ==============================================================
    // 2. AMBIENT STARLIGHT MOTES: Subtle drifting gold stardust
    // ==============================================================
    const MOTE_COUNT = 24;
    const motes = new Array(MOTE_COUNT);
    for (let i = 0; i < MOTE_COUNT; i++) {
      motes[i] = {
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        speedY: -(Math.random() * 0.35 + 0.15),
        speedX: (Math.random() - 0.5) * 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.015,
        twinklePhase: Math.random() * Math.PI * 2,
        baseAlpha: Math.random() * 0.4 + 0.25,
        color: Math.random() > 0.4 ? '#FFD700' : '#FFFFFF',
      };
    }

    // ==============================================================
    // 3. PASSIVE TOUCH & POINTER LISTENERS (Mobile Native Scroll Safe)
    // ==============================================================
    let lastX = 0;
    let lastY = 0;

    const handlePointerMove = (e) => {
      if (e.pointerType === 'touch') return; // Handled smoothly by touch events
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      lastX = e.clientX;
      lastY = e.clientY;

      const count = Math.min(4, Math.max(1, Math.floor(dist / 14)));
      spawnSparkle(e.clientX, e.clientY, count, 0.9);
    };

    const handleTouch = (e) => {
      if (!e.touches || e.touches.length === 0) return;
      const t = e.touches[0];
      spawnSparkle(t.clientX, t.clientY, 2, 1.1);
    };

    const handleClick = (e) => {
      spawnSparkle(e.clientX, e.clientY, 12, 2.5);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchstart', handleTouch, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });

    // ==============================================================
    // 4. RENDER LOOP (100% Zero-Allocation & GPU Efficient)
    // ==============================================================
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Ambient Starlight Motes
      for (let i = 0; i < MOTE_COUNT; i++) {
        const m = motes[i];
        m.y += m.speedY;
        m.x += m.speedX;
        m.twinklePhase += m.twinkleSpeed;

        if (m.y < -10) {
          m.y = height + 10;
          m.x = Math.random() * width;
        }
        if (m.x < -10) m.x = width + 10;
        if (m.x > width + 10) m.x = -10;

        const currentAlpha = m.baseAlpha * (0.6 + 0.4 * Math.sin(m.twinklePhase));
        ctx.globalAlpha = Math.max(0, Math.min(1, currentAlpha));
        ctx.fillStyle = m.color;

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render Active Cursor & Touch Sparkles
      for (let i = 0; i < POOL_SIZE; i++) {
        const p = pool[i];
        if (!p.active) continue;

        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += 0.035; // Gentle gravity
        p.alpha -= p.decay;
        p.rotation += p.rotationSpeed;
        p.size *= 0.975;

        if (p.alpha <= 0 || p.size <= 0.4) {
          p.active = false;
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        const s = p.size;
        ctx.beginPath();
        if (p.isDiamond) {
          // 4-point faceted sparkle star (Fast geometry, zero shadowBlur cost)
          ctx.moveTo(0, -s * 1.3);
          ctx.quadraticCurveTo(0, 0, s * 1.3, 0);
          ctx.quadraticCurveTo(0, 0, 0, s * 1.3);
          ctx.quadraticCurveTo(0, 0, -s * 1.3, 0);
          ctx.quadraticCurveTo(0, 0, 0, -s * 1.3);
        } else {
          // Tiny round starlight glint
          ctx.arc(0, 0, s * 0.65, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.restore();
      }

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30 w-full h-full"
      style={{ width: '100%', height: '100%' }}
    />
  );
}

export default React.memo(CursorSparkles);
