import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getRobustaSeeds, RobustaSeed } from '../../services/seedsService';
import { ArrowRight } from 'lucide-react';
import seedBagImage from '../../assets/robusta-seeds-bag.png';
import beansBorder from '../../assets/beans1.png';
import seedsBg from '../../assets/seeds-bg.png';

// Fallback demo seed
const fallbackSeed: RobustaSeed = {
  id: '1',
  title: 'Premium Robusta Seeds',
  description: 'High-quality Robusta seeds sourced from premium growing regions. Perfect for home cultivation and commercial farming.',
  price: '₹499',
  quantity: '100 seeds',
  imageUrl: seedBagImage,
};

export const RobustaSeeds = () => {
  const [seed, setSeed] = useState<RobustaSeed>(fallbackSeed);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeeds = async () => {
      try {
        const data = await getRobustaSeeds();
        if (data.length > 0) {
          setSeed(data[0]); // Use first seed
        } else {
          setSeed(fallbackSeed);
        }
      } catch (error) {
        console.error("Failed to load seeds, using fallback:", error);
        setSeed(fallbackSeed);
      } finally {
        setLoading(false);
      }
    };
    fetchSeeds();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-20 px-4 md:px-12 bg-[#6B4E45]">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#E8DCC4]">Loading seeds...</p>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="w-full relative overflow-hidden bg-[#6B4E45]"
      style={{
        backgroundImage: `url(${seedsBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-12 pt-20 pb-32 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[500px]">
          {/* Left: Product Image (Swapped position) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] md:h-[600px] flex items-center justify-center md:justify-start order-2 md:order-1"
          >
            {/* Bag Image - Enlarged */}
            <div className="relative w-full h-full flex items-center justify-center md:justify-start filter drop-shadow-2xl hover:scale-105 transition-transform duration-500">
              <img
                src={seed.imageUrl}
                alt={seed.title}
                className="max-w-full max-h-full w-auto h-auto object-contain scale-125 md:scale-135 origin-center md:-translate-x-12"
              />
            </div>
          </motion.div>

          {/* Right: Content (Swapped position) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 order-1 md:order-2"
          >
            {/* Heading */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#E8DCC4] leading-[1.1] italic">
              Grab a Bag of Our Finest Robusta Seeds
            </h2>

            {/* Description */}
            <div className="space-y-4 max-w-lg">
              <p className="text-[#D4C5B0] text-lg leading-relaxed">
                Bring a piece of Rabuste home with you. Every pack of our premium Robusta seeds delivers more than just strong plants — it carries a legacy of quality, passion, and sustainable farming.
              </p>
              <p className="text-[#E8DCC4] text-lg">
                Bold in strength. Rich in character. Grown with care.
              </p>
              <p className="text-white font-bold text-lg">
                Grow boldly. Harvest joy.
              </p>
            </div>

            {/* Details */}
            <div className="border-t border-b border-[#8B5E3C] py-4 my-6">
               <p className="text-[#E8DCC4] font-medium flex items-center gap-2">
                 <span className="text-xl">☕</span> {seed.quantity} • Premium Grade
               </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <motion.button
                onClick={() => navigate('/seeds-inquiry')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[#A65D37] text-white font-serif font-bold text-lg hover:bg-[#8B4A28] transition-all duration-300 shadow-lg flex items-center gap-2"
              >
                {seed.price} | Order Today <ArrowRight size={20} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom Beans Border - Adjusted color blending if needed, or kept as is */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 opacity-30 mix-blend-multiply">
         <img 
            src={beansBorder} 
            alt="Coffee Beans Border" 
            className="w-full h-auto object-cover transform translate-y-1/4 scale-110"
            style={{ maxHeight: '150px', objectPosition: 'bottom' }}
         />
      </div>
    </section>
  );
};
