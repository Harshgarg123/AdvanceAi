import { useEffect, useRef } from 'react';

interface ConfettiPiece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  life: number;
}

interface ConfettiBurstProps {
  /** Increment this number to fire a new burst. */
  trigger: number;
  className?: string;
  originX?: number;
  originY?: number;
  pieceCount?: number;
}

const PALETTE = [
  '212, 175, 55',
  '232, 213, 168',
  '227, 160, 171',
  '245, 241, 232',
  '200, 184, 212',
];

/** A short-lived canvas confetti burst. Idle and invisible until `trigger` changes. */
export function ConfettiBurst({
  trigger,
  className = '',
  originX = 0.5,
  originY = 0.5,
  pieceCount = 90,
}: ConfettiBurstProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const piecesRef = useRef<ConfettiPiece[]>([]);
  const rafRef = useRef(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    const cx = w * originX;
    const cy = h * originY;

    piecesRef.current = Array.from({ length: pieceCount }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5.5 + 2;
      return {
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: Math.random() * 5 + 3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        life: 1,
      };
    });

    cancelAnimationFrame(rafRef.current);

    const step = () => {
      ctx.clearRect(0, 0, w, h);
      let alive = false;

      piecesRef.current.forEach((p) => {
        if (p.life <= 0) return;
        p.vy += 0.12;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.life -= 0.012;

        if (p.life > 0) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = `rgba(${p.color}, ${Math.max(p.life, 0)})`;
          ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.6);
          ctx.restore();
        }
      });

      if (alive) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        ctx.clearRect(0, 0, w, h);
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none z-[350] ${className}`}
    />
  );
}
