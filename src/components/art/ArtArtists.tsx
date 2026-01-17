import { motion } from 'framer-motion';
import { MOCK_ARTISTS, MOCK_ART_PIECES } from '../../services/artService';
import { Link } from 'react-router-dom';

export const ArtArtists = () => {
    return (
        <div className="min-h-screen bg-neutral-900 pt-52 pb-20 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">The Artists</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto font-light">
                        Meet the visionaries who translate the essence of coffee into visual masterpieces.
                    </p>
                </div>

                <div className="space-y-24">
                    {MOCK_ARTISTS.map((artist, index) => {
                        // Get 3 sample works for this artist
                        const sampleWorks = MOCK_ART_PIECES.filter(p => p.artist === artist.name).slice(0, 3);

                        return (
                            <motion.div
                                key={artist.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                            >
                                {/* Artist Profile */}
                                <div className="lg:w-1/3 text-center lg:text-left">
                                    <div className="relative w-48 h-48 mx-auto lg:mx-0 mb-6 rounded-full overflow-hidden border-4 border-white/10">
                                        <img src={artist.imageUrl} alt={artist.name} className="w-full h-full object-cover" />
                                    </div>
                                    <h2 className="text-3xl font-serif text-white mb-2">{artist.name}</h2>
                                    <span className="text-orange-400 text-sm uppercase tracking-widest block mb-4">{artist.specialty}</span>
                                    <p className="text-gray-400 leading-relaxed max-w-md mx-auto lg:mx-0">
                                        {artist.bio}
                                    </p>
                                </div>

                                {/* Sample Works */}
                                <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                                    {sampleWorks.map(work => (
                                        <Link to={`/art/piece/${work.id}`} key={work.id} className="group relative aspect-square bg-gray-800 rounded-lg overflow-hidden">
                                            <img src={work.imageUrl} alt={work.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                                                <span className="text-white font-serif">{work.title}</span>
                                            </div>
                                        </Link>
                                    ))}
                                    {sampleWorks.length === 0 && (
                                        <div className="col-span-3 text-center text-gray-600 italic py-12 border border-dashed border-gray-700 rounded-lg">
                                            No works currently displayed.
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
