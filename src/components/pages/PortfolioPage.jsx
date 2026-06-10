import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PortfolioPage = () => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const onHash = () => setActive(true);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Re-trigger animation when hash changes
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setActive(false), 50);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <section id="projects" className="relative w-full py-20 border-white/10 bg-[#050505] overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[860px] bg-[#22c55e]/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[220px] w-[520px] bg-[#22c55e]/5 blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key="projects-anim"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="pt-2"
            >
              <motion.p
                className="font-mono text-xs text-[#22c55e] tracking-[0.3em] uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                Portfolio
              </motion.p>

              <motion.h2
                className="mt-6 text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.03, delayChildren: 0.15 } },
                }}
              >
                {'Project Showcase'.split('').map((ch, idx) => (
                  <motion.span
                    key={`${ch}-${idx}`}
                    className="inline-block"
                    variants={{
                      hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
                      visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {ch === ' ' ? '\u00A0' : ch}
                  </motion.span>
                ))}
              </motion.h2>

              <motion.p
                className="mt-5 text-gray-400 font-mono text-base md:text-lg max-w-3xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Building IoT prototypes, mobile apps, and system tools—crafted for real-world reliability, clean UX, and scalable logic.
              </motion.p>

              <motion.div
                className="mt-10 grid gap-4 md:grid-cols-3"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.15 }}
              >
                {[
                  { t: 'IoT Prototypes', d: 'Sensors, dashboards, and reliable data pipelines.' },
                  { t: 'Mobile App Builds', d: 'Modern UI with clean state + smooth UX.' },
                  { t: 'System Design', d: 'Automation, architecture, and deployable solutions.' },
                ].map(card => (
                  <motion.div
                    key={card.t}
                    className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-5 overflow-hidden"
                    whileHover={{ y: -4, boxShadow: '0 0 0 1px rgba(34,197,94,.15), 0 0 24px rgba(34,197,94,.20)' }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  >
                    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#22c55e]/15 blur-xl" />
                    <h3 className="font-mono text-sm text-white/90">{card.t}</h3>
                    <p className="mt-2 text-gray-400 font-mono text-sm leading-relaxed">{card.d}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="mt-12 h-[1px] w-full bg-gradient-to-r from-transparent via-[#22c55e]/50 to-transparent"
                initial={{ scaleX: 0.2, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
                style={{ transformOrigin: 'left' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PortfolioPage;
