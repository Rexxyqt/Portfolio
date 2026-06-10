import { motion } from 'framer-motion';

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const AboutMe = () => (
  <section id="about" className="relative w-full max-w-5xl mx-auto px-6 py-20">
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="border-t border-[#22c55e]/20 pt-10">
      <h2 className="font-mono text-xl sm:text-2xl text-[#22c55e] tracking-[0.2em] uppercase mb-8">
        👨‍💻 About Me
      </h2>
      <div className="space-y-4 text-base sm:text-lg text-gray-400">
        <p>🎓 Pursuing a <strong>Bachelor of Science in Information Technology (BSIT)</strong></p>
        <p>🏫 <strong>Technological University of the Philippines – Manila</strong></p>
        <p>⚙️ Skilled in <strong>Microcontrollers</strong>, <strong>mobile and desktop app development</strong>, and <strong>system design</strong></p>
        <p>🧠 Always learning. Always building.</p>
      </div>
    </motion.div>
  </section>
);

export default AboutMe;
