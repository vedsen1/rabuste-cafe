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
          <span className="uppercase tracking-widest text-gold-400 text-xl">
            Did you know?
          </span>

          <h2 className="mt-6 text-l md:text-2xl font-serif leading-tight">
            There’s a way to truly experience Robusta Coffee.
            <br /> Savor the 1st, 3rd, and 5th sip.
          </h2>

          <p className="mt-9 text-cream-200/80 leading-relaxed">
            The first sip hits bold and bitter—your taste buds are just waking up to Robusta’s strength.
            By the third sip, the hidden notes begin to unfold, revealing its depth and character.
            And the fifth sip delivers the perfect finish—one that lingers, carrying the essence of 
          </p>

          <p className="mt-8 text-cream-200/180 leading-relaxed">
            "ROBUSTA AND RABUSTE"
          </p>
        </motion.div>

      </div>
    </section>
  );
};