import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  color: string;
}

const COLORS = ['#e8d5a8', '#f7dfe0', '#e3a0ab', '#d4af37'];
const MAX_ACTIVE_SPARKLES = 40;

/** Spawns a tiny burst of sparkles at every click/tap, anywhere on the site. Purely decorative. */
export function ClickSparkle(): JSX.Element {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const idRef = useRef(0);

  const handlePointer = useCallback((e: PointerEvent) => {
    const count = 5;
    const next: Sparkle[] = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 26 + 14;
      idRef.current += 1;
      return {
        id: idRef.current,
        x: e.clientX,
        y: e.clientY,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
        size: Math.random() * 5 + 3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
    });

    setSparkles((prev) => [...prev.slice(-MAX_ACTIVE_SPARKLES), ...next]);
  }, []);

  useEffect(() => {
    window.addEventListener('pointerdown', handlePointer);
    return () => window.removeEventListener('pointerdown', handlePointer);
  }, [handlePointer]);

  const removeSparkle = useCallback((id: number) => {
    setSparkles((prev) => prev.filter((s) => s.id !== id));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9997]" aria-hidden="true">
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.span
            key={s.id}
            initial={{ opacity: 1, x: s.x, y: s.y, scale: 0 }}
            animate={{ opacity: 0, x: s.x + s.dx, y: s.y + s.dy, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() => removeSparkle(s.id)}
            className="absolute rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              width: s.size,
              height: s.size,
              backgroundColor: s.color,
              boxShadow: `0 0 6px 1px ${s.color}`,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
