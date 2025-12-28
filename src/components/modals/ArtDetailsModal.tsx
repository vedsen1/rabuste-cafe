import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArtPiece } from '../../services/artService';

interface ArtDetailsModalProps {
  art: ArtPiece | null;
  onClose: () => void;
}

export const ArtDetailsModal = ({ art, onClose }: ArtDetailsModalProps) => {
  if (!art) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-brown-900 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image Section */}
          <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-black/20">
            <img 
              src={art.imageUrl} 
              alt={art.title} 
              className="w-full h-full object-contain p-4 md:p-8"
            />
          </div>

          {/* Info Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col relative bg-[#3b2a2a] text-[#f5efe6]">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-serif text-gold-400 mb-2">{art.title}</h2>
              <p className="text-xl text-white/70 italic mb-8 font-serif">by {art.artist}</p>
              
              <div className="space-y-6 text-white/80 font-light leading-relaxed">
                <p>
                  {art.description || "This unique piece captures the essence of movement and stillness. A perfect addition to any collection, crafted with passion and precision."}
                </p>
                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                  <span className="text-sm uppercase tracking-widest text-gold-400">Price</span>
                  <span className="text-3xl font-bold">{art.price}</span>
                </div>
              </div>
            </div>

            <button className="w-full mt-8 py-4 bg-gold-500 text-brown-900 font-bold tracking-widest hover:bg-cream-100 transition-all duration-300 rounded-lg">
              CONTACT TO PURCHASE
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
