import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface Props {
  title: string;
  image: string;
  reel?: string;
  reviews?: string[];
  onClose: () => void;
}

export default function PastWorkshopExpanded({
  title,
  image,
  reel,
  reviews,
  onClose,
}: Props) {

  /* Close on ESC key & Lock Scroll */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);

    // Lock scroll
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 pt-[72px] flex items-center justify-center bg-black/90"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      // Prevent clicks on background from bubbling if specific logic needed, though onClose handles backdrop
      onClick={onClose}
    >
      {/* 🔹 BLURRED BACKDROP */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover blur-[80px] opacity-40 scale-110"
        />
        <div className="absolute inset-0 bg-[#1A0F0A]/60 mix-blend-multiply" />
      </div>

      {/* 🔹 PHONE REEL CONTAINER */}
      <motion.div
        layoutId={`workshop-reel-${title}`} // Optional for shared layout anims if we had IDs
        className="relative z-10 w-full max-w-[360px] aspect-[9/16] max-h-[85vh] 
                   bg-[#000] rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.8)] 
                   overflow-hidden group cursor-auto border-[6px] border-[#2B1B16] 
                   ring-1 ring-[#C9A24D]/40"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* GOLD GLOW BEHIND/AROUND */}
        <div className="absolute -inset-1 rounded-[44px] bg-[#C9A24D]/10 blur-xl -z-10" />

        {/* 🔹 VIDEO / CONTENT */}
        {/* Notch Area (Decorative) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[24px] bg-[#2B1B16] rounded-b-2xl z-20 pointer-events-none" />

        {reel ? (
          <video
            src={reel}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover opacity-90"
          />
        )}

        {/* 🔹 OVERLAY TEXT */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none flex flex-col justify-end p-8 text-center pb-12">

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="font-serif text-2xl md:text-3xl text-[#C9A24D] leading-tight mb-3 drop-shadow-md">
              {title}
            </h2>

            <p className="text-[#F6F1E8]/80 text-xs tracking-[0.2em] uppercase font-medium">
              Workshop Replay
            </p>

            {reviews && reviews.length > 0 && (
              <p className="text-white/60 text-[0.65rem] italic mt-4 max-w-[80%] mx-auto line-clamp-2">
                “{reviews[0]}”
              </p>
            )}
          </motion.div>
        </div>

        {/* 🔹 CLOSE BUTTON (Overlay on top right of phone for ease) */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-30 w-8 h-8 flex items-center justify-center bg-black/20 backdrop-blur-md rounded-full text-white/80 hover:bg-black/40 transition"
        >
          ✕
        </button>

      </motion.div>
    </motion.div>
  );
}
