import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

const Scene0_Loading: React.FC<Props> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const systemLogs = [
      "正在初始化核心记忆...",
      "加载资源...",
      "检索飞行记录...",
      "同步心跳频率...",
      "编译未来...",
      "系统准备就绪。"
    ];

    let currentLog = 0;
    
    // Simulate Progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsReady(true);
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 150);

    // Simulate Logs
    const logInterval = setInterval(() => {
      if (currentLog < systemLogs.length) {
        setLogs(prev => [...prev, systemLogs[currentLog]]);
        currentLog++;
      } else {
        clearInterval(logInterval);
      }
    }, 800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
    };
  }, []);

  return (
    <div className="h-screen w-full bg-black text-green-500 font-mono flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <div className="max-w-md w-full z-10">
        <div className="mb-8 h-40 overflow-hidden relative">
          {logs.map((log, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm opacity-80"
            >
              <span className="mr-2 text-green-700">[{new Date().toLocaleTimeString()}]</span>
              {log}
            </motion.div>
          ))}
          <div className="animate-pulse">_</div>
        </div>

        <div className="w-full text-center mb-2">正在加载回忆... {Math.min(progress, 100)}%</div>
        <div className="w-full h-2 bg-green-900 rounded border border-green-700">
          <motion.div 
            className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.7)]"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {isReady && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={onComplete}
            className="mt-12 w-full py-4 border-2 border-green-500 text-green-500 font-bold tracking-widest hover:bg-green-500 hover:text-black transition-colors uppercase"
          >
            [ 进入世界 ]
          </motion.button>
        )}
      </div>

      {/* Background Matrix-like subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,50,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,50,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
    </div>
  );
};

export default Scene0_Loading;