import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper, ChapterLabel } from '@/components/ui';
import { Petals } from '@/components/Petals';
import { ConfettiBurst } from '@/components/ConfettiBurst';
import { CONTENT } from '@/data/content';

export function TheSecret(): JSX.Element {
  const c = CONTENT.secret;
  const [clicked, setClicked] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [confettiTrigger, setConfettiTrigger] = useState(0);

  const handleClick = useCallback(() => {
    setClicked(true);
    setConfettiTrigger((n) => n + 1);
    c.messages.forEach((_, i) => {
      setTimeout(() => setVisibleCount(i + 1), i * 1600);
    });
  }, [c.messages]);

  return (
    <SectionWrapper className="bg-ink-900 py-24 overflow-hidden" id="secret">
      <Petals density={10} />
      <ConfettiBurst trigger={confettiTrigger} originY={0.5} pieceCount={90} />
      <div className="max-w-xl w-full px-6 text-center relative">
        <ChapterLabel label="CHAPTER 15 — THE SECRET" className="justify-center" />

        <AnimatePresence mode="wait">
          {!clicked ? (
            <motion.div
              key="button"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="pt-8"
            >
              <motion.button
                type="button"
                onClick={handleClick}
                data-cursor="hover"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full border border-blush-500/25 bg-ink-900/40 backdrop-blur-sm px-10 py-4 text-sm font-mono tracking-widest text-blush-300/70 uppercase transition-all duration-500 hover:border-blush-500/50 hover:text-blush-200 hover:glow-blush"
              >
                {c.buttonLabel}
              </motion.button>
              <p className="mt-5 text-xs font-mono tracking-widest text-silver-500/30 uppercase">
                {c.buttonHint}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="messages"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="space-y-7 py-4"
            >
              {c.messages.map((msg, i) => (
                <AnimatePresence key={i}>
                  {visibleCount > i && (
                    <motion.p
                      initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      className={
                        i < 2
                          ? 'text-2xl md:text-3xl font-serif italic text-blush-200'
                          : i === 2
                            ? 'text-xl md:text-2xl font-serif italic text-champagne-400/80'
                            : 'text-base md:text-lg font-serif italic text-ivory-200/70 leading-relaxed max-w-lg mx-auto'
                      }
                    >
                      {msg}
                    </motion.p>
                  )}
                </AnimatePresence>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
