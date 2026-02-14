import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Terminal } from 'lucide-react';

const Scene4_Struggle: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative min-h-screen bg-black text-white font-mono flex flex-col items-center justify-center p-6 border-t-4 border-red-900">
      
      {/* Background Glitch Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-2 bg-red-600 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-10 w-96 h-1 bg-green-600 animate-pulse delay-75"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl w-full border border-gray-800 bg-gray-900/80 rounded-lg overflow-hidden shadow-2xl relative z-10"
      >
        {/* Terminal Header */}
        <div className="bg-gray-800 px-4 py-2 flex items-center gap-2 border-b border-gray-700">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-2 text-xs text-gray-400">bash — career_path.sh</span>
        </div>

        {/* Terminal Body */}
        <div className="p-6 space-y-4 text-sm md:text-base">
          <div className="text-gray-400">$ ./search_job.sh --location="Beihai"</div>
          <div className="text-red-500 flex items-center gap-2">
            <AlertTriangle size={16} />
            <span>Error: 404 职业路径未找到。资源严重不足。</span>
          </div>

          <div className="text-gray-400 mt-4">$ ./search_job.sh --location="Nanning"</div>
          <div className="text-yellow-500">Warning: 检测到兼容性问题。重试? [Y/n]</div>
          
          <div className="text-gray-400 mt-8">$ sudo systemctl restart life_path --target="Shenzhen"</div>
          <div 
            className="text-green-400 animate-pulse font-bold"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered ? ">> 正在执行迁移协议..." : ">> 确认迁移?"}
          </div>
        </div>
      </motion.div>

      {/* The Beam Animation Container */}
      <div className="h-64 w-full relative mt-12 overflow-hidden flex items-center justify-center">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 0.8, delay: 0.5, ease: "circIn" }}
          className="h-1 bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)] relative"
        >
           <div className="absolute right-0 -top-1 w-2 h-4 bg-white blur-sm"></div>
        </motion.div>
        <p className="absolute bottom-0 text-gray-500 text-xs text-center w-full px-4">
          暂时的离开，是为了更好的回来。<br/>重启系统... 目的地: 深圳
        </p>
      </div>
      
    </div>
  );
};

export default Scene4_Struggle;