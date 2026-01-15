import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { FullScreenMenu } from './FullScreenMenu';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Smart Navbar - Hide on Scroll, Show on Hover
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Hide on scroll down
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true); // Show on scroll up
      }
      setLastScrollY(currentScrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 50) {
        setIsVisible(true); // Show navbar if cursor near top
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lastScrollY]);

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

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : -100
      }}
      transition={{ duration: 0.3 }}
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

        {/* Right: Animated Hamburger/Cross Menu Button */}
        <button
          className="text-gold-400 hover:text-cream-100 transition relative w-8 h-8 flex items-center justify-center"
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

            {/* Middle Line */}
            <motion.path
              d="M4 12H20"
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

      {/* Full Screen Menu */}
      <FullScreenMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* Hover Trigger Area - Shows when navbar is hidden */}
      {!isVisible && (
        <div
          className="fixed top-0 left-0 w-full h-12 z-40 cursor-pointer"
          onMouseEnter={() => setIsVisible(true)}
          title="Hover to show menu"
        />
      )}
    </motion.nav>
  );
};