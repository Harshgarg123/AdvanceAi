import { useEffect, useState } from 'react';

export function CustomCursor(): JSX.Element | null {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailPosition, setTrailPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return;

    let raf = 0;
    let mouseX = -100;
    let mouseY = -100;
    let trailX = -100;
    let trailY = -100;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      const target = e.target as HTMLElement;
      const interactive = target.closest('button, a, [data-cursor="hover"], input, [role="button"]');
      setIsHovering(!!interactive);
    };

    const onLeave = () => setIsVisible(false);

    const animate = () => {
      trailX += (mouseX - trailX) * 0.15;
      trailY += (mouseY - trailY) * 0.15;
      setTrailPosition({ x: trailX, y: trailY });
      setPosition({ x: mouseX, y: mouseY });
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        className="fixed pointer-events-none z-[9999] transition-[width,height] duration-200 ease-out hidden md:block"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`rounded-full transition-all duration-200 ${
            isHovering
              ? 'w-2 h-2 bg-champagne-500'
              : 'w-1.5 h-1.5 bg-champagne-400/70'
          }`}
        />
      </div>
      <div
        className="fixed pointer-events-none z-[9998] hidden md:block"
        style={{
          left: trailPosition.x,
          top: trailPosition.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`rounded-full border transition-all duration-300 ${
            isHovering
              ? 'w-10 h-10 border-champagne-500/50'
              : 'w-6 h-6 border-champagne-400/30'
          }`}
        />
      </div>
    </>
  );
}
