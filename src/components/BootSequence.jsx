import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SEQUENCE = [
  { type: 'cmd',    text: 'cd ~/rex-portfolio',            speed: 60 },
  { type: 'output', text: '',                              speed: 0,  pause: 200 },
  { type: 'cmd',    text: 'npm install',                   speed: 60 },
  { type: 'output', text: 'added 312 packages in 3.421s', speed: 20 },
  { type: 'output', text: '',                              speed: 0,  pause: 150 },
  { type: 'cmd',    text: 'npm run dev',                   speed: 60 },
  { type: 'output', text: '',                              speed: 0,  pause: 300 },
  { type: 'output', text: '  ➜  Local:   http://localhost:5173/', speed: 18 },
  { type: 'output', text: '  ➜  Network: use --host to expose',   speed: 18 },
  { type: 'output', text: '',                              speed: 0,  pause: 200 },
  { type: 'output', text: '  ready in 312ms.',             speed: 20 },
  { type: 'output', text: '',                              speed: 0,  pause: 400 },
  { type: 'cmd',    text: 'open portfolio',                speed: 70 },
  { type: 'output', text: '',                              speed: 0,  pause: 150 },
  { type: 'output', text: '  Launching...',                speed: 30 },
];

const PROMPT = (
  <span>
    <span className="text-[#22c55e]">rex</span>
    <span className="text-gray-500">@</span>
    <span className="text-cyan-400">portfolio</span>
    <span className="text-gray-500"> ~ </span>
    <span className="text-white">$&nbsp;</span>
  </span>
);

const BootSequence = ({ onComplete }) => {
  const [renderedLines, setRenderedLines] = useState([]);
  const [showCursor, setShowCursor]       = useState(true);
  const [glitching, setGlitching]         = useState(false);
  const [exiting, setExiting]             = useState(false);
  const bodyRef = useRef(null);

  /* blinking cursor */
  useEffect(() => {
    const id = setInterval(() => setShowCursor(p => !p), 500);
    return () => clearInterval(id);
  }, []);

  /* typing sequence */
  useEffect(() => {
    let cancelled = false;
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    const run = async () => {
      await sleep(600);

      for (let i = 0; i < SEQUENCE.length; i++) {
        if (cancelled) return;
        const entry = SEQUENCE[i];

        if (entry.type === 'output' && entry.text === '') {
          setRenderedLines(prev => [...prev, { type: 'output', text: '' }]);
          await sleep(entry.pause || 80);
          continue;
        }

        setRenderedLines(prev => [...prev, { type: entry.type, text: '', final: entry.text }]);
        await sleep(80);

        for (let c = 0; c <= entry.text.length; c++) {
          if (cancelled) return;
          setRenderedLines(prev => {
            const next = [...prev];
            next[next.length - 1] = { ...next[next.length - 1], text: entry.text.slice(0, c) };
            return next;
          });
          if (c < entry.text.length) await sleep(entry.speed);
        }

        if (entry.type === 'cmd') await sleep(300);
        else await sleep(entry.pause || 50);

        if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
      }

      if (!cancelled) {
        // 1. Start glitch after sequence ends
        await sleep(400);
        setGlitching(true);

        // 2. Glitch for ~2.4 s then begin exit
        await sleep(2400);
        if (!cancelled) {
          setGlitching(false);
          setExiting(true);
          await sleep(900);
          if (!cancelled) onComplete();
        }
      }
    };

    run();
    return () => { cancelled = true; };
  }, [onComplete]);

  return (
    <>
      {/* Glitch CSS injected once */}
      <style>{`
        @keyframes glitch-clip-1 {
          0%   { clip-path: inset(20% 0 60% 0); transform: translate(-4px, 0); }
          20%  { clip-path: inset(50% 0 20% 0); transform: translate(4px, 0); }
          40%  { clip-path: inset(70% 0 5%  0); transform: translate(-2px, 0); }
          60%  { clip-path: inset(10% 0 75% 0); transform: translate(3px, 0); }
          80%  { clip-path: inset(35% 0 40% 0); transform: translate(-4px, 0); }
          100% { clip-path: inset(60% 0 20% 0); transform: translate(0, 0); }
        }
        @keyframes glitch-clip-2 {
          0%   { clip-path: inset(65% 0 10% 0); transform: translate(4px, 0); }
          25%  { clip-path: inset(30% 0 45% 0); transform: translate(-4px, 0); }
          50%  { clip-path: inset(5%  0 80% 0); transform: translate(2px, 0); }
          75%  { clip-path: inset(80% 0 5%  0); transform: translate(-3px, 0); }
          100% { clip-path: inset(45% 0 30% 0); transform: translate(0, 0); }
        }
        @keyframes glitch-flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
          20%, 22%, 24%, 55% { opacity: 0.4; }
        }
        @keyframes rgb-red {
          0%, 100% { transform: translate(-3px, 0); opacity: 0.6; }
          50%       { transform: translate(3px, 0);  opacity: 0.4; }
        }
        @keyframes rgb-blue {
          0%, 100% { transform: translate(3px, 0);  opacity: 0.6; }
          50%       { transform: translate(-3px, 0); opacity: 0.4; }
        }
        .glitch-main  { animation: glitch-flicker 0.18s infinite; }
        .glitch-red   { animation: glitch-clip-1 0.22s infinite, rgb-red 0.22s infinite; }
        .glitch-blue  { animation: glitch-clip-2 0.25s infinite, rgb-blue 0.25s infinite; }
      `}</style>

      <motion.div
        initial={{ opacity: 1 }}
        animate={exiting ? { opacity: 0, scale: 1.06, filter: 'blur(16px)' } : {}}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center p-4 font-mono overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(34,197,94,0.04),transparent)]" />

        {/* Terminal window — rendered 3× for glitch layers */}
        {[
          { cls: glitching ? 'glitch-main' : '', style: {} },
          { cls: glitching ? 'glitch-red pointer-events-none' : 'hidden', style: { color: '#ff3333', position: 'absolute', mixBlendMode: 'screen' } },
          { cls: glitching ? 'glitch-blue pointer-events-none' : 'hidden', style: { color: '#3333ff', position: 'absolute', mixBlendMode: 'screen' } },
        ].map(({ cls, style }, layerIdx) => (
          <motion.div
            key={layerIdx}
            initial={layerIdx === 0 ? { opacity: 0, y: 24, scale: 0.98 } : {}}
            animate={layerIdx === 0 ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`w-full max-w-2xl rounded-xl overflow-hidden border border-white/8 shadow-[0_32px_80px_rgba(0,0,0,0.8)] ${cls}`}
            style={style}
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-auto text-gray-500 text-xs tracking-widest">bash — 80×24</span>
            </div>

            {/* Terminal body */}
            <div
              ref={layerIdx === 0 ? bodyRef : null}
              className="bg-[#0d0d0d] p-6 min-h-[340px] max-h-[420px] overflow-y-auto text-sm md:text-base leading-7 tracking-wide"
              style={{ scrollbarWidth: 'none' }}
            >
              {renderedLines.map((line, i) => {
                const isLast = i === renderedLines.length - 1;

                if (line.type === 'cmd') {
                  return (
                    <div key={i} className="flex items-start">
                      <span className="shrink-0">{PROMPT}</span>
                      <span className="text-white break-all">
                        {line.text}
                        {isLast && !glitching && (
                          <span className={`inline-block w-[9px] h-[1.1em] align-middle ml-0.5 bg-white ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
                        )}
                      </span>
                    </div>
                  );
                }

                return (
                  <div key={i} className={`break-all ${
                    line.text.includes('➜')        ? 'text-cyan-400' :
                    line.text.includes('Launching') ? 'text-[#22c55e] font-semibold' :
                    line.text.includes('ready')     ? 'text-[#22c55e]' :
                    'text-gray-400'
                  }`}>
                    {line.text}
                    {isLast && line.text !== '' && !glitching && (
                      <span className={`inline-block w-[9px] h-[1.1em] align-middle ml-0.5 bg-[#22c55e] ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default BootSequence;
