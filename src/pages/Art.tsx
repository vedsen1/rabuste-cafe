import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Navigation, Pagination, Mousewheel } from 'swiper/modules';
import { getArtPieces, ArtPiece } from '../services/artService';
import { ArtDetailsModal } from '../components/modals/ArtDetailsModal';

// Import Swiper stylesa
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

// Hardcoded fallback data
const fallbackArt: ArtPiece[] = [
  { id: '1', title: 'The First Roast', artist: 'Elena R.', price: '₹12,000', imageUrl: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80' },
  { id: '2', title: 'Midnight Brew', artist: 'Marcus T.', price: '₹8,500', imageUrl: 'https://images.unsplash.com/photo-1515405295579-ba7f9f92f413?auto=format&fit=crop&q=80' },
  { id: '3', title: 'Steam & Dreams', artist: 'Sarah L.', price: '₹15,000', imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80' },
  { id: '4', title: 'Golden Pour', artist: 'Davinci B.', price: '₹20,000', imageUrl: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80' },
  { id: '5', title: 'Urban Grind', artist: 'Banksy Lite', price: '₹18,000', imageUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80' },
];

export default function Art() {
  const [artPieces, setArtPieces] = useState<ArtPiece[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArt, setSelectedArt] = useState<ArtPiece | null>(null);
  const { scrollYProgress } = useScroll();

  const yHero = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const fetchArt = async () => {
      try {
        const data = await getArtPieces();
        if (data.length > 0) {
          setArtPieces(data);
        } else {
          setArtPieces(fallbackArt);
        }
      } catch (error) {
        console.error("Failed to load art, using fallback", error);
        setArtPieces(fallbackArt);
      } finally {
        setLoading(false);
      }
    };
    fetchArt();
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/2 w-full h-full border-[2px] border-brown-900/5 rounded-full"
        />
      </div>

      {/* Intro Section */}
      <section className="relative h-[40vh] flex items-end justify-center pb-12 z-10">
        <motion.div
          style={{ y: yHero, opacity: opacityHero }}
          className="text-center px-6"
        >
          <span className="block text-gold-500 text-sm md:text-base uppercase tracking-[0.5em] mb-4 font-bold">
            Curated Collection
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-brown-900">
            The Art of Coffee
          </h1>
        </motion.div>
      </section>

      {/* 3D Carousel Section */}
      <section className="relative z-20 pb-20">
        {loading ? (
          <div className="text-center text-brown-900/50 py-20">Unveiling masterpieces...</div>
        ) : (
          <div className="container mx-auto px-4">
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              spaceBetween={40}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 120,
                modifier: 2,
                slideShadows: false,
              }}
              pagination={{ clickable: true }}
              navigation={true}
              modules={[EffectCoverflow, Pagination, Navigation, Autoplay, Mousewheel]}
              className="w-full py-12"
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              freeMode={{
                enabled: true,
                momentum: true,
                momentumRatio: 0.6,
              }}
              mousewheel={{
                forceToAxis: true,
                sensitivity: 1,
              }}
            >
              {artPieces.map((art) => (
                <SwiperSlide key={art.id} className="w-[300px] md:w-[400px] !flex justify-center">
                  <motion.div
                    whileHover={{ y: -10 }}
                    onClick={() => setSelectedArt(art)}
                    className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl cursor-pointer group bg-brown-900"
                  >
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-2xl font-serif text-gold-400 mb-1">{art.title}</h3>
                      <p className="text-cream-200/80 text-sm mb-4">{art.artist}</p>
                      <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-2 rounded-full text-xs font-bold tracking-widest hover:bg-gold-500 hover:text-brown-900 hover:border-gold-500 transition-all">
                        VIEW DETAILS
                      </button>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </section>

      {/* Details Modal */}
      <ArtDetailsModal
        art={selectedArt}
        onClose={() => setSelectedArt(null)}
      />
    </div>
  );
}
