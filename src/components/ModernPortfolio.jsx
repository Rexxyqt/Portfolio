import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

import Navbar       from './layout/Navbar';
import Footer       from './layout/Footer';
import Hero         from './sections/Hero';
import AboutPage    from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage   from './pages/SkillsPage';
import ContactPage  from './pages/ContactPage';

const ModernPortfolio = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [introGlitch, setIntroGlitch] = useState(true);
  const [scrollYVal, setScrollYVal] = useState(0);

  /* ── Scroll Tracking ── */
  const { scrollY } = useScroll();
  
  // Clean vertical parallax slide-up and accelerated opacity fade-out
  const heroY       = useTransform(scrollY, [0, 500], [0, -180]);
  const heroOpacity = useTransform(scrollY, [0, 250], [1, 0]);

  // Spring animations for a premium, organic feel
  const smoothY       = useSpring(heroY, { stiffness: 65, damping: 22 });
  const smoothOpacity = useSpring(heroOpacity, { stiffness: 65, damping: 22 });

  useEffect(() => {
    const timer = setTimeout(() => setIntroGlitch(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Track scroll position for header styles and interactions
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollYVal(currentScroll);
      setIsScrolled(currentScroll > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if the Hero needs pointer interactions (only when user is at the top)
  const isInteractive = scrollYVal < 50;

  // Unmount / hide the fixed Hero if scrolled far down to save memory
  const showHero = scrollYVal < 800;

  // Unified Page-Level Slide Transition settings
  const pageTransitionProps = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-120px' },
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e2e8f0] font-sans overflow-x-hidden">

      {/* Thin top progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#22c55e] via-[#4ade80] to-[#22c55e] origin-left z-[100]"
        style={{ scaleX: useSpring(scrollY, { stiffness: 100, damping: 30 }) }}
      />

      <Navbar isScrolled={isScrolled} />

      <main className="relative">
        {/* ── Fixed Hero Background (Stays perfectly centered, does not scroll vertically) ── */}
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

        {/* ── Document Flow Spacer ──
            Matches the Hero viewport size so the remaining pages start below the fold */}
        <div className="h-screen w-full pointer-events-none" />

        {/* ── Content Sections ──
            Rises up naturally and covers the fixed Hero as the user scrolls */}
        <div className="relative z-10 bg-[#050505] border-t border-white/5 shadow-[0_-24px_48px_rgba(0,0,0,0.8)]">
          
          {/* About Section Page Transition */}
          <motion.div {...pageTransitionProps}>
            <AboutPage />
          </motion.div>

          {/* Projects Section Page Transition */}
          <motion.div {...pageTransitionProps}>
            <ProjectsPage />
          </motion.div>

          {/* Skills Section Page Transition */}
          <motion.div {...pageTransitionProps}>
            <SkillsPage />
          </motion.div>

          {/* Contact Section Page Transition */}
          <motion.div {...pageTransitionProps}>
            <ContactPage />
          </motion.div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ModernPortfolio;