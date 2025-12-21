import { useState, useEffect } from 'react';
import './App.css';

const IntroAnimation = () => (
  <div className="intro-container">
    <video autoPlay muted className="intro-video">
      <source src="/From_KlickPin_CF_Pin_di_Евгения_Кангас_su_coffee_nel_2025___Fu_1766273425602.mp4" type="video/mp4" />
    </video>
    <div className="logo-overlay">
      <img src="/Rabuste_logo_1766273484756.png" alt="Rabuste" className="intro-logo" />
    </div>
  </div>
);

const Header = ({ page, setPage }) => (
  <header className="header">
    <div className="container">
      <div className="header-content">
        <div className="logo">
          <img src="/Rabuste_logo_1766273484756.png" alt="Logo" />
          <div>
            <h1>Rabuste</h1>
            <p>The Coffee Way</p>
          </div>
        </div>
        <nav className="nav">
          <button className={page === 'home' ? 'active' : ''} onClick={() => setPage('home')}>Home</button>
          <button className={page === 'menu' ? 'active' : ''} onClick={() => setPage('menu')}>Menu</button>
          <button className={page === 'workshops' ? 'active' : ''} onClick={() => setPage('workshops')}>Workshops</button>
          <button className={page === 'story' ? 'active' : ''} onClick={() => setPage('story')}>Our Story</button>
          <button className={page === 'event' ? 'active' : ''} onClick={() => setPage('event')}>Host Event</button>
        </nav>
      </div>
    </div>
  </header>
);

const Home = () => (
  <main className="page home">
    <section className="hero" style={{ backgroundImage: 'url(/Screenshot_2025-12-20_220535_1766273468963.png)' }}>
      <div className="overlay"></div>
      <div className="hero-content container">
        <h1>Welcome to Rabuste</h1>
        <p>Discover the art of craft coffee</p>
        <button className="cta-button">Explore Menu</button>
      </div>
    </section>

    <section className="section container">
      <h2>The Coffee Way</h2>
      <p>At Rabuste Coffee, we celebrate the craft of specialty coffee. Every cup is an experience crafted with passion and precision.</p>
    </section>

    <section className="features">
      <div className="container">
        <h2>Why Choose Rabuste?</h2>
        <div className="grid">
          <div className="card">
            <h3>☕ Premium Beans</h3>
            <p>Ethically sourced from around the world</p>
          </div>
          <div className="card">
            <h3>🎨 Artisan Craft</h3>
            <p>Expertly prepared by skilled baristas</p>
          </div>
          <div className="card">
            <h3>🌱 Sustainable</h3>
            <p>Eco-friendly practices & community partnerships</p>
          </div>
        </div>
      </div>
    </section>
  </main>
);

const Menu = () => (
  <main className="page">
    <section className="header-section">
      <div className="container">
        <h1>Our Menu</h1>
      </div>
    </section>
    <section className="section container">
      <div className="grid">
        <div className="card">
          <h3>Espresso</h3>
          <p>Rich and bold</p>
          <p className="price">$2.50</p>
        </div>
        <div className="card">
          <h3>Cappuccino</h3>
          <p>Espresso with steamed milk</p>
          <p className="price">$4.00</p>
        </div>
        <div className="card">
          <h3>Latte</h3>
          <p>Smooth and creamy</p>
          <p className="price">$4.00</p>
        </div>
        <div className="card">
          <h3>Flat White</h3>
          <p>Velvety microfoam</p>
          <p className="price">$4.50</p>
        </div>
        <div className="card">
          <h3>Cold Brew</h3>
          <p>Smooth cold coffee</p>
          <p className="price">$3.50</p>
        </div>
        <div className="card">
          <h3>Mocha</h3>
          <p>Chocolate & espresso</p>
          <p className="price">$4.75</p>
        </div>
      </div>
    </section>
  </main>
);

const Workshops = () => (
  <main className="page">
    <section className="header-section">
      <div className="container">
        <h1>Coffee Workshops</h1>
      </div>
    </section>
    <section className="section container">
      <div className="grid">
        <div className="card">
          <h3>Espresso Basics</h3>
          <p>📅 Every Saturday 10:00 AM</p>
          <p>⏱️ 2 hours | 💰 $35</p>
          <p>Learn espresso extraction fundamentals</p>
        </div>
        <div className="card">
          <h3>Latte Art Mastery</h3>
          <p>📅 Wednesdays 6:00 PM</p>
          <p>⏱️ 1.5 hours | 💰 $40</p>
          <p>Master beautiful coffee patterns</p>
        </div>
        <div className="card">
          <h3>Coffee Tasting</h3>
          <p>📅 Sundays 2:00 PM</p>
          <p>⏱️ 2.5 hours | 💰 $50</p>
          <p>Explore flavors from around the world</p>
        </div>
        <div className="card">
          <h3>Home Brewing</h3>
          <p>📅 Fridays 5:00 PM</p>
          <p>⏱️ 2 hours | 💰 $30</p>
          <p>Perfect your home brewing technique</p>
        </div>
      </div>
    </section>
  </main>
);

const OurStory = () => (
  <main className="page">
    <section className="header-section">
      <div className="container">
        <h1>Our Story</h1>
      </div>
    </section>
    <section className="section container">
      <h2>From Passion to Your Cup</h2>
      <p>Rabuste Coffee was born from a simple passion: to create a space where coffee lovers could experience the art and science of specialty coffee. Founded in 2020, we've grown into a beloved community hub.</p>
      
      <h2 style={{ marginTop: '2rem' }}>Our Philosophy</h2>
      <p>We believe in excellence without pretension. Every coffee we serve is a result of careful sourcing, meticulous roasting, and precise brewing.</p>
      
      <h2 style={{ marginTop: '2rem' }}>Sustainability & Community</h2>
      <p>We're committed to sustainable practices and fair-trade relationships with our suppliers. By choosing Rabuste, you support ethical coffee farming worldwide.</p>
    </section>
  </main>
);

const HostEvent = () => {
  const [form, setForm] = useState({ name: '', email: '', date: '', guests: '', eventType: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your inquiry! We will contact you soon.');
    setForm({ name: '', email: '', date: '', guests: '', eventType: '' });
  };

  return (
    <main className="page">
      <section className="header-section">
        <div className="container">
          <h1>Host Your Event</h1>
        </div>
      </section>
      <section className="section container">
        <div className="grid">
          <div className="card">
            <h3>Private Events</h3>
            <p>Birthdays, anniversaries, intimate gatherings up to 50 guests</p>
          </div>
          <div className="card">
            <h3>Corporate Meetings</h3>
            <p>Professional setting with premium coffee & AV equipment</p>
          </div>
          <div className="card">
            <h3>Custom Catering</h3>
            <p>Coffee menus, pastries, and snacks tailored to your event</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '2rem auto' }}>
          <input type="text" placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
          <input type="number" placeholder="Number of Guests" min="1" max="50" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} required />
          <select value={form.eventType} onChange={(e) => setForm({ ...form, eventType: e.target.value })} required>
            <option value="">Select Event Type</option>
            <option value="birthday">Birthday Party</option>
            <option value="corporate">Corporate Meeting</option>
            <option value="wedding">Wedding</option>
            <option value="other">Other</option>
          </select>
          <button type="submit" className="cta-button">Request Booking</button>
        </form>
      </section>
    </main>
  );
};

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <p>&copy; 2025 Rabuste Coffee. The Coffee Way.</p>
    </div>
  </footer>
);

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [page, setPage] = useState('home');

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (showIntro) return <IntroAnimation />;

  const renderPage = () => {
    switch (page) {
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
      <Header page={page} setPage={setPage} />
      {renderPage()}
      <Footer />
    </div>
  );
}
