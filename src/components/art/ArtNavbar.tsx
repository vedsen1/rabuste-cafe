import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export const ArtNavbar = () => {
    const location = useLocation();

    const links = [
        { name: 'Home', path: '/art' },
        { name: 'Gallery', path: '/art/gallery' },
        { name: 'Artists', path: '/art/artists' },
        { name: 'Augmented Reality', path: '/art/ar' },
    ];

    return (
        <nav className="absolute top-24 left-0 w-full z-40 flex justify-center pointer-events-none">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-8 py-4 pointer-events-auto shadow-xl flex gap-8">
                {links.map((link) => {
                    const isActive = location.pathname === link.path || (link.path !== '/art' && location.pathname.startsWith(`${link.path}/`));

                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="relative group"
                        >
                            <span className={`text-sm tracking-widest uppercase font-sans transition-colors duration-300 ${isActive ? 'text-orange-400 font-bold' : 'text-white/80 hover:text-white'}`}>
                                {link.name}
                            </span>
                            {isActive && (
                                <motion.div
                                    layoutId="artNavIndicator"
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-400"
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
