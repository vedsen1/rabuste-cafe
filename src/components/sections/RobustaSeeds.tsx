import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getRobustaSeeds, RobustaSeed } from '../../services/seedsService';
import { ArrowRight } from 'lucide-react';
import seedBagImage from '../../assets/robusta-seeds-bag.png';

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
      <section className="w-full py-20 px-4 md:px-12 bg-gradient-to-b from-[#f4f1ea] to-[#e8e5cc]">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-brown-700">Loading seeds...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-20 px-4 md:px-12 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[600px]">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Tag */}
            <p className="text-brown-600 text-sm font-medium">
              Premium Coffee Seeds Collection
            </p>

            {/* Heading */}
            <h2 className="text-5xl md:text-6xl font-serif text-brown-900 leading-tight">
              Grow Your Own <br />
              <span className="text-orange-600">Robusta</span> Seeds
            </h2>

            {/* Description */}
            <p className="text-brown-700/80 text-lg leading-relaxed">
              Once premium beans, now premium seeds — <span className="font-bold text-brown-900">Rabuste Seeds</span> is your gateway to cultivating authentic <span className="font-bold">Robusta</span> coffee at home through <span className="font-bold">quality, expertise,</span> and <span className="font-bold">passion</span>.
            </p>

            {/* Details */}
            <p className="text-brown-900 font-semibold">
              Starting at {seed.price} • {seed.quantity}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <motion.button
                onClick={() => navigate('/seeds-inquiry')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-brown-900 text-white font-serif font-bold rounded-sm hover:bg-orange-600 transition-all duration-300"
              >
                Buy Seeds →
              </motion.button>
            </div>
          </motion.div>

          {/* Right: Product Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-96 md:h-[500px] flex items-center justify-center"
          >
            <img
              src={seed.imageUrl}
              alt={seed.title}
              className="w-4/5 h-4/5 object-contain drop-shadow-2xl"
            />
            {/* Decorative circles */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-80 h-80 border-2 border-brown-200/30 rounded-full" />
              <div className="absolute w-96 h-96 border border-brown-100/20 rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
