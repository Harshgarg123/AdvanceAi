import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper, ChapterLabel } from '@/components/ui';
import { ScrollHint } from '@/components/ScrollHint';
import { CONTENT } from '@/data/content';
import { Camera } from 'lucide-react';
import thirdPhoto from './Screenshot 2026-09-12 155125.png';
import firstPhoto from './WhatsApp Image 2026-09-12 at 3.56.52 PM (2).jpeg'
import secondPhoto from './WhatsApp Image 2026-09-12 at 3.56.52 PM (11).jpeg'
import fourthPhoto from './Yrrrr Pani Puri and Momos kitte mst lg rhe (6).png'
const PHOTO_URLS = [
  firstPhoto,
  secondPhoto,
  thirdPhoto,
  fourthPhoto,
];

function EvidenceCard({ photo, index }: { photo: typeof CONTENT.evidence.photos[number]; index: number }): JSX.Element {
  const [loaded, setLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -6, y: dx * 6 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.2s ease-out',
      }}
      className="group relative card-glass card-glass-hover rounded-xl overflow-hidden"
      data-cursor="hover"
    >
      {/* Image with masked reveal */}
      <div className="relative aspect-[3/4] overflow-hidden">
        {!loaded && (
          <div className="absolute inset-0 bg-ink-700 animate-pulse flex items-center justify-center">
            <Camera className="w-8 h-8 text-silver-500/20" />
          </div>
        )}
        <motion.img
          src={PHOTO_URLS[index]}
          alt={`FILE_${photo.id}`}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setLoaded(true)}
          loading="lazy"
        />
        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/40 via-transparent to-transparent" />

        {/* Scan line effect on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-champagne-500/30 shadow-[0_0_10px_rgba(212,175,55,0.3)]" 
            style={{ animation: 'scanLine 2s linear infinite' }} 
          />
        </motion.div>
      </div>

      {/* Metadata */}
      <div className="absolute top-0 left-0 right-0 p-5 z-10">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono tracking-widest text-champagne-500/60">
            FILE_{photo.id}
          </span>
          <span className="text-xs font-mono text-silver-500/40">
            EVIDENCE
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <div className="text-xs font-mono tracking-widest text-silver-500/40 uppercase mb-1">
          Subject
        </div>
        <div className="text-lg font-serif italic text-ivory-50 mb-3">{photo.subject}</div>
        <div className="text-xs font-mono tracking-widest text-silver-500/40 uppercase mb-1">
          Status
        </div>
        <div className="text-sm font-serif italic text-champagne-400/70">{photo.status}</div>
      </div>
    </motion.div>
  );
}

export function EvidenceArchive(): JSX.Element {
  const c = CONTENT.evidence;

  return (
    <SectionWrapper className="bg-ink-900 py-20" id="evidence">
      <div className="max-w-6xl w-full px-6">
        <ChapterLabel label="CHAPTER 04 — EVIDENCE ARCHIVE" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-serif text-ivory-50 mb-6 text-shadow-cinematic"
        >
          {c.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl font-serif italic text-ivory-200/60 mb-16 max-w-2xl"
        >
          {c.subtitle}
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {c.photos.map((photo, i) => (
            <EvidenceCard key={photo.id} photo={photo} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-xs font-mono text-silver-500/30 tracking-widest uppercase"
        >
          More evidence classified. Pending declassification.
        </motion.p>

        <ScrollHint className="mt-16 mx-auto" />
      </div>
    </SectionWrapper>
  );
}
