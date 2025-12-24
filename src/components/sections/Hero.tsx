import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import pie from "../../assets/pie.png";
import beans from "../../assets/beans.png";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col md:flex-row-reverse justify-center items-center overflow-hidden bg-[#e8e5cc] px-4 md:px-12 pt-32 md:pt-0"
    >
      {/* Left Side - Pie Image */}
      <div className="w-full md:w-5/12 h-[50vh] md:h-screen relative z-10 flex items-center justify-center -translate-y-6">
        <motion.img
          src={pie}
          alt="Pie"
          initial={{ opacity: 0, scale: 0.8, x: 70 }}
          animate={{ opacity: 1, scale: 1, x: 40 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="
            w-[70vw] sm:w-[90vw] md:w-[100%]
            max-w-[700px]
            object-contain
            drop-shadow-2xl
          "
        />
        {/* Coffee Beans at top-right of pie */}
        <motion.img
          src={beans}
          alt="Coffee Beans"
          initial={{ opacity: 0, scale:1, x: 50, y: 0 }}
          animate={{ opacity: 1, scale: 2.5, x: 20, y: 50 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-0 right-0 w-24 md:w-32 object-contain"
        />
      </div>
      <motion.img
          src={beans}
          alt="Coffee Beans"
          initial={{ opacity: 0, scale:1, x: 50, y: 70 }}
          animate={{ opacity: 1, scale: 2.5, x: 20, y: 80 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-0 right-0 w-24 md:w-32 object-contain"
        />
      

      {/* Right Side - Content */}
      <div className="w-full md:w-5/12 min-h-[40vh] md:h-screen flex flex-col justify-center items-center md:items-start text-center md:text-left mt-0 md:mt-16 md:-ml-8 -translate-y-4 md:-translate-y-8 px-4 md:px-0">
        <motion.h1
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-serif font-normal tracking-tight text-[#3C2F2F] mb-4 md:mb-6 drop-shadow-sm leading-tight"
          style={{ fontFamily: "'Inria Serif', serif" }}
        >
          Brewing Hope & <br />Great Coffee
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-base md:text-2xl font-sans font-normal tracking-wide text-[#5B4B3A]/90 mb-8 md:mb-12 max-w-sm md:max-w-md leading-relaxed"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          Where every cup is crafted with passion and purpose.
          A welcoming space for coffee lovers to pause, connect, and savor
          thoughtfully brewed moments—one exceptional sip at a time.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 10 , x: 50}}
          animate={{ opacity: 1, y: 0, x: 0}}
          transition={{ delay: 1.2 }}
          onClick={() => navigate('/menu')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 md:px-8 md:py-4 bg-[#3C2F2F] text-[#FFF8E7] font-serif text-base md:text-lg rounded-full shadow-xl hover:bg-[#C49B62] hover:text-[#3C2F2F] transition-all duration-300"
          style={{ fontFamily: "'Inria Serif', serif" }}
        >
          Discover Our Menu
        </motion.button>
      </div>

      
    </section>
  );
};

