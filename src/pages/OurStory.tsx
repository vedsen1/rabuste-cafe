import { motion, useScroll, useTransform } from 'framer-motion';
import { Compass, Clock, MapPin, Coffee } from 'lucide-react';

export default function OurStory() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="min-h-screen pb-20 overflow-hidden">

      <section className="relative h-[65vh] md:h-screen flex items-center justify-center overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80"
          alt="Cafe Interior"
          className="
    absolute inset-0 w-full h-full
    object-contain md:object-cover
    opacity-100 md:opacity-100
  "
        />

        {/* Content */}
        <div className="
    relative z-10 flex flex-col items-center justify-center text-center
    px-4 md:p-6
    text-white
  ">
          <Compass className="
      w-12 h-12 md:w-20 md:h-20
      text-white md:text-gold-400
      mb-4 md:mb-6
      md:animate-pulse
    " />

          <h2 className="
      text-3xl md:text-7xl
      font-serif
      mb-3 md:mb-4
      leading-tight
      drop-shadow-lg
    ">
            Virtual Tour
          </h2>

          <p className="
      text-sm md:text-xl
      max-w-xs md:max-w-lg
      mb-6 md:mb-8
      text-white/90 md:text-cream-200/90
    ">
            Experience the ambiance of Rabuste Cafe from the comfort of your home.
          </p>

          <button className="
      px-6 py-3 md:px-10 md:py-4
      rounded-full
      text-xs md:text-sm
      font-bold
      uppercase tracking-[0.2em]
      border-2
      border-white md:border-gold-400
      text-white md:text-gold-400
      bg-white/10 md:bg-black/20
      hover:bg-white hover:text-black
      md:hover:bg-gold-400 md:hover:text-brown-900
      transition-all
      backdrop-blur-sm
    ">
            Explore Space
          </button>
        </div>
      </section>


      <section className="relative py-10 md:py-16 flex items-start justify-center">
  <motion.div 
    style={{ y: yParallax }}
    className="text-center z-10 px-6 max-w-4xl mt-6 md:mt-10"
  >
    <motion.span 
      initial={{ opacity: 0, letterSpacing: "0.2em" }}
      whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
      viewport={{ once: true }}
      transition={{ duration: 1.5 }}
      className="block text-gold-500 text-xs md:text-base uppercase tracking-[0.5em] mb-3 font-bold"
    >
      A Journey Through Time & Taste
    </motion.span>

    <motion.h1 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5, duration: 1 }}
      className="text-4xl md:text-10xl font-serif text-brown-900 mb-4 leading-tight"
    >
      The Rabuste Experience
    </motion.h1>

    <motion.p 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 1, duration: 1 }}
      className="text-brown-900/70 text-base md:text-xl font-light max-w-3xl mx-auto"
    >
      Step inside our world. From the first bean we roasted to the community we've built, explore the soul of our cafe.
    </motion.p>
  </motion.div>
</section>



    </div>
  );
}
