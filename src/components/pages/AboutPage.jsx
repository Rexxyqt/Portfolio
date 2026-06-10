import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedSection from '../ui/AnimatedSection';
import pfp from '/src/assets/image/pfp.png';

/* ─── Clip-path curtain reveal ─── */
const CurtainReveal = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '102%' }}
        animate={inView ? { y: 0 } : {}}
        transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

/* ─── Fade transition for sections ─── */
const RevealLine = ({ text, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });
  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {text}
    </motion.p>
  );
};

const TIMELINE = [
  { year: '2022', title: 'BSIT Foundation', sub: 'TUP Manila', desc: 'Core CS concepts, structured programming paradigms, and algorithms.' },
  { year: '2023', title: 'Hardware Integration', sub: 'Arduino & Telemetry', desc: 'Connecting environmental sensors with local controllers and hardware buses.' },
  { year: '2024', title: 'Mobile Client Architecture', sub: 'React Native & State Management', desc: 'Developing fluid user applications with complex local database caching and services.' },
  { year: '2025', title: 'System Deployments', sub: 'APIs, Gateways & Databases', desc: 'Constructing robust backend endpoints, schemas, and deployed applications.' },
];

const FACTS = [
  { label: 'Location',    value: 'Manila, Philippines' },
  { label: 'Academic',    value: 'BS in Information Technology' },
  { label: 'Affiliation', value: 'TUP Manila' },
  { label: 'Focus',       value: 'IoT Systems & Full-Stack Web' },
];

const AboutPage = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px 0px' });
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-[#050505] overflow-hidden scroll-mt-20 border-t border-white/5"
    >
      {/* Subtle background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[15%] top-[25%] h-[400px] w-[400px] bg-[#22c55e]/3 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-28">

        {/* ── Section Title ── */}
        <div className="flex items-end gap-6 mb-24 select-none">
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 0.08, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans font-extrabold leading-none text-white text-[clamp(6rem,14vw,10rem)]"
            aria-hidden
          >
            01
          </motion.span>
          <div className="pb-3">
            <CurtainReveal delay={0.1}>
              <p className="font-mono text-[10px] text-[#22c55e] tracking-[0.4em] uppercase mb-2">Introduction</p>
            </CurtainReveal>
            <CurtainReveal delay={0.2}>
              <h2 className="font-extrabold text-[clamp(2.2rem,5vw,4.5rem)] leading-none tracking-tight text-white font-sans">
                Profile
              </h2>
            </CurtainReveal>
          </div>
        </div>

        {/* ── Main Bio & Profile Pic Layout ── */}
        <div className="grid lg:grid-cols-12 gap-16 items-start mb-28">

          {/* Left Column: Perfect Circular PFP & Minimal Info Block */}
          <div className="lg:col-span-5 flex flex-col items-center">

            {/* Interactive Circular Image Frame */}
            <AnimatedSection direction="scale" className="relative w-64 h-64 sm:w-72 sm:h-72 group cursor-pointer">
              {/* Outer Concentric Animated Ring */}
              <div className="absolute -inset-2.5 rounded-full border border-[#22c55e]/25 scale-100 group-hover:scale-[1.03] transition-transform duration-500 pointer-events-none" />

              {/* Core Image Circle Container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10 bg-[#0b0b0b] z-10 flex items-center justify-center">

                {!imageError ? (
                  <img
                    src={pfp}
                    alt="Rex Latayada"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-all duration-500 ease-out">
                      
                    </img>
                ) : (
                  /* Fallback Initials */
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#0c0c0c] text-white/95 relative">
                    <span className="font-sans font-black text-5xl tracking-tighter text-[#22c55e]/90">
                      RL
                    </span>
                    <span className="mt-2 font-mono text-[9px] text-gray-500 uppercase tracking-widest">
                      Developer Profile
                    </span>
                  </div>
                )}

                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20" />
              </div>
            </AnimatedSection>

            {/* Academic profile list */}
            <AnimatedSection direction="up" delay={0.2} className="mt-10 w-full max-w-[320px] text-center lg:text-left space-y-4">
              <h3 className="font-sans font-bold text-sm text-white/90 uppercase tracking-wider">
                Academic Profile
              </h3>
              <p className="font-sans text-xs text-gray-400 leading-relaxed">
                Pursuing research and systems development, integrating IoT frameworks with modern frontend clients.
              </p>
            </AnimatedSection>
          </div>

          {/* Right Column: Bio Paragraphs & Clean Metadata Table */}
          <div className="lg:col-span-7 space-y-12">

            {/* Biography text */}
            <div className="space-y-6">
              <RevealLine
                delay={0.1}
                text="I'm Rex — a BSIT student at TUP Manila who builds clean systems and interfaces."
                className="text-xl sm:text-2xl text-white/95 font-medium leading-relaxed font-sans"
              />
              <RevealLine
                delay={0.2}
                text="I develop applications that bridge microcontrollers with web technologies. My approach prioritizes legible code structures, performant systems, and interfaces that feel effortless to navigate."
                className="text-xs sm:text-sm text-gray-400 leading-relaxed font-mono"
              />

              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="h-px bg-white/10 my-6"
              />

              <RevealLine
                delay={0.4}
                text='"Build it clean, document it well, ship it working."'
                className="font-sans text-xs sm:text-sm text-[#22c55e] tracking-wide font-medium uppercase"
              />
            </div>

            {/* Minimalist Grid Table */}
            <AnimatedSection direction="up" delay={0.3} className="pt-4">
              <p className="font-mono text-[9px] text-gray-600 tracking-[0.3em] uppercase mb-4">Verification Specs</p>
              <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4 border-t border-b border-white/5 py-6">
                {FACTS.map((f) => (
                  <div key={f.label} className="flex flex-col py-1">
                    <dt className="font-sans text-[10px] text-gray-500 uppercase tracking-widest">{f.label}</dt>
                    <dd className="font-sans text-xs sm:text-sm text-white/90 font-medium mt-1">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </AnimatedSection>
          </div>
        </div>

        {/* ── Timeline ── */}
        <div className="border-t border-white/5 pt-20">
          <CurtainReveal delay={0.2}>
            <p className="font-mono text-[9px] text-gray-600 tracking-[0.4em] uppercase mb-16">Milestones</p>
          </CurtainReveal>

          <div className="relative">
            {/* Spine Line */}
            <motion.div
              initial={{ scaleY: 0, originY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/5"
            />

            <div className="space-y-12">
              {TIMELINE.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <AnimatedSection
                    key={item.year}
                    direction={isLeft ? 'left' : 'right'}
                    delay={i * 0.1}
                    className={`relative flex flex-col md:grid md:grid-cols-2 gap-0 pl-10 md:pl-0 ${
                      isLeft ? 'md:text-right' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Content Card */}
                    <div className={`w-full md:py-6 ${isLeft ? 'md:pr-16' : 'md:pl-16 md:col-start-2'}`}>
                      <div className="group relative">
                        <span className="font-mono text-xs text-[#22c55e] font-semibold tracking-wider block mb-1">{item.year}</span>
                        <h4 className="text-white font-bold text-base mb-0.5">{item.title}</h4>
                        <p className="font-sans text-[11px] text-gray-500 mb-2">{item.sub}</p>
                        <p className="font-sans text-xs text-gray-400 leading-relaxed max-w-md md:ml-auto">{item.desc}</p>
                      </div>
                    </div>

                    {/* Node Dot */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-1.5 md:top-auto md:flex items-center justify-center z-10">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#050505] border-2 border-white/20 group-hover:border-[#22c55e] transition-colors duration-300" />
                    </div>

                    {/* Spacer */}
                    {!isLeft && <div className="hidden md:block md:col-start-1 md:row-start-1" />}
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutPage;