import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import AnimatedSection from '../ui/AnimatedSection';

const PROJECTS = [
  {
    id: 'sentinel',
    title: 'IoT Environmental Sentinel',
    desc: 'A multi-sensor telemetry station tracking temperature, humidity, and gas indicators. Connects via MQTT to a Node.js gateway with real-time alerting.',
    tags: ['Arduino', 'C++', 'MQTT', 'ESP8266', 'Node.js'],
    image: '/projects/sentinel.jpg',
    github: 'https://github.com',
    demo: 'https://github.com',
    initial: 'ES',
    brandColor: '#22c55e'
  },
  {
    id: 'companion',
    title: 'TUP Student Companion',
    desc: 'Cross-platform mobile application providing students with grade tracking, campus maps, notifications, and scheduler utilities.',
    tags: ['React Native', 'Firebase', 'Redux', 'Express'],
    image: '/projects/companion.jpg',
    github: 'https://github.com',
    demo: 'https://github.com',
    initial: 'SC',
    brandColor: '#3b82f6'
  },
  {
    id: 'terminal',
    title: 'System Health Dashboard',
    desc: 'Lightweight local service tracking memory, CPU utilization, network traffic, and daemon logs, featuring a WebSockets dashboard.',
    tags: ['Python', 'Linux', 'WebSockets', 'React', 'Tailwind'],
    image: '/projects/terminal.jpg',
    github: 'https://github.com',
    demo: 'https://github.com',
    initial: 'HD',
    brandColor: '#eab308'
  },
  {
    id: 'smartgrid',
    title: 'Smart Grid Modbus Gateway',
    desc: 'Industrial protocol translator converting RS-485 Modbus telemetry to unified MQTT payloads for cloud analytics and storage.',
    tags: ['Raspberry Pi', 'Python', 'Modbus', 'MQTT', 'Docker'],
    image: '/projects/smartgrid.jpg',
    github: 'https://github.com',
    demo: 'https://github.com',
    initial: 'MG',
    brandColor: '#ec4899'
  }
];

/* ─── Robust Project Image Handler ─── */
const ProjectImageHandler = ({ imageSrc, altText, initial, brandColor }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-full h-full bg-[#0d0d0d] flex items-center justify-center overflow-hidden">
      {/* Loading Skeleton */}
      {loading && !error && (
        <div className="absolute inset-0 bg-neutral-900 animate-pulse z-10" />
      )}

      {/* Actual Project Image */}
      {!error ? (
        <motion.img 
          src={imageSrc} 
          alt={altText}
          onLoad={() => setLoading(false)}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: loading ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full object-cover grayscale contrast-115 group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-700 ease-out"
        />
      ) : null}

      {/* Human-designed Minimalist Placeholder Fallback */}
      {error && (
        <div className="absolute inset-0 flex flex-col justify-between p-6 bg-[#0a0a0a] border border-white/5 font-sans select-none">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-gray-600 font-mono tracking-widest uppercase">
              / mock_inactive
            </span>
            <span 
              className="w-2.5 h-2.5 rounded-full" 
              style={{ backgroundColor: brandColor }}
            />
          </div>

          <div className="flex flex-col items-center justify-center flex-1">
            <span 
              className="text-6xl font-black font-sans tracking-tighter opacity-10 group-hover:opacity-20 transition-opacity duration-300"
              style={{ color: brandColor }}
            >
              {initial}
            </span>
          </div>

          <div className="text-[10px] text-gray-500 font-mono flex justify-between items-center">
            <span>ready_for_assets</span>
            <span className="text-gray-600">{altText}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const ProjectsPage = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px 0px' });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full bg-[#050505] py-28 overflow-hidden border-t border-white/5 scroll-mt-20"
    >
      <div className="relative max-w-6xl mx-auto px-6">
        
        {/* ── Section Title ── */}
        <div className="flex items-end gap-6 mb-24 select-none">
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 0.08, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans font-extrabold leading-none text-white text-[clamp(6rem,14vw,10rem)]"
            aria-hidden
          >
            02
          </motion.span>
          <div className="pb-3">
            <div className="overflow-hidden mb-2">
              <motion.p
                initial={{ y: '100%' }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-mono text-[10px] text-[#22c55e] tracking-[0.4em] uppercase"
              >
                Showcase
              </motion.p>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '100%' }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-extrabold text-[clamp(2.2rem,5vw,4.5rem)] leading-none tracking-tight text-white font-sans"
              >
                Projects
              </motion.h2>
            </div>
          </div>
        </div>

        {/* ── Minimalist Staggered Cards ── */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-14">
          {PROJECTS.map((project, idx) => (
            <AnimatedSection
              key={project.id}
              direction="up"
              delay={idx * 0.1}
              className="group flex flex-col bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-400"
            >
              
              {/* Project Image Panel */}
              <div className="relative w-full aspect-[16/10] overflow-hidden border-b border-white/5">
                <ProjectImageHandler 
                  imageSrc={project.image}
                  altText={project.title}
                  initial={project.initial}
                  brandColor={project.brandColor}
                />
              </div>

              {/* Project Info Panel */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-[#22c55e] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                    {project.desc}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Staggered Technical Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map(t => (
                      <span 
                        key={t}
                        className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-gray-400 text-[10px] font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-[11px] text-gray-500 hover:text-white transition-colors duration-200"
                      >
                        <FiGithub size={12} />
                        GitHub
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-[11px] text-gray-500 hover:text-white transition-colors duration-200"
                      >
                        <FiExternalLink size={12} />
                        Live Demo
                      </a>
                    </div>

                    <span className="font-mono text-[10px] text-gray-600">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

              </div>

            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsPage;
