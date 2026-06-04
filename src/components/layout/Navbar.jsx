import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const NAV_LINKS = ['projects', 'about', 'contact'];

/**
 * Navbar — fixed top navigation with mobile drawer.
 * @param {boolean} isScrolled - Whether the page has been scrolled past the threshold.
 */
const Navbar = ({ isScrolled }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 py-5 transition-all duration-500">
      {/* Background layer — fades in on scroll separately from the content */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#050505]/85 backdrop-blur-md border-b border-[#22c55e]/10'
            : 'bg-transparent'
        }`}
      />
      <nav className="relative max-w-7xl mx-auto px-6 flex justify-between items-center" aria-label="Main Navigation">
        {/* Logo */}
        <motion.a
          href="#top"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-black tracking-tighter text-white font-mono z-50 group"
        >
          rl<span className="text-[#22c55e] group-hover:text-white transition-colors">_</span>
        </motion.a>

        {/* Desktop links */}
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="hidden md:flex items-center space-x-10 text-sm font-mono lowercase"
        >
          {NAV_LINKS.map(item => (
            <li key={item}>
              <a
                href={`#${item}`}
                className="relative text-gray-400 hover:text-white transition-colors group py-2"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-full h-px bg-[#22c55e] scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left transition-transform duration-300" />
              </a>
            </li>
          ))}
        </motion.ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-[#22c55e] z-50 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-[#050505]/95 backdrop-blur-md border-b border-white/5 py-8 px-6 flex flex-col gap-6 md:hidden overflow-hidden"
          >
            {NAV_LINKS.map(item => (
              <motion.a
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                href={`#${item}`}
                onClick={() => setOpen(false)}
                className="text-xl font-mono lowercase text-gray-300 hover:text-[#22c55e]"
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
