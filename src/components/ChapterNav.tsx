import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChapterNavProps {
  chapters: { id: string; label: string }[];
}

export function ChapterNav({ chapters }: ChapterNavProps): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollY / docHeight : 0);

      const winH = window.innerHeight;
      let best = -1;
      let bestDist = Infinity;
      chapters.forEach((_, i) => {
        const el = document.getElementById(chapters[i].id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - winH / 2);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActiveIndex(best);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [chapters]);

  const scrollToChapter = (index: number) => {
    const el = document.getElementById(chapters[index].id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Progress bar at top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[201] origin-left"
        style={{ scaleX: scrollProgress, background: 'linear-gradient(90deg, #d4af37, #e8d5a8)' }}
      />

      {/* Chapter dots */}
      <div
        className="fixed right-6 top-1/2 -translate-y-1/2 z-[201] hidden lg:flex flex-col gap-3"
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => { setExpanded(false); setHoveredIndex(null); }}
      >
        {chapters.map((ch, i) => (
          <button
            key={ch.id}
            onClick={() => scrollToChapter(i)}
            onMouseEnter={() => setHoveredIndex(i)}
            className="group flex items-center gap-3 justify-end"
            aria-label={ch.label}
          >
            <AnimatePresence>
              {(hoveredIndex === i || expanded) && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="text-xs font-mono tracking-widest text-champagne-400/60 uppercase whitespace-nowrap"
                >
                  {ch.label}
                </motion.span>
              )}
            </AnimatePresence>
            <motion.span
              className="block rounded-full border transition-all duration-300"
              animate={{
                width: activeIndex === i ? 10 : 6,
                height: activeIndex === i ? 10 : 6,
                borderColor: activeIndex === i ? 'rgba(212,175,55,0.8)' : 'rgba(160,160,170,0.3)',
                backgroundColor: activeIndex === i ? 'rgba(212,175,55,0.6)' : 'transparent',
              }}
            />
          </button>
        ))}
      </div>
    </>
  );
}
