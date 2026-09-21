import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '@/components/ui';
import { GlowButton } from '@/components/ui';
import { CONTENT } from '@/data/content';

export function TheQuestion(): JSX.Element {
  const c = CONTENT.question;
  const [response, setResponse] = useState<'yes' | 'chuppp' | null>(null);

  return (
    <SectionWrapper className="bg-ivory-100 py-20" id="question">
      <div className="max-w-2xl w-full px-6 text-center">
        {/* Different visual style — warm ivory */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 justify-center mb-12"
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-burgundy-500/40" />
          <span className="text-xs font-mono tracking-ultra-wide text-burgundy-500/60 uppercase">
            CHAPTER 08
          </span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-burgundy-500/40" />
        </motion.div>

        <AnimatePresence mode="wait">
          {response === null ? (
            <motion.div
              key="question"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl md:text-7xl font-serif text-ink-900 mb-8"
              >
                {c.intro}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-2xl md:text-3xl font-serif italic text-burgundy-600/70 mb-6"
              >
                {c.serious}
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="text-3xl md:text-5xl font-serif text-ink-800 mb-16"
              >
                {c.question}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <GlowButton
                  variant="dark"
                  onClick={() => setResponse('yes')}
                  className="bg-ink-900 text-ivory-50 border-ink-900 hover:bg-ink-800 hover:text-ivory-100"
                >
                  {c.optionYes}
                </GlowButton>
                <GlowButton
                  onClick={() => setResponse('chuppp')}
                  className="text-burgundy-600 border-burgundy-500/30 hover:border-burgundy-500/60"
                >
                  {c.optionChuppp}
                </GlowButton>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="response"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {response === 'yes' ? (
                <>
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl md:text-6xl font-serif text-ink-900 mb-6"
                  >
                    {c.yesResponse1}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-xl md:text-2xl font-serif italic text-burgundy-600/70 mb-16"
                  >
                    {c.yesResponse2}
                  </motion.p>
                </>
              ) : (
                <>
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl md:text-6xl font-serif text-ink-900 mb-6"
                  >
                    {c.chupppResponse1}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="text-xl md:text-2xl font-serif italic text-burgundy-600/70 mb-16"
                  >
                    {c.chupppResponse2}
                  </motion.p>
                </>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <a
                  href="#real-reason"
                  className="inline-block text-sm font-mono tracking-widest text-burgundy-500/70 uppercase border-b border-burgundy-500/30 hover:border-burgundy-500/60 hover:text-burgundy-600 transition-all pb-1"
                >
                  {c.continue}
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
