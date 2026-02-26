import React, { useState, useEffect, useRef } from "react";
import Scene0_Loading from "./components/Scene0_Loading";
import Scene1_Origin from "./components/Scene1_Origin";
import Scene2_FirstEncounter from "./components/Scene2_FirstEncounter";
import Scene3_Journey from "./components/Scene3_Journey";
import Scene4_Struggle from "./components/Scene4_Struggle";
import Scene5_Resonance from "./components/Scene5_Resonance";
import Scene6_Promise from "./components/Scene6_Promise";
import { Volume2, VolumeX } from "lucide-react";

const BGM_PLAYLIST: Record<number, string> = {
  0: "/music/intro.mp3",
  1: "/music/intro.mp3",
  2: "/music/intro.mp3",
  3: "/music/journey.mp3",
  4: "/music/journey.mp3",
  5: "/music/resonance.mp3",
  6: "/music/resonance.mp3",
};

const App: React.FC = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeScene, setActiveScene] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeIntervalRef = useRef<number | null>(null);

  // ✨ 修复点 1：新增两个 ref 来准确追踪状态，避免闭包陷阱
  const currentTrackRef = useRef<string>("");
  const isPlayingRef = useRef<boolean>(false);

  // ✨ 辅助函数：同步更新 state 和 ref
  const syncPlayState = (playing: boolean) => {
    setIsPlaying(playing);
    isPlayingRef.current = playing;
  };

  const fadeToVolume = (targetVol: number, duration: number = 1000) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    const stepTime = 50;
    const steps = duration / stepTime;
    const volStep = (targetVol - audio.volume) / steps;

    fadeIntervalRef.current = window.setInterval(() => {
      let newVol = audio.volume + volStep;

      if (
        (volStep > 0 && newVol >= targetVol) ||
        (volStep < 0 && newVol <= targetVol)
      ) {
        audio.volume = targetVol;
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      } else {
        audio.volume = Math.max(0, Math.min(1, newVol));
      }
    }, stepTime);
  };

  // 监听 activeScene 变化，触发切歌
  useEffect(() => {
    if (!loadingComplete) return;

    const targetSrc = BGM_PLAYLIST[activeScene];
    const audio = audioRef.current;

    // ✨ 修复点 2：不再依赖浏览器的 audio.currentSrc，直接比对我们的 ref 记录
    if (audio && targetSrc && currentTrackRef.current !== targetSrc) {
      console.log(`[BGM] Switching to Scene ${activeScene}: ${targetSrc}`);

      // 更新当前记录的曲目
      currentTrackRef.current = targetSrc;

      fadeToVolume(0, 500);

      setTimeout(() => {
        audio.src = targetSrc;
        audio.load();

        // ✨ 修复点 3：使用 ref 获取最新播放状态，彻底绕过闭包陷阱
        if (isPlayingRef.current) {
          audio
            .play()
            .then(() => {
              audio.volume = 0;
              fadeToVolume(0.5, 1000);
            })
            .catch((e) => console.error("Play failed:", e));
        }
      }, 500);
    }
  }, [activeScene, loadingComplete]);

  // 其他 IntersectionObserver 逻辑保持不变...
  useEffect(() => {
    if (!loadingComplete) return;

    // 创建观察者
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sceneIndex = Number(
              entry.target.getAttribute("data-scene-index"),
            );
            if (!isNaN(sceneIndex)) {
              setActiveScene(sceneIndex);
            }
          }
        });
      },
      // ✨ 核心修复：抛弃 threshold: 0.5
      // rootMargin 的意思是：在屏幕正中间画一条隐形的水平触发带（上下各往内缩 40%）。
      // 只要任何场景的 DOM 碰到了屏幕中间这 20% 的区域，立刻触发切歌！
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );

    // 绑定所有场景 DOM
    document.querySelectorAll("[data-scene-index]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [loadingComplete]);

  // 处理进入世界（第一次播放）
  const handleEnterWorld = () => {
    setLoadingComplete(true);
    if (audioRef.current) {
      audioRef.current.src = BGM_PLAYLIST[0];

      // ✨ 修复点 4：一定要同步记录第一首歌的路径，防止 useEffect 误判
      currentTrackRef.current = BGM_PLAYLIST[0];

      // ✨ 修复点 5：我把你的注释解开了！如果不设为 0，播放瞬间会“炸”一声最大音量再变小
      audioRef.current.volume = 0;

      audioRef.current
        .play()
        .then(() => {
          syncPlayState(true); // 使用辅助函数同步状态
          fadeToVolume(0.5, 2000);
        })
        .catch(console.error);
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        fadeToVolume(0, 500);
        setTimeout(() => audioRef.current?.pause(), 500);
        syncPlayState(false); // 使用辅助函数同步状态
      } else {
        audioRef.current.play();
        fadeToVolume(0.5, 500);
        syncPlayState(true); // 使用辅助函数同步状态
      }
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      <audio ref={audioRef} loop preload="auto" />

      {!loadingComplete ? (
        // Loading 页面
        <Scene0_Loading onComplete={handleEnterWorld} />
      ) : (
        // 主世界页面
        <>
          {/* 悬浮音乐按钮 */}
          <div className="fixed top-6 right-6 z-50 mix-blend-difference">
            <button
              onClick={toggleAudio}
              className="p-3 rounded-full border border-white/20 bg-black/20 backdrop-blur-md hover:bg-white/10 transition-all active:scale-95"
            >
              {isPlaying ? (
                <Volume2 className="w-5 h-5 text-white animate-pulse" />
              ) : (
                <VolumeX className="w-5 h-5 text-white" />
              )}
            </button>
          </div>

          <main className="w-full">
            {/* 重要：给每个 Scene 加上 data-scene-index 属性用于监听 */}
            <div data-scene-index="1">
              <Scene1_Origin />
            </div>
            <div data-scene-index="2">
              <Scene2_FirstEncounter />
            </div>
            <div data-scene-index="3">
              <Scene3_Journey />
            </div>
            <div data-scene-index="4">
              <Scene4_Struggle />
            </div>
            <div data-scene-index="5">
              <Scene5_Resonance />
            </div>
            <div data-scene-index="6">
              <Scene6_Promise />
            </div>
          </main>

          <footer className="w-full py-12 bg-slate-50 text-center text-slate-400 text-[10px] font-mono pb-safe">
            <p>Project Infinity v1.0.0 • 2026.03.24</p>
          </footer>
        </>
      )}
    </div>
  );
};

export default App;
