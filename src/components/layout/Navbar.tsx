import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  const isActive = (path: string) => location.pathname === path;

  const getLinkClass = (path: string) => {
    const baseClass = "text-sm tracking-wide transition relative";
    if (isActive(path)) {
      return `${baseClass} text-gold-400 font-semibold`;
    }
    return `${baseClass} text-cream-200 hover:text-gold-400`;
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full z-50 bg-brown-900/90 backdrop-blur-md border-b border-gold-500/20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">

        {/* Left: Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Cafe Logo"
            className="h-10 md:h-14 w-auto object-contain"
          />
        </Link>

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={getLinkClass("/")} >
            HOME
            {isActive("/") && (
              <motion.div 
                layoutId="navbar-highlight"
                className="absolute inset-0 bg-gold-400/10 rounded-lg -z-10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
          <Link to="/menu" className={getLinkClass("/menu")}>
            MENU
            {isActive("/menu") && (
              <motion.div 
                layoutId="navbar-highlight"
                className="absolute inset-0 bg-gold-400/10 rounded-lg -z-10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
          <Link to="/our-story" className={getLinkClass("/our-story")}>
            OUR STORY
            {isActive("/our-story") && (
              <motion.div 
                layoutId="navbar-highlight"
                className="absolute inset-0 bg-gold-400/10 rounded-lg -z-10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
          <Link to="/art" className={getLinkClass("/art")}>
            ART
            {isActive("/art") && (
              <motion.div 
                layoutId="navbar-highlight"
                className="absolute inset-0 bg-gold-400/10 rounded-lg -z-10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
          <Link to="/workshops" className={getLinkClass("/workshops")}>
            WORKSHOPS
            {isActive("/workshops") && (
              <motion.div 
                layoutId="navbar-highlight"
                className="absolute inset-0 bg-gold-400/10 rounded-lg -z-10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
          <Link to="/franchise" className={getLinkClass("/franchise")}>
            FRANCHISE
            {isActive("/franchise") && (
              <motion.div 
                layoutId="navbar-highlight"
                className="absolute inset-0 bg-gold-400/10 rounded-lg -z-10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
        </div>

        {/* Right: Mobile Toggle */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gold-400 hover:text-cream-100 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brown-900 border-t border-gold-500/20 overflow-hidden"
          >
            <div className="flex flex-col items-center gap-4 py-6">
              <Link to="/" onClick={() => setIsOpen(false)} className={`${getLinkClass("/")} block`}>HOME</Link>
              <Link to="/menu" onClick={() => setIsOpen(false)} className={`${getLinkClass("/menu")} block`}>MENU</Link>
              <Link to="/our-story" onClick={() => setIsOpen(false)} className={`${getLinkClass("/our-story")} block`}>OUR STORY</Link>
              <Link to="/art" onClick={() => setIsOpen(false)} className={`${getLinkClass("/art")} block`}>ART</Link>
              <Link to="/workshops" onClick={() => setIsOpen(false)} className={`${getLinkClass("/workshops")} block`}>WORKSHOPS</Link>
              <Link to="/franchise" onClick={() => setIsOpen(false)} className={`${getLinkClass("/franchise")} block`}>FRANCHISE</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
