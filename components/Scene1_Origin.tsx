import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Scene1_Origin: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  // Particle System for Petals
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const createParticles = () => {
      particles = []; // Reset on recreate
      for (let i = 0; i < 40; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 5 + 2,
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 + 0.5,
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 2 - 1,
        });
      }
    };
    createParticles();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255, 182, 193, 0.6)"; // Pinkish petal color

      particles.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.beginPath();
        // Simple petal shape
        ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height) p.y = -10;
        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
      });

      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative bg-stone-100 overflow-hidden">
      <div className="sticky top-0 h-screen-safe w-full flex items-center justify-center overflow-hidden">
        {/* Background Image (Ink/Mountain) */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none grayscale"
          style={{
            backgroundImage: "url(/images/llf_origin.jpeg)",
          }}
        />

        {/* Ink Overlay (CSS Gradient for simulation) */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-100 via-transparent to-stone-100 z-10" />

        {/* Particles Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-20 pointer-events-none"
        />

        {/* Content */}
        <motion.div
          style={{ opacity, y: textY }}
          className="relative z-30 text-center p-8 max-w-2xl w-full"
        >
          <div className="font-mono text-[10px] md:text-xs mb-4 tracking-[0.2em] text-stone-500 uppercase">
            Begin Time: 2024.07.02
          </div>
          <h1 className="font-serif text-5xl md:text-7xl text-stone-800 mb-6 tracking-tight">
            缘起江湖
          </h1>
          <p className="font-serif text-base md:text-xl text-stone-600 leading-relaxed italic px-4 mt-4">
            "玩家 [加多宝] 遇上了 玩家 [深烛伊]。
            <br /> 连接已建立。"
          </p>
          <div className="mt-10 flex justify-center gap-4 md:gap-8">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-stone-300 shadow-xl bg-white">
              <img
                src="/images/avatar_male.jpg"
                alt="Avatar 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-stone-300 shadow-xl bg-white">
              <img
                src="/images/avatar_female.jpg"
                alt="Avatar 2"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Scene1_Origin;
