/**
 * Footer — site-wide footer with social links.
 */
const Footer = () => (
  <footer className="w-full flex justify-center px-6 py-8 bg-[#050505] border-t border-white/10">
    <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4">
      <small className="text-gray-500 font-mono">
        © {new Date().getFullYear()} Rex Latayada. All rights reserved.
      </small>
      <div className="flex gap-6 font-mono text-sm">
        <a href="https://github.com"   target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#22c55e] transition-colors">GitHub</a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#22c55e] transition-colors">LinkedIn</a>
        <a href="mailto:rex@dev.com"                                              className="text-gray-400 hover:text-[#22c55e] transition-colors">Email</a>
      </div>
    </div>
  </footer>
);

export default Footer;
