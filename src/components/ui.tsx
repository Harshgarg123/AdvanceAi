import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function SectionWrapper({ children, className = '', id }: SectionWrapperProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-10% 0px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`min-h-screen w-full flex items-center justify-center relative ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}

interface ChapterLabelProps {
  label: string;
  className?: string;
}

export function ChapterLabel({ label, className = '' }: ChapterLabelProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-center gap-4 mb-8 ${className}`}
    >
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-champagne-500/50" />
      <span className="text-xs font-mono tracking-ultra-wide text-champagne-500/70 uppercase">
        {label}
      </span>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-champagne-500/50" />
    </motion.div>
  );
}

interface ProgressBarProps {
  value: number;
  label: string;
  display: string;
  delay?: number;
  isError?: boolean;
}

export function ProgressBar({ value, label, display, delay = 0, isError }: ProgressBarProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className={`text-sm font-mono tracking-wide ${isError ? 'text-burgundy-500' : 'text-ivory-200/80'}`}>
          {label}
        </span>
        <span className={`text-sm font-mono ${isError ? 'text-burgundy-500 font-bold' : 'text-champagne-400'}`}>
          {isError ? 'ERROR' : display}
        </span>
      </div>
      <div className="h-1.5 w-full bg-ink-700/60 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${isError ? 'bg-burgundy-500' : 'progress-bar-fill'}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${isError ? 100 : value}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'gold' | 'ivory' | 'dark' | 'blush';
}

export function GlowButton({ children, onClick, className = '', variant = 'gold' }: GlowButtonProps): JSX.Element {
  const variants = {
    gold: 'text-champagne-400 border-champagne-500/30 hover:border-champagne-500/60 hover:glow-gold hover:text-champagne-300',
    ivory: 'text-ivory-100 border-ivory-300/30 hover:border-ivory-300/60 hover:text-ivory-50',
    dark: 'text-ink-800 bg-ivory-100 border-ivory-100 hover:bg-ivory-50',
    blush: 'text-blush-300 border-blush-500/30 hover:border-blush-500/60 hover:glow-blush hover:text-blush-200',
  };

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`relative px-8 py-3.5 rounded-full border bg-ink-900/40 backdrop-blur-sm font-mono text-sm tracking-widest transition-all duration-300 ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}

interface ReactionPopupProps {
  lines: string[];
  visible: boolean;
  onDismiss: () => void;
}

export function ReactionPopup({ lines, visible, onDismiss }: ReactionPopupProps): JSX.Element | null {
  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onDismiss}
    >
      <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-md" />
      <motion.div
        className="relative max-w-md mx-4 text-center"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="text-xs font-mono tracking-ultra-wide text-champagne-500/60 mb-6">
          SYSTEM
        </div>
        {lines.map((line, i) => (
          <motion.p
            key={i}
            className={`font-serif italic ${i === 0 ? 'text-2xl md:text-3xl text-ivory-100' : 'text-lg md:text-xl text-ivory-200/70'} mb-3`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.4, duration: 0.6 }}
          >
            {line}
          </motion.p>
        ))}
        <motion.div
          className="mt-6 text-xs font-mono text-silver-500/40 tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 + lines.length * 0.4 }}
        >
          TAP TO DISMISS
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
