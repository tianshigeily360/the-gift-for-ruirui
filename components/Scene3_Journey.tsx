import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { CityCheckpoint } from '../types';

const cities: CityCheckpoint[] = [
  { name: '兰州', x: 20, y: 30, image: 'https://picsum.photos/200/200?random=4' },
  { name: '北京', x: 70, y: 20, image: 'https://picsum.photos/200/200?random=5' },
  { name: '武汉', x: 60, y: 50, image: 'https://picsum.photos/200/200?random=6' },
  { name: '长沙', x: 55, y: 60, image: 'https://picsum.photos/200/200?random=7' },
  { name: '深圳', x: 65, y: 80, image: 'https://picsum.photos/200/200?random=8' },
];

const Scene3_Journey: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <div ref={containerRef} className="min-h-[200vh] bg-blue-50 relative">
      <div className="sticky top-0 h-screen-safe w-full flex items-center justify-center overflow-hidden p-4">
        <h2 className="absolute top-12 md:top-10 text-2xl md:text-3xl font-sans font-bold text-blue-900/50 uppercase tracking-widest z-20">足迹 (Journey)</h2>
        
        {/* Map Container */}
        <div className="relative w-full max-w-4xl aspect-[3/4] md:aspect-[4/3] bg-white/40 rounded-3xl backdrop-blur-sm border border-white/50 shadow-xl p-4 md:p-8 mt-12">
          
          {/* SVG Map Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
             {/* Abstract Path representing the journey */}
             <motion.path
               d="M 20 30 Q 45 25 70 20 T 60 50 T 55 60 T 65 80"
               fill="transparent"
               stroke="#3b82f6"
               strokeWidth="0.8"
               strokeDasharray="1 1"
               pathLength={scrollYProgress}
               className="drop-shadow-md"
             />
          </svg>

          {/* Cities */}
          {cities.map((city, index) => {
            // Logic to show cities as we scroll past them
            const threshold = (index + 1) / (cities.length + 1);
            
            return (
              <CityMarker 
                key={city.name} 
                city={city} 
                progress={scrollYProgress} 
                threshold={threshold} 
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const CityMarker: React.FC<{ city: CityCheckpoint, progress: any, threshold: number }> = ({ city, progress, threshold }) => {
  const scale = useTransform(progress, [threshold - 0.05, threshold], [0, 1]);
  const opacity = useTransform(progress, [threshold - 0.05, threshold], [0, 1]);

  return (
    <motion.div 
      style={{ left: `${city.x}%`, top: `${city.y}%`, scale, opacity }}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group z-30"
    >
      <div className="bg-white p-1 rounded-full shadow-lg mb-1 md:mb-2 cursor-pointer transition-transform hover:scale-110">
        <img src={city.image} alt={city.name} className="w-8 h-8 md:w-12 md:h-12 rounded-full object-cover" />
      </div>
      <div className="flex items-center gap-1 bg-blue-600 text-white px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold shadow-md whitespace-nowrap">
        <MapPin size={10} />
        {city.name}
      </div>
    </motion.div>
  );
};

export default Scene3_Journey;