import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BootSequence from './components/BootSequence';
import ModernPortfolio from './components/ModernPortfolio';

function App() {
  const [bootComplete, setBootComplete] = useState(false);

  const handleBootComplete = useCallback(() => {
    setBootComplete(true);
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen overflow-x-hidden selection:bg-[#22c55e]/30 selection:text-white text-white">
      {/* SCENE 1: Authentic Developer Boot Sequence */}
      <AnimatePresence mode="wait">
        {!bootComplete && (
          <BootSequence key="boot" onComplete={handleBootComplete} />
        )}
      </AnimatePresence>

      {/* SCENE 2: Main Portfolio (Clean Layout + Matrix Background) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: bootComplete ? 1 : 0 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        className={!bootComplete ? 'pointer-events-none h-0 overflow-hidden' : ''}
      >
        {bootComplete && <ModernPortfolio />}
      </motion.div>
    </div>
  );
}

export default App;
