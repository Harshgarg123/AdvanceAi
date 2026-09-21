import { useState, useRef, useCallback, useEffect } from 'react';

type Mood = 'neutral' | 'playful' | 'emotional';

export function useMusic(): {
  isPlaying: boolean;
  toggle: () => void;
  mood: Mood;
  setMood: (m: Mood) => void;
} {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mood, setMood] = useState<Mood>('neutral');
  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const nodesRef = useRef<AudioNode[]>([]);
  const moodRef = useRef<Mood>('neutral');

  const stopAll = useCallback(() => {
    nodesRef.current.forEach((node) => {
      try {
        const osc = node as OscillatorNode;
        if (osc.stop) osc.stop();
      } catch {
        // already stopped
      }
    });
    nodesRef.current = [];
  }, []);

  const buildGraph = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master) return;

    stopAll();

    const now = ctx.currentTime;
    const m = moodRef.current;

    // Ambient drone
    const droneFreqs = m === 'emotional' ? [110, 165, 220] : [130.81, 196, 261.63];
    const droneGain = m === 'emotional' ? 0.04 : 0.03;

    droneFreqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(droneGain, now + 3);
      // subtle LFO
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.1 + i * 0.05;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 2;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      osc.connect(gain);
      gain.connect(master);
      osc.start(now);
      lfo.start(now);
      nodesRef.current.push(osc, lfo);
    });

    // Soft piano-like notes — gentle arpeggio
    const baseNotes = m === 'emotional'
      ? [523.25, 659.25, 783.99, 659.25, 523.25, 659.25, 783.99, 1046.5]
      : [392, 523.25, 659.25, 783.99, 659.25, 523.25];

    const interval = m === 'emotional' ? 2.5 : 3.5;

    const playNote = (freq: number, startTime: number, dur: number) => {
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.06, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + dur);

      // soft filter
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 2000;
      filter.Q.value = 0.5;

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(master);
      osc.start(startTime);
      osc.stop(startTime + dur + 0.1);
    };

    // schedule first batch
    baseNotes.forEach((note, i) => {
      playNote(note, now + i * interval, interval * 0.9);
    });

    // schedule repeating
    const totalCycle = baseNotes.length * interval;
    let cycleStart = now + totalCycle;
    const maxCycles = 20;
    for (let c = 0; c < maxCycles; c++) {
      baseNotes.forEach((note, i) => {
        playNote(note, cycleStart + i * interval, interval * 0.9);
      });
      cycleStart += totalCycle;
    }
  }, [stopAll]);

  const toggle = useCallback(() => {
    if (isPlaying) {
      // fade out
      const master = masterGainRef.current;
      const ctx = ctxRef.current;
      if (master && ctx) {
        master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
        setTimeout(() => {
          stopAll();
          if (ctx.state !== 'closed') ctx.suspend();
        }, 600);
      }
      setIsPlaying(false);
    } else {
      if (!ctxRef.current) {
        const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        ctxRef.current = new Ctor();
        masterGainRef.current = ctxRef.current.createGain();
        masterGainRef.current.gain.value = 0;
        masterGainRef.current.connect(ctxRef.current.destination);
      }
      const ctx = ctxRef.current;
      const master = masterGainRef.current;
      if (!master) return;
      ctx.resume().then(() => {
        master.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 1);
        buildGraph();
      });
      setIsPlaying(true);
    }
  }, [isPlaying, buildGraph, stopAll]);

  // rebuild on mood change
  useEffect(() => {
    moodRef.current = mood;
    if (isPlaying) {
      const master = masterGainRef.current;
      const ctx = ctxRef.current;
      if (master && ctx) {
        master.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 1);
        setTimeout(() => buildGraph(), 1200);
      }
    }
  }, [mood, isPlaying, buildGraph]);

  return { isPlaying, toggle, mood, setMood };
}
