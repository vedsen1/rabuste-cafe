import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface WorkshopPreview {
  id: string;
  title: string;
  image: string;
}

interface Props {
  workshops: WorkshopPreview[];
  onSelect: (workshop: WorkshopPreview) => void;
}

export default function WorkshopSphere({ workshops, onSelect }: Props) {
  const size = 520;
  const cardSize = 140;
  const center = size / 2;
  const radius = 170;

  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      rotate: 360,
      transition: {
        duration: 180, // Very slow, calm rotation
        repeat: Infinity,
        ease: 'linear',
      },
    });
  }, [controls]);

  return (
    <div
      className="relative mx-auto"
      style={{ width: size, height: size }}
      onMouseEnter={() => controls.stop()}
      onMouseLeave={() =>
        controls.start({
          rotate: 360,
          transition: {
            duration: 180,
            repeat: Infinity,
            ease: 'linear',
          },
        })
      }
    >
      {/* Realistic wooden coffee table surface */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#8b6f47] via-[#7a5c3e] to-[#6f4e37] shadow-[0_30px_60px_rgba(0,0,0,0.25)]" />

      {/* Wood grain texture */}
      <div className="absolute inset-0 rounded-full opacity-[0.08] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
      
      {/* Organic wood texture lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 520 520">
        <circle cx="260" cy="260" r="180" fill="none" stroke="#3e2723" strokeWidth="0.5" />
        <circle cx="260" cy="260" r="200" fill="none" stroke="#3e2723" strokeWidth="0.3" />
        <circle cx="260" cy="260" r="220" fill="none" stroke="#3e2723" strokeWidth="0.4" />
      </svg>

      {/* Subtle inner shadow for depth */}
      <div className="absolute inset-4 rounded-full shadow-[inset_0_2px_20px_rgba(0,0,0,0.15)]" />

      {/* Center plate/coaster */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#f9f6f0] to-[#ede7dd] shadow-[0_4px_12px_rgba(0,0,0,0.15),inset_0_1px_3px_rgba(255,255,255,0.6)] flex items-center justify-center">
          <p className="text-[#5d4037]/60 text-[10px] font-serif italic tracking-wide">
            coffee time
          </p>
        </div>
      </div>

      {/* Rotating orbit with UPRIGHT thumbnails */}
      <motion.div className="absolute inset-0" animate={controls}>
        {workshops.map((workshop, index) => {
          const angle = (index / workshops.length) * 2 * Math.PI;
          const x = center + radius * Math.cos(angle) - cardSize / 2;
          const y = center + radius * Math.sin(angle) - cardSize / 2;

          return (
            <motion.div
              key={workshop.id}
              className="absolute cursor-pointer"
              style={{ left: x, top: y }}
              whileHover={{
                scale: 1.05,
                y: -6,
                zIndex: 20,
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              onClick={() => onSelect(workshop)}
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 180, repeat: Infinity, ease: 'linear' }}
                className="relative w-[140px] h-[140px] rounded-xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.3)] bg-white"
              >
                <img
                  src={workshop.image}
                  alt={workshop.title}
                  className="w-full h-full object-cover image-sharp"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white text-[11px] font-serif leading-tight drop-shadow-lg">
                    {workshop.title}
                  </p>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
