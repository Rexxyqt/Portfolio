import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Magnetic — A spring-animated container that pulls interactive elements
 * (buttons, social links, headers) towards the user's cursor when hovered.
 */
export default function Magnetic({ children, range = 50, strength = 0.35, className = '' }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = el.getBoundingClientRect();
    
    // Middle point of element
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Delta relative to center
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    const distance = Math.hypot(deltaX, deltaY);

    if (distance < range) {
      // Pull element toward cursor based on distance
      setPosition({ x: deltaX * strength, y: deltaY * strength });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 120, damping: 15, mass: 0.1 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
