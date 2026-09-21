import { motion } from 'framer-motion';

interface ScrollHintProps {
  className?: string;
}

export function ScrollHint({ className = '' }: ScrollHintProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 1.5 }}
      className={`flex flex-col items-center gap-2 ${className}`}
    >
      <span className="text-xs font-mono tracking-ultra-wide text-silver-500/30 uppercase">
        Scroll
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="w-px h-8 bg-gradient-to-b from-champagne-500/40 to-transparent"
      />
    </motion.div>
  );
}
