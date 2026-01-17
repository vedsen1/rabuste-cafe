import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_ART_PIECES } from '../../services/artService';
import { Link } from 'react-router-dom';
import { Scan, Smartphone, Box, Cuboid } from 'lucide-react';
import { ArViewer } from './ArViewer';

export const ArExperience = () => {
    const arPieces = MOCK_ART_PIECES.filter(p => p.isArEnabled);
    const [selectedArt, setSelectedArt] = useState(arPieces[0]);

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4">
            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-orange-400 text-sm uppercase tracking-[0.3em] font-bold block mb-4">Augmented Reality</span>
                    <h1 className="text-4xl md:text-7xl font-serif text-white mb-6">
                        Art Beyond the Canvas
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed mb-4">
                        Experience our collection in a new dimension. Select an artwork below to view it in 3D space.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 mb-20 max-w-7xl mx-auto">
                    {/* Left: 3D Viewer */}
                    <div className="w-full lg:w-2/3">
                        <motion.div
                            key={selectedArt.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <ArViewer imageUrl={selectedArt.imageUrl} />
                        </motion.div>

                        <div className="flex items-center justify-between mt-6 px-2">
                            <div>
                                <h2 className="text-2xl font-serif text-white">{selectedArt.title}</h2>
                                <p className="text-orange-400 text-sm uppercase tracking-wider">{selectedArt.artist}</p>
                            </div>
                            <div className="flex gap-4">
                                <button className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-orange-500 hover:text-white transition-colors">
                                    <Smartphone className="w-4 h-4" /> View in AR
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Selector */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-4 max-h-[700px] overflow-y-auto custom-scrollbar pr-2">
                        <h3 className="text-white/50 text-xs font-sans uppercase tracking-widest mb-2 sticky top-0 bg-black z-10 py-2">Select Artwork</h3>
                        {arPieces.map((art) => (
                            <motion.div
                                key={art.id}
                                onClick={() => setSelectedArt(art)}
                                className={`group flex items-center gap-4 p-3 rounded-xl border cursor-pointer transition-all duration-300 ${selectedArt.id === art.id
                                        ? 'bg-white/10 border-orange-500/50'
                                        : 'bg-transparent border-white/5 hover:bg-white/5 hover:border-white/20'
                                    }`}
                                whileHover={{ x: 5 }}
                            >
                                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 relative">
                                    <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover" />
                                    {selectedArt.id === art.id && (
                                        <div className="absolute inset-0 bg-orange-500/20 flex items-center justify-center">
                                            <Cuboid className="w-6 h-6 text-white drop-shadow-md" />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h4 className={`font-serif text-lg mb-1 ${selectedArt.id === art.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                        {art.title}
                                    </h4>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest">{art.artist}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Additional Info / Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto pt-12 border-t border-white/10">
                    {[
                        { icon: Cuboid, title: 'Interact', desc: 'Drag to rotate and explore the artwork in 3D.' },
                        { icon: Scan, title: 'Scan', desc: 'Use your phone camera to place the art in your room.' },
                        { icon: Box, title: 'Collect', desc: 'Own a digital piece of the Rabuste collection.' }
                    ].map((step, idx) => (
                        <div key={idx} className="text-center">
                            <step.icon className="w-8 h-8 text-orange-400 mx-auto mb-4" />
                            <h3 className="text-lg font-serif mb-2">{step.title}</h3>
                            <p className="text-gray-500 text-sm max-w-xs mx-auto">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
