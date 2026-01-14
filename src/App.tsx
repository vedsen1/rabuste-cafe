import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Art from './pages/Art';
import OurStory from './pages/OurStory';
import Workshops from './pages/Workshops';
import Franchise from './pages/Franchise';
import Explore from './pages/Explore';
import SeedsInquiry from './pages/SeedsInquiry';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { Navbar } from './components/layout/Navbar';
import { Preloader } from './components/ui/Preloader';
import { GlobalBackground } from './components/layout/GlobalBackground';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProtectedAdminRoute } from './components/layout/ProtectedAdminRoute';
import { Footer } from './components/sections/Footer';

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Safety timeout for preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Force disable after 5s if animation fails
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && location.pathname === '/' && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className="min-h-screen text-brown-900 font-sans selection:bg-gold-500 selection:text-brown-900 relative flex flex-col">
        <GlobalBackground />
        <div className="noise-overlay z-50 pointer-events-none mix-blend-overlay opacity-50" />

        <Navbar />

        <div className="relative z-10 flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/art" element={<Art />} />
            <Route path="/workshops" element={<Workshops />} />
            <Route path="/franchise" element={<Franchise />} />
            <Route path='/explore' element={<Explore/>}/>
            <Route path="/seeds-inquiry" element={<SeedsInquiry />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedAdminRoute>
                  <Admin />
                </ProtectedAdminRoute>
              } 
            />
          </Routes>
        </div>
        
        {/* Render Footer everywhere except Admin panel, Login page, and Seeds Inquiry */}
        {location.pathname !== '/admin' && location.pathname !== '/login' && location.pathname !== '/seeds-inquiry' && (
          <div className="relative z-10">
            <Footer />
          </div>
        )}
      </div>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
