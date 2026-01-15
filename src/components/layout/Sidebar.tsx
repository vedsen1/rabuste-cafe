import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const getLinkClass = (path: string) => {
        const baseClass = "text-2xl md:text-3xl font-serif tracking-wide transition-colors relative group";
        if (isActive(path)) {
            return `${baseClass} text-gold-400`;
        }
        return `${baseClass} text-cream-100 hover:text-gold-400`;
    };

    const menuItems = [
        { path: '/', label: 'HOME' },
        { path: '/menu', label: 'MENU' },
        { path: '/our-story', label: 'OUR STORY' },
        { path: '/art', label: 'ART' },
        { path: '/workshops', label: 'WORKSHOPS' },
        { path: '/franchise', label: 'CONTACT US' },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />

                    {/* Sidebar Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-[80%] md:w-[400px] bg-brown-900 border-l border-gold-500/20 z-[70] shadow-2xl flex flex-col p-8 md:p-12"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-12">
                            <img src={logo} alt="Logo" className="h-10 w-auto opacity-80" />
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-white/5 text-gold-400 transition-colors"
                            >
                                <X size={32} />
                            </button>
                        </div>

                        {/* Links */}
                        <nav className="flex flex-col gap-6 md:gap-8">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={onClose}
                                    className={getLinkClass(item.path)}
                                >
                                    <span className="relative z-10">{item.label}</span>
                                    {/* Hover line effect */}
                                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold-400 transition-all duration-300 group-hover:w-full" />
                                </Link>
                            ))}
                        </nav>

                        {/* Footer / Extra info */}
                        <div className="mt-auto pt-10 border-t border-white/10 text-cream-200/50 text-sm font-sans text-center">
                            <p>© 2026 Rabuste Cafe.</p>
                            <p>Brewing Inspiration.</p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
