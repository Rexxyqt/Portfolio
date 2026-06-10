import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const NAV_LINKS = [
  { id: 'about',   label: 'about'   },
  { id: 'projects', label: 'projects' },
  { id: 'skills',  label: 'skills'  },
  { id: 'contact', label: 'contact' },
];

/**
 * Navbar — fixed top navigation with active section indicator and mobile drawer.
 */
const Navbar = ({ isScrolled }) => {
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState('');

  // Track which section is in view
  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.getElementById(l.id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 py-4 transition-all duration-500">
      {/* Background blur layer */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      />

      <nav
        className="relative max-w-7xl mx-auto px-6 flex justify-between items-center"
        aria-label="Main Navigation"
      >
        {/* Logo */}
        <motion.a
          href="#top"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative text-2xl font-black tracking-tighter text-white font-mono z-50 group"
        >
          rl
          <span className="text-[#22c55e]">_</span>
          {/* Glow on hover */}
          <span className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_rgba(34,197,94,0.4)]" />
        </motion.a>

        {/* Desktop links */}
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="hidden md:flex items-center gap-1"
        >
          {NAV_LINKS.map(item => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`relative px-4 py-2 rounded-lg text-sm font-mono transition-all duration-300 group ${
                  active === item.id
                    ? 'text-[#22c55e]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {/* Active background */}
                {active === item.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-[#22c55e]/10 border border-[#22c55e]/25"
                    transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </a>
            </li>
          ))}

          {/* CTA button */}
          <li className="ml-4">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-lg border border-[#22c55e]/50 text-[#22c55e] text-sm font-mono hover:bg-[#22c55e]/10 hover:border-[#22c55e] transition-all duration-300"
            >
              resume.pdf
            </a>
          </li>
        </motion.ul>

        {/* Mobile toggle */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="md:hidden text-gray-300 hover:text-[#22c55e] z-50 transition-colors p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {open
              ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><FiX size={24} /></motion.span>
              : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><FiMenu size={24} /></motion.span>
            }
          </AnimatePresence>
        </motion.button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-[#050505]/98 backdrop-blur-xl border-b border-white/5 py-6 px-6 flex flex-col gap-2 md:hidden overflow-hidden"
          >
            {NAV_LINKS.map((item, i) => (
              <motion.a
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-xl text-base font-mono transition-all duration-300 ${
                  active === item.id
                    ? 'text-[#22c55e] bg-[#22c55e]/10'
                    : 'text-gray-300 hover:text-[#22c55e] hover:bg-white/5'
                }`}
              >
                {item.label}
              </motion.a>
            ))}
            <motion.a
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.07 }}
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl border border-[#22c55e]/40 text-[#22c55e] font-mono text-base hover:bg-[#22c55e]/10 transition-all duration-300 text-center mt-2"
            >
              resume.pdf
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
