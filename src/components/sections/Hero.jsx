import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import MatrixRain from '../ui/MatrixRain';
import GlitchText from '../ui/GlitchText';

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

/**
 * Hero — full-screen landing section with Matrix rain background and glitch title.
 * @param {boolean} introGlitch - Controls intense vs. subtle glitch mode.
 */
const Hero = ({ introGlitch }) => (
  <section
    id="top"
    className="relative w-full min-h-screen flex flex-col justify-center items-center pt-20 overflow-hidden"
  >
    {/* Background */}
    <MatrixRain />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,transparent_0%,#050505_80%)] pointer-events-none z-0" />

    {/* Content */}
    <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
      <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col items-center w-full">

        <motion.p variants={fadeUp} className="font-mono text-xs sm:text-sm text-[#22c55e] tracking-[0.3em] uppercase mb-6 opacity-80">
          Portfolio 2026
        </motion.p>

        <motion.h1
          variants={fadeUp}
          style={{ wordSpacing: '0.15em' }}
          className="font-sans font-extrabold text-[4rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[8rem] leading-none tracking-normal whitespace-nowrap uppercase text-white mb-2 drop-shadow-[0_4px_32px_rgba(34,197,94,0.2)]"
        >
          <GlitchText intense={introGlitch}>Rex Latayada</GlitchText>
        </motion.h1>

        <motion.p variants={fadeUp} className="w-full max-w-2xl mx-auto mb-10">
          <img src="https://readme-typing-svg.demolab.com?font=Orbitron&size=24&pause=1200&color=22c55e&center=true&vCenter=true&width=800&lines=IoT+Developer;Mobile+App+Builder;System+Designer;BSIT+Student+%7C+TUP+Manila;" alt="Animated Roles" className="mx-auto" />
        </motion.p>

        <motion.p variants={fadeUp} className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto mb-10 opacity-80">
          A student developer helping build systems and modern digital solutions.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#projects"
            className="group inline-flex items-center gap-3 px-8 py-3.5 bg-[#22c55e]/90 text-black rounded-xl font-semibold hover:bg-[#22c55e] transition-all duration-300 shadow-[0_0_24px_-4px_rgba(34,197,94,0.5)] hover:shadow-[0_0_32px_-2px_rgba(34,197,94,0.7)] hover:-translate-y-0.5"
          >
            View My Work <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-3.5 border border-[#22c55e]/60 text-[#22c55e] rounded-xl font-semibold hover:bg-[#22c55e]/15 hover:border-[#22c55e] hover:text-white transition-all duration-300 hover:-translate-y-0.5"
          >
            View Resume <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </motion.div>
    </div>

    {/* Scroll hint */}
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2"
    >
      <span className="text-gray-500 text-xs font-mono tracking-widest">v Scroll Down v</span>
    </motion.div>
  </section>
);

export default Hero;
