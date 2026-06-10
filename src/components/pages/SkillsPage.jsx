import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  SiReact, 
  SiJavascript, 
  SiTypescript, 
  SiTailwindcss, 
  SiPython, 
  SiNodedotjs, 
  SiExpress, 
  SiPostgresql, 
  SiFirebase, 
  SiMongodb, 
  SiArduino, 
  SiCplusplus, 
  SiRaspberrypi, 
  SiLinux 
} from 'react-icons/si';
import { FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { FiCpu, FiWifi } from 'react-icons/fi';
import AnimatedSection from '../ui/AnimatedSection';

const SKILL_CATEGORIES = [
  {
    label: 'Frontend',
    desc: 'Creating responsive, responsive web applications and mobile clients.',
    skills: [
      { name: 'React', icon: SiReact, color: '#61DAFB', desc: 'Component architecture, state frameworks, and virtual DOM mappings.' },
      { name: 'HTML5', icon: FaHtml5, color: '#E34F26', desc: 'Semantic layouts, standard structure, and modern web accessibility.' },
      { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6', desc: 'Advanced animations, layouts, and responsive properties.' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', desc: 'ES6+ specifications, async events, and DOM scripting.' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', desc: 'Static typing, interfaces, and code compiler security.' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4', desc: 'Utility configuration, custom media query states, and overrides.' }
    ]
  },
  {
    label: 'Backend & Databases',
    desc: 'Engineering server logic, schemas, query environments, and data brokers.',
    skills: [
      { name: 'Python', icon: SiPython, color: '#3776AB', desc: 'System automation scripting, web server APIs, and data ingestion.' },
      { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E', desc: 'Event-driven server engines and package distributions.' },
      { name: 'Express', icon: SiExpress, color: '#FFFFFF', desc: 'Restful routing middleware and client request processors.' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1', desc: 'Relational database designs, query logic, and indexes.' },
      { name: 'Firebase', icon: SiFirebase, color: '#FFCA28', desc: 'Serverless architecture, document updates, and auth services.' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248', desc: 'Document schemas, collection aggregates, and NoSQL querying.' }
    ]
  },
  {
    label: 'IoT & Systems',
    desc: 'Connecting telemetry networks, physical hardware, and local systems.',
    skills: [
      { name: 'Arduino / C++', icon: SiArduino, color: '#00979D', desc: 'Microcontroller scripting, interrupt handling, and sensor polling.' },
      { name: 'Embedded C++', icon: SiCplusplus, color: '#00599C', desc: 'Memory-safe system code, direct bit registries, and I/O logic.' },
      { name: 'Raspberry Pi', icon: SiRaspberrypi, color: '#A22846', desc: 'Single-board configurations, host controllers, and cron processes.' },
      { name: 'Linux OS', icon: SiLinux, color: '#FCC624', desc: 'Daemon configurations, shell scripts, and system setups.' },
      { name: 'MQTT Protocol', icon: FiWifi, color: '#22C55E', desc: 'Lightweight broker messaging and client publish-subscribe states.' },
      { name: 'Prototyping', icon: FiCpu, color: '#A855F7', desc: 'Safety testing, hardware validation, and electrical boards.' }
    ]
  }
];

const SkillsPage = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px 0px' });
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full bg-[#050505] overflow-hidden scroll-mt-20 border-t border-white/5"
    >
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[10%] top-[20%] h-[400px] w-[400px] bg-[#22c55e]/3 blur-[120px] rounded-full" />
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
            03
          </motion.span>
          <div className="pb-3">
            <div className="overflow-hidden mb-2">
              <motion.p
                initial={{ y: '100%' }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-mono text-[10px] text-green-500 tracking-[0.4em] uppercase"
              >
                Capabilities
              </motion.p>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '100%' }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-extrabold text-[clamp(2.2rem,5vw,4.5rem)] leading-none tracking-tight text-white font-sans"
              >
                Skills
              </motion.h2>
            </div>
          </div>
        </div>

        {/* ── 3-Column Grotesque Grid (No AI Terminal Inspector) ── */}
        <div className="grid md:grid-cols-3 gap-10 lg:gap-14 items-start">
          {SKILL_CATEGORIES.map((cat, catIdx) => (
            <AnimatedSection
              key={cat.label}
              direction={catIdx === 0 ? 'left' : catIdx === 1 ? 'up' : 'right'}
              delay={catIdx * 0.1}
              className="flex flex-col space-y-8"
            >
              {/* Category Header */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white font-sans tracking-tight">
                  {cat.label}
                </h3>
                <p className="font-sans text-xs text-gray-500 leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              {/* Grid of Minimal Grayscale-to-Color Icons */}
              <div className="grid grid-cols-3 gap-3">
                {cat.skills.map((skill) => {
                  const Icon = skill.icon;
                  const isHovered = hoveredSkill?.name === skill.name;

                  return (
                    <div
                      key={skill.name}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className="relative aspect-square"
                    >
                      {/* Skill Icon Card */}
                      <motion.div
                        className="group w-full h-full rounded-xl border border-white/5 bg-[#0a0a0a] flex flex-col items-center justify-center cursor-pointer transition-all duration-300"
                        style={isHovered ? { borderColor: `${skill.color}50`, boxShadow: `0 0 12px ${skill.color}15`, backgroundColor: 'rgba(255,255,255,0.02)' } : {}}
                        whileHover={{ y: -3 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        {/* Brand Icon (Always in brand color) */}
                        <Icon 
                          className="text-2xl transition-all duration-300 group-hover:scale-105"
                          style={{ color: skill.color }}
                        />

                        {/* Title text */}
                        <span className="mt-2.5 font-mono text-[9px] text-gray-500 uppercase tracking-widest text-center truncate max-w-[85%]">
                          {skill.name}
                        </span>
                      </motion.div>

                      {/* Micro-Tooltip Popup */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.95 }}
                            transition={{ duration: 0.18 }}
                            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-48 bg-[#0f0f0f] border border-white/10 rounded-xl p-3 font-sans text-[11px] text-gray-300 shadow-xl pointer-events-none z-50"
                          >
                            <span 
                              className="font-bold block uppercase tracking-wider text-[10px] mb-1"
                              style={{ color: skill.color }}
                            >
                              {skill.name}
                            </span>
                            <span className="text-[10px] text-gray-400 leading-relaxed font-sans">
                              {skill.desc}
                            </span>
                            {/* Down arrow of tooltip */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-width border-[6px] border-transparent border-t-[#0f0f0f] w-0 h-0" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SkillsPage;
