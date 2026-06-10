import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * AnimatedSection — triggers enter animation when element scrolls into view.
 * Replaces hash-change based trigger with IntersectionObserver.
 */
const AnimatedSection = ({
  children,
  className = '',
  delay = 0,
  direction = 'up', // 'up' | 'down' | 'left' | 'right' | 'scale' | 'none'
  threshold = 0.15,
  once = true,
}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold]);

  const variants = {
    up:    { hidden: { opacity: 0, y: 48 },    visible: { opacity: 1, y: 0 } },
    down:  { hidden: { opacity: 0, y: -48 },   visible: { opacity: 1, y: 0 } },
    left:  { hidden: { opacity: 0, x: -48 },   visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 48 },    visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.88 }, visible: { opacity: 1, scale: 1 } },
    none:  { hidden: { opacity: 0 },           visible: { opacity: 1 } },
  };

  const v = variants[direction] || variants.up;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={v}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
