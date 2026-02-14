import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart } from 'lucide-react';

const Scene6_Promise: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-amber-50 flex flex-col items-center justify-center p-8 text-center relative">
      
      <div className="max-w-3xl space-y-8 z-10">
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="space-y-4"
        >
          <h2 className="text-4xl font-serif text-slate-800">现在与承诺</h2>
          <div className="h-1 w-20 bg-amber-400 mx-auto rounded-full"></div>
          <p className="text-slate-600 leading-relaxed font-sans max-w-lg mx-auto">
            从剑网三的虚拟坐标到深圳的霓虹灯火。<br/>
            算法终于收敛至唯一的解。
          </p>
        </motion.div>

        {/* The Box */}
        <motion.div 
          className="py-12"
          whileHover={{ scale: 1.05 }}
        >
          <button 
            onClick={() => setShowModal(true)}
            className="relative group bg-white p-8 rounded-2xl shadow-2xl border border-amber-100 mx-auto flex flex-col items-center gap-4 transition-all hover:shadow-amber-200/50"
          >
            <div className="bg-amber-100 p-6 rounded-full group-hover:bg-amber-200 transition-colors">
              <Gift size={48} className="text-amber-600" />
            </div>
            <span className="font-mono text-amber-900 font-bold tracking-widest">
              [ 部署未来计划 ]
            </span>
          </button>
        </motion.div>

        <div className="flex justify-center gap-4 opacity-50">
          <img src="https://picsum.photos/150/150?random=11" className="rounded-lg rotate-3" alt="Memory" />
          <img src="https://picsum.photos/150/150?random=12" className="rounded-lg -rotate-3" alt="Memory" />
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full relative z-50 text-center border-t-4 border-amber-400"
            >
              <div className="mb-6 flex justify-center">
                <Heart className="text-red-500 fill-red-500 animate-pulse" size={40} />
              </div>
              
              <h3 className="text-2xl font-serif text-slate-900 mb-2">协议已启动</h3>
              <p className="text-slate-500 font-mono text-sm mb-6">ID: FOREVER_AND_ALWAYS</p>
              
              <div className="bg-amber-50 p-6 rounded-lg border border-amber-100 mb-6">
                <p className="text-amber-900 font-medium mb-2">目标锁定:</p>
                <p className="text-lg">"去打开桌上那个金色的盒子。"</p>
              </div>

              <div className="border-t border-slate-100 pt-4">
                 <p className="text-xs text-slate-400 font-mono uppercase tracking-widest mb-1">倒计时状态</p>
                 <p className="text-xl font-bold text-slate-800">2年婚约倒计时: 已启动</p>
              </div>

              <button 
                onClick={() => setShowModal(false)}
                className="mt-8 text-sm text-slate-400 hover:text-slate-600 underline"
              >
                关闭
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Scene6_Promise;