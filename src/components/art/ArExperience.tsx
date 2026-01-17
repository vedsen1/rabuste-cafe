import { motion } from 'framer-motion';
import { MOCK_ART_PIECES } from '../../services/artService';
import { Link } from 'react-router-dom';
import { Scan, Smartphone, Box } from 'lucide-react';

export const ArExperience = () => {
    const arPieces = MOCK_ART_PIECES.filter(p => p.isArEnabled);

    return (
        <div className="min-h-screen bg-black text-white pt-52 pb-20 px-4">
            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    <span className="text-orange-400 text-sm uppercase tracking-[0.3em] font-bold block mb-4">Augmented Reality</span>
                    <h1 className="text-4xl md:text-7xl font-serif text-white mb-8">
                        Art Beyond the Canvas
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        Experience the hidden layers of our coffee art collection.
                        Using WebAR technology, we bring static masterpieces to life right in your browser.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 max-w-5xl mx-auto">
                    {[
                        { icon: Smartphone, title: '1. Choose Artwork', desc: 'Select an AR-enabled piece from the gallery below.' },
                        { icon: Scan, title: '2. Scan / Click', desc: 'Click "View in AR" or scan the QR code with your phone.' },
                        { icon: Box, title: '3. Experience', desc: 'Watch the artwork animate and transform in 3D space.' }
                    ].map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.2 }}
                            className="bg-white/5 border border-white/10 p-8 rounded-2xl text-center hover:bg-white/10 transition-colors"
                        >
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <step.icon className="w-8 h-8 text-black" />
                            </div>
                            <h3 className="text-xl font-serif mb-3">{step.title}</h3>
                            <p className="text-gray-400 text-sm">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* AR Gallery List */}
                <div className="mb-12">
                    <h2 className="text-3xl font-serif mb-8 border-b border-white/10 pb-4">AR-Enabled Collection</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {arPieces.map((art) => (
                            <Link to={`/art/piece/${art.id}`} key={art.id} className="group flex items-center gap-6 bg-[#111] p-4 rounded-xl hover:bg-[#222] transition-colors border border-white/5">
                                <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                                    <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-serif text-white mb-1 group-hover:text-orange-400 transition-colors">{art.title}</h3>
                                    <p className="text-sm text-gray-500 mb-2">{art.artist}</p>
                                    <span className="flex items-center text-xs font-bold text-green-400 uppercase tracking-widest gap-2">
                                        <Box className="w-3 h-3" /> AR Ready
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="text-center bg-gradient-to-r from-orange-900/20 to-orange-600/20 p-12 rounded-3xl border border-orange-500/30">
                    <h3 className="text-2xl font-serif mb-4">Ready to start?</h3>
                    <Link to="/art/gallery" className="inline-block bg-white text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-colors">
                        Go to Full Gallery
                    </Link>
                </div>
            </div>
        </div>
    );
};
