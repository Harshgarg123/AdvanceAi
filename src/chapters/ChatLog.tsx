import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper, ChapterLabel } from '@/components/ui';
import { CONTENT } from '@/data/content';

interface ChatMessage {
  from: 'unknown' | 'mansi';
  text: string;
}

export function ChatLog(): JSX.Element {
  const c = CONTENT.chatLog;
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  const messages = c.messages as readonly ChatMessage[];

  const startSequence = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    messages.forEach((_, i) => {
      setTimeout(() => {
        setVisibleMessages(i + 1);
      }, 800 * (i + 1));
    });

    setTimeout(() => {
      setShowAnalysis(true);
    }, 800 * (messages.length + 1));

    const analysisTexts = [c.analysis, c.conclusion, c.result1, c.result2];
    analysisTexts.forEach((_, i) => {
      setTimeout(() => {
        setAnalysisStep(i + 1);
      }, 800 * (messages.length + 1) + 1200 * (i + 1));
    });
  }, [messages, c]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            startSequence();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [startSequence]);

  const analysisTexts = [c.analysis, c.conclusion, c.result1, c.result2];

  return (
    <SectionWrapper className="bg-ink-900 py-20" id="chat-log">
      <div ref={sectionRef} className="max-w-2xl w-full px-6">
        <ChapterLabel label="CHAPTER 06 — COMMUNICATION LOG" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-serif text-ivory-50 mb-12 text-shadow-cinematic"
        >
          TRANSMISSION RECORD
        </motion.h2>

        {/* Chat container */}
        <div className="card-glass rounded-2xl p-4 md:p-8 mb-6 min-h-[300px]">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-champagne-500/10">
            <div className="w-2 h-2 rounded-full bg-burgundy-500 animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-silver-500/50 uppercase">
              ENCRYPTED CHANNEL — CLASSIFIED
            </span>
          </div>

          <div className="space-y-4">
            {messages.slice(0, visibleMessages).map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15, x: msg.from === 'mansi' ? 20 : -20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`flex flex-col ${msg.from === 'mansi' ? 'items-end' : 'items-start'}`}
              >
                <span className="text-xs font-mono tracking-widest text-silver-500/40 uppercase mb-1 px-2">
                  {msg.from === 'mansi' ? 'Mansi' : 'Unknown idiot'}
                </span>
                <div
                  className={`px-4 py-2.5 rounded-2xl max-w-[80%] ${
                    msg.from === 'mansi'
                      ? 'bg-burgundy-900/40 border border-burgundy-500/20 rounded-tr-sm'
                      : 'bg-ink-700/40 border border-champagne-500/15 rounded-tl-sm'
                  }`}
                >
                  <p className={`text-base font-serif ${
                    msg.from === 'mansi'
                      ? msg.text === 'MAAR DUNGI.'
                        ? 'text-burgundy-500 font-bold text-lg'
                        : 'text-ivory-100'
                      : 'text-champagne-400/80 italic'
                  }`}>
                    {msg.text}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Typing indicator */}
            {visibleMessages < messages.length && visibleMessages > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`flex flex-col ${messages[visibleMessages]?.from === 'mansi' ? 'items-end' : 'items-start'}`}
              >
                <span className="text-xs font-mono tracking-widest text-silver-500/40 uppercase mb-1 px-2">
                  {messages[visibleMessages]?.from === 'mansi' ? 'Mansi' : 'Unknown idiot'}
                </span>
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    messages[visibleMessages]?.from === 'mansi'
                      ? 'bg-burgundy-900/40 border border-burgundy-500/20 rounded-tr-sm'
                      : 'bg-ink-700/40 border border-champagne-500/15 rounded-tl-sm'
                  }`}
                >
                  <div className="flex gap-1">
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        className="w-1.5 h-1.5 rounded-full bg-silver-500/40"
                        animate={{ opacity: [0.2, 0.7, 0.2], y: [0, -3, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: dot * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Analysis */}
          <AnimatePresence>
            {showAnalysis && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 pt-6 border-t border-champagne-500/15 space-y-3"
              >
                <div className="text-xs font-mono tracking-widest text-champagne-500/50 uppercase mb-2">
                  SYSTEM
                </div>
                {analysisTexts.slice(0, analysisStep).map((text, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`font-serif ${
                      i < 2
                        ? 'text-sm text-silver-500/60 tracking-wide'
                        : i === 2
                        ? 'text-base text-ivory-200/70 italic'
                        : 'text-lg text-champagne-400/80 italic'
                    }`}
                  >
                    {text}
                  </motion.p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  );
}
