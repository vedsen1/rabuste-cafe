import { motion } from 'framer-motion';
import fearlessCoffeeImg from '../../assets/fearless-coffee-collage.jpg';

export const FearlessCoffee = () => {
    return (
        <section className="w-full bg-black text-white font-sans overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 h-auto md:h-[600px] lg:h-[700px]">

                {/* Left Panel: Pouring Image (Cropped from collage) */}
                <div
                    className="relative w-full h-[400px] md:h-full bg-cover bg-no-repeat"
                    style={{
                        backgroundImage: `url(${fearlessCoffeeImg})`,
                        backgroundPosition: 'left center',
                        backgroundSize: '200% 100%' // Zoom in to show only the left half
                    }}
                >
                </div>

                {/* Right Panel: Split Top/Bottom */}
                <div className="flex flex-col h-full">

                    {/* Top Right: Red Stool/Cup (Cropped from collage) */}
                    <div
                        className="w-full h-[300px] md:h-1/2 bg-cover bg-no-repeat"
                        style={{
                            backgroundImage: `url(${fearlessCoffeeImg})`,
                            backgroundPosition: 'right top',
                            backgroundSize: '200% 200%' // Zoom to top-right quadrant
                        }}
                    >
                    </div>

                    {/* Bottom Right: Live Text Section */}
                    {/* Replaces the compressed text in the image with crisp HTML text */}
                    <div className="flex-1 bg-black p-8 md:p-12 lg:p-16 flex flex-col justify-center gap-6">
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-xl md:text-2xl font-serif tracking-wide leading-tight uppercase font-light text-white/90"
                        >
                            Crafted for those who like their coffee fearless.
                        </motion.h3>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-sm md:text-base leading-relaxed text-gray-300 font-light"
                        >
                            We chose Robusta because it reflects our identity—bold, energetic, and unforgettable.
                            Its higher caffeine gives a stronger kick, its deep flavor stands out in milk-based drinks,
                            and its rich crema creates a fuller experience in every sip.
                            At Rabuste, Robusta isn't just coffee—it's a statement.
                        </motion.p>
                    </div>
                </div>
            </div>
        </section >
    );
};
