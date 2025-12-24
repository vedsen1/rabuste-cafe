import { motion } from 'framer-motion';
import Products from '../../assets/Products.jpeg';
import Products2 from '../../assets/Products2.jpeg';
import doodles from '../../assets/Doodles.jpg';
export const ExperienceReviews = () => {
  return (
    <section className="w-full relative z-10 flex flex-col md:flex-row bg-[#f4f1ea]">

      {/* LEFT – Images */}
      <div className="w-full md:w-1/2 bg-[#997E67] p-8 md:p-12 flex items-center justify-center backdrop-blur-lg" 
      // style={{
      //   backgroundImage: `url(${doodles})`,}}
      >
        <div className="grid grid-cols-3 gap-6 w-full max-w-xl">

          {/* BIG IMAGE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="col-span-2 h-[380px] rounded-2xl overflow-hidden shadow-xl"
          >
            <img src={Products} alt="Cafe Exterior" className="w-full h-full object-cover" />
          </motion.div>

          {/* RIGHT STACK */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-[180px] rounded-2xl overflow-hidden shadow-xl"
            >
              <img src={Products2} alt="Building" className="w-full h-full object-cover" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-[180px] rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80"
                alt="Cafe Staff"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

        </div>
      </div>


      {/* RIGHT – Reviews */}
      <div className="w-full md:w-1/2 flex flex-col">

        {/* Review 1 */}
        <div className="bg-[#895b60] p-8 md:p-12 flex flex-col justify-center relative">
          <div className="absolute top-4 left-4 text-white/10 text-7xl font-serif select-none">“</div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <h3 className="text-2xl font-serif text-gold-400 mb-4">
              A Sensory Experience
            </h3>
            <p className="text-cream-100/90 text-base md:text-lg italic mb-6">
              "Stepping into Rabuste is like entering a different world. The aroma of freshly ground beans and warm lighting make every visit memorable."
            </p>

            <div className="flex items-center gap-2 border-t border-white/10 pt-4">
              <div className="w-10 h-10 rounded-full bg-cream-200/20 flex items-center justify-center text-gold-400 font-bold">E</div>
              <div>
                <p className="font-bold text-cream-100">Elena R.</p>
                <p className="text-xs tracking-widest text-gold-400/80 uppercase">Coffee Enthusiast</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Review 2 */}
        <div className="bg-[#4b2f32] p-8 md:p-12 flex flex-col justify-center relative">
          <div className="absolute top-4 left-4 text-white/10 text-7xl font-serif select-none">“</div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <h3 className="text-2xl font-serif text-gold-400 mb-4">
              More Than Just Coffee
            </h3>
            <p className="text-cream-100/90 text-base md:text-lg italic mb-6">
              "The workshops here transformed my understanding of brewing. It's a community where art and coffee meet."
            </p>

            <div className="flex items-center gap-4 border-t border-white/10 pt-4">
              <div className="w-10 h-10 rounded-full bg-cream-200/20 flex items-center justify-center text-gold-400 font-bold">M</div>
              <div>
                <p className="font-bold text-cream-100">Marcus T.</p>
                <p className="text-xs tracking-widest text-gold-400/80 uppercase">Local Artist</p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
