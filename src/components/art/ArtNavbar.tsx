import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useArtContext } from '../../pages/Art';

export const ArtNavbar = () => {
    const location = useLocation();
    const { navbarTheme } = useArtContext();

    const links = [
        { name: 'Home', path: '/art' },
        { name: 'Gallery', path: '/art/gallery' },
        { name: 'Artists', path: '/art/artists' },
        { name: 'Augmented Reality', path: '/art/ar' },
    ];

    const containerClasses = navbarTheme === 'yellow'
        ? "bg-yellow-500/90 backdrop-blur-md border border-yellow-400 rounded-full px-8 py-4 pointer-events-auto shadow-xl flex gap-8 transition-colors duration-500"
        : "bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-8 py-4 pointer-events-auto shadow-xl flex gap-8 transition-colors duration-500";

    const textClasses = (isActive: boolean) => {
        if (navbarTheme === 'yellow') {
            return isActive ? 'text-black font-bold' : 'text-black/70 hover:text-black';
        }
        return isActive ? 'text-orange-400 font-bold' : 'text-white/80 hover:text-white';
    };

    const indicatorColor = navbarTheme === 'yellow' ? 'bg-black' : 'bg-orange-400';

    return (
        <nav className="absolute top-24 left-0 w-full z-40 flex justify-center pointer-events-none">
            <div className={containerClasses}>
                {links.map((link) => {
                    const isActive = location.pathname === link.path || (link.path !== '/art' && location.pathname.startsWith(`${link.path}/`));

                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="relative group"
                        >
                            <span className={`text-sm tracking-widest uppercase font-sans transition-colors duration-300 ${textClasses(isActive)}`}>
                                {link.name}
                            </span>
                            {isActive && (
                                <motion.div
                                    layoutId="artNavIndicator"
                                    className={`absolute -bottom-1 left-0 right-0 h-0.5 ${indicatorColor}`}
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};
