import { motion } from 'framer-motion';

interface Props {
  title: string;
  image: string;
  date?: string;
  onClick: () => void;
}

export default function PastWorkshopThumbnail({
  title,
  image,
  date,
  onClick,
}: Props) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        y: -8,
      }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      onClick={onClick}
      className="relative cursor-pointer rounded-2xl overflow-hidden shadow-lg group"
    >
      {/* Image */}
      <div className="relative w-full aspect-square">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover image-sharp"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent 
                      opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white 
                    transform translate-y-2 group-hover:translate-y-0 transition-transform">
        <h3 className="font-serif text-xl mb-1 drop-shadow-lg">
          {title}
        </h3>
        {date && (
          <p className="text-sm text-white/80 drop-shadow">
            {date}
          </p>
        )}
      </div>

      {/* Play Icon (optional) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm
                      flex items-center justify-center">
          <div className="w-0 h-0 ml-1
                        border-t-[10px] border-t-transparent
                        border-l-[16px] border-l-white
                        border-b-[10px] border-b-transparent">
          </div>
        </div>
      </div>
    </motion.div>
  );
}
