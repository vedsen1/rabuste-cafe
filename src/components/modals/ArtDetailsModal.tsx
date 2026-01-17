import { X, ShoppingCart, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ArtPiece } from '../../services/artService';
import { useCart } from '../../context/CartContext';

interface ArtDetailsModalProps {
  art: ArtPiece | null;
  onClose: () => void;
}

export const ArtDetailsModal = ({ art, onClose }: ArtDetailsModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  if (!art) return null;

  const handleAddToCart = () => {
    addToCart(art, 'art');
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const priceNum = parseFloat(art.price.replace(/[^0-9.]/g, '')) || 0;
  const totalPrice = priceNum * quantity;
  const inStock = (art.stock ?? 1) > 0;

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
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col relative bg-[#3b2a2a] text-[#f5efe6] overflow-y-auto">
            <button 
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif text-gold-400 mb-2">{art.title}</h2>
                <p className="text-xl text-white/70 italic mb-4 font-serif">by {art.artist}</p>
                
                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8 text-sm border-y border-white/10 py-6">
                  {art.year && (
                    <div>
                      <span className="text-gold-400 uppercase text-xs tracking-widest block">Year</span>
                      <p className="text-white/80">{art.year}</p>
                    </div>
                  )}
                  {art.medium && (
                    <div>
                      <span className="text-gold-400 uppercase text-xs tracking-widest block">Medium</span>
                      <p className="text-white/80">{art.medium}</p>
                    </div>
                  )}
                  {art.dimensions && (
                    <div>
                      <span className="text-gold-400 uppercase text-xs tracking-widest block">Dimensions</span>
                      <p className="text-white/80">{art.dimensions}</p>
                    </div>
                  )}
                  {art.category && (
                    <div>
                      <span className="text-gold-400 uppercase text-xs tracking-widest block">Category</span>
                      <p className="text-white/80">{art.category}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-4 text-white/80 font-light leading-relaxed mb-8">
                  <p>
                    {art.description || "This unique piece captures the essence of movement and stillness. A perfect addition to any collection, crafted with passion and precision."}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Price and Stock */}
                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <div>
                    <span className="text-sm uppercase tracking-widest text-gold-400 block">Price</span>
                    <span className="text-3xl font-bold">{art.price}</span>
                  </div>
                  {inStock ? (
                    <div className="text-right">
                      <span className="text-xs uppercase tracking-widest text-green-400 block">In Stock</span>
                      <span className="text-lg text-green-400">Available</span>
                    </div>
                  ) : (
                    <div className="text-right">
                      <span className="text-xs uppercase tracking-widest text-red-400 block">Out of Stock</span>
                    </div>
                  )}
                </div>

                {/* Quantity Selector */}
                {inStock && (
                  <div className="flex items-center gap-4">
                    <span className="text-sm uppercase tracking-widest text-gold-400">Quantity</span>
                    <div className="flex items-center border border-white/20 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        aria-label="Decrease quantity"
                        className="px-4 py-2 hover:bg-white/10 transition-colors text-white"
                      >
                        −
                      </button>
                      <span className="px-6 py-2 text-white">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        aria-label="Increase quantity"
                        className="px-4 py-2 hover:bg-white/10 transition-colors text-white"
                      >
                        +
                      </button>
                    </div>
                    <span className="ml-auto text-gold-400">
                      Total: ₹{totalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                {/* Add to Cart Button */}
                <button 
                  onClick={handleAddToCart}
                  disabled={!inStock}
                  className={`w-full py-4 font-bold tracking-widest rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                    !inStock
                      ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                      : isAdded
                      ? 'bg-green-500 text-white'
                      : 'bg-gold-500 text-brown-900 hover:bg-cream-100'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check size={20} />
                      ADDED TO CART
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} />
                      ADD TO CART
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
