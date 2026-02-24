import React from "react";
import { motion } from "framer-motion";

const Scene5_Resonance: React.FC = () => {
  return (
    <div className="relative min-h-[100dvh] bg-[#d8d3c8] text-stone-800 flex flex-col items-center justify-center p-6 overflow-hidden">
      <div className="absolute top-0 right-0 w-[50vh] h-[50vh] bg-orange-200/50 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-lg z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-800 tracking-widest mb-3">
            RESONANCE
          </h2>
          <p className="text-stone-500 font-serif italic text-sm">
            即使相隔两地，我们也总在听同一首歌
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative w-64 h-64 sm:w-80 sm:h-80 mb-16"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="w-full h-full rounded-full bg-[#111] shadow-2xl flex items-center justify-center border-4 border-[#222] relative overflow-hidden"
          >
            <div className="absolute inset-2 rounded-full border border-[#222]"></div>
            <div className="absolute inset-4 rounded-full border border-[#222]"></div>
            <div className="absolute inset-8 rounded-full border border-[#222]"></div>
            <div className="absolute inset-12 rounded-full border border-[#222]"></div>
            <div className="absolute inset-16 rounded-full border border-[#222]"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none mix-blend-overlay"></div>

            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-orange-400 to-red-600 flex flex-col items-center justify-center shadow-inner relative">
              <div className="w-3 h-3 bg-[#e6e4df] rounded-full absolute center"></div>
              <p className="text-[8px] sm:text-[10px] text-white/80 font-bold tracking-widest uppercase mt-6">
                Sunset Blvd
              </p>
              <p className="text-[6px] sm:text-[8px] text-white/60 font-mono mt-1">
                SIDE A - 33 ⅓ RPM
              </p>
            </div>
          </motion.div>

          <div className="absolute top-4 -right-4 w-4 h-32 bg-stone-300 rounded-full origin-top transform rotate-[25deg] shadow-xl border border-stone-200">
            <div className="absolute bottom-0 w-6 h-10 bg-stone-800 -left-1 rounded-sm"></div>
            <div className="absolute top-2 w-8 h-8 bg-stone-400 rounded-full -left-2 shadow-inner"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="bg-stone-50/80 backdrop-blur-md px-6 py-4 rounded-2xl shadow-sm border border-stone-200/50 inline-block">
            <p className="text-xs text-amber-600 font-mono tracking-widest mb-1 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>{" "}
              NOW PLAYING
            </p>
            <p className="text-sm sm:text-base font-medium text-stone-700">
              日落大道 (Live) - 你的耳机 & 我的耳机
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Scene5_Resonance;
