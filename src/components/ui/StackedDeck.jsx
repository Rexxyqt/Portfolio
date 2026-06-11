import { useRef, useMemo, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * StackedDeck — A premium 3D card-stack scroll system.
 * Creates a sticky viewport where each page slides in from below like
 * a physical card being placed on top of the stack, with realistic
 * 3D rotation, scale, blur, and overlay shadow effects.
 */
export default function StackedDeck({ pages }) {
  const containerRef = useRef(null);
  const count = pages.length;

  // The outer scroll track height: 100vh per card + 1 extra to finish
  const trackHeight = `${(count + 0.5) * 100}vh`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 22,
    mass: 0.3,
  });

  return (
    <div ref={containerRef} style={{ height: trackHeight }} className="relative w-full">
      {/* Sticky viewport — cards live here */}
      <div className="sticky top-0 h-screen w-full overflow-hidden perspective-1400">
        {pages.map((page, i) => (
          <DeckCard
            key={i}
            index={i}
            total={count}
            scrollProgress={smoothProgress}
          >
            {page.content}
          </DeckCard>
        ))}
      </div>
    </div>
  );
}

/* ── Individual Card with 3D entry / exit animations ── */
function DeckCard({ children, index, total, scrollProgress }) {
  // Each card occupies 1/(total) of the scroll range
  const cardStart  = index / total;
  const cardCenter = (index + 0.5) / total;
  const cardEnd    = (index + 1) / total;

  // Y: slide in from +120vh, sit at 0, exit to -105vh
  const y = useTransform(scrollProgress,
    [cardStart - 1 / total, cardStart, cardCenter, cardEnd, cardEnd + 0.001],
    ['120vh', '0vh', '0vh', '-105vh', '-105vh']
  );

  // 3D Rotation: tilt back on entry, flat while active, tilt forward on exit
  const rotateX = useTransform(scrollProgress,
    [cardStart - 1 / total, cardStart, cardCenter - 0.02, cardCenter, cardEnd - 0.05, cardEnd],
    [22, 8, 0, 0, -2, -18]
  );

  // Scale: slightly smaller on enter/exit
  const scale = useTransform(scrollProgress,
    [cardStart - 1 / total, cardStart, cardCenter, cardEnd, cardEnd + 0.001],
    [0.9, 0.97, 1, 1, 1]
  );

  // Opacity: fade in, full, fade out top
  const opacity = useTransform(scrollProgress,
    [cardStart - 1 / total, cardStart, cardCenter, cardEnd - 0.05, cardEnd],
    [0, 1, 1, 1, 0]
  );

  // Blur: smear on entry, clear in center, blurs a tiny bit on exit
  const blurVal = useTransform(scrollProgress,
    [cardStart - 1 / total, cardStart, cardCenter - 0.03, cardCenter, cardEnd],
    [12, 3, 0, 0, 0]
  );
  const filter = useTransform(blurVal, v => `blur(${v}px)`);

  // Overlay shadow fade (makes it look like cards below get darkened)
  const overlayOpacity = useTransform(scrollProgress,
    [cardCenter, cardEnd],
    [0, 0.55]
  );

  return (
    <motion.div
      className="absolute inset-0 w-full h-full preserve-3d will-change-transform"
      style={{ y, rotateX, scale, opacity, filter, transformOrigin: 'center bottom', zIndex: index + 1 }}
    >
      {/* Card body */}
      <div className="relative w-full h-full overflow-y-auto overflow-x-hidden card-stack-shadow bg-[#030303] rounded-t-2xl">
        {/* Top highlight rim — makes it look like a physical card edge */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-50" />

        {/* Corner Indices */}
        <span className="absolute top-4 right-6 font-mono text-[10px] text-white/10 tracking-widest z-50 select-none">
          {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
        </span>

        {/* Content */}
        {children}

        {/* Exit overlay shadow — darkens card as next card slides over */}
        <motion.div
          className="absolute inset-0 bg-black pointer-events-none z-40 rounded-t-2xl"
          style={{ opacity: overlayOpacity }}
        />
      </div>
    </motion.div>
  );
}
