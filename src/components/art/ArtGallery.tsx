import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getArtPieces, ArtPiece, MOCK_ART_PIECES } from '../../services/artService';
import { Loader2 } from 'lucide-react';

export const ArtGallery = () => {
    const [filter, setFilter] = useState('All');
    const [artPieces, setArtPieces] = useState<ArtPiece[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Enforce mock data as per user request to display "random good paintings"
        setArtPieces(MOCK_ART_PIECES);
        setLoading(false);
        /* 
        const fetchArt = async () => {
             // ... Code to fetch from Firestore commented out for demo mode ...
        };
        fetchArt(); 
        */
    }, []);

    // Extract unique categories
    const categories = ['All', ...new Set(artPieces.map(item => item.category))];

    const filteredArt = useMemo(() => {
        if (filter === 'All') return artPieces;
        return artPieces.filter(item => item.category === filter);
    }, [filter, artPieces]);

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-900 pt-52 pb-20 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">The Collection</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto font-light">
                        Explore our curated selection of fine art, digital works, and sculptures.
                        Each piece tells a story of culture, craft, and creativity.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full text-sm uppercase tracking-widest transition-all duration-300 ${filter === cat
                                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {filteredArt.map((art) => (
                            <motion.div
                                layout
                                key={art.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-800 cursor-pointer"
                            >
                                <Link to={`/art/piece/${art.id}`} className="block w-full h-full">
                                    <img
                                        src={art.imageUrl}
                                        alt={art.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                                        <span className="text-orange-400 text-xs uppercase tracking-widest mb-2 block">{art.category}</span>
                                        <h3 className="text-2xl font-serif text-white mb-1">{art.title}</h3>
                                        <p className="text-gray-300 text-sm mb-4">by {art.artist}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-white font-bold">{art.price}</span>
                                            <span className="text-xs uppercase tracking-wider text-white border-b border-white pb-0.5">View Details</span>
                                        </div>
                                    </div>

                                    {/* AR Badge */}
                                    {art.isArEnabled && (
                                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                                            <span className="text-xs font-bold text-white tracking-wider">AR READY</span>
                                        </div>
                                    )}
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};
