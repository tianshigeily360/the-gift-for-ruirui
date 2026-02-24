import React, { useState } from "react";
import { motion } from "framer-motion";

const Scene2_FirstEncounter: React.FC = () => {
  // 控制翻转状态的 State
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section className="relative w-full h-[100vh] bg-stone-900 flex items-center justify-center overflow-hidden">
      {/* 背景氛围光 (一点点怀旧的暖色光) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-40 h-40 bg-orange-500/30 rounded-full mix-blend-screen filter blur-[60px] animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-10 w-40 h-40 bg-blue-500/20 rounded-full mix-blend-screen filter blur-[60px] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* 入场动画：只负责在划到这一屏时，让卡片温柔地浮现。
        不再与滚动进度强制绑定翻转。
      */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, margin: "-20%" }}
        className="relative z-10 flex flex-col items-center"
        style={{ perspective: "1200px" }}
      >
        {/* 卡片容器 (点击触发翻转) */}
        <div
          className={`relative w-[280px] h-[380px] sm:w-[320px] sm:h-[420px] cursor-pointer transition-all duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)] shadow-2xl rounded-sm ${
            isFlipped ? "scale-105" : "hover:scale-105"
          }`}
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* ================= 照片背面 (初始显示) ================= */}
          <div
            className="absolute inset-0 w-full h-full bg-[#f4f1ea] rounded-sm border border-stone-300 flex flex-col items-center justify-center p-6 shadow-inner"
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* 顶部的仿旧胶带/邮戳装饰可以加在这里 */}
            <div className="flex-1 flex items-center justify-center">
              <p className="text-stone-700 font-serif text-3xl tracking-widest text-center leading-loose">
                兰州 <br />
                <span className="text-xl text-stone-500">2025</span>
              </p>
            </div>

            {/* 呼吸提示文字 */}
            <div className="mt-auto flex flex-col items-center gap-2">
              <div className="text-stone-400 text-sm animate-pulse flex flex-col items-center gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="animate-bounce"
                >
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
                <span className="tracking-widest">点击翻阅记忆</span>
              </div>
            </div>
          </div>

          {/* ================= 照片正面 (翻转后显示) ================= */}
          <div
            className="absolute inset-0 w-full h-full bg-white rounded-sm p-3 sm:p-4 shadow-xl flex flex-col"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {/* 照片展示区 */}
            <div className="w-full flex-1 bg-stone-200 overflow-hidden relative">
              <img
                src="/images/first_encounter.jpeg"
                alt="First Encounter"
                className="w-full h-full object-cover filter contrast-125 saturate-50" // 稍微加一点复古滤镜
                onError={(e) => {
                  // 兜底图片，防止找不到你本地图片时显示破损图标
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=800&auto=format&fit=crop";
                }}
              />
            </div>
            {/* 拍立得底部的留白与手写字 */}
            <div className="h-14 sm:h-16 w-full flex items-center justify-center bg-white mt-2">
              <p className="font-serif text-stone-600 text-sm tracking-widest">
                初见 · 兰州
              </p>
            </div>
          </div>
        </div>

        {/* ================= 翻转后才出现的情话 ================= */}
        <div
          className={`absolute -bottom-16 w-max text-center transition-all duration-1000 delay-500 ${
            isFlipped
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <p className="text-white/80 text-sm tracking-widest font-light">
            跨越虚拟的边界，第一次触碰到真实的温度。
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Scene2_FirstEncounter;
