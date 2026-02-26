import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Headphones } from "lucide-react";

const PHASES = [
  {
    limit: 24,
    time: "07:30 AM",
    sz: "挤在南山区的早高峰里，\n随着人流开始新的一天。",
    bh: "迎着微风去往中石化，\n开启属于你的早晨。",
    note: "我们看着不同的风景，经历着各自的忙碌。",
    bgLeft: "#0f172a",
    bgRight: "#172554",
  },
  {
    limit: 49,
    time: "12:00 PM",
    sz: "敲着不知疲倦的代码，\n午餐总是草草解决。",
    bh: "在食堂吃完午饭，\n趁午休偷偷吐槽今天的工作。",
    note: "屏幕那头的消息提示，是疲惫里唯一的慰藉。",
    bgLeft: "#1c1917",
    bgRight: "#2e1065",
  },
  {
    limit: 74,
    time: "06:00 PM",
    sz: "下班路上，\n和芮控诉着今晚的晚高峰。",
    bh: "你说今天北海的晚霞也很美。",
    note: "多希望这一刻，我们能肩并肩站在一起。",
    bgLeft: "#4c0519",
    bgRight: "#4a044e",
  },
  {
    limit: 99,
    time: "07:30 PM",
    sz: "终于回到安静的房间，\n洗尽一天的疲惫。",
    bh: "洗漱完毕，\n舒舒服服地钻进被窝里。",
    note: "整个世界终于安静下来，时间开始属于我们。",
    bgLeft: "#020617",
    bgRight: "#020617",
  },
  {
    limit: 100,
    time: "09:30 PM",
    sz: "",
    bh: "",
    note: "",
    bgLeft: "#000000",
    bgRight: "#000000",
  },
];

const Scene5_Resonance: React.FC = () => {
  const [progress, setProgress] = useState(0);

  let phaseIndex = 0;
  if (progress < 25) phaseIndex = 0;
  else if (progress < 50) phaseIndex = 1;
  else if (progress < 75) phaseIndex = 2;
  else if (progress < 100) phaseIndex = 3;
  else phaseIndex = 4;

  const currentPhase = PHASES[phaseIndex];

  return (
    <div
      className="relative min-h-[100dvh] flex flex-col justify-between overflow-hidden transition-colors duration-1000 text-stone-200"
      style={{ backgroundColor: currentPhase.bgLeft }}
    >
      <div
        className={`absolute inset-0 flex transition-opacity duration-1000 ${
          phaseIndex === 4 ? "opacity-0" : "opacity-100"
        }`}
      >
        <div
          className="w-1/2 h-full transition-colors duration-1000"
          style={{ backgroundColor: currentPhase.bgLeft }}
        />
        <div className="w-[1px] h-full bg-white/10 z-10"></div>
        <div
          className="w-1/2 h-full transition-colors duration-1000"
          style={{ backgroundColor: currentPhase.bgRight }}
        />
      </div>

      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
          phaseIndex === 4 ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage:
            "radial-gradient(circle at center, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
      </div>

      <div className="relative z-20 w-full text-center pt-20">
        <p className="text-[10px] sm:text-xs font-mono tracking-[0.3em] text-white/50 mb-3 uppercase">
          时间线同步
        </p>
        <h2 className="text-4xl sm:text-5xl font-serif tracking-widest text-white/90">
          {currentPhase.time}
        </h2>
      </div>

      <div className="relative z-20 flex-1 flex items-center justify-center w-full max-w-4xl mx-auto px-4">
        <AnimatePresence mode="wait">
          {phaseIndex < 4 ? (
            <motion.div
              key={`split-${phaseIndex}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex w-full"
            >
              <div className="w-1/2 flex flex-col justify-center items-center px-4 sm:px-8 text-center border-r border-transparent">
                <p className="text-[10px] sm:text-xs font-mono text-emerald-400/80 mb-6 tracking-widest bg-emerald-900/20 px-3 py-1 rounded-full">
                  深圳
                </p>
                <p className="text-sm sm:text-base font-light leading-loose text-stone-300 whitespace-pre-line">
                  {currentPhase.sz}
                </p>
              </div>
              <div className="w-1/2 flex flex-col justify-center items-center px-4 sm:px-8 text-center">
                <p className="text-[10px] sm:text-xs font-mono text-amber-400/80 mb-6 tracking-widest bg-amber-900/20 px-3 py-1 rounded-full">
                  北海
                </p>
                <p className="text-sm sm:text-base font-light leading-loose text-stone-300 whitespace-pre-line">
                  {currentPhase.bh}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="resonance"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-center w-full max-w-md px-6"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 mx-auto flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(16,185,129,0.15)] relative">
                <Headphones
                  className="text-emerald-400 animate-pulse"
                  size={28}
                />
                <div className="absolute inset-0 rounded-full border border-emerald-500/50 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif tracking-widest mb-8 text-stone-100">
                频 率 共 振
              </h3>

              <p className="text-sm sm:text-base font-light leading-loose text-stone-300 text-justify text-center">
                戴上耳机，麦克风亮起，金铲铲登录。
                <br />
                <br />
                白天的 623 公里，在声音重叠的这一秒，
                <br />
                <strong className="text-emerald-400 font-normal tracking-widest relative block mt-2">
                  距 离 归 零。
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-emerald-500/50"></span>
                </strong>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-20 w-full px-8 pb-16 sm:pb-24 flex flex-col items-center">
        <div className="h-8 mb-4 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {phaseIndex < 4 && (
              <motion.p
                key={`note-${phaseIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[11px] sm:text-xs font-light text-stone-400 tracking-wider text-center"
              >
                “{currentPhase.note}”
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="w-full max-w-sm relative flex items-center touch-none h-12">
          <div className="absolute w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500/80 via-indigo-500/80 to-amber-500/80 transition-all duration-75"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="w-full h-full absolute inset-0 opacity-0 cursor-pointer z-30"
          />

          <div
            className="absolute h-5 w-5 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] pointer-events-none z-20 flex items-center justify-center transition-transform"
            style={{
              left: `${progress}%`,
              transform: `translateX(-50%) scale(${
                progress === 100 ? 1.2 : 1
              })`,
            }}
          >
            <div className="w-1.5 h-1.5 bg-stone-900 rounded-full"></div>
          </div>
        </div>

        <p className="mt-6 text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase">
          {progress === 100 ? "共鸣已完成" : "滑动来同步我们的时间"}
        </p>
      </div>
    </div>
  );
};

export default Scene5_Resonance;
