import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { MOCK_ART_PIECES } from '../../services/artService';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export const ArtHome = () => {
    // Select top 3 featured items for the hero
    const featuredArt = MOCK_ART_PIECES.slice(0, 3);

    return (
        <div className="w-full bg-black">
            {/* Hero Rotating Banner */}
            <section className="relative h-screen">
                {/* Hero Rotating Banner */}
                <section className="relative h-screen">
                    <Swiper
                        modules={[Autoplay, EffectFade, Pagination, Navigation]}
                        effect={'fade'}
                        fadeEffect={{ crossFade: true }}
                        speed={1500}
                        spaceBetween={0}
                        centeredSlides={true}
                        loop={true}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                            renderBullet: (index, className) => {
                                return `<span class="${className} !bg-white/50 hover:!bg-white !w-3 !h-3"></span>`;
                            },
                        }}
                        className="h-full w-full"
                    >
                        {featuredArt.map((art) => (
                            <SwiperSlide key={art.id}>
                                <div className="relative w-full h-full">
                                    {/* Background Image */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{ backgroundImage: `url(${art.imageUrl})` }}
                                    >
                                        <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay */}
                                    </div>

                                    {/* Content Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8 }}
                                            className="max-w-4xl"
                                        >
                                            <h2 className="text-sm md:text-base text-orange-400 tracking-[0.3em] uppercase mb-4 font-bold">
                                                Featured Artwork
                                            </h2>
                                            <h1 className="text-5xl md:text-8xl font-serif text-white mb-6">
                                                {art.title}
                                            </h1>
                                            <p className="text-lg md:text-2xl text-white/90 font-light mb-8 max-w-2xl mx-auto italic">
                                                by {art.artist}
                                            </p>

                                            <div className="flex flex-col md:flex-row gap-6 justify-center">
                                                <Link
                                                    to="/art/gallery"
                                                    className="px-8 py-3 bg-white text-black font-sans uppercase tracking-widest hover:bg-orange-500 transition-colors duration-300"
                                                >
                                                    Explore Gallery
                                                </Link>
                                                <Link
                                                    to="/art/ar"
                                                    className="px-8 py-3 border border-white text-white font-sans uppercase tracking-widest hover:bg-white/10 transition-colors duration-300"
                                                >
                                                    View in AR
                                                </Link>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>
            </section>

            {/* Mission Statement */}
            <section className="py-24 px-6 relative bg-[#1a1a1a]">
                <div className="container mx-auto max-w-4xl text-center">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-3xl md:text-5xl font-serif text-white mb-8 leading-tight"
                    >
                        "Art is not just what you see, but what you make others see."
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-lg md:text-xl leading-relaxed font-light"
                    >
                        At Rabuste, we believe coffee and art share the same soul—craftsmanship, passion, and storytelling.
                        Our gallery creates a bridge between the physical and digital, allowing you to experience masterpieces
                        in immersive ways. Whether through Augmented Reality or our curated physical space, we invite
                        you to explore the intersection of creativity and caffeine.
                    </motion.p>
                </div>
            </section>

            {/* Video Feature Section */}
            <section className="relative w-full bg-black h-[600px] flex flex-col md:flex-row">
                {/* Left Side: Video Placeholder */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full relative bg-gray-900 flex items-center justify-center border-r border-white/10 group overflow-hidden">
                    <div className="text-center z-10">
                        <div className="w-20 h-20 border-2 border-white/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:border-white transition-all duration-300 cursor-pointer">
                            <div className="w-0 h-0 border-l-[16px] border-l-white border-y-[10px] border-y-transparent ml-1" />
                        </div>
                        <p className="text-white/50 font-sans tracking-widest uppercase text-sm group-hover:text-white transition-colors">Watch Video</p>
                    </div>
                    {/* Placeholder Background Pattern */}
                    <div className="absolute inset-0 opacity-20"
                        style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent pointer-events-none" />
                </div>

                {/* Right Side: Text Content */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-12 relative bg-[#0a0a0a]">
                    <div className="max-w-xl text-left">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-sm md:text-base text-orange-400 tracking-[0.3em] uppercase mb-4 font-bold">
                                Behind the Scenes
                            </h2>
                            <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
                                The Art of Creation
                            </h1>
                            <p className="text-lg text-white/70 font-light mb-8 leading-relaxed">
                                [Text to be provided]. Experience the meticulous process and passion that goes into every masterpiece.
                            </p>
                            <Link
                                to="/art/artists"
                                className="inline-block border-b border-orange-400 text-orange-400 hover:text-white hover:border-white transition-colors pb-1 text-sm uppercase tracking-widest"
                            >
                                Meet the Artists &rarr;
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Quick Links / Categories Preview */}
            <section className="py-20 px-4 bg-black">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'The Collection', desc: 'Browse our curated selection of paintings and digital art.', link: '/art/gallery', img: new URL('../../assets/art/coffee-frame-illusion.png', import.meta.url).href, isCustomCard: true },
                            { title: 'Meet the Artists', desc: 'Discover the visionaries behind the canvas.', link: '/art/artists', img: new URL('../../assets/art/artists.png', import.meta.url).href },
                            { title: 'AR Experience', desc: 'Bring art to life in your own space.', link: '/art/ar', img: new URL('../../assets/art/AR.jpg', import.meta.url).href }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.2 }}
                                className="group relative h-[400px] overflow-hidden cursor-pointer"
                            >
                                <Link to={item.link} className="block w-full h-full">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{ backgroundImage: `url(${item.img})` }}
                                    />
                                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-300" />

                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                                        <h3 className="text-3xl font-serif text-white mb-4 italic group-hover:text-orange-400 transition-colors">{item.title}</h3>
                                        <p className="text-gray-300 font-light max-w-xs">{item.desc}</p>
                                        <span className="mt-8 text-sm uppercase tracking-widest text-white border-b border-transparent group-hover:border-white transition-all pb-1">
                                            Discover &rarr;
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
