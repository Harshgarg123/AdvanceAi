import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles } from 'lucide-react';
import { SectionWrapper, ChapterLabel } from '@/components/ui';
import { ParticleField } from '@/components/ParticleField';
import { Petals } from '@/components/Petals';
import { ConfettiBurst } from '@/components/ConfettiBurst';
import { CONTENT } from '@/data/content';

type StarData = (typeof CONTENT.constellation.stars)[number];

/** Fixed, hand-placed sky coordinates (percent of container) — spread out, never overlapping. */
const STAR_POSITIONS: Array<{ top: string; left: string }> = [
  { top: '18%', left: '14%' },
  { top: '12%', left: '50%' },
  { top: '22%', left: '82%' },
  { top: '48%', left: '28%' },
  { top: '44%', left: '68%' },
  { top: '72%', left: '18%' },
  { top: '76%', left: '58%' },
];

/** Days/hours/minutes/seconds remaining until the next occurrence of `month`/`day`, relative to `now`. */
function getCountdown(month: number, day: number, now: Date) {
  let target = new Date(now.getFullYear(), month - 1, day, 0, 0, 0, 0);

  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const isToday = target.getTime() === startOfToday.getTime();

  if (!isToday && target.getTime() <= now.getTime()) {
    target = new Date(now.getFullYear() + 1, month - 1, day, 0, 0, 0, 0);
  }

  const diff = Math.max(0, target.getTime() - now.getTime());
  const totalSeconds = Math.floor(diff / 1000);

  return {
    isToday,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function CountdownUnit({ value, label }: { value: number; label: string }): JSX.Element {
  return (
    <div className="flex flex-col items-center gap-2 min-w-[64px] md:min-w-[84px]">
      <motion.span
        key={value}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-3xl md:text-5xl font-serif champagne-gradient-text text-shadow-cinematic tabular-nums"
      >
        {String(value).padStart(2, '0')}
      </motion.span>
      <span className="text-[10px] md:text-xs font-mono tracking-widest text-silver-500/50 uppercase">
        {label}
      </span>
    </div>
  );
}

function SkyStar({
  star,
  position,
  discovered,
  onReveal,
}: {
  star: StarData;
  position: { top: string; left: string };
  discovered: boolean;
  onReveal: (star: StarData) => void;
}): JSX.Element {
  return (
    <motion.button
      type="button"
      aria-label={discovered ? star.title : 'Undiscovered star'}
      onClick={() => onReveal(star)}
      className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center outline-none"
      style={{ top: position.top, left: position.left }}
      data-cursor="hover"
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.25 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: discovered
            ? ['0 0 12px 4px rgba(232,213,168,0.35)', '0 0 22px 8px rgba(232,213,168,0.55)', '0 0 12px 4px rgba(232,213,168,0.35)']
            : ['0 0 6px 1px rgba(232,213,168,0.15)', '0 0 10px 3px rgba(232,213,168,0.3)', '0 0 6px 1px rgba(232,213,168,0.15)'],
        }}
        transition={{ duration: discovered ? 2.4 : 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <Star
        className={`relative w-5 h-5 md:w-6 md:h-6 transition-colors duration-500 ${
          discovered ? 'text-champagne-400 fill-champagne-400/80' : 'text-ivory-200/50 fill-ivory-200/10'
        }`}
        strokeWidth={1.5}
      />
    </motion.button>
  );
}

export function Constellation(): JSX.Element {
  const c = CONTENT.constellation;
  const [discoveredIds, setDiscoveredIds] = useState<string[]>([]);
  const [activeStar, setActiveStar] = useState<StarData | null>(null);
  const [now, setNow] = useState(() => new Date());
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const hasCelebrated = useRef(false);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Birthday is 22 September — parsed once, kept in sync with `now` via getCountdown.
  const countdown = useMemo(() => getCountdown(9, 22, now), [now]);

  const handleReveal = useCallback((star: StarData) => {
    setActiveStar(star);
    setDiscoveredIds((prev) => (prev.includes(star.id) ? prev : [...prev, star.id]));
  }, []);

  const allFound = discoveredIds.length === c.stars.length;
  const orderedRevealed = c.stars.filter((s) => discoveredIds.includes(s.id));

  useEffect(() => {
    if (allFound && !hasCelebrated.current) {
      hasCelebrated.current = true;
      setConfettiTrigger((n) => n + 1);
    }
  }, [allFound]);

  return (
    <SectionWrapper className="bg-ink-950 py-24 overflow-hidden" id="constellation">
      <Petals density={8} />
      <ConfettiBurst trigger={confettiTrigger} originY={0.6} pieceCount={110} />
      <div className="max-w-4xl w-full px-6 relative">
        <ChapterLabel label="CHAPTER 14 — THE CONSTELLATION" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-serif text-ivory-50 mb-4 text-shadow-cinematic text-balance"
        >
          {c.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-base md:text-lg font-serif italic text-ivory-200/60 mb-3 max-w-xl"
        >
          {c.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-xs font-mono tracking-widest text-champagne-500/50 uppercase mb-10"
        >
          {c.instruction} {'\u00b7'} {c.progressPrefix} {discoveredIds.length}/{c.stars.length}
        </motion.p>

        {/* Night sky */}
        <div className="relative h-[280px] md:h-[360px] rounded-2xl card-glass overflow-hidden mb-8">
          <ParticleField density={45} color="245, 241, 232" />
          <div className="absolute inset-0 vignette" />
          {c.stars.map((star, i) => (
            <SkyStar
              key={star.id}
              star={star}
              position={STAR_POSITIONS[i % STAR_POSITIONS.length]}
              discovered={discoveredIds.includes(star.id)}
              onReveal={handleReveal}
            />
          ))}
        </div>

        {/* Revealed notes journal */}
        <div className="space-y-3 mb-4">
          <AnimatePresence>
            {activeStar && (
              <motion.div
                key={activeStar.id}
                initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="card-glass rounded-xl p-6 border-champagne-500/20"
              >
                <span className="text-xs font-mono tracking-widest text-champagne-400/70 uppercase">
                  {activeStar.title}
                </span>
                <p className="mt-2 text-base md:text-lg font-serif italic text-ivory-100/90 leading-relaxed">
                  {activeStar.note}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {orderedRevealed.length > 1 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {orderedRevealed
                .filter((s) => s.id !== activeStar?.id)
                .map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleReveal(s)}
                    className="text-[11px] font-mono tracking-wider uppercase text-silver-500/50 border border-silver-500/15 rounded-full px-3 py-1 hover:text-champagne-400/80 hover:border-champagne-500/30 transition-colors"
                  >
                    {s.title}
                  </button>
                ))}
            </div>
          )}
        </div>

        {/* Bonus reveal once every star is mapped */}
        <AnimatePresence>
          {allFound && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-10 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="flex items-center justify-center gap-2 mb-2"
                >
                  <Sparkles className="w-4 h-4 text-champagne-400" />
                  <span className="text-xs font-mono tracking-widest text-champagne-400/80 uppercase">
                    {c.allFoundHeading}
                  </span>
                  <Sparkles className="w-4 h-4 text-champagne-400" />
                </motion.div>
                <p className="text-sm md:text-base font-serif italic text-ivory-200/60 mb-8">
                  {c.allFoundText}
                </p>

                <div className="card-glass rounded-2xl px-6 py-8 md:px-10 md:py-10 inline-block">
                  <p className="text-xs font-mono tracking-widest text-silver-500/50 uppercase mb-6">
                    {c.countdown.label}
                  </p>
                  {countdown.isToday ? (
                    <div>
                      <p className="text-2xl md:text-3xl font-serif italic champagne-gradient-text text-shadow-cinematic mb-2">
                        {c.countdown.todayLabel}
                      </p>
                      <p className="text-sm md:text-base font-serif italic text-ivory-200/70 max-w-sm mx-auto">
                        {c.countdown.todayText}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-start justify-center gap-4 md:gap-8">
                      <CountdownUnit value={countdown.days} label={c.countdown.unitDays} />
                      <CountdownUnit value={countdown.hours} label={c.countdown.unitHours} />
                      <CountdownUnit value={countdown.minutes} label={c.countdown.unitMinutes} />
                      <CountdownUnit value={countdown.seconds} label={c.countdown.unitSeconds} />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
