import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * CardTilt — A container that tracks the user's mouse position and tilts
 * its child elements in 3D space. Creates a high-end, tactile depth effect.
 */
export default function CardTilt({ children, className = '', tiltScale = 1.02 }) {
  const ref = useRef(null);

  // Normalized values: range from -0.5 to 0.5
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring animations for inertia
  const springX = useSpring(x, { stiffness: 220, damping: 25 });
  const springY = useSpring(y, { stiffness: 220, damping: 25 });

  // Map coordinates to angle bounds: -10 to 10 degrees
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    
    // Position of cursor relative to element bounding box
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalize coordinates (-0.5 to 0.5)
    const relativeX = mouseX / rect.width - 0.5;
    const relativeY = mouseY / rect.height - 0.5;

    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: tiltScale }}
      className={`perspective-1000 ${className}`}
      data-tilt-card="true"
    >
      <div style={{ transform: 'translateZ(0px)', transformStyle: 'preserve-3d', height: '100%', width: '100%' }}>
        {children}
      </div>
    </motion.div>
  );
}
