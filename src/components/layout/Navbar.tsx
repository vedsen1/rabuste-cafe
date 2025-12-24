import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
          <Link to="/" className="text-cream-200 hover:text-gold-400 text-sm tracking-wide transition">HOME</Link>
          <Link to="/menu" className="text-cream-200 hover:text-gold-400 text-sm tracking-wide transition">MENU</Link>
          <Link to="/art" className="text-cream-200 hover:text-gold-400 text-sm tracking-wide transition">ART</Link>
          <Link to="/workshops" className="text-cream-200 hover:text-gold-400 text-sm tracking-wide transition">WORKSHOPS</Link>
          <Link to="/franchise" className="text-cream-200 hover:text-gold-400 text-sm tracking-wide transition">FRANCHISE</Link>
        </div>

        {/* Right: Admin & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            to="/admin"
            className="w-9 h-9 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-brown-900 transition-all"
          >
            <User size={18} />
          </Link>

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
              <Link to="/" onClick={() => setIsOpen(false)} className="text-cream-200 hover:text-gold-400 text-sm tracking-wide transition">HOME</Link>
              <Link to="/menu" onClick={() => setIsOpen(false)} className="text-cream-200 hover:text-gold-400 text-sm tracking-wide transition">MENU</Link>
              <Link to="/art" onClick={() => setIsOpen(false)} className="text-cream-200 hover:text-gold-400 text-sm tracking-wide transition">ART</Link>
              <Link to="/workshops" onClick={() => setIsOpen(false)} className="text-cream-200 hover:text-gold-400 text-sm tracking-wide transition">WORKSHOPS</Link>
              <Link to="/franchise" onClick={() => setIsOpen(false)} className="text-cream-200 hover:text-gold-400 text-sm tracking-wide transition">FRANCHISE</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
