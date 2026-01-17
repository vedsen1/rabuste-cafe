import { motion } from "framer-motion";
import { Coffee, PenLine } from "lucide-react";

interface WorkshopRowProps {
  date: string;
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
  onViewDetails?: () => void;
  seatsLeft?: number;
}

export default function WorkshopRow({
  date,
  title,
  description,
  image,
  onViewDetails,
  seatsLeft,
}: WorkshopRowProps) {
  const compactSupplies = [
    { icon: Coffee, label: "Espresso base" },
    { icon: PenLine, label: "Pour guides" },
  ];

  const isSoldOut = seatsLeft === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="group relative border-t border-[#d6cfc2] pt-16"
    >
      <div className="relative w-full h-[280px] md:h-[320px] rounded-[28px] overflow-hidden shadow-[0_18px_60px_rgba(0,0,0,0.4)]">
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover image-sharp ${isSoldOut ? 'grayscale-[0.5]' : ''}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* SEATS LEFT BADGE */}
        {seatsLeft !== undefined && (
          <div className="absolute top-5 right-5 z-20">
            <div className={`backdrop-blur-md border rounded-full px-3 py-1 shadow-lg ${isSoldOut
                ? 'bg-black/40 border-white/20'
                : 'bg-black/30 border-[#C9A24D]/60'
              }`}>
              <span className={`text-[0.55rem] tracking-[0.25em] uppercase font-medium ${isSoldOut ? 'text-white/60' : 'text-[#F6F1E8]'
                }`}>
                {isSoldOut ? 'Sold Out' : `${seatsLeft} Seats Left`}
              </span>
            </div>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 px-4 pb-4 pt-8">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-lg md:text-xl font-serif text-white leading-snug">
                {title}
              </h3>
            </div>
            <p className="text-xs text-white/80">
              {date}
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          whileTap={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="glass-panel rounded-[24px] px-5 py-4 max-w-md mx-4 text-[#F6F1E8] shadow-[0_24px_70px_rgba(0,0,0,0.85)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-[0.65rem] tracking-[0.3em] uppercase text-[#E2D1C3]/70 mb-2">
              What You&apos;ll Use
            </p>
            <div className="flex flex-wrap gap-3 mb-3 text-[0.8rem]">
              {compactSupplies.map((item) => (
                <div
                  key={item.label}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-[#E2D1C3]/30"
                >
                  <item.icon className="w-3.5 h-3.5 text-[#E2D1C3]" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <p className="text-[0.8rem] text-[#F6F1E8]/85 mb-3 leading-relaxed">
              {description}
            </p>
            {onViewDetails && (
              isSoldOut ? (
                <button
                  disabled
                  className="w-full border border-white/20 text-white/50 bg-white/5 px-6 py-2 cursor-not-allowed uppercase tracking-widest text-xs"
                >
                  Sold Out
                </button>
              ) : (
                <button
                  onClick={onViewDetails}
                  className="ghost-button border-[#C48A5A] text-[#C48A5A] bg-transparent px-6 py-2 hover:bg-[#C48A5A] hover:text-[#2D1B14]"
                >
                  Secure Your Canvas
                </button>
              )
            )}
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}
