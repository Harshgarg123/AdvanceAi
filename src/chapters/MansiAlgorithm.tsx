import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper, ChapterLabel, ProgressBar } from '@/components/ui';
import { ParticleField } from '@/components/ParticleField';
import { CONTENT } from '@/data/content';

export function MansiAlgorithm(): JSX.Element {
  const c = CONTENT.algorithm;
  const [showResult, setShowResult] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
            const timer = setTimeout(() => setShowResult(true), 2000);
            return () => clearTimeout(timer);
          }
        });
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <SectionWrapper className="bg-ink-950 py-20 relative" id="algorithm">
      <ParticleField density={30} color="139, 58, 74" />

      <div ref={sectionRef} className="max-w-3xl w-full px-6 relative z-10">
        <ChapterLabel label="CHAPTER 07 — ANALYSIS ENGINE" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-mono tracking-widest text-ivory-50 mb-2 text-shadow-cinematic uppercase"
        >
          {c.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 mb-12"
        >
          <span className="w-2 h-2 rounded-full bg-burgundy-500 animate-pulse" />
          <span className="text-xs font-mono tracking-widest text-burgundy-500/60 uppercase">
            ANALYZING SUBJECT…
          </span>
        </motion.div>

        {/* Dashboard */}
        <div className="card-glass rounded-2xl p-6 md:p-10 mb-8">
          <div className="space-y-5">
            {c.metrics.map((metric, i) => (
              <ProgressBar
                key={metric.label}
                label={metric.label}
                value={metric.value}
                display={'error' in metric ? 'ERROR' : `${metric.value}%`}
                delay={i * 0.2}
                isError={'error' in metric ? metric.error : false}
              />
            ))}
          </div>

          {/* Error message */}
          {showResult && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 p-4 rounded-lg bg-burgundy-900/30 border border-burgundy-500/20"
            >
              <p className="text-sm font-mono text-burgundy-500 tracking-wide">
                {c.errorText}
              </p>
            </motion.div>
          )}
        </div>

        {/* Result */}
        {showResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <p className="text-sm font-mono tracking-widest text-champagne-500/60 uppercase mb-4">
              RESULT
            </p>
            <motion.h2
              initial={{ filter: 'blur(20px)' }}
              animate={{ filter: 'blur(0px)' }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="text-6xl md:text-8xl font-serif italic champagne-gradient-text text-shadow-cinematic"
            >
              {c.result}
            </motion.h2>
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  );
}
