import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
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
    { path: '/art', label: 'ART' },
    { path: '/workshops', label: 'WORKSHOP' },
];

export const FullScreenMenu = ({ isOpen, onClose }: FullScreenMenuProps) => {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    // Mouse tracking for custom cursor
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const cursorX = useSpring(mouseX, { damping: 20, stiffness: 150, mass: 0.5 });
    const cursorY = useSpring(mouseY, { damping: 20, stiffness: 150, mass: 0.5 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[999] flex flex-col justify-center cursor-none"
                    style={{
                        backgroundColor: '#0b0b0b',
                        width: '100vw',
                        height: '100vh',
                        overflow: 'hidden'
                    }}
                >
                    <div className="flex flex-col h-full relative z-[20]">
                        {/* Custom Cursor */}
                        <motion.div
                            className="fixed top-0 left-0 pointer-events-none z-[1000] hidden md:flex items-center justify-center mix-blend-difference"
                            style={{
                                x: cursorX,
                                y: cursorY,
                                translateX: '-50%',
                                translateY: '-50%',
                            }}
                        >
                            <AnimatePresence mode="wait">
                                {hoveredItem ? (
                                    <motion.div
                                        key="text"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        transition={{ duration: 0.2 }}
                                        className="text-white font-black text-4xl uppercase tracking-tighter whitespace-nowrap"
                                        style={{
                                            fontFamily: "'Inter Tight', 'Bebas Neue', sans-serif",
                                            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                                        }}
                                    >
                                        {hoveredItem}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="dot"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0 }}
                                        className="w-2 h-2 bg-white rounded-full"
                                    />
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Film Grain Overlay */}
                        <div
                            className="absolute inset-0 opacity-[0.04] pointer-events-none"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                                backgroundSize: '200px 200px',
                            }}
                        />

                        {/* Navbar Placeholder to align Close button */}
                        <div className="absolute top-0 w-full p-8 md:p-12 flex justify-end z-20 pointer-events-none">
                            <motion.button
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 90 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                onClick={onClose}
                                className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300 p-2 cursor-pointer pointer-events-auto"
                                aria-label="Close menu"
                            >
                                <X size={40} strokeWidth={1} />
                            </motion.button>
                        </div>

                        {/* Menu Items */}
                        <div className="relative z-10 container mx-auto px-6 md:px-20 flex flex-col justify-center h-full">
                            <nav className="flex flex-col w-full max-w-4xl">
                                {menuItems.map((item, index) => (
                                    <div key={item.path} className="relative group">
                                        {/* Separator - Top */}
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{ delay: 0.2 + index * 0.05, duration: 0.8, ease: "anticipate" }}
                                            className="h-[1px] bg-white/10 w-full origin-left"
                                        />

                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 20 }}
                                            transition={{
                                                delay: 0.1 + index * 0.1,
                                                duration: 0.5,
                                                ease: "easeOut"
                                            }}
                                            className="relative flex items-baseline py-4 md:py-6 overflow-hidden"
                                        >
                                            <Link
                                                to={item.path}
                                                onClick={onClose}
                                                onMouseEnter={() => setHoveredItem(item.label)}
                                                onMouseLeave={() => setHoveredItem(null)}
                                                className="flex items-center w-full cursor-none"
                                            >
                                                {/* Index Number */}
                                                <span className="text-xs md:text-sm font-light text-gray-500 mr-8 md:mr-16 font-mono tracking-widest">
                                                    0{index + 1}
                                                </span>

                                                {/* Menu Text */}
                                                <motion.span
                                                    className="block text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none"
                                                    style={{
                                                        fontFamily: "'Inter Tight', 'Bebas Neue', sans-serif",
                                                        WebkitTextStroke: hoveredItem === item.label ? '0px' : '1px rgba(255, 255, 255, 0.6)',
                                                        color: hoveredItem === item.label ? '#D4AF37' : 'rgba(255, 255, 255, 0.05)',
                                                    }}
                                                    animate={{
                                                        x: hoveredItem === item.label ? 20 : 0,
                                                        opacity: hoveredItem && hoveredItem !== item.label ? 0.5 : 1,
                                                    }}
                                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                                >
                                                    {item.label}
                                                </motion.span>
                                            </Link>
                                        </motion.div>

                                        {/* Bottom separator for last item */}
                                        {index === menuItems.length - 1 && (
                                            <motion.div
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: 1 }}
                                                transition={{ delay: 0.2 + (index + 1) * 0.05, duration: 0.8, ease: "anticipate" }}
                                                className="h-[1px] bg-white/10 w-full origin-left"
                                            />
                                        )}
                                    </div>
                                ))}
                            </nav>
                        </div>

                        {/* Dynamic Right Side Text - Restored */}
                        <AnimatePresence mode="wait">
                            {hoveredItem && (
                                <motion.div
                                    key={hoveredItem}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="hidden lg:block absolute right-[10%] top-1/2 -translate-y-1/2 pointer-events-none"
                                >
                                    <div className="text-right flex flex-col items-end">
                                        <p className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-4 opacity-80">
                                            Explore
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <h2 className="text-white text-6xl font-black uppercase tracking-tighter"
                                                style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                                                {hoveredItem}
                                            </h2>
                                            <span className="text-[#D4AF37] text-4xl transform -rotate-45">→</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Footer / Decorative Text */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-10 left-0 w-full text-center pointer-events-none"
                        >
                            <p className="text-white text-xs tracking-[0.5em] uppercase font-light opacity-50">
                                Est. 2024 • Rabuste Cafe
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
