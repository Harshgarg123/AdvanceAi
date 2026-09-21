import { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  driftPhase: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  hue: 'blush' | 'champagne';
}

interface PetalsProps {
  density?: number;
  className?: string;
}

const COLORS: Record<Petal['hue'], string> = {
  blush: '227, 160, 171',
  champagne: '232, 213, 168',
};

/** Soft, drifting petals — a gentle warmth layered over the darker chapters. */
export function Petals({ density = 14, className = '' }: PetalsProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let petals: Petal[] = [];
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const spawn = (randomY: boolean): Petal => ({
      x: Math.random() * w,
      y: randomY ? Math.random() * h : -10,
      size: Math.random() * 5 + 4,
      speed: Math.random() * 0.35 + 0.18,
      drift: Math.random() * 0.6 + 0.2,
      driftPhase: Math.random() * Math.PI * 2,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.35 + 0.25,
      hue: Math.random() > 0.55 ? 'blush' : 'champagne',
    });

    const init = () => {
      resize();
      petals = Array.from({ length: density }, () => spawn(true));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      petals.forEach((p) => {
        p.y += p.speed;
        p.driftPhase += 0.01;
        p.x += Math.sin(p.driftPhase) * p.drift * 0.1;
        p.rotation += p.rotationSpeed;

        if (p.y > h + 10) {
          Object.assign(p, spawn(false));
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COLORS[p.hue]}, ${p.opacity})`;
        ctx.fill();
        ctx.restore();
      });
      raf = requestAnimationFrame(draw);
    };

    init();
    draw();

    const onResize = () => init();
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
