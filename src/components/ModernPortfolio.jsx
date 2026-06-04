import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

import Navbar     from './layout/Navbar';
import Footer     from './layout/Footer';
import Hero       from './sections/Hero';
import ComingSoon from './ui/ComingSoon';

const ModernPortfolio = () => {
  const [isScrolled,  setIsScrolled]  = useState(false);
  const [introGlitch, setIntroGlitch] = useState(true);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    const timer    = setTimeout(() => setIntroGlitch(false), 2500);

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#e2e8f0] font-sans selection:bg-[#22c55e] selection:text-black overflow-x-hidden">

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#22c55e] origin-left z-[100]"
        style={{ scaleX }}
      />

      <Navbar isScrolled={isScrolled} />

      <main>
        <Hero introGlitch={introGlitch} />

        <ComingSoon id="projects" label="Portfolio"    />
        <ComingSoon id="about"    label="About Me"     />
        <ComingSoon id="skills"   label="Capabilities" />
        <ComingSoon id="contact"  label="Contact"      />
      </main>

      <Footer />
    </div>
  );
};

export default ModernPortfolio;
