import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pencil, Check, X } from 'lucide-react';
import { SectionWrapper, ChapterLabel } from '@/components/ui';
import { Petals } from '@/components/Petals';
import { CONTENT } from '@/data/content';

type Moment = (typeof CONTENT.memoryTimeline.moments)[number];

function TimelineCard({ moment, index }: { moment: Moment; index: number }): JSX.Element {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState<string>(moment.description);
  const isLeft = index % 2 === 0;

  const toggleOpen = useCallback(() => {
    if (!editing) setOpen((o) => !o);
  }, [editing]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: 0.05 }}
      className={`relative pl-12 sm:pl-0 ${isLeft ? 'sm:pr-[50%]' : 'sm:pl-[50%]'}`}
    >
      {/* Spine dot */}
      <div className="absolute top-6 left-0 sm:left-1/2 -translate-x-0 sm:-translate-x-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-champagne-500/40 bg-ink-950">
        <div className="h-2 w-2 rounded-full bg-champagne-400/70" />
      </div>

      <div
        className={`card-glass card-glass-hover rounded-2xl p-5 md:p-6 transition-all duration-300 ${
          isLeft ? 'sm:mr-12' : 'sm:ml-12'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <button type="button" onClick={toggleOpen} data-cursor="hover" className="text-left flex-1">
            <p className="text-[10px] font-mono tracking-widest text-champagne-500/50 uppercase">
              Memory {String(index + 1).padStart(2, '0')}
            </p>
            <h3 className="mt-1 text-lg md:text-xl font-serif text-ivory-50">{moment.title}</h3>
          </button>

          {open && (
            <button
              type="button"
              onClick={() => setEditing((e) => !e)}
              data-cursor="hover"
              aria-label={editing ? 'Done editing' : 'Edit this memory'}
              className="flex-shrink-0 text-silver-500/50 hover:text-champagne-400/80 transition-colors mt-1"
            >
              {editing ? <Check className="w-4 h-4" /> : <Pencil className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              {editing ? (
                <div className="mt-3 space-y-2">
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={3}
                    className="w-full bg-ink-800/60 border border-champagne-500/20 rounded-lg p-3 text-sm font-serif italic text-ivory-100/90 leading-relaxed resize-y focus:outline-none focus:border-champagne-500/40 transition-colors"
                  />
                  <div className="flex items-center gap-2 text-[11px] font-mono text-silver-500/40">
                    <X className="w-3 h-3" />
                    {CONTENT.memoryTimeline.localOnlyNote}
                  </div>
                </div>
              ) : (
                <p className="mt-3 text-sm md:text-base font-serif italic text-ivory-200/70 leading-relaxed">
                  {text}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {!open && (
          <p className="mt-2 text-[11px] font-mono text-silver-500/30 tracking-wider uppercase">
            {CONTENT.memoryTimeline.tapHint}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export function MemoryTimeline(): JSX.Element {
  const c = CONTENT.memoryTimeline;

  return (
    <SectionWrapper className="bg-ink-950 py-24 overflow-hidden" id="memory-timeline">
      <Petals density={9} />
      <div className="max-w-3xl w-full px-6 relative">
        <ChapterLabel label="CHAPTER 10 — LITTLE MOMENTS" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-serif text-ivory-50 mb-3 text-shadow-cinematic text-center sm:text-left"
        >
          {c.heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg font-serif italic text-ivory-200/60 mb-4 text-center sm:text-left"
        >
          {c.subtitle}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-xs font-mono tracking-widest text-champagne-500/40 uppercase mb-16 text-center sm:text-left"
        >
          {c.editNote}
        </motion.p>

        <div className="relative">
          <div className="absolute left-4 sm:left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-champagne-500/25 to-transparent" />
          <div className="space-y-10">
            {c.moments.map((moment, i) => (
              <TimelineCard key={moment.id} moment={moment} index={i} />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
