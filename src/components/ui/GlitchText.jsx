const glitchStyles = `
  .glitch-wrap,
  .glitch-intro { position: relative; display: inline-block; }

  .glitch-wrap::before, .glitch-wrap::after,
  .glitch-intro::before, .glitch-intro::after {
    content: attr(data-text);
    position: absolute;
    inset: 0;
    white-space: pre-wrap;
    overflow: hidden;
    pointer-events: none;
  }

  /* ── Subtle periodic glitch (idle) ── */
  .glitch-wrap::before {
    color: #ff3b3b;
    mix-blend-mode: screen;
    animation: glitch-r 3.4s infinite;
  }
  .glitch-wrap::after {
    color: #3b9fff;
    mix-blend-mode: screen;
    animation: glitch-b 3.4s infinite;
  }
  @keyframes glitch-r {
    0%,44%,56%,100% { clip-path: none; transform: none; opacity: 0; }
    45% { clip-path: inset(15% 0 70% 0); transform: translate(-4px); opacity: 1; }
    47% { clip-path: inset(50% 0 20% 0); transform: translate(4px);  opacity: 1; }
    49% { clip-path: inset(5%  0 80% 0); transform: translate(-4px); opacity: 1; }
    51% { clip-path: inset(60% 0 10% 0); transform: translate(-3px); opacity: 1; }
    53% { clip-path: none; transform: none; opacity: 0; }
  }
  @keyframes glitch-b {
    0%,44%,56%,100% { clip-path: none; transform: none; opacity: 0; }
    45% { clip-path: inset(60% 0 10% 0); transform: translate(4px); opacity: 1; }
    47% { clip-path: inset(80% 0 5%  0); transform: translate(3px); opacity: 1; }
    49% { clip-path: inset(45% 0 30% 0); transform: translate(4px); opacity: 1; }
    51% { clip-path: inset(70% 0 15% 0); transform: translate(2px); opacity: 1; }
    53% { clip-path: none; transform: none; opacity: 0; }
  }

  /* ── Heavy intro glitch ── */
  .glitch-intro::before {
    color: #ff3b3b;
    mix-blend-mode: screen;
    opacity: 0.95;
    animation: gi-r 0.11s steps(1) infinite;
  }
  .glitch-intro::after {
    color: #3b9fff;
    mix-blend-mode: screen;
    opacity: 0.95;
    animation: gi-b 0.14s steps(1) infinite;
  }
  @keyframes gi-r {
    0%  { clip-path: inset(10% 0 75% 0); transform: translate(-8px,  2px); }
    12% { clip-path: inset(55% 0 20% 0); transform: translate( 6px, -3px); }
    25% { clip-path: inset(30% 0 50% 0); transform: translate(-6px,  0px); }
    37% { clip-path: inset(75% 0 5%  0); transform: translate( 8px,  1px); }
    50% { clip-path: inset(5%  0 85% 0); transform: translate(-5px, -2px); }
    62% { clip-path: inset(40% 0 35% 0); transform: translate( 7px,  3px); }
    75% { clip-path: inset(65% 0 15% 0); transform: translate(-8px, -1px); }
    87% { clip-path: inset(20% 0 60% 0); transform: translate( 5px,  2px); }
    100%{ clip-path: inset(48% 0 30% 0); transform: translate(-6px,  0px); }
  }
  @keyframes gi-b {
    0%  { clip-path: inset(65% 0 15% 0); transform: translate( 8px, -1px); }
    12% { clip-path: inset(20% 0 60% 0); transform: translate(-6px,  2px); }
    25% { clip-path: inset(85% 0 5%  0); transform: translate( 5px, -3px); }
    37% { clip-path: inset(5%  0 80% 0); transform: translate(-8px,  1px); }
    50% { clip-path: inset(45% 0 30% 0); transform: translate( 6px, -2px); }
    62% { clip-path: inset(25% 0 55% 0); transform: translate(-5px,  3px); }
    75% { clip-path: inset(70% 0 10% 0); transform: translate( 7px, -1px); }
    87% { clip-path: inset(35% 0 45% 0); transform: translate(-6px,  2px); }
    100%{ clip-path: inset(15% 0 65% 0); transform: translate( 8px,  0px); }
  }
`;

/**
 * GlitchText — wraps children with a CSS RGB-split glitch effect.
 * @param {boolean} intense - If true, uses the heavy intro glitch animation.
 */
const GlitchText = ({ children, className = '', intense = false }) => (
  <>
    <style>{glitchStyles}</style>
    <span
      className={`${intense ? 'glitch-intro' : 'glitch-wrap'} ${className}`}
      data-text={typeof children === 'string' ? children : undefined}
    >
      {children}
    </span>
  </>
);

export default GlitchText;
