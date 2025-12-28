import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getArtPieces, ArtPiece } from '../services/artService';

// Hardcoded fallback data
const fallbackArt: ArtPiece[] = [
  { id: '1', title: 'The First Roast', artist: 'Elena R.', price: '₹12,000', imageUrl: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80' },
  { id: '2', title: 'Midnight Brew', artist: 'Marcus T.', price: '₹8,500', imageUrl: 'https://images.unsplash.com/photo-1515405295579-ba7f9f92f413?auto=format&fit=crop&q=80' },
  { id: '3', title: 'Steam & Dreams', artist: 'Sarah L.', price: '₹15,000', imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80' },
  { id: '4', title: 'Golden Pour', artist: 'Davinci B.', price: '₹20,000', imageUrl: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80' },
];

export default function Art() {
  const [artPieces, setArtPieces] = useState<ArtPiece[]>([]);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  
  const yHero = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const fetchArt = async () => {
      try {
        const data = await getArtPieces();
        // If Firestore is empty or fails, use fallback
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
    <div className="min-h-screen">
      {/* Immersive Intro Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: yHero, opacity: opacityHero }}
          className="text-center z-10 px-6"
        >
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ duration: 1.5 }}
            className="block text-gold-500 text-sm md:text-base uppercase tracking-[0.5em] mb-4 font-bold"
          >
            Curated Collection
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-5xl md:text-8xl font-serif text-brown-900 mb-6"
          >
            The Art of Coffee
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-brown-900/60 max-w-xl mx-auto font-light text-lg italic"
          >
            "Where every stroke of the brush mirrors the pour of the barista. Explore stories told through canvas and caffeine."
          </motion.p>
        </motion.div>
        
        {/* Background Ambient Elements */}
        <div className="absolute inset-0 pointer-events-none">
           <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
             className="absolute -top-1/2 -right-1/2 w-full h-full border border-brown-900/5 rounded-full"
           />
           <motion.div 
             animate={{ rotate: -360 }}
             transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
             className="absolute -bottom-1/2 -left-1/2 w-[120%] h-[120%] border border-brown-900/5 rounded-full"
           />
        </div>
      </section>

      {/* Gallery Grid */}
      <div className="container mx-auto px-6 pb-24">
        {loading ? (
          <div className="text-center text-brown-900/50 py-20">Unveiling masterpieces...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {artPieces.map((art, i) => (
              <ArtCard key={art.id || i} art={art} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const ArtCard = ({ art, index }: { art: ArtPiece; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className={`group cursor-pointer ${index % 3 === 1 ? 'md:translate-y-12' : ''}`} // Staggered layout effect
    >
      <div className="relative overflow-hidden rounded-sm shadow-xl aspect-[3/4] mb-4 bg-brown-100">
        {/* Image */}
        <img 
          src={art.imageUrl} 
          alt={art.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out filter sepia-[0.2] group-hover:sepia-0" 
        />
        
        {/* Overlay Info */}
        <div className="absolute inset-0 bg-gradient-to-t from-brown-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
          <p className="text-gold-400 font-serif text-lg italic mb-2">"{art.title}"</p>
          <div className="flex justify-between items-center">
            <span className="text-cream-100 text-sm">by {art.artist}</span>
            <button className="bg-cream-100 text-brown-900 px-4 py-2 text-xs font-bold tracking-wider hover:bg-gold-400 transition-colors">
              BUY NOW
            </button>
          </div>
        </div>
      </div>
      
      {/* Minimal Bottom Info */}
      <div className="flex justify-between items-baseline opacity-60 group-hover:opacity-100 transition-opacity">
        <h3 className="text-xl font-serif text-brown-900">{art.title}</h3>
        <span className="text-lg font-bold text-brown-900/80">{art.price}</span>
      </div>
    </motion.div>
  );
};
