import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- 专属记忆碎片配置 ---
const MEMORIES = [
  {
    id: 1,
    text: "顶级敏感体质人，对金属过敏就算了，竟然养只猫对猫毛过敏。",
    x: "15%",
    y: "25%",
    size: 75,
    delay: 0,
  },
  {
    id: 2,
    text: "玩剑网三时总是装作迷路，非要上我的马让我带你。",
    x: "75%",
    y: "20%",
    size: 60,
    delay: 0.5,
  },
  {
    id: 3,
    text: "焦虑时爱写白雪歌。",
    x: "80%",
    y: "60%",
    size: 70,
    delay: 1,
  },
  {
    id: 4,
    text: "每天晚上跟我打语音，偶尔睡着传来平稳的呼噜声。",
    x: "20%",
    y: "70%",
    size: 85,
    delay: 1.5,
  },
  {
    id: 5,
    text: "在天津中石化门口看到我时的惊喜模样。",
    x: "50%",
    y: "15%",
    size: 65,
    delay: 2,
  },
  {
    id: 6,
    text: "在天津海河边喝着调酒漫步边跟着街边歌手哼唱的 chill 氛围。",
    x: "45%",
    y: "85%",
    size: 80,
    delay: 2.5,
  },
  {
    id: 7,
    text: "过生日时看到宝贝给我做的手工的感动。",
    x: "85%",
    y: "40%",
    size: 55,
    delay: 3,
  },
  {
    id: 8,
    text: "在我面前毫无防备，笑得最毫无顾忌的瞬间。",
    x: "10%",
    y: "50%",
    size: 65,
    delay: 3.5,
  },
];

const Scene4_Struggle: React.FC = () => {
  const [poppedBubbles, setPoppedBubbles] = useState<number[]>([]);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const [isFinale, setIsFinale] = useState(false);
  // ✨ 新增：记录是否已经触发过彩蛋，防止关掉后又无限弹出来
  const [hasSeenFinale, setHasSeenFinale] = useState(false);

  useEffect(() => {
    // ✨ 修改：只在刚点满 5 个，且还没看过彩蛋时触发
    if (poppedBubbles.length === 5 && !isFinale && !hasSeenFinale) {
      setTimeout(() => {
        setIsFinale(true);
        setHasSeenFinale(true); // 标记为已触发
      }, 2000);
    }
  }, [poppedBubbles, isFinale, hasSeenFinale]);

  // ... handlePop 保持不变

  const handlePop = (id: number, text: string) => {
    if (poppedBubbles.includes(id) || isFinale) return;

    setPoppedBubbles((prev) => [...prev, id]);
    setActiveMessage(text);

    if (poppedBubbles.length < 4) {
      setTimeout(() => {
        // 防止下一次点击覆盖时被提早清空
        setActiveMessage((current) => (current === text ? null : current));
      }, 4500);
    }
  };

  return (
    <div className="relative min-h-[100dvh] bg-[#050505] text-stone-200 flex items-center justify-center overflow-hidden">
      {/* 极简深邃的背景环境光 (深青色与翡翠绿交织) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] max-w-3xl max-h-3xl bg-gradient-to-tr from-teal-900/20 via-emerald-900/10 to-transparent rounded-full blur-[120px] pointer-events-none"></div>

      {/* --- 漂浮的3D记忆水晶球层 --- */}
      <AnimatePresence>
        {!isFinale &&
          MEMORIES.map((mem) => {
            const isPopped = poppedBubbles.includes(mem.id);
            return (
              !isPopped && (
                <motion.div
                  key={mem.id}
                  // ✨ 优化：点破时的肥皂泡炸开动效 (瞬间放大、变模糊、化为透明)
                  exit={{
                    opacity: 0,
                    scale: 2.5,
                    filter: "blur(8px)",
                    transition: { duration: 0.5, ease: "easeOut" },
                  }}
                  className="absolute cursor-pointer flex items-center justify-center group z-20"
                  style={{
                    left: mem.x,
                    top: mem.y,
                    width: mem.size,
                    height: mem.size,
                  }}
                  onClick={() => handlePop(mem.id, mem.text)}
                >
                  {/* 气泡本体的有机漂浮动画 */}
                  <motion.div
                    animate={{
                      y: [0, -20, 0, 25, 0],
                      x: [0, 15, 0, -15, 0],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 7 + (mem.id % 4),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: mem.delay,
                    }}
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    {/* 1. 外层：玻璃拟态透明球体 (反光边框 + 内阴影) */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent border border-white/20 backdrop-blur-md shadow-[inset_0_0_20px_rgba(255,255,255,0.1),0_0_15px_rgba(52,211,153,0.15)] group-hover:shadow-[inset_0_0_30px_rgba(255,255,255,0.2),0_0_30px_rgba(52,211,153,0.4)] group-hover:bg-white/5 transition-all duration-500"></div>

                    {/* 2. 内核：星尘发光体 (触碰时放大提亮) */}
                    <div className="absolute w-1/3 h-1/3 bg-emerald-300 rounded-full blur-[6px] opacity-70 group-hover:opacity-100 group-hover:scale-150 group-hover:bg-teal-200 transition-all duration-500"></div>

                    {/* 3. 顶部：真实的玻璃高光反射 (画龙点睛) */}
                    <div className="absolute top-[12%] left-[18%] w-[35%] h-[35%] bg-gradient-to-br from-white/60 to-transparent rounded-full blur-[1px] rotate-[-45deg] pointer-events-none"></div>
                  </motion.div>
                </motion.div>
              )
            );
          })}
      </AnimatePresence>

      {/* --- 中央文字聚焦层 --- */}
      <div className="relative z-10 w-full max-w-lg px-8 text-center h-48 flex items-center justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          {/* 状态 1：初始提示 */}
          {!activeMessage && !isFinale && (
            <motion.div
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-stone-500 font-mono tracking-widest text-[10px] sm:text-xs animate-pulse border border-stone-800 rounded-full px-6 py-2"
            >
              [ 触碰光芒 · 读取碎片 ]
            </motion.div>
          )}

          {/* 状态 2：显示气泡内的记忆文案 (带景深聚焦动效) */}
          {activeMessage && !isFinale && (
            <motion.div
              key={activeMessage} // 利用 key 强制 React 在切换文字时重新触发动画
              initial={{ opacity: 0, y: 15, scale: 0.95, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -15, scale: 1.05, filter: "blur(8px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-stone-200 text-base sm:text-xl font-light leading-loose tracking-wide"
            >
              <span className="text-emerald-500/50 mr-2 text-2xl leading-none align-bottom">
                "
              </span>
              {activeMessage}
              <span className="text-emerald-500/50 ml-2 text-2xl leading-none align-bottom">
                "
              </span>
            </motion.div>
          )}

          {/* 状态 3：高潮彩蛋 (点破5个后触发) */}
          {isFinale && (
            <motion.div
              key="finale"
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              className="flex flex-col items-center justify-center pointer-events-auto"
            >
              <h3 className="text-xl sm:text-2xl font-serif text-emerald-400 mb-8 tracking-wider">
                爱从来不是一个抽象的词。
              </h3>
              <p className="text-stone-300 leading-loose font-light text-sm sm:text-base text-justify text-center">
                对我来说，爱不是距离，不是工作，也不是阻碍。
                <br />
                爱是由这无数个
                <strong className="text-emerald-300 font-normal border-b border-emerald-300/30 mx-1 px-1 relative">
                  关于你我的具体瞬间
                  <span className="absolute inset-0 bg-emerald-400/10 blur-sm -z-10"></span>
                </strong>
                组成。
                <br />
                正是因为有了这些瞬间，多远的距离也不是距离，多大的阻碍也不是阻碍。
              </p>

              {/* ✨ 新增：优雅的返回按钮，延迟 3 秒后渐渐浮现，不破坏一开始的感动 */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 1 }}
                onClick={() => setIsFinale(false)}
                className="mt-12 px-6 py-2 border border-emerald-500/30 rounded-full text-emerald-500/80 text-xs tracking-widest hover:bg-emerald-500/10 hover:text-emerald-400 transition-all"
              >
                [ 继续收集碎片 ]
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Scene4_Struggle;
