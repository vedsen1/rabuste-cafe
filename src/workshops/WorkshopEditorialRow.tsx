import { motion } from 'framer-motion';
import { Coffee, PenLine, Brush } from 'lucide-react';

interface Props {
  title: string;
  schedule: string;
  image: string;
  description?: string;
  reverse?: boolean;
  seatsLeft?: number;
  onRegister: () => void;
}

export default function WorkshopEditorialRow({
  title,
  schedule,
  image,
  description,
  seatsLeft,
  onRegister,
}: Props) {
  const supplies = [
    { icon: Coffee, label: 'Single-origin espresso' },
    { icon: PenLine, label: 'Sketches and pour guides' },
    { icon: Brush, label: 'Milk pitcher and tools' },
  ];

  const isSoldOut = seatsLeft === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="group relative mb-20"
    >
      <div className="relative w-full h-[340px] md:h-[380px] rounded-[32px] overflow-hidden shadow-[0_22px_70px_rgba(0,0,0,0.55)]">
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover image-sharp ${isSoldOut ? 'grayscale-[0.5]' : ''}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* SEATS LEFT BADGE */}
        {seatsLeft !== undefined && (
          <div className="absolute top-6 right-6 z-20">
            <div className={`backdrop-blur-md border rounded-full px-4 py-1.5 shadow-lg ${isSoldOut
                ? 'bg-black/40 border-white/20'
                : 'bg-black/30 border-[#C9A24D]/60'
              }`}>
              <span className={`text-[0.6rem] tracking-[0.25em] uppercase font-medium ${isSoldOut ? 'text-white/60' : 'text-[#F6F1E8]'
                }`}>
                {isSoldOut ? 'Sold Out' : `${seatsLeft} Seats Left`}
              </span>
            </div>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 px-5 pb-4 pt-10">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-xl md:text-2xl font-serif text-[#F6F1E8] leading-snug">
                {title}
              </h3>
            </div>
            <p className="text-xs md:text-sm text-[#E2D1C3]/80">
              {schedule}
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          whileTap={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="glass-panel rounded-[28px] px-6 py-5 md:px-7 md:py-6 max-w-md mx-4 text-[#F6F1E8] shadow-[0_26px_80px_rgba(0,0,0,0.85)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-[0.65rem] tracking-[0.3em] uppercase text-[#E2D1C3]/70 mb-2">
              What You&apos;ll Use
            </p>
            <div className="flex flex-wrap gap-3 mb-4 text-[0.82rem]">
              {supplies.map((item) => (
                <div
                  key={item.label}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-[#E2D1C3]/25"
                >
                  <item.icon className="w-3.5 h-3.5 text-[#E2D1C3]" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <p className="text-[0.8rem] text-[#F6F1E8]/85 mb-4 leading-relaxed">
              {description || 'A slow, hands-on session to learn pours, patterns, and how to make milk behave.'}
            </p>
            {isSoldOut ? (
              <button
                disabled
                className="w-full border border-white/20 text-white/50 bg-white/5 px-7 py-2.5 cursor-not-allowed uppercase tracking-widest text-xs"
              >
                Sold Out
              </button>
            ) : (
              <motion.button
                onClick={onRegister}
                className="ghost-button border-[#C48A5A] text-[#C48A5A] bg-transparent px-7 py-2.5 hover:bg-[#C48A5A] hover:text-[#2D1B14]"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                Secure Your Canvas
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}
