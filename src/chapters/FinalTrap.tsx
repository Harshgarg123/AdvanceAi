import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Sparkles } from 'lucide-react';
import { SectionWrapper, ChapterLabel, GlowButton } from '@/components/ui';
import { ConfettiBurst } from '@/components/ConfettiBurst';
import { Petals } from '@/components/Petals';
import { CONTENT } from '@/data/content';

const trapSequence = [
  ...CONTENT.finalTrap.detections,
  CONTENT.finalTrap.enough,
  CONTENT.finalTrap.happyBirthday,
];

export function FinalTrap(): JSX.Element {
  const c = CONTENT.finalTrap;
  const [phase, setPhase] = useState<'intro' | 'blackout' | 'done'>('intro');
  const [visibleItems, setVisibleItems] = useState<string[]>([]);
  const [candleBlown, setCandleBlown] = useState(false);
  const [wishText, setWishText] = useState('');
  const [wishSealed, setWishSealed] = useState(false);
  const [confettiTrigger, setConfettiTrigger] = useState(0);

  const handleClick = useCallback(() => {
    setPhase('blackout');
    trapSequence.forEach((text, i) => {
      setTimeout(() => {
        setVisibleItems((prev) => [...prev, text]);
        if (i === trapSequence.length - 1) {
          setTimeout(() => setPhase('done'), 2000);
        }
      }, 1200 * (i + 1));
    });
  }, []);

  const handleBlowCandle = useCallback(() => {
    setCandleBlown(true);
    setConfettiTrigger((n) => n + 1);
  }, []);

  const handleSealWish = useCallback(() => {
    setWishSealed(true);
  }, []);

  return (
    <SectionWrapper className="bg-ink-900 py-20 overflow-hidden" id="final-trap">
      <Petals density={10} />
      <ConfettiBurst trigger={confettiTrigger} originY={0.55} pieceCount={110} />
      <div className="max-w-2xl w-full px-6 text-center relative">
        <ChapterLabel label="CHAPTER 16 — THE FINAL TRAP" className="justify-center" />

        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-serif text-ivory-50 mb-8 text-shadow-cinematic"
              >
                {c.wait}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl font-serif italic text-ivory-200/60 mb-16"
              >
                {c.finalThing}
              </motion.p>
              <GlowButton
                onClick={handleClick}
                variant="ivory"
                className="text-base"
              >
                {c.button}
              </GlowButton>
            </motion.div>
          )}

          {phase === 'blackout' && (
            <motion.div
              key="blackout"
              className="fixed inset-0 z-[400] flex items-center justify-center bg-ink-950"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center space-y-8">
                {visibleItems.map((text, i) => {
                  const isEnough = text === c.enough;
                  const isBirthday = text === c.happyBirthday;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8, filter: 'blur(15px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {isBirthday ? (
                        <h2 className="text-4xl md:text-6xl font-serif italic champagne-gradient-text text-shadow-cinematic">
                          {text}
                        </h2>
                      ) : isEnough ? (
                        <p className="text-2xl md:text-3xl font-serif italic text-ivory-200/50">
                          {text}
                        </p>
                      ) : (
                        <p className="text-xl md:text-2xl font-mono tracking-widest text-champagne-500/70 uppercase">
                          {text}
                        </p>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {phase === 'done' && (
            <motion.div
              key="done"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.h2
                initial={{ opacity: 0, filter: 'blur(20px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.5 }}
                className="text-4xl md:text-6xl font-serif italic champagne-gradient-text text-shadow-cinematic mb-12"
              >
                {c.happyBirthday}
              </motion.h2>

              {/* Candle + wish ritual */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="card-glass rounded-2xl p-8 md:p-10 max-w-md mx-auto mb-12"
              >
                <p className="text-xs font-mono tracking-widest text-silver-500/50 uppercase mb-6">
                  {c.wish.heading}
                </p>

                <AnimatePresence mode="wait">
                  {!candleBlown ? (
                    <motion.button
                      key="candle"
                      type="button"
                      onClick={handleBlowCandle}
                      data-cursor="hover"
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex flex-col items-center gap-4 mx-auto focus:outline-none group"
                      aria-label={c.wish.instruction}
                    >
                      <motion.span
                        animate={{ y: [0, -3, 0], rotate: [-2, 2, -2] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                        className="text-champagne-400 group-hover:text-blush-300 transition-colors"
                      >
                        <Flame className="w-10 h-10 fill-champagne-500/30" strokeWidth={1.5} />
                      </motion.span>
                      <span className="text-lg font-serif italic text-ivory-100/90">
                        {c.wish.instruction}
                      </span>
                      <span className="text-xs font-mono text-silver-500/40 tracking-widest">
                        {c.wish.instructionHint}
                      </span>
                    </motion.button>
                  ) : !wishSealed ? (
                    <motion.div
                      key="wishing"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="space-y-4"
                    >
                      <p className="text-lg font-serif italic text-ivory-100/90">{c.wish.blownLabel}</p>
                      <textarea
                        value={wishText}
                        onChange={(e) => setWishText(e.target.value)}
                        placeholder={c.wish.placeholder}
                        rows={3}
                        className="w-full bg-ink-800/60 border border-blush-500/20 rounded-lg p-4 font-script text-lg text-blush-200/90 placeholder:text-silver-500/30 placeholder:font-sans placeholder:text-sm resize-none focus:outline-none focus:border-blush-500/50 transition-colors"
                      />
                      <GlowButton variant="blush" onClick={handleSealWish} className="text-sm">
                        {c.wish.sealButton}
                      </GlowButton>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sealed"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Sparkles className="w-4 h-4 text-blush-300" />
                        <span className="text-sm font-mono tracking-widest text-blush-300/80 uppercase">
                          {c.wish.sealedHeading}
                        </span>
                        <Sparkles className="w-4 h-4 text-blush-300" />
                      </div>
                      <p className="text-base font-serif italic text-ivory-200/70 max-w-sm mx-auto">
                        {c.wish.sealedText}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                <a
                  href="#final-scene"
                  className="text-sm font-mono tracking-widest text-champagne-500/60 uppercase border-b border-champagne-500/30 hover:border-champagne-500/60 transition-all pb-1"
                >
                  Continue →
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
