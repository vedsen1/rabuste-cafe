import { useState, useEffect } from 'react';
import './App.css';
import IntroAnimation from './components/IntroAnimation';
import Header from './components/Header';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Workshops from './pages/Workshops';
import OurStory from './pages/OurStory';
import HostEvent from './pages/HostEvent';
import Footer from './components/Footer';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (showIntro) {
    return <IntroAnimation />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home />;
      case 'menu': return <Menu />;
      case 'workshops': return <Workshops />;
      case 'story': return <OurStory />;
      case 'event': return <HostEvent />;
      default: return <Home />;
    }
  };

  return (
    <div className="app">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
      <Footer />
    </div>
  );
}
