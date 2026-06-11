import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * PageScrollWrapper — Wraps a main section page and tracks its scroll progress
 * relative to the viewport. Appends 3D rotation, scaling, blurring, fading,
 * and vertical offset to make scrolling feel like a rotating 3D roller-deck.
 */
export default function PageScrollWrapper({ children, id }) {
  const ref = useRef(null);

  // Track the scroll progress of the container relative to the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Spring animation to make transitions buttery smooth
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 25,
    mass: 0.25
  });

  // 1. 3D rotation: rotates backwards on entry, flat at center, rotates forward on exit
  const rotateX = useTransform(smoothProgress, [0, 0.45, 0.55, 1], [15, 0, 0, -15]);

  // 2. Scale: slightly smaller on entry/exit, full size at center
  const scale = useTransform(smoothProgress, [0, 0.45, 0.55, 1], [0.93, 1, 1, 0.93]);

  // 3. Opacity: fades in on entry, fades out on exit
  const opacity = useTransform(smoothProgress, [0, 0.25, 0.75, 1], [0.05, 1, 1, 0.05]);

  // 4. Blur filter: blurred on entry/exit, clear at center
  const blurVal = useTransform(smoothProgress, [0, 0.35, 0.65, 1], [6, 0, 0, 6]);
  const filter = useTransform(blurVal, (v) => `blur(${v}px)`);

  // 5. Y offset: slide up on entry, slide up on exit (parallax separation)
  const y = useTransform(smoothProgress, [0, 0.45, 0.55, 1], [80, 0, 0, -80]);

  return (
    <div
      ref={ref}
      id={id}
      className="relative w-full min-h-screen flex items-center justify-center py-20 scroll-mt-20 perspective-1000 overflow-hidden"
    >
      <motion.div
        style={{
          rotateX,
          scale,
          opacity,
          filter,
          y,
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
