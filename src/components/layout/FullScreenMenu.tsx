import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

interface FullScreenMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const menuItems = [
    { path: '/', label: 'HOME' },
    { path: '/menu', label: 'MENU' },
    { path: '/our-story', label: 'OUR STORY' },
    { path: '/workshops', label: 'WORKSHOP' },
    { path: '/franchise', label: 'CONTACT' },
];

export const FullScreenMenu = ({ isOpen, onClose }: FullScreenMenuProps) => {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="fixed inset-0 z-[999] flex flex-col"
                    style={{
                        backgroundColor: '#0b0b0b',
                        width: '100vw',
                        height: '100vh',
                        overflow: 'hidden'
                    }}
                >
                    {/* Film Grain Overlay */}
                    <div
                        className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                            backgroundSize: '200px 200px',
                        }}
                    />

                    {/* Vignette Overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.7) 100%)',
                        }}
                    />

                    {/* Header - Fixed at top */}
                    <div className="relative z-10 flex items-center justify-between p-8 md:p-12">
                        {/* Logo */}
                        <motion.img
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                            src={logo}
                            alt="Rabuste Cafe"
                            className="h-12 md:h-16 w-auto opacity-90"
                        />

                        {/* Close Button */}
                        <motion.button
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                            onClick={onClose}
                            className="text-gray-400 hover:text-[#ff7a18] transition-colors duration-300 p-2"
                            aria-label="Close menu"
                        >
                            <X size={32} strokeWidth={1.5} />
                        </motion.button>
                    </div>

                    {/* Main Content - Centered */}
                    <div className="relative flex-1 flex items-center justify-center md:justify-start md:pl-[10%] lg:pl-[15%] overflow-hidden">
                        <div className="w-full max-w-3xl px-8">
                            {/* Menu Items */}
                            <nav className="space-y-2">
                                {menuItems.map((item, index) => (
                                    <div key={item.path}>
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                                        >
                                            <Link
                                                to={item.path}
                                                onClick={onClose}
                                                onMouseEnter={() => setHoveredItem(item.label)}
                                                onMouseLeave={() => setHoveredItem(null)}
                                                className="block py-3 md:py-4 relative group"
                                            >
                                                <motion.span
                                                    animate={{
                                                        color: hoveredItem === item.label ? '#ff7a18' : 'rgba(255, 255, 255, 0.3)',
                                                        x: hoveredItem === item.label ? 10 : 0,
                                                        fontWeight: hoveredItem === item.label ? 800 : 700,
                                                    }}
                                                    transition={{ duration: 0.3, ease: 'easeOut' }}
                                                    className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase tracking-tight font-bold block leading-tight"
                                                    style={{
                                                        fontFamily: "'Inter Tight', 'Bebas Neue', sans-serif",
                                                        textShadow: hoveredItem === item.label
                                                            ? '0 0 30px rgba(255, 122, 24, 0.4), 0 0 60px rgba(255, 122, 24, 0.2)'
                                                            : 'none',
                                                        WebkitTextStroke: hoveredItem === item.label ? '0px' : '1px rgba(255, 255, 255, 0.15)',
                                                    }}
                                                >
                                                    {item.label}
                                                </motion.span>
                                            </Link>
                                        </motion.div>

                                        {/* Separator */}
                                        {index < menuItems.length - 1 && (
                                            <motion.div
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: 1 }}
                                                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                                                className="h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent origin-left my-1"
                                            />
                                        )}
                                    </div>
                                ))}
                            </nav>
                        </div>

                        {/* Dynamic Right Side Text */}
                        <AnimatePresence mode="wait">
                            {hoveredItem && (
                                <motion.div
                                    key={hoveredItem}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="hidden lg:block absolute right-[8%] xl:right-[10%]"
                                >
                                    <p className="text-[#ff7a18] text-xl xl:text-2xl font-light tracking-wider">
                                        {hoveredItem} <span className="text-2xl xl:text-3xl">→</span> Explore
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Footer - Fixed at bottom */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.4 }}
                        className="relative z-10 text-center pb-8"
                    >
                        <p className="text-gray-600 text-xs md:text-sm tracking-widest font-light">
                            CRAFTED WITH ROBUSTA BEANS
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
