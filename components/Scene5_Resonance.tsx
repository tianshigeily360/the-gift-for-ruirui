import React from 'react';
import { motion } from 'framer-motion';

const Scene5_Resonance: React.FC = () => {
  return (
    <div className="relative h-screen bg-slate-900 overflow-hidden flex items-center justify-center">
      {/* Blurred Video Background Placeholder */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-screen"
        style={{ backgroundImage: 'url(https://picsum.photos/1920/1080?blur=10&random=10)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900"></div>
      </div>

      <div className="relative z-10 text-center w-full px-4">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8"
        >
          共 频 (RESONANCE)
        </motion.h2>
        
        <p className="text-white/80 font-sans text-lg mb-12 tracking-wider">
          "在人海中，我们的频率是同步的。"
        </p>

        {/* Audio Visualizer Simulation */}
        <div className="flex items-end justify-center gap-2 h-32">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="w-4 bg-pink-500 rounded-t-sm shadow-[0_0_15px_rgba(236,72,153,0.6)]"
              animate={{
                height: ["10%", "80%", "30%", "100%", "50%"],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatType: "mirror",
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="mt-8 text-xs text-pink-300 font-mono border border-pink-500/30 inline-block px-4 py-2 rounded-full backdrop-blur-md">
          ♫ 正在播放: 日落大道 - Live Ver.
        </div>
      </div>
    </div>
  );
};

export default Scene5_Resonance;