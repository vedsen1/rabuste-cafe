import { motion } from 'framer-motion';

interface Props {
  title: string;
  date: string;
  image: string;
  attendees?: number;
  onClick: () => void;
}

export default function PastWorkshopCard({
  title,
  date,
  image,
  attendees,
  onClick,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      onClick={onClick}
      className="cursor-pointer rounded-3xl overflow-hidden 
                 bg-[#f6f1e8] shadow-md hover:shadow-xl transition-shadow"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover image-sharp"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.6 }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-serif text-xl text-brown-900 mb-1">
          {title}
        </h3>

        <p className="text-brown-900/60 text-sm mb-3">
          {date}
        </p>

        {attendees && (
          <p className="text-brown-900/70 text-sm mb-3">
            {attendees} participants
          </p>
        )}

        <span className="inline-block text-brown-900 text-sm font-medium">
          View memories →
        </span>
      </div>
    </motion.div>
  );
}
