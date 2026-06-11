import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, animate } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const PROJECTS = [
  {
    id: 'sentinel',
    no: '01',
    title: 'IoT Environmental Sentinel',
    type: 'SYSTEMS / TELEMETRY',
    year: '2024',
    desc: 'Multi-sensor telemetry station tracking temperature, humidity, and gas indicators. Connects via MQTT to a Node.js gateway with real-time alerting and edge processing.',
    tags: ['Arduino', 'C++', 'MQTT', 'ESP8266', 'Node.js'],
    github: 'https://github.com',
    demo: 'https://github.com',
    initial: 'ES',
    brandColor: '#22c55e',
    accent: '#22c55e',
    frame: '35mm',
  },
  {
    id: 'companion',
    no: '02',
    title: 'TUP Student Companion',
    type: 'MOBILE / PRODUCTIVITY',
    year: '2024',
    desc: 'Cross-platform mobile application providing students with grade tracking, campus maps, push notifications, and smart scheduler utilities with offline support.',
    tags: ['React Native', 'Firebase', 'Redux', 'Express'],
    github: 'https://github.com',
    demo: 'https://github.com',
    initial: 'SC',
    brandColor: '#3b82f6',
    accent: '#60a5fa',
    frame: '35mm',
  },
  {
    id: 'terminal',
    title: 'System Health Dashboard',
    no: '03',
    type: 'WEB / MONITORING',
    year: '2023',
    desc: 'Lightweight local service tracking memory, CPU utilization, network traffic, and daemon logs. Features a live WebSockets dashboard with historical graphing.',
    tags: ['Python', 'Linux', 'WebSockets', 'React'],
    github: 'https://github.com',
    demo: 'https://github.com',
    initial: 'HD',
    brandColor: '#eab308',
    accent: '#fbbf24',
    frame: '35mm',
  },
  {
    id: 'smartgrid',
    no: '04',
    title: 'Smart Grid Modbus Gateway',
    type: 'INDUSTRIAL / IoT',
    year: '2023',
    desc: 'Industrial protocol translator converting RS-485 Modbus RTU telemetry to unified MQTT payloads for cloud analytics. Runs on Raspberry Pi with Docker.',
    tags: ['Raspberry Pi', 'Python', 'Modbus', 'MQTT', 'Docker'],
    github: 'https://github.com',
    demo: 'https://github.com',
    initial: 'MG',
    brandColor: '#ec4899',
    accent: '#f472b6',
    frame: '35mm',
  },
  {
    id: 'scanner',
    no: '05',
    title: 'RFID Attendance Scanner',
    type: 'HARDWARE / TRACKING',
    year: '2023',
    desc: 'RFID-based attendance system using MFRC522 readers, storing records to a cloud database and displaying live stats on a React dashboard.',
    tags: ['Arduino', 'RFID', 'Node.js', 'MongoDB'],
    github: 'https://github.com',
    demo: 'https://github.com',
    initial: 'RA',
    brandColor: '#a855f7',
    accent: '#c084fc',
    frame: '35mm',
  },
];

// Horizontal drag-scroll with momentum
function useDragScroll(trackRef) {
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastT = useRef(Date.now());
  const animId = useRef(null);

  const onMouseDown = useCallback((e) => {
    isDragging.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    lastX.current = e.pageX;
    lastT.current = Date.now();
    velocity.current = 0;
    if (animId.current) cancelAnimationFrame(animId.current);
    trackRef.current.style.cursor = 'grabbing';
  }, [trackRef]);

  const onMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const now = Date.now();
    const dt = now - lastT.current;
    const dx = e.pageX - lastX.current;
    velocity.current = dt > 0 ? dx / dt : 0;
    lastX.current = e.pageX;
    lastT.current = now;
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  }, [trackRef]);

  const onMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    trackRef.current.style.cursor = 'grab';
    // Momentum scroll
    let v = velocity.current * 18;
    const momentum = () => {
      if (Math.abs(v) < 0.5) return;
      trackRef.current.scrollLeft -= v;
      v *= 0.92;
      animId.current = requestAnimationFrame(momentum);
    };
    momentum();
  }, [trackRef]);

  return { onMouseDown, onMouseMove, onMouseLeave: onMouseUp, onMouseUp };
}

/* Individual Film Frame */
function FilmFrame({ project, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative flex-shrink-0 select-none"
      style={{ width: 340 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
    >
      {/* Film strip column */}
      <div
        className="relative rounded-sm overflow-hidden border border-white/8 transition-all duration-500"
        style={{
          boxShadow: hovered
            ? `0 0 0 1px ${project.brandColor}55, 0 24px 60px rgba(0,0,0,0.8), 0 0 40px ${project.brandColor}18`
            : '0 8px 32px rgba(0,0,0,0.6)',
        }}
      >
        {/* Top sprocket row */}
        <div className="flex items-center justify-between px-2 py-2 bg-[#0a0a0a] border-b border-white/5">
          <div className="flex gap-1.5">
            {[...Array(6)].map((_, i) => <div key={i} className="film-sprocket" />)}
          </div>
          <span className="font-mono text-[9px] text-white/20 tracking-widest">{project.frame}</span>
          <div className="flex gap-1.5">
            {[...Array(6)].map((_, i) => <div key={i} className="film-sprocket" />)}
          </div>
        </div>

        {/* Frame image area */}
        <div
          className="relative overflow-hidden"
          style={{ height: 240, background: `linear-gradient(135deg, #0a0a0a 0%, #111 100%)` }}
        >
          {/* Scanline overlay */}
          <div className="scanlines absolute inset-0 z-10 opacity-30" />

          {/* Giant frame number */}
          <div
            className="absolute inset-0 flex items-center justify-center font-display font-black text-[130px] leading-none select-none"
            style={{ color: `${project.brandColor}08` }}
          >
            {project.no}
          </div>

          {/* Brand Initials */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={hovered ? { scale: 1.08, y: -6 } : { scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="font-display font-black text-7xl tracking-tighter"
              style={{ color: project.brandColor, textShadow: `0 0 40px ${project.brandColor}55` }}
            >
              {project.initial}
            </span>
          </motion.div>

          {/* Corner bracket */}
          <div
            className="absolute top-3 left-3 w-5 h-5 pointer-events-none"
            style={{ borderTop: `1px solid ${project.brandColor}60`, borderLeft: `1px solid ${project.brandColor}60` }}
          />
          <div
            className="absolute bottom-3 right-3 w-5 h-5 pointer-events-none"
            style={{ borderBottom: `1px solid ${project.brandColor}60`, borderRight: `1px solid ${project.brandColor}60` }}
          />

          {/* Hover info overlay */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-end p-5 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ background: `linear-gradient(to top, ${project.brandColor}22 0%, transparent 60%)` }}
          >
            <div className="flex gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-[10px] text-white/80 hover:text-white bg-black/50 px-2.5 py-1.5 rounded-lg border border-white/10 backdrop-blur-sm transition-colors"
              >
                <FiGithub size={12} /> GitHub
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-[10px] text-white/80 hover:text-white bg-black/50 px-2.5 py-1.5 rounded-lg border border-white/10 backdrop-blur-sm transition-colors"
              >
                <FiExternalLink size={12} /> Live
              </a>
            </div>
          </motion.div>

          {/* Frame counter */}
          <div className="absolute top-3 right-3 font-mono text-[9px]" style={{ color: `${project.brandColor}80` }}>
            ◯ {project.no}
          </div>
        </div>

        {/* Bottom sprocket row */}
        <div className="flex items-center justify-between px-2 py-2 bg-[#0a0a0a] border-t border-white/5">
          <div className="flex gap-1.5">
            {[...Array(6)].map((_, i) => <div key={i} className="film-sprocket" />)}
          </div>
          <div className="flex gap-1.5">
            {[...Array(6)].map((_, i) => <div key={i} className="film-sprocket" />)}
          </div>
        </div>

        {/* Info block below strip */}
        <div className="bg-[#0a0a0a] px-5 py-4 border-t border-white/5">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-1" style={{ color: project.accent + 'aa' }}>
                {project.type}
              </p>
              <h3 className="font-sans font-bold text-white text-sm leading-tight">
                {project.title}
              </h3>
            </div>
            <span className="font-mono text-[10px] text-white/20 mt-0.5">{project.year}</span>
          </div>
          <p className="font-sans text-[11px] text-gray-500 leading-relaxed mb-3">
            {project.desc}
          </p>
          <div className="flex flex-wrap gap-1">
            {project.tags.map(t => (
              <span
                key={t}
                className="px-1.5 py-0.5 font-mono text-[9px] rounded"
                style={{ background: `${project.brandColor}12`, color: `${project.brandColor}cc`, border: `1px solid ${project.brandColor}25` }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const trackRef = useRef(null);
  const dragHandlers = useDragScroll(trackRef);
  const [scrollPct, setScrollPct] = useState(0);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollPct(max > 0 ? el.scrollLeft / max : 0);
  };

  return (
    <section id="projects" className="relative w-full bg-[#050505] overflow-hidden scroll-mt-20 border-t border-white/5">

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="flex items-end gap-6 mb-16 select-none">
          <span className="font-sans font-extrabold text-white/5 text-[clamp(5rem,12vw,9rem)] leading-none">02</span>
          <div className="pb-3">
            <p className="font-mono text-[10px] text-[#22c55e] tracking-[0.4em] uppercase mb-2">Showcase</p>
            <h2 className="font-sans font-extrabold text-[clamp(2rem,5vw,4rem)] text-white leading-none tracking-tight">
              Projects
            </h2>
          </div>
          <div className="ml-auto pb-4 hidden md:flex items-center gap-3">
            <span className="font-mono text-[10px] text-white/25 tracking-widest">DRAG TO EXPLORE</span>
            <motion.div
              animate={{ x: [0, 12, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="text-white/25 text-sm"
            >
              ⟶
            </motion.div>
          </div>
        </div>

        {/* Film strip scroll container */}
        <div className="relative">
          {/* Left / Right vignette */}
          <div className="pointer-events-none absolute top-0 left-0 bottom-0 w-16 z-10" style={{ background: 'linear-gradient(to right, #050505, transparent)' }} />
          <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-16 z-10" style={{ background: 'linear-gradient(to left, #050505, transparent)' }} />

          {/* The draggable strip */}
          <div
            ref={trackRef}
            className="overflow-x-auto overflow-y-visible pb-4 hide-scrollbar"
            style={{ cursor: 'grab', scrollbarWidth: 'none' }}
            onScroll={handleScroll}
            {...dragHandlers}
          >
            <div className="film-strip-track px-16 gap-6" style={{ width: 'max-content' }}>
              {PROJECTS.map((p, i) => (
                <FilmFrame key={p.id} project={p} index={i} />
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6 h-px bg-white/5 rounded-full mx-16 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full rounded-full"
              style={{
                width: `${scrollPct * 100}%`,
                background: 'linear-gradient(90deg, #22c55e88, #22c55e)',
              }}
            />
          </div>

          {/* Frame counter label */}
          <div className="flex justify-between mx-16 mt-2">
            <span className="font-mono text-[9px] text-white/15">FRAME 001</span>
            <span className="font-mono text-[9px] text-white/15">FRAME 00{PROJECTS.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
