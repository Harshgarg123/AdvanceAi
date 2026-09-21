import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleField } from '@/components/ParticleField';
import { GlowButton } from '@/components/ui';
import { CONTENT } from '@/data/content';
import { useSequence } from '@/hooks/useTypewriter';

const sequenceSteps: { text: string; delay: number }[] = [
  { text: CONTENT.opening.intro, delay: 900 },
  { text: CONTENT.opening.date, delay: 1300 },
  { text: CONTENT.opening.access, delay: 1200 },
  { text: CONTENT.opening.authorized, delay: 1800 },
  { text: CONTENT.opening.alsoKnownAs, delay: 1400 },
];

const aliasSteps: { text: string; delay: number }[] = CONTENT.subject.aliases.map((a) => ({
  text: a,
  delay: 1650,
}));

const afterAliasSteps: { text: string; delay: number }[] = [
  { text: CONTENT.opening.seriously, delay: 900 },
  { text: CONTENT.opening.fourNames, delay: 1500 },
  { text: CONTENT.opening.investigation, delay: 1800 },
];

// Minimum time a phase must be visible before a tap is allowed to skip it —
// stops a couple of impatient taps from blowing through the entire intro at once.
const SKIP_COOLDOWN_MS = 1100;

interface OpeningProps {
  onEnter: () => void;
}

export function Opening({ onEnter }: OpeningProps): JSX.Element {
  const [phase, setPhase] = useState<'intro' | 'aliases' | 'after' | 'enter'>('intro');
  const phaseEnteredAtRef = useRef(Date.now());

  const introSeq = useSequence(sequenceSteps);
  const aliasSeq = useSequence(aliasSteps);
  const afterSeq = useSequence(afterAliasSteps);

  useEffect(() => {
    phaseEnteredAtRef.current = Date.now();
  }, [phase]);

  useEffect(() => {
    if (phase === 'intro' && introSeq.isDone) {
      const t = setTimeout(() => setPhase('aliases'), 1500);
      return () => clearTimeout(t);
    }
    if (phase === 'aliases' && aliasSeq.isDone) {
      const t = setTimeout(() => setPhase('after'), 1500);
      return () => clearTimeout(t);
    }
    if (phase === 'after' && afterSeq.isDone) {
      const t = setTimeout(() => setPhase('enter'), 1500);
      return () => clearTimeout(t);
    }
  }, [phase, introSeq.isDone, aliasSeq.isDone, afterSeq.isDone]);

  const handleSkip = useCallback(() => {
    // Ignore taps that land right after a phase has begun — this is what let a couple
    // of quick/accidental taps skip through the whole intro in under two seconds.
    if (Date.now() - phaseEnteredAtRef.current < SKIP_COOLDOWN_MS) return;

    if (phase === 'intro') {
      if (introSeq.isDone) return;
      introSeq.skip();
    } else if (phase === 'aliases') {
      if (aliasSeq.isDone) return;
      aliasSeq.skip();
    } else if (phase === 'after') {
      if (afterSeq.isDone) return;
      afterSeq.skip();
    }
  }, [phase, introSeq, aliasSeq, afterSeq]);

  return (
    <div
      className="fixed inset-0 z-[500] bg-ink-950 flex items-center justify-center overflow-hidden"
      onClick={handleSkip}
    >
      <ParticleField density={50} />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(8,7,10,0.8)_100%)] pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-2xl">
        {phase === 'intro' && (
          <>
            {introSeq.visibleSteps.map((step, i) => {
              const isName = step === CONTENT.opening.authorized;
              const isDate = step === CONTENT.opening.date;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={isName ? 'mt-8' : ''}
                >
                  {isName ? (
                    <h1 className="text-5xl md:text-7xl font-serif text-ivory-50 tracking-wide text-shadow-cinematic">
                      {CONTENT.subject.name.toUpperCase()}
                    </h1>
                  ) : isDate ? (
                    <p className="text-3xl md:text-5xl font-mono tracking-ultra-wider text-champagne-500/80 my-6">
                      {step}
                    </p>
                  ) : (
                    <p className="text-xs md:text-sm font-mono tracking-ultra-wide text-silver-500/60 uppercase mb-4">
                      {step}
                    </p>
                  )}
                </motion.div>
              );
            })}
            {!introSeq.isDone && (
              <motion.p
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs font-mono text-silver-500/30 tracking-widest"
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                TAP TO CONTINUE
              </motion.p>
            )}
          </>
        )}

        {phase === 'aliases' && (
          <>
            <p className="text-xs font-mono tracking-ultra-wide text-silver-500/50 uppercase mb-8">
              {CONTENT.opening.alsoKnownAs}
            </p>
            <div className="space-y-3">
              <AnimatePresence>
                {aliasSeq.visibleSteps.map((alias, i) => (
                  <motion.h2
                    key={i}
                    initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="text-3xl md:text-5xl font-serif italic text-champagne-400/90"
                  >
                    {alias}
                  </motion.h2>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}

        {phase === 'after' && (
          <div className="space-y-6">
            {afterSeq.visibleSteps.map((step, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={
                  i === 2
                    ? 'text-lg md:text-xl font-serif italic text-ivory-200/80 max-w-md mx-auto'
                    : 'text-2xl md:text-3xl font-serif text-ivory-100'
                }
              >
                {step}
              </motion.p>
            ))}
          </div>
        )}

        {phase === 'enter' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="text-xs font-mono tracking-ultra-wide text-champagne-500/50 uppercase mb-12"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              INVESTIGATION READY
            </motion.div>
            <GlowButton onClick={() => onEnter()} className="text-base px-12 py-4">
              {CONTENT.opening.enterButton}
            </GlowButton>
          </motion.div>
        )}
      </div>
    </div>
  );
}
