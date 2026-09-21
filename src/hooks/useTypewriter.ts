import { useState, useEffect, useRef, useCallback } from 'react';

export function useTypewriter(text: string, speed = 45, startDelay = 0): {
  displayedText: string;
  isDone: boolean;
  skip: () => void;
} {
  const [displayedText, setDisplayedText] = useState('');
  const [isDone, setIsDone] = useState(false);
  const indexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skippedRef = useRef(false);

  const skip = useCallback(() => {
    if (skippedRef.current) return;
    skippedRef.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDisplayedText(text);
    setIsDone(true);
  }, [text]);

  useEffect(() => {
    setDisplayedText('');
    setIsDone(false);
    indexRef.current = 0;
    skippedRef.current = false;

    const startTimer = setTimeout(() => {
      const tick = () => {
        if (skippedRef.current) return;
        if (indexRef.current < text.length) {
          const next = text[indexRef.current];
          setDisplayedText((prev) => prev + next);
          indexRef.current += 1;
          timeoutRef.current = setTimeout(tick, next === '.' || next === ',' ? speed * 4 : speed);
        } else {
          setIsDone(true);
        }
      };
      tick();
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, speed, startDelay]);

  return { displayedText, isDone, skip };
}

export function useDelayedSequence(steps: string[], baseDelay = 800): {
  visibleSteps: string[];
  isDone: boolean;
  skip: () => void;
} {
  const [visibleSteps, setVisibleSteps] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const skippedRef = useRef(false);

  const skip = useCallback(() => {
    if (skippedRef.current) return;
    skippedRef.current = true;
    timersRef.current.forEach(clearTimeout);
    setVisibleSteps(steps);
    setIsDone(true);
  }, [steps]);

  useEffect(() => {
    setVisibleSteps([]);
    setIsDone(false);
    skippedRef.current = false;
    timersRef.current = [];

    steps.forEach((step, i) => {
      const timer = setTimeout(() => {
        if (skippedRef.current) return;
        setVisibleSteps((prev) => [...prev, step]);
        if (i === steps.length - 1) setIsDone(true);
      }, baseDelay * (i + 1));
      timersRef.current.push(timer);
    });

    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, [steps, baseDelay]);

  return { visibleSteps, isDone, skip };
}

export function useSequence(steps: { text: string; delay: number }[]): {
  visibleSteps: string[];
  isDone: boolean;
  skip: () => void;
} {
  const [visibleSteps, setVisibleSteps] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const skippedRef = useRef(false);

  const skip = useCallback(() => {
    if (skippedRef.current) return;
    skippedRef.current = true;
    timersRef.current.forEach(clearTimeout);
    setVisibleSteps(steps.map((s) => s.text));
    setIsDone(true);
  }, [steps]);

  useEffect(() => {
    setVisibleSteps([]);
    setIsDone(false);
    skippedRef.current = false;
    timersRef.current = [];

    let cumulative = 0;
    steps.forEach((step, i) => {
      cumulative += step.delay;
      const timer = setTimeout(() => {
        if (skippedRef.current) return;
        setVisibleSteps((prev) => [...prev, step.text]);
        if (i === steps.length - 1) setIsDone(true);
      }, cumulative);
      timersRef.current.push(timer);
    });

    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, [steps]);

  return { visibleSteps, isDone, skip };
}
