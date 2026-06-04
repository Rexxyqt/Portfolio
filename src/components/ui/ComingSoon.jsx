/**
 * ComingSoon — placeholder section shown until a section is built out.
 * @param {string} id    - Section anchor id.
 * @param {string} label - Section label shown above "Coming Soon".
 */
const ComingSoon = ({ id, label }) => (
  <section id={id} className="w-full py-24 border-t border-white/10 bg-[#050505]">
    <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center gap-4 min-h-[200px] text-center">
      <p className="font-mono text-xs text-[#22c55e] tracking-[0.3em] uppercase">{label}</p>
      <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Coming Soon</h2>
      <p className="text-gray-500 font-mono text-sm mt-2">This section is under construction.</p>
    </div>
  </section>
);

export default ComingSoon;
