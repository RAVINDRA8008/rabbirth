import React, { useEffect, useRef } from 'react';

export default function FestiveRibbonsCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId = null;
    // Cap devicePixelRatio to 2 to eliminate mobile 3x-4x GPU memory bloat and battery drain
    const retina = Math.min(window.devicePixelRatio || 1, 2);

    const PI = Math.PI;
    const sqrt = Math.sqrt;
    const round = Math.round;
    const random = Math.random;
    const cos = Math.cos;
    const sin = Math.sin;

    const speed = 50;
    const duration = 1.0 / speed;

    // Responsive element density: lighter on narrow mobile screens (360px-414px) for visual clarity & zero lag
    const isMobile = window.innerWidth < 640;
    const confettiRibbonCount = isMobile ? 7 : 12;
    const ribbonPaperCount = 16;
    const ribbonPaperDist = 8.0;
    const ribbonPaperThick = 8.5;
    const confettiPaperCount = isMobile ? 8 : 12;
    const DEG_TO_RAD = PI / 180;

    const colors = [
      ['#df0049', '#660671'], // crimson / purple
      ['#00e857', '#005291'], // bright festive green / blue
      ['#2bebbc', '#05798a'], // cyan / teal
      ['#ffd200', '#b06c00'], // gold / amber
      ['#ff4081', '#7c4dff'], // hot pink / deep violet
    ];

    function EulerMass(_x, _y, _mass, _drag) {
      this.position = { x: _x, y: _y };
      this.mass = _mass;
      this.drag = _drag;
      this.force = { x: 0, y: 0 };
      this.velocity = { x: 0, y: 0 };

      // Zero-allocation Euler integration with drag
      this.Integrate = function (_dt) {
        const spd = sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
        const dragFactor = this.drag * this.mass * spd;
        const totalForceX = this.force.x - this.velocity.x * dragFactor;
        const totalForceY = this.force.y - this.velocity.y * dragFactor;

        const accX = totalForceX / this.mass;
        const accY = totalForceY / this.mass;

        this.position.x += this.velocity.x * _dt;
        this.position.y += this.velocity.y * _dt;
        this.velocity.x += accX * _dt;
        this.velocity.y += accY * _dt;

        this.force.x = 0;
        this.force.y = 0;
      };
    }

    function ConfettiPaper(_x, _y, bounds) {
      this.pos = { x: _x, y: _y };
      this.rotationSpeed = random() * 600 + 800;
      this.angle = DEG_TO_RAD * random() * 360;
      this.rotation = DEG_TO_RAD * random() * 360;
      this.cosA = 1.0;
      this.size = 5.0;
      this.oscillationSpeed = random() * 1.5 + 0.5;
      this.xSpeed = 40.0;
      this.ySpeed = random() * 60 + 50.0;
      this.corners = [];
      this.time = random();
      const ci = round(random() * (colors.length - 1));
      this.frontColor = colors[ci][0];
      this.backColor = colors[ci][1];

      for (let i = 0; i < 4; i++) {
        const dx = cos(this.angle + DEG_TO_RAD * (i * 90 + 45));
        const dy = sin(this.angle + DEG_TO_RAD * (i * 90 + 45));
        this.corners[i] = { x: dx, y: dy };
      }

      this.Update = function (_dt) {
        this.time += _dt;
        this.rotation += this.rotationSpeed * _dt;
        this.cosA = cos(DEG_TO_RAD * this.rotation);
        this.pos.x += cos(this.time * this.oscillationSpeed) * this.xSpeed * _dt;
        this.pos.y += this.ySpeed * _dt;
        if (this.pos.y > bounds.y + 20) {
          this.pos.x = random() * bounds.x;
          this.pos.y = -20;
        }
      };

      this.Draw = function (_g) {
        _g.fillStyle = this.cosA > 0 ? this.frontColor : this.backColor;
        _g.beginPath();
        _g.moveTo(
          this.pos.x + this.corners[0].x * this.size,
          this.pos.y + this.corners[0].y * this.size * this.cosA
        );
        for (let i = 1; i < 4; i++) {
          _g.lineTo(
            this.pos.x + this.corners[i].x * this.size,
            this.pos.y + this.corners[i].y * this.size * this.cosA
          );
        }
        _g.closePath();
        _g.fill();
      };
    }

    function ConfettiRibbon(_x, _y, _count, _dist, _thickness, _angle, _mass, _drag, bounds) {
      this.particleDist = _dist;
      this.particleCount = _count;
      this.particleMass = _mass;
      this.particleDrag = _drag;
      this.bounds = bounds;
      this.particles = [];
      const ci = round(random() * (colors.length - 1));
      this.frontColor = colors[ci][0];
      this.backColor = colors[ci][1];
      this.xOff = cos(DEG_TO_RAD * _angle) * _thickness;
      this.yOff = sin(DEG_TO_RAD * _angle) * _thickness;
      this.position = { x: _x, y: _y };
      this.prevPosition = { x: _x, y: _y };
      this.velocityInherit = random() * 2 + 4;
      this.time = random() * 100;
      this.oscillationSpeed = random() * 2 + 2;
      this.oscillationDistance = random() * 40 + 40;
      this.ySpeed = random() * 40 + 80;

      for (let i = 0; i < this.particleCount; i++) {
        this.particles[i] = new EulerMass(_x, _y - i * this.particleDist, this.particleMass, this.particleDrag);
      }

      // 100% Zero-Allocation Physics Loop: avoids 1,300+ Vector2 creations per frame
      this.Update = function (_dt) {
        this.time += _dt * this.oscillationSpeed;
        this.position.y += this.ySpeed * _dt;
        this.position.x += cos(this.time) * this.oscillationDistance * _dt;

        this.particles[0].position.x = this.position.x;
        this.particles[0].position.y = this.position.y;

        const dX = this.prevPosition.x - this.position.x;
        const dY = this.prevPosition.y - this.position.y;
        const delta = sqrt(dX * dX + dY * dY);

        this.prevPosition.x = this.position.x;
        this.prevPosition.y = this.position.y;

        // Force propagation along ribbon backbone
        for (let i = 1; i < this.particleCount; i++) {
          let pX = this.particles[i - 1].position.x - this.particles[i].position.x;
          let pY = this.particles[i - 1].position.y - this.particles[i].position.y;
          const sqr = pX * pX + pY * pY;
          if (sqr > 0) {
            const factor = 1.0 / sqrt(sqr);
            pX *= factor;
            pY *= factor;
            const forceMag = (delta / _dt) * this.velocityInherit;
            this.particles[i].force.x += pX * forceMag;
            this.particles[i].force.y += pY * forceMag;
          }
        }

        // Euler integrate each segment
        for (let i = 1; i < this.particleCount; i++) {
          this.particles[i].Integrate(_dt);
        }

        // Distance constraint solve
        for (let i = 1; i < this.particleCount; i++) {
          let rX = this.particles[i].position.x - this.particles[i - 1].position.x;
          let rY = this.particles[i].position.y - this.particles[i - 1].position.y;
          const sqr = rX * rX + rY * rY;
          if (sqr > 0) {
            const factor = 1.0 / sqrt(sqr);
            rX *= factor * this.particleDist;
            rY *= factor * this.particleDist;
            this.particles[i].position.x = this.particles[i - 1].position.x + rX;
            this.particles[i].position.y = this.particles[i - 1].position.y + rY;
          }
        }

        if (this.position.y > this.bounds.y + this.particleDist * this.particleCount + 30) {
          this.Reset();
        }
      };

      this.Reset = function () {
        this.position.y = -random() * (this.bounds.y * 0.5) - 50;
        this.position.x = random() * this.bounds.x;
        this.prevPosition.x = this.position.x;
        this.prevPosition.y = this.position.y;
        this.velocityInherit = random() * 2 + 4;
        this.time = random() * 100;
        this.oscillationSpeed = random() * 2.0 + 1.5;
        this.oscillationDistance = random() * 40 + 40;
        this.ySpeed = random() * 40 + 80;
        const cIdx = round(random() * (colors.length - 1));
        this.frontColor = colors[cIdx][0];
        this.backColor = colors[cIdx][1];
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
          this.particles[i] = new EulerMass(
            this.position.x,
            this.position.y - i * this.particleDist,
            this.particleMass,
            this.particleDrag
          );
        }
      };

      this.Side = function (x1, y1, x2, y2, x3, y3) {
        return (x1 - x2) * (y3 - y2) - (y1 - y2) * (x3 - x2);
      };

      this.Draw = function (_g) {
        for (let i = 0; i < this.particleCount - 1; i++) {
          const pt0 = this.particles[i].position;
          const pt1 = this.particles[i + 1].position;
          const p0x = pt0.x + this.xOff;
          const p0y = pt0.y + this.yOff;
          const p1x = pt1.x + this.xOff;
          const p1y = pt1.y + this.yOff;

          const isFront = this.Side(pt0.x, pt0.y, pt1.x, pt1.y, p1x, p1y) < 0;
          const fillColor = isFront ? this.frontColor : this.backColor;
          _g.fillStyle = fillColor;
          _g.strokeStyle = fillColor;

          if (i === 0) {
            // First segment: Notch cut at top
            const midX = (pt1.x + p1x) * 0.5;
            const midY = (pt1.y + p1y) * 0.5;

            _g.beginPath();
            _g.moveTo(pt0.x, pt0.y);
            _g.lineTo(pt1.x, pt1.y);
            _g.lineTo(midX, midY);
            _g.closePath();
            _g.stroke();
            _g.fill();

            _g.beginPath();
            _g.moveTo(p1x, p1y);
            _g.lineTo(p0x, p0y);
            _g.lineTo(midX, midY);
            _g.closePath();
            _g.stroke();
            _g.fill();
          } else if (i === this.particleCount - 2) {
            // Last segment: Forked tail cut at bottom
            const midX = (pt0.x + p0x) * 0.5;
            const midY = (pt0.y + p0y) * 0.5;

            _g.beginPath();
            _g.moveTo(pt0.x, pt0.y);
            _g.lineTo(pt1.x, pt1.y);
            _g.lineTo(midX, midY);
            _g.closePath();
            _g.stroke();
            _g.fill();

            _g.beginPath();
            _g.moveTo(p1x, p1y);
            _g.lineTo(p0x, p0y);
            _g.lineTo(midX, midY);
            _g.closePath();
            _g.stroke();
            _g.fill();
          } else {
            // Mid segments: Smooth ribbon strip
            _g.beginPath();
            _g.moveTo(pt0.x, pt0.y);
            _g.lineTo(pt1.x, pt1.y);
            _g.lineTo(p1x, p1y);
            _g.lineTo(p0x, p0y);
            _g.closePath();
            _g.stroke();
            _g.fill();
          }
        }
      };
    }

    const bounds = { x: window.innerWidth, y: window.innerHeight };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      bounds.x = width;
      bounds.y = height;
      canvas.width = Math.floor(width * retina);
      canvas.height = Math.floor(height * retina);
      // High-DPI crisp coordinate transformation in hardware
      ctx.setTransform(retina, 0, 0, retina, 0, 0);
    };

    handleResize();

    const confettiRibbons = [];
    for (let i = 0; i < confettiRibbonCount; i++) {
      confettiRibbons.push(
        new ConfettiRibbon(
          random() * bounds.x,
          -random() * (bounds.y * 1.5),
          ribbonPaperCount,
          ribbonPaperDist,
          ribbonPaperThick,
          45,
          1,
          0.05,
          bounds
        )
      );
    }

    const confettiPapers = [];
    for (let i = 0; i < confettiPaperCount; i++) {
      confettiPapers.push(new ConfettiPaper(random() * bounds.x, random() * bounds.y, bounds));
    }

    const render = () => {
      ctx.clearRect(0, 0, bounds.x, bounds.y);

      for (let i = 0; i < confettiPapers.length; i++) {
        confettiPapers[i].Update(duration);
        confettiPapers[i].Draw(ctx);
      }

      for (let i = 0; i < confettiRibbons.length; i++) {
        confettiRibbons[i].Update(duration);
        confettiRibbons[i].Draw(ctx);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    window.addEventListener('resize', handleResize);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-10"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
