import { Music, Music2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MusicToggleProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export function MusicToggle({ isPlaying, onToggle }: MusicToggleProps): JSX.Element {
  return (
    <motion.button
      onClick={onToggle}
      className="fixed top-6 right-6 z-[200] flex items-center gap-2 px-4 py-2.5 rounded-full card-glass transition-all duration-300 hover:glow-soft group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
    >
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.div
            key="playing"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            className="flex items-center gap-2"
          >
            <Music2 className="w-4 h-4 text-champagne-500" />
            <span className="text-xs font-mono text-champagne-400/80 tracking-widest">
              SOUND ON
            </span>
            <span className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 bg-champagne-500 animate-pulse" style={{ height: '40%', animationDuration: '0.8s' }} />
              <span className="w-0.5 bg-champagne-500 animate-pulse" style={{ height: '70%', animationDuration: '1.1s' }} />
              <span className="w-0.5 bg-champagne-500 animate-pulse" style={{ height: '50%', animationDuration: '0.6s' }} />
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="paused"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            className="flex items-center gap-2"
          >
            <Music className="w-4 h-4 text-silver-500" />
            <span className="text-xs font-mono text-silver-500/60 tracking-widest">
              SOUND OFF
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
