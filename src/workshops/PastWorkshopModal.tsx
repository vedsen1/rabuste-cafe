import { motion, AnimatePresence } from 'framer-motion';

interface Workshop {
  title: string;
  date: string;
  video?: string;
  reviews?: string[];
  image?: string;
}

interface Props {
  workshop: Workshop;
  onClose: () => void;
}

export default function PastWorkshopModal({ workshop, onClose }: Props) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4 md:px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 40 }}
          transition={{ duration: 0.4 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#f7f3eb] max-w-3xl w-full rounded-2xl p-8 md:p-12 relative 
                   shadow-2xl overflow-y-auto max-h-[90vh]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-brown-900 hover:text-brown-900/70 
                     text-2xl transition-colors z-10"
          >
            ✕
          </button>

          {/* Video or Image */}
          {workshop.video ? (
            <video
              src={workshop.video}
              controls
              autoPlay
              loop
              className="w-full rounded-xl mb-6 shadow-lg"
            />
          ) : workshop.image ? (
            <img
              src={workshop.image}
              alt={workshop.title}
              className="w-full rounded-xl mb-6 shadow-lg object-cover"
            />
          ) : null}

          {/* Title & Date */}
          <h2 className="text-3xl md:text-4xl font-serif text-brown-900 mb-2">
            {workshop.title}
          </h2>
          <p className="text-brown-900/60 mb-8 text-lg">{workshop.date}</p>

          {/* Divider */}
          <div className="w-20 h-[1px] bg-brown-900/20 mb-8" />

          {/* Reviews */}
          {workshop.reviews && workshop.reviews.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-serif text-brown-900 mb-4">
                What Participants Said
              </h3>
              {workshop.reviews.map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="pl-4 border-l-2 border-brown-900/20"
                >
                  <p className="italic text-brown-900/80 leading-relaxed">
                    "{review}"
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}