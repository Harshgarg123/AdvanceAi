import { motion } from 'framer-motion';
import { Music, MapPin, Sun, Palette, Heart, type LucideIcon } from 'lucide-react';
import { SectionWrapper, ChapterLabel } from '@/components/ui';
import { Petals } from '@/components/Petals';
import { CONTENT } from '@/data/content';

const iconMap: Record<string, LucideIcon> = {
  music: Music,
  'map-pin': MapPin,
  sun: Sun,
  palette: Palette,
  heart: Heart,
};

export function IfYouWere(): JSX.Element {
  const c = CONTENT.ifYouWere;

  return (
    <SectionWrapper className="bg-ink-950 py-24 overflow-hidden" id="if-you-were">
      <Petals density={8} />
      <div className="max-w-5xl w-full px-6 relative">
        <ChapterLabel label="CHAPTER 12 — A LITTLE THOUGHT EXPERIMENT" className="justify-center" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-serif text-ivory-50 mb-3 text-shadow-cinematic text-center"
        >
          {c.heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg font-serif italic text-ivory-200/50 mb-16 text-center"
        >
          {c.subtitle}
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {c.cards.map((card, i) => {
            const Icon = iconMap[card.icon] ?? Heart;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, scale: 1.015 }}
                data-cursor="hover"
                className={`card-glass card-glass-hover rounded-2xl p-7 ${
                  i === c.cards.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="mb-4 w-12 h-12 rounded-full border border-champagne-500/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-champagne-400/80" strokeWidth={1.5} />
                </div>
                <p className="text-[10px] font-mono tracking-widest text-blush-400/60 uppercase">
                  {card.prompt}
                </p>
                <p className="mt-3 text-xl md:text-2xl font-serif italic text-ivory-50 leading-relaxed">
                  {card.answer}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
