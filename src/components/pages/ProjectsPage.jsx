import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const PROJECTS = [
  {
    id: 'sentinel',
    no: '01',
    title: 'IoT Environmental Sentinel',
    type: 'Systems / Telemetry',
    year: '2024',
    desc: 'Multi-sensor telemetry station tracking temperature, humidity, and gas indicators. Connects via MQTT to a Node.js gateway with real-time alerting.',
    tags: ['Arduino', 'C++', 'MQTT', 'ESP8266', 'Node.js'],
    github: 'https://github.com',
    demo: 'https://github.com',
    color: '#22c55e',
    image: null,
  },
  {
    id: 'companion',
    no: '02',
    title: 'TUP Student Companion',
    type: 'Mobile / Productivity',
    year: '2024',
    desc: 'Cross-platform mobile app with grade tracking, campus maps, push notifications, and smart scheduling with offline support.',
    tags: ['React Native', 'Firebase', 'Redux', 'Express'],
    github: 'https://github.com',
    demo: 'https://github.com',
    color: '#3b82f6',
    image: null,
  },
  {
    id: 'terminal',
    no: '03',
    title: 'System Health Dashboard',
    type: 'Web / Monitoring',
    year: '2023',
    desc: 'Local service tracker for memory, CPU, network, and daemon logs with a live WebSockets dashboard and historical graphs.',
    tags: ['Python', 'Linux', 'WebSockets', 'React'],
    github: 'https://github.com',
    demo: 'https://github.com',
    color: '#eab308',
    image: null,
  },
  {
    id: 'smartgrid',
    no: '04',
    title: 'Smart Grid Modbus Gateway',
    type: 'Industrial / IoT',
    year: '2023',
    desc: 'Protocol translator converting RS-485 Modbus RTU telemetry to MQTT payloads for cloud analytics, running on Raspberry Pi with Docker.',
    tags: ['Raspberry Pi', 'Python', 'Modbus', 'MQTT', 'Docker'],
    github: 'https://github.com',
    demo: 'https://github.com',
    color: '#ec4899',
    image: null,
  },
  {
    id: 'scanner',
    no: '05',
    title: 'RFID Attendance Scanner',
    type: 'Hardware / Tracking',
    year: '2023',
    desc: 'RFID-based attendance system with MFRC522 readers, cloud database storage, and a React dashboard for live stats.',
    tags: ['Arduino', 'RFID', 'Node.js', 'MongoDB'],
    github: 'https://github.com',
    demo: 'https://github.com',
    color: '#a855f7',
    image: null,
  },
];

const COUNT = PROJECTS.length;
const RADIUS = 300;
const ANGLE_STEP = 360 / COUNT;
const SWIPE_THRESHOLD = 35;

export default function ProjectsPage() {
  const [active, setActive] = useState(0);
  const stageRef = useRef(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  const dragStartX = useRef(null);
  const hasDragged = useRef(false);
  // track last wheel direction to avoid double-firing
  const wheelLocked = useRef(false);

  const goTo = (idx) => setActive(((idx % COUNT) + COUNT) % COUNT);
  const prev = () => goTo(activeRef.current - 1);
  const next = () => goTo(activeRef.current + 1);

  // Pointer (mouse + touch)
  const onPointerDown = (e) => {
    dragStartX.current = e.clientX;
    hasDragged.current = false;
    stageRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (dragStartX.current === null) return;
    if (Math.abs(e.clientX - dragStartX.current) > 8) hasDragged.current = true;
  };

  const onPointerUp = (e) => {
    if (dragStartX.current === null) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) >= SWIPE_THRESHOLD) {
      dx < 0 ? next() : prev();
    }
    dragStartX.current = null;
  };

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Trackpad horizontal scroll — fire immediately on first significant delta,
  // then lock briefly so one swipe = one step
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const onWheel = (e) => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);

      // Ignore if mostly vertical
      if (absX < absY * 0.6 || absX < 5) return;
      e.preventDefault();

      if (wheelLocked.current) return;

      if (e.deltaX > 0) next();
      else prev();

      // Lock for a short window so a slow trackpad swipe doesn't fire multiple times
      wheelLocked.current = true;
      setTimeout(() => { wheelLocked.current = false; }, 350);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const project = PROJECTS[active];

  return (
    <section id="projects" className="relative w-full bg-[#050505] scroll-mt-20 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6 py-24">

        <div className="mb-16">
          <p className="font-mono text-xs text-[#22c55e] tracking-[0.3em] uppercase mb-3">02 — Showcase</p>
          <h2 className="font-sans font-bold text-4xl text-white">Projects</h2>
        </div>

        {/* 3D Wheel */}
        <div
          ref={stageRef}
          className="relative mx-auto mb-8 touch-pan-y select-none"
          style={{ height: 320, perspective: 900, cursor: 'grab' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div
            className="absolute left-1/2 top-1/2"
            style={{
              width: 0,
              height: 0,
              transformStyle: 'preserve-3d',
              transform: `translateX(-50%) translateY(-50%) rotateY(${-active * ANGLE_STEP}deg)`,
              transition: 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)',
            }}
          >
            {PROJECTS.map((p, i) => {
              const angle = i * ANGLE_STEP;
              const diff = (((angle - active * ANGLE_STEP) % 360) + 360) % 360;
              const norm = diff > 180 ? diff - 360 : diff;
              const cos = Math.cos((norm * Math.PI) / 180);
              const isFront = i === active;

              return (
                <div
                  key={p.id}
                  onClick={() => { if (!hasDragged.current && !isFront) goTo(i); }}
                  style={{
                    position: 'absolute',
                    width: 200,
                    height: 260,
                    left: -100,
                    top: -130,
                    transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                    opacity: Math.max(0.12, (cos + 1) / 2),
                    cursor: isFront ? 'default' : 'pointer',
                    transition: 'opacity 0.3s',
                  }}
                >
                  <div
                    className="w-full h-full rounded-2xl overflow-hidden flex flex-col border"
                    style={{
                      background: '#0f0f0f',
                      borderColor: isFront ? `${p.color}40` : 'rgba(255,255,255,0.06)',
                    }}
                  >
                    {/* Image area */}
                    <div className="relative overflow-hidden flex-shrink-0" style={{ height: 156 }}>
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-full h-full object-cover"
                          draggable={false}
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center"
                          style={{ background: `${p.color}0a` }}
                        >
                          <span className="font-mono text-[10px] tracking-widest uppercase"
                            style={{ color: `${p.color}35` }}>
                            no image
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Title area */}
                    <div className="flex flex-col justify-center px-4 py-3 flex-1">
                      <span className="font-mono text-[9px] tracking-widest uppercase mb-1"
                        style={{ color: isFront ? `${p.color}99` : 'rgba(255,255,255,0.2)' }}>
                        {p.no} · {p.year}
                      </span>
                      <span className="font-sans font-semibold text-[13px] leading-snug"
                        style={{ color: isFront ? '#fff' : 'rgba(255,255,255,0.3)' }}>
                        {p.title}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Nav */}
        <div className="flex justify-center items-center gap-6 mb-10">
          <button onClick={prev} className="font-mono text-xs text-gray-500 hover:text-white transition-colors">
            ← prev
          </button>
          <div className="flex gap-2">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === active ? 20 : 5,
                  height: 5,
                  background: i === active ? project.color : 'rgba(255,255,255,0.15)',
                }}
              />
            ))}
          </div>
          <button onClick={next} className="font-mono text-xs text-gray-500 hover:text-white transition-colors">
            next →
          </button>
        </div>

        {/* Detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="border border-white/8 rounded-2xl p-6 sm:p-8 bg-[#0a0a0a]"
          >
            <p className="font-mono text-[10px] tracking-widest uppercase mb-1"
              style={{ color: `${project.color}99` }}>
              {project.type} · {project.year}
            </p>
            <h3 className="font-sans font-bold text-white text-xl mb-3">{project.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">{project.desc}</p>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.tags.map(t => (
                <span key={t} className="px-2 py-0.5 font-mono text-[10px] rounded border border-white/8 text-gray-500">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-white transition-colors">
                <FiGithub size={13} /> GitHub
              </a>
              <a href={project.demo} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono hover:opacity-70 transition-opacity"
                style={{ color: project.color }}>
                <FiExternalLink size={13} /> Live
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}