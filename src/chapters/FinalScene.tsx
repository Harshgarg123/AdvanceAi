import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleField } from '@/components/ParticleField';
import { Petals } from '@/components/Petals';
import { ConfettiBurst } from '@/components/ConfettiBurst';
import { useReaction } from '@/components/ReactionProvider';
import { CONTENT } from '@/data/content';

type Phase = '22' | '22.09' | 'name' | 'nextChapter' | 'beautiful' | 'closing';

const phaseOrder: Phase[] = ['22', '22.09', 'name', 'nextChapter', 'beautiful', 'closing'];

const phaseDelays: Record<Phase, number> = {
  '22': 800,
  '22.09': 1500,
  name: 1500,
  nextChapter: 1800,
  beautiful: 1800,
  closing: 2000,
};

export function FinalScene(): JSX.Element {
  const c = CONTENT.finalScene;
  const [currentPhase, setCurrentPhase] = useState(-1);
  const [dateClickCount, setDateClickCount] = useState(0);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const { showCustomReaction } = useReaction();

  // Confetti blooms the moment the closing line lands.
  useEffect(() => {
    if (currentPhase === phaseOrder.indexOf('closing')) {
      setConfettiTrigger((n) => n + 1);
    }
  }, [currentPhase]);

  const start = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    let cumulative = 500;
    phaseOrder.forEach((_, i) => {
      cumulative += phaseDelays[phaseOrder[i]];
      setTimeout(() => {
        setCurrentPhase(i);
      }, cumulative);
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
            start();
          }
        });
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [start]);

  const show = (phase: Phase) => {
    const idx = phaseOrder.indexOf(phase);
    return currentPhase >= idx;
  };

  return (
    <section
      ref={sectionRef}
      id="final-scene"
      className="min-h-screen w-full bg-ink-950 relative flex items-center justify-center overflow-hidden"
    >
      {/* Night sky particles */}
      <ParticleField density={80} color="232, 213, 168" />
      <Petals density={16} />

      {/* Subtle star-like glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-champagne-500/[0.04] blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[200px] rounded-full bg-lavender-400/[0.03] blur-3xl pointer-events-none" />

      <ConfettiBurst trigger={confettiTrigger} originY={0.4} pieceCount={140} />

      <div className="relative z-10 text-center px-6 max-w-3xl">
        <AnimatePresence mode="wait">
          {/* 22 → 22.09 */}
          {currentPhase < phaseOrder.indexOf('name') && currentPhase >= 0 && (
            <motion.div
              key="date"
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(30px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-8xl md:text-[12rem] font-serif text-champagne-500/80 text-shadow-cinematic tracking-wider cursor-pointer select-none"
                onClick={() => {
                  const n = dateClickCount + 1;
                  setDateClickCount(n);
                  if (n >= 5) {
                    setConfettiTrigger((c) => c + 1);
                    showCustomReaction(['SECRET UNLOCKED.', 'You clicked the date 5 times.', 'You are officially the most curious person I know.', 'Happy Birthday, Mansi. Really.']);
                  }
                }}
              >
                {show('22.09') ? c.date : '22'}
              </motion.h2>
            </motion.div>
          )}

          {/* MANSI */}
          {show('name') && currentPhase < phaseOrder.indexOf('nextChapter') && (
            <motion.div
              key="name"
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(20px)' }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-7xl md:text-9xl font-serif italic champagne-gradient-text text-shadow-cinematic tracking-wide">
                {c.name}
              </h2>
            </motion.div>
          )}
        </AnimatePresence>

        {/* After name — stacked content */}
        {show('nextChapter') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30, filter: 'blur(15px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-2xl md:text-4xl font-mono tracking-widest text-ivory-200/80 uppercase"
            >
              {c.nextChapter}
            </motion.h2>

            {show('beautiful') && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-xl md:text-2xl font-serif italic text-ivory-200/60"
              >
                {c.makeItBeautiful}
              </motion.p>
            )}

            {show('closing') && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="pt-12"
              >
                <p className="text-3xl md:text-5xl font-serif italic champagne-gradient-text text-shadow-cinematic">
                  {c.closing}
                </p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="mt-16 text-xs font-mono text-silver-500/30 tracking-widest uppercase"
                >
                  {c.footer}
                </motion.p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
