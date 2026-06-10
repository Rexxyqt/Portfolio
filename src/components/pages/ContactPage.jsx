import { useState } from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiSend, FiCheck, FiExternalLink } from 'react-icons/fi';

const CONTACT_LINKS = [
  {
    label: 'Email',
    value: 'rex@dev.com',
    href: 'mailto:rex@dev.com',
    icon: FiMail,
    desc: 'Drop me a message anytime',
  },
  {
    label: 'GitHub',
    value: 'github.com/rex',
    href: 'https://github.com',
    icon: FiGithub,
    desc: 'Check out my open-source work',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/rex',
    href: 'https://linkedin.com',
    icon: FiLinkedin,
    desc: 'Let\'s connect professionally',
  },
];

const ContactPage = () => {
  const [form, setForm]     = useState({ name: '', email: '', message: '' });
  const [sent, setSent]     = useState(false);
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Name is required';
    if (!form.email.includes('@')) e.email = 'Valid email required';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', message: '' });
  };

  const inputCls = (field) => `
    w-full bg-white/[0.03] border rounded-xl px-4 py-3.5 text-sm font-mono text-white/90
    placeholder:text-gray-600 outline-none transition-all duration-300
    ${errors[field]
      ? 'border-red-500/60 focus:border-red-500 focus:shadow-[0_0_16px_rgba(239,68,68,0.15)]'
      : focused === field
        ? 'border-[#22c55e]/60 shadow-[0_0_16px_rgba(34,197,94,0.1)] bg-[#22c55e]/5'
        : 'border-white/8 hover:border-white/15'
    }
  `;

  return (
    <section
      id="contact"
      className="relative w-full py-24 bg-[#050505] overflow-hidden scroll-mt-16"
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 h-[500px] w-[800px] bg-[#22c55e]/8 blur-3xl rounded-full" />
        <div className="absolute top-0 right-0 h-[300px] w-[400px] bg-[#22c55e]/5 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Section header */}
        <AnimatedSection direction="left" className="mb-16">
          <p className="font-mono text-xs text-[#22c55e] tracking-[0.35em] uppercase mb-4">Contact</p>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Let's Build Together
          </h2>
          <p className="mt-5 text-gray-400 font-mono text-base max-w-2xl leading-relaxed">
            Got a project idea, internship opportunity, or just want to say hi?
            I'd love to hear from you.
          </p>
          <div className="mt-4 h-px w-24 bg-gradient-to-r from-[#22c55e] to-transparent" />
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Contact form */}
          <AnimatedSection direction="left" delay={0.1}>
            <div className="p-6 sm:p-8 rounded-2xl border border-white/8 bg-white/[0.015] backdrop-blur-sm">
              <h3 className="font-semibold text-white mb-6">Send a Message</h3>

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/40 flex items-center justify-center mb-4 shadow-[0_0_32px_rgba(34,197,94,0.2)]">
                      <FiCheck className="text-[#22c55e]" size={28} />
                    </div>
                    <p className="text-white font-semibold">Message sent!</p>
                    <p className="text-gray-500 font-mono text-sm mt-1">I'll get back to you soon.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    noValidate
                  >
                    <div>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        className={inputCls('name')}
                        autoComplete="name"
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-red-400 font-mono">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        className={inputCls('email')}
                        autoComplete="email"
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-red-400 font-mono">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <textarea
                        id="contact-message"
                        placeholder="Tell me about your project or opportunity..."
                        rows={5}
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        onFocus={() => setFocused('message')}
                        onBlur={() => setFocused(null)}
                        className={`${inputCls('message')} resize-none`}
                      />
                      {errors.message && (
                        <p className="mt-1.5 text-xs text-red-400 font-mono">{errors.message}</p>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#22c55e] text-black rounded-xl font-bold text-sm hover:bg-[#16a34a] transition-colors duration-300 shadow-[0_0_24px_rgba(34,197,94,0.35)] hover:shadow-[0_0_36px_rgba(34,197,94,0.5)]"
                    >
                      <FiSend size={16} />
                      Send Message
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </AnimatedSection>

          {/* Contact cards */}
          <div className="space-y-4">
            {CONTACT_LINKS.map((item, i) => {
              const Icon = item.icon;
              return (
                <AnimatedSection key={item.label} direction="right" delay={0.1 + i * 0.1}>
                  <motion.a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    whileHover={{ x: 6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="flex items-center gap-5 p-5 rounded-2xl border border-white/8 bg-white/[0.02] hover:bg-[#22c55e]/5 hover:border-[#22c55e]/30 transition-colors duration-300 group"
                  >
                    <div className="flex-shrink-0 p-3 rounded-xl bg-[#22c55e]/10 text-[#22c55e] group-hover:bg-[#22c55e]/20 transition-colors">
                      <Icon size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-xs text-gray-500 tracking-widest uppercase">{item.label}</p>
                      <p className="font-mono text-white/90 text-sm mt-0.5 truncate">{item.value}</p>
                      <p className="font-mono text-gray-600 text-xs mt-1">{item.desc}</p>
                    </div>
                    <FiExternalLink className="flex-shrink-0 text-gray-600 group-hover:text-[#22c55e] transition-colors" size={16} />
                  </motion.a>
                </AnimatedSection>
              );
            })}

            <AnimatedSection delay={0.4}>
              <div className="mt-8 p-5 rounded-2xl border border-[#22c55e]/20 bg-[#22c55e]/5">
                <p className="font-mono text-xs text-[#22c55e] tracking-widest uppercase mb-2">Response Time</p>
                <p className="text-gray-400 font-mono text-sm leading-relaxed">
                  I typically respond within <span className="text-white">24–48 hours</span>.
                  For urgent matters, email is the fastest way to reach me.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
