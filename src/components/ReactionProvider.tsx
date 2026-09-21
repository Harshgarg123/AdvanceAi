import { useState, useCallback, createContext, useContext, ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTENT } from '@/data/content';

interface ReactionContextValue {
  showReactionPrompt: () => void;
  showCustomReaction: (lines: string[]) => void;
  triggerEasterEgg: (key: string) => void;
  registerAliasClick: (alias: string) => void;
  reactionLog: string[];
}

const ReactionContext = createContext<ReactionContextValue | null>(null);

export function useReaction(): ReactionContextValue {
  const ctx = useContext(ReactionContext);
  if (!ctx) throw new Error('useReaction must be used within ReactionProvider');
  return ctx;
}

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export function ReactionProvider({ children }: { children: ReactNode }): JSX.Element {
  const [overlay, setOverlay] = useState<{ type: 'prompt' | 'custom' | 'easter'; lines: string[] } | null>(null);
  const [, setAliasClicks] = useState<Record<string, number>>({});
  const [, setChupppSpamCount] = useState(0);
  const [reactionLog, setReactionLog] = useState<string[]>([]);

  // Konami code listener
  useEffect(() => {
    let buf: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      buf = [...buf, e.key].slice(-KONAMI.length);
      if (buf.length === KONAMI.length && buf.every((k, i) => k.toLowerCase() === KONAMI[i].toLowerCase())) {
        setOverlay({
          type: 'easter',
          lines: ['KONAMI CODE ACTIVATED.', 'You found the secret.', 'Okay, you are officially cooler than this website.'],
        });
        setReactionLog((prev) => [...prev, 'KONAMI_CODE']);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const showReactionPrompt = useCallback(() => {
    setOverlay({ type: 'prompt', lines: [CONTENT.reactions.systemPrompt] });
  }, []);

  const showCustomReaction = useCallback((lines: string[]) => {
    setOverlay({ type: 'custom', lines });
  }, []);

  const triggerEasterEgg = useCallback((key: string) => {
    if (key === 'youneedhelp') {
      setOverlay({ type: 'easter', lines: [CONTENT.easterEggs.youNeedHelp] });
      setReactionLog((prev) => [...prev, 'YOU_NEED_HELP']);
    } else if (key === 'maardungi') {
      setOverlay({ type: 'easter', lines: [...CONTENT.easterEggs.maarDungi] });
      setReactionLog((prev) => [...prev, 'MAAR_DUNGI']);
    }
  }, []);

  const registerAliasClick = useCallback((alias: string) => {
    setAliasClicks((prev) => {
      const newCount = (prev[alias] || 0) + 1;
      if (alias === 'Beboo' && newCount === 3) {
        setOverlay({ type: 'easter', lines: [CONTENT.easterEggs.bebooClicks[3]] });
        setReactionLog((prevLog) => [...prevLog, 'BEEBO_TRIPLE']);
      }
      if (alias === 'Chuppp' || alias === 'chuppp') {
        setChupppSpamCount((c) => {
          const newC = c + 1;
          if (newC >= 5) {
            setOverlay({ type: 'easter', lines: [CONTENT.easterEggs.chupppSpam] });
            setReactionLog((prevLog) => [...prevLog, 'CHUPPP_SPAM']);
          }
          return newC;
        });
      }
      return { ...prev, [alias]: newCount };
    });
  }, []);

  const dismiss = useCallback(() => {
    setOverlay(null);
  }, []);

  const handlePromptChoice = useCallback((choice: string) => {
    if (choice === 'Chuppp.') {
      setOverlay({ type: 'custom', lines: [...CONTENT.reactions.chupppResponse] });
      setReactionLog((prev) => [...prev, 'CHUPPP']);
    } else if (choice === 'You need help.') {
      setOverlay({ type: 'custom', lines: [...CONTENT.reactions.helpResponse] });
      setReactionLog((prev) => [...prev, 'HELP']);
    } else if (choice === "I'm done with this guy.") {
      setOverlay({ type: 'custom', lines: [...CONTENT.reactions.doneResponse] });
      setReactionLog((prev) => [...prev, 'DONE']);
    }
  }, []);

  return (
    <ReactionContext.Provider value={{ showReactionPrompt, showCustomReaction, triggerEasterEgg, registerAliasClick, reactionLog }}>
      {children}
      <AnimatePresence>
        {overlay && (
          <motion.div
            className="fixed inset-0 z-[400] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
          >
            <div className="absolute inset-0 bg-ink-950/85 backdrop-blur-md" />
            <motion.div
              className="relative max-w-md mx-4 text-center"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-xs font-mono tracking-ultra-wide text-champagne-500/50 mb-6 uppercase">
                {overlay.type === 'easter' ? 'EASTER EGG' : 'SYSTEM'}
              </div>

              {overlay.type === 'prompt' ? (
                <>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-2xl md:text-3xl font-serif italic text-ivory-100 mb-8"
                  >
                    {overlay.lines[0]}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col gap-3 max-w-xs mx-auto"
                  >
                    {CONTENT.reactions.options.map((option) => (
                      <motion.button
                        key={option}
                        onClick={(e) => { e.stopPropagation(); handlePromptChoice(option); }}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className="px-6 py-3 rounded-full border border-champagne-500/25 bg-ink-800/60 text-sm font-mono tracking-widest text-ivory-200/80 hover:border-champagne-500/50 hover:text-champagne-400 transition-all duration-300"
                      >
                        {option}
                      </motion.button>
                    ))}
                  </motion.div>
                </>
              ) : (
                <>
                  {overlay.lines.map((line, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.4, duration: 0.6 }}
                      className={`font-serif italic mb-3 ${
                        i === 0 ? 'text-2xl md:text-3xl text-ivory-100' : 'text-base md:text-lg text-ivory-200/60'
                      }`}
                    >
                      {line}
                    </motion.p>
                  ))}
                </>
              )}

              <motion.div
                className="mt-6 text-xs font-mono text-silver-500/30 tracking-widest"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + overlay.lines.length * 0.4 }}
              >
                {overlay.type === 'prompt' ? 'CHOOSE WISELY' : 'TAP TO DISMISS'}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ReactionContext.Provider>
  );
}
