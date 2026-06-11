import { motion } from 'framer-motion';

/**
 * TextReveal — Splits a text string into individual words and reveals them
 * using scroll triggering. Staggers child words with spring dynamics.
 */
export default function TextReveal({ text, className = '', once = false, delay = 0 }) {
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.05, 
        delayChildren: delay 
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: '110%',
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1], // Premium easeOutQuint
      },
    },
  };

  return (
    <motion.span
      style={{ overflow: 'hidden', display: 'inline-flex', flexWrap: 'wrap' }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-80px' }}
      className={className}
    >
      {words.map((word, idx) => (
        <span 
          key={idx} 
          style={{ overflow: 'hidden', display: 'inline-block', paddingBottom: '0.1em' }}
          className="mr-[0.25em]"
        >
          <motion.span 
            variants={wordVariants} 
            style={{ display: 'inline-block' }}
          >
            {word === '' ? '\u00A0' : word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
