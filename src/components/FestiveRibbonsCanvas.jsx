import React, { useEffect, useRef } from 'react';

export default function FestiveRibbonsCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = null;
    const retina = window.devicePixelRatio || 1;

    const PI = Math.PI;
    const sqrt = Math.sqrt;
    const round = Math.round;
    const random = Math.random;
    const cos = Math.cos;
    const sin = Math.sin;

    const speed = 50;
    const duration = 1.0 / speed;
    const confettiRibbonCount = 12;
    const ribbonPaperCount = 16;
    const ribbonPaperDist = 8.0;
    const ribbonPaperThick = 8.5;
    const confettiPaperCount = 12;
    const DEG_TO_RAD = PI / 180;

    const colors = [
      ['#df0049', '#660671'], // crimson / purple
      ['#00e857', '#005291'], // bright festive green / blue
      ['#2bebbc', '#05798a'], // cyan / teal
      ['#ffd200', '#b06c00'], // gold / amber
      ['#ff4081', '#7c4dff'], // hot pink / deep violet
    ];

    function Vector2(_x, _y) {
      this.x = _x;
      this.y = _y;
      this.Length = function () {
        return sqrt(this.SqrLength());
      };
      this.SqrLength = function () {
        return this.x * this.x + this.y * this.y;
      };
      this.Add = function (_vec) {
        this.x += _vec.x;
        this.y += _vec.y;
      };
      this.Sub = function (_vec) {
        this.x -= _vec.x;
        this.y -= _vec.y;
      };
      this.Div = function (_f) {
        this.x /= _f;
        this.y /= _f;
      };
      this.Mul = function (_f) {
        this.x *= _f;
        this.y *= _f;
      };
      this.Normalize = function () {
        const sqrLen = this.SqrLength();
        if (sqrLen !== 0) {
          const factor = 1.0 / sqrt(sqrLen);
          this.x *= factor;
          this.y *= factor;
        }
      };
      this.Normalized = function () {
        const sqrLen = this.SqrLength();
        if (sqrLen !== 0) {
          const factor = 1.0 / sqrt(sqrLen);
          return new Vector2(this.x * factor, this.y * factor);
        }
        return new Vector2(0, 0);
      };
    }

    Vector2.Sub = function (_vec0, _vec1) {
      return new Vector2(_vec0.x - _vec1.x, _vec0.y - _vec1.y);
    };

    function EulerMass(_x, _y, _mass, _drag) {
      this.position = new Vector2(_x, _y);
      this.mass = _mass;
      this.drag = _drag;
      this.force = new Vector2(0, 0);
      this.velocity = new Vector2(0, 0);

      this.AddForce = function (_f) {
        this.force.Add(_f);
      };

      this.Integrate = function (_dt) {
        const acc = this.CurrentForce();
        acc.Div(this.mass);
        const posDelta = new Vector2(this.velocity.x, this.velocity.y);
        posDelta.Mul(_dt);
        this.position.Add(posDelta);
        acc.Mul(_dt);
        this.velocity.Add(acc);
        this.force = new Vector2(0, 0);
      };

      this.CurrentForce = function () {
        const totalForce = new Vector2(this.force.x, this.force.y);
        const spd = this.velocity.Length();
        const dragVel = new Vector2(this.velocity.x, this.velocity.y);
        dragVel.Mul(this.drag * this.mass * spd);
        totalForce.Sub(dragVel);
        return totalForce;
      };
    }

    function ConfettiPaper(_x, _y, bounds) {
      this.pos = new Vector2(_x, _y);
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
        this.corners[i] = new Vector2(dx, dy);
      }

      this.Update = function (_dt) {
        this.time += _dt;
        this.rotation += this.rotationSpeed * _dt;
        this.cosA = cos(DEG_TO_RAD * this.rotation);
        this.pos.x += cos(this.time * this.oscillationSpeed) * this.xSpeed * _dt;
        this.pos.y += this.ySpeed * _dt;
        if (this.pos.y > bounds.y) {
          this.pos.x = random() * bounds.x;
          this.pos.y = -20;
        }
      };

      this.Draw = function (_g) {
        _g.fillStyle = this.cosA > 0 ? this.frontColor : this.backColor;
        _g.beginPath();
        _g.moveTo(
          (this.pos.x + this.corners[0].x * this.size) * retina,
          (this.pos.y + this.corners[0].y * this.size * this.cosA) * retina
        );
        for (let i = 1; i < 4; i++) {
          _g.lineTo(
            (this.pos.x + this.corners[i].x * this.size) * retina,
            (this.pos.y + this.corners[i].y * this.size * this.cosA) * retina
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
      this.position = new Vector2(_x, _y);
      this.prevPosition = new Vector2(_x, _y);
      this.velocityInherit = random() * 2 + 4;
      this.time = random() * 100;
      this.oscillationSpeed = random() * 2 + 2;
      this.oscillationDistance = random() * 40 + 40;
      this.ySpeed = random() * 40 + 80;

      for (let i = 0; i < this.particleCount; i++) {
        this.particles[i] = new EulerMass(_x, _y - i * this.particleDist, this.particleMass, this.particleDrag);
      }

      this.Update = function (_dt) {
        this.time += _dt * this.oscillationSpeed;
        this.position.y += this.ySpeed * _dt;
        this.position.x += cos(this.time) * this.oscillationDistance * _dt;
        this.particles[0].position = this.position;

        const dX = this.prevPosition.x - this.position.x;
        const dY = this.prevPosition.y - this.position.y;
        const delta = sqrt(dX * dX + dY * dY);
        this.prevPosition = new Vector2(this.position.x, this.position.y);

        for (let i = 1; i < this.particleCount; i++) {
          const dirP = Vector2.Sub(this.particles[i - 1].position, this.particles[i].position);
          dirP.Normalize();
          dirP.Mul((delta / _dt) * this.velocityInherit);
          this.particles[i].AddForce(dirP);
        }

        for (let i = 1; i < this.particleCount; i++) {
          this.particles[i].Integrate(_dt);
        }

        for (let i = 1; i < this.particleCount; i++) {
          const rp2 = new Vector2(this.particles[i].position.x, this.particles[i].position.y);
          rp2.Sub(this.particles[i - 1].position);
          rp2.Normalize();
          rp2.Mul(this.particleDist);
          rp2.Add(this.particles[i - 1].position);
          this.particles[i].position = rp2;
        }

        if (this.position.y > this.bounds.y + this.particleDist * this.particleCount) {
          this.Reset();
        }
      };

      this.Reset = function () {
        this.position.y = -random() * (this.bounds.y * 0.5) - 50;
        this.position.x = random() * this.bounds.x;
        this.prevPosition = new Vector2(this.position.x, this.position.y);
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
          const p0 = new Vector2(this.particles[i].position.x + this.xOff, this.particles[i].position.y + this.yOff);
          const p1 = new Vector2(this.particles[i + 1].position.x + this.xOff, this.particles[i + 1].position.y + this.yOff);

          if (
            this.Side(
              this.particles[i].position.x,
              this.particles[i].position.y,
              this.particles[i + 1].position.x,
              this.particles[i + 1].position.y,
              p1.x,
              p1.y
            ) < 0
          ) {
            _g.fillStyle = this.frontColor;
            _g.strokeStyle = this.frontColor;
          } else {
            _g.fillStyle = this.backColor;
            _g.strokeStyle = this.backColor;
          }

          if (i === 0) {
            // First segment: Notch cut at top
            _g.beginPath();
            _g.moveTo(this.particles[i].position.x * retina, this.particles[i].position.y * retina);
            _g.lineTo(this.particles[i + 1].position.x * retina, this.particles[i + 1].position.y * retina);
            _g.lineTo(
              ((this.particles[i + 1].position.x + p1.x) * 0.5) * retina,
              ((this.particles[i + 1].position.y + p1.y) * 0.5) * retina
            );
            _g.closePath();
            _g.stroke();
            _g.fill();

            _g.beginPath();
            _g.moveTo(p1.x * retina, p1.y * retina);
            _g.lineTo(p0.x * retina, p0.y * retina);
            _g.lineTo(
              ((this.particles[i + 1].position.x + p1.x) * 0.5) * retina,
              ((this.particles[i + 1].position.y + p1.y) * 0.5) * retina
            );
            _g.closePath();
            _g.stroke();
            _g.fill();
          } else if (i === this.particleCount - 2) {
            // Last segment: Forked tail cut at bottom
            _g.beginPath();
            _g.moveTo(this.particles[i].position.x * retina, this.particles[i].position.y * retina);
            _g.lineTo(this.particles[i + 1].position.x * retina, this.particles[i + 1].position.y * retina);
            _g.lineTo(
              ((this.particles[i].position.x + p0.x) * 0.5) * retina,
              ((this.particles[i].position.y + p0.y) * 0.5) * retina
            );
            _g.closePath();
            _g.stroke();
            _g.fill();

            _g.beginPath();
            _g.moveTo(p1.x * retina, p1.y * retina);
            _g.lineTo(p0.x * retina, p0.y * retina);
            _g.lineTo(
              ((this.particles[i].position.x + p0.x) * 0.5) * retina,
              ((this.particles[i].position.y + p0.y) * 0.5) * retina
            );
            _g.closePath();
            _g.stroke();
            _g.fill();
          } else {
            // Mid segments: Smooth ribbon strip
            _g.beginPath();
            _g.moveTo(this.particles[i].position.x * retina, this.particles[i].position.y * retina);
            _g.lineTo(this.particles[i + 1].position.x * retina, this.particles[i + 1].position.y * retina);
            _g.lineTo(p1.x * retina, p1.y * retina);
            _g.lineTo(p0.x * retina, p0.y * retina);
            _g.closePath();
            _g.stroke();
            _g.fill();
          }
        }
      };
    }

    const bounds = new Vector2(window.innerWidth, window.innerHeight);

    const handleResize = () => {
      bounds.x = window.innerWidth;
      bounds.y = window.innerHeight;
      canvas.width = bounds.x * retina;
      canvas.height = bounds.y * retina;
    };

    handleResize();

    const confettiRibbons = [];
    for (let i = 0; i < confettiRibbonCount; i++) {
      confettiRibbons.push(
        new ConfettiRibbon(
          random() * bounds.x,
          -random() * bounds.y * 1.5,
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
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
