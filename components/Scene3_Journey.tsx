import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

// --- 城市足迹数据配置 (深度重构版) ---
// ✨ 新增 labelPos: 控制城市名字显示在圆点的哪个方向，防止重叠
const JOURNEYS = [
  {
    id: "lz",
    city: "兰州",
    labelPos: "top",
    coords: { x: 25, y: 35 },
    date: "2024.12",
    desc: "从虚拟到现实，这是故事的开始。「若似月轮终皎洁，不辞冰雪为卿热。」",
    medias: [
      { type: "video", url: "/images/lz_1.mp4" },
      { type: "video", url: "/images/lz_2.mp4" },
      { type: "video", url: "/images/lz_3.mp4" },
      { type: "image", url: "/images/lz_4.jpeg" },
    ],
  },
  {
    id: "cq",
    city: "重庆",
    labelPos: "left",
    coords: { x: 35, y: 55 },
    date: "2025.01",
    desc: "在很长很长的未来，要和小芮养一只「麻圆儿」，吃很多次耙牛肉！（当然还少不了 DQ！）",
    medias: [
      { type: "video", url: "/images/cq_1.mp4" },
      { type: "video", url: "/images/cq_2.mp4" },
      { type: "video", url: "/images/cq_3.mp4" },
      { type: "image", url: "/images/cq_4.jpg" },
    ],
  },
  {
    id: "bj",
    city: "北京",
    labelPos: "top",
    coords: { x: 70, y: 20 },
    date: "2025.03",
    desc: "就从和我过的第一次生日开始转大运叭！N刷飞跃水泥地时挂在你脸上的快乐让我很幸福！",
    medias: [
      { type: "video", url: "/images/bj_1.mp4" },
      { type: "video", url: "/images/bj_2.mp4" },
      { type: "video", url: "/images/bj_3.mp4" },
      { type: "video", url: "/images/bj_4.mp4" },
    ],
  },
  {
    id: "tj",
    city: "天津",
    labelPos: "right",
    coords: { x: 75, y: 25 },
    date: "2025.03",
    desc: "天津的老建筑，海河畔的歌声，还有无限快乐的你。",
    medias: [
      { type: "video", url: "/images/tj_1.mp4" },
      { type: "image", url: "/images/tj_2.jpg" },
      { type: "image", url: "/images/tj_3.jpg" },
      { type: "image", url: "/images/tj_4.jpg" },
    ],
  },
  {
    id: "wh",
    city: "武汉",
    labelPos: "left",
    coords: { x: 60, y: 50 },
    date: "2025.03",
    desc: "过早的饭我可能不太喜欢，但我喜欢你镜头下的过早。",
    medias: [
      { type: "image", url: "/images/wh_1.jpg" },
      { type: "image", url: "/images/wh_2.jpg" },
      { type: "image", url: "/images/wh_3.jpg" },
      { type: "image", url: "/images/wh_4.jpg" },
    ],
  },
  {
    id: "cs",
    city: "长沙",
    labelPos: "bottom",
    coords: { x: 58, y: 62 },
    date: "22025.04",
    desc: "是还要再去吃的门头不大的小龙虾，是喝不腻的古德猫柠。",
    medias: [
      { type: "image", url: "/images/cs_1.jpg" },
      { type: "image", url: "/images/cs_2.jpg" },
      { type: "image", url: "/images/cs_3.jpg" },
    ],
  },
  {
    id: "zz",
    city: "郑州",
    labelPos: "top",
    coords: { x: 58, y: 40 },
    date: "2025.05",
    desc: "好吃不贵的烤鱼，还有让我耿耿于怀的被调包的胖东来！",
    medias: [{ type: "image", url: "/images/zz_1.jpg" }],
  },
  {
    id: "bh",
    city: "北海",
    labelPos: "bottom",
    coords: { x: 40, y: 85 },
    date: "2025.07",
    desc: "这段日子节奏很慢，生活很舒适，吃到了很多宝宝做的饭。当时真的很想，就在锦园安定下来。",
    medias: [
      { type: "video", url: "/images/bh_1.mp4" },
      { type: "image", url: "/images/bh_2.jpg" },
      { type: "image", url: "/images/bh_3.jpg" },
      { type: "image", url: "/images/bh_4.jpeg" },
      { type: "image", url: "/images/bh_5.jpg" },
    ],
  },
  {
    id: "nn",
    city: "南宁",
    labelPos: "left",
    coords: { x: 33, y: 75 },
    date: "2025.09",
    desc: "青秀山是真的很美，凡人皆打酒站的大西瓜和青柚还要喝，以及在此种草的凯里红～",
    medias: [
      { type: "image", url: "/images/nn_1.jpg" },
      { type: "image", url: "/images/nn_2.jpg" },
      { type: "image", url: "/images/nn_3.jpg" },
    ],
  },
  {
    id: "gz",
    city: "广州",
    labelPos: "top",
    coords: { x: 60, y: 80 },
    date: "2025.10",
    desc: "草莓音乐节很挤，很热，体验感不如北方，但幸运的是身边是你。与芮同唱，感觉美妙！",
    medias: [
      { type: "image", url: "/images/gz_1.jpg" },
      { type: "video", url: "/images/gz_2.mp4" },
      { type: "video", url: "/images/gz_3.mp4" },
      { type: "video", url: "/images/gz_4.mp4" },
    ],
  },
  {
    id: "sz",
    city: "深圳",
    labelPos: "right",
    coords: { x: 68, y: 85 },
    date: "2026.01",
    desc: "来到了我的过渡点，在这里有你人生的第一张罚单，我们逛了各种超市，以及让我难忘的生日！还是深圳的漏奶华更好次！",
    medias: [
      { type: "image", url: "/images/sz_1.jpg" },
      { type: "image", url: "/images/sz_2.jpg" },
      { type: "image", url: "/images/sz_3.jpg" },
    ],
  },
  {
    id: "hk",
    city: "香港",
    labelPos: "bottom",
    coords: { x: 72, y: 92 },
    date: "2026.01",
    desc: "港迪之灰熊过山车就像北环之飞跃水泥地，是我俩刚好能接受的程度。香港不大， citywalk 确实也挺舒服～",
    medias: [
      { type: "image", url: "/images/hk_1.jpg" },
      { type: "image", url: "/images/hk_2.jpg" },
      { type: "image", url: "/images/hk_3.jpg" },
      { type: "image", url: "/images/hk_4.jpg" },
      { type: "video", url: "/images/hk_5.mp4" },
    ],
  },
];

// 计算标签的偏移量以避免重叠
const getLabelStyle = (pos: string) => {
  switch (pos) {
    case "top":
      return { dx: 0, dy: -2.5, anchor: "middle" };
    case "bottom":
      return { dx: 0, dy: 4, anchor: "middle" };
    case "left":
      return { dx: -2.5, dy: 1, anchor: "end" };
    case "right":
      return { dx: 2.5, dy: 1, anchor: "start" };
    default:
      return { dx: 0, dy: -2.5, anchor: "middle" };
  }
};

const getFlightCurve = (x1: number, y1: number, x2: number, y2: number) => {
  const cx = (x1 + x2) / 2;
  const cy = Math.min(y1, y2) - 15;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
};

// ================= 高级感内部轮播组件 (支持真·手势滑动) =================
const MediaCarousel = ({
  location,
  onOpenLightbox,
}: {
  location: (typeof JOURNEYS)[0];
  onOpenLightbox: (loc: (typeof JOURNEYS)[0], mediaIndex: number) => void;
}) => {
  // tuple: [当前索引, 滑动方向(-1左, 1右)]
  const [[page, direction], setPage] = useState([0, 0]);
  const medias = location.medias;

  // 使用取模运算确保索引永远在合法范围内 (0 ~ length-1)
  const imageIndex = Math.abs(page % medias.length);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  // 定义滑动的动画参数 (类似 iOS 相册的物理动效)
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000, // 从哪边进来
      opacity: 0,
      scale: 0.95, // 进场时稍微缩放一下
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000, // 往哪边出去
      opacity: 0,
      scale: 0.95, // 退场时缩放
    }),
  };

  // 计算滑动的阈值 (划多大力度才算切换)
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="w-full h-64 sm:h-72 bg-[#0a0a0a] relative shrink-0 group overflow-hidden flex items-center justify-center">
      {/* ✨ 核心魔法：
         1. touch-action-pan-y: 允许垂直滚动网页，但水平滑动交给 framer-motion 处理
         2. AnimatePresence custom={direction}: 让动画知道是往左滑还是往右滑
      */}
      <div className="relative w-full h-full touch-action-pan-y cursor-grab active:cursor-grabbing">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            // ✨ 开启拖拽
            drag="x"
            dragConstraints={{ left: 0, right: 0 }} // 拖拽结束后回弹
            dragElastic={1} // 阻尼感
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1); // 向左猛划 -> 下一张
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1); // 向右猛划 -> 上一张
              }
            }}
            className="absolute inset-0 flex items-center justify-center w-full h-full"
            // ✨ 点击事件绑定在这里 (拖拽不会误触点击)
            onClick={() => onOpenLightbox(location, imageIndex)}
          >
            {medias[imageIndex].type === "video" ? (
              <video
                src={medias[imageIndex].url}
                autoPlay
                loop
                muted // 列表里必须静音
                playsInline={true}
                webkit-playsinline="true"
                x5-playsinline="true"
                x5-video-player-type="h5"
                x5-video-player-fullscreen="false"
                x5-video-orientation="portraint"
                className="w-full h-full object-contain pointer-events-none" // pointer-events-none 防止视频控件抢占触摸事件
              />
            ) : (
              <img
                src={medias[imageIndex].url}
                alt={location.city}
                className="w-full h-full object-contain pointer-events-none" // 防止图片被拖拽出来
              />
            )}

            {/* 放大提示 (居中) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-2">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
                <span className="text-white text-[10px] tracking-widest">
                  点击全屏
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 左上角城市标签 */}
      <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 z-20 pointer-events-none">
        <span className="text-stone-200 text-xs tracking-widest font-bold">
          {location.city}
        </span>
      </div>

      {/* 底部指示器 */}
      {medias.length > 1 && (
        <div className="absolute bottom-3 left-0 w-full flex justify-center gap-1.5 px-4 z-20 pointer-events-none">
          {medias.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 rounded-full transition-all duration-300 shadow-sm ${
                idx === imageIndex ? "bg-white w-4" : "bg-white/30 w-1.5"
              }`}
            />
          ))}
        </div>
      )}

      {/* 左右箭头 (辅助提示，因为纯滑动有时候用户不知道) */}
      {medias.length > 1 && (
        <>
          <div className="absolute left-1 top-1/2 -translate-y-1/2 p-2 opacity-0 group-hover:opacity-50 transition pointer-events-none">
            <div className="w-1 h-8 bg-white/20 rounded-full"></div>
          </div>
          <div className="absolute right-1 top-1/2 -translate-y-1/2 p-2 opacity-0 group-hover:opacity-50 transition pointer-events-none">
            <div className="w-1 h-8 bg-white/20 rounded-full"></div>
          </div>
        </>
      )}
    </div>
  );
};

// ================= 主页面 =================
const Scene3_Journey: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapLinesRef = useRef<(SVGPathElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // ✨ 新增：用于存放城市节点（圆点和文字）的 ref
  const nodesRef = useRef<(SVGGElement | null)[]>([]);

  const [activeLightbox, setActiveLightbox] = useState<{
    loc: (typeof JOURNEYS)[0];
    index: number;
  } | null>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${JOURNEYS.length * 100}%`, // 12个城市，滚12屏的距离，手感最适中
          scrub: 1,
          pin: true,
          snap: {
            snapTo: "labels",
            duration: { min: 0.2, max: 0.5 },
            delay: 0.1,
            ease: "power2.inOut",
            directional: true, // ✨ 新增：强方向性！只要往下划了一点点，松手必然吸到下一站，绝不退回！
          },
        },
      });

      // 初始状态隐藏
      gsap.set(cardsRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.95,
        pointerEvents: "none",
      });
      gsap.set(nodesRef.current.slice(1), { opacity: 0, y: 3 });

      JOURNEYS.forEach((_, i) => {
        const path = mapLinesRef.current[i];
        const card = cardsRef.current[i];
        const node = nodesRef.current[i];

        if (!card) return;

        // ✨ 核心魔法：为每个城市计算“绝对上场时间”
        // 假设每个城市占据 2 个时间单位。第 i 个城市的上场时间就是 i * 2。
        const startTime = i * 2;

        if (i > 0 && path) {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

          // 1. 画线和进场：强制在 startTime 这个时间点“同时”开始
          tl.to(
            path,
            { strokeDashoffset: 0, duration: 1, ease: "power1.inOut" },
            startTime,
          )
            .to(
              card,
              {
                opacity: 1,
                y: 0,
                scale: 1,
                pointerEvents: "auto",
                duration: 1,
                ease: "back.out(1.2)",
              },
              startTime,
            )
            .to(
              node,
              { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
              startTime + 0.5,
            );
        } else {
          // 第一站兰州，只需要进场
          tl.to(
            card,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              pointerEvents: "auto",
              duration: 1,
              ease: "back.out(1.2)",
            },
            startTime,
          );
        }

        // 2. 打标签：在进场动画完全结束的时刻（startTime + 1）打上吸附标签
        tl.addLabel(`city_${i}`, startTime + 1);

        // 3. ✨ 最关键的重构：无缝退场
        if (i !== JOURNEYS.length - 1) {
          // 当前卡片的退场动画设定在 startTime + 2 开始。
          // 你看，下一个城市的 startTime 刚好是 (i+1)*2 = startTime + 2！
          // 这意味着：这一张刚开始往下掉，下一张就刚好往上浮，完美交叠，绝不留白！
          tl.to(
            card,
            {
              opacity: 0,
              y: -30,
              scale: 0.95,
              pointerEvents: "none",
              duration: 1,
            },
            startTime + 2,
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    // ✨ 修改 1：最外层使用 h-[100dvh] 代替 h-screen，彻底解决手机浏览器底部导航栏遮挡问题！
    <section
      ref={sectionRef}
      className="w-full h-[100dvh] bg-stone-900 text-stone-100 relative overflow-hidden flex flex-col"
    >
      {/* ================= 上半部：地图区 ================= */}
      {/* ✨ 修改 2：高度改为百分比 h-[45%]，适配各种奇葩屏幕比例 */}
      <div className="relative w-full h-[45%] bg-[#1a1a1a] flex items-center justify-center shadow-[inset_0_-20px_40px_rgba(0,0,0,0.5)] z-10 shrink-0">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, #fff 1px, transparent 1px)",
            backgroundSize: "15px 15px",
          }}
        ></div>

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          className="absolute w-[90%] h-[90%] max-w-lg overflow-visible pointer-events-none"
        >
          {JOURNEYS.map((loc, i) => {
            const curr = loc.coords;
            const labelStyle = getLabelStyle(loc.labelPos);

            return (
              <g key={`route-${loc.id}`}>
                {i > 0 && (
                  <>
                    <path
                      d={getFlightCurve(
                        JOURNEYS[i - 1].coords.x,
                        JOURNEYS[i - 1].coords.y,
                        curr.x,
                        curr.y,
                      )}
                      fill="none"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="0.3"
                      strokeDasharray="1 2"
                    />
                    <path
                      ref={(el) => (mapLinesRef.current[i] = el)}
                      d={getFlightCurve(
                        JOURNEYS[i - 1].coords.x,
                        JOURNEYS[i - 1].coords.y,
                        curr.x,
                        curr.y,
                      )}
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="0.6"
                      strokeLinecap="round"
                      strokeDasharray="1000"
                      strokeDashoffset="1000"
                      style={{
                        filter: "drop-shadow(0px 0px 2px rgba(16,185,129,0.5))",
                      }}
                    />
                  </>
                )}

                <g ref={(el) => (nodesRef.current[i] = el)}>
                  <circle
                    cx={curr.x}
                    cy={curr.y}
                    r={i === 0 ? "1.5" : "1"}
                    fill={i === 0 ? "#10B981" : "#aaa"}
                    className={i === 0 ? "animate-pulse" : ""}
                  />
                  <text
                    x={curr.x + labelStyle.dx}
                    y={curr.y + labelStyle.dy}
                    textAnchor={labelStyle.anchor as any}
                    fontSize="2.2"
                    fill={i === 0 ? "#10B981" : "#888"}
                    className="font-mono tracking-widest font-bold"
                  >
                    {loc.city}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        <div className="absolute top-6 w-full text-center pointer-events-none">
          <p className="text-stone-600 font-serif tracking-[0.3em] text-[10px] sm:text-xs uppercase">
            飞行日记 • 我们的脚印
          </p>
        </div>
      </div>

      {/* ================= 下半部：卡片区 ================= */}
      {/* ✨ 修改 3：高度改为 flex-1，自动填满剩余空间，加上 pb-safe (刘海屏/底部横条安全区) 和额外的 pb-8 把卡片往上顶一点 */}
      <div className="relative w-full flex-1 flex items-center justify-center p-6 pb-10 sm:pb-12 bg-stone-900 z-20">
        {JOURNEYS.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => (cardsRef.current[i] = el)}
            // ✨ 修改 4：最大高度使用基于父元素的百分比 max-h-[95%]，无论屏幕多小，卡片都绝对不会超出屏幕边缘！
            className="absolute w-full max-w-sm sm:max-w-md bg-[#222] border border-stone-700/50 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[95%]"
          >
            <MediaCarousel
              location={item}
              onOpenLightbox={(loc, index) => setActiveLightbox({ loc, index })}
            />

            {/* 文字区域内部独立滚动，底部加上 pb-6 防止最后一行字被圆角遮挡 */}
            <div className="p-5 pb-6 flex-1 flex flex-col bg-gradient-to-b from-[#222] to-[#1a1a1a] overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <p className="text-emerald-500 font-mono text-[10px] sm:text-xs mb-2 flex items-center gap-2 shrink-0">
                <span>{item.date}</span>
                <span className="w-8 h-[1px] bg-emerald-500/30"></span>
              </p>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed tracking-wider font-light">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ================= 剧场模式 (Lightbox) 弹窗 ================= */}
      <AnimatePresence>
        {activeLightbox && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
            onClick={() => setActiveLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="relative max-w-lg w-full max-h-[85vh] flex flex-col items-center shadow-2xl rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {activeLightbox.loc.medias[activeLightbox.index].type ===
              "video" ? (
                <video
                  src={activeLightbox.loc.medias[activeLightbox.index].url}
                  autoPlay
                  loop
                  playsInline={true}
                  webkit-playsinline="true"
                  x5-playsinline="true"
                  x5-video-player-type="h5"
                  x5-video-player-fullscreen="false"
                  x5-video-orientation="portraint"
                  controls={false}
                  className="w-full h-auto max-h-[70dvh] object-contain bg-black"
                />
              ) : (
                <img
                  src={activeLightbox.loc.medias[activeLightbox.index].url}
                  alt={activeLightbox.loc.city}
                  className="w-full h-auto max-h-[70dvh] object-contain bg-black"
                />
              )}

              <div className="w-full bg-stone-900 p-6 flex flex-col items-center text-center shrink-0">
                <p className="text-emerald-400 font-mono text-sm mb-2">
                  {activeLightbox.loc.date} • {activeLightbox.loc.city}
                </p>
                <p className="text-stone-300 text-sm font-light tracking-wide">
                  {activeLightbox.loc.desc}
                </p>
              </div>

              <button
                onClick={() => setActiveLightbox(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 backdrop-blur-md p-2 rounded-full border border-white/20 transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Scene3_Journey;
