import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Scene6_Promise: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] bg-[#f0eee9] flex flex-col items-center justify-center p-6 relative overflow-hidden perspective-1000">
      <div className="text-center mb-16 z-10">
        <h2 className="text-3xl font-serif text-stone-800 mb-4">The Promise</h2>
        <p className="text-stone-500 font-light text-sm">
          点击火漆印，解开最后的封印
        </p>
      </div>

      <div className="relative w-full max-w-md h-64 sm:h-72 z-20 flex justify-center items-center">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              exit={{ opacity: 0, scale: 0.9, rotateX: 20 }}
              transition={{ duration: 0.5 }}
              className="absolute w-full h-full bg-white rounded-md shadow-xl border border-stone-100 flex items-center justify-center cursor-pointer group"
              onClick={() => setIsOpen(true)}
            >
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,0 L50,50 L100,0"
                  vectorEffect="non-scaling-stroke"
                  fill="none"
                  stroke="#e5e5e5"
                  strokeWidth="2"
                  className="w-full h-full"
                  viewBox="0 0 100 100"
                />
              </svg>

              <div className="absolute top-[45%] w-16 h-16 bg-red-700 rounded-full shadow-md flex items-center justify-center transition-transform group-hover:scale-110">
                <div className="w-14 h-14 rounded-full border border-red-800 flex items-center justify-center bg-red-800/20">
                  <span className="font-serif text-red-100 text-xl font-bold italic">
                    R
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="absolute w-full h-[120%] bg-stone-50 rounded-sm shadow-2xl border border-stone-200 p-8 sm:p-10 flex flex-col"
            >
              <div className="flex-1">
                <h3 className="text-xl font-serif text-stone-800 mb-6 border-b border-stone-200 pb-4">
                  写给未来的信
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed font-light mb-4">
                  从剑网三的虚拟坐标，到现实里真真切切的牵挂。
                  <br />
                  <br />
                  距离或许还能横亘一段时间，但它挡不住两颗已经决定要生活在一起的心。
                </p>
                <div className="bg-[#f8f7f5] p-4 rounded border border-stone-200 text-center my-6">
                  <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">
                    现在，请看向现实
                  </p>
                  <p className="text-base text-stone-800 font-medium">
                    “去打开桌上那个金色的盒子吧。”
                  </p>
                </div>
              </div>

              <div className="mt-auto border-t border-stone-200 pt-4 flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-stone-400 uppercase tracking-widest mb-1">
                    Time Left
                  </p>
                  <p className="text-lg font-serif text-amber-600">
                    2年婚约 · 倒计时中
                  </p>
                </div>
                <div className="w-10 h-10 border border-red-700/30 rounded-full flex items-center justify-center opacity-50">
                  <span className="font-serif text-red-700 text-xs italic">
                    Sealed
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Scene6_Promise;
