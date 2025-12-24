import { motion } from 'framer-motion';
import brewed from '../../assets/Brewed.jpeg'
export const Story = () => {
  return (
    <section
      id="story"
      className="w-full bg-[#2b1e1a] py-20 px-4 md:px-12 text-cream-100"
    >
      <div className="max-w-7xl mx-auto grid  grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-14 items-center">

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="w-full"
        >
          <img
            src={brewed}
            alt="Coffee being brewed"
            className="w-full h-[460px] md:h-[520px] object-cover rounded-2xl"
          />
        </motion.div>

        {/* STORY TEXT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <span className="uppercase tracking-widest text-gold-400 text-sm">
            Our Story
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-serif leading-tight">
            Built Around
            <br /> Bold Robusta.
          </h2>

          <p className="mt-6 text-cream-200/80 leading-relaxed">
            We chose Robusta not to follow trends, but to honor strength.
            Grown in tougher conditions, it develops a deeper body,
            thicker crema, and a caffeine kick that lingers.
          </p>

          <p className="mt-4 text-cream-200/80 leading-relaxed">
            This café is a reflection of that belief — honest coffee,
            a cozy space, and moments that don't rush you,
            even when the world does.
          </p>
        </motion.div>

      </div>
    </section>
  );
};