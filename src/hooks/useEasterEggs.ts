import { useState, useRef, useCallback } from 'react';
import { CONTENT } from '@/data/content';

export function useEasterEggs(): {
  triggerReaction: (key: string) => string[];
  bebooClickCount: number;
  incrementBebooClick: () => string | null;
  chupppClickCount: number;
  incrementChupppClick: () => string | null;
} {
  const [bebooClickCount, setBebooClickCount] = useState(0);
  const [chupppClickCount, setChupppClickCount] = useState(0);
  const bebooTriggeredRef = useRef(false);

  const triggerReaction = useCallback((key: string): string[] => {
    if (key === 'chuppp') {
      return [...CONTENT.reactions.chupppResponse];
    }
    if (key === 'youneedhelp') {
      return [...CONTENT.reactions.helpResponse];
    }
    if (key === 'done') {
      return [...CONTENT.reactions.doneResponse];
    }
    if (key === 'maardungi') {
      return [...CONTENT.easterEggs.maarDungi];
    }
    return [];
  }, []);

  const incrementBebooClick = useCallback((): string | null => {
    const newCount = bebooClickCount + 1;
    setBebooClickCount(newCount);
    if (newCount >= 3 && !bebooTriggeredRef.current) {
      bebooTriggeredRef.current = true;
      return CONTENT.easterEggs.bebooClicks[3];
    }
    return null;
  }, [bebooClickCount]);

  const incrementChupppClick = useCallback((): string | null => {
    const newCount = chupppClickCount + 1;
    setChupppClickCount(newCount);
    if (newCount >= 5) {
      return CONTENT.easterEggs.chupppSpam;
    }
    return null;
  }, [chupppClickCount]);

  return {
    triggerReaction,
    bebooClickCount,
    incrementBebooClick,
    chupppClickCount,
    incrementChupppClick,
  };
}
