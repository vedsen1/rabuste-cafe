import { useState } from 'react';
import './Header.css';

export default function Header({ currentPage, setCurrentPage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'workshops', label: 'Workshops' },
    { id: 'story', label: 'Our Story' },
    { id: 'event', label: 'Host an Event' },
  ];

  const handleClick = (pageId) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <img src="/Rabuste_logo_1766273484756.png" alt="Rabuste Coffee" />
            <div>
              <h1>Rabuste</h1>
              <p>The Coffee Way</p>
            </div>
          </div>

          <button 
            className="mobile-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>

          <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`}>
            {menuItems.map(item => (
              <button
                key={item.id}
                className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => handleClick(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
