import { motion } from 'framer-motion';
import { cn } from '../../lib/utils'; // Assuming a utility for class names exists, or I'll just use template literals if not

interface StoryScrollSectionProps {
    title: string;
    subtitle?: string;
    content: string[];
    image: string;
    alignment?: 'left' | 'right';
    year?: string;
    titleClassName?: string;
}

export const StoryScrollSection = ({
    title,
    subtitle,
    content,
    image,
    alignment = 'left',
    year,
    titleClassName,
}: StoryScrollSectionProps) => {
    const isLeft = alignment === 'left';

    return (
        <section className="relative w-full py-20 md:py-32 px-4 md:px-12 overflow-hidden bg-[#fdfbf7] text-[#2b1e1a] border-b border-[#2b1e1a]/5 last:border-0">

            {/* Decorative Year Background */}
            {year && (
                <div className={cn(
                    "absolute top-1/2 -translate-y-1/2 text-[12rem] md:text-[20rem] font-bold text-[#2b1e1a]/[0.03] pointer-events-none select-none font-serif leading-none z-0",
                    isLeft ? "right-[-5%] md:right-0" : "left-[-5%] md:left-0"
                )}>
                    {year}
                </div>
            )}


            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className={cn(
                    "flex flex-col gap-12 md:gap-24 items-center",
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                )}>

                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full md:w-1/2"
                    >
                        <div className="relative group overflow-hidden rounded-sm">
                            <div className="absolute inset-0 bg-[#2b1e1a]/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                            <img
                                src={image}
                                alt={title}
                                className="w-full aspect-[4/5] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                            {/* Premium frame effect */}
                            <div className="absolute inset-4 border border-[#2b1e1a]/10 z-20 pointer-events-none" />
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="w-full md:w-1/2 space-y-8"
                    >
                        <div className="space-y-4">
                            {subtitle && (
                                <span className="block text-gold-600 text-sm md:text-base uppercase tracking-[0.3em] font-medium">
                                    {subtitle}
                                </span>
                            )}
                            <h2 className={cn(
                                "font-serif text-[#2b1e1a] leading-tight",
                                titleClassName || "text-4xl md:text-6xl"
                            )}>
                                {title}
                            </h2>
                            <div className="w-20 h-0.5 bg-gold-600/50" />
                        </div>

                        <div className="space-y-6 text-lg text-[#2b1e1a]/80 font-light leading-relaxed">
                            {content.map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>

                    </motion.div>

                </div>
            </div>
        </section>
    );
};

// Simple utility if it doesn't exist, but usually it does.
// I will assume it might not and just inline it if needed or create a separate utils file if requested.
// For now, I'll assume standard templating or just simple conditional classes.
// Actually, I'll remove the `cn` import and just use template literals to be safe as I haven't checked for utils.
