import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper, ChapterLabel } from '@/components/ui';
import { useReaction } from '@/components/ReactionProvider';
import { CONTENT } from '@/data/content';
import {
  Smile,
  Zap,
  Sparkles,
  VolumeX,
  AlertTriangle,
  Baby,
  HelpCircle,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  smile: Smile,
  zap: Zap,
  sparkles: Sparkles,
  'volume-x': VolumeX,
  'alert-triangle': AlertTriangle,
  baby: Baby,
  'help-circle': HelpCircle,
};

function InvestigationCard({ card, index }: { card: typeof CONTENT.investigation.cards[number]; index: number }): JSX.Element {
  const [expanded, setExpanded] = useState(false);
  const { triggerEasterEgg, registerAliasClick } = useReaction();
  const Icon = iconMap[card.icon] ?? Sparkles;

  const handleClick = useCallback(() => {
    if (!expanded) {
      // Trigger easter eggs for specific cards
      if (card.id === 'maardungi') {
        triggerEasterEgg('maardungi');
      } else if (card.id === 'youneedhelp') {
        triggerEasterEgg('youneedhelp');
      } else if (card.id === 'chuppp') {
        registerAliasClick('chuppp');
      }
    }
    setExpanded(!expanded);
  }, [expanded, card.id, triggerEasterEgg, registerAliasClick]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`card-glass card-glass-hover rounded-xl overflow-hidden cursor-pointer transition-all duration-500 ${
        expanded ? 'col-span-1 md:col-span-2' : ''
      }`}
      onClick={handleClick}
      data-cursor="hover"
    >
      <div className="p-6 md:p-8 flex items-start gap-5">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-champagne-500/10 flex items-center justify-center border border-champagne-500/15">
          <Icon className="w-5 h-5 text-champagne-500/70" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg md:text-xl font-mono tracking-wide text-ivory-100">
              {card.title}
            </h3>
            <motion.div animate={{ rotate: expanded ? 90 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronRight className="w-4 h-4 text-silver-500/40" />
            </motion.div>
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-5 space-y-3">
                  <div>
                    <span className="text-xs font-mono tracking-widest text-silver-500/50 uppercase">Status</span>
                    <p className="text-sm font-serif italic text-ivory-200/80 mt-1">{card.status}</p>
                  </div>
                  <div>
                    <span className="text-xs font-mono tracking-widest text-silver-500/50 uppercase">Effect</span>
                    <p className="text-sm font-serif italic text-ivory-200/80 mt-1">{card.effect}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!expanded && (
            <p className="text-xs font-mono text-silver-500/30 mt-2 tracking-wider">
              TAP TO INVESTIGATE
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Investigation(): JSX.Element {
  const c = CONTENT.investigation;

  return (
    <SectionWrapper className="bg-ink-950 py-20" id="investigation">
      <div className="max-w-4xl w-full px-6">
        <ChapterLabel label="CHAPTER 03 — THE INVESTIGATION" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-serif text-ivory-50 mb-8 text-shadow-cinematic"
        >
          {c.heading}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4 mb-16"
        >
          <p className="text-lg md:text-xl font-serif italic text-ivory-200/70">{c.text1}</p>
          <p className="text-lg md:text-xl font-serif italic text-champagne-400/80">{c.text2}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {c.cards.map((card, i) => (
            <InvestigationCard key={card.id} card={card} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
