import { motion } from 'framer-motion';

/**
 * Teamplate — reusable full-page section template.
 * - Theme-aligned green accent
 * - Smooth, beautiful transitions (Framer Motion)
 * - Not "scroll-only"; animates on mount + on enter
 */
const Teamplate = ({ id, eyebrow, title, body, children }) => {
  return (
    <motion.section
      id={id}
      className="relative w-full py-20 overflow-hidden border-t border-white/10 bg-[#050505]"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Ambient accent */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[220px] w-[720px] bg-[#22c55e]/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[120px] w-[520px] bg-[#22c55e]/5 blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px 0px -20% 0px' }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          <p className="font-mono text-xs text-[#22c55e] tracking-[0.3em] uppercase">{eyebrow}</p>
          <h2 className="mt-6 text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {title}
          </h2>
          <p className="mt-5 text-gray-400 font-mono text-base md:text-lg max-w-3xl">{body}</p>
        </motion.div>

        {children && (
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            {children}
          </motion.div>
        )}

        <motion.div
          className="mt-12 h-[1px] w-full bg-gradient-to-r from-transparent via-[#22c55e]/50 to-transparent"
          initial={{ opacity: 0, scaleX: 0.25 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.05 }}
        />
      </div>
    </motion.section>
  );
};

export default Teamplate;

