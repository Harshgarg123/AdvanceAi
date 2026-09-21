import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '@/components/ui';
import { CONTENT } from '@/data/content';

const sequenceSteps = [
  { text: CONTENT.realReason.enough, delay: 1000 },
  { text: CONTENT.realReason.actualReason, delay: 1200 },
  { text: CONTENT.realReason.birthday, delay: 1500 },
];

export function RealReason(): JSX.Element {
  const c = CONTENT.realReason;
  const [visibleSteps, setVisibleSteps] = useState<string[]>([]);
  const [showDate, setShowDate] = useState(false);
  const [showBirthday, setShowBirthday] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  const start = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    let cumulative = 0;
    sequenceSteps.forEach((step, i) => {
      cumulative += step.delay;
      setTimeout(() => {
        setVisibleSteps((prev) => [...prev, step.text]);
        if (i === 2) {
          setTimeout(() => setShowDate(true), 1500);
          setTimeout(() => setShowBirthday(true), 3500);
        }
      }, cumulative);
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            start();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [start]);

  return (
    <SectionWrapper className="bg-ink-950 py-20" id="real-reason">
      {/* No particles, no jokes — just quiet */}
      <div ref={sectionRef} className="max-w-2xl w-full px-6 text-center">
        {/* Subtle single light source */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-champagne-500/[0.03] blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <AnimatePresence>
            {visibleSteps.map((step, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className={`font-serif ${
                  i < 2
                    ? 'text-lg md:text-2xl text-ivory-200/50 italic mb-6'
                    : 'hidden'
                }`}
              >
                {step}
              </motion.p>
            ))}
          </AnimatePresence>

          {showDate && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="my-16"
            >
              <h2 className="text-7xl md:text-9xl font-serif text-champagne-500/80 text-shadow-cinematic tracking-wider">
                {c.date}
              </h2>
            </motion.div>
          )}

          {showBirthday && (
            <motion.h2
              initial={{ opacity: 0, filter: 'blur(20px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-5xl font-serif italic text-ivory-50"
            >
              {c.happyBirthday}
            </motion.h2>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
