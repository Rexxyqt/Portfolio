import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import { motion } from 'framer-motion';

const SOCIAL = [
  { href: 'https://github.com',   icon: FiGithub,   label: 'GitHub'   },
  { href: 'https://linkedin.com', icon: FiLinkedin,  label: 'LinkedIn' },
  { href: 'mailto:rex@dev.com',   icon: FiMail,      label: 'Email'    },
];

const NAV = [
  { href: '#about',   label: 'about'   },
  { href: '#skills',  label: 'skills'  },
  { href: '#contact', label: 'contact' },
];

/**
 * Footer — polished site-wide footer with social links, nav, and copyright.
 */
const Footer = () => (
  <footer className="w-full bg-[#050505] border-t border-white/8 overflow-hidden">
    {/* Top glow line */}
    <div className="h-px w-full bg-gradient-to-r from-transparent via-[#22c55e]/40 to-transparent" />

    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-3 gap-10 mb-10">

        {/* Brand */}
        <div>
          <a href="#top" className="inline-block font-mono text-2xl font-black text-white hover:text-[#22c55e] transition-colors duration-300">
            rl<span className="text-[#22c55e]">_</span>
          </a>
          <p className="mt-3 text-gray-500 font-mono text-sm leading-relaxed max-w-xs">
            BSIT Student & Developer building systems that work beautifully.
          </p>
        </div>

        {/* Nav */}
        <div>
          <p className="font-mono text-xs text-[#22c55e] tracking-[0.3em] uppercase mb-4">Navigation</p>
          <ul className="space-y-2">
            {NAV.map(({ href, label }) => (
              <li key={label}>
                <a
                  href={href}
                  className="font-mono text-sm text-gray-400 hover:text-[#22c55e] transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="h-px w-4 bg-[#22c55e]/0 group-hover:bg-[#22c55e]/70 transition-all duration-300 group-hover:w-6" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <p className="font-mono text-xs text-[#22c55e] tracking-[0.3em] uppercase mb-4">Connect</p>
          <div className="flex gap-3">
            {SOCIAL.map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl border border-white/8 text-gray-400 hover:text-[#22c55e] hover:border-[#22c55e]/30 hover:bg-[#22c55e]/5 transition-colors duration-300"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="font-mono text-xs text-gray-600">
          © {new Date().getFullYear()} Rex Latayada. All rights reserved.
        </p>
        <p className="font-mono text-xs text-gray-600 flex items-center gap-1.5">
          Built with <FiHeart className="text-[#22c55e]" size={11} /> using React & Framer Motion
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
