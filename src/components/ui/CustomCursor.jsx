import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * CustomCursor — A custom cursor trail that uses Framer Motion spring physics.
 * Adapts size and appearance dynamically when hovering links, buttons, or cards.
 */
export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverText, setHoverText] = useState('');

  // Cursor positions
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for a fluid, lag-behind trail effect
  const springConfig = { stiffness: 350, damping: 28, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable custom cursor on devices that support hover (e.g. mouse pointers)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    setIsVisible(true);

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Dynamic hover state delegation
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const interactive = target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer');
      const isCard = target.closest('[data-tilt-card]');

      if (interactive) {
        setIsHovered(true);
        if (interactive.tagName === 'A' && interactive.getAttribute('href')?.startsWith('#')) {
          setHoverText('SCROLL');
        } else if (interactive.classList.contains('group') && interactive.textContent.includes('Demo')) {
          setHoverText('LIVE');
        } else {
          setHoverText('');
        }
      } else if (isCard) {
        setIsHovered(true);
        setHoverText('VIEW');
      } else {
        setIsHovered(false);
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer ring cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#22c55e] pointer-events-none z-[9999] mix-blend-screen -translate-x-1/2 -translate-y-1/2 will-change-transform flex items-center justify-center"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          scale: isClicking ? 0.7 : isHovered ? 1.6 : 1,
          backgroundColor: isHovered ? 'rgba(34, 197, 94, 0.08)' : 'rgba(34, 197, 94, 0)',
          borderColor: isHovered ? 'rgba(34, 197, 94, 0.6)' : 'rgba(34, 197, 94, 0.45)',
          boxShadow: isHovered ? '0 0 16px rgba(34, 197, 94, 0.2)' : 'none',
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      >
        {hoverText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[6px] font-mono font-black tracking-widest text-[#22c55e]"
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>

      {/* Inner dot cursor */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#22c55e] pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovered ? 0.4 : 1,
          opacity: isClicking ? 0.5 : 1,
        }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
}
