import { motion } from "framer-motion";
import { Coffee, ArrowLeft, Heart, MessageCircle, Share2, Play,  Mail, Phone } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import seedsBg from "../assets/seeds-bg.png";

export default function FranchisePage() {
  const navigate = useNavigate();
  const [selectedMedia, setSelectedMedia] = useState<number | null>(null);

  // Placeholder data for images and reels - you can replace with actual uploaded content
  const mediaItems = [
    { id: 1, type: "image", likes: 1240, comments: 89, caption: "Perfect morning brew ☕" },
    { id: 2, type: "reel", likes: 3450, comments: 234, caption: "The art of coffee making" },
    { id: 3, type: "image", likes: 892, comments: 56, caption: "Cozy corner vibes" },
    { id: 4, type: "reel", likes: 2890, comments: 178, caption: "Behind the scenes at Rabuste" },
    { id: 5, type: "image", likes: 1567, comments: 123, caption: "Latte art perfection" },
    { id: 6, type: "image", likes: 2134, comments: 167, caption: "Our signature blend" },
    { id: 7, type: "reel", likes: 4123, comments: 312, caption: "Coffee tasting journey" },
    { id: 8, type: "image", likes: 1890, comments: 98, caption: "Afternoon delights" },
    { id: 9, type: "image", likes: 2456, comments: 189, caption: "Fresh pastries daily" },
  ];

  return (
    <div className="w-full min-h-screen bg-[#f5ebe0]">
      {/* HEADER */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 backdrop-blur-md bg-[#3d2d26]/95 border-b border-[#d4a574]/20 shadow-lg"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-[#d4a574] hover:text-[#c89a5c] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back to Home</span>
            </button>
            
            <div className="flex items-center gap-3">
              <Coffee className="w-8 h-8 text-[#d4a574]" />
              <h1 className="text-2xl font-serif text-white">Rabuste Franchise</h1>
            </div>
            
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#d4a574] hover:text-[#c89a5c] transition-colors"
            >
              <FaInstagram className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">Follow Us</span>
            </a>
          </div>
        </div>
      </motion.header>

      {/* HERO SECTION */}
      <section 
        className="relative py-20 px-4 overflow-hidden"
        style={{
          backgroundImage: `url(${seedsBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#6d3d47]/95 to-[#5d2d37]/90" />
        
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block p-6 bg-[#d4a574]/20 rounded-full mb-8">
              <Coffee className="w-16 h-16 text-[#d4a574]" />
            </div>
            
            <h2 className="text-5xl md:text-7xl font-serif text-[#d4a574] mb-6">
              Join Our Journey
            </h2>
            
            <div className="w-32 h-1 bg-[#d4a574] mx-auto mb-8 rounded-full" />
            
            <p className="text-white/90 text-xl md:text-2xl leading-relaxed mb-12 max-w-3xl mx-auto">
              Become a part of the Rabuste family and bring the finest coffee experience to your community. 
              Explore our gallery of moments, our passion, and our success stories.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-[#d4a574] to-[#c89a5c] text-[#3d2518] rounded-full font-semibold text-lg shadow-xl hover:from-[#c89a5c] hover:to-[#b88a4c] transition-all"
              >
                Get in Touch
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 text-white backdrop-blur-sm rounded-full font-semibold text-lg border-2 border-white/30 hover:bg-white/20 transition-all"
              >
                Download Brochure
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* INSTAGRAM-STYLE GRID */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-4xl md:text-5xl font-serif text-[#3d2518] mb-4">
              Our Gallery
            </h3>
            <p className="text-[#6d4c41] text-lg">
              Discover the Rabuste experience through our lens
            </p>
          </motion.div>

          {/* Instagram Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {mediaItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="relative group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                onClick={() => setSelectedMedia(item.id)}
              >
                {/* Image/Reel Container */}
                <div className="relative aspect-square bg-gradient-to-br from-[#d4c4b0] to-[#c4b5a0]">
                  {/* Placeholder for uploaded image/reel */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {item.type === "reel" ? (
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Play className="w-12 h-12 text-white" fill="white" />
                        </div>
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 w-24 h-24 rounded-full border-4 border-white/30"
                        />
                      </div>
                    ) : (
                      <Coffee className="w-20 h-20 text-[#8b6f47]/30" />
                    )}
                  </div>
                  
                  {/* Placeholder text */}
                  <div className="absolute inset-0 flex items-end p-4">
                    <p className="text-white/70 text-sm italic">
                      {item.type === "reel" ? "Video content placeholder" : "Image placeholder"}
                    </p>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-8">
                    <div className="flex items-center gap-2 text-white">
                      <Heart className="w-6 h-6" />
                      <span className="font-semibold">{item.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <MessageCircle className="w-6 h-6" />
                      <span className="font-semibold">{item.comments}</span>
                    </div>
                  </div>

                  {/* Reel Indicator */}
                  {item.type === "reel" && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2">
                        <Play className="w-4 h-4 text-white" />
                        <span className="text-white text-sm font-medium">Reel</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Caption */}
                <div className="p-4 bg-white">
                  <p className="text-[#3d2518] text-sm font-medium line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button className="px-10 py-4 bg-gradient-to-r from-[#8b6f47] to-[#6d4c41] text-white rounded-full font-semibold hover:from-[#6d4c41] hover:to-[#5d3c31] transition-all shadow-lg">
              Load More Posts
            </button>
          </motion.div>
        </div>
      </section>

      {/* REELS SECTION - Horizontal Scroll */}
      <section className="py-16 bg-gradient-to-br from-[#e8d5c4] to-[#d4c4b0]">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h3 className="text-4xl md:text-5xl font-serif text-[#3d2518] mb-2">
              Featured Reels
            </h3>
            <p className="text-[#6d4c41] text-lg">
              Swipe to explore our video content
            </p>
          </motion.div>

          {/* Horizontal Scroll Container */}
          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
            {[1, 2, 3, 4, 5, 6].map((reel, index) => (
              <motion.div
                key={reel}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-64 snap-center"
              >
                <div className="relative aspect-[9/16] bg-gradient-to-br from-[#6d3d47] to-[#5d2d37] rounded-3xl overflow-hidden shadow-xl group cursor-pointer">
                  {/* Placeholder for reel */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4"
                    >
                      <Play className="w-10 h-10 text-white" fill="white" />
                    </motion.div>
                    <p className="text-white text-center text-sm">
                      Reel {reel}
                    </p>
                    <p className="text-white/60 text-center text-xs mt-2">
                      Tap to watch
                    </p>
                  </div>

                  {/* Engagement Stats */}
                  <div className="absolute bottom-4 left-4 right-4 space-y-3">
                    <div className="flex items-center gap-2 text-white">
                      <Heart className="w-5 h-5" />
                      <span className="text-sm font-medium">{(Math.random() * 5000 + 1000).toFixed(0)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">{(Math.random() * 500 + 50).toFixed(0)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <Share2 className="w-5 h-5" />
                      <span className="text-sm font-medium">{(Math.random() * 200 + 20).toFixed(0)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section 
        className="py-20 px-4 relative overflow-hidden"
        style={{
          backgroundImage: `url(${seedsBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#6d3d47]/95 to-[#5d2d37]/90" />
        
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl md:text-5xl font-serif text-[#d4a574] mb-6">
              Ready to Start Your Franchise?
            </h3>
            
            <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
              Let's discuss how you can bring the Rabuste experience to your community. 
              Our team is here to support you every step of the way.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="flex items-center gap-3 text-white">
                <div className="p-3 bg-[#d4a574]/20 rounded-full">
                  <Mail className="w-6 h-6 text-[#d4a574]" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-white/60">Email us</p>
                  <a href="mailto:franchise@rabuste.cafe" className="text-[#d4a574] hover:underline">
                    franchise@rabuste.cafe
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-white">
                <div className="p-3 bg-[#d4a574]/20 rounded-full">
                  <Phone className="w-6 h-6 text-[#d4a574]" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-white/60">Call us</p>
                  <a href="tel:+916364779727" className="text-[#d4a574] hover:underline">
                    +91 63647 79727
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      

      {/* Add custom scrollbar styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}