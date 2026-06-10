/**
 * ComingSoon — placeholder section shown until a section is built out.
 * Uses smooth, theme-aligned transitions (not just scroll).
 * @param {string} id    - Section anchor id.
 * @param {string} label - Section label shown above "Coming Soon".
 */

import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const COPY = {
  projects: {
    title: 'Project Showcase',
    body: 'Building IoT + mobile apps + system tools. Check back soon for live demos, case studies, and source links.',
    bullets: [
      'IoT prototypes',
      'Mobile app builds',
      'System design & automation',
    ],
  },

  about: {
    title: 'About',
    body: 'A BSIT student focused on practical systems—clean UI, reliable logic, and deployable solutions.',
    bullets: [
      'Microcontrollers',
      'Mobile/Desktop apps',
      'System architecture',
    ],
  },

  skills: {
    title: 'Capabilities',
    body: 'From planning to implementation: I build features that work smoothly and scale.',
    bullets: [
      'Frontend UI + UX',
      'Backend logic',
      'Integrations & tooling',
    ],
  },

  contact: {
    title: 'Contact',
    body: 'Let’s collaborate on modern digital solutions—projects, internships, or system design work.',
    bullets: [
      'Email',
      'GitHub',
      'LinkedIn',
    ],
  },
};

const ComingSoon = ({ id, label }) => {
  const content = COPY[id] || {
    title: 'Coming Soon',
    body: 'This section is under construction.',
    bullets: [],
  };

  return (
    <motion.section
      id={id}
      className="w-full py-24 border-t border-white/10 bg-[#050505]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px 0px -10% 0px' }}
      variants={fadeUp}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center gap-4 min-h-[260px] text-center">
        <motion.p
          className="font-mono text-xs text-[#22c55e] tracking-[0.3em] uppercase"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          {label}
        </motion.p>

        <motion.h2
          className="text-4xl md:text-5xl font-bold text-white tracking-tight"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          {content.title}
        </motion.h2>

        <motion.p
          className="text-gray-500 font-mono text-sm mt-2 max-w-2xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12 }}
        >
          {content.body}
        </motion.p>

        {content.bullets.length > 0 && (
          <motion.ul
            className="mt-6 grid gap-2 sm:grid-cols-3 w-full max-w-3xl"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18 }}
          >
            {content.bullets.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-3 text-gray-300 font-mono text-sm"
              >
                {item}
              </li>
            ))}
          </motion.ul>
        )}

        <motion.div
          className="mt-10 h-[1px] w-full max-w-xl bg-gradient-to-r from-transparent via-[#22c55e]/50 to-transparent"
          initial={{ opacity: 0, scaleX: 0.4 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        />
      </div>
    </motion.section>
  );
};

export default ComingSoon;