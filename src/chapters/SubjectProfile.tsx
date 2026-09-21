import { motion } from 'framer-motion';
import { SectionWrapper, ChapterLabel, ProgressBar } from '@/components/ui';
import { useReaction } from '@/components/ReactionProvider';
import { CONTENT } from '@/data/content';

export function SubjectProfile(): JSX.Element {
  const c = CONTENT.profile;
  const { registerAliasClick } = useReaction();

  return (
    <SectionWrapper className="bg-ink-950 py-20" id="profile">
      <div className="max-w-3xl w-full px-6 md:px-10">
        <ChapterLabel label="CHAPTER 01 — SUBJECT PROFILE" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-serif text-ivory-50 mb-12 text-shadow-cinematic"
        >
          {c.title}
        </motion.h2>

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="card-glass rounded-2xl p-6 md:p-10 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <div className="text-xs font-mono tracking-widest text-silver-500/50 uppercase mb-2">Name</div>
              <div className="text-2xl font-serif text-ivory-50">{CONTENT.subject.name}</div>
            </div>
            <div>
              <div className="text-xs font-mono tracking-widest text-silver-500/50 uppercase mb-2">Birthday</div>
              <div className="text-2xl font-serif text-champagne-400">{CONTENT.subject.birthday}</div>
            </div>
          </div>

          <div className="mb-8">
            <div className="text-xs font-mono tracking-widest text-silver-500/50 uppercase mb-3">Known Aliases</div>
            <div className="flex flex-wrap gap-3">
              {CONTENT.subject.aliases.map((alias, i) => (
                <motion.button
                  key={alias}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => registerAliasClick(alias)}
                  className="px-4 py-1.5 rounded-full border border-champagne-500/20 bg-champagne-500/5 text-sm font-mono text-champagne-400/80 hover:border-champagne-500/40 hover:bg-champagne-500/10 transition-all duration-300 cursor-pointer"
                  data-cursor="hover"
                >
                  {alias}
                </motion.button>
              ))}
            </div>
            <p className="text-xs font-mono text-silver-500/20 mt-3 tracking-wider">
              Try clicking the aliases…
            </p>
          </div>

          <div>
            <div className="text-xs font-mono tracking-widest text-silver-500/50 uppercase mb-2">Personality</div>
            <div className="text-lg font-serif italic text-ivory-200/60">{c.personality}</div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="card-glass rounded-2xl p-6 md:p-10 mb-8"
        >
          <div className="text-xs font-mono tracking-widest text-silver-500/50 uppercase mb-6">
            Behavioral Analysis
          </div>
          <div className="space-y-5">
            {c.stats.map((stat, i) => (
              <ProgressBar
                key={stat.label}
                label={stat.label}
                value={stat.value}
                display={stat.display}
                delay={i * 0.15}
              />
            ))}
          </div>
        </motion.div>

        {/* Assessment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-sm font-mono tracking-widest text-champagne-500/60 uppercase mb-3">
            {c.assessment}
          </p>
          <p className="text-lg md:text-xl font-serif italic text-ivory-200/70 max-w-xl mx-auto">
            {c.afterAssessment}
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
