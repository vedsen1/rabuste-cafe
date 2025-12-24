import { motion, useScroll, useTransform } from 'framer-motion';
import Beans from '../../assets/beans1.png';


export const GlobalBackground = () => {
  const { scrollYProgress } = useScroll();
  
  // Parallax effect for leaves
  const yLeft = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yRight = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rotateLeft = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const rotateRight = useTransform(scrollYProgress, [0, 1], [0, -10]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#f5f5dc]">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/paper.png')] mix-blend-multiply" />
      
      {/* Left Beans */}
      <motion.div 
        style={{ y: yLeft, rotate: rotateLeft }}
        className="absolute top-20 -left-10 w-48 md:w-64 opacity-20"
      >
        <img src={Beans} className="w-full h-auto object-contain transform -scale-x-100 filter sepia brightness-50 contrast-150" alt="" />
      </motion.div>
      
      <motion.div 
        style={{ y: yRight, rotate: rotateRight }}
        className="absolute top-[60vh] -left-16 w-56 md:w-80 opacity-15"
      >
         <img src={Beans} className="w-full h-auto object-contain transform -scale-x-100 rotate-45 filter sepia brightness-50 contrast-150" alt="" />
      </motion.div>

      {/* Right Beans */}
      <motion.div 
        style={{ y: yRight, rotate: rotateRight }}
        className="absolute top-40 -right-10 w-56 md:w-72 opacity-20"
      >
        <img src={Beans} className="w-full h-auto object-contain filter sepia brightness-50 contrast-150" alt="" />
      </motion.div>

      <motion.div 
        style={{ y: yLeft, rotate: rotateLeft }}
        className="absolute top-[70vh] -right-20 w-64 md:w-96 opacity-15"
      >
        <img src={Beans} className="w-full h-auto object-contain rotate-12 filter sepia brightness-50 contrast-150" alt="" />
      </motion.div>
    </div>
  );
};
