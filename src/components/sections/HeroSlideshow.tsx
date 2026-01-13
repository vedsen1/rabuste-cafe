import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SlideImage {
  id: number;
  src: string;
  alt: string;
  isSeedsSlide?: boolean;
}

// Import slideshow images
const slides: SlideImage[] = [
  {
    id: 1,
    src: new URL('../../assets/slideshow/slide-1.jpg', import.meta.url).href,
    alt: 'Rabuste Cafe - Premium Coffee',
  },
  {
    id: 2,
    src: new URL('../../assets/slideshow/slide-2.jpg', import.meta.url).href,
    alt: 'Rabuste Cafe - Artisan Pastries',
  },
  {
    id: 3,
    src: new URL('../../assets/slideshow/slide-3.jpg', import.meta.url).href,
    alt: 'Rabuste Cafe - Workshop Experience',
  },
  {
    id: 4,
    src: new URL('../../assets/slideshow/slide-4.jpg', import.meta.url).href,
    alt: 'Rabuste Cafe - Cozy Ambiance',
  },
  {
    id: 5,
    src: new URL('../../assets/slideshow/slide-5.jpg', import.meta.url).href,
    alt: 'Rabuste Cafe - Community Gathering',
  },
  {
    id: 6,
    src: new URL('../../assets/slideshow/slide-6.jpg', import.meta.url).href,
    alt: 'Rabuste Premium Seeds - The Art of Coffee, Refined',
    isSeedsSlide: true,
  },
];

export const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayTimer = useRef<number | null>(null);
  const navigate = useNavigate();

  // Auto-play slideshow
  useEffect(() => {
    if (isAutoPlay && slides.length > 1) {
      autoPlayTimer.current = window.setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000); // Change slide every 4 seconds
    }

    return () => {
      if (autoPlayTimer.current) {
        window.clearInterval(autoPlayTimer.current);
        autoPlayTimer.current = null;
      }
    };
  }, [isAutoPlay]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
    // Resume auto-play after 8 seconds of manual interaction
    setTimeout(() => setIsAutoPlay(true), 8000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 8000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 8000);
  };

  return (
    <section
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentSlide].src}
            alt={slides[currentSlide].alt}
            className="w-full h-full object-cover"
            loading={currentSlide === 0 ? 'eager' : 'lazy'}
          />
          {/* Animated overlay effect */}
          <motion.div
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0 bg-white"
          />
        </motion.div>
      </AnimatePresence>

      {/* Seeds Slide Special CTA */}
      {slides[currentSlide].isSeedsSlide && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 z-20 text-white"
        >
          <h2 className="text-5xl md:text-6xl font-serif mb-4 tracking-tight">
            The Art of Coffee,{' '}
            <span className="italic text-orange-500">Refined</span>
          </h2>
          <motion.button
            onClick={() => navigate('/seeds-inquiry')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-8 py-4 bg-black border-2 border-orange-500 text-white font-serif text-lg rounded-full hover:bg-orange-500 hover:text-black transition-all duration-300"
          >
            Buy Our Seeds
          </motion.button>
        </motion.div>
      )}

      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Left Arrow Button */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 transition-all duration-300 p-2 md:p-3 rounded-full backdrop-blur-sm"
      >
        <ChevronLeft size={24} className="text-white md:w-8 md:h-8" />
      </button>

      {/* Right Arrow Button */}
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 transition-all duration-300 p-2 md:p-3 rounded-full backdrop-blur-sm"
      >
        <ChevronRight size={24} className="text-white md:w-8 md:h-8" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index
                ? 'bg-white w-8 md:w-10 h-2 md:h-3'
                : 'bg-white/50 hover:bg-white/80 w-2 md:w-3 h-2 md:h-3'
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>

      {/* Slide Counter (Optional) */}
      <div className="absolute top-6 md:top-10 right-6 md:right-10 z-20 text-white text-sm md:text-base font-medium bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
        {currentSlide + 1} / {slides.length}
      </div>

      {/* Auto-play Indicator (Optional) */}
      {isAutoPlay && (
        <div className="absolute top-6 md:top-10 left-6 md:left-10 z-20 flex items-center gap-2 text-white text-sm bg-black/30 px-3 py-2 rounded-full backdrop-blur-sm">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-green-400 rounded-full"
          />
          <span className="text-xs md:text-sm">Auto-playing</span>
        </div>
      )}
    </section>
  );
};
