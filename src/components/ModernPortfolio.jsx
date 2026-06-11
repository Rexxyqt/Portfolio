import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

import Navbar       from './layout/Navbar';
import Footer       from './layout/Footer';
import Hero         from './sections/Hero';
import AboutPage    from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage   from './pages/SkillsPage';
import ContactPage  from './pages/ContactPage';

/* ─────────────────────────────────────────────
   SectionReveal: each section gets its own distinct
   entry animation — not just a generic fade/slide.
───────────────────────────────────────────────*/
const sectionVariants = {
  // About: curtain wipe from left + slight skew (like a page turning)
  about: {
    hidden:  { opacity: 0, x: -80, skewX: 2 },
    visible: { opacity: 1, x: 0,   skewX: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
    },
  },
  // Projects: scale-up + iris reveal from center
  projects: {
    hidden:  { opacity: 0, scale: 0.88, filter: 'blur(8px)' },
    visible: { opacity: 1, scale: 1,    filter: 'blur(0px)',
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
    },
  },
  // Skills: slide in from right with spring bounce
  skills: {
    hidden:  { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
    },
  },
  // Contact: rise from below with a clip-path wipe
  contact: {
    hidden:  { opacity: 0, y: 80, clipPath: 'inset(12% 0% 0% 0%)' },
    visible: { opacity: 1, y: 0,  clipPath: 'inset(0% 0% 0% 0%)',
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
    },
  },
};

/* Wrapper that triggers a variant when scrolled into view */
function SectionReveal({ id, children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px 0px' });
  const variants = sectionVariants[id] || sectionVariants.about;

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   SectionDivider: animated green accent line
   between sections so transitions feel intentional.
───────────────────────────────────────────────*/
function SectionDivider({ label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });
  return (
    <div ref={ref} className="relative h-16 flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#22c55e]/30 to-transparent"
      />
      {label && (
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative font-mono text-[9px] text-[#22c55e]/50 tracking-[0.4em] uppercase bg-[#050505] px-4"
        >
          {label}
        </motion.span>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Portfolio
───────────────────────────────────────────────*/
const ModernPortfolio = () => {
  const [isScrolled, setIsScrolled]   = useState(false);
  const [introGlitch, setIntroGlitch] = useState(true);
  const [scrollYVal, setScrollYVal]   = useState(0);

  const { scrollY } = useScroll();

  const heroY       = useTransform(scrollY, [0, 500], [0, -180]);
  const heroOpacity = useTransform(scrollY, [0, 250], [1, 0]);

  const smoothY       = useSpring(heroY,       { stiffness: 65, damping: 22 });
  const smoothOpacity = useSpring(heroOpacity, { stiffness: 65, damping: 22 });

  useEffect(() => {
    const timer = setTimeout(() => setIntroGlitch(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollYVal(y);
      setIsScrolled(y > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isInteractive = scrollYVal < 50;
  const showHero      = scrollYVal < 800;

  // Progress bar scale derived from scrollY, normalized to full doc
  const progressScale = useTransform(
    scrollY,
    [0, typeof document !== 'undefined' ? document.body.scrollHeight - window.innerHeight : 5000],
    [0, 1],
  );

  return (
    <div className="min-h-screen bg-[#050505] text-[#e2e8f0] font-sans overflow-x-hidden">

      {/* Top progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#22c55e] via-[#4ade80] to-[#22c55e] origin-left z-[100]"
        style={{ scaleX: useSpring(progressScale, { stiffness: 100, damping: 30 }) }}
      />

      <Navbar isScrolled={isScrolled} />

      <main className="relative">

        {/* Fixed Hero background */}
        {showHero && (
          <div
            className={`fixed inset-0 h-screen w-full overflow-hidden bg-[#050505] z-0 transition-all duration-100 ${
              isInteractive ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
          >
            <motion.div
              style={{ y: smoothY, opacity: smoothOpacity }}
              className="w-full h-full will-change-transform"
            >
              <Hero introGlitch={introGlitch} />
            </motion.div>
          </div>
        )}

        {/* Spacer keeps content starting below fold */}
        <div className="h-screen w-full pointer-events-none" />

        {/* Content sections — each with its own reveal animation */}
        <div className="relative z-10 bg-[#050505] border-t border-white/5 shadow-[0_-24px_48px_rgba(0,0,0,0.8)]">

          <SectionReveal id="about">
            <AboutPage />
          </SectionReveal>

          <SectionDivider label="// projects" />

          <SectionReveal id="projects">
            <ProjectsPage />
          </SectionReveal>

          <SectionDivider label="// skills" />

          <SectionReveal id="skills">
            <SkillsPage />
          </SectionReveal>

          <SectionDivider label="// contact" />

          <SectionReveal id="contact">
            <ContactPage />
          </SectionReveal>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ModernPortfolio;