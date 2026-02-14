import React from 'react';
import { motion } from 'framer-motion';

const Scene2_FirstEncounter: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-orange-50 flex items-center justify-center py-20 overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]"></div>

      <div className="relative z-10 perspective-1000 w-full max-w-lg px-4">
        <motion.div
          initial={{ rotateY: 0, rotateZ: -5 }}
          whileInView={{ rotateY: 180, rotateZ: 2 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.2 }}
          className="relative w-full aspect-[3/4] preserve-3d cursor-pointer"
        >
          {/* Back of Photo (Initial View) */}
          <div className="absolute inset-0 backface-hidden bg-stone-200 shadow-2xl rounded p-4 flex flex-col items-center justify-center border-8 border-white">
            <div className="w-full h-full bg-stone-800 flex items-center justify-center rounded-sm">
              <span className="font-serif text-stone-400 text-2xl tracking-widest opacity-50">KODAK PORTRA</span>
            </div>
            <div className="absolute bottom-12 font-handwriting text-stone-600 text-3xl font-serif -rotate-6">
              兰州, 20XX
            </div>
          </div>

          {/* Front of Photo (Revealed View) */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white shadow-2xl rounded p-4 pb-20 border border-stone-100">
             <div className="w-full h-full bg-stone-100 overflow-hidden rounded-sm relative">
                <img 
                  src="https://picsum.photos/600/800?random=3" 
                  alt="First Encounter" 
                  className="w-full h-full object-cover sepia-[.3]" 
                />
             </div>
             <div className="absolute bottom-6 left-0 right-0 text-center px-4">
               <p className="font-serif text-stone-800 text-lg italic">
                 "跨越虚拟的边界，第一次触碰到真实的温度。"
               </p>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Scene2_FirstEncounter;