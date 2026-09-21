import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper, ChapterLabel, GlowButton } from '@/components/ui';
import { CONTENT } from '@/data/content';

export function Simulator(): JSX.Element {
  const c = CONTENT.simulator;
  const [activeQuote, setActiveQuote] = useState(0);
  const [tested, setTested] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (tested) return;
    const interval = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % c.quotes.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [c.quotes.length, tested]);

  const handleTest = useCallback(() => {
    setTested(true);
    setShowResult(true);
  }, []);

  return (
    <SectionWrapper className="bg-ink-950 py-20" id="simulator">
      <div className="max-w-3xl w-full px-6 text-center">
        <ChapterLabel label="CHAPTER 05 — PREDICTION SIMULATOR" className="justify-center" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-serif text-ivory-50 mb-6 text-shadow-cinematic"
        >
          {c.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg font-serif italic text-ivory-200/60 mb-16"
        >
          {c.text}
        </motion.p>

        {/* Rotating quote display */}
        <div className="min-h-[120px] flex items-center justify-center mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={tested ? 'tested' : activeQuote}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
            >
              {tested ? (
                <div className="space-y-4">
                  <p className="text-2xl md:text-4xl font-serif italic champagne-gradient-text">
                    {c.result1}
                  </p>
                  <p className="text-lg font-serif italic text-ivory-200/70">{c.result2}</p>
                </div>
              ) : (
                <div>
                  <p className="text-3xl md:text-5xl font-serif italic text-champagne-400 mb-3">
                    "{c.quotes[activeQuote].text}"
                  </p>
                  <p className="text-5xl md:text-7xl font-mono text-burgundy-500/80 font-bold">
                    {c.quotes[activeQuote].probability}%
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Probability bars */}
        {!tested && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="card-glass rounded-xl p-6 md:p-8 mb-10 text-left max-w-xl mx-auto"
          >
            <div className="space-y-4">
              {c.quotes.map((q, i) => (
                <div key={q.text}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-mono text-ivory-200/70">{q.text}</span>
                    <motion.span
                      className={`text-sm font-mono font-bold ${i === activeQuote ? 'text-champagne-400' : 'text-silver-500/50'}`}
                      animate={{ scale: i === activeQuote ? 1.1 : 1 }}
                    >
                      {q.probability}%
                    </motion.span>
                  </div>
                  <div className="h-1 w-full bg-ink-700/60 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${i === activeQuote ? 'progress-bar-fill' : 'bg-silver-500/20'}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${q.probability}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {!tested && (
          <>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-sm font-mono text-burgundy-500/60 tracking-widest uppercase mb-8"
            >
              {c.confidence}
            </motion.p>
            <GlowButton onClick={handleTest}>{c.button}</GlowButton>
          </>
        )}

        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 text-xs font-mono text-silver-500/30 tracking-widest uppercase"
            >
              SIMULATION COMPLETE
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
