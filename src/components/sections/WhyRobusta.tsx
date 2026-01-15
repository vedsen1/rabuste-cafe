import { motion } from "framer-motion";
import coffeeCup from "../../assets/Splash.png";
import patternBg from "../../assets/why-bg.png";

export const WhyRobusta = () => {
  return (
    <section
      id="story"
      className="relative w-full py-20 overflow-hidden"
      style={{ 
        backgroundColor: "#F7F1E6",
        backgroundImage: `linear-gradient(rgba(255,255,255,0.94), rgba(255,255,255,0.94)), url(${patternBg})`,
        backgroundRepeat: "repeat",
        backgroundSize: "100px",
        backgroundPosition: "center",
        backgroundBlendMode: "screen"
      }}
    >
      <div className="relative container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-20">

          {/* LEFT: TEXT */}
          <div className="max-w-xl">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-serif text-brown-900 mb-8"
            >
              Why Robusta, Why Art
            </motion.h2>

            <div className="space-y-6 text-lg md:text-xl text-brown-800 leading-relaxed font-light">

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Robusta grows where conditions are tougher — higher heat, stronger soil,
                unpredictable climates. That resilience shapes its character:
                deeper body, thicker crema, and an unmistakable strength.
              </motion.p>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="w-24 h-px bg-brown-700"
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="font-serif text-xl text-brown-900"
              >
                Strong coffee. Thoughtful art. A space that stays with you.
              </motion.p>

            </div>
          </div>

          {/* RIGHT: IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.8, 0.25, 1],
              delay: 0.2,
            }}
            className="relative flex justify-center md:justify-end"
          >
            <img
              src={coffeeCup}
              alt="Robusta coffee splash"
              className="w-[280px] md:w-[420px] lg:w-[520px] drop-shadow-xl"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
