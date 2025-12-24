import { motion } from 'framer-motion';
import logo from '../../assets/logo.png';
import { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExit(true);
      setTimeout(onComplete, 800); // Wait for exit animation
    }, 3500); // 3.5 seconds total duration

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={exit ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2F1B14] overflow-hidden"
    >
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0,
              scale: 0
            }}
            animate={{ 
              y: [null, Math.random() * -100],
              opacity: [0, 0.4, 0],
              scale: [0, Math.random() * 2 + 0.5, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
            className="absolute w-1 h-1 bg-gold-400 rounded-full blur-[1px]"
          />
        ))}
      </div>

      {/* Main Logo Container */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Glow Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 0.3, 0], scale: 1.2 }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="absolute inset-0 bg-gold-400 blur-3xl rounded-full z-0"
        />

        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="relative z-10 w-32 md:w-48"
        >
          <img 
            src={logo} 
            alt="Rabuste Coffee Logo" 
            className="w-full h-auto object-contain drop-shadow-2xl"
          />
          
          {/* Shimmer/Reflection Effect */}
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "100%", opacity: [0, 0.5, 0] }}
            transition={{ delay: 1.5, duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
          />
        </motion.div>

        {/* Text Fade In */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-6 text-gold-400 font-serif tracking-[0.3em] text-sm md:text-base uppercase"
        >
          Brewing Excellence
        </motion.div>

        {/* Progress Line */}
        <motion.div 
          className="absolute -bottom-12 w-48 h-[1px] bg-brown-800 overflow-hidden"
        >
           <motion.div
             initial={{ width: "0%" }}
             animate={{ width: "100%" }}
             transition={{ duration: 3.5, ease: "easeInOut" }}
             className="h-full bg-gold-500"
           />
        </motion.div>
      </div>
    </motion.div>
  );
};
