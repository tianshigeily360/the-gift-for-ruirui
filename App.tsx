import React, { useState, useEffect, useRef } from 'react';
import Scene0_Loading from './components/Scene0_Loading';
import Scene1_Origin from './components/Scene1_Origin';
import Scene2_FirstEncounter from './components/Scene2_FirstEncounter';
import Scene3_Journey from './components/Scene3_Journey';
import Scene4_Struggle from './components/Scene4_Struggle';
import Scene5_Resonance from './components/Scene5_Resonance';
import Scene6_Promise from './components/Scene6_Promise';
import { Play, Pause } from 'lucide-react';

const App: React.FC = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Placeholder BGM - Replace with your own file
  // Using a royalty-free placeholder from a CDN for demonstration
  const BGM_URL = "https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3"; 

  const handleEnterWorld = () => {
    setLoadingComplete(true);
    // Attempt to auto-play on first user interaction
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.log("Autoplay prevented:", error);
          setIsPlaying(false);
        });
      }
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Mobile viewport height fix
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);
    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
    };
  }, []);

  if (!loadingComplete) {
    return <Scene0_Loading onComplete={handleEnterWorld} />;
  }

  return (
    <div className="relative w-full overflow-hidden">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={BGM_URL} loop preload="auto" />

      {/* Floating Audio Control - Adjusted for mobile safe areas */}
      <div className="fixed top-6 right-6 z-50 mix-blend-difference">
        <button 
          onClick={toggleAudio}
          className="p-3 rounded-full border border-white/20 bg-black/20 backdrop-blur-md hover:bg-white/10 transition-all active:scale-95 touch-manipulation"
          aria-label={isPlaying ? "Pause Music" : "Play Music"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white animate-pulse" />
          ) : (
            <Play className="w-5 h-5 text-white" />
          )}
        </button>
      </div>

      <main className="w-full">
        {/* Scene 1: Origin (JX3) */}
        <Scene1_Origin />

        {/* Scene 2: First Encounter (Lanzhou) */}
        <Scene2_FirstEncounter />

        {/* Scene 3: The Journey (Map) */}
        <Scene3_Journey />

        {/* Scene 4: Struggle (Terminal) */}
        <Scene4_Struggle />

        {/* Scene 5: Resonance (Music) */}
        <Scene5_Resonance />

        {/* Scene 6: Promise (Future) */}
        <Scene6_Promise />
      </main>

      <footer className="w-full py-12 bg-slate-50 text-center text-slate-400 text-[10px] font-mono pb-safe">
        <p>Project Infinity v1.0.0 • 2026.03.24</p>
        <p className="mt-2">专为 VIP Player 1 打造</p>
      </footer>
    </div>
  );
};

export default App;