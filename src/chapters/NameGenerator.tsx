import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper, ChapterLabel, GlowButton } from '@/components/ui';
import { CONTENT } from '@/data/content';

export function NameGenerator(): JSX.Element {
  const c = CONTENT.nameGenerator;
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isGenerating, setIsGenerating] = useState(false);

  const generate = useCallback(() => {
    setIsGenerating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % c.names.length);
      setIsGenerating(false);
    }, 400);
  }, [c.names.length]);

  const current = currentIndex >= 0 ? c.names[currentIndex] : null;

  return (
    <SectionWrapper className="bg-ink-900 py-20" id="name-generator">
      <div className="max-w-3xl w-full px-6 text-center">
        <ChapterLabel label="CHAPTER 02 — DESIGNATION" className="justify-center" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-serif text-ivory-50 mb-16 text-shadow-cinematic"
        >
          {c.title}
        </motion.h2>

        {/* Display area */}
        <div className="min-h-[200px] flex flex-col items-center justify-center mb-12">
          <AnimatePresence mode="wait">
            {current && !isGenerating ? (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(15px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.1, filter: 'blur(15px)' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center"
              >
                <motion.h3
                  className="text-5xl md:text-7xl font-serif italic champagne-gradient-text mb-4"
                  key={`name-${currentIndex}`}
                >
                  {current.name}
                </motion.h3>
                <AnimatePresence>
                  {current.note && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs font-mono text-burgundy-500/60 tracking-widest uppercase"
                    >
                      {current.note}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : isGenerating ? (
              <motion.div
                key="generating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex gap-2"
              >
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-2 h-2 rounded-full bg-champagne-500"
                    animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-lg font-serif italic text-silver-500/40"
              >
                Press the button to begin…
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <GlowButton onClick={generate}>
          {c.buttonText}
        </GlowButton>

        {currentIndex >= 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-xs font-mono text-silver-500/30 tracking-widest"
          >
            GENERATED {currentIndex + 1} TIME{currentIndex === 0 ? '' : 'S'}
          </motion.p>
        )}
      </div>
    </SectionWrapper>
  );
}
