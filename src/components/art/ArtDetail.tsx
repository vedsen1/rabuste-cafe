import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Box, Loader2 } from 'lucide-react';
import { ArtPiece, getArtPieces, MOCK_ART_PIECES } from '../../services/artService';
import { useState, useEffect } from 'react';

declare global {
    interface Window {
        Razorpay: any;
    }
}

export const ArtDetail = () => {
    const { id } = useParams();
    const [art, setArt] = useState<ArtPiece | null>(null);
    const [loading, setLoading] = useState(true);
    const [showArQr, setShowArQr] = useState(false);

    useEffect(() => {
        // Use mock data directly
        const mockFound = MOCK_ART_PIECES.find(p => p.id === id);
        setArt(mockFound || null);
        setLoading(false);
    }, [id]);

    const handlePayment = () => {
        if (!art) return;

        // Strip currency symbol and commas to get number
        const priceString = art.price.replace(/[^0-9]/g, '');
        const amount = parseInt(priceString) * 100; // Razorpay expects paise

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_YourKeyHere", // Fallback for demo
            amount: amount,
            currency: "INR",
            name: "Rabuste Cafe Art",
            description: `Purchase: ${art.title}`,
            image: "https://your-logo-url.png",
            handler: function (response: any) {
                alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                // In real app: verify signature on backend and create order
            },
            prefill: {
                name: "Art Collector",
                email: "collector@example.com",
                contact: "9999999999"
            },
            theme: {
                color: "#D4AF37"
            }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#111] flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
            </div>
        );
    }

    if (!art) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                <div className="text-center">
                    <h2 className="text-2xl mb-4">Artwork not found</h2>
                    <Link to="/art/gallery" className="text-orange-400 hover:text-orange-300">Return to Gallery</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#111] text-white pt-52 pb-20">
            <div className="container mx-auto px-4">
                <Link to="/art/gallery" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Gallery
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative rounded-lg overflow-hidden shadow-2xl bg-gray-900"
                    >
                        <img src={art.imageUrl} alt={art.title} className="w-full h-auto object-cover" />
                        {art.isArEnabled && (
                            <div className="absolute bottom-6 right-6">
                                <button
                                    onClick={() => setShowArQr(!showArQr)}
                                    className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold shadow-lg hover:bg-orange-400 transition-colors"
                                >
                                    <Box className="w-5 h-5" />
                                    View in AR
                                </button>
                            </div>
                        )}

                        {/* AR Overlay (Simulated Camera View) */}
                        {showArQr && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="fixed inset-0 z-50 bg-black flex flex-col"
                            >
                                {/* Camera Header */}
                                <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10 bg-gradient-to-b from-black/80 to-transparent">
                                    <button
                                        onClick={() => setShowArQr(false)}
                                        className="text-white hover:text-orange-400"
                                    >
                                        <ArrowLeft className="w-8 h-8" />
                                    </button>
                                    <span className="text-white font-bold tracking-widest uppercase text-sm">AR View</span>
                                    <div className="w-8" />
                                </div>

                                {/* Simulated Camera Content */}
                                <div className="relative flex-1 bg-gray-900 overflow-hidden">
                                    {/* Fake Camera Feed Background */}
                                    {/* Ideally this would be the user's camera, but for demo: generic blurred room */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center opacity-50"
                                        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80")' }}
                                    />

                                    {/* 3D Artwork Placement Mock */}
                                    <motion.div
                                        initial={{ scale: 0.8, rotateY: 45, opacity: 0 }}
                                        animate={{ scale: 1, rotateY: 0, opacity: 1 }}
                                        transition={{ duration: 1.5, type: "spring" }}
                                        className="absolute inset-0 flex items-center justify-center p-12"
                                    >
                                        <div className="relative shadow-2xl shadow-black/50 border-[12px] border-white max-w-sm transform perspective-1000 rotate-y-12">
                                            <img src={art.imageUrl} alt={art.title} className="w-full h-auto" />
                                        </div>
                                    </motion.div>

                                    {/* Scan Lines / UI Elements */}
                                    <div className="absolute inset-0 pointer-events-none border-[32px] border-transparent">
                                        <div className="w-full h-full border-2 border-white/30 rounded-3xl relative">
                                            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-orange-400 -mt-1 -ml-1" />
                                            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-orange-400 -mt-1 -mr-1" />
                                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-orange-400 -mb-1 -ml-1" />
                                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-orange-400 -mb-1 -mr-1" />
                                        </div>
                                    </div>
                                </div>

                                {/* Camera Footer */}
                                <div className="bg-black/80 backdrop-blur-md p-8 text-center text-white">
                                    <p className="mb-4 text-sm font-bold tracking-widest uppercase text-orange-400">Artwork Detected</p>
                                    <h3 className="text-2xl font-serif mb-2">{art.title}</h3>
                                    <p className="text-gray-400 text-sm mb-6">Move your device to explore dimensions</p>
                                    <button className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center mx-auto hover:bg-white/20 transition-colors">
                                        <div className="w-12 h-12 bg-white rounded-full" />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Right: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="text-orange-400 text-sm font-bold tracking-widest uppercase mb-2 block">{art.category}</span>
                        <h1 className="text-4xl md:text-6xl font-serif mb-4 leading-tight">{art.title}</h1>
                        <p className="text-2xl text-gray-300 font-light mb-8">by <span className="text-white font-normal">{art.artist}</span></p>

                        <div className="grid grid-cols-2 gap-6 border-y border-white/10 py-8 mb-8">
                            <div>
                                <h4 className="text-gray-500 text-xs uppercase tracking-widest mb-1">Year</h4>
                                <p className="text-lg">{art.year || 'N/A'}</p>
                            </div>
                            <div>
                                <h4 className="text-gray-500 text-xs uppercase tracking-widest mb-1">Dimensions</h4>
                                <p className="text-lg">{art.dimensions || 'N/A'}</p>
                            </div>
                            <div>
                                <h4 className="text-gray-500 text-xs uppercase tracking-widest mb-1">Medium</h4>
                                <p className="text-lg">Mixed Media</p>
                            </div>
                            <div>
                                <h4 className="text-gray-500 text-xs uppercase tracking-widest mb-1">Price</h4>
                                <p className="text-lg font-bold text-green-400">{art.price}</p>
                            </div>
                        </div>

                        <div className="mb-10">
                            <h3 className="text-xl font-serif mb-4">About the Piece</h3>
                            <p className="text-gray-400 leading-relaxed text-lg font-light">
                                {art.description || 'No description available.'}
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={handlePayment}
                                className="flex-1 bg-white text-black py-4 font-bold uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-colors"
                            >
                                Buy Original
                            </button>
                            <button className="flex-1 border border-white text-white py-4 font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
                                Purchase Print
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
