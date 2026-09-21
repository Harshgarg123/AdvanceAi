import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper, ChapterLabel } from '@/components/ui';
import { CONTENT } from '@/data/content';

export function ThingsILike(): JSX.Element {
  const c = CONTENT.thingsILike;
  const [revealed, setRevealed] = useState(false);

  return (
    <SectionWrapper className="bg-ink-900 py-24" id="things-i-like">
      <div className="max-w-4xl w-full px-6">
        <ChapterLabel label="CHAPTER 11 — FOR THE RECORD" className="justify-center" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-serif text-ivory-50 mb-16 text-shadow-cinematic text-center text-balance"
        >
          {c.heading}
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-4 md:gap-5">
          {c.items.map((item, i) =>
            'isSpecial' in item && item.isSpecial ? (
              <motion.button
                key={item.id}
                type="button"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.07 }}
                onClick={() => setRevealed((r) => !r)}
                data-cursor="hover"
                className="card-glass card-glass-hover rounded-2xl px-7 py-5 text-left max-w-sm border-blush-500/20"
              >
                <p className="font-serif text-lg md:text-xl italic text-blush-300">{item.text}</p>
                <AnimatePresence>
                  {revealed && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden mt-3 text-sm font-serif text-ivory-200/70"
                    >
                      {item.revealText}
                    </motion.p>
                  )}
                </AnimatePresence>
                {!revealed && (
                  <p className="mt-2 text-[10px] font-mono tracking-widest text-silver-500/30 uppercase">
                    Tap to reveal
                  </p>
                )}
              </motion.button>
            ) : (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5 }}
                data-cursor="hover"
                className="group card-glass card-glass-hover rounded-2xl px-6 py-5"
              >
                <p className="font-serif text-lg md:text-xl text-ivory-50">{item.text}</p>
                {'subtitle' in item && item.subtitle && (
                  <p className="mt-1 text-sm font-serif italic text-champagne-400/0 group-hover:text-champagne-400/70 transition-colors duration-500 max-w-[220px]">
                    {item.subtitle}
                  </p>
                )}
              </motion.div>
            )
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
