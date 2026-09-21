import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper, ChapterLabel, GlowButton } from '@/components/ui';
import { Petals } from '@/components/Petals';
import { CONTENT } from '@/data/content';
import { Edit3, Check, X, Heart } from 'lucide-react';

export function TheMessage(): JSX.Element {
  const c = CONTENT.message;
  const [isEditing, setIsEditing] = useState(false);
  const [bodyText, setBodyText] = useState<string>(c.body);
  const [signatureText, setSignatureText] = useState<string>(c.signature);
  const [opened, setOpened] = useState(false);

  return (
    <SectionWrapper className="bg-ink-900 py-20" id="message">
      <Petals density={10} />
      <div className="max-w-3xl w-full px-6 relative">
        <div className="flex items-center justify-between mb-8">
          <ChapterLabel label="CHAPTER 13 — THE MESSAGE" className="mb-0" />
          {opened && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 text-xs font-mono tracking-widest text-silver-500/50 hover:text-champagne-400/70 transition-colors uppercase"
            >
              {isEditing ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Done
                </>
              ) : (
                <>
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </>
              )}
            </motion.button>
          )}
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-serif text-ivory-50 mb-12 text-shadow-cinematic"
        >
          {c.title}
        </motion.h2>

        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div
              key="envelope"
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.4 } }}
              className="flex flex-col items-center py-10"
            >
              <motion.button
                type="button"
                onClick={() => setOpened(true)}
                data-cursor="hover"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                className="relative w-full max-w-sm aspect-[3/2] focus:outline-none"
                aria-label="Open the letter"
              >
                {/* Envelope body */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-ink-700 to-ink-800 border border-champagne-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]" />

                {/* Envelope flap */}
                <div
                  className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-ink-600 to-ink-700 border-b border-champagne-500/15"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                />

                {/* Wax seal */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-burgundy-500 to-burgundy-700 border border-burgundy-900/60 flex items-center justify-center glow-blush"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Heart className="w-5 h-5 text-blush-200 fill-blush-300/80" strokeWidth={1.5} />
                </motion.div>

                <p className="absolute bottom-5 left-0 right-0 text-center text-xs font-mono tracking-widest text-silver-500/50 uppercase">
                  Tap to open
                </p>
              </motion.button>

              <p className="mt-6 text-sm font-serif italic text-ivory-200/50">
                A little something for you, Mansi.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="card-glass rounded-2xl p-6 md:p-12 relative"
            >
              {/* Decorative quote mark */}
              <div className="absolute top-4 left-6 text-6xl font-serif text-champagne-500/10 select-none">
                "
              </div>

              <AnimatePresence mode="wait">
                {isEditing ? (
                  <motion.div
                    key="editing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <textarea
                      value={bodyText}
                      onChange={(e) => setBodyText(e.target.value)}
                      className="w-full min-h-[400px] bg-ink-800/60 border border-champagne-500/20 rounded-lg p-5 text-base font-serif text-ivory-100/90 leading-relaxed resize-y focus:outline-none focus:border-champagne-500/40 transition-colors"
                    />
                    <div>
                      <label className="text-xs font-mono tracking-widest text-silver-500/50 uppercase block mb-2">
                        Signature
                      </label>
                      <input
                        value={signatureText}
                        onChange={(e) => setSignatureText(e.target.value)}
                        className="w-full bg-ink-800/60 border border-champagne-500/20 rounded-lg p-3 text-sm font-serif italic text-champagne-400/70 focus:outline-none focus:border-champagne-500/40 transition-colors"
                      />
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-silver-500/40">
                      <X className="w-3 h-3" />
                      Changes are local only. They won't be saved if you refresh.
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="display"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="font-serif text-lg md:text-xl text-ivory-100/90 leading-[1.8] whitespace-pre-line">
                      {bodyText}
                    </div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                      className="mt-8 text-right text-2xl md:text-3xl font-script text-blush-300/90"
                    >
                      {signatureText}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {opened && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <GlowButton variant="ivory" className="text-base">
              <a href="#constellation">Continue →</a>
            </GlowButton>
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  );
}
