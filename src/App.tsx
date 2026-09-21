import { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CustomCursor } from '@/components/CustomCursor';
import { ClickSparkle } from '@/components/ClickSparkle';
import { GrainOverlay } from '@/components/GrainOverlay';
import { MusicToggle } from '@/components/MusicToggle';
import { ChapterNav } from '@/components/ChapterNav';
import { ReactionProvider, useReaction } from '@/components/ReactionProvider';
import { Opening } from '@/chapters/Opening';
import { SubjectProfile } from '@/chapters/SubjectProfile';
import { NameGenerator } from '@/chapters/NameGenerator';
import { Investigation } from '@/chapters/Investigation';
import { EvidenceArchive } from '@/chapters/EvidenceArchive';
import { Simulator } from '@/chapters/Simulator';
import { ChatLog } from '@/chapters/ChatLog';
import { MansiAlgorithm } from '@/chapters/MansiAlgorithm';
import { TheQuestion } from '@/chapters/TheQuestion';
import { RealReason } from '@/chapters/RealReason';
import { MemoryTimeline } from '@/chapters/MemoryTimeline';
import { ThingsILike } from '@/chapters/ThingsILike';
import { IfYouWere } from '@/chapters/IfYouWere';
import { TheMessage } from '@/chapters/TheMessage';
import { Constellation } from '@/chapters/Constellation';
import { TheSecret } from '@/chapters/TheSecret';
import { FinalTrap } from '@/chapters/FinalTrap';
import { FinalScene } from '@/chapters/FinalScene';
import { useMusic } from '@/hooks/useMusic';

const CHAPTERS = [
  { id: 'profile', label: 'Subject Profile' },
  { id: 'name-generator', label: 'Name Generator' },
  { id: 'investigation', label: 'Investigation' },
  { id: 'evidence', label: 'Evidence' },
  { id: 'simulator', label: 'Simulator' },
  { id: 'chat-log', label: 'Chat Log' },
  { id: 'algorithm', label: 'Algorithm' },
  { id: 'question', label: 'The Question' },
  { id: 'real-reason', label: 'The Real Reason' },
  { id: 'memory-timeline', label: 'Little Moments' },
  { id: 'things-i-like', label: 'For The Record' },
  { id: 'if-you-were', label: 'If You Were' },
  { id: 'message', label: 'The Message' },
  { id: 'constellation', label: 'The Constellation' },
  { id: 'secret', label: 'The Secret' },
  { id: 'final-trap', label: 'Final Trap' },
  { id: 'final-scene', label: 'Final Scene' },
];

// Chapters that trigger a reaction prompt after being viewed
const REACTION_TRIGGERS = new Set(['profile', 'investigation', 'evidence', 'simulator', 'chat-log', 'algorithm']);

function Experience(): JSX.Element {
  const [entered, setEntered] = useState(false);
  const { showReactionPrompt } = useReaction();
  const { isPlaying, toggle, setMood } = useMusic();
  const lastTriggeredChapter = useRef<string | null>(null);

  // Shift music mood based on scroll position
  useEffect(() => {
    if (!entered) return;
    const onScroll = () => {
      const scrollY = window.scrollY;
      const winH = window.innerHeight;
      const section = Math.floor(scrollY / winH);
      if (section >= 8) {
        setMood('emotional');
      } else if (section >= 4) {
        setMood('playful');
      } else {
        setMood('neutral');
      }

      // Trigger reaction prompts based on which chapter is centered
      const center = scrollY + winH / 2;
      for (const ch of CHAPTERS) {
        const el = document.getElementById(ch.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const elTop = rect.top + scrollY;
        const elBottom = elTop + rect.height;
        if (center >= elTop && center <= elBottom) {
          if (REACTION_TRIGGERS.has(ch.id) && lastTriggeredChapter.current !== ch.id) {
            lastTriggeredChapter.current = ch.id;
            // Delay the reaction prompt so it feels like a response, not an interruption
            setTimeout(() => showReactionPrompt(), 1500);
          }
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [entered, setMood, showReactionPrompt]);

  const handleEnter = useCallback(() => {
    setEntered(true);
  }, []);

  return (
    <>
      <CustomCursor />
      <ClickSparkle />
      <GrainOverlay />

      {entered && <MusicToggle isPlaying={isPlaying} onToggle={toggle} />}
      {entered && <ChapterNav chapters={CHAPTERS} />}

      <AnimatePresence>
        {!entered && <Opening onEnter={handleEnter} />}
      </AnimatePresence>

      {entered && (
        <main className="relative">
          <SubjectProfile />
          <NameGenerator />
          <Investigation />
          <EvidenceArchive />
          <Simulator />
          <ChatLog />
          <MansiAlgorithm />
          <TheQuestion />
          <RealReason />
          <MemoryTimeline />
          <ThingsILike />
          <IfYouWere />
          <TheMessage />
          <Constellation />
          <TheSecret />
          <FinalTrap />
          <FinalScene />
        </main>
      )}
    </>
  );
}

export default function App(): JSX.Element {
  return (
    <ReactionProvider>
      <Experience />
    </ReactionProvider>
  );
}
