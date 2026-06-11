import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SiReact, SiJavascript, SiTypescript, SiTailwindcss, SiPython,
  SiNodedotjs, SiExpress, SiPostgresql, SiFirebase, SiMongodb,
  SiArduino, SiCplusplus, SiRaspberrypi, SiLinux,
} from 'react-icons/si';
import { FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { FiCpu, FiWifi } from 'react-icons/fi';

const ALL_SKILLS = [
  // Frontend
  { name: 'React',        icon: SiReact,       color: '#61DAFB', cat: 'Frontend',          level: 90, mem: '182MB', threads: 12, status: 'ACTIVE',  logs: ['Mounting reconciler v19...', 'Fiber scheduler initialized', 'Virtual DOM diff engine OK', 'Hot-reload socket listening'] },
  { name: 'JavaScript',  icon: SiJavascript,   color: '#F7DF1E', cat: 'Frontend',          level: 92, mem: '68MB',  threads: 4,  status: 'ACTIVE',  logs: ['V8 engine v11.4 boot', 'JIT compilation ON', 'Event loop ready', 'ES2023 module resolution OK'] },
  { name: 'TypeScript',  icon: SiTypescript,   color: '#3178C6', cat: 'Frontend',          level: 78, mem: '44MB',  threads: 2,  status: 'ACTIVE',  logs: ['TSC 5.4 compiling...', 'Strict mode ON', 'Type inference loaded', 'Declaration emit ready'] },
  { name: 'HTML5',        icon: FaHtml5,        color: '#E34F26', cat: 'Frontend',          level: 95, mem: '12MB',  threads: 1,  status: 'ACTIVE',  logs: ['DOM parser ready', 'Semantic tree built', 'Accessibility tree OK', 'ARIA roles mapped'] },
  { name: 'CSS3',         icon: FaCss3Alt,      color: '#1572B6', cat: 'Frontend',          level: 88, mem: '9MB',   threads: 1,  status: 'ACTIVE',  logs: ['CSSOM constructed', 'GPU layer compositor ON', 'Animation engine ready', 'Media query handler OK'] },
  { name: 'Tailwind',    icon: SiTailwindcss,  color: '#06B6D4', cat: 'Frontend',          level: 85, mem: '14MB',  threads: 1,  status: 'ACTIVE',  logs: ['Config scanner done', 'JIT engine running', 'PurgeCSS integration OK', 'Design tokens loaded'] },
  // Backend
  { name: 'Python',       icon: SiPython,       color: '#3776AB', cat: 'Backend',           level: 80, mem: '48MB',  threads: 6,  status: 'ACTIVE',  logs: ['CPython 3.12 boot', 'asyncio event loop ready', 'pip packages resolved', 'WSGI server handshake OK'] },
  { name: 'Node.js',     icon: SiNodedotjs,    color: '#5FA04E', cat: 'Backend',           level: 84, mem: '72MB',  threads: 8,  status: 'ACTIVE',  logs: ['libuv v1.48 init', 'Event loop running', 'npm registry sync', 'HTTP/2 server ready'] },
  { name: 'Express',     icon: SiExpress,      color: '#cccccc', cat: 'Backend',           level: 82, mem: '21MB',  threads: 4,  status: 'ACTIVE',  logs: ['Middleware chain loaded', 'Router map compiled', 'CORS headers applied', 'Request pipeline ready'] },
  { name: 'PostgreSQL',  icon: SiPostgresql,   color: '#4169E1', cat: 'Backend',           level: 75, mem: '124MB', threads: 16, status: 'ACTIVE',  logs: ['PG 16 boot sequence', 'WAL writer initialized', 'Connection pool 32/32', 'Query planner ready'] },
  { name: 'Firebase',    icon: SiFirebase,     color: '#FFCA28', cat: 'Backend',           level: 78, mem: '38MB',  threads: 3,  status: 'ACTIVE',  logs: ['SDK 10 authenticated', 'Firestore listener ON', 'Auth state synced', 'FCM push gateway OK'] },
  { name: 'MongoDB',     icon: SiMongodb,      color: '#47A248', cat: 'Backend',           level: 72, mem: '88MB',  threads: 10, status: 'ACTIVE',  logs: ['WiredTiger engine ON', 'Index cache warm', 'Replica set healthy', 'Aggregation pipeline OK'] },
  // IoT
  { name: 'Arduino/C++', icon: SiArduino,      color: '#00979D', cat: 'IoT & Systems',     level: 85, mem: '2KB',   threads: 1,  status: 'ACTIVE',  logs: ['AVR bootloader done', 'GPIO map loaded', 'Timer ISR registered', 'Serial baud 115200 OK'] },
  { name: 'Embedded C++',icon: SiCplusplus,    color: '#00599C', cat: 'IoT & Systems',     level: 76, mem: '8KB',   threads: 2,  status: 'ACTIVE',  logs: ['RTOS kernel v3.2 boot', 'FreeHeap 24576B', 'DMA transfer init', 'Register map loaded'] },
  { name: 'Raspberry Pi',icon: SiRaspberrypi,  color: '#A22846', cat: 'IoT & Systems',     level: 80, mem: '512MB', threads: 4,  status: 'ACTIVE',  logs: ['Raspbian 12 boot', 'GPIO daemon running', 'I2C bus 1 ready', 'SPI0 slave registered'] },
  { name: 'Linux OS',    icon: SiLinux,        color: '#FCC624', cat: 'IoT & Systems',     level: 77, mem: '256MB', threads: 64, status: 'ACTIVE',  logs: ['Kernel 6.1 LTS loaded', 'systemd PID 1', 'iptables rules applied', 'cron daemon ready'] },
  { name: 'MQTT',        icon: FiWifi,         color: '#22C55E', cat: 'IoT & Systems',     level: 83, mem: '4MB',   threads: 2,  status: 'ACTIVE',  logs: ['Broker handshake OK', 'QoS level 2 ready', 'Topic subscriptions 14', 'Retain buffer flushed'] },
  { name: 'Prototyping', icon: FiCpu,          color: '#A855F7', cat: 'IoT & Systems',     level: 88, mem: '—',     threads: 1,  status: 'ACTIVE',  logs: ['PCB schema loaded', 'Component check passed', 'DMM calibrated', 'Logic analyzer ready'] },
];

const CATEGORIES = ['All', 'Frontend', 'Backend', 'IoT & Systems'];

function useTypewriter(text, speed = 30) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return displayed;
}

export default function DiagnosticsPanel() {
  const [selected, setSelected] = useState(ALL_SKILLS[0]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [logLines, setLogLines] = useState([]);

  const visibleSkills = activeCategory === 'All'
    ? ALL_SKILLS
    : ALL_SKILLS.filter(s => s.cat === activeCategory);

  useEffect(() => {
    setLogLines([]);
    let i = 0;
    const id = setInterval(() => {
      if (i < selected.logs.length) {
        setLogLines(prev => [...prev, selected.logs[i]]);
        i++;
      } else {
        clearInterval(id);
      }
    }, 280);
    return () => clearInterval(id);
  }, [selected]);

  const Icon = selected.icon;

  return (
    <div className="w-full h-full flex flex-col gap-8 px-6 py-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-end gap-6 select-none mb-4">
        <span className="font-display font-extrabold text-white/5 text-[clamp(5rem,12vw,9rem)] leading-none">03</span>
        <div className="pb-3">
          <p className="font-mono text-[10px] text-[#22c55e] tracking-[0.4em] uppercase mb-2">Capabilities</p>
          <h2 className="font-display font-extrabold text-[clamp(2rem,5vw,4rem)] text-white leading-none tracking-tight">
            Skills.sys
          </h2>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded-full text-[11px] font-mono tracking-wider border transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-[#22c55e] text-black border-[#22c55e]'
                : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white/70'
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Main Split Panel */}
      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        {/* Left: Skill Grid Selector */}
        <div className="lg:w-1/2 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-2 content-start overflow-y-auto pr-2 max-h-[50vh] lg:max-h-none">
          {visibleSkills.map(skill => {
            const SIcon = skill.icon;
            const isActive = selected.name === skill.name;
            return (
              <motion.button
                key={skill.name}
                onClick={() => setSelected(skill)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border text-center transition-all duration-200 ${
                  isActive
                    ? 'border-[#22c55e]/60 bg-[#22c55e]/8 shadow-[0_0_20px_rgba(34,197,94,0.12)]'
                    : 'border-white/5 bg-white/[0.02] hover:border-white/15'
                }`}
              >
                <SIcon className="text-2xl" style={{ color: isActive ? skill.color : '#555' }} />
                <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest leading-tight">
                  {skill.name}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="skill-indicator"
                    className="absolute -top-px left-0 right-0 h-px"
                    style={{ background: skill.color }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Right: Diagnostics Console */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="lg:w-1/2 flex flex-col gap-4"
          >
            {/* System ID card */}
            <div className="corner-brackets p-5 border border-white/8 rounded-xl bg-[#0a0a0a]">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${selected.color}18`, border: `1px solid ${selected.color}40` }}
                >
                  <Icon size={26} style={{ color: selected.color }} />
                </div>
                <div>
                  <p className="font-mono text-[10px] text-gray-600 tracking-widest uppercase">MODULE</p>
                  <h3 className="font-display font-bold text-white text-lg leading-tight">{selected.name}</h3>
                  <p className="font-mono text-[10px]" style={{ color: selected.color }}>{selected.cat}</p>
                </div>
                <div className="ml-auto flex flex-col items-end">
                  <span className="font-mono text-[9px] text-[#22c55e] tracking-widest">{selected.status}</span>
                  <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-glow-pulse mt-1" />
                </div>
              </div>

              {/* Level gauge */}
              <div className="mb-4">
                <div className="flex justify-between font-mono text-[10px] text-gray-500 mb-1">
                  <span>PROFICIENCY</span>
                  <span style={{ color: selected.color }}>{selected.level}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${selected.level}%` }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${selected.color}88, ${selected.color})` }}
                  />
                </div>
              </div>

              {/* System metrics */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'MEM', val: selected.mem },
                  { label: 'THREADS', val: selected.threads },
                  { label: 'STATUS', val: selected.status },
                ].map(m => (
                  <div key={m.label} className="bg-black/40 rounded-lg p-2 text-center border border-white/4">
                    <p className="font-mono text-[8px] text-gray-600 tracking-widest">{m.label}</p>
                    <p className="font-mono text-[12px] text-white/80 font-semibold mt-0.5">{m.val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal log */}
            <div className="flex-1 bg-black/60 border border-white/6 rounded-xl p-4 font-mono min-h-[140px]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-auto text-[9px] text-gray-600 tracking-widest">DIAGNOSTIC_LOG</span>
              </div>
              <div className="space-y-1.5">
                {logLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex gap-2 text-[11px]"
                  >
                    <span className="text-[#22c55e] shrink-0">›</span>
                    <span className="text-gray-400">{line}</span>
                  </motion.div>
                ))}
                {logLines.length < selected.logs.length && (
                  <div className="flex gap-2 text-[11px]">
                    <span className="text-[#22c55e]">›</span>
                    <span className="text-white blink-cursor">_</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
