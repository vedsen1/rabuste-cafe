import './Home.css';

export default function Home() {
  return (
    <main className="home">
      <section className="hero" style={{
        backgroundImage: 'url(/Screenshot_2025-12-20_220535_1766273468963.png)'
      }}>
        <div className="overlay"></div>
        <div className="hero-content container">
          <h1>Welcome to Rabuste</h1>
          <p>Discover the art of craft coffee</p>
          <button className="cta-button">Explore Our Menu</button>
        </div>
      </section>

      <section className="intro-section container">
        <h2>The Coffee Way</h2>
        <p>At Rabuste Coffee, we believe that coffee is more than just a beverage—it's an experience, a moment of mindfulness, and a celebration of craftsmanship. Every cup tells a story of passion, precision, and premium quality.</p>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose Rabuste?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">☕</div>
              <h3>Premium Beans</h3>
              <p>Ethically sourced, hand-roasted coffee beans from around the world</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Artisan Craft</h3>
              <p>Expertly prepared by our skilled baristas with attention to detail</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3>Sustainable</h3>
              <p>Committed to eco-friendly practices and community partnerships</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section" style={{
        backgroundImage: 'url(/WhatsApp_Image_2025-12-12_at_15.49.47_\(2\)_1766273677320.jpeg)'
      }}>
        <div className="overlay"></div>
        <div className="cta-content container">
          <h2>Visit Us Today</h2>
          <p>Experience the warmth and charm of our café</p>
          <button className="cta-button">Get Directions</button>
        </div>
      </section>
    </main>
  );
}
