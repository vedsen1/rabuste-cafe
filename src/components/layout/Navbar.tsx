import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { User as UserIcon } from 'lucide-react';
import logo from '../../assets/logo.png';
import { FullScreenMenu } from './FullScreenMenu';
import { AuthModal } from '../modals/AuthModal';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const isWorkshopsPage = location.pathname === '/workshops';
  const isArtPage = location.pathname.startsWith('/art'); // Covers /art and sub-routes

  // Determine styles based on state
  const getNavTextColor = () => {
    if (isScrolled) return 'text-gold-400 hover:text-cream-100';
    if (isWorkshopsPage || isArtPage) return 'text-[#D4AF37] hover:text-cream-100'; // Yellow/Gold for Workshops & Art
    if (!isHomePage) return 'text-[#2b1e1a] hover:text-gold-400'; // Dark text for light pages
    return 'text-cream-100 hover:text-gold-400'; // White text for Home
  };

  const getLogoStyle = () => {
    if (isScrolled) return 'h-10 md:h-12';
    if (isWorkshopsPage || isArtPage) return 'h-12 md:h-16'; // Original Logo (Gold/White) for Workshops & Art
    if (!isHomePage) return 'h-12 md:h-16 [filter:brightness(0)_saturate(100%)_invert(13%)_sepia(29%)_saturate(795%)_hue-rotate(320deg)_brightness(97%)_contrast(92%)]'; // Brown logo for light pages
    return 'h-12 md:h-16'; // Normal logo for Home
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out border-b ${isScrolled
        ? 'bg-[#2b1e1a]/95 backdrop-blur-md shadow-lg py-2 border-[#8B5E3C]/20'
        : 'bg-transparent py-4 border-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between transition-all duration-300">

        {/* Left: Logo */}
        <Link to="/" className="flex items-center group">
          <img
            src={logo}
            alt="Cafe Logo"
            className={`transition-all duration-300 object-contain ${getLogoStyle()}`}
          />
        </Link>

        {/* Right: Contact Link & Menu Button */}
        <div className="flex items-center gap-6">
          <Link
            to="/franchise"
            className={`hidden md:block text-sm font-medium tracking-widest transition-colors uppercase ${getNavTextColor()}`}
          >
            Contact
          </Link>

          {/* Cart Icon */}
          <Link
            to="/cart"
            className={`transition-colors relative w-10 h-10 flex items-center justify-center ${getNavTextColor()}`}
            aria-label="Cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
          </Link>

          {/* User / Login Icon */}
          <button
            onClick={() => user ? logout() : setIsAuthOpen(true)}
            className={`transition-colors relative w-10 h-10 flex items-center justify-center ${getNavTextColor()}`}
            aria-label={user ? "Logout" : "Login"}
            title={user ? `Signed in as ${user.displayName || user.email}` : "Login / Signup"}
          >
            <UserIcon size={24} strokeWidth={1.5} />
          </button>

          <button
            className={`transition-colors relative w-10 h-10 flex items-center justify-center ${getNavTextColor()}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Top Line */}
              <motion.path
                d="M4 6H20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={{
                  d: isOpen ? "M6 6L18 18" : "M4 6H20",
                  opacity: 1
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />

              {/* Middle Line - Shorter and Right Aligned (Facing Inside/Left) */}
              <motion.path
                d="M8 12H20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={{
                  opacity: isOpen ? 0 : 1
                }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              />

              {/* Bottom Line */}
              <motion.path
                d="M4 18H20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={{
                  d: isOpen ? "M6 18L18 6" : "M4 18H20",
                  opacity: 1
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Full Screen Menu */}
      <FullScreenMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

    </nav >
  );
};