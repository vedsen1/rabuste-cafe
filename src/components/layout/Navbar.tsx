import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { FullScreenMenu } from './FullScreenMenu';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
            className={`transition-all duration-300 object-contain ${isScrolled ? 'h-10 md:h-12' : 'h-12 md:h-16'
              }`}
          />
        </Link>

        {/* Right: Contact Link & Menu Button */}
        <div className="flex items-center gap-6">
          <Link
            to="/franchise"
            className={`hidden md:block text-sm font-medium tracking-widest transition-colors uppercase ${isScrolled ? 'text-gold-400 hover:text-cream-100' : 'text-cream-100 hover:text-gold-400 shadow-sm'
              }`}
          >
            Contact
          </Link>

          <button
            className={`transition-colors relative w-8 h-8 flex items-center justify-center ${isScrolled ? 'text-gold-400 hover:text-cream-100' : 'text-cream-100 hover:text-gold-400'
              }`}
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
      </div>

      {/* Full Screen Menu */}
      <FullScreenMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />

    </nav>
  );
};
